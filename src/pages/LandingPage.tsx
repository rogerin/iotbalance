import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Bell, BarChart3, Shield, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold text-foreground">SmartDrink</h1>
              <p className="text-xs text-muted-foreground">by KeyCore</p>
            </div>
          </div>
          <Link to="/dashboard">
            <Button variant="default">Acessar Dashboard</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            Monitore seus estoques em tempo real
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Sistema IoT inteligente para monitoramento de peso de bebidas e insumos. 
            Receba alertas automáticos antes do estoque acabar.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8">
                <Zap className="mr-2 h-5 w-5" />
                Começar Agora
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
            <Activity className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Monitoramento em Tempo Real</h3>
            <p className="text-muted-foreground">
              Acompanhe o peso e nível de todos os seus recipientes com atualização contínua.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
            <Bell className="h-12 w-12 text-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">Alertas Inteligentes</h3>
            <p className="text-muted-foreground">
              Receba notificações antes do estoque acabar com base em políticas customizáveis.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
            <BarChart3 className="h-12 w-12 text-accent mb-4" />
            <h3 className="text-xl font-semibold mb-2">Previsão de Consumo</h3>
            <p className="text-muted-foreground">
              Algoritmos preditivos calculam quando o estoque vai esgotar baseado no histórico.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
            <Shield className="h-12 w-12 text-success mb-4" />
            <h3 className="text-xl font-semibold mb-2">Multi-empresa</h3>
            <p className="text-muted-foreground">
              Gerencie múltiplas organizações, locais e zonas em uma única plataforma.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
            <TrendingUp className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Relatórios Completos</h3>
            <p className="text-muted-foreground">
              Análise detalhada de consumo, custos e eficiência operacional.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all">
            <Zap className="h-12 w-12 text-warning mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calibração Fácil</h3>
            <p className="text-muted-foreground">
              Sistema de calibração assistida garante precisão nas medições.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Evite rupturas de estoque e otimize sua operação com inteligência artificial e IoT.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8">
              Acessar Plataforma
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>© 2025 SmartDrink by KeyCore. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
