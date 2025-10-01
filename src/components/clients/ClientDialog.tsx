import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Organization } from "@/types";

interface ClientDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (client: Partial<Organization>) => void;
  client: Organization | null;
}

export const ClientDialog = ({ open, onOpenChange, onSave, client }: ClientDialogProps) => {
  const [name, setName] = useState("");
  const [cnpj, setCnpj] = useState("");

  useEffect(() => {
    if (client) {
      setName(client.name);
      setCnpj(client.cnpj || "");
    } else {
      setName("");
      setCnpj("");
    }
  }, [client, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, cnpj: cnpj || null });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{client ? "Editar Cliente" : "Novo Cliente"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Organização</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Keycore Tecnologia"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cnpj">CNPJ (opcional)</Label>
            <Input
              id="cnpj"
              value={cnpj}
              onChange={(e) => setCnpj(e.target.value)}
              placeholder="00.000.000/0000-00"
            />
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
