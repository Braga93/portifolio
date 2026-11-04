import { useCallback, useRef, useState } from 'react';
import { executar, nomesVisiveis, resolverNome } from '../services/terminal/comandos.js';
import { nomesEmCache } from '../services/github.js';

let contador = 0;
const novoId = () => ++contador;

export default function useTerminal({ boasVindas, contexto }) {
  const [entradas, setEntradas] = useState(() => [
    { id: novoId(), comando: null, linhas: boasVindas, estado: 'pronto' },
  ]);
  const [ocupado, setOcupado] = useState(false);

  const historico = useRef([]);
  const posicao = useRef(-1);
  const busca = useRef(null);
  const contextoAtual = useRef(contexto);
  contextoAtual.current = contexto;

  const rodar = useCallback(async (textoDigitado) => {
    const texto = textoDigitado.trim();
    if (!texto) return;

    historico.current = [texto, ...historico.current.filter((c) => c !== texto)].slice(0, 50);
    posicao.current = -1;

    const [nome, ...args] = texto.split(/\s+/);
    if (resolverNome(nome) === 'limpar') {
      busca.current?.abort();
      setEntradas([]);
      setOcupado(false);
      return;
    }

    busca.current?.abort();
    const controle = new AbortController();
    busca.current = controle;

    const id = novoId();
    setEntradas((atual) => [...atual, { id, comando: texto, linhas: [], estado: 'carregando' }]);
    setOcupado(true);

    try {
      const linhas = await executar(nome, args, { ...contextoAtual.current, signal: controle.signal });
      setEntradas((atual) => atual.map((e) => (e.id === id ? { ...e, linhas, estado: 'pronto' } : e)));
    } catch (erro) {
      if (erro.name !== 'AbortError') throw erro;
      setEntradas((atual) =>
        atual.map((e) => (e.id === id ? { ...e, linhas: [{ texto: '^C cancelado', tipo: 'suave' }], estado: 'pronto' } : e)),
      );
    } finally {
      if (busca.current === controle) setOcupado(false);
    }
  }, []);

  const navegarHistorico = useCallback((direcao) => {
    const lista = historico.current;
    if (!lista.length) return null;
    posicao.current = Math.max(-1, Math.min(lista.length - 1, posicao.current + direcao));
    return posicao.current === -1 ? '' : lista[posicao.current];
  }, []);

  const completar = useCallback((texto) => {
    const [nome, parcial, ...resto] = texto.trimStart().split(/\s+/);
    if (resto.length) return texto;
    if (parcial === undefined) {
      const opcoes = nomesVisiveis.filter((n) => n.startsWith(nome.toLowerCase()));
      return opcoes.length === 1 ? `${opcoes[0]} ` : texto;
    }
    if (resolverNome(nome) === 'projeto') {
      const opcoes = nomesEmCache().filter((n) => n.toLowerCase().startsWith(parcial.toLowerCase()));
      return opcoes.length === 1 ? `${nome} ${opcoes[0]}` : texto;
    }
    if (resolverNome(nome) === 'pilula') {
      const opcoes = ['vermelha', 'azul'].filter((n) => n.startsWith(parcial.toLowerCase()));
      return opcoes.length === 1 ? `${nome} ${opcoes[0]}` : texto;
    }
    return texto;
  }, []);

  return { entradas, ocupado, rodar, navegarHistorico, completar };
}
