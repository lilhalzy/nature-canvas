import '@/styles/globals.css';
import { Alata } from '@next/font/google';
import type { AppProps } from 'next/app';

const alata = Alata({
  subsets: ['latin'],
  variable: '--font-alata',
  weight: '400',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${alata.variable} font-sans h-full`}>
      <Component {...pageProps} />
    </div>
  );
}
