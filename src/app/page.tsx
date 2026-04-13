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
        <div className="h-screen flex flex-col">
          <Hero />
          <Events />
        </div>
        <Statement />
        <Cases />
        <Clients />
        <VideoSection />
        <About />
        <Testimonial />
        <WorldTime />
        <Footer />
      </main>
    </>
  );
}
