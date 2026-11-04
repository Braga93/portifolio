import { useEffect, useRef } from 'react';
import { CommandChip } from '../../atoms';
import { SectionHeader, TerminalEntry, TerminalPrompt } from '../../molecules';
import Section from '../../templates/Section/Section.jsx';
import useTerminal from '../../../hooks/useTerminal.js';
import { useTheme } from '../../../context/ThemeContext.jsx';
import { atalhos, boasVindas } from '../../../data/terminal.js';
import styles from './Terminal.module.css';

export default function Terminal() {
  const { tema, definirTema } = useTheme();
  const { entradas, ocupado, rodar, navegarHistorico, completar } = useTerminal({
    boasVindas,
    contexto: { tema, definirTema },
  });

  const saidaRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const saida = saidaRef.current;
    if (!saida) return undefined;
    const rolar = () => {
      saida.scrollTop = saida.scrollHeight;
    };
    const observador = new MutationObserver(rolar);
    observador.observe(saida, { childList: true, subtree: true, characterData: true });
    return () => observador.disconnect();
  }, []);

  function focarInput(evento) {
    if (evento.target.closest('a, button')) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus({ preventScroll: true });
  }

  const ultima = entradas[entradas.length - 1]?.id;

  return (
    <Section id="terminal" labelledBy="terminal-titulo" tone="deep">
      <SectionHeader
        id="terminal-titulo"
        eyebrow="03 // Terminal"
        titulo="Acesse o sistema"
        subtitulo="Um terminal de verdade: os dados vêm ao vivo da API do GitHub. Digite um comando ou toque em um atalho."
      />

      <div className={styles.window} onClick={focarInput}>
        <div className={styles.bar} aria-hidden="true">
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.title}>visitante@matrix: ~</span>
        </div>

        <div className={styles.body}>
          <div
            ref={saidaRef}
            className={styles.output}
            role="log"
            aria-live="polite"
            aria-label="Saída do terminal"
            tabIndex={0}
          >
            {entradas.map((e) => (
              <TerminalEntry key={e.id} {...e} animar={e.id === ultima} />
            ))}
          </div>

          <TerminalPrompt
            ref={inputRef}
            ocupado={ocupado}
            onSubmit={rodar}
            onHistory={navegarHistorico}
            onComplete={completar}
          />
        </div>
      </div>

      <div className={styles.shortcuts}>
        <p id="terminal-dica" className={styles.hint}>
          Atalhos:
        </p>
        <ul className={styles.chips}>
          {atalhos.map((comando) => (
            <li key={comando}>
              <CommandChip comando={comando} onRun={rodar} disabled={ocupado} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
