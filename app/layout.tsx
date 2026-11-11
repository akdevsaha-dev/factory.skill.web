import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Header, Footer } from '@/components/shell';
import './globals.css';
const sans = Geist({ subsets: ['latin'], variable: '--font-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' });
export const metadata: Metadata = {
  metadataBase: new URL('https://factory-skills-akdevsaha.akdevsaha2003.chatgpt.site'),
  title: { default: 'Factory Skills · Give your agent an engineering standard', template: '%s · Factory Skills' },
  description: 'Open-source skills that help coding agents read your codebase, follow your conventions, and verify their work. Built for Claude Code, Codex, and more.',
  openGraph: { type: 'website', title: 'Factory Skills', description: 'Your agent. With an engineering standard.', images: ['/opengraph-image.png'] },
  icons: { icon: [{ url: '/brand/factory-mark.svg', type: 'image/svg+xml' }, { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' }], apple: '/brand/apple-touch-icon.png' },
  twitter: { card: 'summary_large_image' },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `try{const t=localStorage.getItem('factory-theme');document.documentElement.dataset.theme=t||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light')}catch{}` }} /></head><body className={`${sans.variable} ${mono.variable}`}><a className="skip-link" href="#main">Skip to content</a><Header />{children}<Footer /></body></html>;
}
