import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = ({ children, className, delay = 0 }: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <div
      ref={ref}
      className={cn(
        'fade-in-up',
        isVisible && 'visible',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
