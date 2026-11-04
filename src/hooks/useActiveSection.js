import { useEffect, useState } from 'react';

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
      { rootMargin: '-45% 0px -50% 0px' },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [chave]);

  return ativa;
}
