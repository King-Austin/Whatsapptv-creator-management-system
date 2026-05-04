import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Stats from '@/sections/About'; // Renamed About to Stats in content
import BlogPreview from '@/sections/BlogPreview';
import CTA from '@/sections/CTA';
import Contact from '@/sections/Contact';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Stats />
      <BlogPreview />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}

