import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowDown, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export const HeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleContact = () => {
    const ctaSection = document.getElementById('cta-final');
    ctaSection?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[10%] left-[20%] w-[30vw] h-[30vw] min-w-[300px] rounded-full bg-glow-blue/20 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[40%] right-[10%] w-[25vw] h-[25vw] min-w-[250px] rounded-full bg-glow-purple/20 blur-[120px] pointer-events-none -z-10" />

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute top-0 left-0 w-full py-6 px-6 md:px-12 flex justify-between items-center z-50 bg-background/50 backdrop-blur-md border-b border-border/20"
      >
        <Logo />
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => handleNavClick('servicos')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Serviços
          </button>
          <button 
            onClick={() => handleNavClick('metodo')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Método
          </button>
          <a 
            href="https://godatatecnologia.atlassian.net/servicedesk/customer/portal/2/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Portal do Cliente
          </a>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleContact}
            className="border-foreground/20 bg-transparent hover:border-glow-blue hover:text-glow-blue hover:shadow-[0_0_15px_rgba(var(--glow-blue),0.5)] transition-all duration-300 rounded-full"
          >
            Contato
          </Button>

          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-surface-elevated text-foreground hover:bg-surface-dark transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </nav>

        {/* Mobile Nav area */}
        <div className="md:hidden flex items-center gap-4">
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-surface-elevated text-foreground hover:bg-surface-dark transition-colors"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
          {/* Mobile Menu Button */}
          <button 
            className="p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border z-40 animate-fade-in">
          <nav className="flex flex-col py-6 px-6 gap-4">
            <button 
              onClick={() => handleNavClick('servicos')}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Serviços
            </button>
            <button 
              onClick={() => handleNavClick('metodo')}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Método
            </button>
            <a 
              href="https://godatatecnologia.atlassian.net/servicedesk/customer/portal/2/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Portal do Cliente
            </a>
            <Button 
              variant="outline" 
              onClick={handleContact}
              className="w-full border-foreground text-foreground hover:bg-foreground hover:text-background mt-2"
            >
              Contato
            </Button>
          </nav>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 mt-24">
        <div className="container-narrow text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter leading-[1.1] mb-6 text-foreground flex flex-col items-center justify-center"
          >
            Especialistas em ambientes
            <span className="flex items-center justify-center mt-4">
              <svg 
                role="img" 
                viewBox="0 0 120 60" 
                xmlns="http://www.w3.org/2000/svg"
                className="w-auto h-20 md:h-28 lg:h-32 text-glow-blue drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] fill-current"
              >
                <path d="M52.277 32.1h7.384l-3.918-6.254-7.158 11.378h-3.24L54 23.595c.377-.527.98-.904 1.733-.904.678 0 1.28.3 1.658.83l8.74 13.638H62.9l-1.507-2.562h-7.46zm33.832 2.487v-11.83H83.32v12.96c0 .377.15.678.377.98.3.3.603.452.98.452H97.26l1.658-2.562zm-45.662-2.1c2.713 0 4.822-2.185 4.822-4.822 0-2.713-2.185-4.822-4.822-4.822H28.39v14.392h2.788V25.328h9.117a2.35 2.35 0 0 1 2.336 2.336A2.35 2.35 0 0 1 40.296 30h-7.76l8.213 7.158h3.994l-5.576-4.672zm-29.16 4.672c-3.994 0-7.158-3.24-7.158-7.158 0-3.994 3.24-7.158 7.158-7.158h8.364c3.994 0 7.158 3.24 7.158 7.158 0 3.994-3.24 7.158-7.158 7.158zm8.213-2.562a4.7 4.7 0 0 0 4.672-4.672 4.7 4.7 0 0 0-4.672-4.672h-7.987a4.7 4.7 0 0 0-4.672 4.672 4.7 4.7 0 0 0 4.672 4.672zm52.443 2.562c-3.994 0-7.158-3.24-7.158-7.158 0-3.994 3.24-7.158 7.158-7.158h9.946l-1.658 2.562h-8.138a4.7 4.7 0 0 0-4.672 4.672 4.7 4.7 0 0 0 4.672 4.672h9.946l-1.658 2.562h-8.44zm33.832-2.562c-2.1 0-3.918-1.432-4.446-3.39h11.83l1.658-2.562h-13.412c.527-1.96 2.336-3.39 4.446-3.39h8.138l1.658-2.562H105.7c-3.994 0-7.158 3.24-7.158 7.158 0 3.994 3.24 7.158 7.158 7.158h8.515l1.658-2.562h-10.097z"/>
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10"
          >
            Alta disponibilidade, performance e previsibilidade.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-6"
          >
            <Button 
              variant="default" 
              size="lg"
              onClick={handleContact}
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base rounded-full border border-foreground/20 hover:border-glow-blue hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                Falar com um especialista
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
            
            <button
              onClick={() => handleNavClick('contexto')}
              className="group flex flex-col items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              <span className="text-sm">Entenda como operamos ambientes Oracle críticos</span>
              <div className="relative">
                <ArrowDown className="h-8 w-8 transition-transform group-hover:translate-y-2 animate-bounce" style={{ animationDuration: '2s' }} />
              </div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-glow-blue/50 to-transparent relative">
          <motion.div 
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-[-1px] w-[3px] h-4 bg-glow-blue rounded-full shadow-[0_0_10px_#3b82f6]" 
          />
        </div>
      </motion.div>
    </section>
  );
};
