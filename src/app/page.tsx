'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  Play, Pause
} from 'lucide-react';

interface Track {
  id: string; title: string; artist: string; 
  coverArt: string; audioSrc: string; duration: number;
  bpm: number; energy: number; category: string;
  lyrics: {
    uzbek: string;
    romaji: string;
  } | null;
  info?: {
    description: string;
    details: { title: string; text: string }[];
  };
}

const playlist: Track[] = [
  {
    id: 'kawaii_trk_01', title: 'Elf', artist: 'Ado', category: 'J-Pop / Vocaloid',
    coverArt: '/images/ado-elf.jpg', audioSrc: '/music/Ado-Elf.mp3', duration: 246, bpm: 132, energy: 94,
    lyrics: {
      uzbek: `Elf - Ado (O'zbek tilida)

[00:01.02] Yugur, yugur, tezroq, yanada tezroq,
[00:06.92] Yetolmasin senga g'am bilan firoq.
[00:12.93] Qidirgin nurlarga chulg'angan yo'lni,
[00:19.09] O'sha yo'l o'ziga chorlar ko'ngilni.

[00:26.53] Qarshi tur, chiroying hamda qadringni,
[00:32.60] Toptab, ozor bermoq istaganlarga.
[00:38.52] Charchasang uxlab ol, orom ol, sokin,
[00:44.53] Afsonasi yo'q yulduzlar kabi jim.

[00:50.98] Qo'limni qo'yib yuborgach o'sha dam,
[00:53.87] Sezarsan barmoqlarim,
[00:56.95] Tana taftim ham.
[01:00.29] Ularning izlari dilingga sanchilar...

[01:08.23] Unutganingni ham unutgin butun,
[01:14.58] G'am hamda harorat yo'qolsin bugun.
[01:20.56] Lekin quloqlarda hamon jaranglar,
[01:26.85] Diydor orzusiga to'lib ohanglar:
[01:32.33] "Alvido"
[01:35.25] Alvido, alvido...
[01:38.04] Sevaman, sen-chi?

[01:44.50] Raqsga tush, kim kulmasin senga,
[01:50.36] Qor yog'gan shoxlar kabi.
[01:56.47] Baqir, chin qalbingdan baqir,
[02:02.51] Borlig'ingni eshittir bu yerga.

[02:08.99] Uzoqdagi gulxanlar xiralashar,
[02:14.75] Qaytadigan uyni qidirar.
[02:18.21] Agar uzun, uzun yo'lga chiqsang,
[02:26.43] Baland ovozda ursin yuraging,
[02:32.31] So'nggi zarbagacha seniki u.
[02:38.57] Yosh, yosh, to'kilsin,
[02:44.89] Tomchilar o'rmoningni o'stirar.

[03:02.49] Bu ming yillik sog'inch edi,
[03:08.89] Cheksizlikni sanab bo'lgach,
[03:14.52] Hayvonga o'xshagan dunyoning burchagida,
[03:20.33] Jang qilayotgan inson.
[03:23.98] Sen elf, elf san,
[03:27.25] Sevimli sayohat davom etadi.

[03:33.54] Unutganingni ham unutgin,
[03:39.90] G'am va harorat yo'qolsin,
[03:45.59] Lekin hanuz quloqlarda qolgan,
[03:52.22] Qattiq uchrashishni tilagan:
[03:57.78] "Alvido"
[04:00.65] Adieu, adieu
[04:03.52] Sevaman, sen-chi?
[04:06.61] Alvido, alvido`,
      romaji: `Elf - Ado (Romaji)

[00:01.02] Hashirinasai hayaku motto hayaku
[00:06.92] Kanashimi ni oitsukarenai you ni
[00:12.93] Sagashinasai akari no tomoru michi wo
[00:19.09] Sore wa sore wa mabayui deshou

[00:26.53] Idominasai kimi no utsukushisa ya
[00:32.60] Toutosa wo kizutsukeru mono ni
[00:38.52] Nemurinasai tsukaretara nemurinasai
[00:44.53] Shinwa wo motanai ano seiza no you ni

[00:50.98] Te wo hanashita ato
[00:53.87] Kimi wa kizuku darou
[00:56.95] Yubi no katachi taion
[01:00.29] Sono nagori ga mune wo sasu

[01:08.23] Wasureta koto mo wasurete shimae
[01:14.58] Kanashimi mo nukumori kiete shimae
[01:20.56] Saredo ima mo mimi ni nokoru wa
[01:26.85] Kataku saikai wo negau you na
[01:32.33] "Sayounara"
[01:35.25] Adieu, adieu
[01:38.04] Love you, and you?

[01:44.50] Odorinasai dare ni warawarete mo
[01:50.36] Ausuyuki wo harau eda no you ni
[01:56.47] Sakebinasai kokoro kara sakebinasai
[02:02.51] Koko ni tashika ni ita n da to hibikasete

[02:08.99] Yukiai no sora ni tohankanabi ga nijimu
[02:14.75] Kaerubeki ie wo sagasu
[02:18.21] Nagai nagai tabiji wo yuku nara
[02:26.43] Takara ka narase sono shinzou wa
[02:32.31] Saigo no ichi uch made kimi no mono da
[02:38.57] Namida namida afureru ga ii
[02:44.89] Furu shizuku ga kimi no mori wo sodateru darou

[03:02.49] Sore wa sennen no homushikku deshita
[03:08.89] Mugen sae mo kazoeoete
[03:14.52] Kaibutsu no you na sekai no sumikko de
[03:20.33] Tatakai tsuzukeru hito
[03:23.98] Kimi wa erufu erufu
[03:27.25] Itoshiki tabi wa tsudzuku

[03:33.54] Wasureta koto mo wasurete shimae
[03:39.90] Kanashimi mo nukumori mo kie chimae
[03:45.59] Saredo ima mo ima mo mimi ni nokoru wa
[03:52.22] Kataku saikai wo negau you na
[03:57.78] "Sayounara"
[04:00.65] Adieu, adieu
[04:03.52] Love you, and you?
[04:06.61] Adieu, adieu`
    },
    isAnimeOpening: false,
    info: {
      description: `«Elf» qo'shig'i — Ado va vokaloid-prodyuser Mitchie M o'rtasidagi hissiyotlarga boy hamkorlikdir. Trek maxsus «Kujaku no Dance, Dare ga Mita?» («Tovus raqsini kim ko'rdi?») mangasi uchun asosiy mavzu sifatida yozilgan.`,
      details: [
        { title: 'Manga bilan aloqasi', text: "Ado yozish jarayonida qahramon fojeasini chuqur yetkazib berish uchun o'zini manganing bosh qahramoni Miko o'rnida tasavvur qilganini tan olgan." },
        { title: "G'ayrioddiy uslub", text: "Qo'shiq ustida o'zining ijobiy treklari bilan tanilgan Mitchie M ishlagan." },
        { title: "Nomning ramziy ma'nosi", text: "«Elf» nomi fenteziga emas, balki nemischa «11» (o'n bir) raqamiga ishora qiladi." }
      ]
    }
  },
  {
    id: 'kawaii_trk_02', title: 'Pathway', artist: 'Kevin Penkin', category: 'Anime OST',
    coverArt: '/images/pathway.webp', audioSrc: '/music/pathway.mp3', duration: 247, bpm: 85, energy: 60,
    lyrics: null,
    info: {
      description: `«Pathway» — Kevin Penkin tomonidan yaratilgan ajoyib musiqiy asar. Kevin Penkin — mashhur avstraliyalik bastakor bo'lib, u «Made in Abyss», «Tower of God», «The Rising of the Shield Hero» kabi anime seriallariga yozgan musiqalari bilan tanilgan. Uning musiqasi chuqur hissiyotlar, epik orkestr aranjirovkalari va unutilmas melodiyalari bilan ajralib taradi.`,
      details: [
        { title: 'Bastakor haqida', text: "Kevin Penkin — avstraliyalik bastakor, anime industriyasidagi eng yorqin iste'dodlardan biri. U «Made in Abyss» uchun yozgan saundtreki bilan xalqaro e'tirofga sazovor bo'lgan." },
        { title: 'Musiqiy uslub', text: "Penkin musiqasi orkestr, xor va elektron elementlarning noyob uyg'unligi bilan ajralib taradi. Uning kompozitsiyalari tinglovchini chuqur hissiy sayohatga yetaklaydi." }
      ]
    }
  },
  {
    id: 'kawaii_trk_03', title: 'Odoriko', artist: 'Vaundy', category: 'J-Pop',
    coverArt: '/images/vaundy-odoriko.png', audioSrc: '', duration: 229, bpm: 125, energy: 70,
    lyrics: null,
    info: {
      description: `«Odoriko» (踊り子) — mashhur yapon musiqachisi Vaundy tomonidan ijro etilgan va 2021-yilda chiqarilgan nihoyatda ommabop trek. Retro-bass va o'ziga xos ritmga ega bu qo'shiq vaqt o'tishi bilan dunyo bo'ylab millionlab tinglovchilar e'tiborini qozongan.`,
      details: [
        { title: 'Janr', text: "Retro-pop va J-Pop uyg'unligi" },
        { title: 'Ijrochi haqida', text: "Vaundy — qo'shiqchi, bastakor va dizayner bo'lib, zamonaviy Yaponiya musiqiy sahnasining eng yorqin vakillaridan biridir." }
      ]
    }
  },
  {
    id: 'kawaii_trk_04', title: 'Kirari', artist: 'Fujii Kaze', category: 'J-Pop',
    coverArt: '/images/fujii-kaze-kirari.png', audioSrc: '', duration: 231, bpm: 118, energy: 75,
    lyrics: null,
    info: {
      description: `«Kirari» (きらり) — Fujii Kaze tomonidan 2021-yilda kuylangan quvnoq va yorqin trek. U Honda VEZEL reklama roligida foydalanilgach, juda katta shuhrat qozondi va musiqiy chartlarda yuqori o'rinlarni egalladi.`,
      details: [
        { title: 'Ma\'nosi', text: "Qo'shiq nomi yapon tilida «Yorqin porlash» degan ma'noni anglatadi." },
        { title: 'Muvaffaqiyat', text: "Billboard Japan Hot 100 chartida eng uzoq vaqt davomida yuqori o'rinlarni saqlab qolgan qo'shiqlar qatoriga kiradi." }
      ]
    }
  },
  {
    id: 'kawaii_trk_05', title: 'Boku dake no Uta', artist: '9lana', category: 'J-Pop / Anime',
    coverArt: '/images/9lana-boku.png', audioSrc: '', duration: 215, bpm: 140, energy: 85,
    lyrics: null,
    info: {
      description: `«Boku dake no Uta» (僕だけの歌) — 9lana ijrosidagi kuchli va hissiyotlarga boy kompozitsiya. U o'zining ajoyib vokal diapazoni va anime saundtreklariga mos jozibadorligi bilan ajralib turadi.`,
      details: [
        { title: 'Uslub', text: "Hissiy vokallar bilan boyitilgan zamonaviy J-Pop rock ohanglari" },
        { title: 'Ijrochi', text: "9lana — o'zining sirli imidji va kuchli ovozi bilan tanilgan yapon yosh ijrochisi." }
      ]
    }
  }
];

