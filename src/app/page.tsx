'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Shuffle, Repeat, 
  Radio, Zap, Activity, Cpu, Hexagon, ShieldAlert,
  Flame, TrendingUp, Network
} from 'lucide-react';

// ============================================================================
// 1. COMPLEX DATA STRUCTURE
// ============================================================================

interface LyricLine { time: number; text: string; translation?: string; }
interface Track {
  id: string; title: string; artist: string; 
  coverArt: string; audioSrc: string; duration: number;
  bpm: number; energy: number; category: string;
  lyrics: LyricLine[];
}

const playlist: Track[] = [
  {
    id: 'kawaii_trk_01', title: 'Elf', artist: 'Ado', category: 'J-Pop / Vocaloid',
    coverArt: '/images/ado-elf.jpg', audioSrc: '/music/Ado-Elf.mp3', duration: 246, bpm: 132, energy: 94,
    lyrics: [
      { time: 1.0, text: "Hashirinasai hayaku", translation: "Yugur, tezroq" },
      { time: 4.0, text: "motto hayaku", translation: "yanada tezroq" },
      { time: 6.9, text: "Kanashimi ni oitsukarenai you ni", translation: "G'am senga yetolmasin" },
      { time: 12.9, text: "Sagashinasai akari no tomoru michi wo", translation: "Nurlarga chulg'angan yo'lni qidir" },
      { time: 19.0, text: "Sore wa sore wa mabayui deshou", translation: "U judayam yorqin bo'ladi" },
      { time: 26.5, text: "Idominasai kimi no utsukushisa ya", translation: "Qarshi tur, chiroyingni" },
      { time: 32.6, text: "Toutosa wo kizutsukeru mono ni", translation: "Toptashni istaganlarga" },
      { time: 38.5, text: "Nemurinasai tsukaretara", translation: "Charchasang uxlab ol" },
      { time: 132.3, text: "Sayounara", translation: "Alvido" },
      { time: 135.2, text: "Adieu, adieu", translation: "Alvido, alvido" },
    ]
  },
  {
    id: 'kawaii_trk_02', title: 'Pathway', artist: 'Kevin Penkin', category: 'Anime OST',
    coverArt: '/images/pathway.webp', audioSrc: '/music/pathway.mp3', duration: 247, bpm: 85, energy: 60,
    lyrics: [
      { time: 0, text: "System Initialized", translation: "Tizim ishga tushdi" },
      { time: 5, text: "Establishing Connection...", translation: "Aloqa o'rnatilmoqda..." },
      { time: 10, text: "Original Soundtrack Playback", translation: "Made in Abyss" }
    ]
  }
];

