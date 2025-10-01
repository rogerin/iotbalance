import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import type { WeightDataPoint } from '@/types';

interface WeightChartProps {
  data: WeightDataPoint[];
  containerCapacity?: number;
}

export function WeightChart({ data, containerCapacity }: WeightChartProps) {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatWeight = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}kg`;
    }
    return `${value.toFixed(0)}g`;
  };

  return (
    <Card className="p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Histórico de Peso - 24h</h3>
        <p className="text-sm text-muted-foreground">
          Monitoramento em tempo real do nível do recipiente
        </p>
      </div>
      
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatTime}
            className="text-xs"
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis 
            tickFormatter={formatWeight}
            className="text-xs"
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip 
            labelFormatter={formatTime}
            formatter={(value: number) => [formatWeight(value), 'Peso']}
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 'var(--radius)',
            }}
          />
          <Area 
            type="monotone" 
            dataKey="weight" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            fill="url(#weightGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      {containerCapacity && (
        <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
          <span>Capacidade: {formatWeight(containerCapacity)}</span>
          <span>Atual: {formatWeight(data[data.length - 1]?.weight || 0)}</span>
        </div>
      )}
    </Card>
  );
}
