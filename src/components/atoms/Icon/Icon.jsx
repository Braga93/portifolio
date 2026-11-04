const caminhos = {
  email:
    'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
  telefone:
    'M2.25 6.58c0-1.017.765-1.848 1.772-1.92 1.025-.074 2.054-.074 3.079 0 1.007.072 1.771.903 1.771 1.92v1.547c0 .902-.511 1.713-1.296 2.175l-1.076.634a11.056 11.056 0 004.83 4.83l.634-1.076a17.51 17.51 0 012.175-1.296h1.547c1.022 0 1.853.765 1.92 1.771.074 1.025.074 2.054 0 3.079-.072 1.007-.903 1.771-1.92 1.771h-1.07c-7.41 0-13.5-6.09-13.5-13.5v-1.07c0-1.017.765-1.848 1.772-1.92z',
};

/** Ícone de linha. Decorativo: o texto ao lado já diz o que é. */
export default function Icon({ name, className = '' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" focusable="false">
      <path strokeLinecap="round" strokeLinejoin="round" d={caminhos[name]} />
    </svg>
  );
}
