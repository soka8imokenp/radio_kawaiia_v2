'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────
interface Track {
  id: string;
  title: string;
  titleRomaji: string;
  artist: string;
  coverArt: string;
  audioSrc: string;
  lyrics: {
    uzbek: string;
    romaji: string;
  } | null;
  isAnimeOpening: boolean;
  info?: {
    description: string;
    details: { title: string; text: string }[];
  };
}

type StationType = 'default' | 'ost';

// ─── Playlists ───────────────────────────────────────────────────
const defaultPlaylist: Track[] = [
  {
    id: '1',
    title: 'Elf',
    titleRomaji: 'Elf',
    artist: 'Ado',
    coverArt: '/images/ado-elf.jpg',
    audioSrc: '/music/Ado-Elf.mp3',
    lyrics: {
      uzbek: `Elf - Ado (O'zbek tilida)\n\n[00:01.02] Yugur, yugur, tezroq, yanada tezroq,\n[00:06.92] Yetolmasin senga g'am bilan firoq.\n[00:12.93] Qidirgin nurlarga chulg'angan yo'lni,\n[00:19.09] O'sha yo'l o'ziga chorlar ko'ngilni.\n\n[00:26.53] Qarshi tur, chiroying hamda qadringni,\n[00:32.60] Toptab, ozor bermoq istaganlarga.\n[00:38.52] Charchasang uxlab ol, orom ol, sokin,\n[00:44.53] Afsonasi yo'q yulduzlar kabi jim.\n\n[00:50.98] Qo'limni qo'yib yuborgach o'sha dam,\n[00:53.87] Sezarsan barmoqlarim,\n[00:56.95] Tana taftim ham.\n[01:00.29] Ularning izlari dilingga sanchilar...\n\n[01:08.23] Unutganingni ham unutgin butun,\n[01:14.58] G'am hamda harorat yo'olsin bugun.\n[01:20.56] Lekin quloqlarda hamon jaranglar,\n[01:26.85] Diydor orzusiga to'lib ohanglar:\n[01:32.33] "Alvido"\n[01:35.25] Alvido, alvido...\n[01:38.04] Sevaman, sen-chi?\n\n[01:44.50] Raqsga tush, kim kulmasin senga,\n[01:50.36] Qor yog'gan shoxlar kabi.\n[01:56.47] Baqir, chin qalbingdan baqir,\n[02:02.51] Borlig'ingni eshittir bu yerga.\n\n[02:08.99] Uzoqdagi gulxanlar xiralashar,\n[02:14.75] Qaytadigan uyni qidirar.\n[02:18.21] Agar uzun, uzun yo'lga chiqsang,\n[02:26.43] Baland ovozda ursin yuraging,\n[02:32.31] So'nggi zarbagacha seniki u.\n[02:38.57] Yosh, yosh, to'kilsin,\n[02:44.89] Tomchilar o'rmoningni o'stirar.\n\n[03:02.49] Bu ming yillik sog'inch edi,\n[03:08.89] Cheksizlikni sanab bo'lgach,\n[03:14.52] Hayvonga o'xshagan dunyoning burchagida,\n[03:20.33] Jang qilayotgan inson.\n[03:23.98] Sen elf, elf san,\n[03:27.25] Sevimli sayohat davom etadi.\n\n[03:33.54] Unutganingni ham unutgin,\n[03:39.90] G'am va harorat yo'qolsin,\n[03:45.59] Lekin hanuz quloqlarda qolgan,\n[03:52.22] Qattiq uchrashishni tilagan:\n[03:57.78] "Alvido"\n[04:00.65] Adieu, adieu\n[04:03.52] Sevaman, sen-chi?\n[04:06.61] Alvido, alvido`,
      romaji: `Elf - Ado (Romaji)\n\n[00:01.02] Hashirinasai hayaku motto hayaku\n[00:06.92] Kanashimi ni oitsukarenai you ni\n[00:12.93] Sagashinasai akari no tomoru michi wo\n[00:19.09] Sore wa sore wa mabayui deshou\n\n[00:26.53] Idominasai kimi no utsukushisa ya\n[00:32.60] Toutosa wo kizutsukeru mono ni\n[00:38.52] Nemurinasai tsukaretara nemurinasai\n[00:44.53] Shinwa wo motanai ano seiza no you ni\n\n[00:50.98] Te wo hanashita ato\n[00:53.87] Kimi wa kizuku darou\n[00:56.95] Yubi no katachi taion\n[01:00.29] Sono nagori ga mune wo sasu\n\n[01:08.23] Wasureta koto mo wasurete shimae\n[01:14.58] Kanashimi mo nukumori kiete shimae\n[01:20.56] Saredo ima mo mimi ni nokoru wa\n[01:26.85] Kataku saikai wo negau you na\n[01:32.33] "Sayounara"\n[01:35.25] Adieu, adieu\n[01:38.04] Love you, and you?\n\n[01:44.50] Odorinasai dare ni warawarete mo\n[01:50.36] Ausuyuki wo harau eda no you ni\n[01:56.47] Sakebinasai kokoro kara sakebinasai\n[02:02.51] Koko ni tashika ni ita n da to hibikasete\n\n[02:08.99] Yukiai no sora ni tohankanabi ga nijimu\n[02:14.75] Kaerubeki ie wo sagasu\n[02:18.21] Nagai nagai tabiji wo yuku nara\n[02:26.43] Takara ka narase sono shinzou wa\n[02:32.31] Saigo no ichi uch made kimi no mono da\n[02:38.57] Namida namida afureru ga ii\n[02:44.89] Furu shizuku ga kimi no mori wo sodateru darou\n\n[03:02.49] Sore wa sennen no homushikku deshita\n[03:08.89] Mugen sae mo kazoeoete\n[03:14.52] Kaibutsu no you na sekai no sumikko de\n[03:20.33] Tatakai tsuzukeru hito\n[03:23.98] Kimi wa erufu erufu\n[03:27.25] Itoshiki tabi wa tsudzuku\n\n[03:33.54] Wasureta koto mo wasurete shimae\n[03:39.90] Kanashimi mo nukumori mo kie chimae\n[03:45.59] Saredo ima mo ima mo mimi ni nokoru wa\n[03:52.22] Kataku saikai wo negau you na\n[03:57.78] "Sayounara"\n[04:00.65] Adieu, adieu\n[04:03.52] Love you, and you?\n[04:06.61] Adieu, adieu`
    },
    isAnimeOpening: false,
    info: {
      description: `«Elf» qo'shig'i — Ado va vokaloid-prodyuser Mitchie M o'rtasidagi hissiyotlarga boy hamkorlikdir. Trek maxsus «Kujaku no Dance, Dare ga Mita?» mangasi uchun asosiy mavzu sifatida yozilgan.`,
      details: [
        { title: 'Manga bilan aloqasi', text: "Ado yozish jarayonida qahramon fojeasini chuqur yetkazib berish uchun o'zini manganing bosh qahramoni Miko o'rnida tasavvur qilganini tan olgan." },
        { title: "G'ayrioddiy uslub", text: "Qo'shiq ustida o'zining ijobiy treklari bilan tanilgan Mitchie M ishlagan." },
        { title: "Nomning ramziy ma'nosi", text: "«Elf» nomi fenteziga emas, balki nemischa «11» (o'n bir) raqamiga ishora qiladi." }
      ]
    }
  }
];

