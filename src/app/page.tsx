'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Search, X, BookOpen, MessageCircle, Headphones, User, MoreHorizontal, Volume2, VolumeX, Info, Users, Menu, Bookmark, Layers, Bell, FileText, Music } from 'lucide-react';
import Image from 'next/image';

// Тип для трека
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

// Тип станции
type StationType = 'default' | 'ost';

// Плейлист основной станции
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
      description: `«Elf» qo'shig'i — Ado va vokaloid-prodyuser Mitchie M o'rtasidagi hissiyotlarga boy hamkorlikdir. Trek maxsus «Kujaku no Dance, Dare ga Mita?» («Tovus raqsini kim ko'rdi?») mangasi uchun asosiy mavzu sifatida yozilgan.`,
      details: [
        { title: 'Manga bilan aloqasi:', text: "Ado yozish jarayonida qahramon fojeasini chuqur yetkazib berish uchun o'zini manganing bosh qahramoni Miko o'rnida tasavvur qilganini tan olgan." },
        { title: "G'ayrioddiy uslub:", text: "Qo'shiq ustida o'zining ijobiy treklari bilan tanilgan Mitchie M ishlagan." },
        { title: "Nomning ramziy ma'nosi:", text: "«Elf» nomi fenteziga emas, balki nemischa «11» (o'n bir) raqamiga ishora qiladi." }
      ]
    }
  }
];

// Плейлист OST станции
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
      description: `«Pathway» — Kevin Penkin tomonidan yaratilgan ajoyib musiqiy asar. Kevin Penkin — mashhur avstraliyalik bastakor bo'lib, u «Made in Abyss», «Tower of God», «The Rising of the Shield Hero» kabi anime seriallariga yozgan musiqalari bilan tanilgan. Uning musiqasi chuqur hissiyotlar, epik orkestr aranjirovkalari va unutilmas melodiyalari bilan ajralib turadi.`,
      details: [
        { title: 'Bastakor haqida:', text: 'Kevin Penkin — avstraliyalik bastakor, anime industriyasidagi eng yorqin iste\'dodlardan biri. U «Made in Abyss» uchun yozgan saundtreki bilan xalqaro e\'tirofga sazovor bo\'lgan.' },
        { title: 'Musiqiy uslub:', text: 'Penkin musiqasi orkestr, xor va elektron elementlarning noyob uyg\'unligi bilan ajralib turadi. Uning kompozitsiyalari tinglovchini chuqur hissiy sayohatga yetaklaydi.' },
        { title: 'Mashhur ishlari:', text: '«Made in Abyss», «Tower of God», «The Rising of the Shield Hero», «Eden», «Star Wars: Visions» kabi loyihalar uchun yozilgan musiqalar.' }
      ]
    }
  }
];

// Очередь для основной станции
const defaultUpcomingTracks = [
  "Ado - Rockstar",
  "9lana - プロポーズ",
  "DECO*27 - モニタリング",
  "KIRA - CRASH THE PARTY",
  "Vaundy - Odoriko",
  "YOASOBI - Idol",
  "Eve - Kaikai Kitan",
  "Hatsune Miku - Senbonzakura",
  "Kenshi Yonezu - Kick Back",
  "LiSA - Gurenge"
];

// Очередь для OST станции
const ostUpcomingTracks = [
  "Kevin Penkin - Tomorrow (Made in Abyss)",
  "Kevin Penkin - Underground River (Made in Abyss)",
  "Hiroyuki Sawano - YouSeeBIGGIRL/T:T (Attack on Titan)",
  "Hiroyuki Sawano - Vogel im Käfig (Attack on Titan)",
  "Hiroyuki Sawano - The Reluctant Heroes (Attack on Titan)",
  "Hiroyuki Sawano - Call of Silence (Attack on Titan)",
  "Yuki Kajiura - Swordland (Sword Art Online)",
  "Yoko Kanno - Tank! (Cowboy Bebop)",
  "Yoko Kanno - The Real Folk Blues (Cowboy Bebop)",
  "Taku Iwasaki - Rhapsody (Gurren Lagann)",
  "Shiro Sagisu - Treachery (Bleach)",
  "Shiro Sagisu - Stand Up Be Strong (Bleach)",
  "Yuki Hayashi - You Say Run (My Hero Academia)",
  "Yuki Hayashi - Jet Set Run (My Hero Academia)",
  "Yutaka Yamada - Glassy Sky (Tokyo Ghoul)"
];

// Парсинг таймингов
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

// Получение таймкодов
const getTimestampsFromLyrics = (lyricsText: string): { time: number; line: string }[] => {
  const lines = lyricsText.split('\n');
  const timestamps: { time: number; line: string }[] = [];
  
  lines.forEach(line => {
    const timestampMatch = line.match(/\[(\d{2}:\d{2}\.\d{2})\]/);
    if (timestampMatch) {
      const time = parseTimestamp(timestampMatch[0]);
      const cleanLine = line.replace(/\[\d{2}:\d{2}\.\d{2}\]/, '').trim();
      if (cleanLine) {
        timestamps.push({ time, line: cleanLine });
      }
    }
  });
  
  return timestamps;
};

