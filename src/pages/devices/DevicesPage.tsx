import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Activity, Battery, Signal } from "lucide-react";
import { loadMockData, saveMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { DeviceDialog } from "@/components/devices/DeviceDialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import type { Device } from "@/types";

const DevicesPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState(loadMockData());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<Device | null>(null);

  const handleSave = (device: Partial<Device>) => {
    const newData = { ...data };
    
    if (editingDevice) {
      const index = newData.devices.findIndex(d => d.id === editingDevice.id);
      newData.devices[index] = { ...editingDevice, ...device };
      toast({ title: "Dispositivo atualizado com sucesso!" });
    } else {
      const newDevice: Device = {
        id: `dev_${Date.now()}`,
        organizationId: device.organizationId!,
        locationId: device.locationId!,
        zoneId: device.zoneId || undefined,
        serial: device.serial!,
        model: device.model || "HX711",
        firmwareVersion: "1.0.0",
        status: "active",
        lastSeenAt: new Date().toISOString(),
        batteryLevel: 1.0,
        rssi: -60,
        calibrationFactor: device.calibrationFactor || 1.0,
        offset: device.offset || 0,
        unit: "g",
        currentPercent: 100,
        minReportingIntervalS: 15,
        maxReportingIntervalS: 300,
        createdAt: new Date().toISOString(),
      };
      newData.devices.push(newDevice);
      toast({ title: "Dispositivo criado com sucesso!" });
    }
    
    saveMockData(newData);
    setData(newData);
    setDialogOpen(false);
    setEditingDevice(null);
  };

  const handleEdit = (device: Device) => {
    setEditingDevice(device);
    setDialogOpen(true);
  };

  const getStatusColor = (percent: number) => {
    if (percent < 15) return "text-danger";
    if (percent < 30) return "text-warning";
    return "text-success";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dispositivos</h1>
          <p className="text-muted-foreground">Gerencie sensores e configurações</p>
        </div>
        <Button onClick={() => { setEditingDevice(null); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Dispositivo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.devices.map((device) => {
        const assignment = data.deviceAssignments?.find(
          a => a.deviceId === device.id && !a.endedAt
        );
        const product = assignment 
          ? data.products.find(p => p.id === assignment.productId)
          : null;
        const location = data.locations.find(l => l.id === device.locationId);

          return (
            <Link key={device.id} to={`/dashboard/devices/${device.id}`}>
              <Card className="p-6 hover:border-primary/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <Activity className={`h-8 w-8 ${getStatusColor(device.currentPercent)}`} />
                  <Badge variant={device.status === 'active' ? 'default' : 'secondary'}>
                    {device.status}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-semibold mb-1">{device.serial}</h3>
                {product && (
                  <p className="text-sm text-muted-foreground mb-2">{product.name}</p>
                )}
                {location && (
                  <p className="text-xs text-muted-foreground mb-4">{location.name}</p>
                )}
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Nível</span>
                      <span className={`font-medium ${getStatusColor(device.currentPercent)}`}>
                        {device.currentPercent.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={device.currentPercent} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Battery className="h-4 w-4" />
                      <span>{(device.batteryLevel * 100).toFixed(0)}%</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Signal className="h-4 w-4" />
                      <span>{device.rssi} dBm</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>

      <DeviceDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        device={editingDevice}
        organizations={data.organizations}
        locations={data.locations}
        zones={data.zones}
      />
    </div>
  );
};

export default DevicesPage;
