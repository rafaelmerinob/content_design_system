'use client';
import { ThemeProvider } from 'next-themes';

export default function ThemeProviderWrapper({ children }) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {children}
    </ThemeProvider>
  );
}
