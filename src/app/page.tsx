import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import Events from './components/sections/Events';
import Statement from './components/sections/Statement';
import Cases from './components/sections/Cases';
import Clients from './components/sections/Clients';
import VideoSection from './components/sections/VideoSection';
import About from './components/sections/About';
import Testimonial from './components/sections/Testimonial';
import WorldTime from './components/sections/WorldTime';
import Footer from './components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <div className="flex flex-col">
          <Hero />
          <Events />
        </div>
        <Statement />
        <Cases />
        <Clients />
        <div className="relative">
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              background: 'radial-gradient(ellipse 75% 65% at 92% 50%, rgba(255,85,0,0.30) 0%, transparent 80%)',
              mixBlendMode: 'multiply',
            }}
          />
          <VideoSection />
          <About />
          <Testimonial />
        </div>
        <WorldTime />
        <Footer />
      </main>
    </>
  );
}
