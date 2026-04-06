import { AnimatedSection } from '@/components/AnimatedSection';
import { Check } from 'lucide-react';

const criteria = [
  'Ambientes críticos',
  'Alta dependência de Oracle',
  'Necessidade de previsibilidade',
  'Busca por especialistas, não generalistas',
  'Migrações complexas com GoldenGate',
];

export const AudienceSection = () => {
  return (
    <section className="section-spacing bg-background">
      <div className="container-narrow">
        <AnimatedSection>
          <div className="text-center mb-12 md:mb-16">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
              Para quem é
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-6 text-foreground">
              Este serviço é para empresas
              <br />
              <span className="font-normal">que não podem errar</span>
            </h2>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <ul className="space-y-4 md:space-y-5 max-w-lg mx-auto">
            {criteria.map((item, index) => (
              <li 
                key={item} 
                className="flex items-center gap-4 text-lg"
              >
                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">
                  <Check className="w-4 h-4 text-foreground" strokeWidth={2.5} />
                </span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </section>
  );
};
