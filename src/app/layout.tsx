import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AudioPlayerProvider } from "@/contexts/AudioPlayerContext";
import { GlobalMiniPlayer } from "@/components/GlobalMiniPlayer";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

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
    <html lang="ru">
      <body className={`${spaceGrotesk.className} bg-[#0b090f] text-white antialiased`}>
        <AudioPlayerProvider>
          {children}
          <GlobalMiniPlayer />
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
