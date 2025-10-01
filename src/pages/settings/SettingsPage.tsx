import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Bell, Shield, Database, Users, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const SettingsPage = () => {
  const { toast } = useToast();
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [warningAlerts, setWarningAlerts] = useState(true);
  const [dailyReport, setDailyReport] = useState(false);

  const handleSave = (section: string) => {
    toast({
      title: "Configurações salvas",
      description: `As configurações de ${section} foram atualizadas com sucesso.`,
    });
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Configurações</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Gerencie as preferências do sistema</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="general">
            <Settings className="h-4 w-4 mr-2 hidden sm:inline" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2 hidden sm:inline" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="h-4 w-4 mr-2 hidden sm:inline" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Database className="h-4 w-4 mr-2 hidden sm:inline" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="h-4 w-4 mr-2 hidden sm:inline" />
            Usuários
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Nome da Empresa</Label>
                <Input id="company-name" defaultValue="KeyCore Tecnologia" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="timezone">Fuso Horário</Label>
                <Input id="timezone" defaultValue="America/São Paulo" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Idioma</Label>
                <Input id="language" defaultValue="Português (Brasil)" />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Modo de Desenvolvimento</Label>
                  <p className="text-sm text-muted-foreground">
                    Ativa logs detalhados e recursos de debug
                  </p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Tema Escuro Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Alterna entre claro e escuro baseado no horário
                  </p>
                </div>
                <Switch />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={() => handleSave("gerais")}>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Preferências de Notificação
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Canais de Notificação</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>E-mail</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por e-mail
                      </p>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS</Label>
                      <p className="text-sm text-muted-foreground">
                        Receber notificações por SMS
                      </p>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Tipos de Alerta</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas Críticos</Label>
                      <p className="text-sm text-muted-foreground">
                        Níveis abaixo de 15%
                      </p>
                    </div>
                    <Switch checked={criticalAlerts} onCheckedChange={setCriticalAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Alertas de Aviso</Label>
                      <p className="text-sm text-muted-foreground">
                        Níveis entre 15% e 30%
                      </p>
                    </div>
                    <Switch checked={warningAlerts} onCheckedChange={setWarningAlerts} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Relatório Diário</Label>
                      <p className="text-sm text-muted-foreground">
                        Resumo enviado todo dia às 8h
                      </p>
                    </div>
                    <Switch checked={dailyReport} onCheckedChange={setDailyReport} />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="email">E-mail para Notificações</Label>
                <Input id="email" type="email" placeholder="admin@empresa.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone para SMS</Label>
                <Input id="phone" type="tel" placeholder="+55 11 99999-9999" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={() => handleSave("notificações")}>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança e Privacidade
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Autenticação</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Autenticação de Dois Fatores (2FA)</Label>
                      <p className="text-sm text-muted-foreground">
                        Adiciona uma camada extra de segurança
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Sessões Simultâneas</Label>
                      <p className="text-sm text-muted-foreground">
                        Permitir múltiplos logins ao mesmo tempo
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Alterar Senha</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Senha Atual</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">Nova Senha</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Sessões Ativas</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">Navegador atual</p>
                      <p className="text-sm text-muted-foreground">São Paulo, Brasil • Agora</p>
                    </div>
                    <Badge variant="default">Ativo</Badge>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={() => handleSave("segurança")}>Salvar Alterações</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Database className="h-5 w-5" />
              Integrações e APIs
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">APIs Externas</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Mail className="h-8 w-8 text-primary" />
                      <div>
                        <p className="font-medium">E-mail Service (SMTP)</p>
                        <p className="text-sm text-muted-foreground">Envio de notificações por e-mail</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>

                  <div className="flex justify-between items-center p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="h-8 w-8 text-warning" />
                      <div>
                        <p className="font-medium">Webhook de Alertas</p>
                        <p className="text-sm text-muted-foreground">Enviar alertas para sistemas externos</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Configurar</Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Chaves de API</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Gerencie as chaves de API para integração com outros sistemas
                </p>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Gerar Nova Chave
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-5 w-5" />
                Gerenciamento de Usuários
              </h3>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Adicionar Usuário
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Admin KeyCore</p>
                  <p className="text-sm text-muted-foreground">admin@keycore.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>Administrador</Badge>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">João Silva</p>
                  <p className="text-sm text-muted-foreground">joao.silva@empresa.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Operador</Badge>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Maria Santos</p>
                  <p className="text-sm text-muted-foreground">maria.santos@empresa.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Visualizador</Badge>
                  <Button variant="outline" size="sm">Editar</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Badge component needed
import { Badge } from "@/components/ui/badge";

export default SettingsPage;
