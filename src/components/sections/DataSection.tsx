import { AnimatedSection } from '@/components/AnimatedSection';
import { BrainCircuit, Sparkles, BarChart3, Workflow, Bot, Layers, DatabaseZap, Users, ShieldCheck } from 'lucide-react';
import CountUp from 'react-countup';

const capabilities = [
  {
    title: 'Modelos LLM Aplicados',
    description: 'Utilizamos Large Language Models para interpretar, classificar e enriquecer dados com precisão contextual.',
    icon: BrainCircuit,
  },
  {
    title: 'Análise Preditiva',
    description: 'Algoritmos de machine learning que antecipam tendências e padrões ocultos nos seus dados.',
    icon: BarChart3,
  },
  {
    title: 'Automação Inteligente',
    description: 'Pipelines automatizados de limpeza, transformação e validação com IA integrada.',
    icon: Workflow,
  },
  {
    title: 'Processamento de Linguagem Natural',
    description: 'Extração de insights a partir de dados não estruturados — documentos, logs e comunicações.',
    icon: Bot,
  },
  {
    title: 'Enriquecimento Semântico',
    description: 'Classificação e categorização automática de dados usando embeddings e modelos vetoriais.',
    icon: Sparkles,
  },
  {
    title: 'Data Lakehouse & Integração',
    description: 'Arquiteturas modernas que combinam data lake e data warehouse para análises unificadas.',
    icon: Layers,
  },
];

export const DataSection = () => {
  return (
    <section id="dados" className="section-spacing bg-secondary">
      <div className="container-wide">
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-24">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Inteligência de Dados
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground">
              Tratamento Avançado de Dados
            </h2>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Combinamos o poder dos <span className="text-glow-purple font-medium drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">Large Language Models</span> com 
              métodos modernos de engenharia de dados para transformar informação bruta em vantagem competitiva.
            </p>
          </div>
        </AnimatedSection>

        {/* Dynamic Stats Banner */}
        <AnimatedSection delay={200}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { label: 'Terabytes Processados', value: 500, suffix: '+', icon: DatabaseZap },
              { label: 'Modelos Implementados', value: 150, suffix: '', icon: BrainCircuit },
              { label: 'Uptime Garantido', value: 99.9, suffix: '%', icon: ShieldCheck, decimals: 1 },
            ].map((stat, i) => (
              <div key={stat.label} className="glass-panel p-8 rounded-3xl text-center group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-glow-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <stat.icon className="w-10 h-10 mx-auto mb-4 text-glow-purple/50 group-hover:text-glow-purple transition-colors duration-500" />
                <div className="text-5xl font-bold text-foreground mb-2 flex items-center justify-center">
                  <CountUp
                    end={stat.value}
                    decimals={stat.decimals || 0}
                    duration={2.5}
                    enableScrollSpy
                    scrollSpyOnce
                    separator="."
                  />
                  <span className="text-glow-purple ml-1">{stat.suffix}</span>
                </div>
                <div className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {capabilities.map((item, index) => (
            <AnimatedSection key={item.title} delay={index * 100}>
              <div className="group glass-panel p-8 md:p-10 h-full rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(168,85,247,0.15)] hover:border-glow-purple/30">
                <div className="absolute top-0 right-0 p-8 w-32 h-32 bg-glow-purple/10 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-glow-purple/20 transition-all duration-500" />
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="p-3 rounded-2xl bg-surface-elevated border border-border/50 group-hover:border-glow-purple/50 transition-colors duration-500">
                    <item.icon className="w-6 h-6 text-foreground group-hover:text-glow-purple transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider group-hover:text-glow-purple/50 transition-colors duration-500">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground relative z-10">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm relative z-10 group-hover:text-muted-foreground/90 transition-colors duration-300">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={700}>
          <div className="mt-16 md:mt-24 text-center">
            <div className="inline-flex items-center gap-3 border border-border bg-card px-6 py-3 rounded-sm">
              <BrainCircuit className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
              <p className="text-sm text-muted-foreground">
                Tecnologias: <span className="text-foreground">OpenAI</span> · <span className="text-foreground">LangChain</span> · <span className="text-foreground">Oracle AI Vector Search</span> · <span className="text-foreground">Python</span> · <span className="text-foreground">Apache Spark</span>
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
