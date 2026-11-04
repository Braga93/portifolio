import { ThemeProvider } from './context/ThemeContext.jsx';
import Home from './components/pages/Home/Home.jsx';

export default function App() {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}
