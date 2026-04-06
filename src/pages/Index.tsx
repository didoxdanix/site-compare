import { CompareHeroSection } from '@/components/sections/CompareHeroSection';
import { CompareDocSection } from '@/components/sections/CompareDocSection';
import { Footer } from '@/components/sections/Footer';

const Index = () => {
  return (
    <main className="min-h-screen relative">
      <CompareHeroSection />
      <div className="relative z-20 bg-background">
        <CompareDocSection />
      </div>
      <Footer />
    </main>
  );
};

export default Index;
