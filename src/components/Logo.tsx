import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  inverted?: boolean;
}

export const Logo = ({ className, inverted = false }: LogoProps) => {
  return (
    <span
      className={cn(
        'font-logo text-2xl md:text-3xl tracking-wider select-none',
        inverted ? 'text-background' : 'text-foreground',
        className
      )}
    >
      GO DATA
    </span>
  );
};
