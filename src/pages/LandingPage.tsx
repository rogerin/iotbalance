import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Activity, Bell, BarChart3, Shield, Zap, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { DeviceSimulation } from "@/components/landing/DeviceSimulation";
import keycoreLogo from "@/assets/keycore-logo.png";
import { memo } from "react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Structured Data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "KeyCore Tech Hub",
          "url": "https://keycore.com.br",
          "logo": keycoreLogo,
          "description": "Empresa especializada em soluções IoT para monitoramento inteligente"
        })}
      </script>

      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between" aria-label="Navegação principal">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-primary" aria-hidden="true" />
            <div>
              <span className="text-2xl font-bold text-foreground">IoT Balance</span>
              <p className="text-xs text-muted-foreground">by KeyCore</p>
            </div>
          </div>
          <Link to="/dashboard" aria-label="Acessar dashboard do sistema">
            <Button variant="default">Acessar Dashboard</Button>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 text-center" aria-labelledby="hero-heading">
          <div className="max-w-4xl mx-auto">
            <h1 id="hero-heading" className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Monitore seus estoques em tempo real
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Sistema IoT inteligente para monitoramento de peso de bebidas e insumos. 
              Receba alertas automáticos antes do estoque acabar.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/dashboard" aria-label="Começar a usar o IoT Balance">
                <Button size="lg" className="text-lg px-8">
                  <Zap className="mr-2 h-5 w-5" aria-hidden="true" />
                  Começar Agora
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="text-lg px-8" aria-label="Ver demonstração do sistema">
                Ver Demo
              </Button>
            </div>
          </div>
        </section>

        {/* Live Simulation */}
        <section className="container mx-auto px-4 py-20 bg-gradient-to-b from-background to-primary/5" aria-labelledby="simulation-heading">
          <div className="max-w-6xl mx-auto">
            <DeviceSimulation />
          </div>
        </section>

        {/* Features Grid */}
        <section className="container mx-auto px-4 py-20" aria-labelledby="features-heading">
          <h2 id="features-heading" className="text-3xl font-bold text-center mb-12">Recursos Principais</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <article className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 transition-all rounded-lg">
              <Activity className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Monitoramento em Tempo Real</h3>
              <p className="text-muted-foreground">
                Acompanhe o peso e nível de todos os seus recipientes com atualização contínua.
              </p>
            </article>

            <article className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 transition-all rounded-lg">
              <Bell className="h-12 w-12 text-warning mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Alertas Inteligentes</h3>
              <p className="text-muted-foreground">
                Receba notificações antes do estoque acabar com base em políticas customizáveis.
              </p>
            </article>

            <article className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 transition-all rounded-lg">
              <BarChart3 className="h-12 w-12 text-accent mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Previsão de Consumo</h3>
              <p className="text-muted-foreground">
                Algoritmos preditivos calculam quando o estoque vai esgotar baseado no histórico.
              </p>
            </article>

            <article className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 transition-all rounded-lg">
              <Shield className="h-12 w-12 text-success mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Multi-empresa</h3>
              <p className="text-muted-foreground">
                Gerencie múltiplas organizações, locais e zonas em uma única plataforma.
              </p>
            </article>

            <article className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 transition-all rounded-lg">
              <TrendingUp className="h-12 w-12 text-primary mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Relatórios Completos</h3>
              <p className="text-muted-foreground">
                Análise detalhada de consumo, custos e eficiência operacional.
              </p>
            </article>

            <article className="p-6 bg-card/50 backdrop-blur border border-border/50 hover:border-primary/50 transition-all rounded-lg">
              <Zap className="h-12 w-12 text-warning mb-4" aria-hidden="true" />
              <h3 className="text-xl font-semibold mb-2">Calibração Fácil</h3>
              <p className="text-muted-foreground">
                Sistema de calibração assistida garante precisão nas medições.
              </p>
            </article>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-20" aria-labelledby="cta-heading">
          <div className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-lg text-center">
            <h2 id="cta-heading" className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Evite rupturas de estoque e otimize sua operação com inteligência artificial e IoT.
            </p>
            <Link to="/dashboard" aria-label="Acessar plataforma IoT Balance">
              <Button size="lg" className="text-lg px-8">
                Acessar Plataforma
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <a 
              href="https://keycore.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-opacity hover:opacity-80"
              aria-label="Visitar site da KeyCore Tech Hub"
            >
              <img 
                src={keycoreLogo} 
                alt="KeyCore Tech Hub - Empresa especializada em soluções IoT" 
                className="h-8 sm:h-10"
                width="120"
                height="40"
                loading="lazy"
              />
            </a>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 IoT Balance by <a 
                href="https://keycore.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
                aria-label="KeyCore Tech Hub website"
              >
                KeyCore Tech Hub
              </a>. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default memo(LandingPage);
