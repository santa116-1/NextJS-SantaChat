import React from 'react';

import './globals.css';
import './custom.css';
import { Inter } from 'next/font/google';
import Header from './header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Header />
      <body className={`${inter.className} overflow-hidden fixed w-full`}>{children}</body>
    </html>
  );
}