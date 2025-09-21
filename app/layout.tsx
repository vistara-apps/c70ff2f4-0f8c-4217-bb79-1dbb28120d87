import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'RhythmFlow AI - Choreo your vibe',
  description: 'AI-powered dance choreography assistant for creators',
  openGraph: {
    title: 'RhythmFlow AI',
    description: 'Choreo your vibe with AI-powered dance sequences',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
