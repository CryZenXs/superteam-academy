import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { SolanaContext } from "@/contexts/SolanaContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ToastProvider } from "@/contexts/ToastContext";
import { PlayerProvider } from "@/contexts/PlayerContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Superteam Academy | Domine Solana",
  description: "A melhor plataforma de aprendizado para desenvolvedores Solana no Brasil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <SolanaContext>
          <ToastProvider>
            <PlayerProvider>
              <Navbar />
              <main className="flex-1">
                <PageTransition>
                  {children}
                </PageTransition>
              </main>
              <Footer />
            </PlayerProvider>
          </ToastProvider>
        </SolanaContext>
      </body>
    </html>
  );
}
