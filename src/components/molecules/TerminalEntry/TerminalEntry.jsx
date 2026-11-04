import useTypewriter from '../../../hooks/useTypewriter.js';
import styles from './TerminalEntry.module.css';

function Prompt({ comando }) {
  return (
    <p className={styles.promptLine}>
      <span className={styles.user}>visitante@matrix</span>
      <span className={styles.path}>:~$</span> <span className={styles.command}>{comando}</span>
    </p>
  );
}

function Saida({ linhas, animar }) {
  const total = linhas.reduce((soma, l) => soma + l.texto.length + 1, 0);
  const { visiveis, terminou } = useTypewriter(total, animar);

  let restante = visiveis;
  const digitadas = linhas.map((l, i) => {
    if (restante <= 0) return null;
    const texto = l.texto.slice(0, restante);
    restante -= l.texto.length + 1;
    const classe = `${styles.line} ${styles[l.tipo] ?? ''}`;
    if (l.tipo === 'link' && l.href) {
      const externo = !l.href.startsWith('mailto:');
      return (
        <p key={i} className={classe}>
          <a href={l.href} {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {texto}
          </a>
        </p>
      );
    }
    return (
      <p key={i} className={classe}>
        {texto || '\u00a0'}
      </p>
    );
  });

  if (terminou) return digitadas;
  return (
    <>
      <p className="visually-hidden">{linhas.map((l) => l.texto).join(' ')}</p>
      <div aria-hidden="true">{digitadas}</div>
    </>
  );
}

export default function TerminalEntry({ comando, linhas, estado, animar }) {
  return (
    <div className={styles.entry}>
      {comando && <Prompt comando={comando} />}
      {estado === 'carregando' ? (
        <p className={`${styles.line} ${styles.suave} ${styles.loading}`}>conectando à Matrix</p>
      ) : (
        <Saida linhas={linhas} animar={animar} />
      )}
    </div>
  );
}
