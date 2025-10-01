import { Card } from "@/components/ui/card";
import { TrendingDown, Clock, Droplet } from "lucide-react";
import type { Device } from "@/types";

interface ConsumptionHistoryProps {
  device: Device;
}

export const ConsumptionHistory = ({ device }: ConsumptionHistoryProps) => {
  // Mock consumption data
  const consumptionData = [
    { period: "Últimas 24h", consumption: 2.3, unit: "L", trend: -5 },
    { period: "Últimos 7 dias", consumption: 18.5, unit: "L", trend: 12 },
    { period: "Últimos 30 dias", consumption: 75.2, unit: "L", trend: -8 },
  ];

  const refillEvents = [
    { date: "2025-09-28 14:30", quantity: "20 L", method: "Troca", user: "João Silva" },
    { date: "2025-09-23 09:15", quantity: "20 L", method: "Troca", user: "Maria Santos" },
    { date: "2025-09-18 16:45", quantity: "20 L", method: "Troca", user: "João Silva" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {consumptionData.map((data, index) => (
          <Card key={index} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Droplet className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">{data.period}</span>
            </div>
            <p className="text-2xl font-bold">
              {data.consumption} {data.unit}
            </p>
            <div className="flex items-center gap-1 mt-2">
              <TrendingDown className={`h-4 w-4 ${data.trend > 0 ? 'text-danger' : 'text-success'}`} />
              <span className={`text-sm ${data.trend > 0 ? 'text-danger' : 'text-success'}`}>
                {Math.abs(data.trend)}% vs período anterior
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          Histórico de Reabastecimento
        </h3>
        <div className="space-y-4">
          {refillEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-card-hover rounded-lg border border-border">
              <div>
                <p className="font-medium">{event.method}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{event.quantity}</p>
                <p className="text-sm text-muted-foreground">{event.user}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