const ostPlaylist: Track[] = [
  {
    id: 'ost-1',
    title: 'Pathway',
    titleRomaji: 'Pathway',
    artist: 'Kevin Penkin',
    coverArt: '/images/pathway.webp',
    audioSrc: '/music/pathway.mp3',
    lyrics: null,
    isAnimeOpening: false,
    info: {
      description: `«Pathway» — Kevin Penkin tomonidan yaratilgan ajoyib musiqiy asar. Kevin Penkin — mashhur avstraliyalik bastakor bo'lib, u «Made in Abyss», «Tower of God», «The Rising of the Shield Hero» kabi anime seriallariga yozgan musiqalari bilan tanilgan.`,
      details: [
        { title: 'Bastakor haqida', text: 'Kevin Penkin — avstraliyalik bastakor, anime industriyasidagi eng yorqin iste\'dodlardan biri.' },
        { title: 'Musiqiy uslub', text: 'Penkin musiqasi orkestr, xor va elektron elementlarning noyob uyg\'unligi bilan ajralib turadi.' },
        { title: 'Mashhur ishlari', text: '«Made in Abyss», «Tower of God», «The Rising of the Shield Hero», «Eden», «Star Wars: Visions».' }
      ]
    }
  }
];

const defaultUpcomingTracks = [
  "Ado — Rockstar",
  "9lana — プロポーズ",
  "DECO*27 — モニタリング",
  "KIRA — CRASH THE PARTY",
  "Vaundy — Odoriko",
  "YOASOBI — Idol",
  "Eve — Kaikai Kitan",
  "Hatsune Miku — Senbonzakura",
  "Kenshi Yonezu — Kick Back",
  "LiSA — Gurenge"
];

