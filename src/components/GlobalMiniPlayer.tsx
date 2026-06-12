'use client';

import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';
import { useAudioPlayer } from '@/contexts/AudioPlayerContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

export const GlobalMiniPlayer = () => {
  const { currentTrack, isPlaying, togglePlayPause, volume, setVolume } = useAudioPlayer();
  const [isMinimized, setIsMinimized] = useState(false);
  const pathname = usePathname();

  if (pathname === '/') return null;
  if (!currentTrack) return null;

  const VolumeIcon = volume === 0 ? VolumeX : Volume2;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-[#8a60c2] shadow-lg hover:scale-105 transition flex items-center justify-center group"
      >
        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 9v6h4l5 5V4L7 9H3z"/>
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#0d0c10] to-[#16151a] backdrop-blur-xl border-t border-white/10 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-[200px]">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-lg flex-shrink-0">
              <Image src={currentTrack.coverArt} alt={currentTrack.title} fill className="object-cover" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">{currentTrack.title}</p>
              <p className="text-xs text-gray-400">{currentTrack.artist}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={togglePlayPause} className="p-2 rounded-full bg-[#8a60c2] text-white hover:bg-[#9b72d1] transition shadow-lg hover:scale-105">
              {isPlaying ? <Pause size={18} fill="white" /> : <Play size={18} fill="white" className="ml-0.5" />}
            </button>
            
            <div className="flex items-center gap-2">
              <VolumeIcon size={16} className="text-gray-400" />
              <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => setVolume(parseFloat(e.target.value))} className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer accent-[#8a60c2]" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/radio" className="text-xs text-gray-400 hover:text-white transition px-3 py-1 rounded-lg hover:bg-white/10">
              Ochish
            </Link>
            <button onClick={() => setIsMinimized(true)} className="p-1 rounded-lg text-gray-400 hover:text-white transition hover:bg-white/10">
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

