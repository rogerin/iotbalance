import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Building2, MapPin, Users } from "lucide-react";
import { loadMockData, saveMockData } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";
import { ClientDialog } from "@/components/clients/ClientDialog";
import type { Organization } from "@/types";

const ClientsPage = () => {
  const { toast } = useToast();
  const [data, setData] = useState(loadMockData());
  const [dialogOpen, setDialogOpen] = useState(false);
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Clientes</h1>
          <p className="text-muted-foreground">Gerencie organizações e locais</p>
        </div>
        <Button onClick={() => { setEditingClient(null); setDialogOpen(true); }}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.organizations.map((org) => {
          const locations = data.locations.filter(l => l.organizationId === org.id);
          const devices = data.devices.filter(d => d.organizationId === org.id);
          
          return (
            <Card
              key={org.id}
              className="p-6 hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => handleEdit(org)}
            >
              <div className="flex items-start justify-between mb-4">
                <Building2 className="h-8 w-8 text-primary" />
                <span className={`text-xs px-2 py-1 rounded-full ${
                  org.status === 'active' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {org.status === 'active' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{org.name}</h3>
              {org.cnpj && (
                <p className="text-sm text-muted-foreground mb-4">CNPJ: {org.cnpj}</p>
              )}
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{locations.length} {locations.length === 1 ? 'local' : 'locais'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
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
    </div>
  );
};

export default ClientsPage;
