import type { Metadata } from "next";
import Header from '@/components/layout/header';
import "./globals.css";
import 'normalize.css';
import Footer from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title:       "Modern frontend, homework 1",
  description: "Modern frontend, homework 1. by @pnmrvvtl",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className="flex-1 bg-gray-100">
          <Toaster/>
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}