const parseTimestamp = (timestamp: string): number => {
  const match = timestamp.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
  if (match) {
    const minutes = parseInt(match[1]);
    const seconds = parseInt(match[2]);
    const centiseconds = parseInt(match[3]);
    return minutes * 60 + seconds + centiseconds / 100;
  }
  return 0;
};

const getTimestampsFromLyrics = (lyricsText: string): { time: number; text: string }[] => {
  if (!lyricsText) return [];
  const lines = lyricsText.split('\n');
  const timestamps: { time: number; text: string }[] = [];
  
  lines.forEach(line => {
    const timestampMatch = line.match(/\[(\d{2}:\d{2}\.\d{2})\]/);
    if (timestampMatch) {
      const time = parseTimestamp(timestampMatch[0]);
      const cleanLine = line.replace(/\[\d{2}:\d{2}\.\d{2}\]/, '').trim();
      if (cleanLine) {
        timestamps.push({ time, text: cleanLine });
      }
    }
  });
  
  return timestamps;
};

const formatTime = (t: number) => {
  if (isNaN(t)) return '0:00';
  const m = Math.floor(t / 60); const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function KawaiiPlayer() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume] = useState(0.7);
  const [activeTab, setActiveTab] = useState<'PLAYING' | 'ABOUT'>('PLAYING');
  const [isShuffle, setIsShuffle] = useState(false);
  const [viewMode, setViewMode] = useState<'PLAYLIST' | 'LYRICS'>('PLAYLIST');
  const [lyricsLang, setLyricsLang] = useState<'romaji' | 'uzbek'>('romaji');
  const [showNoAudioToast, setShowNoAudioToast] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<'JPOP' | 'OST'>('JPOP');

  const filteredPlaylist = useMemo(() => {
    return playlist.filter(item => {
      if (categoryFilter === 'JPOP') {
        return item.category.toLowerCase().includes('j-pop') || item.category.toLowerCase().includes('vocaloid');
      } else {
        return item.category.toLowerCase().includes('ost');
      }
    });
  }, [categoryFilter]);

  // Reset index when changing category filters
  useEffect(() => {
    setCurrentIdx(0);
    setIsPlaying(false);
  }, [categoryFilter]);

  const track = filteredPlaylist[currentIdx] || filteredPlaylist[0] || playlist[0];
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  // Audio lifecycle
  useEffect(() => {
    if (audioRef.current) {
      if (track.audioSrc) {
        audioRef.current.src = track.audioSrc;
        audioRef.current.load();
        setProgress(0);
        if (isPlaying) {
          audioRef.current.play().catch(() => setIsPlaying(false));
        }
      } else {
        audioRef.current.src = "";
        setProgress(0);
        setIsPlaying(false);
      }
    }
  }, [currentIdx]);

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
  }, [currentIdx, isShuffle]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = useCallback(() => {
    if (!track.audioSrc) {
      setShowNoAudioToast(true);
      setTimeout(() => setShowNoAudioToast(false), 3000);
      return;
    }
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, track]);

  const nextTrack = useCallback(() => {
    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * filteredPlaylist.length);
      setCurrentIdx(randomIdx);
    } else {
      setCurrentIdx(p => (p + 1) % filteredPlaylist.length);
    }
  }, [isShuffle, filteredPlaylist.length]);

  // Sync lyrics scroll
  const parsedLyrics = useMemo(() => {
    if (!track.lyrics) return [];
    const lyricsText = lyricsLang === 'romaji' ? track.lyrics.romaji : track.lyrics.uzbek;
    return getTimestampsFromLyrics(lyricsText);
  }, [track, lyricsLang]);

  const activeLyricIdx = useMemo(() => {
    let idx = -1;
    for (let i = 0; i < parsedLyrics.length; i++) {
      if (progress >= parsedLyrics[i].time) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  }, [progress, parsedLyrics]);

  useEffect(() => {
    if (lyricsContainerRef.current && activeLyricIdx >= 0) {
      const activeEl = lyricsContainerRef.current.children[activeLyricIdx] as HTMLElement;
      if (activeEl) {
        lyricsContainerRef.current.scrollTo({
          top: activeEl.offsetTop - lyricsContainerRef.current.clientHeight / 2 + activeEl.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeLyricIdx]);

  const pct = track.duration > 0 ? (progress / track.duration) * 100 : 0;

  return (
    <div className="w-full flex items-center justify-center py-4 select-none">
      {/* Main Music Player Card (Unified bg, sharp 90-degree corners rounded-none) */}
      <motion.div 
        layout
        className="w-full max-w-[960px] h-[560px] bg-card-bg rounded-none card-shadow flex overflow-hidden border border-card-border relative theme-transition"
      >
        <AnimatePresence initial={false} mode="popLayout">

          {/* Playlist Panel - Flush to left card borders, no headers, sharp corners, no hover highlight */}
          {viewMode === 'PLAYLIST' && (
            <motion.div
              key="playlist-sidebar"
              layout
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full border-r border-border-sep flex flex-col select-none flex-shrink-0 overflow-y-auto no-scrollbar bg-card-bg theme-transition"
            >
              <div className="flex-1 flex flex-col">
                {filteredPlaylist.map((item, idx) => {
                  const isCurrent = currentIdx === idx;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentIdx(idx);
                        if (item.audioSrc) {
                          setIsPlaying(true);
                        } else {
                          setIsPlaying(false);
                          setShowNoAudioToast(true);
                          setTimeout(() => setShowNoAudioToast(false), 3000);
                        }
                      }}
                      className="w-full h-[80px] flex items-center text-left transition-colors border-b border-border-sep last:border-b-0 cursor-pointer font-mono bg-transparent hover:bg-foreground/[0.01]"
                    >
                      {/* Left Icon: purple Play button if current, coverArt if not - Flush to left edge, sharp corners */}
                      {isCurrent ? (
                        <div className="w-[80px] h-[80px] bg-primary flex items-center justify-center flex-shrink-0 text-white shadow-sm rounded-none">
                          <Play size={16} fill="currentColor" />
                        </div>
                      ) : (
                        <div className="relative w-[80px] h-[80px] flex-shrink-0 bg-neutral-200 dark:bg-neutral-800 rounded-none">
                          <Image src={item.coverArt} alt={item.title} fill className="object-cover rounded-none" />
                        </div>
                      )}
                      
                      {/* Song Details */}
                      <div className="flex-1 py-2 px-5 min-w-0">
                        <p className="text-[9px] text-text-muted truncate font-medium uppercase tracking-wider">{item.category}</p>
                        <p className="text-[9px] text-text-muted truncate mt-0.5">{item.artist}</p>
                        <p className="text-[12px] font-bold text-primary truncate mt-0.5">
                          {item.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Center/Main Player Panel (Stationary and centered pl-10 pr-10, no horizontal shifting) */}
        <motion.div 
          layout
          className="flex-1 h-full py-10 px-10 flex flex-col justify-between select-none relative"
        >
          {/* Top Bar Navigation (Symmetrical Left and Right layout) */}
          <div className="flex items-center justify-between">
            {/* Category Toggle Switch (Minimalist J-POP/J-ROCK vs OST) */}
            <div className="flex items-center gap-1 font-mono text-[9px] font-bold tracking-wider text-text-muted border border-border-sep p-0.5 rounded-none bg-foreground/[0.01]">
              <button
                onClick={() => setCategoryFilter('JPOP')}
                className={`px-3 py-1 cursor-pointer transition-all duration-300 rounded-none ${
                  categoryFilter === 'JPOP'
                    ? 'bg-primary text-white shadow-sm'
                    : 'hover:text-primary'
                }`}
              >
                J-POP/J-ROCK
              </button>
              <button
                onClick={() => setCategoryFilter('OST')}
                className={`px-3 py-1 cursor-pointer transition-all duration-300 rounded-none ${
                  categoryFilter === 'OST'
                    ? 'bg-primary text-white shadow-sm'
                    : 'hover:text-primary'
                }`}
              >
                OST
              </button>
            </div>

            {/* Menu Tabs in monospace font */}
            <div className="flex items-center gap-6 font-mono font-bold text-[10px] tracking-[0.25em] text-text-muted">
              {(['ABOUT', 'PLAYING'] as const).map((tab) => {
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative py-1 transition-colors duration-300 hover:text-primary cursor-pointer ${
                      isActive ? 'text-primary' : ''
                    }`}
                  >
                    {tab}
                    {isActive && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Core Body Container - Shows either enlarged cutout circle (340px) or full-panel track info */}
          <div className="flex-1 flex items-center justify-center py-4 relative w-full h-full">
            <AnimatePresence mode="wait">
              {activeTab === 'ABOUT' ? (
                <motion.div 
                  key="about-info"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full h-full max-h-[340px] flex gap-8 p-4 font-mono text-left select-none overflow-hidden"
                >
                  {/* Left sub-column: cover art */}
                  <div className="w-[160px] flex flex-col gap-4 flex-shrink-0">
                    <div className="relative w-[160px] h-[160px] border border-border-sep shadow-[2px_2px_5px_rgba(0,0,0,0.03)] bg-neutral-200 dark:bg-neutral-800">
                      <Image src={track.coverArt} alt={track.title} fill className="object-cover" />
                    </div>
                    <div className="text-[9px] text-text-muted leading-relaxed">
                      <p className="font-bold text-primary uppercase tracking-wider">{track.category}</p>
                      <p className="mt-1">BPM: {track.bpm}</p>
                      <p>Energy: {track.energy}%</p>
                    </div>
                  </div>

                  {/* Right sub-column: scrollable description details (Spacious and fills panel) */}
                  <div className="flex-1 flex flex-col justify-start overflow-y-auto no-scrollbar pr-2">
                    <h3 className="text-[13px] font-bold text-primary mb-3 uppercase tracking-[0.1em] border-b border-border-sep pb-2">
                      {track.title} — Info
                    </h3>
                    <p className="text-[11px] text-text-main leading-relaxed mb-4">
                      {track.info?.description}
                    </p>
                    
                    {track.info?.details && track.info.details.length > 0 && (
                      <div className="space-y-4 pt-2 border-t border-border-sep">
                        {track.info.details.map((detail, idx) => (
                          <div key={idx} className="border-l border-primary pl-3 py-0.5">
                            <p className="text-[9px] font-bold text-primary uppercase tracking-[0.1em]">{detail.title}</p>
                            <p className="text-[10px] text-text-muted mt-1 leading-normal">{detail.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="circle-cutout"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative flex items-center justify-center"
                >
                  <div 
                    onClick={togglePlay}
                    className="relative w-[340px] h-[340px] rounded-full overflow-hidden bg-[#eef2f7] dark:bg-[#1a191d] shadow-[-1px_-1px_2px_rgba(0,0,0,0.08)] dark:shadow-[-2px_-2px_6px_rgba(0,0,0,0.65),_1.5px_1.5px_3px_rgba(255,255,255,0.04)] cursor-pointer group theme-transition transform-gpu"
                    style={{
                      clipPath: 'circle(50%)',
                      WebkitClipPath: 'circle(50%)',
                      transform: 'translateZ(0)',
                      WebkitTransform: 'translateZ(0)'
                    }}
                  >
                    <Image 
                      src={track.coverArt} 
                      alt={track.title} 
                      fill 
                      className="object-cover rounded-full"
                      style={{
                        clipPath: 'circle(50%)',
                        WebkitClipPath: 'circle(50%)'
                      }}
                      priority
                    />
                    {/* Sharp inward cutout shadow (casts deep shadow from top-left, NO white glow) */}
                    <div className="absolute inset-0 rounded-full shadow-[inset_22px_22px_28px_rgba(0,0,0,0.72),_inset_5px_5px_10px_rgba(0,0,0,0.55)] dark:shadow-[inset_24px_24px_30px_rgba(0,0,0,0.95),_inset_5px_5px_15px_rgba(0,0,0,0.85),_inset_-1.5px_-1.5px_3px_rgba(255,255,255,0.06)] pointer-events-none theme-transition" />
                    
                    {/* Minimalist floating play/pause button in the center - shows on hover */}
                     <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                       <button
                         onClick={(e) => {
                           e.stopPropagation();
                           togglePlay();
                         }}
                         className="w-14 h-14 rounded-full bg-white dark:bg-[#121115] text-primary shadow-[0_4px_16px_rgba(0,0,0,0.18)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.5)] flex items-center justify-center transition-all duration-300 transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
                         aria-label={isPlaying ? "Pause" : "Play"}
                       >
                         {isPlaying ? (
                           <Pause size={20} fill="currentColor" strokeWidth={0} />
                         ) : (
                           <Play size={20} fill="currentColor" strokeWidth={0} className="ml-0.5" />
                         )}
                       </button>
                     </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Control Section */}
          <div className="flex flex-col gap-4 font-mono">
            
            {/* Timeline Info Row */}
            <div className="flex items-center justify-between text-[11px] font-bold tracking-[0.15em] text-text-muted px-0.5">
              <span className="text-primary">{formatTime(progress)}/{formatTime(track.duration)}</span>
              <button 
                onClick={() => setIsShuffle(!isShuffle)}
                className={`transition-colors hover:text-primary cursor-pointer ${
                  isShuffle ? 'text-primary' : ''
                }`}
              >
                Shuffle
              </button>
            </div>

            {/* Custom Interactive Progress Bar (Thin 2px line) */}
            <div 
              className="w-full h-[2px] bg-[#dbe2ef] dark:bg-neutral-800 rounded-full relative cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                if (audioRef.current) {
                  audioRef.current.currentTime = (x / rect.width) * track.duration;
                }
              }}
            >
              <div 
                className="h-full bg-primary rounded-full transition-all duration-100 ease-out" 
                style={{ width: `${pct}%` }} 
              />
            </div>

            {/* Title & Control Row (Playback buttons removed) */}
            <div className="flex items-center justify-between mt-2 px-0.5">
              <h2 
                onClick={togglePlay}
                className="text-[15px] font-bold text-primary tracking-tight truncate max-w-[50%] cursor-pointer hover:underline"
                title="Click to Play/Pause"
              >
                {track.title}
              </h2>

              {/* Current Track Artist/Album info on bottom-right */}
              <div className="text-right text-[10px] text-text-muted leading-tight select-none truncate max-w-[45%] font-medium">
                <p className="font-semibold uppercase tracking-wider text-text-main/85 truncate">{track.category}</p>
                <p className="mt-0.5 truncate">{track.artist}</p>
              </div>
            </div>

          </div>

        </motion.div>

        <AnimatePresence initial={false} mode="popLayout">
          
          {/* Synced Scrolling Lyrics Panel - Flush to right borders */}
          {viewMode === 'LYRICS' && (
            <motion.div
              key="lyrics-sidebar"
              layout
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 340, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="h-full border-l border-border-sep flex flex-col py-12 px-8 select-none flex-shrink-0 bg-card-bg font-mono theme-transition"
            >
              {/* Lyrics Header - With Language switches */}
              <div className="flex items-center justify-between mb-4 border-b border-border-sep pb-3 flex-shrink-0">
                <span className="font-mono font-bold text-[11px] tracking-[0.2em] text-text-muted uppercase">LYRICS</span>
                {track.lyrics && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setLyricsLang('romaji')}
                      className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 border ${
                        lyricsLang === 'romaji'
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-transparent text-text-muted'
                      }`}
                    >
                      RO
                    </button>
                    <button
                      onClick={() => setLyricsLang('uzbek')}
                      className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 border ${
                        lyricsLang === 'uzbek'
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-transparent text-text-muted'
                      }`}
                    >
                      UZ
                    </button>
                  </div>
                )}
              </div>

              {/* Lyrics Scroll Container */}
              <div 
                ref={lyricsContainerRef}
                className="flex-1 overflow-y-auto no-scrollbar space-y-7 flex flex-col justify-start py-32"
                style={{ 
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
                }}
              >
                {parsedLyrics && parsedLyrics.length > 0 ? (
                  parsedLyrics.map((line, idx) => {
                    const isActive = idx === activeLyricIdx;
                    return (
                      <div 
                        key={idx}
                        onClick={() => {
                          if (audioRef.current) {
                            audioRef.current.currentTime = line.time;
                            setProgress(line.time);
                          }
                        }}
                        className={`cursor-pointer transition-all duration-500 flex flex-col items-start ${
                          isActive 
                            ? 'text-primary font-bold' 
                            : 'text-text-muted font-medium hover:text-primary/60'
                        }`}
                      >
                        <span className="text-[13px] tracking-wide relative pb-0.5 leading-relaxed">
                          {line.text}
                          {isActive && (
                            <motion.div 
                              layoutId="activeLyricLine"
                              className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                            />
                          )}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <div className="h-full flex items-center justify-center text-text-muted text-xs font-semibold tracking-wider uppercase">
                    No lyrics available
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Absolute Floating Toggle Buttons (Moved closer to card edges - left-3/right-3, z-30) */}
        <AnimatePresence initial={false}>
          {viewMode === 'LYRICS' ? (
            <motion.div
              key="playlist-floating-toggle"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              onClick={() => setViewMode('PLAYLIST')}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer py-4 select-none z-30 font-mono"
            >
              <span className="[writing-mode:vertical-lr] rotate-180 font-sans font-bold text-[10px] tracking-[0.35em] text-text-muted hover:text-primary transition-colors">
                PLAYLIST
              </span>
            </motion.div>
          ) : (
            <motion.div
              key="lyrics-floating-toggle"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              onClick={() => setViewMode('LYRICS')}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer py-4 select-none z-30 font-mono"
            >
              <span className="[writing-mode:vertical-lr] rotate-180 font-sans font-bold text-[10px] tracking-[0.35em] text-text-muted hover:text-primary transition-colors">
                LYRIC
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Toast Notification */}
        <AnimatePresence>
          {showNoAudioToast && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 20, x: "-50%" }}
              className="absolute bottom-6 left-1/2 bg-neutral-900/90 text-white text-[10px] uppercase tracking-wider font-mono py-2.5 px-5 shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-50 rounded-none border border-neutral-700/50 backdrop-blur-md"
            >
              AUDIO UNAVAILABLE (DEMO ONLY)
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>

      <audio ref={audioRef} />
    </div>
  );
}