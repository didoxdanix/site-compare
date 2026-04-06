import { AnimatedSection } from '@/components/AnimatedSection';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export const CTASection = () => {
  const handleContact = () => {
    window.open('mailto:contato@godata.com.br?subject=Contato via Site', '_blank');
  };

  return (
    <section id="cta-final" className="section-spacing bg-foreground">
      <div className="container-narrow text-center">
        <AnimatedSection>
          <p className="text-sm uppercase tracking-widest text-background/60 mb-6">
            Próximo passo
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-tight mb-8 leading-tight text-background">
            Vamos conversar
            <br />
            <span className="font-normal">antes do incidente?</span>
          </h2>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleContact}
            className="group border-foreground text-foreground hover:bg-foreground hover:text-background px-8 py-6 text-base"
          >
            Agendar uma conversa
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
};
