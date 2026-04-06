import { Logo } from '@/components/Logo';
import { Linkedin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 bg-background border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Logo and tagline */}
          <div className="text-center md:text-left">
            <Logo className="mb-3" />
            <p className="text-sm text-muted-foreground">
              Especialistas em Oracle. Nada mais.
            </p>
          </div>

          {/* Contact and Social */}
          <div className="flex flex-col items-center md:items-end gap-4">
            <a 
              href="https://godata.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              godata.com.br
            </a>
            <a 
              href="https://linkedin.com/company/godata" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-xs text-muted-foreground">
            © {currentYear} GO DATA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
