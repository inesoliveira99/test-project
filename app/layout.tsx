import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Hello World App',
  description: 'A simple Next.js app with a color-changing button',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}