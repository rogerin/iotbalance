import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { MqttConfig } from "@/types";

interface MqttConfigDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (config: MqttConfig) => void;
  config?: MqttConfig;
}

export const MqttConfigDialog = ({ open, onOpenChange, onSave, config }: MqttConfigDialogProps) => {
  const [broker, setBroker] = useState("");
  const [port, setPort] = useState(1883);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [topicPrefix, setTopicPrefix] = useState("");
  const [useTls, setUseTls] = useState(false);
  const [clientId, setClientId] = useState("");

  useEffect(() => {
    if (config) {
      setBroker(config.broker || "");
      setPort(config.port || 1883);
      setUsername(config.username || "");
      setPassword(config.password || "");
      setTopicPrefix(config.topicPrefix || "");
      setUseTls(config.useTls || false);
      setClientId(config.clientId || "");
    } else {
      setBroker("");
      setPort(1883);
      setUsername("");
      setPassword("");
      setTopicPrefix("");
      setUseTls(false);
      setClientId("");
    }
  }, [config, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      broker,
      port,
      username: username || undefined,
      password: password || undefined,
      topicPrefix,
      useTls,
      clientId: clientId || undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Configurações MQTT</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="broker">Broker *</Label>
              <Input
                id="broker"
                placeholder="mqtt.example.com"
                value={broker}
                onChange={(e) => setBroker(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="port">Porta *</Label>
              <Input
                id="port"
                type="number"
                placeholder="1883"
                value={port}
                onChange={(e) => setPort(parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="topicPrefix">Prefixo de Tópico *</Label>
              <Input
                id="topicPrefix"
                placeholder="iot-balance"
                value={topicPrefix}
                onChange={(e) => setTopicPrefix(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientId">Client ID</Label>
              <Input
                id="clientId"
                placeholder="client-001"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="useTls"
              checked={useTls}
              onCheckedChange={setUseTls}
            />
            <Label htmlFor="useTls">Usar TLS/SSL</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};