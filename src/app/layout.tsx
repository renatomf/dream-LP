import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const metropolisBold = localFont({
  src: "../../public/fonts/metropolis.bold.otf",
  variable: "--font-metropolis-bold",
  display: "swap",
});

const metropolisSemiBold = localFont({
  src: "../../public/fonts/metropolis.semi-bold.otf",
  variable: "--font-metropolis-semibold",
  display: "swap",
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
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${metropolisBold.variable} ${metropolisSemiBold.variable} antialiased`}>
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
