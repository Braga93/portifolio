import { useEffect, useState } from 'react';

const CONSULTA = '(prefers-reduced-motion: reduce)';

export default function usePrefersReducedMotion() {
  const [reduzir, setReduzir] = useState(() => window.matchMedia?.(CONSULTA).matches ?? false);

  useEffect(() => {
    const media = window.matchMedia?.(CONSULTA);
    if (!media) return undefined;
    const aoMudar = (e) => setReduzir(e.matches);
    media.addEventListener('change', aoMudar);
    return () => media.removeEventListener('change', aoMudar);
  }, []);

  return reduzir;
}
