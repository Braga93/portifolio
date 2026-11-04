import { Footer, Header, MatrixRain, WhatsAppFloat } from '../../organisms';

/** Estrutura comum da página: fundo, cabeçalho, conteúdo e rodapé. */
export default function MainLayout({ children }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <MatrixRain />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        {children}
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
