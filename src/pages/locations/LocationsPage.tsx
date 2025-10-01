import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, MapPin, Building2 } from "lucide-react";
import { loadMockData, saveMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { LocationDialog } from "@/components/locations/LocationDialog";
import { Badge } from "@/components/ui/badge";
import type { Location } from "@/types";

const LocationsPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState(loadMockData());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);

  const handleSave = (location: Partial<Location>) => {
    const newData = { ...data };
    
    if (editingLocation) {
      const index = newData.locations.findIndex(l => l.id === editingLocation.id);
      newData.locations[index] = { ...editingLocation, ...location };
      toast({ title: "Local atualizado com sucesso!" });
    } else {
      const newLocation: Location = {
        id: `loc_${Date.now()}`,
        organizationId: location.organizationId!,
        name: location.name!,
        address: location.address!,
        timezone: location.timezone || "America/Sao_Paulo",
        status: "active",
        createdAt: new Date().toISOString(),
      };
      newData.locations.push(newLocation);
      toast({ title: "Local criado com sucesso!" });
    }
    
    saveMockData(newData);
    setData(newData);
    setDialogOpen(false);
    setEditingLocation(null);
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Locais</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gerencie locais e endereços</p>
        </div>
        <Button onClick={() => { setEditingLocation(null); setDialogOpen(true); }} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Local
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.locations.map((location) => {
          const organization = data.organizations.find(o => o.id === location.organizationId);
          const deviceCount = data.devices.filter(d => d.locationId === location.id).length;

          return (
            <Card 
              key={location.id} 
              className="p-4 sm:p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleEdit(location)}
            >
              <div className="flex items-start justify-between mb-4">
                <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
                  {location.status}
                </Badge>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold mb-1">{location.name}</h3>
              {organization && (
                <div className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground mb-2">
                  <Building2 className="h-3 w-3" />
                  <span>{organization.name}</span>
                </div>
              )}
              <p className="text-xs sm:text-sm text-muted-foreground mb-4 line-clamp-2">{location.address}</p>
              
              <div className="pt-3 border-t">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {deviceCount} dispositivo{deviceCount !== 1 ? 's' : ''}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <LocationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        location={editingLocation}
        organizations={data.organizations}
      />
    </div>
  );
};

export default LocationsPage;
