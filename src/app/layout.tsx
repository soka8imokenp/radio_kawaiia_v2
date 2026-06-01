import type { Metadata } from "next";
import { Google_Sans_Flex, DM_Mono } from "next/font/google";
import "./globals.css";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { GlobalMiniPlayer } from "@/components/GlobalMiniPlayer";

const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin", "latin-ext"],
  adjustFontFallback: false,
  display: "swap",
  fallback: ["system-ui", "arial", "sans-serif"],
});

const dmMono = DM_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "monospace"], 
});

export const metadata: Metadata = {
  title: "KawaiiUZ - Аниме радио",
  description: "Слушайте лучшие аниме-песни, опенинги и эндинги",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${googleSansFlex.variable} ${dmMono.variable} antialiased`} suppressHydrationWarning>
      <body className="antialiased">
        <AudioPlayerProvider>
          {children}
          <GlobalMiniPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
