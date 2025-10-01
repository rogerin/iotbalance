import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Device, Organization, Location, Zone } from "@/types";

interface DeviceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (device: Partial<Device>) => void;
  device: Device | null;
  organizations: Organization[];
  locations: Location[];
  zones: Zone[];
}

export const DeviceDialog = ({ open, onOpenChange, onSave, device, organizations, locations, zones }: DeviceDialogProps) => {
  const [serial, setSerial] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [model, setModel] = useState("HX711");
  const [calibrationFactor, setCalibrationFactor] = useState("1.0");
  const [offset, setOffset] = useState("0");

  const filteredLocations = locations.filter(l => l.organizationId === organizationId);
  const filteredZones = zones.filter(z => z.locationId === locationId);

  useEffect(() => {
    if (device) {
      setSerial(device.serial);
      setOrganizationId(device.organizationId);
      setLocationId(device.locationId);
      setZoneId(device.zoneId || "");
      setModel(device.model);
      setCalibrationFactor(device.calibrationFactor.toString());
      setOffset(device.offset.toString());
    } else {
      setSerial("");
      setOrganizationId("");
      setLocationId("");
      setZoneId("");
      setModel("HX711");
      setCalibrationFactor("1.0");
      setOffset("0");
    }
  }, [device, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      serial,
      organizationId,
      locationId,
      zoneId: zoneId || null,
      model,
      calibrationFactor: parseFloat(calibrationFactor),
      offset: parseFloat(offset),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{device ? "Editar Dispositivo" : "Novo Dispositivo"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="serial">Serial</Label>
              <Input
                id="serial"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="KD-123456"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="HX711"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="organization">Cliente</Label>
            <Select value={organizationId} onValueChange={setOrganizationId} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o cliente" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map(org => (
                  <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="location">Local</Label>
              <Select value={locationId} onValueChange={setLocationId} required disabled={!organizationId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o local" />
                </SelectTrigger>
                <SelectContent>
                  {filteredLocations.map(loc => (
                    <SelectItem key={loc.id} value={loc.id}>{loc.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="zone">Zona (opcional)</Label>
              <Select value={zoneId} onValueChange={setZoneId} disabled={!locationId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a zona" />
                </SelectTrigger>
                <SelectContent>
                  {filteredZones.map(zone => (
                    <SelectItem key={zone.id} value={zone.id}>{zone.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="calibrationFactor">Fator de Calibração</Label>
              <Input
                id="calibrationFactor"
                type="number"
                step="0.01"
                value={calibrationFactor}
                onChange={(e) => setCalibrationFactor(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offset">Offset</Label>
              <Input
                id="offset"
                type="number"
                step="0.01"
                value={offset}
                onChange={(e) => setOffset(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
