import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Database, Server, Shield, Gauge, FileCheck, Cloud } from 'lucide-react';
import { MouseEvent } from 'react';

const services = [
  {
    title: 'Oracle Database',
    description: 'On-premises e cloud',
    icon: Database,
  },
  {
    title: 'Exadata e ODA',
    description: 'Engineered systems',
    icon: Server,
  },
  {
    title: 'Alta Disponibilidade',
    description: 'Data Guard e MAA',
    icon: Shield,
  },
  {
    title: 'Performance',
    description: 'Tuning e estabilidade',
    icon: Gauge,
  },
  {
    title: 'Governança Técnica',
    description: 'Padrões e processos',
    icon: FileCheck,
  },
  {
    title: 'Cloud OCI',
    description: 'Oracle Cloud Infrastructure',
    icon: Cloud,
  },
];

const BentoCard = ({ service, index }: { service: any, index: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl border border-border/50 bg-surface-elevated overflow-hidden glass-panel min-h-[300px] lg:min-h-[340px] flex flex-col`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(var(--glow-blue), 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full flex flex-col justify-between p-8">
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className={`p-4 rounded-2xl bg-background/50 backdrop-blur border border-border/50 group-hover:border-glow-blue/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-500`}>
              <service.icon className="w-8 h-8 text-foreground group-hover:text-glow-blue transition-colors duration-500" strokeWidth={1.5} />
            </div>
            <span className="text-4xl font-light text-muted-foreground/30 group-hover:text-glow-blue/30 transition-colors duration-500">
              0{index + 1}
            </span>
          </div>
          <h3 className="text-2xl font-semibold mb-3 text-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:to-muted-foreground transition-all duration-500">
            {service.title}
          </h3>
          <p className="text-muted-foreground text-lg">
            {service.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const ServicesSection = () => {
  return (
    <section id="servicos" className="section-spacing bg-background relative overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-20" />
      <div className="absolute top-3/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-border to-transparent opacity-20" />

      <div className="container-wide relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-sm uppercase tracking-widest text-glow-blue mb-4 font-semibold">
            Nossos Serviços
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
            O que fazemos
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <BentoCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
