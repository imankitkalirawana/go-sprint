import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import Navbar from '@/components/sections/Navbar';
import { Providers } from './providers';
import { auth } from '@/auth';
import { APP_INFO } from '@/lib/config';

export const metadata: Metadata = {
  title: APP_INFO.name,
  description: 'A template for Next.js 14.2+ with Auth.js and MongoDB'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="light">
            <Navbar session={session} />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
