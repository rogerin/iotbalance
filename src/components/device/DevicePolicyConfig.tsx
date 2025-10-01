import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, AlertTriangle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { loadMockData, saveMockData } from "@/lib/mockData";
import type { Device, ThresholdPolicy } from "@/types";

interface DevicePolicyConfigProps {
  device: Device;
  policies: ThresholdPolicy[];
}

export const DevicePolicyConfig = ({ device, policies: initialPolicies }: DevicePolicyConfigProps) => {
  const { toast } = useToast();
  const [policies, setPolicies] = useState(initialPolicies);
  const [ruleType, setRuleType] = useState<"percent" | "weight" | "eta_days">("percent");
  const [ruleValue, setRuleValue] = useState("");
  const [hysteresis, setHysteresis] = useState("");

  const handleAddPolicy = () => {
    const data = loadMockData();
    
    const newPolicy: ThresholdPolicy = {
      id: `pol_${Date.now()}`,
      organizationId: device.organizationId,
      name: `Política ${ruleType} ${ruleValue}`,
      scopeType: "device",
      scopeId: device.id,
      ruleType,
      ruleValue: parseFloat(ruleValue),
      hysteresisValue: parseFloat(hysteresis) || 0,
      evaluateEveryS: 60,
      minDurationS: 300,
      active: true,
      priority: 1,
      createdAt: new Date().toISOString(),
    };

    data.policies.push(newPolicy);
    saveMockData(data);
    setPolicies([...policies, newPolicy]);
    
    setRuleValue("");
    setHysteresis("");
    
    toast({ title: "Política criada com sucesso!" });
  };

  const handleDeletePolicy = (policyId: string) => {
    const data = loadMockData();
    data.policies = data.policies.filter(p => p.id !== policyId);
    saveMockData(data);
    setPolicies(policies.filter(p => p.id !== policyId));
    toast({ title: "Política removida com sucesso!" });
  };

  const getRuleLabel = (type: string) => {
    switch (type) {
      case "percent": return "Percentual";
      case "weight": return "Peso (g)";
      case "eta_days": return "Dias até esgotar";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Políticas de Alerta Ativas
        </h3>
        
        {policies.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nenhuma política configurada para este dispositivo
          </p>
        ) : (
          <div className="space-y-3">
            {policies.map((policy) => (
              <div key={policy.id} className="flex items-center justify-between p-4 bg-card-hover rounded-lg border border-border">
                <div>
                  <p className="font-medium">
                    {getRuleLabel(policy.ruleType)} ≤ {policy.ruleValue}
                    {policy.ruleType === "percent" && "%"}
                    {policy.ruleType === "weight" && "g"}
                  </p>
                  {policy.hysteresisValue > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Histerese: {policy.hysteresisValue}
                      {policy.ruleType === "percent" && "%"}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeletePolicy(policy.id)}
                >
                  <Trash2 className="h-4 w-4 text-danger" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          Adicionar Nova Política
        </h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ruleType">Tipo de Regra</Label>
            <Select value={ruleType} onValueChange={(v) => setRuleType(v as any)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Percentual Restante</SelectItem>
                <SelectItem value="weight">Peso Mínimo</SelectItem>
                <SelectItem value="eta_days">Dias até Esgotar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="ruleValue">
                Valor Limite
                {ruleType === "percent" && " (%)"}
                {ruleType === "weight" && " (g)"}
                {ruleType === "eta_days" && " (dias)"}
              </Label>
              <Input
                id="ruleValue"
                type="number"
                step="0.1"
                value={ruleValue}
                onChange={(e) => setRuleValue(e.target.value)}
                placeholder="Ex: 15"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hysteresis">
                Histerese (opcional)
                {ruleType === "percent" && " (%)"}
                {ruleType === "weight" && " (g)"}
              </Label>
              <Input
                id="hysteresis"
                type="number"
                step="0.1"
                value={hysteresis}
                onChange={(e) => setHysteresis(e.target.value)}
                placeholder="Ex: 5"
              />
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Exemplo:</strong> Com limite de {ruleValue || "15"}
              {ruleType === "percent" && "% e histerese de " + (hysteresis || "5") + "%"}
              , o alerta abrirá quando o nível ficar abaixo de {ruleValue || "15"}
              {ruleType === "percent" && "%"} e fechará apenas quando subir acima de {
                (parseFloat(ruleValue || "15") + parseFloat(hysteresis || "5")).toFixed(1)
              }
              {ruleType === "percent" && "%"}.
            </p>
          </div>

          <Button onClick={handleAddPolicy} disabled={!ruleValue}>
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Política
          </Button>
        </div>
      </Card>
    </div>
  );
};
