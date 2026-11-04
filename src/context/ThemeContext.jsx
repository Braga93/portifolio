import { createContext, useCallback, useContext, useEffect, useState } from 'react';

// Dois temas: 'red' (pílula vermelha, padrão) e 'blue' (pílula azul).
// O tema fica no atributo data-theme do <html>, e o CSS troca as cores
// pelas variáveis definidas em styles/tokens.css.
const ThemeContext = createContext(null);
const CHAVE = 'portfolio-tema';

function temaSalvo() {
  try {
    return localStorage.getItem(CHAVE) === 'blue' ? 'blue' : 'red';
  } catch {
    return 'red';
  }
}

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(temaSalvo);

  useEffect(() => {
    document.documentElement.dataset.theme = tema;
    try {
      localStorage.setItem(CHAVE, tema);
    } catch {
      /* navegação privada: o tema só não fica salvo */
    }
  }, [tema]);

  const alternarTema = useCallback(() => {
    setTema((atual) => (atual === 'red' ? 'blue' : 'red'));
  }, []);

  const definirTema = useCallback((novo) => {
    if (novo === 'red' || novo === 'blue') setTema(novo);
  }, []);

  return (
    <ThemeContext.Provider value={{ tema, alternarTema, definirTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const contexto = useContext(ThemeContext);
  if (!contexto) throw new Error('useTheme precisa estar dentro de <ThemeProvider>');
  return contexto;
}
