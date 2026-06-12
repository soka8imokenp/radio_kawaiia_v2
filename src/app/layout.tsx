import type { Metadata } from "next";
import { Google_Sans_Flex, DM_Mono } from "next/font/google";
import "./globals.css";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { GlobalMiniPlayer } from "@/components/GlobalMiniPlayer";
import TopBar from "@/components/top-bar/top-bar";
import FooterBar from "@/components/footer-bar/footer-bar";
import SpotlightGrid from "@/components/SpotlightGrid";

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
      <body className="flex flex-col min-h-screen antialiased bg-transparent text-text-main theme-transition relative">
        <AudioPlayerProvider>
          {/* Spotlight Grid Background */}
          <SpotlightGrid />
          
          <TopBar />
          <main className="flex-1 flex flex-col items-center justify-center w-full max-w-[960px] mx-auto py-8 px-4 md:px-6 relative z-10">
            {children}
          </main>
          <FooterBar />
          <GlobalMiniPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
