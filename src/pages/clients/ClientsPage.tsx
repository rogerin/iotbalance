import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Building2, MapPin, Users, Settings } from "lucide-react";
import { loadMockData, saveMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { ClientDialog } from "@/components/clients/ClientDialog";
import { MqttConfigDialog } from "@/components/clients/MqttConfigDialog";
import type { Organization, MqttConfig } from "@/types";

const ClientsPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState(loadMockData());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [mqttDialogOpen, setMqttDialogOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Organization | null>(null);

  const handleSave = (client: Partial<Organization>) => {
    const newData = { ...data };
    
    if (editingClient) {
      const index = newData.organizations.findIndex(o => o.id === editingClient.id);
      newData.organizations[index] = { ...editingClient, ...client };
      toast({ title: "Cliente atualizado com sucesso!" });
    } else {
      const newClient: Organization = {
        id: `org_${Date.now()}`,
        name: client.name!,
        cnpj: client.cnpj || null,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      newData.organizations.push(newClient);
      toast({ title: "Cliente criado com sucesso!" });
    }
    
    saveMockData(newData);
    setData(newData);
    setDialogOpen(false);
    setEditingClient(null);
  };

  const handleEdit = (client: Organization) => {
    setEditingClient(client);
    setDialogOpen(true);
  };

  const handleMqttConfig = (client: Organization, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingClient(client);
    setMqttDialogOpen(true);
  };

  const handleSaveMqtt = (mqttConfig: MqttConfig) => {
    if (!editingClient) return;
    
    const newData = { ...data };
    const index = newData.organizations.findIndex(o => o.id === editingClient.id);
    newData.organizations[index] = { ...editingClient, mqttConfig };
    
    saveMockData(newData);
    setData(newData);
    setMqttDialogOpen(false);
    setEditingClient(null);
    toast({ title: "Configurações MQTT salvas com sucesso!" });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Clientes</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Gerencie organizações e suas configurações</p>
        </div>
        <Button onClick={() => { setEditingClient(null); setDialogOpen(true); }} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.organizations.map((org) => {
          const locations = data.locations.filter(l => l.organizationId === org.id);
          const devices = data.devices.filter(d => d.organizationId === org.id);
          
          return (
            <Card
              key={org.id}
              className="p-4 sm:p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleEdit(org)}
            >
              <div className="flex items-start justify-between mb-4">
                <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleMqttConfig(org, e)}
                    className="h-8 w-8 p-0"
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    org.status === 'active' 
                      ? 'bg-success/20 text-success' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {org.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
              </div>
              
              <h3 className="text-base sm:text-lg font-semibold mb-2">{org.name}</h3>
              {org.cnpj && (
                <p className="text-xs sm:text-sm text-muted-foreground mb-4">CNPJ: {org.cnpj}</p>
              )}
              
              <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{locations.length} {locations.length === 1 ? 'local' : 'locais'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                  <span>{devices.length} {devices.length === 1 ? 'device' : 'devices'}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <ClientDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSave}
        client={editingClient}
      />

      <MqttConfigDialog
        open={mqttDialogOpen}
        onOpenChange={setMqttDialogOpen}
        onSave={handleSaveMqtt}
        config={editingClient?.mqttConfig}
      />
    </div>
  );
};

export default ClientsPage;
