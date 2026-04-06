import { motion } from 'framer-motion';
import { useRef } from 'react';

const methods = [
  {
    title: 'Menos reação',
    subtitle: 'Mais previsibilidade',
    description: 'Antecipamos problemas antes que se tornem incidentes.',
  },
  {
    title: 'Menos promessas',
    subtitle: 'Mais controle',
    description: 'Entregamos resultados mensuráveis e documentados.',
  },
  {
    title: 'Menos generalismo',
    subtitle: 'Mais especialização',
    description: 'Focamos exclusivamente no ecossistema Oracle.',
  },
];

export const MethodSection = () => {
  const scrollRef = useRef<HTMLElement>(null);

  return (
    <section ref={scrollRef} id="metodo" className="relative section-spacing overflow-hidden bg-background">
      <div className="relative container-wide">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm uppercase tracking-widest text-glow-purple mb-4 font-semibold">
            Nosso Método
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            Como trabalhamos
          </h2>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 z-10">
          {/* Animated Connecting Line */}
          <div className="hidden md:block absolute top-[40%] left-[10%] right-[10%] h-[2px] bg-border/40 -z-10">
            <motion.div 
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-glow-blue via-glow-purple to-glow-blue shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
          </div>

          {methods.map((method, index) => (
            <motion.div 
              key={method.title} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group glass-panel p-8 md:p-10 h-full rounded-3xl relative overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] hover:border-glow-blue/30 bg-surface-elevated"
            >
              <div className="md:absolute md:top-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-4 h-4 rounded-full bg-background border-2 border-border group-hover:border-glow-blue group-hover:shadow-[0_0_15px_rgba(59,130,246,0.8)] transition-all duration-500 z-20 mb-6 md:mb-0" />
              
              <div className="mb-6 relative z-10 md:mt-4">
                <h3 className="text-lg font-medium text-glow-blue/80 group-hover:text-glow-blue transition-colors duration-300">
                  {method.title}
                </h3>
                <p className="text-2xl md:text-3xl font-semibold mt-2 text-foreground group-hover:bg-clip-text group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-300">
                  {method.subtitle}
                </p>
              </div>
              <p className="text-muted-foreground leading-relaxed relative z-10 group-hover:text-foreground/80 transition-colors duration-300">
                {method.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
