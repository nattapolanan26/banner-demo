import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';
import { useAuth } from './hooks/auth';
import './styles.css';
// ----------------------------------------------------------------------

export default function App() {
  const { cookies } = useAuth();

  const router = Router(cookies.token);

  return (
    <HelmetProvider>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        {router}
      </ThemeProvider>
    </HelmetProvider>
  );
}
