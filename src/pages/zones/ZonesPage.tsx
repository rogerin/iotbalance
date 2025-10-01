import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Grid3x3, MapPin, Building2 } from "lucide-react";
import { loadMockData, saveMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { ZoneDialog } from "@/components/zones/ZoneDialog";
import type { Zone } from "@/types";

const ZonesPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState(loadMockData());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingZone, setEditingZone] = useState<Zone | null>(null);

  const handleSave = (zone: Partial<Zone>) => {
    const newData = { ...data };
    
    if (editingZone) {
      const index = newData.zones.findIndex(z => z.id === editingZone.id);
      newData.zones[index] = { ...editingZone, ...zone };
      toast({ title: "Zona atualizada com sucesso!" });
    } else {
      const newZone: Zone = {
        id: `zone_${Date.now()}`,
        locationId: zone.locationId!,
        name: zone.name!,
        description: zone.description,
      };
      newData.zones.push(newZone);
      toast({ title: "Zona criada com sucesso!" });
    }
    
    saveMockData(newData);
    setData(newData);
    setDialogOpen(false);
    setEditingZone(null);
  };

  const handleEdit = (zone: Zone) => {
    setEditingZone(zone);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Zonas</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gerencie zonas dentro dos locais</p>
        </div>
        <Button onClick={() => { setEditingZone(null); setDialogOpen(true); }} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nova Zona
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.zones.map((zone) => {
          const location = data.locations.find(l => l.id === zone.locationId);
          const organization = location ? data.organizations.find(o => o.id === location.organizationId) : null;
          const deviceCount = data.devices.filter(d => d.zoneId === zone.id).length;

          return (
            <Card 
              key={zone.id} 
              className="p-4 sm:p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleEdit(zone)}
            >
              <div className="flex items-start justify-between mb-4">
                <Grid3x3 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold mb-2">{zone.name}</h3>
              
              {location && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-1">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{location.name}</span>
                </div>
              )}
              
              {organization && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-3">
                  <Building2 className="h-3 w-3" />
                  <span className="truncate">{organization.name}</span>
                </div>
              )}
              
              {zone.description && (
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 line-clamp-2">{zone.description}</p>
              )}
              
              <div className="pt-3 border-t">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {deviceCount} dispositivo{deviceCount !== 1 ? 's' : ''}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <ZoneDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        zone={editingZone}
        locations={data.locations}
        organizations={data.organizations}
      />
    </div>
  );
};

export default ZonesPage;
