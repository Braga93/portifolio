import { useEffect, useState } from 'react';
import usePrefersReducedMotion from './usePrefersReducedMotion.js';

/**
 * Efeito de digitação: devolve quantos caracteres já devem aparecer.
 * O passo se ajusta ao tamanho do texto, então respostas longas
 * também terminam em cerca de um segundo.
 */
export default function useTypewriter(totalCaracteres, ativo = true) {
  const reduzir = usePrefersReducedMotion();
  const animar = ativo && !reduzir;
  const [visiveis, setVisiveis] = useState(animar ? 0 : totalCaracteres);

  useEffect(() => {
    if (!animar) {
      setVisiveis(totalCaracteres);
      return undefined;
    }
    const passo = Math.max(2, Math.ceil(totalCaracteres / 60));
    const timer = setInterval(() => {
      setVisiveis((atual) => {
        const proximo = Math.min(totalCaracteres, atual + passo);
        if (proximo >= totalCaracteres) clearInterval(timer);
        return proximo;
      });
    }, 16);
    return () => clearInterval(timer);
  }, [totalCaracteres, animar]);

  return { visiveis, terminou: visiveis >= totalCaracteres };
}
