import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Play, Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';

export const CompareHeroSection = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (id: string) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col bg-background overflow-hidden pb-12">
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
            onClick={() => handleNavClick('video-tutorial')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Tutorial
          </button>
          <button 
            onClick={() => handleNavClick('documentation')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Documentação
          </button>
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
              onClick={() => handleNavClick('video-tutorial')}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Tutorial em Vídeo
            </button>
            <button 
              onClick={() => handleNavClick('documentation')}
              className="text-left py-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              Documentação
            </button>
          </nav>
        </div>
      )}

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center pt-32 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <div className="w-full text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-col items-center justify-center mb-6"
          >
            <h1 className="font-logo text-3xl md:text-4xl lg:text-[3.5rem] tracking-wide text-foreground drop-shadow-[0_0_40px_rgba(59,130,246,0.35)] select-none leading-none">
              COMPARE
            </h1>
            <span className="text-base md:text-xl text-glow-blue mt-4 font-normal tracking-[0.2em] uppercase drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
              Validação de Dados para GoldenGate
            </span>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Compare tabelas entre origem e destino, valide sincronismos e tenha a certeza técnica para o sucesso da sua migração Oracle.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button 
              variant="default" 
              size="lg"
              onClick={() => handleNavClick('video-tutorial')}
              className="group relative overflow-hidden bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-base rounded-full border border-foreground/20 hover:border-glow-blue hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <span className="relative z-10 flex items-center gap-2">
                Assistir Tutorial
                <Play className="h-4 w-4 transition-transform group-hover:scale-110" />
              </span>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => handleNavClick('documentation')}
              className="px-8 py-6 text-base rounded-full border-foreground/20 bg-transparent hover:border-glow-purple hover:text-glow-purple hover:shadow-[0_0_15px_rgba(var(--glow-purple),0.5)] transition-all duration-300"
            >
              Ler Documentação
            </Button>
          </motion.div>
        </div>

        {/* Video Tutorial Section */}
        <motion.div 
          id="video-tutorial"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-4xl mx-auto mt-8 rounded-2xl overflow-hidden border border-border/50 shadow-[0_0_40px_rgba(var(--glow-purple),0.15)] bg-surface-elevated relative z-10 aspect-video"
        >
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/XrOZ5aPCi3E?si=aE2c_M8qYqE2JXYT" 
            title="YouTube video tutorial" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            className="absolute inset-0 w-full h-full object-cover"
          ></iframe>
        </motion.div>
      </div>

    </section>
  );
};
