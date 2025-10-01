import { useState, useEffect, memo } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, CheckCircle, TrendingDown, AlertTriangle, Bell } from "lucide-react";

interface SimulatedDevice {
  id: string;
  name: string;
  product: string;
  percent: number;
  status: "normal" | "warning" | "critical";
  trend: number;
}

const DeviceSimulationComponent = () => {
  const [devices, setDevices] = useState<SimulatedDevice[]>([
    { id: "1", name: "KD-001", product: "Refrigerante Cola", percent: 85, status: "normal", trend: -2 },
    { id: "2", name: "KD-002", product: "Suco Laranja", percent: 45, status: "normal", trend: -3 },
    { id: "3", name: "KD-003", product: "Água Mineral", percent: 28, status: "warning", trend: -4 },
    { id: "4", name: "KD-004", product: "Café Espresso", percent: 12, status: "critical", trend: -5 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => {
        let newPercent = Math.max(0, device.percent + device.trend);
        let newStatus: "normal" | "warning" | "critical" = "normal";
        
        if (newPercent < 15) {
          newStatus = "critical";
        } else if (newPercent < 30) {
          newStatus = "warning";
        }

        // Simulate refill when it reaches 0
        if (newPercent === 0) {
          newPercent = 100;
          newStatus = "normal";
        }

        return {
          ...device,
          percent: newPercent,
          status: newStatus,
        };
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-danger";
      case "warning": return "text-warning";
      default: return "text-success";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertCircle className="h-5 w-5" />;
      case "warning": return <TrendingDown className="h-5 w-5" />;
      default: return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "critical": return "Crítico";
      case "warning": return "Aviso";
      default: return "Normal";
    }
  };

  return (
    <div className="space-y-4" role="region" aria-label="Simulação ao vivo de dispositivos">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2" id="simulation-heading">
            <Activity className="h-6 w-6 text-primary animate-pulse" aria-hidden="true" />
            Simulação em Tempo Real
          </h2>
          <p className="text-sm text-muted-foreground">
            Veja o sistema detectando níveis baixos automaticamente
          </p>
        </div>
        <Badge variant="outline" className="animate-pulse" aria-label="Transmissão ao vivo">
          LIVE
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" role="list">
        {devices.map((device) => (
          <Card key={device.id} className="p-4 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all" role="listitem">
            <div className="flex items-start justify-between mb-3">
              <div className={`${getStatusColor(device.status)}`} aria-hidden="true">
                {getStatusIcon(device.status)}
              </div>
              <Badge 
                variant={device.status === "critical" ? "destructive" : device.status === "warning" ? "secondary" : "default"}
                className="text-xs"
                aria-label={`Status: ${getStatusLabel(device.status)}`}
              >
                {getStatusLabel(device.status)}
              </Badge>
            </div>
            
            <h3 className="font-semibold mb-1 text-sm">{device.name}</h3>
            <p className="text-xs text-muted-foreground mb-3 truncate">{device.product}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Nível</span>
                <span className={`font-bold ${getStatusColor(device.status)}`} aria-label={`Nível atual: ${device.percent.toFixed(1)} porcento`}>
                  {device.percent.toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={device.percent} 
                className="h-2"
                aria-label={`Barra de progresso mostrando ${device.percent.toFixed(1)}% de capacidade`}
              />
            </div>
            
            {device.status !== "normal" && (
              <div className="mt-3 text-xs p-2 rounded-md bg-muted/50" role="alert">
                <p className={`font-medium ${getStatusColor(device.status)}`}>
                  {device.status === "critical" 
                    ? "⚠️ Reposição urgente necessária" 
                    : "⏰ Planejar reposição em breve"}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-sm text-center text-muted-foreground">
          💡 Os níveis diminuem automaticamente simulando consumo real. 
          Alertas são gerados quando atingem os limites configurados.
        </p>
      </div>
    </div>
  );
};

export const DeviceSimulation = memo(DeviceSimulationComponent);
