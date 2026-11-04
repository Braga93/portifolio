import { useEffect, useState } from 'react';

/**
 * Observa as seções da página (IntersectionObserver) e devolve o id
 * da que está no centro da tela. Usado para destacar o item do menu.
 */
export default function useActiveSection(ids) {
  const [ativa, setAtiva] = useState(ids[0]);
  const chave = ids.join(',');

  useEffect(() => {
    const elementos = chave
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elementos.length || !('IntersectionObserver' in window)) return undefined;

    const observador = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          if (entrada.isIntersecting) setAtiva(entrada.target.id);
        });
      },
      // só conta a faixa do meio da tela
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [chave]);

  return ativa;
}