const formatTime = (t: number) => {
  if (isNaN(t)) return '0:00';
  const m = Math.floor(t / 60); const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

// ============================================================================
// 2. KAWAI 4.0 AUDIO ENGINE
// ============================================================================

export default function KawaiiHoloCore() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const track = playlist[currentIdx];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Time & Node Status (Tashkent Sync)
  const [time, setTime] = useState('');
  useEffect(() => {
    const iv = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'Asia/Tashkent' }));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  // Audio lifecycle
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = track.audioSrc;
      audioRef.current.load();
      setProgress(0);
      if (isPlaying) audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentIdx, track.audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateTime = () => setProgress(audio.currentTime);
    const handleEnd = () => nextTrack();
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('ended', handleEnd);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [currentIdx]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) audioRef.current.pause();
    else audioRef.current.play().catch(() => setIsPlaying(false));
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const nextTrack = () => setCurrentIdx(p => (p + 1) % playlist.length);
  const prevTrack = () => setCurrentIdx(p => (p - 1 + playlist.length) % playlist.length);

  // 3D Perspective Lyrics Sync
  const activeLyricIdx = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < track.lyrics.length; i++) {
      if (progress >= track.lyrics[i].time) idx = i; else break;
    }
    return idx;
  }, [progress, track.lyrics]);

  useEffect(() => {
    if (scrollContainerRef.current && activeLyricIdx >= 0) {
      const el = scrollContainerRef.current.children[activeLyricIdx + 1] as HTMLElement; // +1 for padding div
      if (el) {
        scrollContainerRef.current.scrollTo({
          top: el.offsetTop - scrollContainerRef.current.clientHeight / 2 + el.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeLyricIdx]);

  const pct = track.duration > 0 ? (progress / track.duration) * 100 : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700;900&family=Rajdhani:wght@300;500;600;700&display=swap');
        
        body { background: #020205; color: #fff; font-family: 'Rajdhani', sans-serif; overflow: hidden; margin: 0; }
        
        .font-cyber { font-family: 'Orbitron', sans-serif; }
        
        /* 3D Space for Lyrics */
        .lyrics-viewport {
          perspective: 1000px;
          perspective-origin: 50% 50%;
        }
        
        .lyrics-container {
          transform-style: preserve-3d;
          transform: rotateX(25deg);
        }

        /* Glitch Marquee */
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        
        .text-stroke {
          color: transparent;
          -webkit-text-stroke: 2px rgba(200, 162, 255, 0.1);
        }

        /* Tech Grid & Hexagons */
        .tech-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(200, 162, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(200, 162, 255, 0.05) 1px, transparent 1px);
        }

        .clip-hex { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
        .clip-hud { clip-path: polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px); }

        .no-scroll::-webkit-scrollbar { display: none; }
      `}} />

      <div className="h-screen w-full relative flex flex-col select-none bg-[#020205] tech-grid">
        
        {/* ── BACKGROUND KINETIC TYPOGRAPHY ── */}
        <div className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center opacity-40 pointer-events-none">
          <div className="whitespace-nowrap animate-marquee flex">
            <h1 className="text-[250px] font-cyber font-black text-stroke uppercase leading-none px-8">
              {track.title} • {track.artist} • 
            </h1>
            <h1 className="text-[250px] font-cyber font-black text-stroke uppercase leading-none px-8">
              {track.title} • {track.artist} • 
            </h1>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020205_80%)]" />
        </div>

        {/* ── TOP HUD (Infrastructure & Ranking) ── */}
        <header className="relative z-50 w-full p-6 flex justify-between items-start pointer-events-none">
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 bg-[#c8a2ff]/10 border border-[#c8a2ff]/30 backdrop-blur-md px-4 py-2 clip-hud pointer-events-auto shadow-[0_0_20px_rgba(200,162,255,0.2)]">
              <Radio className="w-4 h-4 text-[#c8a2ff] animate-pulse" />
              <span className="font-cyber text-xs font-bold tracking-[0.2em] uppercase text-white">Kawaii 4.0 Core</span>
            </div>
            
            <div className="flex items-center gap-4 pl-2">
              <div className="flex items-center gap-2">
                <Network className="w-3.5 h-3.5 text-[#c8a2ff]/60" />
                <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase">Infra Node: TAS-01</span>
              </div>
              <div className="w-1 h-1 bg-white/20 rounded-full" />
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-green-400" />
                <span className="text-[10px] font-bold text-green-400 tracking-widest uppercase">Sync Active</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-4 bg-black/60 border border-white/10 backdrop-blur-md px-5 py-2 clip-hud">
              <div className="flex flex-col items-end mr-2">
                <span className="text-[9px] text-[#c8a2ff] uppercase tracking-widest font-bold">User Rank</span>
                <span className="text-sm font-cyber font-bold text-white">DIAMOND II</span>
              </div>
              <div className="h-8 w-[1px] bg-white/10" />
              <div className="flex flex-col items-end ml-2">
                <span className="text-[9px] text-white/50 uppercase tracking-widest font-bold">Local Time</span>
                <span className="text-sm font-cyber font-bold text-white">{time || '00:00:00'}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2">
              <TrendingUp className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-[10px] font-bold text-yellow-400/80 tracking-widest uppercase">+420 XP / Hour</span>
            </div>
          </div>
        </header>

        {/* ── MAIN HOLOGRAPHIC STAGE ── */}
        <main className="flex-1 relative z-10 flex items-center justify-between px-12 xl:px-24">
          
          {/* LEFT: 3D Holographic Reactor (Replaces standard cover art) */}
          <div className="w-1/2 flex flex-col items-center justify-center relative">
            
            <div className="relative w-[400px] h-[400px] xl:w-[500px] xl:h-[500px] flex items-center justify-center">
              
              {/* Outer Energy Rings */}
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-[#c8a2ff]/20 opacity-50"
              />
              <motion.div 
                animate={{ rotate: isPlaying ? -360 : 0 }} transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
                className="absolute inset-4 rounded-full border-2 border-transparent border-t-[#c8a2ff]/40 border-b-[#c8a2ff]/40"
              />
              <motion.div 
                animate={{ rotate: isPlaying ? 360 : 0, scale: isPlaying ? [1, 1.05, 1] : 1 }} 
                transition={{ rotate: { repeat: Infinity, duration: 10, ease: 'linear' }, scale: { repeat: Infinity, duration: 2 } }}
                className="absolute inset-10 rounded-full border border-[#c8a2ff]/10 bg-[radial-gradient(circle_at_center,rgba(200,162,255,0.1),transparent_70%)]"
              />

              {/* The Core (Hexagonal Cover Art) */}
              <div className="relative z-10 w-[240px] h-[240px] xl:w-[300px] xl:h-[300px] clip-hex bg-black p-1 shadow-[0_0_50px_rgba(200,162,255,0.3)] group">
                <div className="w-full h-full clip-hex relative overflow-hidden">
                  <Image src={track.coverArt} alt="Reactor Core" fill className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700" priority />
                  <div className="absolute inset-0 bg-black/20" />
                  
                  {/* Glitch Overlay on Cover */}
                  {isPlaying && (
                    <motion.div 
                      className="absolute inset-0 bg-[#c8a2ff]/20 mix-blend-overlay"
                      animate={{ opacity: [0, 0.5, 0, 0.8, 0] }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 5 + 2 }}
                    />
                  )}
                </div>
              </div>

              {/* Reactor Base Shadow */}
              <div className="absolute -bottom-10 w-[300px] h-[20px] bg-[#c8a2ff] blur-[40px] opacity-20 rounded-full" />
            </div>

            {/* Track Info Panel (Floating Below Reactor) */}
            <div className="mt-8 flex flex-col items-center bg-black/40 backdrop-blur-md border border-white/10 p-6 clip-hud min-w-[350px] shadow-2xl">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 bg-[#c8a2ff]/20 text-[#c8a2ff] text-[10px] font-cyber font-bold tracking-widest">{track.category}</span>
                <span className="flex items-center gap-1 text-[10px] font-cyber text-white/50"><Flame className="w-3 h-3 text-orange-400" /> LVL {track.energy}</span>
              </div>
              <h2 className="text-4xl font-cyber font-black text-white text-center tracking-tight mb-1">{track.title}</h2>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#c8a2ff]/80">{track.artist}</p>
            </div>
          </div>

          {/* RIGHT: 3D Perspective Lyrics Viewer */}
          <div className="w-1/2 h-[70vh] flex flex-col justify-center relative">
            
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#020205] to-transparent z-20 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020205] to-transparent z-20 pointer-events-none" />

            <div className="lyrics-viewport w-full h-full relative z-10">
              <div 
                ref={scrollContainerRef}
                className="lyrics-container w-full h-full overflow-y-auto no-scroll px-8 flex flex-col"
              >
                <div className="h-[30vh] shrink-0" />
                
                {track.lyrics.length > 0 ? track.lyrics.map((line, idx) => {
                  const isActive = idx === activeLyricIdx;
                  const isPast = idx < activeLyricIdx;
                  
                  return (
                    <motion.div 
                      key={idx} layout transition={{ duration: 0.5, ease: "easeOut" }}
                      onClick={() => { if (audioRef.current) audioRef.current.currentTime = line.time; }}
                      className={`mb-8 cursor-pointer transform-gpu transition-all duration-500 ${
                        isActive 
                          ? 'opacity-100 scale-100 translate-z-10' 
                          : isPast 
                            ? 'opacity-20 scale-95 -translate-z-10 blur-[2px]' 
                            : 'opacity-20 scale-95 translate-z-10 blur-[2px] hover:opacity-50'
                      }`}
                    >
                      <h3 className={`text-4xl xl:text-5xl font-black leading-tight tracking-tight ${isActive ? 'text-white drop-shadow-[0_0_20px_rgba(200,162,255,0.4)]' : 'text-white'}`}>
                        {line.text}
                      </h3>
                      {line.translation && (
                        <p className={`mt-3 text-sm font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${isActive ? 'text-[#c8a2ff]' : 'text-transparent'}`}>
                          {line.translation}
                        </p>
                      )}
                    </motion.div>
                  );
                }) : (
                  <div className="flex flex-col items-center justify-center opacity-30 mt-20">
                    <ShieldAlert className="w-12 h-12 mb-4" />
                    <p className="font-cyber text-sm tracking-widest uppercase">Vocal Data Offline</p>
                  </div>
                )}
                
                <div className="h-[40vh] shrink-0" />
              </div>
            </div>

          </div>
        </main>

        {/* ── BOTTOM CONTROL DECK (Mecha Dashboard Style) ── */}
        <footer className="relative z-50 w-full px-12 pb-8 flex justify-center pointer-events-none">
          <div className="w-[1000px] max-w-full bg-[#0a0a10]/80 backdrop-blur-2xl border-t border-l border-r border-white/10 p-6 clip-hud pointer-events-auto shadow-[0_-20px_60px_rgba(0,0,0,0.5)]">
            
            {/* Visualizer & Timeline Strip */}
            <div className="flex items-center gap-6 mb-6 px-4">
              <span className="font-cyber text-xs font-bold text-[#c8a2ff] w-12 text-right">{formatTime(progress)}</span>
              
              <div className="flex-1 relative h-6 flex items-center group cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                if(audioRef.current) audioRef.current.currentTime = (x / rect.width) * track.duration;
              }}>
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden absolute inset-0 my-auto">
                  <motion.div className="h-full bg-gradient-to-r from-[#c8a2ff] to-white" style={{ width: `${pct}%` }} layout />
                </div>
                {/* Fake audio waveform blocks overlaid */}
                <div className="absolute inset-0 flex items-center justify-between gap-0.5 opacity-30 pointer-events-none px-1">
                  {Array.from({length: 80}).map((_, i) => (
                    <motion.div 
                      key={i} className="w-1 bg-[#c8a2ff] rounded-sm"
                      animate={{ height: isPlaying ? `${Math.random() * 100}%` : '20%' }}
                      transition={{ duration: 0.2, repeat: Infinity, repeatType: 'reverse', delay: i * 0.02 }}
                    />
                  ))}
                </div>
              </div>
              
              <span className="font-cyber text-xs font-bold text-white/50 w-12">{formatTime(track.duration)}</span>
            </div>

            {/* Hardware Buttons */}
            <div className="flex items-center justify-between px-8">
              
              <div className="flex items-center gap-6 w-1/3">
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:bg-[#c8a2ff]/20 hover:text-[#c8a2ff] hover:border-[#c8a2ff]/50 transition-all clip-hud">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:bg-[#c8a2ff]/20 hover:text-[#c8a2ff] hover:border-[#c8a2ff]/50 transition-all clip-hud">
                  <Repeat className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 w-1/3">
                <button onClick={prevTrack} className="text-white/60 hover:text-white hover:drop-shadow-[0_0_10px_white] active:scale-90 transition-all">
                  <SkipBack className="w-8 h-8 fill-current" />
                </button>
                
                <button 
                  onClick={togglePlay}
                  className="w-20 h-20 bg-gradient-to-br from-[#c8a2ff] to-[#6e4a9e] rounded-xl clip-hex flex items-center justify-center shadow-[0_0_40px_rgba(200,162,255,0.4)] hover:scale-105 active:scale-95 transition-all border border-white/20 relative group"
                >
                  <div className="absolute inset-1 bg-black clip-hex flex items-center justify-center group-hover:bg-[#111] transition-colors">
                    {isPlaying ? <Pause className="w-8 h-8 fill-[#c8a2ff]" /> : <Play className="w-8 h-8 fill-[#c8a2ff] ml-2" />}
                  </div>
                </button>
                
                <button onClick={nextTrack} className="text-white/60 hover:text-white hover:drop-shadow-[0_0_10px_white] active:scale-90 transition-all">
                  <SkipForward className="w-8 h-8 fill-current" />
                </button>
              </div>

              <div className="flex items-center justify-end gap-4 w-1/3 text-white/50 hover:text-white transition-colors">
                <button onClick={() => setIsMuted(!isMuted)}>
                  {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <div className="w-24 h-6 border border-white/10 bg-black/50 clip-hud px-2 flex items-center">
                  <input 
                    type="range" min="0" max="1" step="0.01" 
                    value={isMuted ? 0 : volume} 
                    onChange={(e) => { setVolume(parseFloat(e.target.value)); setIsMuted(false); }} 
                    className="w-full h-1 bg-[#c8a2ff]/30 rounded-none appearance-none outline-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#c8a2ff]"
                  />
                </div>
              </div>

            </div>
          </div>
        </footer>

      </div>
      
      <audio ref={audioRef} />
    </>
  );
}