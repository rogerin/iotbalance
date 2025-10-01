import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Download, Upload, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import type { Device, OTAFirmware, OTAJob } from "@/types";

interface OtaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  devices: Device[];
  onScheduleUpdate: (firmwareId: string, deviceIds: string[]) => void;
}

export const OtaDialog = ({ open, onOpenChange, devices, onScheduleUpdate }: OtaDialogProps) => {
  const [selectedDevices, setSelectedDevices] = useState<string[]>([]);
  const [firmwares, setFirmwares] = useState<OTAFirmware[]>([
    {
      id: "fw_001",
      model: "HX711",
      version: "2.0.0",
      fileUrl: "https://updates.iotbalance.com/hx711-v2.0.0.bin",
      checksum: "abc123def456",
      releaseNotes: "- Melhorias de estabilidade\n- Otimização de consumo de bateria\n- Correção de bugs de conexão",
      createdAt: new Date().toISOString(),
    },
    {
      id: "fw_002",
      model: "HX711",
      version: "1.5.2",
      fileUrl: "https://updates.iotbalance.com/hx711-v1.5.2.bin",
      checksum: "def456ghi789",
      releaseNotes: "- Correções de segurança\n- Melhorias de performance",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);
  const [selectedFirmware, setSelectedFirmware] = useState<string>("");

  const toggleDevice = (deviceId: string) => {
    setSelectedDevices(prev =>
      prev.includes(deviceId)
        ? prev.filter(id => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const selectAll = () => {
    setSelectedDevices(devices.map(d => d.id));
  };

  const deselectAll = () => {
    setSelectedDevices([]);
  };

  const handleSchedule = () => {
    if (!selectedFirmware || selectedDevices.length === 0) return;
    onScheduleUpdate(selectedFirmware, selectedDevices);
    onOpenChange(false);
    setSelectedDevices([]);
    setSelectedFirmware("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Atualização OTA de Firmware</DialogTitle>
          <DialogDescription>
            Selecione o firmware e os dispositivos para atualização Over-The-Air
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Firmware Selection */}
          <div className="space-y-3">
            <Label>Selecione o Firmware</Label>
            <div className="grid gap-3">
              {firmwares.map((firmware) => (
                <Card
                  key={firmware.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedFirmware === firmware.id
                      ? 'border-primary bg-primary/5'
                      : 'hover:border-primary/50'
                  }`}
                  onClick={() => setSelectedFirmware(firmware.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{firmware.model} - v{firmware.version}</h4>
                        <Badge variant="outline">
                          {new Date(firmware.createdAt).toLocaleDateString('pt-BR')}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Checksum: {firmware.checksum}
                      </p>
                    </div>
                    <Download className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="text-sm whitespace-pre-line text-muted-foreground">
                    {firmware.releaseNotes}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Device Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Selecione os Dispositivos ({selectedDevices.length}/{devices.length})</Label>
              <div className="space-x-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={selectAll}
                >
                  Selecionar Todos
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={deselectAll}
                >
                  Desmarcar Todos
                </Button>
              </div>
            </div>
            
            <div className="grid gap-2 max-h-60 overflow-y-auto border rounded-lg p-3">
              {devices.map((device) => (
                <label
                  key={device.id}
                  className="flex items-center space-x-3 p-2 hover:bg-muted rounded cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => toggleDevice(device.id)}
                    className="rounded"
                  />
                  <div className="flex-1 flex items-center justify-between">
                    <div>
                      <p className="font-medium">{device.serial}</p>
                      <p className="text-sm text-muted-foreground">
                        Firmware atual: {device.firmwareVersion}
                      </p>
                    </div>
                    <Badge
                      variant={device.status === 'active' ? 'default' : 'secondary'}
                    >
                      {device.status}
                    </Badge>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!selectedFirmware || selectedDevices.length === 0}
          >
            <Upload className="mr-2 h-4 w-4" />
            Agendar Atualização
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};