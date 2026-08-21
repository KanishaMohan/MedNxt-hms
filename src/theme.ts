import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: { main: '#4f46e5', dark: '#3730a3', light: '#eef2ff' },
    secondary: { main: '#64748b' },
    success: { main: '#16a34a', light: '#dcfce7' },
    warning: { main: '#f97316', light: '#ffedd5' },
    error: { main: '#dc2626', light: '#fee2e2' },
    background: { default: '#f5f7fb', paper: '#ffffff' },
    text: { primary: '#172033', secondary: '#718096' },
  },
  typography: {
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.03em' },
    h2: { fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontSize: '1.1rem', fontWeight: 700 },
    body1: { fontSize: '0.875rem' },
    body2: { fontSize: '0.78rem' },
    caption: { fontSize: '0.68rem', letterSpacing: '0.04em' },
  },
  shape: { borderRadius: 10 },
  components: {
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 700, borderRadius: 8, boxShadow: 'none' } } },
    MuiTextField: { defaultProps: { size: 'small' } },
    MuiOutlinedInput: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiCard: { styleOverrides: { root: { border: '1px solid #e8ebf2', boxShadow: '0 2px 10px rgba(25, 35, 60, 0.04)' } } },
  },
});