// Lyrics Component
const LyricsDisplay = ({ lyrics, currentTime, trackName, artistName }: { lyrics: Track['lyrics']; currentTime: number; trackName: string; artistName: string }) => {
  const [activeLang, setActiveLang] = useState<'uzbek' | 'romaji'>('uzbek');
  const languages = [
    { key: 'uzbek', label: 'UZ' },
    { key: 'romaji', label: 'RO' },
  ];

  const timestamps = lyrics ? getTimestampsFromLyrics(lyrics[activeLang]) : [];
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const getActiveLineIndex = () => {
    if (!lyrics) return -1;
    let activeIndex = -1;
    for (let i = 0; i < timestamps.length; i++) {
      if (currentTime >= timestamps[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
    return activeIndex;
  };

  const activeLineIndex = getActiveLineIndex();

  useEffect(() => {
    if (scrollRef.current && activeLineIndex >= 0) {
      const container = scrollRef.current;
      const activeElement = container.children[activeLineIndex] as HTMLElement;
      
      if (activeElement) {
        const containerHeight = container.clientHeight;
        const elementOffset = activeElement.offsetTop;
        const elementHeight = activeElement.clientHeight;
        
        container.scrollTo({
          top: elementOffset - (containerHeight / 2) + (elementHeight / 2),
          behavior: 'smooth'
        });
      }
    }
  }, [activeLineIndex]);

  if (!lyrics) {
    return null; // Будет обработано в родительском компоненте
  }

  return (
    <div className="flex flex-col h-full overflow-hidden w-full relative z-10">
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-shrink-0 px-2">
        <div className="overflow-hidden mr-2">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">"{trackName}"</h3>
          <p className="text-xs text-gray-400 mt-1 truncate">Musiqachi: {artistName}</p>
        </div>
        
        <div className="flex flex-shrink-0 bg-white/5 p-1 rounded-xl backdrop-blur-md border border-white/5">
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => setActiveLang(lang.key as 'uzbek' | 'romaji')}
              className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-lg text-[11px] md:text-xs font-bold transition-all ${
                activeLang === lang.key
                  ? 'bg-[#8a60c2] text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar space-y-3 md:space-y-4 text-center pr-2 pb-4 w-full"
        style={{ 
          maskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 85%, transparent)'
        }}
      >
        {timestamps.map((item, idx) => {
          const isActive = idx === activeLineIndex;
          const isNear = Math.abs(idx - activeLineIndex) <= 2;
          
          return (
            <div key={idx} className="flex justify-center w-full">
              <p 
                className={`transition-all duration-300 inline-block px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-sm md:text-base ${
                  isActive 
                    ? 'bg-[#8a60c2]/20 text-white font-medium md:text-lg shadow-[0_0_15px_rgba(138,96,194,0.15)]' 
                    : isNear
                      ? 'text-gray-300 opacity-80'
                      : 'text-gray-600 opacity-40'
                }`}
              >
                {item.line}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function RadioPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Вкладки на десктопе в правой панели: 'lyrics' (Маtn) или 'details' (Musiqa haqida)
  const [activeRightTab, setActiveRightTab] = useState<'lyrics' | 'details'>('lyrics');

  // Для мобильного скролл-вида: переключение между текстом, очередью или описанием
  const [mobileTab, setMobileTab] = useState<'queue' | 'lyrics' | 'details'>('queue');

  const [activeStation, setActiveStation] = useState<StationType>('default');
  const [isOstActivating, setIsOstActivating] = useState(false);
  
  const [transitionInfo, setTransitionInfo] = useState({
    image: '/images/ostchan.webp',
    title: '"OST"'
  });
  
  const [defaultQueue, setDefaultQueue] = useState(defaultUpcomingTracks);
  const [ostQueue, setOstQueue] = useState(ostUpcomingTracks);
  
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [listenersCount, setListenersCount] = useState(342);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeLineRef = useRef<HTMLDivElement | null>(null);
  const prevStationRef = useRef<StationType>('default');
  const [isMobile, setIsMobile] = useState(false);

  // Закрепленный фиолетовый цвет темы аметиста
  const themeColor = '#8a60c2';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const currentPlaylist = activeStation === 'default' ? defaultPlaylist : ostPlaylist;
  const currentQueue = activeStation === 'default' ? defaultQueue : ostQueue;

  useEffect(() => {
    const interval = setInterval(() => {
      setListenersCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentPlaylist[0] && !selectedTrack) {
      setSelectedTrack(currentPlaylist[0]);
      return;
    }

    if (prevStationRef.current !== activeStation && currentPlaylist[0]) {
      setSelectedTrack(currentPlaylist[0]);
      setIsPlaying(false);
      setCurrentProgress(0);
      // Если у трека нет lyrics, автоматически открываем вкладку деталей
      if (!currentPlaylist[0].lyrics) {
        setActiveRightTab('details');
        setMobileTab('details');
      } else {
        setActiveRightTab('lyrics');
        setMobileTab('lyrics');
      }
    }

    if (selectedTrack && audioRef.current) {
      const audio = audioRef.current;
      audio.src = selectedTrack.audioSrc;
      audio.load();
      
      if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => {
            if (err.name !== 'AbortError') {
              console.error('Auto-play blocked:', err);
              setIsPlaying(false);
            }
          });
        }
      }
    }
    
    prevStationRef.current = activeStation;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTrack, activeStation]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setCurrentProgress(audio.currentTime);
    const handleError = (e: ErrorEvent) => console.error('Audio error:', e);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentProgress(0);
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('error', handleError as any);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('error', handleError as any);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            if (error.name !== 'AbortError') {
              console.error('Playback error:', error);
              setIsPlaying(false);
            }
          });
        }
        setIsPlaying(true);
      }
    }
  };

  const toggleStation = () => {
    if (isOstActivating) return;

    const nextStation = activeStation === 'default' ? 'ost' : 'default';
    const transitionImage = nextStation === 'ost' ? '/images/ostchan.webp' : '/images/jpopchan.webp';

    setTransitionInfo({
      image: transitionImage,
      title: nextStation === 'ost' ? '"OST"' : '"J-Pop / J-Rock"'
    });

    setIsOstActivating(true);
    
    setTimeout(() => {
      setActiveStation(nextStation);
    }, 1200);

    setTimeout(() => {
      setIsOstActivating(false);
    }, 3000);
  };

  // Регулятор громкости по клику
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeLineRef.current) return;
    const rect = volumeLineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const finalVol = parseFloat(percent.toFixed(2));
    setVolume(finalVol);
    setIsMuted(finalVol === 0);
  };

  // Плавная регулировка колесиком мыши
  const handleVolumeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const diff = e.deltaY < 0 ? 0.05 : -0.05;
    const newVol = Math.max(0, Math.min(1, volume + diff));
    const finalVol = parseFloat(newVol.toFixed(2));
    setVolume(finalVol);
    setIsMuted(finalVol === 0);
  };

  const displayTracks = selectedTrack 
    ? [`${selectedTrack.artist} - ${selectedTrack.title}`, ...currentQueue.slice(0, 9)] 
    : currentQueue.slice(0, 10);

  const currentTrackInfo = selectedTrack?.info;
  const isDefaultStation = activeStation === 'default';
  
  const stationLabel = isDefaultStation ? 'STATION' : 'STATION';
  const stationHoverLabels = isDefaultStation ? ['O','S','T'] : ['J','-','P','O','P'];
  const stationHoverSubLabels = isDefaultStation ? ['S','T','A','T','I','O','N'] : ['J','-','R','O','C','K'];

  return (
    <div className="min-h-screen bg-[#0b090f] relative overflow-x-hidden flex flex-col select-none">
      
      {/* 1. Задний анимированный фон */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#8a60c2]/15 blur-[150px] rounded-full animate-pulse-slow" />
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-[#4a2f8a]/15 blur-[150px] rounded-full" />
      </div>

      {/* 2. НАСТОЯЩИЙ НАВИГАЦИОННЫЙ ХЕДЕР ИЗ ВАШЕГО ПОРТАЛА (ORIGINAL TopBar) */}
      <header className="hidden lg:sticky lg:flex lg:items-center lg:justify-center lg:top-0 lg:h-16 lg:w-full lg:border-b lg:border-white/10 lg:bg-[#0d0c10]/80 lg:backdrop-blur-xl lg:z-[999] lg:overflow-hidden select-none">
        <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto px-6">
          <button className="flex cursor-pointer transition-transform duration-200 active:scale-95">
            <span className="font-bold text-4xl text-white">
              Kawa<span style={{ color: themeColor }}>ii</span>
            </span>
          </button>
          
          <div className="flex items-center justify-center text-white h-full gap-7">
            <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95">
              <Search className="w-5 h-5 text-gray-300" />
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-2.5 gap-1.5 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.75 3.5c-.69 0-1.25.56-1.25 1.25V16.8c.375-.192.8-.3 1.25-.3H18.5v-13H6.75ZM18.5 18H6.75a1.25 1.25 0 1 0 0 2.5H18.5V18ZM4 19.25V4.75A2.75 2.75 0 0 1 6.75 2H20v20H6.75A2.75 2.75 0 0 1 4 19.25Z" />
              </svg>
              <span className="font-bold text-[13px] tracking-wider uppercase font-mono">Katalog</span>
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-2.5 gap-1.5 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.77 21.7c.155.065.32.095.48.095l.005-.005c.32 0 .64-.125.88-.365L11.56 18h7.69A2.755 2.755 0 0 0 22 15.25v-9.5A2.755 2.755 0 0 0 19.25 3H4.75A2.755 2.755 0 0 0 2 5.75v9.5A2.755 2.755 0 0 0 4.75 18H6v2.545c0 .51.3.96.77 1.155ZM3.5 5.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v9.5c0 .69-.56 1.25-1.25 1.25h-8.31L7.5 19.94V16.5H4.75c-.69 0-1.25-.56-1.25-1.25v-9.5ZM17.5 8h-11v1.5h11V8Zm-4 3.5h-7V13h7v-1.5Z" />
              </svg>
              <span className="font-bold text-[13px] tracking-wider uppercase font-mono">Forumlar</span>
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-2.5 gap-1.5 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95">
              <Headphones className="w-5 h-5" style={{ color: themeColor }} />
              <span className="font-bold text-[13px] tracking-wider uppercase font-mono" style={{ color: themeColor }}>Radio</span>
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95">
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </button>
          </div>
          
          <div className="flex items-center justify-between gap-4">
            <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95">
              <Bell className="w-5 h-5 text-gray-300" />
            </button>
            <button className="flex shrink-0 h-9 w-9 rounded-sm border border-white/10 bg-white/5 cursor-pointer overflow-hidden active:scale-95 transition-transform">
              <div className="relative w-full h-full">
                <img className="object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlk0JfikQBJpYrg_nlYLZUcjDOcEaanRtykudQ9_X1slNjDwOINg9RYk&s=10" alt="Profile" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 bg-[#0d0c10]/95 backdrop-blur-xl z-[999] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-24 px-6 gap-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest" style={{ color: themeColor }}>Menyu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition">
            <X size={28} />
          </button>
        </div>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Asosiy</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest transition" style={{ color: themeColor }}>Katalog</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Forumlar</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Radio</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Profil</a>
      </div>

      {/* 3. Основной контент */}
      <div className="relative z-10 w-full flex flex-col items-center pt-4 pb-[100px] md:pt-16 md:pb-12">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-5 flex flex-col lg:flex-row gap-4 md:gap-6 relative">
          
          {/* ЭФФЕКТ ЗАПОЛНЕНИЯ (СТАНЦИЯ) - ДЕСКТОП (перекрывает всё во время смены) */}
          <div 
            className="hidden md:flex absolute top-0 bottom-0 left-4 right-4 md:left-5 md:right-5 z-[100] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none items-center justify-center overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            style={{
              clipPath: isOstActivating ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
              opacity: isOstActivating ? 1 : 0,
              backgroundColor: themeColor
            }}
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center" style={{ backgroundColor: themeColor }}>
              <div className={`relative h-full w-full ${transitionInfo.image.includes('ostchan') ? 'md:w-[50%] md:ml-20' : 'md:w-[100%]'}`}>
                <Image
                  src={transitionInfo.image}
                  alt="Station Channel"
                  fill
                  className={`transition-transform duration-1000 ${isOstActivating ? 'scale-100' : 'scale-110'} ${
                    transitionInfo.image.includes('ostchan') ? 'object-cover object-[50%_20%]' : 'object-cover object-center'
                  }`}
                  priority
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a60c2]/90 via-[#8a60c2]/70 to-[#b388eb]/90" />
            </div>
            
            <div className={`relative z-10 transition-all duration-500 delay-200 text-center ${isOstActivating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2 italic drop-shadow-lg">{transitionInfo.title}</h2>
              <p className="text-white/90 font-mono tracking-widest text-xs md:text-sm uppercase drop-shadow-md">tizimi faollashtirildi</p>
              <div className="mt-4 w-24 h-1 bg-white/30 mx-auto rounded-full overflow-hidden">
                <div className="h-full bg-white animate-loading-bar" />
              </div>
            </div>
          </div>

          {/* ================= ЛЕВАЯ КАРТОЧКА: ПЛЕЕР С ВИНИЛОМ И КНОПКАМИ ================= */}
          <div className="w-full lg:w-[600px] flex-shrink-0 bg-[#1c1924]/60 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] px-4 md:px-8 pt-5 md:pt-8 pb-8 shadow-2xl border border-white/5 flex flex-col h-[650px] relative overflow-hidden">
            
            {/* ЭФФЕКТ ЗАПОЛНЕНИЯ ВНУТРИ ПЛЕЕРА - МОБИЛКА */}
            <div 
              className="md:hidden absolute inset-0 z-[60] flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none"
              style={{
                clipPath: isOstActivating ? 'inset(0 0 0 0)' : 'inset(100% 0 0 0)',
                opacity: isOstActivating ? 1 : 0,
              }}
            >
              <div className="absolute inset-0 z-0 bg-[#b78de7]">
                <Image
                  src={transitionInfo.image}
                  alt="Station Channel"
                  fill
                  className={`transition-transform duration-1000 ${isOstActivating ? 'scale-100' : 'scale-110'} ${
                    transitionInfo.image.includes('ostchan') ? 'object-cover object-[50%_20%]' : 'object-cover object-center'
                  }`}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#8a60c2]/90 via-[#8a60c2]/70 to-[#b388eb]/90" />
              </div>
              
              <div className={`relative z-10 transition-all duration-500 delay-200 text-center ${isOstActivating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <h2 className="text-4xl font-black text-white tracking-tighter mb-2 italic drop-shadow-lg">{transitionInfo.title}</h2>
                <p className="text-white/90 font-mono tracking-widest text-xs uppercase drop-shadow-md">tizimi faollashtirildi</p>
                <div className="mt-4 w-24 h-1 bg-white/30 mx-auto rounded-full overflow-hidden">
                  <div className="h-full bg-white animate-loading-bar" />
                </div>
              </div>
            </div>

            {/* Top Bar Плеера */}
            <div className="flex relative items-center justify-between flex-shrink-0 w-full z-10 px-1">
              <div className="flex flex-col items-start leading-[0.8] gap-1 select-none transition-all duration-300">
                <span className="text-[20px] md:text-[24px] font-black tracking-[0.2em] uppercase font-mono text-white/80 text-shadow-sm">
                  KAWAII
                </span>
                <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase font-mono text-gray-400 text-shadow-sm">
                  RADIO
                </span>
              </div>
              
              {/* Бейдж активной станции */}
              <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 py-1 px-3 rounded-full text-[10px] font-mono tracking-widest text-white/40 uppercase">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} />
                <span>{activeStation === 'default' ? 'J-POP' : 'OST'} STATION</span>
              </div>
            </div>

            {/* ВИЗУАЛИЗАТОР И ОГРОМНЫЙ РЕАЛИСТИЧНЫЙ ВИНИЛ */}
            <div className="flex-1 flex flex-col items-center justify-center relative py-2 z-10">
              <div className="relative flex items-center justify-center w-full h-full">
                
                {/* Легкие светящиеся волны-пульсации вокруг пластинки */}
                <div 
                  className={`absolute w-[290px] h-[290px] xs:w-[350px] xs:h-[350px] md:w-[410px] md:h-[410px] rounded-full border transition-all duration-1000 pointer-events-none ${isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} 
                  style={{ 
                    borderColor: `${themeColor}44`,
                    animation: isPlaying ? 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none' 
                  }} 
                />
                
                {/* РЕАЛИСТИЧНАЯ ВИНИЛОВАЯ ПЛАСТИНКА С КРУГЛОЙ КАРТИНКОЙ ПО ЦЕНТРУ */}
                <div 
                  onClick={togglePlayPause} 
                  className="relative w-[260px] h-[260px] xs:w-[320px] xs:h-[320px] md:w-[380px] md:h-[380px] rounded-full shadow-[0_15px_50px_rgba(0,0,0,0.85)] cursor-pointer group active:scale-95 transition-all duration-300 flex items-center justify-center border-4 border-white/5"
                  style={{
                    background: 'radial-gradient(circle, #0e0c12 0%, #17151e 25%, #0f0d14 26%, #221e2a 27%, #0f0d14 28%, #1c1924 60%, #0d0b11 61%, #1f1b26 62%, #0d0b11 63%, #141219 80%, #08070b 100%)',
                    boxShadow: `0 15px 50px rgba(0,0,0,0.85), inset 0 0 40px rgba(138, 96, 194, 0.15)`
                  }}
                >
                  {/* Концентрические тонкие бороздки винила (Grooves) */}
                  <div className="absolute inset-2 rounded-full border border-white/[0.02] pointer-events-none" />
                  <div className="absolute inset-6 rounded-full border border-white/[0.02] pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-white/[0.015] pointer-events-none" />
                  <div className="absolute inset-18 rounded-full border border-white/[0.015] pointer-events-none" />
                  <div className="absolute inset-28 rounded-full border border-white/[0.01] pointer-events-none" />
                  
                  {/* Круглая наклейка-обложка в центре винила */}
                  <div 
                    className={`relative w-[48%] h-[48%] rounded-full overflow-hidden border-4 border-[#121016] shadow-inner transition-transform duration-[20000ms] linear infinite ${isPlaying ? 'animate-spin-slow' : ''}`}
                    style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}
                  >
                    <Image 
                      src={selectedTrack?.coverArt || '/images/ado-elf.jpg'} 
                      alt="Track Cover Label" 
                      fill 
                      className="object-cover"
                      priority
                    />
                    
                    {/* Центральный шпиндель (Spindle Hole) */}
                    <div className="absolute inset-0 m-auto w-5 h-5 bg-[#0b090f] rounded-full border-[3px] border-[#1f1b26] z-20 shadow-md" />
                  </div>

                  {/* Оверлей управления Play/Pause при ховере */}
                  <div className="absolute inset-0 m-auto w-12 h-12 md:w-14 md:h-14 bg-[#15131a]/90 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl backdrop-blur-sm z-30">
                    {isPlaying ? (
                      <Pause className="text-white opacity-90 w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="text-white opacity-90 ml-1 w-5 h-5" fill="currentColor" />
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Информация о треке (Всегда видна и на десктопе, и на мобилке) */}
            <div className="w-full flex-shrink-0 z-10 flex flex-col items-center text-center gap-1.5 mt-auto">
              <h3 className="text-white font-extrabold text-xl md:text-2xl truncate max-w-full px-2 tracking-tight">
                {selectedTrack?.title}
              </h3>
              <p className="text-xs md:text-sm font-bold uppercase tracking-[0.18em]" style={{ color: themeColor }}>
                {selectedTrack?.artist}
              </p>
            </div>

            {/* Удобный тактильный Volume-слайдер (Всегда на виду!) */}
            <div 
              onWheel={handleVolumeWheel}
              className="w-full flex-shrink-0 z-10 mt-4 px-2 select-none"
            >
              <div 
                ref={volumeLineRef}
                onClick={handleVolumeClick}
                className="bg-white/[0.03] border border-white/5 rounded-2xl px-4 h-12 flex items-center justify-between gap-4 cursor-pointer hover:border-white/10 transition-colors"
              >
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} 
                  className="text-gray-400 hover:text-white transition flex-shrink-0 cursor-pointer p-1"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX size={16} style={{ color: themeColor }} />
                  ) : (
                    <Volume2 size={16} />
                  )}
                </button>
                
                {/* Интерактивная полоса слайдера */}
                <div className="relative flex-1 h-5 flex items-center group/slider">
                  {/* Задний трек */}
                  <div className="absolute w-full h-[2px] bg-white/10 rounded-full" />
                  
                  {/* Активная светящаяся полоса громкости */}
                  <div 
                    className="absolute h-[2px] rounded-full transition-all" 
                    style={{ 
                      width: `${(isMuted ? 0 : volume) * 100}%`, 
                      backgroundColor: themeColor,
                      boxShadow: `0 0 8px ${themeColor}cc`
                    }} 
                  />
                  
                  {/* Бегунок в виде пилюли */}
                  <div 
                    className="absolute w-2 h-4 rounded-full bg-white shadow-md transform scale-100 group-hover/slider:scale-115 transition-transform pointer-events-none"
                    style={{ 
                      left: `calc(${(isMuted ? 0 : volume) * 100}% - 4px)`,
                      boxShadow: `0 0 6px ${themeColor}`
                    }}
                  />
                </div>

                {/* Процентное значение */}
                <span className="font-mono text-[10px] font-black min-w-[28px] text-right" style={{ color: themeColor }}>
                  {isMuted ? '0' : Math.round(volume * 100)}%
                </span>
              </div>
            </div>

            {/* Метки эфира и количества слушателей */}
            <div className="w-full flex-shrink-0 z-10 flex items-center justify-between px-2 mt-4 pt-3.5 border-t border-white/5 select-none">
              <span className="flex items-center gap-1 text-[10px] font-bold tracking-widest" style={{ color: themeColor }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a60c2] animate-pulse" /> LIVE STREAM
              </span>
              <span className="flex items-center gap-1.5 text-gray-500 text-[10px] font-bold tracking-widest">
                <Users size={12} className="text-gray-400" /> {listenersCount} ONLINE
              </span>
            </div>

            {/* Кнопка смены станции в плейлисте */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 group/station z-[105]">
              <div 
                onClick={toggleStation}
                className="bg-gradient-to-r from-[#8a60c2] to-[#b388eb] backdrop-blur-md border-r border-t border-b border-white/5 rounded-r-xl flex flex-col items-center justify-start transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-none cursor-pointer w-5 h-[480px] group-hover/station:w-[32px] overflow-hidden"
              >
                <div className="absolute top-0 flex items-center justify-center w-5 h-full group-hover/station:opacity-0 group-hover/station:translate-x-2 transition-all duration-400 pointer-events-none">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white whitespace-nowrap" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>{stationLabel}</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 -translate-x-2 group-hover/station:opacity-100 group-hover/station:translate-x-0 transition-all duration-400 delay-75 pointer-events-none group-hover/station:pointer-events-auto">
                  <div className="flex flex-col items-center gap-4 px-2 py-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <div className="flex flex-col items-center">{stationHoverLabels.map((letter, i) => <span key={i} className="text-[12px] font-bold text-white tracking-wide">{letter}</span>)}</div>
                    <div className="w-3 h-px bg-white/20" />
                    <div className="flex flex-col items-center">{stationHoverSubLabels.map((letter, i) => <span key={i} className="text-[12px] font-bold text-white tracking-wide">{letter}</span>)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* СТАНЦИЯ — мобилка: Кнопка на панели */}
            <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-[65]">
              <button
                onClick={toggleStation}
                className="bg-[#15131a] border border-b-0 border-white/5 rounded-t-xl flex items-center justify-center shadow-[0_-4px_15px_rgba(0,0,0,0.4)] h-8 w-[120px] active:scale-95 transition-transform"
              >
                <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 whitespace-nowrap">
                  STATION
                </span>
              </button>
            </div>

          </div>

          {/* ================= ПРАВАЯ КАРТОЧКА: ДЕТАЛИ И ТЕКСТ (С ВКЛАДКАМИ НА ДЕСКТОПЕ) ================= */}
          <div className="hidden md:flex flex-1 bg-[#1c1924]/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/5 h-[650px] flex-col relative z-20 lg:mr-[200px]">
            
            {/* Очередь на фоне (Floating queue cards) */}
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-full flex-col gap-2 z-[-1] pointer-events-none">
              {displayTracks.map((track, i) => (
                <div 
                  key={`${track}-${i}`}
                  style={{
                    '--item-opacity': Math.max(0.08, 0.9 - i * 0.14), 
                    '--item-blur': `${i * 0.6}px` 
                  } as React.CSSProperties}
                  className="relative h-10 w-[140px] via-[#8a60c2]/5 to-[#8a60c2]/15 backdrop-blur-md border border-white/10 border-l-0 rounded-r-xl shadow-lg overflow-hidden opacity-[var(--item-opacity)] blur-[var(--item-blur)]"
                >
                  <div className="absolute top-0 left-0 h-full w-full flex items-center px-4">
                    <span className="flex-1 text-[11px] font-medium whitespace-nowrap truncate uppercase tracking-wider text-white">
                      {track}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Вкладки переключения на десктопе: Текст (Lyrics) / Musiqa haqida (Details) */}
            <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-2xl flex-shrink-0 mb-6 w-fit select-none">
              <button 
                onClick={() => setActiveRightTab('lyrics')} 
                disabled={!selectedTrack?.lyrics}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  !selectedTrack?.lyrics 
                    ? 'opacity-40 cursor-not-allowed text-gray-500' 
                    : activeRightTab === 'lyrics' 
                      ? 'bg-[#8a60c2] text-white shadow-md' 
                      : 'text-gray-400 hover:text-white'
                }`}
              >
                <FileText size={14} /> Matn
              </button>
              <button 
                onClick={() => setActiveRightTab('details')} 
                className={`px-6 py-2.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  activeRightTab === 'details' 
                    ? 'bg-[#8a60c2] text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Info size={14} /> Musiqa haqida
              </button>
            </div>

            {/* Контент в зависимости от активной вкладки */}
            <div className="flex-1 overflow-hidden relative">
              {activeRightTab === 'lyrics' && selectedTrack?.lyrics ? (
                // ТЕКСТ ПЕСНИ
                <LyricsDisplay 
                  lyrics={selectedTrack.lyrics} 
                  currentTime={currentProgress} 
                  trackName={selectedTrack.title} 
                  artistName={selectedTrack.artist}
                />
              ) : (
                // ПОДРОБНОЕ ОПИСАНИЕ И ДЕТАЛИ ТРЕКА (Always available!)
                <div className="h-full flex flex-col justify-start pr-2 overflow-y-auto custom-scrollbar select-text">
                  
                  {/* Красивый баннер с обложкой при отсутствии текста */}
                  {!selectedTrack?.lyrics && (
                    <div className="flex items-center gap-5 p-5 bg-white/[0.02] border border-white/5 rounded-3xl mb-6 shadow-md select-none flex-shrink-0">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden shadow-lg border border-white/10">
                        <Image 
                          src={selectedTrack?.coverArt || '/images/ado-elf.jpg'} 
                          alt="Album Art" 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-white/30 mb-0.5">Hozir eshityapsiz</span>
                        <h4 className="text-white font-bold text-lg leading-tight">«{selectedTrack?.title}»</h4>
                        <span className="text-xs text-[#8a60c2] font-semibold mt-0.5">{selectedTrack?.artist}</span>
                      </div>
                    </div>
                  )}

                  {currentTrackInfo ? (
                    <div className="space-y-6">
                      <div className="bg-white/[0.01] border border-white/5 p-5 rounded-3xl">
                        <h4 className="text-[#8a60c2] text-[10px] font-mono tracking-wider uppercase mb-2">Qisqacha tavsif</h4>
                        <p className="text-sm text-gray-200 leading-relaxed font-sans font-medium select-text">
                          {currentTrackInfo.description}
                        </p>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-[#8a60c2] text-[10px] font-mono tracking-wider uppercase pl-1">Batafsil tafsilotlar</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {currentTrackInfo.details.map((detail, idx) => (
                            <div key={idx} className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col justify-between hover:bg-white/[0.03] transition-colors select-text">
                              <span className="text-[#8a60c2] text-[9px] font-mono tracking-widest uppercase mb-1">
                                {detail.title}
                              </span>
                              <p className="text-[11px] text-gray-400 font-sans leading-relaxed">
                                {detail.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                      <Music size={32} className="mb-2 opacity-30" />
                      <p className="text-xs uppercase tracking-widest">Tafsilotlar mavjud emas</p>
                    </div>
                  )}

                </div>
              )}
            </div>
          </div>

          {/* ================= НИЖНИЙ БЛОК: ОЧЕРЕДЬ, ТЕКСТ И ДЕТАЛИ (ТОЛЬКО ДЛЯ МОБИЛОК) ================= */}
          <div className="md:hidden w-full flex flex-col gap-3 mt-2 px-1">
            
            {/* Мобильные Вкладки: Очередь / Текст / Musiqa haqida */}
            <div className="flex bg-[#1c1924]/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-xl select-none">
              <button 
                onClick={() => setMobileTab('queue')} 
                className={`flex-1 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${mobileTab === 'queue' ? 'bg-[#8a60c2] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                Navbat
              </button>
              <button 
                onClick={() => setMobileTab('lyrics')} 
                disabled={!selectedTrack?.lyrics}
                className={`flex-1 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${!selectedTrack?.lyrics ? 'opacity-30 cursor-not-allowed text-gray-600' : mobileTab === 'lyrics' ? 'bg-[#8a60c2] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                Matn
              </button>
              <button 
                onClick={() => setMobileTab('details')} 
                className={`flex-1 py-3 rounded-xl text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${mobileTab === 'details' ? 'bg-[#8a60c2] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
              >
                Tafsilot
              </button>
            </div>

            {/* Мобильный Контейнер с контентом */}
            <div className="bg-[#1c1924]/60 backdrop-blur-xl rounded-[2rem] p-5 border border-white/5 shadow-2xl h-[400px] relative overflow-hidden">
              
              {mobileTab === 'lyrics' && selectedTrack?.lyrics ? (
                // ТЕКСТ ПЕСНИ (МОБИЛКА)
                <div className="h-full w-full relative">
                  <LyricsDisplay lyrics={selectedTrack.lyrics} currentTime={currentProgress} trackName={selectedTrack.title} artistName={selectedTrack.artist} />
                </div>
              ) : mobileTab === 'details' ? (
                // ДЕТАЛИ ТРЕКА (МОБИЛКА)
                <div className="h-full flex flex-col overflow-y-auto custom-scrollbar pr-2 select-text" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent)' }}>
                  {currentTrackInfo ? (
                    <div className="space-y-4">
                      <div className="bg-white/5 p-4 rounded-xl">
                        <h4 className="text-[#8a60c2] text-[9px] font-bold tracking-wider uppercase mb-1">Musiqa haqida</h4>
                        <p className="text-xs text-gray-200 leading-relaxed font-sans">
                          {currentTrackInfo.description}
                        </p>
                      </div>
                      <div className="space-y-3">
                        {currentTrackInfo.details.map((detail, idx) => (
                          <div key={idx} className="bg-white/5 p-3 rounded-xl border border-white/5">
                            <strong className="text-[#8a60c2] text-[10px] block mb-0.5">{detail.title}</strong>
                            <p className="text-[11px] text-gray-300 leading-relaxed font-sans">{detail.text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-8">Tafsilotlar mavjud emas</p>
                  )}
                </div>
              ) : (
                // ОЧЕРЕДЬ ТРЕКОВ (МОБИЛКА)
                <div className="h-full flex flex-col overflow-y-auto custom-scrollbar pr-2" style={{ maskImage: 'linear-gradient(to bottom, black 0%, black 90%, transparent)' }}>
                  <h3 className="text-[#8a60c2] text-[10px] font-bold uppercase tracking-widest mb-2 mt-1">Hozir efirda</h3>
                  <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 mb-4 flex-shrink-0">
                     <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                       <Image src={selectedTrack?.coverArt || '/images/ado-elf.jpg'} alt="cover" fill className="object-cover" />
                     </div>
                     <div className="flex flex-col overflow-hidden">
                       <span className="text-sm font-bold text-white truncate">{selectedTrack?.artist} - {selectedTrack?.title}</span>
                       <span className="text-[10px] font-medium text-[#8a60c2] flex items-center gap-1.5 mt-0.5">
                         <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8a60c2] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b388eb]"></span>
                          </span>
                         Playing now
                       </span>
                     </div>
                  </div>

                  <h3 className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-3 mt-2">Keyingi treklar</h3>
                  <div className="flex flex-col gap-3">
                    {currentQueue.slice(0, 10).map((track, idx) => {
                      const [artist, title] = track.split(' - ');
                      return (
                        <div key={idx} className="flex items-center gap-3 px-2 py-1">
                           <div className="w-8 h-8 rounded-lg bg-white/5 flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-gray-500">
                             {idx + 1}
                           </div>
                           <div className="flex flex-col overflow-hidden">
                             <span className="text-xs font-medium text-gray-200 truncate">{title || track}</span>
                             <span className="text-[10px] text-gray-500 truncate">{artist}</span>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>
      </div>

      {/* 4. НАСТОЯЩИЙ МОБИЛЬНЫЙ НАВИГАТОР СНИЗУ (ORIGINAL BottomBar) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 px-5 w-full flex items-center justify-center bg-[#0d0c10]/95 backdrop-blur-xl border-t border-white/5 select-none z-[999] lg:hidden">
        <div className="flex items-center justify-between w-full max-w-[400px]">
          <button className="flex flex-col items-center justify-center gap-1 p-1 text-gray-500 hover:text-white transition-all cursor-pointer active:scale-95">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.25 2H6.75A2.755 2.755 0 0 0 4 4.75v16c0 .26.135.5.35.635.22.135.495.15.725.04L12 18.085l6.925 3.34a.753.753 0 0 0 .725-.04.74.74 0 0 0 .35-.635v-16A2.755 2.755 0 0 0 17.25 2Zm1.25 17.555-6.5-3.14-6.5 3.14V4.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v14.805Z" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wide font-sans">Saqlangan</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-1 p-1 text-gray-500 hover:text-white transition-all cursor-pointer active:scale-95">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.75 3.5c-.69 0-1.25.56-1.25 1.25V16.8c.375-.192.8-.3 1.25-.3H18.5v-13H6.75ZM18.5 18H6.75a1.25 1.25 0 1 0 0 2.5H18.5V18ZM4 19.25V4.75A2.75 2.75 0 0 1 6.75 2H20v20H6.75A2.75 2.75 0 0 1 4 19.25Z" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wide font-sans">Katalog</span>
          </button>

          {/* Фирменный логотип по центру */}
          <button className="flex flex-col items-center justify-center p-1 cursor-pointer active:scale-95 -translate-y-1" style={{ color: themeColor }}>
            <svg className="w-11 h-11" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.933 111.97">
              <g><path d="m 77.651831,81.019945 a 27.501443,10.766962 65.856372 0 0 -1.370976,0.37931 27.501443,10.766962 65.856372 0 0 1.545126,29.617835 27.501443,10.766962 65.856372 0 0 12.423529,17.81389 38.010708,34.932919 0 0 0 -6.42545,4.73253 38.010708,34.932919 0 0 0 -9.302787,13.92525 38.010708,34.932919 0 0 0 -1.458309,5.71283 38.010708,34.932919 0 0 0 -0.406694,5.0953 38.010708,34.932919 0 0 0 0.163815,3.23856 22.006201,23.633765 0 0 1 0.155029,1.27589 22.006201,23.633765 0 0 1 0.115755,2.41949 22.006201,23.633765 0 0 1 -0.209806,3.25458 22.006201,23.633765 0 0 1 -8.962761,15.94425 22.608014,23.237316 0 0 0 17.436658,8.44651 22.608014,23.237316 0 0 0 11.88817,-3.47214 20.472755,20.609692 0 0 1 -0.80874,-0.59427 20.472755,20.609692 0 0 1 -7.70857,-12.8788 20.472755,19.753529 0 0 0 4.64984,1.87688 20.472755,19.753529 0 0 1 -3.48816,-11.02878 20.472755,19.753529 0 0 1 0.0594,-1.50585 20.472755,19.753529 0 0 1 0.0765,-0.76585 20.472755,19.753529 0 0 1 0.004,-0.032 24.789677,18.948704 0 0 0 0.0124,-0.008 24.789677,18.948704 0 0 0 4.11086,-3.15639 24.789677,18.948704 0 0 0 4.37648,-6.60839 24.789677,18.948704 0 0 0 0.032,-0.0889 9.0917225,9.9998608 0 0 1 0.0207,0.67231 9.0917225,9.9998608 0 0 1 -1.78181,5.94589 24.093296,25.166134 0 0 0 3.14813,-0.49609 20.472755,19.753529 0 0 1 2.47892,-4.90358 20.472755,19.753529 0 0 0 -2.47892,4.90358 24.093296,25.166134 0 0 0 14.91227,-10.66343 24.093296,25.166134 0 0 0 15.02544,10.76006 24.093296,25.166134 0 0 0 3.08818,0.48266 9.0917225,9.9998608 0 0 1 -1.7818,-5.94589 9.0917225,9.9998608 0 0 1 0.0207,-0.67231 24.789677,18.948704 0 0 0 0.032,0.0889 24.789677,18.948704 0 0 0 4.37647,6.60838 24.789677,18.948704 0 0 0 4.11086,3.1564 24.789677,18.948704 0 0 0 0.0124,0.008 20.472755,19.753529 0 0 1 0.004,0.032 20.472755,19.753529 0 0 1 0.0765,0.76585 20.472755,19.753529 0 0 1 0.0594,1.50585 20.472755,19.753529 0 0 1 -3.48816,11.02878 20.472755,19.753529 0 0 0 4.64985,-1.87689 20.472755,20.609692 0 0 1 -7.1019,12.39098 38.010708,34.932919 0 0 0 7.76749,-5.55987 38.010708,34.932919 0 0 1 -7.76749,5.55987 38.010708,34.932919 0 0 1 -5.1e-4,5.2e-4 20.472755,20.609692 0 0 1 -1.41542,1.0821 22.608014,23.237316 0 0 0 11.88816,3.47214 22.608014,23.237316 0 0 0 17.43666,-8.44651 22.006201,23.633765 0 0 1 -8.96276,-15.94425 22.006201,23.633765 0 0 1 -0.2098,-3.25458 22.006201,23.633765 0 0 1 0.11575,-2.41949 22.006201,23.633765 0 0 1 0.15503,-1.27589 38.010708,34.932919 0 0 0 0.16382,-3.23856 38.010708,34.932919 0 0 0 -0.4067,-5.0953 38.010708,34.932919 0 0 0 -1.45831,-5.71283 38.010708,34.932919 0 0 0 -9.30279,-13.92525 38.010708,34.932919 0 0 0 -6.42545,-4.73253 10.766962,27.501443 24.143628 0 0 12.42354,-17.8139 10.766962,27.501443 24.143628 0 0 1.54512,-29.617835 10.766962,27.501443 24.143628 0 0 -1.37097,-0.3793 10.766962,27.501443 24.143628 0 0 -19.69441,20.901055 10.766962,27.501443 24.143628 0 0 -5.11493,22.26582 38.010708,34.932919 0 0 0 -1.41335,-0.21394 38.010708,34.932919 0 0 0 -0.006,-0.002 38.010708,34.932919 0 0 0 -2.09445,-0.31678 38.010708,34.932919 0 0 0 -1.58802,-0.13642 l -5.1e-4,5.1e-4 a 38.010708,34.932919 0 0 0 -2.66496,-0.22944 38.010708,34.932919 0 0 0 -0.87385,-0.009 38.010708,34.932919 0 0 0 -8.20569,0.82372 27.501443,10.766962 65.856372 0 0 -5.11494,-22.26634 27.501443,10.766962 65.856372 0 0 -19.694402,-20.901055 z m 34.479029,66.806265 a 20.472755,19.753529 0 0 1 7.50342,3.91346 20.472755,19.753529 0 0 1 2.0438,1.93321 20.472755,19.753529 0 0 0 -2.0438,-1.93321 20.472755,19.753529 0 0 0 -7.50342,-3.91346 z m -5.14852,1.03353 a 20.472755,19.753529 0 0 0 -4.78214,2.91093 20.472755,19.753529 0 0 0 -2.03346,1.9048 20.472755,19.753529 0 0 1 2.03346,-1.9048 20.472755,19.753529 0 0 1 4.78214,-2.91093 z" transform="translate(-63.918301,-80.989785)" /></g>
            </svg>
            <span className="text-[9px] font-semibold tracking-wide font-sans mt-0.5">Radio</span>
          </button>
          
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center gap-1 p-1 text-gray-500 hover:text-white transition-all cursor-pointer active:scale-95"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 5.5H3V7h18V5.5Zm0 5.75H3v1.5h18v-1.5ZM3 17h18v1.5H3V17Z" />
            </svg>
            <span className="text-[9px] font-semibold tracking-wide font-sans">Menyu</span>
          </button>
        </div>
      </nav>

      {/* Скрытый аудиоэлемент */}
      <audio ref={audioRef} className="hidden" />
    </div>
  );
}