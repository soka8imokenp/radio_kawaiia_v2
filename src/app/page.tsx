'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Users, Compass, Layers, Info, X } from 'lucide-react';

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

// Плейлист основной станции (J-POP)
const defaultPlaylist: Track[] = [
  {
    id: '1',
    title: 'Elf',
    titleRomaji: 'Elf',
    artist: 'Ado',
    coverArt: '/images/ado-elf.jpg',
    audioSrc: '/music/Ado-Elf.mp3',
    lyrics: {
      uzbek: `Elf - Ado (Ma'noviy Tarjima)\n\n[00:01.02] Yugur, butun kuching bilan qoch, g'am-g'ussa senga yetib ololmasin...\n[00:06.92] Ortga qarama, hayotingni yorituvchi nurli yo'l sari intil.\n[00:12.93] U yo'l shunday porlaydiki, dilingdagi qorong'ulikni aritadi.\n[00:19.09] Ishon, o'sha sehrli manzil qalbingni o'ziga chorlamoqda.\n\n[00:26.53] O'zligingni, go'zalliging va qadringni mahkam himoya qil,\n[00:32.60] Sening nozik dilingni toptab, ozor bermoqchi bo'lganlardan.\n[00:38.52] Agar juda charchagan bo'lsang, orom ol, sokin uxlab qol,\n[00:44.53] Xuddi osmondagi nomsiz, sirli yulduzlar kabi jimgina...\n\n[00:50.98] Qo'llarimiz ajralgan o'sha unutilmas lahzada,\n[00:53.87] Barmoqlarimning qaynoq taftini his qilasan,\n[00:56.95] Va ularning qalbingga sanchilgan og'riqli izlarini...\n[01:00.29] U izlar abadiy sening yuragingda yashaydi...\n\n[01:08.23] Unutgan narsalaringni ham butunlay xotirangdan o'chirib yubor,\n[01:14.58] Barcha o'tmish g'amlari va hislari bugun yo'q bo'lsin.\n[01:20.56] Lekin quloqlarimda hamon o'sha oxirgi ohang jaranglar,\n[01:26.85] Bizni yana bir bor uchrashishga undagan chorlov kabi:\n[01:32.33] "Alvido..."\n[01:35.25] Alvido, shirinim, alvido...\n[01:38.04] Men seni chindan sevardim, sen-chi?.. \n\n[01:44.50] Erkin raqsga tush, kim nima deb kulsa kulsin,\n[01:50.36] Xuddi qor ostida qolgan daraxt shoxlari kabi yengil.\n[01:56.47] Baqir, butun vujuding va chin qalbing bilan baqir,\n[02:02.51] Bu sovuq dunyoga o'z borligingni, ovozingni eshittir! \n\n[02:08.99] Uzoqdagi gulxanlar so'nib bormoqda, tun cho'kmoqda,\n[02:14.75] Hamma qaytish uchun sokin boshpana izlar.\n[02:18.21] Agar bu cheksiz, mashaqqatli yo'lga otlangan bo'lsang,\n[02:26.43] Yuraging to'xtovsiz, gursillab ursin,\n[02:32.31] Chunki to so'nggi nafasgacha u faqat seniki.\n[02:38.57] Ko'zyoshlaring to'kilishidan aslo cho'chima,\n[02:44.89] Har bir tomchi sening ichki dunyongni, ruhiy o'rmoningni o'stiradi.\n\n[03:02.49] Bu senga bo'lgan ming yillik sog'inchim edi,\n[03:08.89] Vaqt va cheksizlikning hisobini yo'qotib qo'ygach...\n[03:14.52] Bu shafqatsiz, yirtqich dunyoning chekkasida hamon kurashayotgan inson,\n[03:20.33] Ishon, sen o'sha g'aroyib va go'zal ajoyib elfsan!\n[03:23.98] Sening sevimli, sehrli sayohatlarining davomi hali oldinda...\n[03:27.25] Sayohat davom etadi...\n\n[03:33.54] Unutganingni ham butunlay unutgin bugun,\n[03:39.90] G'am va issiq taftlar butunlay yo'qolsin,\n[03:45.59] Lekin hanuz quloqlarda jaranglar o'sha oxirgi ohang,\n[03:52.22] Bizni yana bir bor uchrashishga undab iltijo qilgan:\n[03:57.78] "Alvido..."\n[04:00.65] Alvido, alvido, alvido...\n[04:03.52] Men seni doim sevardim, sen-chi?..\n[04:06.61] Alvido, alvido`,
      romaji: `Elf - Ado (Romaji)\n\n[00:01.02] Hashirinasai hayaku motto hayaku\n[00:06.92] Kanashimi ni oitsukarenai you ni\n[00:12.93] Sagashinasai akari no tomoru michi wo\n[00:19.09] Sore wa sore wa mabayui deshou\n\n[00:26.53] Idominasai kimi no utsukushisa ya\n[00:32.60] Toutosa wo kizutsukeru mono ni\n[00:38.52] Nemurinasai tsukaretara nemurinasai\n[00:44.53] Shinwa wo motanai ano seiza no you ni\n\n[00:50.98] Te wo hanashita ato\n[00:53.87] Kimi wa kizuku darou\n[00:56.95] Yubi no katachi taion\n[01:00.29] Sono nagori ga mune wo sasu\n\n[01:08.23] Wasureta koto mo wasurete shimae\n[01:14.58] Kanashimi mo nukumori kiete shimae\n[01:20.56] Saredo ima mo mimi ni nokoru wa\n[01:26.85] Kataku saikai wo negau you na\n[01:32.33] "Sayounara"\n[01:35.25] Adieu, alvido, alvido...\n[01:03.52] Love you, and you?\n[04:06.61] Adieu, alvido`
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
      description: `«Pathway» — Kevin Penkin tomonidan yaratilgan saundtrek asari. Kevin Penkin — mashhur bastakor bo'lib, u «Made in Abyss», «Tower of God», «The Rising of the Shield Hero» kabi anime seriallariga yozgan musiqalari bilan tanilgan. Uning musiqasi orkestr, xor va elektron ohanglar uyg'unligi bilan tinglovchini o'ziga rom etadi.`,
      details: [
        { title: 'Bastakor haqida:', text: 'Kevin Penkin — avstraliyalik bastakor, anime industriyasidagi eng yorqin vokal saundtrek bastakorlaridan biri.' },
        { title: 'Musiqiy uslub:', text: 'Orkestr, xor va elektron ohanglar uyg\'unligining noyob go\'zalligi.' },
        { title: 'Mashhur asarlari:', text: '«Made in Abyss», «Tower of God», «The Rising of the Shield Hero» saundtreklari.' }
      ]
    }
  }
];

