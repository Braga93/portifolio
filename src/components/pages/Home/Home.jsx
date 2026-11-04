import MainLayout from '../../templates/MainLayout/MainLayout.jsx';
import { About, Contact, Hero, Services, Terminal, Testimonials } from '../../organisms';

/** Página inicial: monta as seções na ordem em que aparecem. */
export default function Home() {
  return (
    <MainLayout>
      <Hero />
      <Services />
      <About />
      <Terminal />
      <Testimonials />
      <Contact />
    </MainLayout>
  );
}
