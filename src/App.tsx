import { useLenis } from '@/hooks/useLenis';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/HeroSection';
import { AboutSection } from '@/components/AboutSection';
import { OfficersSection } from '@/components/OfficersSection';
import { GallerySection } from '@/components/GallerySection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';

function App() {
  useLenis();

  return (
    <div className="font-body antialiased bg-light text-gray-800 overflow-x-hidden">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <OfficersSection />
        <GallerySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
