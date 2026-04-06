import { AnimatedSection } from '@/components/AnimatedSection';
import { useParallax } from '@/hooks/useScrollAnimation';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const ContextSection = () => {
  const scrollYOffset = useParallax();
  const parallaxOffset = scrollYOffset * 0.1;
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "50%", "100%"]);

  return (
    <section ref={containerRef} id="contexto" className="relative py-32 md:py-48 overflow-hidden bg-background">
      {/* Parallax Background Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ 
          transform: `translateY(${parallaxOffset}px)`,
          willChange: 'transform',
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 50px,
              hsl(var(--foreground)) 50px,
              hsl(var(--foreground)) 51px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 50px,
              hsl(var(--foreground)) 50px,
              hsl(var(--foreground)) 51px
            )
          `
        }}
      />
      
      <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-[2px] border-l-2 border-dashed border-border/30">
        <motion.div 
          style={{ height: lineHeight }}
          className="w-full bg-gradient-to-b from-transparent via-glow-blue to-glow-purple shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        />
      </div>

      <div className="relative container-narrow glass-panel rounded-3xl p-12 lg:p-20 z-10 border border-glow-blue/20 shadow-[0_0_50px_rgba(59,130,246,0.05)]">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-glow-blue/20 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-glow-purple/20 blur-[60px] rounded-full pointer-events-none" />
        
        <AnimatedSection>
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-light leading-relaxed text-center text-foreground">
            <span className="text-glow-blue text-6xl block mb-4 opacity-50 leading-none">"</span>
            Quanto custa 1 hora da sua
            <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-glow-blue to-glow-purple font-medium drop-shadow-sm"> empresa parada?</span>
          </blockquote>
        </AnimatedSection>
      </div>
    </section>
  );
};