// Очереди треков
const defaultUpcomingTracks = [
  "Ado - Rockstar",
  "9lana - プロポーズ",
  "DECO*27 - モニタリング",
  "KIRA - CRASH THE PARTY",
  "Vaundy - Odoriko"
];

const ostUpcomingTracks = [
  "Kevin Penkin - Tomorrow (Made in Abyss)",
  "Hiroyuki Sawano - YouSeeBIGGIRL/T:T (Attack on Titan)",
  "Yuki Kajiura - Swordland (Sword Art Online)"
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
const LyricsDisplay = ({ lyrics, currentTime, trackName, themeColor }: { lyrics: Track['lyrics']; currentTime: number; trackName: string; themeColor: string }) => {
  const [activeLang, setActiveLang] = useState<'romaji' | 'uzbek' | 'dual'>('dual');
  const languages = [
    { key: 'dual', label: 'DUAL' },
    { key: 'romaji', label: 'JP' },
    { key: 'uzbek', label: 'UZ' },
  ];

  const romajiTimestamps = lyrics ? getTimestampsFromLyrics(lyrics.romaji) : [];
  const uzbekTimestamps = lyrics ? getTimestampsFromLyrics(lyrics.uzbek) : [];

  const getDisplayLines = () => {
    if (!lyrics) return [];
    if (activeLang === 'dual') {
      return romajiTimestamps.map(r => {
        const matchingUz = uzbekTimestamps.find(u => Math.abs(u.time - r.time) < 0.5);
        return {
          time: r.time,
          primary: r.line,
          secondary: matchingUz ? matchingUz.line : ''
        };
      });
    } else if (activeLang === 'romaji') {
      return romajiTimestamps.map(r => ({
        time: r.time,
        primary: r.line,
        secondary: ''
      }));
    } else {
      return uzbekTimestamps.map(u => ({
        time: u.time,
        primary: u.line,
        secondary: ''
      }));
    }
  };

  const displayLines = getDisplayLines();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const getActiveLineIndex = () => {
    if (!lyrics) return -1;
    let activeIndex = -1;
    const items = activeLang === 'uzbek' ? uzbekTimestamps : romajiTimestamps;
    for (let i = 0; i < items.length; i++) {
      if (currentTime >= items[i].time) {
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
      <div className="relative w-full h-full rounded-[1.5rem] overflow-hidden flex flex-col justify-center items-center p-8 select-none border border-white/5 bg-black/40">
        <p className="text-white/40 text-sm font-bold tracking-widest uppercase">Musiqa matni mavjud emas</p>
        <span className="text-[9px] text-white/20 uppercase mt-2 tracking-widest font-mono">{trackName}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden w-full relative">
      <div className="flex items-center justify-between mb-4 flex-shrink-0 select-none">
        <div>
          <span className="text-[9px] font-bold tracking-[0.22em] uppercase" style={{ color: themeColor }}>Now projection</span>
          <h3 className="text-xs font-bold text-white mt-0.5 truncate max-w-[150px] uppercase font-mono tracking-wider">{trackName}</h3>
        </div>
        
        {/* Sliding Pill Selector */}
        <div className="relative flex bg-white/5 p-0.5 rounded-full border border-white/10 w-[120px] h-7 overflow-hidden select-none shrink-0">
          <div 
            className="absolute top-[1px] bottom-[1px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-md"
            style={{
              left: activeLang === 'dual' ? '1px' : activeLang === 'romaji' ? 'calc(33.33% + 1px)' : 'calc(66.66% + 1px)',
              width: 'calc(33.33% - 2px)',
              backgroundColor: themeColor
            }}
          />
          {languages.map((lang) => (
            <button
              key={lang.key}
              onClick={() => setActiveLang(lang.key as 'romaji' | 'uzbek' | 'dual')}
              className={`relative z-10 w-1/3 h-full flex items-center justify-center text-[8px] font-black tracking-wider uppercase transition-colors duration-300 cursor-pointer ${
                activeLang === lang.key ? 'text-white' : 'text-white/35 hover:text-white/70'
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto custom-scrollbar space-y-3 text-center pr-1 pb-6 w-full"
        style={{ 
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        {displayLines.map((item, idx) => {
          const isActive = idx === activeLineIndex;
          
          return (
            <div key={idx} className="flex justify-center w-full py-0.5">
              <div 
                className={`transition-all duration-500 text-center flex flex-col items-center max-w-[95%] px-3 py-1.5 rounded-xl ${
                  isActive 
                    ? 'scale-[1.03] blur-none opacity-100' 
                    : 'text-white/30 hover:text-white/60 blur-[0.25px] hover:blur-none opacity-40 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive ? `${themeColor}12` : 'transparent',
                  color: isActive ? '#ffffff' : '',
                  boxShadow: isActive ? `0 4px 15px ${themeColor}0a` : 'none',
                  border: isActive ? `1px solid ${themeColor}18` : '1px solid transparent'
                }}
              >
                {/* Romaji/JP Line */}
                <p className={`text-xs tracking-wide transition-colors ${isActive ? 'font-black text-white' : 'font-medium'}`}>
                  {item.primary}
                </p>
                
                {/* Uzbek translation */}
                {item.secondary && (
                  <p className={`text-[8.5px] font-sans italic mt-1 transition-colors ${
                    isActive ? 'opacity-90 font-medium text-white/80' : 'text-white/12'
                  }`} style={{ color: isActive ? themeColor : '' }}>
                    {item.secondary}
                  </p>
                )}
              </div>
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
  const [activeStation, setActiveStation] = useState<StationType>('default');
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [listenersCount] = useState(412);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // Refs для анимаций
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reactorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Глобальные координаты мыши
  const mousePosRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // ГЛАВНЫЙ ЦВЕТ KAWAII (Постоянно фиолетовый бренд)
  const themeColor = '#8a60c2';
  const themeGlow = 'rgba(138, 96, 194, 0.12)';

  // Сохраняем прошлую станцию
  const prevStationRef = useRef<StationType>('default');

  // Управление громкостью
  const volumeLineRef = useRef<HTMLDivElement | null>(null);

  // 1. АВТОМАТИЧЕСКАЯ АКУСТИЧЕСКАЯ АУРА DRAWING LOOP (60 FPS DIRECT CANVASES)
  useEffect(() => {
    let rotationAngle = 0;
    const bgCanvas = backgroundCanvasRef.current;
    const rCanvas = reactorCanvasRef.current;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      mousePosRef.current.targetX = e.clientX;
      mousePosRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);

    const drawLoop = () => {
      let bass = 0;
      let treble = 0;

      if (isPlaying && analyserRef.current && dataArrayRef.current) {
        const analyser = analyserRef.current;
        const data = dataArrayRef.current;
        analyser.getByteFrequencyData(data);

        // Bass (низкие)
        let bassSum = 0;
        for (let i = 0; i < 6; i++) bassSum += data[i];
        bass = (bassSum / 6) / 255;

        // Treble (высокие)
        let trebleSum = 0;
        for (let i = 40; i < 70; i++) trebleSum += data[i];
        treble = (trebleSum / 30) / 255;
      }

      // 1.1 Рисование фоновой ауры (Atmospheric Aura swashes)
      if (bgCanvas) {
        const ctx = bgCanvas.getContext('2d');
        if (ctx) {
          if (bgCanvas.width !== window.innerWidth || bgCanvas.height !== window.innerHeight) {
            bgCanvas.width = window.innerWidth;
            bgCanvas.height = window.innerHeight;
          }
          const w = bgCanvas.width;
          const h = bgCanvas.height;

          // Pure space background
          ctx.fillStyle = '#000000';
          ctx.fillRect(0, 0, w, h);

          // Giant breathing color swash (Постоянный брендовый фиолетовый)
          const swashColor = '56, 28, 106';
          const swashRadius = Math.min(w, h) * 0.45 + bass * 120;
          
          const gradient = ctx.createRadialGradient(w / 2, h / 2, 50, w / 2, h / 2, swashRadius);
          gradient.addColorStop(0, `rgba(${swashColor}, ${0.28 + bass * 0.15})`);
          gradient.addColorStop(0.5, `rgba(${swashColor}, 0.06)`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(w / 2, h / 2, swashRadius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 1.2 Рисование центрального Acoustic liquid-glass ядра
      if (rCanvas) {
        const ctx = rCanvas.getContext('2d');
        if (ctx) {
          const cx = rCanvas.width / 2;
          const cy = rCanvas.height / 2;
          ctx.clearRect(0, 0, rCanvas.width, rCanvas.height);

          // Медленное вращение обложки и орбит
          rotationAngle += isPlaying ? 0.006 + bass * 0.01 : 0.0015;

          // 1.2.1 Внешние dotted орбиты
          ctx.strokeStyle = 'rgba(138, 96, 194, 0.12)';
          ctx.lineWidth = 1;
          ctx.setLineDash([2, 8]);
          ctx.beginPath();
          ctx.arc(cx, cy, 125, 0, Math.PI * 2);
          ctx.stroke();
          ctx.setLineDash([]);

          // 1.2.2 Морфирующееся жидкостное ядро
          const baseRadius = 88 + bass * 22;
          const noise = 3 + treble * 14;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.beginPath();

          const totalPoints = 64;
          for (let i = 0; i <= totalPoints; i++) {
            const angle = (i / totalPoints) * Math.PI * 2;
            const waveOffset = Math.sin(angle * 7 + rotationAngle * 6) * noise;
            const r = baseRadius + waveOffset;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;

            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          // Градиент внутри ядра (Bang & Olufsen luxury glass)
          const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, baseRadius + 15);
          coreGlow.addColorStop(0, 'rgba(138, 96, 194, 0.05)');
          coreGlow.addColorStop(0.3, 'rgba(138, 96, 194, 0.15)');
          coreGlow.addColorStop(0.7, 'rgba(138, 96, 194, 0.35)');
          coreGlow.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.fillStyle = coreGlow;
          ctx.fill();

          // Тонкая белая внешняя stroke линия
          ctx.strokeStyle = 'rgba(255,255,255,0.7)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();

          // 1.2.3 Мягкие частицы (Stellar drift nodes)
          const nodesCount = 12;
          ctx.save();
          ctx.translate(cx, cy);
          for (let i = 0; i < nodesCount; i++) {
            const angleOffset = (i / nodesCount) * Math.PI * 2;
            const driftRadius = 95 + ((rotationAngle * 25 + i * 10) % 30);
            const currentAngle = rotationAngle + angleOffset;
            const px = Math.cos(currentAngle) * driftRadius;
            const py = Math.sin(currentAngle) * driftRadius;
            
            const size = 1.2 * (1 - (driftRadius - 95) / 30);
            const opac = 0.55 * (1 - (driftRadius - 95) / 30);
            ctx.fillStyle = `rgba(218, 161, 217, ${opac})`;
            ctx.beginPath();
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      }

      animationFrameId.current = requestAnimationFrame(drawLoop);
    };

    animationFrameId.current = requestAnimationFrame(drawLoop);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, activeStation]);

  // 2. ИНИЦИАЛИЗАЦИЯ WEB AUDIO
  const activateAudioContext = () => {
    if (!audioContextRef.current && audioRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;

      if (!sourceRef.current) {
        try {
          const source = ctx.createMediaElementSource(audioRef.current);
          source.connect(analyser);
          analyser.connect(ctx.destination);
          sourceRef.current = source;
        } catch (e) {
          console.warn('Audio link completed previously', e);
        }
      }

      audioContextRef.current = ctx;
      analyserRef.current = analyser;
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    }
  };

  // Переключение трека
  const currentPlaylist = activeStation === 'default' ? defaultPlaylist : ostPlaylist;
  const currentQueue = activeStation === 'default' ? defaultUpcomingTracks : ostUpcomingTracks;

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
          playPromise.catch(() => setIsPlaying(false));
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
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentProgress(0);
    };
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    activateAudioContext();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => setIsPlaying(false));
        }
        setIsPlaying(true);
      }
    }
  };

  // Регулятор громкости
  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeLineRef.current) return;
    const rect = volumeLineRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, clickX / rect.width));
    const finalVol = parseFloat(percent.toFixed(2));
    setVolume(finalVol);
    setIsMuted(finalVol === 0);
  };

  // Плавная прокрутка скроллом громкости
  const handleVolumeWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const diff = e.deltaY < 0 ? 0.05 : -0.05;
    const newVol = Math.max(0, Math.min(1, volume + diff));
    const finalVol = parseFloat(newVol.toFixed(2));
    setVolume(finalVol);
    setIsMuted(finalVol === 0);
  };

  // Эффект наклона карточки с текстом
  const handleLyricsMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    const tiltX = normX * 6;
    const tiltY = -normY * 6;
    card.style.transform = `perspective(1200px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale(1.003)`;
    card.style.boxShadow = `${-tiltX * 2}px ${-tiltY * 2}px 30px rgba(138, 96, 194, 0.09), 0 30px 60px rgba(0, 0, 0, 0.75)`;
  };

  const handleLyricsMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
    card.style.boxShadow = `0 30px 70px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)`;
  };

  // Синхронизация темы
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  // Получение активных субтитров
  const activeTimestamps = selectedTrack?.lyrics ? getTimestampsFromLyrics(selectedTrack.lyrics.romaji) : [];
  const activeUzTimestamps = selectedTrack?.lyrics ? getTimestampsFromLyrics(selectedTrack.lyrics.uzbek) : [];

  const getActiveLyricIndex = () => {
    let index = -1;
    for (let i = 0; i < activeTimestamps.length; i++) {
      if (currentProgress >= activeTimestamps[i].time) {
        index = i;
      } else {
        break;
      }
    }
    return index;
  };

  const activeLyricIdx = getActiveLyricIndex();
  const currentJpLine = activeLyricIdx >= 0 ? activeTimestamps[activeLyricIdx].line : '';
  const currentUzLine = (activeLyricIdx >= 0 && activeUzTimestamps[activeLyricIdx]) ? activeUzTimestamps[activeLyricIdx].line : '';

  const currentTrackInfo = selectedTrack?.info;

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-black text-white select-none">
      
      {/* 1. АТМОСФЕРНАЯ ФОНОВАЯ АУРА */}
      <canvas 
        ref={backgroundCanvasRef} 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none" 
      />

      {/* 2. НАСТОЯЩИЙ НАВИГАЦИОННЫЙ ХЕДЕР ИЗ ВАШЕГО ПОРТАЛА (ORIGINAL TopBar) */}
      <header className="sticky top-0 h-16 w-full border-b border-white/5 bg-black/75 backdrop-blur-xl z-50 select-none">
        <div className="flex items-center justify-between w-full max-w-[1150px] mx-auto h-full px-6">
          <button className="flex cursor-pointer transition-transform duration-200 active:scale-95">
            <span className="font-bold text-4xl text-white">
              Kawa<span style={{ color: themeColor }}>ii</span>
            </span>
          </button>
          
          <div className="hidden lg:flex items-center justify-center text-white h-full gap-7">
            <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95 text-white/60 hover:text-white">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="m21.78 20.72-4.34-4.34a8.702 8.702 0 0 0 2.06-5.63C19.5 5.925 15.575 2 10.75 2S2 5.925 2 10.75s3.925 8.75 8.75 8.75a8.702 8.702 0 0 0 5.63-2.06l4.34 4.34 1.06-1.06ZM3.5 10.75c0-4 3.25-7.25 7.25-7.25S18 6.75 18 10.75 14.75 18 10.75 18 3.5 14.75 3.5 10.75Z" />
              </svg>
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95 text-white/60 hover:text-white">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.75 3.5c-.69 0-1.25.56-1.25 1.25V16.8c.375-.192.8-.3 1.25-.3H18.5v-13H6.75ZM18.5 18H6.75a1.25 1.25 0 1 0 0 2.5H18.5V18ZM4 19.25V4.75A2.75 2.75 0 0 1 6.75 2H20v20H6.75A2.75 2.75 0 0 1 4 19.25Z" />
              </svg>
              <span className="font-medium text-base ml-1.5">Katalog</span>
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-2 gap-1 rounded-sm transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95 text-white/60 hover:text-white">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.77 21.7c.155.065.32.095.48.095l.005-.005c.32 0 .64-.125.88-.365L11.56 18h7.69A2.755 2.755 0 0 0 22 15.25v-9.5A2.755 2.755 0 0 0 19.25 3H4.75A2.755 2.755 0 0 0 2 5.75v9.5A2.755 2.755 0 0 0 4.75 18H6v2.545c0 .51.3.96.77 1.155ZM3.5 5.75c0-.69.56-1.25 1.25-1.25h14.5c.69 0 1.25.56 1.25 1.25v9.5c0 .69-.56 1.25-1.25 1.25h-8.31L7.5 19.94V16.5H4.75c-.69 0-1.25-.56-1.25-1.25v-9.5ZM17.5 8h-11v1.5h11V8Zm-4 3.5h-7V13h7v-1.5Z" />
              </svg>
              <span className="font-medium text-base ml-1.5">Forumlar</span>
            </button>
            <button className="flex items-center justify-center h-8 py-1 px-4 gap-1.5 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer border" style={{ color: themeColor, borderColor: `${themeColor}40`, backgroundColor: `${themeColor}12` }}>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="m20.15 21.09-2.73-.35a2.752 2.752 0 0 1-2.375-3.08l.385-2.975a2.737 2.737 0 0 1 1.045-1.825 2.72 2.72 0 0 1 2.03-.55l1.24.16.02-.145c.285-2.23-.4-4.48-1.885-6.165a7.816 7.816 0 0 0-5.875-2.655c-2.25 0-4.39.97-5.875 2.655a7.815 7.815 0 0 0-1.885 6.165l.02.145 1.24-.16c.73-.095 1.45.1 2.03.55.58.45.955 1.1 1.045 1.825l.38 2.975a2.755 2.755 0 0 1-2.375 3.08l-2.73.35-1.1-8.575a9.34 9.34 0 0 1 2.25-7.35A9.34 9.34 0 0 1 12.01 2c2.68 0 5.23 1.155 7.005 3.165a9.334 9.334 0 0 1 2.25 7.35l-1.1 8.575h-.015Zm-1.995-7.305c-.275 0-.54.09-.76.26-.265.205-.435.5-.475.83l-.385 2.975a1.253 1.253 0 0 0 1.08 1.4l1.24.16.7-5.455-1.24-.16a1.83 1.83 0 0 0-.16-.01Zm-13.705.17.7 5.455 1.24-.16a1.25 1.25 0 0 0 1.08-1.4l-.385-2.975a1.252 1.252 0 0 0-1.4-1.08l-1.24.16h.005Z" />
              </svg>
              <span>Radio</span>
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* Тема */}
            <button className="flex items-center justify-center h-8 w-8 rounded-full transition-all duration-200 cursor-pointer hover:bg-white/10 active:scale-95 text-white" onClick={toggleTheme} title="Smena temi">
              <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 22C6.485 22 2 17.515 2 12c0-5.02 3.755-9.28 8.735-9.91l1.11-.14-.29 1.08c-.2.75-.305 1.495-.305 2.225 0 4.685 3.815 8.5 8.5 8.5a8.78 8.78 0 0 0 1.075-.075l1.11-.14-.29 1.08A10.01 10.01 0 0 1 12 22.005V22ZM9.865 3.78C6.17 4.735 3.5 8.1 3.5 12c0 4.685 3.815 8.5 8.5 8.5 3.46 0 6.55-2.11 7.845-5.25h-.095c-5.515 0-10-4.485-10-10 0-.485.04-.975.115-1.47Z" />
              </svg>
            </button>
            <button className="flex shrink-0 h-9 w-9 rounded-sm border border-white/10 bg-white/5 transform-gpu cursor-pointer transition-transform duration-200 active:scale-95 overflow-hidden">
              <img className="object-cover w-full h-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlk0JfikQBJpYrg_nlYLZUcjDOcEaanRtykudQ9_X1slNjDwOINg9RYk&s=10" alt="Profile" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. ГЛАВНАЯ СЦЕНА СИНТЕЗАТОРА (LOCKED HEIGHT AT 580PX TO PREVENT LYRICS STRETCHING) */}
      <main className="flex-1 flex items-center justify-center py-6 md:py-8 z-10 px-4 md:px-6">
        <div className="w-full max-w-[1150px] grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch justify-center">
          
          {/* ================= ЛЕВАЯ КАРТОЧКА: ИНФО-КАРТРИДЖ МУЗЫКИ И РЕГУЛЯТОР (4 COLS - FIXED HEIGHT 580PX) ================= */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:h-[580px] justify-between">
            
            {/* 3.1. Сектор 1: Станции и Подробное Описание (Info Cartridge) */}
            <div className="hologram-panel rounded-[2rem] p-5 border border-white/5 flex flex-col gap-4 flex-1 overflow-hidden select-none">
              <div className="hologram-scanline" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="telemetry-text tracking-[0.2em] font-mono">inserted cartridge</span>
                <span className="text-[8px] font-mono text-white/20">INFO ENGINE v85</span>
              </div>

              {/* Station select pills inside left container */}
              <div className="flex bg-white/5 p-0.5 rounded-full border border-white/10 w-full h-8 overflow-hidden select-none mb-1">
                <button
                  onClick={() => setActiveStation('default')}
                  className={`flex-1 h-full flex items-center justify-center text-[10px] font-black tracking-widest uppercase transition-colors duration-300 cursor-pointer rounded-full ${
                    activeStation === 'default' ? 'text-white' : 'text-white/35 hover:text-white/60'
                  }`}
                  style={{ backgroundColor: activeStation === 'default' ? themeColor : 'transparent' }}
                >
                  J-POP STATION
                </button>
                <button
                  onClick={() => setActiveStation('ost')}
                  className={`flex-1 h-full flex items-center justify-center text-[10px] font-black tracking-widest uppercase transition-colors duration-300 cursor-pointer rounded-full ${
                    activeStation === 'ost' ? 'text-white' : 'text-white/35 hover:text-white/60'
                  }`}
                  style={{ backgroundColor: activeStation === 'ost' ? themeColor : 'transparent' }}
                >
                  OST STATION
                </button>
              </div>

              {/* Восстановленное описание трека с деталями и скроллом */}
              <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 select-text">
                {currentTrackInfo ? (
                  <div className="space-y-4">
                    <p className="text-xs text-white/80 leading-relaxed font-sans">
                      <strong className="text-white text-sm block mb-1">«{selectedTrack?.title}»</strong>
                      {currentTrackInfo.description}
                    </p>
                    <div className="space-y-2 mt-3 select-none">
                      {currentTrackInfo.details.map((detail, idx) => (
                        <div key={idx} className="bg-white/[0.02] border border-white/5 p-3 rounded-xl">
                          <span className="block text-[8px] font-black tracking-widest uppercase mb-1" style={{ color: themeColor }}>
                            {detail.title}
                          </span>
                          <p className="text-[10px] text-white/60 font-sans leading-normal">{detail.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-white/30 font-mono tracking-wider uppercase text-center mt-8">Ma'lumotlar mavjud emas</p>
                )}
              </div>
            </div>

            {/* 3.2. Сектор 2: Удобный тактильный Volume Slider Card */}
            <div className="hologram-panel rounded-[2rem] p-5 border border-white/5 flex flex-col gap-4 select-none">
              <div className="hologram-scanline" />
              
              <div className="flex items-center justify-between">
                <span className="telemetry-text tracking-[0.2em] font-mono">master output level</span>
                <span className="text-[8px] font-mono text-white/30">100% STEREO LINK</span>
              </div>

              {/* Увеличенный плоский Volume Slider с поддержкой mute и колесика мыши */}
              <div 
                onWheel={handleVolumeWheel}
                className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex items-center justify-between gap-4 h-16 w-full cursor-pointer"
              >
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="text-white/50 hover:text-white transition cursor-pointer flex-shrink-0"
                >
                  {isMuted || volume === 0 ? <VolumeX size={18} style={{ color: themeColor }} /> : <Volume2 size={18} />}
                </button>
                
                {/* Интерактивный трек полосы громкости */}
                <div 
                  ref={volumeLineRef}
                  onClick={handleVolumeClick}
                  className="relative flex-1 h-6 flex items-center cursor-pointer group"
                >
                  {/* Задняя серая линия */}
                  <div className="absolute w-full h-[3px] bg-white/10 rounded-full" />
                  
                  {/* Активная светящаяся фиолетовая полоса */}
                  <div 
                    className="absolute h-[3px] rounded-full transition-all" 
                    style={{ width: `${(isMuted ? 0 : volume) * 100}%`, backgroundColor: themeColor, boxShadow: `0 0 10px ${themeColor}aa` }} 
                  />
                  
                  {/* Увеличенная круглая точка-бегунок (Удобный слайдер) */}
                  <div 
                    className="absolute w-3.5 h-3.5 rounded-full border border-white/30 bg-white shadow-md transform scale-100 group-hover:scale-120 transition-transform pointer-events-none"
                    style={{ 
                      left: `calc(${(isMuted ? 0 : volume) * 100}% - 7px)`,
                      boxShadow: `0 0 8px ${themeColor}` 
                    }}
                  />
                </div>

                {/* Числовой индикатор объема */}
                <span className="font-mono text-xs font-black min-w-[32px] text-right" style={{ color: themeColor }}>
                  {isMuted ? '0' : Math.round(volume * 100)}%
                </span>
              </div>
            </div>

          </div>

          {/* ================= ЦЕНТРАЛЬНАЯ КАРТОЧКА: THE ACOUSTIC ORB CORE (5 COLS - HEIGHT 580PX) ================= */}
          <div className="lg:col-span-5 flex flex-col lg:h-[580px]">
            
            <div className="hologram-panel rounded-[2rem] p-6 md:p-7 border border-white/5 flex flex-col justify-between items-center text-center h-full relative overflow-hidden group">
              <div className="hologram-scanline" />
              
              {/* Telemetry metadata overlay (floating Japanese strings) */}
              <div className="w-full flex justify-between items-start select-none relative z-10 border-b border-white/5 pb-3">
                <div className="text-left">
                  <span className="telemetry-text tracking-[0.2em] font-mono">acoustic core</span>
                  <div className="text-[8px] text-white/20 font-mono mt-0.5">RESONANCE RATE: {isPlaying ? '98.5%' : '0.0%'}</div>
                </div>
                <div className="text-right">
                  <span className="telemetry-text tracking-[0.2em] font-mono">ORBIT LINK</span>
                  <div className="text-[8px] text-white/20 font-mono mt-0.5">SYS_TEMP: 32.4°C</div>
                </div>
              </div>

              {/* 3D PLATER CONSOLE WITH ROTATING ALBUM COVER ART INSIDE ORB CORE */}
              <div className="relative flex items-center justify-center my-auto w-full max-w-[290px] aspect-square select-none">
                
                {/* Glowing beat-pulsate spectrum ring */}
                <div 
                  className="absolute inset-[-12px] rounded-full border transition-all duration-300 pointer-events-none" 
                  style={{ 
                    borderColor: `${themeColor}1c`, 
                    animation: isPlaying ? 'ping 4s cubic-bezier(0, 0, 0.2, 1) infinite' : 'none',
                    boxShadow: isPlaying ? `0 0 35px ${themeColor}12` : 'none'
                  }} 
                />

                {/* Laser-cut Platter base frame */}
                <div className="absolute inset-0 rounded-full border border-white/5 bg-black/60 shadow-[inset_0_0_30px_rgba(255,255,255,0.03)]" />
                
                {/* 2.4 HOLOGRAPHIC REACTIVE LIQUID ORB CANVAS */}
                <canvas 
                  ref={reactorCanvasRef} 
                  width={280} 
                  height={280} 
                  className="absolute w-[240px] h-[240px] md:w-[280px] md:h-[280px] z-10 pointer-events-none" 
                />

                {/* КРУГЛАЯ ОБЛОЖКА ТРЕКА ВНУТРИ АКУСТИЧЕСКОГО ШАРА (ВРАЩАЕТСЯ ПРИ PLAY) */}
                <div 
                  onClick={togglePlayPause}
                  className="absolute inset-0 m-auto w-[150px] h-[150px] rounded-full overflow-hidden z-15 border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.85)] cursor-pointer group/cover"
                >
                  <img 
                    src={selectedTrack?.coverArt || '/images/ado-elf.jpg'} 
                    alt="Track Cover" 
                    className={`w-full h-full object-cover transition-transform duration-[15000ms] linear infinite ${isPlaying ? 'animate-spin-slow' : ''}`}
                    style={{ 
                      animationPlayState: isPlaying ? 'running' : 'paused',
                      transform: !isPlaying ? 'rotate(0deg)' : ''
                    }}
                    draggable={false} 
                  />
                  
                  {/* Полупрозрачное глянцевое наложение B&O */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-10 mix-blend-overlay" />
                  
                  {/* Игровой оверлей Play/Pause при наведении на обложку */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/cover:opacity-100 transition-opacity flex items-center justify-center z-20">
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white fill-current animate-pulse" strokeWidth={0} />
                    ) : (
                      <Play className="w-8 h-8 text-white fill-current ml-1" strokeWidth={0} />
                    )}
                  </div>
                </div>

              </div>

              {/* Title & Track Details metadata (huge thin typography) */}
              <div className="w-full flex-shrink-0 z-10 flex flex-col gap-4 mt-auto">
                <div className="text-center w-full px-4">
                  <span className="telemetry-text tracking-[0.35em] text-white/40 uppercase text-[8px] font-mono">{selectedTrack?.artist}</span>
                  <h3 className="font-black text-2xl md:text-3xl tracking-tighter uppercase font-mono truncate text-white mt-1" style={{ textShadow: `0 0 15px ${themeColor}22` }}>
                    {selectedTrack?.title}
                  </h3>
                </div>

                {/* Sub control parameters */}
                <div className="flex items-center justify-between px-3 text-[9px] font-mono tracking-widest text-white/40 border-t border-white/5 pt-3">
                  <span className="flex items-center gap-1.5" style={{ color: themeColor }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: themeColor }} /> DECK ACTIVE
                  </span>
                  <span>{listenersCount} ON AIR</span>
                </div>
              </div>

            </div>

          </div>

          {/* ================= ПРАВАЯ СТОРОНА: HOLOGRAM LYRICS PROJECTION (3 COLS - HEIGHT 580PX) ================= */}
          <div className="lg:col-span-3 flex flex-col lg:h-[580px]">
            
            <div 
              onMouseMove={handleLyricsMouseMove}
              onMouseLeave={handleLyricsMouseLeave}
              className="hologram-panel rounded-[2rem] p-6 border border-white/5 h-full flex flex-col justify-between tilt-element overflow-hidden"
            >
              <div className="hologram-scanline" />
              
              {selectedTrack ? (
                <LyricsDisplay 
                  lyrics={selectedTrack.lyrics} 
                  currentTime={currentProgress} 
                  trackName={selectedTrack.title} 
                  themeColor={themeColor}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-white/30 text-xs font-mono uppercase tracking-widest animate-pulse">
                  Init projector link...
                </div>
              )}

              {/* Upcoming preview tab footer inside lyrics panel */}
              <div className="border-t border-white/5 pt-4 flex flex-col gap-2 mt-4 select-none flex-shrink-0">
                <span className="telemetry-text tracking-[0.2em] font-mono">subsystem link</span>
                <div className="flex items-center justify-between text-[8px] text-white/30 font-mono">
                  <span>LYRIC TIMINGS</span>
                  <span style={{ color: themeColor }}>SYNCED</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 4. ТИПОГРАФИЧЕСКАЯ ПРОЕКЦИЯ ТЕКСТА (РАЗМЕЩЕНА ВНИЗУ, НИЧЕГО НЕ РАСТЯГИВАЕТ!) */}
      <section className="w-full max-w-[1150px] mx-auto px-6 mb-24 select-none relative z-10 flex justify-center text-center">
        <div className="hologram-panel rounded-2xl px-6 py-4 border border-white/5 min-w-[280px] max-w-[800px] flex flex-col justify-center items-center">
          <div className="hologram-scanline" />
          {currentJpLine ? (
            <div className="animate-fade-in flex flex-col items-center gap-1">
              <p className="text-xs md:text-sm font-black tracking-wide text-white transition-opacity duration-300">
                {currentJpLine}
              </p>
              {currentUzLine && (
                <p className="text-[9px] md:text-[10px] font-serif italic text-white/50 tracking-wide transition-opacity duration-300" style={{ color: themeColor }}>
                  {currentUzLine}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[9px] font-mono tracking-[0.25em] text-white/20 uppercase">
              {selectedTrack?.lyrics ? 'Projector linking...' : 'No synchronized subtitles'}
            </p>
          )}
        </div>
      </section>

      {/* 5. НАСТОЯЩИЙ МОБИЛЬНЫЙ ФУТЕР ИЗ ВАШЕГО ПОРТАЛА (ORIGINAL BottomBar) */}
      <nav className="fixed bottom-0 left-0 right-0 h-16 px-5 w-full flex items-center justify-center bg-black/85 backdrop-blur-md border-t border-white/5 select-none z-50 lg:hidden">
        <div className="flex items-center justify-between w-full max-w-[280px]">
          <button className="flex flex-col items-center justify-center gap-1 p-1 text-white/50 rounded-sm transform-gpu transition-all duration-200 cursor-pointer hover:text-white active:scale-95">
            <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.25 2H6.75A2.755 2.755 0 0 0 4 4.75v16c0 .26.135.5.35.635.22.135.495.15.725.04L12 18.085l6.925 3.34a.753.753 0 0 0 .725-.04.74.74 0 0 0 .35-.635v-16A2.755 2.755 0 0 0 17.25 2Zm1.25 17.555-6.5-3.14-6.5 3.14V4.75c0-.69.56-1.25 1.25-1.25h10.5c.69 0 1.25.56 1.25 1.25v14.805Z" />
            </svg>
            <span className="text-[8px] font-mono tracking-widest uppercase">Saqlangan</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-1 p-1 text-white/50 rounded-sm transform-gpu transition-all duration-200 cursor-pointer hover:text-white active:scale-95">
            <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6.75 3.5c-.69 0-1.25.56-1.25 1.25V16.8c.375-.192.8-.3 1.25-.3H18.5v-13H6.75ZM18.5 18H6.75a1.25 1.25 0 1 0 0 2.5H18.5V18ZM4 19.25V4.75A2.75 2.75 0 0 1 6.75 2H20v20H6.75A2.75 2.75 0 0 1 4 19.25Z" />
            </svg>
            <span className="text-[8px] font-mono tracking-widest uppercase">Katalog</span>
          </button>

          {/* Central portal logo button */}
          <button className="flex flex-col items-center justify-center gap-1 p-1 rounded-sm transform-gpu transition-all duration-200 cursor-pointer active:scale-95" style={{ color: themeColor }}>
            <svg className="w-9 h-9" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 93.933 111.97">
              <g><path d="m 77.651831,81.019945 a 27.501443,10.766962 65.856372 0 0 -1.370976,0.37931 27.501443,10.766962 65.856372 0 0 1.545126,29.617835 27.501443,10.766962 65.856372 0 0 12.423529,17.81389 38.010708,34.932919 0 0 0 -6.42545,4.73253 38.010708,34.932919 0 0 0 -9.302787,13.92525 38.010708,34.932919 0 0 0 -1.458309,5.71283 38.010708,34.932919 0 0 0 -0.406694,5.0953 38.010708,34.932919 0 0 0 0.163815,3.23856 22.006201,23.633765 0 0 1 0.155029,1.27589 22.006201,23.633765 0 0 1 0.115755,2.41949 22.006201,23.633765 0 0 1 -0.209806,3.25458 22.006201,23.633765 0 0 1 -8.962761,15.94425 22.608014,23.237316 0 0 0 17.436658,8.44651 22.608014,23.237316 0 0 0 11.88817,-3.47214 20.472755,20.609692 0 0 1 -0.80874,-0.59427 20.472755,20.609692 0 0 1 -7.70857,-12.8788 20.472755,19.753529 0 0 0 4.64984,1.87688 20.472755,19.753529 0 0 1 -3.48816,-11.02878 20.472755,19.753529 0 0 1 0.0594,-1.50585 20.472755,19.753529 0 0 1 0.0765,-0.76585 20.472755,19.753529 0 0 1 0.004,-0.032 24.789677,18.948704 0 0 0 0.0124,-0.008 24.789677,18.948704 0 0 0 4.11086,-3.15639 24.789677,18.948704 0 0 0 4.37648,-6.60839 24.789677,18.948704 0 0 0 0.032,-0.0889 9.0917225,9.9998608 0 0 1 0.0207,0.67231 9.0917225,9.9998608 0 0 1 -1.78181,5.94589 24.093296,25.166134 0 0 0 3.14813,-0.49609 20.472755,19.753529 0 0 1 2.47892,-4.90358 20.472755,19.753529 0 0 0 -2.47892,4.90358 24.093296,25.166134 0 0 0 14.91227,-10.66343 24.093296,25.166134 0 0 0 15.02544,10.76006 24.093296,25.166134 0 0 0 3.08818,0.48266 9.0917225,9.9998608 0 0 1 -1.7818,-5.94589 9.0917225,9.9998608 0 0 1 0.0207,-0.67231 24.789677,18.948704 0 0 0 0.032,0.0889 24.789677,18.948704 0 0 0 4.37647,6.60838 24.789677,18.948704 0 0 0 4.11086,3.1564 24.789677,18.948704 0 0 0 0.0124,0.008 20.472755,19.753529 0 0 1 0.004,0.032 20.472755,19.753529 0 0 1 0.0765,0.76585 20.472755,19.753529 0 0 1 0.0594,1.50585 20.472755,19.753529 0 0 1 -3.48816,11.02878 20.472755,19.753529 0 0 0 4.64985,-1.87689 20.472755,20.609692 0 0 1 -7.1019,12.39098 38.010708,34.932919 0 0 0 7.76749,-5.55987 38.010708,34.932919 0 0 1 -7.76749,5.55987 38.010708,34.932919 0 0 1 -5.1e-4,5.2e-4 20.472755,20.609692 0 0 1 -1.41542,1.0821 22.608014,23.237316 0 0 0 11.88816,3.47214 22.608014,23.237316 0 0 0 17.43666,-8.44651 22.006201,23.633765 0 0 1 -8.96276,-15.94425 22.006201,23.633765 0 0 1 -0.2098,-3.25458 22.006201,23.633765 0 0 1 0.11575,-2.41949 22.006201,23.633765 0 0 1 0.15503,-1.27589 38.010708,34.932919 0 0 0 0.16382,-3.23856 38.010708,34.932919 0 0 0 -0.4067,-5.0953 38.010708,34.932919 0 0 0 -1.45831,-5.71283 38.010708,34.932919 0 0 0 -9.30279,-13.92525 38.010708,34.932919 0 0 0 -6.42545,-4.73253 10.766962,27.501443 24.143628 0 0 12.42354,-17.8139 10.766962,27.501443 24.143628 0 0 1.54512,-29.617835 10.766962,27.501443 24.143628 0 0 -1.37097,-0.3793 10.766962,27.501443 24.143628 0 0 -19.69441,20.901055 10.766962,27.501443 24.143628 0 0 -5.11493,22.26582 38.010708,34.932919 0 0 0 -1.41335,-0.21394 38.010708,34.932919 0 0 0 -0.006,-0.002 38.010708,34.932919 0 0 0 -2.09445,-0.31678 38.010708,34.932919 0 0 0 -1.58802,-0.13642 l -5.1e-4,5.1e-4 a 38.010708,34.932919 0 0 0 -2.66496,-0.22944 38.010708,34.932919 0 0 0 -0.87385,-0.009 38.010708,34.932919 0 0 0 -8.20569,0.82372 27.501443,10.766962 65.856372 0 0 -5.11494,-22.26634 27.501443,10.766962 65.856372 0 0 -19.694402,-20.901055 z m 34.479029,66.806265 a 20.472755,19.753529 0 0 1 7.50342,3.91346 20.472755,19.753529 0 0 1 2.0438,1.93321 20.472755,19.753529 0 0 0 -2.0438,-1.93321 20.472755,19.753529 0 0 0 -7.50342,-3.91346 z m -5.14852,1.03353 a 20.472755,19.753529 0 0 0 -4.78214,2.91093 20.472755,19.753529 0 0 0 -2.03346,1.9048 20.472755,19.753529 0 0 1 2.03346,-1.9048 20.472755,19.753529 0 0 1 4.78214,-2.91093 z m -8.39897,14.8823 a 5.443131,6.9271097 0 0 0 -3.59565,1.7265 5.443131,6.9271097 0 0 0 -1.84743,5.20072 5.443131,6.9271097 0 0 0 3.79357,6.60167 5.443131,6.9271097 0 0 0 1.64951,0.32556 5.443131,6.9271097 0 0 0 5.4436,-6.92723 5.443131,6.9271097 0 0 0 -5.4436,-6.92722 z m 24.60315,0.0837 a 5.443131,6.9271097 0 0 0 -5.4436,6.92723 5.443131,6.9271097 0 0 0 5.4436,6.92722 5.443131,6.9271097 0 0 0 1.6061,-0.30851 5.443131,6.9271097 0 0 0 3.83697,-6.61871 5.443131,6.9271097 0 0 0 -1.83503,-5.18677 5.443131,6.9271097 0 0 0 -3.60804,-1.74046 z" transform="translate(-63.918301,-80.989785)" /></g>
            </svg>
            <span className="text-[8px] font-mono tracking-widest uppercase">Radio</span>
          </button>
          
          <button className="flex flex-col items-center justify-center gap-1 p-1 text-white/50 rounded-sm transform-gpu transition-all duration-200 cursor-pointer hover:text-white active:scale-95">
            <svg className="w-5.5 h-5.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 5.5H3V7h18V5.5Zm0 5.75H3v1.5h18v-1.5ZM3 17h18v1.5H3V17Z" />
            </svg>
            <span className="text-[8px] font-mono tracking-widest uppercase">Menyu</span>
          </button>
        </div>
      </nav>

      {/* Скрытый HTML5 Audio */}
      <audio ref={audioRef} className="hidden" />

    </div>
  );
}