const ostUpcomingTracks = [
  "Kevin Penkin — Tomorrow",
  "Kevin Penkin — Underground River",
  "Hiroyuki Sawano — YouSeeBIGGIRL/T:T",
  "Hiroyuki Sawano — Vogel im Käfig",
  "Hiroyuki Sawano — The Reluctant Heroes",
  "Hiroyuki Sawano — Call of Silence",
  "Yuki Kajiura — Swordland",
  "Yoko Kanno — Tank!",
  "Yoko Kanno — The Real Folk Blues",
  "Taku Iwasaki — Rhapsody"
];

// ─── Lyrics Helpers ──────────────────────────────────────────────
const parseTimestamp = (ts: string): number => {
  const m = ts.match(/\[(\d{2}):(\d{2})\.(\d{2})\]/);
  if (!m) return 0;
  return parseInt(m[1]) * 60 + parseInt(m[2]) + parseInt(m[3]) / 100;
};

const parseLyrics = (text: string): { time: number; line: string }[] => {
  return text.split('\n').reduce<{ time: number; line: string }[]>((acc, line) => {
    const m = line.match(/\[(\d{2}:\d{2}\.\d{2})\]/);
    if (m) {
      const clean = line.replace(/\[\d{2}:\d{2}\.\d{2}\]/, '').trim();
      if (clean) acc.push({ time: parseTimestamp(m[0]), line: clean });
    }
    return acc;
  }, []);
};

