import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ScrollWatcher from "./components/ScrollWatcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "Dream — Comunicação & Eventos",
  description:
    "Transformamos ideias em experiências que despertam todos os sentidos. Envolvemos e conectamos pessoas e marcas.",
  keywords: ["eventos", "comunicação", "incentivo", "convenções", "lançamentos", "premiações"],
  openGraph: {
    title: "Dream — Comunicação & Eventos",
    description: "Transformamos ideias em experiências que despertam todos os sentidos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden">
        <ScrollWatcher />
        {children}
      </body>
    </html>
  );
}
