'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Search, X, Home, BookOpen, MessageCircle, Headphones, User, MoreHorizontal, Volume2, VolumeX, Info, Users, Menu, ChevronUp, Bookmark, Layers, Bell } from 'lucide-react';
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
      uzbek: `Elf - Ado (O'zbek tilida)\n\n[00:01.02] Yugur, yugur, tezroq, yanada tezroq,\n[00:06.92] Yetolmasin senga g'am bilan firoq.\n[00:12.93] Qidirgin nurlarga chulg'angan yo'lni,\n[00:19.09] O'sha yo'l o'ziga chorlar ko'ngilni.\n\n[00:26.53] Qarshi tur, chiroying hamda qadringni,\n[00:32.60] Toptab, ozor bermoq istaganlarga.\n[00:38.52] Charchasang uxlab ol, orom ol, sokin,\n[00:44.53] Afsonasi yo'q yulduzlar kabi jim.\n\n[00:50.98] Qo'limni qo'yib yuborgach o'sha dam,\n[00:53.87] Sezarsan barmoqlarim,\n[00:56.95] Tana taftim ham.\n[01:00.29] Ularning izlari dilingga sanchilar...\n\n[01:08.23] Unutganingni ham unutgin butun,\n[01:14.58] G'am hamda harorat yo'qolsin bugun.\n[01:20.56] Lekin quloqlarda hamon jaranglar,\n[01:26.85] Diydor orzusiga to'lib ohanglar:\n[01:32.33] "Alvido"\n[01:35.25] Alvido, alvido...\n[01:38.04] Sevaman, sen-chi?\n\n[01:44.50] Raqsga tush, kim kulmasin senga,\n[01:50.36] Qor yog'gan shoxlar kabi.\n[01:56.47] Baqir, chin qalbingdan baqir,\n[02:02.51] Borlig'ingni eshittir bu yerga.\n\n[02:08.99] Uzoqdagi gulxanlar xiralashar,\n[02:14.75] Qaytadigan uyni qidirar.\n[02:18.21] Agar uzun, uzun yo'lga chiqsang,\n[02:26.43] Baland ovozda ursin yuraging,\n[02:32.31] So'nggi zarbagacha seniki u.\n[02:38.57] Yosh, yosh, to'kilsin,\n[02:44.89] Tomchilar o'rmoningni o'stirar.\n\n[03:02.49] Bu ming yillik sog'inch edi,\n[03:08.89] Cheksizlikni sanab bo'lgach,\n[03:14.52] Hayvonga o'xshagan dunyoning burchagida,\n[03:20.33] Jang qilayotgan inson.\n[03:23.98] Sen elf, elf san,\n[03:27.25] Sevimli sayohat davom etadi.\n\n[03:33.54] Unutganingni ham unutgin,\n[03:39.90] G'am va harorat yo'qolsin,\n[03:45.59] Lekin hanuz quloqlarda qolgan,\n[03:52.22] Qattiq uchrashishni tilagan:\n[03:57.78] "Alvido"\n[04:00.65] Adieu, adieu\n[04:03.52] Sevaman, sen-chi?\n[04:06.61] Alvido, alvido`,
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
const LyricsDisplay = ({ lyrics, currentTime, trackName, artistName, isMobile }: { lyrics: Track['lyrics']; currentTime: number; trackName: string; artistName: string; isMobile: boolean }) => {
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
    return (
      <div className="relative w-full h-full rounded-2xl md:rounded-[2.5rem] overflow-hidden bg-[#1c1924]/60 border border-white/5">
        <div className="absolute inset-0">
          <Image
            src="/images/radio-pop.webp"
            alt="No lyrics available"
            fill
            className="object-cover opacity-20 blur-[4px]"
          />
        </div>
        <div className="absolute inset-0 flex flex-col z-10">
          <div className="p-4 md:p-8 flex-shrink-0">
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">"{trackName}"</h3>
            <p className="text-xs text-gray-400 mt-1">Music by {artistName}</p>
          </div>
          <div className="flex-1 flex items-center justify-center pb-8">
            <div className="text-center">
              <p className="text-white/80 text-base md:text-lg font-medium">Bu trek uchun matn mavjud emas</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden w-full relative z-10">
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-shrink-0 px-2">
        <div className="overflow-hidden mr-2">
          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight truncate">"{trackName}"</h3>
          <p className="text-xs text-gray-400 mt-1 truncate">Music by {artistName}</p>
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

  // Для мобильного скролл-вида: переключение между текстом и очередью
  const [mobileTab, setMobileTab] = useState<'queue' | 'lyrics'>('queue');

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
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [listenersCount, setListenersCount] = useState(342);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const prevStationRef = useRef<StationType>('default');
  const [isMobile, setIsMobile] = useState(false);

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

  const displayTracks = selectedTrack 
    ? [`${selectedTrack.artist} - ${selectedTrack.title}`, ...currentQueue.slice(0, 9)] 
    : currentQueue.slice(0, 10);

  const currentTrackInfo = selectedTrack?.info;
  const isDefaultStation = activeStation === 'default';
  
  const stationLabel = isDefaultStation ? 'STATION' : 'STATION';
  const stationHoverLabels = isDefaultStation ? ['O','S','T'] : ['J','-','P','O','P'];
  const stationHoverSubLabels = isDefaultStation ? ['S','T','A','T','I','O','N'] : ['J','-','R','O','C','K'];

  return (
    // Убрали overflow-hidden, теперь страница скроллится естественно (по вертикали)
    <div className="min-h-screen bg-[#0b090f] relative overflow-x-hidden flex flex-col">
      
      {/* Задний фон (Сделали fixed, чтобы он не уезжал при скролле) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-[#8a60c2]/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[20%] w-[600px] h-[600px] bg-[#4a2f8a]/20 blur-[150px] rounded-full" />
      </div>

      {/* НАВИГАЦИОННАЯ ПАНЕЛЬ — десктоп */}
      <header className="hidden md:block relative z-20 border-b border-gray-800/50 bg-[#0d0c10]/70 backdrop-blur-xl sticky top-0">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-5 h-[72px]">
          <div className="text-2xl font-black tracking-tight italic cursor-pointer">
            Kawaii<span className="text-[#8a60c2]">UZ</span>
          </div>
          <div className="flex items-center gap-6 text-xs uppercase font-bold tracking-[0.15em] text-gray-400">
            <button className="nav-link hover:text-white transition flex items-center gap-2 group p-2">
              <Search size={18} className="group-hover:text-white" />
            </button>
            <a href="#" className="nav-link hover:text-white transition flex items-center gap-2 group p-2">
              <BookOpen size={18} className="group-hover:text-white" />
              <span>Katalog</span>
            </a>
            <a href="#" className="nav-link hover:text-white transition flex items-center gap-2 group p-2">
              <MessageCircle size={18} className="group-hover:text-white" />
              <span>Forum</span>
            </a>
            <a href="#" className="nav-link text-white transition flex items-center gap-2 group p-2">
              <Headphones size={18} className="text-[#8a60c2]" />
              <span>Radio</span>
            </a>
            <button className="nav-link hover:text-white transition group p-2">
              <MoreHorizontal size={20} className="group-hover:text-white" />
            </button>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <User size={22} className="hover:text-white cursor-pointer transition p-1" />
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <div className={`fixed inset-0 bg-[#0d0c10]/95 backdrop-blur-xl z-[80] transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col pt-24 px-6 gap-6`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-black uppercase tracking-widest text-[#8a60c2]">Menyu</h2>
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400 hover:text-white transition">
            <X size={28} />
          </button>
        </div>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Asosiy</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-[#8a60c2] transition">Katalog</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Forum</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Radio</a>
        <a href="#" className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#8a60c2] transition">Profil</a>
      </div>

      {/* Основной контент (Обертка позволяет скроллить весь контент вниз) */}
      <div className="relative z-10 w-full flex flex-col items-center pt-4 pb-[100px] md:pt-28 md:pb-12">
        <div className="w-full max-w-[1400px] mx-auto px-4 md:px-5 flex flex-col lg:flex-row gap-4 md:gap-6 relative">
          
          {/* ЭФФЕКТ ЗАПОЛНЕНИЯ (СТАНЦИЯ) - ДЕСКТОП (перекрывает всё) */}
          <div 
            className="hidden md:flex absolute top-0 bottom-0 left-4 right-4 md:left-5 md:right-5 z-[100] bg-[#b78de7] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none items-center justify-center overflow-hidden rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            style={{
              clipPath: isOstActivating ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
              opacity: isOstActivating ? 1 : 0,
            }}
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#b78de7]">
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

          {/* ЛЕВАЯ КАРТОЧКА: ПЛЕЕР (Увеличенная высота для мобилок) */}
          <div className="w-full lg:w-[650px] flex-shrink-0 bg-[#1c1924]/60 backdrop-blur-xl rounded-[2rem] md:rounded-[2.5rem] px-2 md:px-8 pt-5 md:pt-8 pb-10 md:pb-16 shadow-2xl border border-white/5 flex flex-col h-[560px] xs:h-[620px] md:h-[650px] relative overflow-hidden">
            
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

            {/* ОВЕРЛЕЙ: Musiqa haqida */}
            <div className={`absolute inset-0 z-[55] bg-[#15131a]/95 backdrop-blur-xl flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${showInfoModal ? 'translate-y-0' : 'translate-y-full'}`}>
              <div className="p-6 md:p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-6 flex-shrink-0">
                  <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                    <Info className="text-[#8a60c2]" size={28} /> Musiqa haqida
                  </h3>
                  <button onClick={() => setShowInfoModal(false)} className="text-gray-400 hover:text-white transition p-2 bg-white/5 rounded-full hover:bg-white/10">
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto custom-scrollbar space-y-5 text-gray-300 leading-relaxed text-sm md:text-base pr-2 pb-12">
                  {currentTrackInfo ? (
                    <>
                      <p>
                        <strong className="text-white">«{selectedTrack?.title}»</strong> — {currentTrackInfo.description}
                      </p>
                      <ul className="space-y-4 mt-6">
                        {currentTrackInfo.details.map((detail, idx) => (
                          <li key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                            <strong className="text-[#8a60c2] block mb-1">{detail.title}</strong>
                            {detail.text}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="text-gray-400">Ma'lumot topilmadi</p>
                  )}
                </div>
              </div>
            </div>

            {/* Top Bar Плеера */}
            <div className="flex relative items-center justify-between flex-shrink-0 w-full z-10 px-2 md:px-2">
              <div className="flex flex-col items-start leading-[0.8] gap-1 select-none ml-2 md:ml-6 transition-all duration-300">
                <span className="text-[20px] md:text-[25px] font-black tracking-[0.2em] uppercase font-mono text-white/80 text-shadow-sm">
                  KAWAII
                </span>
                <span className="text-[10px] md:text-[12px] font-black tracking-[0.2em] uppercase font-mono text-gray-400 text-shadow-sm">
                  RADIO
                </span>
              </div>
              <button 
                onClick={() => setShowInfoModal(true)} 
                className="hover:text-white transition p-2.5 bg-white/5 rounded-full hover:bg-[#8a60c2]/20" 
                title="Musiqa haqida"
              >
                <Info className="text-gray-300 hover:text-white w-5 h-5 md:w-[22px] md:h-[22px]" />
              </button>
            </div>

            {/* ВИЗУАЛИЗАТОР И ОГРОМНЫЙ ВИНИЛ (Единый для мобилок и десктопа) */}
            <div className="flex-1 flex flex-col items-center justify-center relative py-4 z-10">
              <div className="relative flex items-center justify-center w-full h-full mt-4 md:mt-0">
                <div className={`absolute w-[320px] xs:w-[400px] md:w-[540px] h-[320px] xs:h-[400px] md:h-[540px] rounded-full border border-[#8a60c2]/30 transition-all duration-1000 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`} style={{ animation: isPlaying ? 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none' }} />
                <div className={`absolute w-[360px] xs:w-[460px] md:w-[620px] h-[360px] xs:h-[460px] md:h-[620px] rounded-full border border-[#8a60c2]/20 transition-all duration-1000 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`} style={{ animation: isPlaying ? 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite 1s' : 'none' }} />
                
                {/* МАКСИМАЛЬНО УВЕЛИЧЕННЫЙ ВИНИЛ */}
                <div onClick={togglePlayPause} className="relative w-[280px] h-[280px] xs:w-[350px] xs:h-[350px] md:w-[480px] md:h-[480px] rounded-full shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-[6px] md:border-[8px] border-[#1f1b26] cursor-pointer group active:scale-95 md:active:scale-100 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <Image src={selectedTrack?.coverArt || '/images/ado-elf.jpg'} alt="Track" fill className={`object-cover transition-all duration-1000 ${isPlaying ? 'animate-spin-slow' : ''}`} style={{ animationPlayState: isPlaying ? 'running' : 'paused' }} />
                  </div>
                  <div className="absolute inset-0 m-auto w-16 h-16 xs:w-20 xs:h-20 md:w-24 md:h-24 bg-[#15131a] rounded-full border-4 border-[#1f1b26] flex items-center justify-center transition-all duration-300 group-hover:bg-[#8a60c2]">
                    {isPlaying ? <Pause className="text-white opacity-80 md:group-hover:opacity-100 w-6 h-6 xs:w-8 xs:h-8" fill="currentColor" /> : <Play className="text-white opacity-80 md:group-hover:opacity-100 ml-1 w-6 h-6 xs:w-8 xs:h-8" fill="currentColor" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Информация о треке и бейджи (Снизу плеера) */}
            <div className="w-full flex-shrink-0 z-10 flex flex-col items-center justify-center gap-4 mt-auto pb-2">
              
              {/* Название трека (Только для мобилки, на десктопе оно справа) */}
              <div className="md:hidden text-center w-full px-4 mb-2">
                <h3 className="text-white font-bold text-2xl truncate">{selectedTrack?.title}</h3>
                <p className="text-[#8a60c2] text-sm truncate mt-1">{selectedTrack?.artist}</p>
              </div>

              {/* БЕЙДЖИ */}
              <div className="flex items-center gap-3 text-[#8a60c2] text-xs font-bold tracking-widest uppercase">
                <span className="flex items-center gap-1.5 bg-[#8a60c2]/10 px-3 py-1.5 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-[#8a60c2] animate-pulse" /> LIVE
                </span>
                <span className="flex items-center gap-1.5 text-gray-400 bg-white/5 px-3 py-1.5 rounded-lg">
                  <Users size={14} /> {listenersCount}
                </span>
              </div>
            </div>

            {/* СТАНЦИЯ — десктоп */}
            <div className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 group/station z-[105]">
              <div 
                onClick={toggleStation}
                className="bg-gradient-to-r from-[#8a60c2] to-[#b388eb] backdrop-blur-md border-r border-t border-b border-white/5 rounded-r-xl flex flex-col items-center justify-start transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-none cursor-pointer w-5 h-[480px] md:h-[580px] group-hover/station:w-[32px] group-hover/station:h-[480px] md:group-hover/station:h-[580px] overflow-hidden"
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

            {/* СТАНЦИЯ — мобилка: Кнопка */}
            <div className="md:hidden absolute bottom-0 left-1/2 -translate-x-1/2 z-[65]">
              <button
                onClick={toggleStation}
                className="bg-[#15131a] border border-b-0 border-white/5 rounded-t-xl flex items-center justify-center shadow-[0_-4px_15px_rgba(0,0,0,0.4)] h-8 w-[120px] active:scale-95 transition-transform"
              >
                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-gray-300 whitespace-nowrap">
                  STATION
                </span>
              </button>
            </div>

            {/* VOLUME — десктоп */}
            <div className="hidden md:block absolute bottom-0 left-1/2 -translate-x-1/2 group z-[105]">
              <div className="bg-[#15131a] border-t border-l border-r border-white/5 rounded-t-xl flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_-5px_15px_rgba(0,0,0,0.2)] cursor-pointer h-5 w-20 group-hover:h-10 group-hover:w-[200px]">
                <div className="absolute flex items-center justify-center text-gray-500 group-hover:opacity-0 group-hover:translate-y-2 transition-all duration-400 pointer-events-none">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] mt-[1px]">Volume</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-3 px-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 delay-75 pointer-events-none group-hover:pointer-events-auto">
                  <button onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }} className="text-gray-400 hover:text-white transition flex-shrink-0">
                    {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <div className="relative flex-1 flex items-center group/slider h-5 cursor-pointer">
                    <input
                      type="range" min="0" max="1" step="0.01" value={isMuted ? 0 : volume}
                      onChange={(e) => {
                        const newVol = parseFloat(e.target.value);
                        setVolume(newVol);
                        setIsMuted(newVol === 0);
                      }}
                      className="absolute z-20 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="absolute z-10 w-full h-1 bg-white/10 rounded-full overflow-hidden transition-all ">
                      <div className="h-full bg-gradient-to-r from-[#8a60c2] to-[#b388eb] rounded-full" style={{ width: `${(isMuted ? 0 : volume) * 100}%` }} />
                    </div>
                    <div className="absolute z-10 w-2.5 h-2.5 bg-white rounded-full pointer-events-none opacity-0 group-hover/slider:opacity-100 transition-opacity" style={{ left: `calc(${(isMuted ? 0 : volume) * 100}% - 5px)` }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ПРАВАЯ КАРТОЧКА — десктоп */}
          <div className="hidden md:flex flex-1 bg-[#1c1924]/60 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-2xl border border-white/5 h-[650px] flex-col relative z-20 lg:mr-[200px]">
            
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 left-full flex-col gap-2 z-[-1] pointer-events-none">
              {displayTracks.map((track, i) => (
                <div 
                  key={`${track}-${i}`}
                  style={{
                    '--item-opacity': Math.max(0.1, 1 - i * 0.15), 
                    '--item-blur': `${i * 0.5}px` 
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

            {selectedTrack ? (
              <LyricsDisplay 
                lyrics={selectedTrack.lyrics} 
                currentTime={currentProgress} 
                trackName={selectedTrack.title} 
                artistName={selectedTrack.artist}
                isMobile={false}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Loading lyrics...
              </div>
            )}
          </div>

          {/* НИЖНИЙ БЛОК: ОЧЕРЕДЬ И ТЕКСТ (ТОЛЬКО ДЛЯ МОБИЛОК) */}
          {/* Расположен прямо под плеером в ленте */}
          <div className="md:hidden w-full flex flex-col gap-3 mt-2 px-1">
            
            {/* Вкладки: Текст / Очередь */}
            <div className="flex bg-[#1c1924]/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/5 shadow-xl">
              <button 
                onClick={() => setMobileTab('queue')} 
                className={`flex-1 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${mobileTab === 'queue' ? 'bg-[#8a60c2] text-white shadow-[0_0_15px_rgba(138,96,194,0.3)]' : 'text-gray-400 hover:text-white'}`}
              >
                Navbat
              </button>
              <button 
                onClick={() => setMobileTab('lyrics')} 
                className={`flex-1 py-3 rounded-xl text-[11px] font-bold tracking-widest uppercase transition-all duration-300 ${mobileTab === 'lyrics' ? 'bg-[#8a60c2] text-white shadow-[0_0_15px_rgba(138,96,194,0.3)]' : 'text-gray-400 hover:text-white'}`}
              >
                Matn
              </button>
            </div>

            {/* Контейнер с контентом (Ограничен по высоте, чтобы его можно было листать внутри) */}
            <div className="bg-[#1c1924]/60 backdrop-blur-xl rounded-[2rem] p-5 border border-white/5 shadow-2xl h-[450px] relative overflow-hidden">
              
              {mobileTab === 'lyrics' ? (
                // ТЕКСТ ПЕСНИ
                <div className="h-full w-full relative">
                  {selectedTrack ? (
                    <LyricsDisplay lyrics={selectedTrack.lyrics} currentTime={currentProgress} trackName={selectedTrack.title} artistName={selectedTrack.artist} isMobile={true} />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">Loading lyrics...</div>
                  )}
                </div>
              ) : (
                // ОЧЕРЕДЬ ТРЕКОВ
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

      {/* МОБИЛЬНАЯ НАВИГАЦИЯ СНИЗУ */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0d0c10]/95 backdrop-blur-xl border-t border-white/5 px-2 py-2 flex items-center justify-between">
        <a href="#" className="flex flex-col items-center gap-[2px] text-gray-500 hover:text-white transition w-[15%]">
          <Bookmark size={18} />
          <span className="text-[8px] font-medium tracking-wide">Saqlanganlar</span>
        </a>
        
        <a href="#" className="flex flex-col items-center gap-[2px] text-gray-500 hover:text-white transition w-[15%]">
          <Layers size={18} />
          <span className="text-[8px] font-medium tracking-wide">Katalog</span>
        </a>
        
        {/* Логотип по центру */}
        <a href="#" className="flex flex-col items-center justify-center relative w-[20%] -translate-y-1">
          <div className="w-10 h-10 relative">
            <Image
              src="/images/logo.png"
              alt="Logo"
              fill
              className="object-contain drop-shadow-[0_0_10px_rgba(138,96,194,0.3)]"
            />
          </div>
        </a>
        
        <a href="#" className="flex flex-col items-center gap-[2px] text-gray-500 hover:text-white transition w-[15%] relative">
          <div className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-[#0d0c10]" />
          </div>
          <span className="text-[8px] font-medium tracking-wide">Xabarlar</span>
        </a>
        
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="flex flex-col items-center gap-[2px] text-gray-500 hover:text-white transition w-[15%]"
        >
          <Menu size={18} />
          <span className="text-[8px] font-medium tracking-wide">Menyu</span>
        </button>
      </nav>

      <audio ref={audioRef} className="hidden" />
    </div>
  );
} 