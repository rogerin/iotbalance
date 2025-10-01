import { AlertTriangle, AlertCircle, Info, MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Alert } from '@/types';
import { cn } from '@/lib/utils';

interface AlertCardProps {
  alert: Alert;
  onAcknowledge?: (alertId: string) => void;
}

const severityConfig = {
  critical: {
    icon: AlertCircle,
    label: 'Crítico',
    className: 'bg-danger text-danger-foreground',
    iconColor: 'text-danger',
  },
  warning: {
    icon: AlertTriangle,
    label: 'Aviso',
    className: 'bg-warning text-warning-foreground',
    iconColor: 'text-warning',
  },
  info: {
    icon: Info,
    label: 'Info',
    className: 'bg-info text-info-foreground',
    iconColor: 'text-info',
  },
};

function formatRelativeTime(isoString: string): string {
  const now = new Date().getTime();
  const then = new Date(isoString).getTime();
  const diffMinutes = Math.floor((now - then) / 60000);
  
  if (diffMinutes < 1) return 'Agora';
  if (diffMinutes < 60) return `${diffMinutes}m atrás`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h atrás`;
  return `${Math.floor(diffHours / 24)}d atrás`;
}

export function AlertCard({ alert, onAcknowledge }: AlertCardProps) {
  const config = severityConfig[alert.severity];
  const Icon = config.icon;
  
  return (
    <Card className={cn(
      "p-4 transition-all hover:shadow-md",
      alert.severity === 'critical' && "ring-2 ring-danger/50"
    )}>
      <div className="flex gap-4">
        <div className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
          alert.severity === 'critical' ? 'bg-danger/10' : 'bg-warning/10'
        )}>
          <Icon className={cn("h-5 w-5", config.iconColor)} />
        </div>
        
        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge className={config.className}>
                  {config.label}
                </Badge>
                <span className="text-sm font-semibold">
                  {alert.device?.serial}
                </span>
              </div>
              <p className="text-sm text-foreground">{alert.message}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>{alert.location?.name}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{formatRelativeTime(alert.openedAt)}</span>
            </div>
          </div>
          
          {alert.status === 'open' && (
            <div className="pt-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onAcknowledge?.(alert.id)}
              >
                Reconhecer
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
