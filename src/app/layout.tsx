import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
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
    <html lang="pt-BR" className={`${geistSans.variable} antialiased`}>
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
