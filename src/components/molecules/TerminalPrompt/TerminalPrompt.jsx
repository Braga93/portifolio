import { forwardRef, useState } from 'react';
import styles from './TerminalPrompt.module.css';

const TerminalPrompt = forwardRef(function TerminalPrompt({ onSubmit, onHistory, onComplete, ocupado }, ref) {
  const [valor, setValor] = useState('');

  function enviar(evento) {
    evento.preventDefault();
    if (ocupado || !valor.trim()) return;
    onSubmit(valor);
    setValor('');
  }

  function teclas(evento) {
    if (evento.key === 'ArrowUp' || evento.key === 'ArrowDown') {
      const anterior = onHistory(evento.key === 'ArrowUp' ? 1 : -1);
      if (anterior !== null) {
        evento.preventDefault();
        setValor(anterior);
      }
    } else if (evento.key === 'Tab' && valor.trim()) {
      evento.preventDefault();
      setValor(onComplete(valor));
    }
  }

  return (
    <form className={styles.form} onSubmit={enviar}>
      <label htmlFor="terminal-input" className={styles.label}>
        <span className={styles.user}>visitante@matrix</span>
        <span className={styles.path}>:~$</span>
        <span className="visually-hidden">Digite um comando</span>
      </label>
      <input
        ref={ref}
        id="terminal-input"
        className={styles.input}
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        onKeyDown={teclas}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="send"
        placeholder={ocupado ? 'processando...' : 'digite ajuda'}
        aria-describedby="terminal-dica"
      />
    </form>
  );
});

export default TerminalPrompt;