// ─── Lyrics Component ────────────────────────────────────────────
function LyricsPanel({ lyrics, currentTime }: { lyrics: Track['lyrics']; currentTime: number }) {
  const [lang, setLang] = useState<'uzbek' | 'romaji'>('uzbek');
  const scrollRef = useRef<HTMLDivElement>(null);

  const timestamps = lyrics ? parseLyrics(lyrics[lang]) : [];

  const activeIdx = (() => {
    let idx = -1;
    for (let i = 0; i < timestamps.length; i++) {
      if (currentTime >= timestamps[i].time) idx = i;
      else break;
    }
    return idx;
  })();

  useEffect(() => {
    if (scrollRef.current && activeIdx >= 0) {
      const el = scrollRef.current.children[activeIdx] as HTMLElement;
      if (el) {
        scrollRef.current.scrollTo({
          top: el.offsetTop - scrollRef.current.clientHeight / 2 + el.clientHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [activeIdx]);

  if (!lyrics) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Lang toggle */}
      <div className="flex items-center gap-1 mb-6 flex-shrink-0">
        {(['uzbek', 'romaji'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="px-3 py-1 text-[10px] uppercase tracking-[0.15em] font-medium transition-all duration-300 cursor-pointer"
            style={{
              color: lang === l ? 'var(--accent)' : 'var(--text-muted)',
              borderBottom: lang === l ? '1px solid var(--accent)' : '1px solid transparent'
            }}
          >
            {l === 'uzbek' ? "O'zbekcha" : 'Romaji'}
          </button>
        ))}
      </div>

      {/* Lyrics scroll */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-2 space-y-4"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 8%, black 88%, transparent 100%)'
        }}
      >
        {timestamps.map((item, idx) => (
          <p
            key={idx}
            className="transition-all duration-500 text-[15px] leading-relaxed cursor-default"
            style={{
              color: idx === activeIdx
                ? 'var(--text-primary)'
                : Math.abs(idx - activeIdx) <= 2
                  ? 'var(--text-secondary)'
                  : 'var(--text-muted)',
              fontWeight: idx === activeIdx ? 500 : 400,
              transform: idx === activeIdx ? 'translateX(4px)' : 'translateX(0)',
            }}
          >
            {item.line}
          </p>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────
export default function RadioPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [activeStation, setActiveStation] = useState<StationType>('default');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [activePanel, setActivePanel] = useState<'lyrics' | 'info'>('lyrics');
  const [listeners, setListeners] = useState(342);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevStation = useRef<StationType>('default');

  const playlist = activeStation === 'default' ? defaultPlaylist : ostPlaylist;
  const queue = activeStation === 'default' ? defaultUpcomingTracks : ostUpcomingTracks;

  // Listener count simulation
  useEffect(() => {
    const iv = setInterval(() => setListeners(p => p + Math.floor(Math.random() * 5) - 2), 5000);
    return () => clearInterval(iv);
  }, []);

  // Init track
  useEffect(() => {
    if (!selectedTrack && playlist[0]) {
      setSelectedTrack(playlist[0]);
    }
  }, [playlist, selectedTrack]);

  // Station change
  useEffect(() => {
    if (prevStation.current !== activeStation && playlist[0]) {
      setSelectedTrack(playlist[0]);
      setIsPlaying(false);
      setProgress(0);
      if (!playlist[0].lyrics) setActivePanel('info');
      else setActivePanel('lyrics');
    }
    prevStation.current = activeStation;
  }, [activeStation, playlist]);

  // Audio source
  useEffect(() => {
    if (selectedTrack && audioRef.current) {
      const audio = audioRef.current;
      const wasPlaying = isPlaying;
      audio.src = selectedTrack.audioSrc;
      audio.load();
      if (wasPlaying) {
        audio.play().catch(e => {
          if (e.name !== 'AbortError') setIsPlaying(false);
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack]);

  // Audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onMeta = () => setDuration(audio.duration || 0);
    const onEnd = () => { setIsPlaying(false); setProgress(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  // Volume
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(e => {
        if (e.name !== 'AbortError') setIsPlaying(false);
      });
      setIsPlaying(true);
    }
  }, [isPlaying]);

  const toggleStation = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveStation(s => s === 'default' ? 'ost' : 'default');
    }, 600);
    setTimeout(() => setIsTransitioning(false), 2000);
  }, [isTransitioning]);

  const formatTime = (t: number) => {
    if (!t || isNaN(t)) return '0:00';
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;
  const isDefault = activeStation === 'default';

  // ─── Waveform bars ─────────────────────────────────────────────
  const WaveformBars = () => (
    <div className="flex items-end gap-[2px] h-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="w-[2px] rounded-full transition-all duration-300"
          style={{
            height: isPlaying ? `${8 + Math.random() * 10}px` : '3px',
            backgroundColor: 'var(--accent)',
            animation: isPlaying ? `wave-bar ${0.6 + i * 0.15}s ease-in-out infinite alternate` : 'none',
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--surface)] text-[var(--text-primary)] relative select-none film-grain">

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--accent)] opacity-[0.04] blur-[150px] ambient-orb-1" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-900 opacity-[0.06] blur-[120px] ambient-orb-2" />
      </div>

      {/* ── Station Transition Overlay ── */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center station-wipe-in" style={{ backgroundColor: '#0a0a0a' }}>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={!isDefault ? '/images/jpopchan.webp' : '/images/ostchan.webp'}
              alt="Station"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="relative z-10 text-center fade-up">
              <p className="label-mono mb-3 text-[var(--accent)]">tizimi faollashtirildi</p>
              <h2 className="display-title text-5xl md:text-7xl text-white">
                {!isDefault ? 'J-Pop' : 'OST'}
              </h2>
              <div className="mt-6 w-16 h-[1px] bg-[var(--accent)] mx-auto overflow-hidden">
                <div className="h-full bg-white animate-loading-bar" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
           MAIN LAYOUT
         ══════════════════════════════════════════════════════════ */}
      <div className="relative z-10 min-h-screen flex flex-col">

        {/* ── Top Bar ── */}
        <header className="w-full px-6 md:px-10 py-5 flex items-center justify-between flex-shrink-0">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <span className="display-title text-2xl md:text-3xl tracking-tight text-white">
              Kawa<span style={{ color: 'var(--accent)' }}>ii</span>
            </span>
            <span className="label-mono hidden sm:inline-block mt-1">radio</span>
          </div>

          {/* Station + Listeners */}
          <div className="flex items-center gap-6">
            {/* Listeners */}
            <div className="hidden md:flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: 'var(--accent)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent)' }} />
              </span>
              <span className="label-mono">{listeners} online</span>
            </div>

            {/* Station Toggle */}
            <button
              onClick={toggleStation}
              className="group flex items-center gap-2 px-4 py-2 border border-[var(--border)] hover:border-[var(--accent-dim)] rounded-full transition-all duration-500 cursor-pointer"
            >
              <span className="label-mono group-hover:text-[var(--accent)] transition-colors">
                {isDefault ? 'J-Pop / J-Rock' : 'OST'}
              </span>
              <svg className="w-3 h-3 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            {/* Queue Toggle */}
            <button
              onClick={() => setShowQueue(!showQueue)}
              className="p-2 border border-[var(--border)] hover:border-[var(--accent-dim)] rounded-full transition-all duration-300 cursor-pointer group"
              title="Navbat"
            >
              <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
          </div>
        </header>

        {/* ── Content Area ── */}
        <main className="flex-1 flex flex-col lg:flex-row items-stretch px-6 md:px-10 gap-8 lg:gap-12 pb-32 lg:pb-36">

          {/* ─── LEFT: Album Art + Track Info ─── */}
          <div className="lg:w-[45%] xl:w-[42%] flex flex-col gap-6 fade-up">
            
            {/* Album Cover — cinematic */}
            <div className="relative w-full aspect-square max-w-[480px] mx-auto lg:mx-0 group/cover">
              {/* Shadow base */}
              <div className="absolute -inset-4 bg-gradient-to-b from-transparent via-transparent to-black/40 rounded-lg blur-2xl opacity-60" />
              
              <div className="relative w-full h-full rounded-lg overflow-hidden cover-reveal">
                <Image
                  src={selectedTrack?.coverArt || '/images/ado-elf.jpg'}
                  alt={selectedTrack?.title || 'Album Art'}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/cover:scale-[1.03]"
                  priority
                />
                {/* Cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--surface)] via-transparent to-transparent opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--surface)] via-transparent to-transparent opacity-30" />
                
                {/* Play overlay on hover */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-all duration-300 cursor-pointer bg-black/20"
                >
                  <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all active:scale-95">
                    {isPlaying ? (
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Track Meta — editorial typography */}
            <div className="fade-up fade-up-delay-1">
              <div className="flex items-center gap-3 mb-3">
                <WaveformBars />
                <span className="label-mono" style={{ color: isPlaying ? 'var(--accent)' : 'var(--text-muted)' }}>
                  {isPlaying ? 'eshiryapsiz' : 'to\'xtatilgan'}
                </span>
              </div>
              
              <h1 className="display-title text-4xl md:text-5xl lg:text-6xl text-white mb-2 leading-none">
                {selectedTrack?.title}
              </h1>
              <p className="text-[var(--text-secondary)] text-lg md:text-xl font-light tracking-wide">
                {selectedTrack?.artist}
              </p>
            </div>
          </div>

          {/* ─── RIGHT: Lyrics / Info Panel ─── */}
          <div className="lg:w-[55%] xl:w-[58%] flex flex-col min-h-0 fade-up fade-up-delay-2">
            
            {/* Panel Tabs */}
            <div className="flex items-center gap-6 mb-6 flex-shrink-0 border-b border-[var(--border)] pb-4">
              <button
                onClick={() => setActivePanel('lyrics')}
                disabled={!selectedTrack?.lyrics}
                className="transition-all duration-300 cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed"
                style={{
                  color: activePanel === 'lyrics' && selectedTrack?.lyrics ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                <span className="label-mono text-[11px]" style={{ color: 'inherit' }}>Matn</span>
              </button>
              <button
                onClick={() => setActivePanel('info')}
                className="transition-all duration-300 cursor-pointer"
                style={{
                  color: activePanel === 'info' ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                <span className="label-mono text-[11px]" style={{ color: 'inherit' }}>Musiqa haqida</span>
              </button>
            </div>

            {/* Panel Content */}
            <div className="flex-1 overflow-hidden min-h-0">
              {activePanel === 'lyrics' && selectedTrack?.lyrics ? (
                <LyricsPanel lyrics={selectedTrack.lyrics} currentTime={progress} />
              ) : (
                <div className="h-full overflow-y-auto pr-2 space-y-6">
                  {selectedTrack?.info ? (
                    <>
                      {/* Description */}
                      <div className="fade-up">
                        <p className="label-mono mb-3" style={{ color: 'var(--accent)' }}>Qisqacha</p>
                        <p className="text-[var(--text-secondary)] text-sm leading-[1.8] font-light">
                          {selectedTrack.info.description}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="w-12 h-[1px] bg-[var(--border)]" />

                      {/* Details */}
                      <div className="space-y-5 fade-up fade-up-delay-1">
                        {selectedTrack.info.details.map((d, i) => (
                          <div key={i} className="group">
                            <p className="label-mono mb-2" style={{ color: 'var(--accent-dim)' }}>{d.title}</p>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light pl-0 group-hover:pl-2 transition-all duration-300">
                              {d.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="label-mono text-[var(--text-muted)]">Tafsilotlar mavjud emas</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>

        {/* ══════════════════════════════════════════════════════════
             BOTTOM PLAYER BAR — fixed, ultra-minimal
           ══════════════════════════════════════════════════════════ */}
        <div className="fixed bottom-0 left-0 right-0 z-50">
          {/* Progress line — full width */}
          <div className="w-full h-[1px] bg-[var(--border)] relative">
            <div
              className="absolute top-0 left-0 h-full transition-all duration-300"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: 'var(--accent)',
                boxShadow: '0 0 8px var(--accent)'
              }}
            />
          </div>

          <div className="w-full bg-[var(--surface)]/95 backdrop-blur-xl border-t border-[var(--border)]">
            <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-4 flex items-center justify-between gap-4">
              
              {/* Left: Now playing compact */}
              <div className="flex items-center gap-4 min-w-0 flex-1">
                {/* Mini cover */}
                <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 shadow-lg">
                  <Image
                    src={selectedTrack?.coverArt || '/images/ado-elf.jpg'}
                    alt="cover"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <p className="text-sm font-medium text-white truncate">{selectedTrack?.title}</p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">{selectedTrack?.artist}</p>
                </div>
              </div>

              {/* Center: Play + Time */}
              <div className="flex items-center gap-5">
                <span className="label-mono text-[10px] hidden md:inline">{formatTime(progress)}</span>
                
                <button
                  onClick={togglePlay}
                  className="w-11 h-11 rounded-full border border-[var(--border)] hover:border-[var(--accent-dim)] flex items-center justify-center transition-all duration-300 cursor-pointer hover:bg-white/[0.03] active:scale-95 group"
                >
                  {isPlaying ? (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <span className="label-mono text-[10px] hidden md:inline">{formatTime(duration)}</span>
              </div>

              {/* Right: Volume */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-1.5 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-3.15a.75.75 0 011.28.53v13.74a.75.75 0 01-1.28.53L6.75 14.25H3.75a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h3z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-3.15a.75.75 0 011.28.53v12.74a.75.75 0 01-1.28.53l-4.72-3.15H3.75a.75.75 0 01-.75-.75v-3a.75.75 0 01.75-.75h3z" />
                    </svg>
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setVolume(v);
                    setIsMuted(v === 0);
                  }}
                  className="w-20 md:w-24 accent-[var(--accent)]"
                />
                <span className="label-mono text-[9px] min-w-[24px] text-right" style={{ color: 'var(--accent-dim)' }}>
                  {isMuted ? '0' : Math.round(volume * 100)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
           QUEUE PANEL — slide from right
         ══════════════════════════════════════════════════════════ */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-black/50 transition-opacity duration-500 ${showQueue ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setShowQueue(false)}
      />

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[340px] md:w-[400px] bg-[var(--surface)] border-l border-[var(--border)] z-[100] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${showQueue ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 flex-shrink-0">
            <span className="label-mono text-[11px]">Navbatdagi treklar</span>
            <button
              onClick={() => setShowQueue(false)}
              className="p-2 text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Now Playing */}
          {selectedTrack && (
            <div className="flex items-center gap-4 pb-6 mb-6 border-b border-[var(--border)] flex-shrink-0">
              <div className="relative w-12 h-12 rounded overflow-hidden flex-shrink-0">
                <Image src={selectedTrack.coverArt} alt="cover" fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">{selectedTrack.title}</p>
                <p className="text-[11px] text-[var(--text-muted)] truncate">{selectedTrack.artist}</p>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50" style={{ backgroundColor: 'var(--accent)' }} />
                  <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--accent)' }} />
                </span>
                <span className="label-mono text-[8px]" style={{ color: 'var(--accent)' }}>LIVE</span>
              </div>
            </div>
          )}

          {/* Queue List */}
          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {queue.map((track, idx) => {
              const parts = track.split(' — ');
              return (
                <div
                  key={idx}
                  className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-[var(--surface-hover)] transition-colors group cursor-default"
                >
                  <span className="label-mono text-[10px] w-5 text-center" style={{ color: 'var(--text-muted)' }}>
                    {(idx + 1).toString().padStart(2, '0')}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-[var(--text-secondary)] truncate group-hover:text-white transition-colors">
                      {parts[1] || track}
                    </p>
                    <p className="text-[10px] text-[var(--text-muted)] truncate">
                      {parts[0]}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hidden audio */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}