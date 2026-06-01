'use client';

export const dynamic = 'force-dynamic';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Users, Compass, Layers } from 'lucide-react';

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
      romaji: `Elf - Ado (Romaji)\n\n[00:01.02] Hashirinasai hayaku motto hayaku\n[00:06.92] Kanashimi ni oitsukarenai you ni\n[00:12.93] Sagashinasai akari no tomoru michi wo\n[00:19.09] Sore wa sore wa mabayui deshou\n\n[00:26.53] Idominasai kimi no utsukushisa ya\n[00:32.60] Toutosa wo kizutsukeru mono ni\n[00:38.52] Nemurinasai tsukaretara nemurinasai\n[00:44.53] Shinwa wo motanai ano seiza no you ni\n\n[00:50.98] Te wo hanashita ato\n[00:53.87] Kimi wa kizuku darou\n[00:56.95] Yubi no katachi taion\n[01:00.29] Sono nagori ga mune wo sasu\n\n[01:08.23] Wasureta koto mo wasurete shimae\n[01:14.58] Kanashimi mo nukumori kiete shimae\n[01:20.56] Saredo ima mo mimi ni nokoru wa\n[01:26.85] Kataku saikai wo negau you na\n[01:32.33] "Sayounara"\n[01:35.25] Adieu, adieu\n[01:38.04] Love you, and you?\n\n[01:44.50] Odorinasai dare ni warawarete mo\n[01:50.36] Ausuyuki wo harau eda no you ni\n[01:56.47] Sakebinasai kokoro kara sakebinasai\n[02:02.51] Koko ni tashika ni ita n da to hibikasete\n\n[02:08.99] Yukiai no sora ni tohankanabi ga nijimu\n[02:14.75] Kaerubeki ie wo sagasu\n[02:18.21] Nagai nagai tabiji wo yuku nara\n[02:26.43] Takara ka narase sono shinzou wa\n[02:32.31] Saigo no ichi uch made kimi no mono da\n[02:38.57] Namida namida afureru ga ii\n[02:44.89] Furu shizuku ga kimi no mori wo sodateru darou\n\n[03:02.49] Sore wa sennen no homushikku deshita\n[03:08.89] Mugen sae mo kazoeoete\n[03:14.52] Kaibutsu no you na sekai no sumikko de\n[03:20.33] Tatakai tsuzukeru hito\n[03:23.98] Kimi wa erufu erufu\n[03:27.25] Itoshiki tabi wa tsudzuku\n\n[03:33.54] Wasureta koto mo wasurete shimae\n[03:39.90] Kanashimi mo nukumori mo kie chimae\n[03:45.59] Saredo ima mo ima mo mimi ni nokoru wa\n[03:52.22] Kataku saikai wo negau you na\n[03:57.78] "Sayounara"\n[04:00.65] Adieu, alvido, alvido...\n[04:03.52] Love you, and you?\n[04:06.61] Adieu, alvido`
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
  "DECO*27 - モニтаリング",
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

export default function RadioPage() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [activeStation, setActiveStation] = useState<StationType>('default');
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [listenersCount] = useState(412);
  
  // Refs для анимаций
  const backgroundCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const coreCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const animationFrameId = useRef<number | null>(null);

  // Цвета
  const themeColor = activeStation === 'default' ? '#8a60c2' : '#e29e1d';
  const themeGlow = activeStation === 'default' ? 'rgba(138, 96, 194, 0.12)' : 'rgba(226, 158, 29, 0.12)';

  // Сохраняем прошлую станцию
  const prevStationRef = useRef<StationType>('default');

  // Управление скроллом volume
  const volumeLineRef = useRef<HTMLDivElement | null>(null);

  // 1. АВТОМАТИЧЕСКАЯ АКУСТИЧЕСКАЯ АУРА DRAWING LOOP (60 FPS DIRECT CANVASES)
  useEffect(() => {
    let rotationAngle = 0;

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
      const bgCanvas = backgroundCanvasRef.current;
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

          // Giant breathing color swash
          const swashColor = activeStation === 'default' ? '56, 28, 106' : '99, 64, 10';
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
      const cCanvas = coreCanvasRef.current;
      if (cCanvas) {
        const ctx = cCanvas.getContext('2d');
        if (ctx) {
          const cx = cCanvas.width / 2;
          const cy = cCanvas.height / 2;
          ctx.clearRect(0, 0, cCanvas.width, cCanvas.height);

          // Медленное вращение
          rotationAngle += isPlaying ? 0.006 + bass * 0.01 : 0.0015;

          // 1.2.1 Внешниеdotted орбиты
          ctx.strokeStyle = activeStation === 'default' ? 'rgba(138, 96, 194, 0.12)' : 'rgba(226, 158, 29, 0.12)';
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
          if (activeStation === 'default') {
            coreGlow.addColorStop(0, '#ffffff');
            coreGlow.addColorStop(0.2, '#daa1d9');
            coreGlow.addColorStop(0.6, 'rgba(138, 96, 194, 0.25)');
            coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
          } else {
            coreGlow.addColorStop(0, '#ffffff');
            coreGlow.addColorStop(0.2, '#facc15');
            coreGlow.addColorStop(0.6, 'rgba(226, 158, 29, 0.25)');
            coreGlow.addColorStop(1, 'rgba(0,0,0,0)');
          }

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
            ctx.fillStyle = activeStation === 'default' ? `rgba(218, 161, 217, ${opac})` : `rgba(242, 186, 71, ${opac})`;
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
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
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

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col justify-between bg-black text-white select-none">
      
      {/* 1. АТМОСФЕРНАЯ ФОНОВАЯ АУРА */}
      <canvas 
        ref={backgroundCanvasRef} 
        className="fixed inset-0 w-full h-full -z-10 pointer-events-none" 
      />

      {/* 2. ЭЛЕГАНТНАЯ МИНИМАЛИСТИЧЕСКАЯ ШАПКА */}
      <header className="h-20 w-full z-20 flex-shrink-0 select-none">
        <div className="flex items-center justify-between w-full max-w-[1150px] mx-auto h-full px-8">
          
          {/* Логотип */}
          <span className="font-light text-2xl tracking-[0.2em] text-white">
            KAWA<span style={{ color: themeColor }} className="transition-colors font-bold">/II</span>
          </span>

          {/* Скользящий плоский селектор станций */}
          <div className="flex items-center gap-6 font-mono text-[10px] tracking-[0.25em] text-white/40 uppercase">
            <button 
              onClick={() => setActiveStation('default')} 
              className={`transition-colors cursor-pointer relative py-1 hover:text-white ${activeStation === 'default' ? 'text-white font-bold' : ''}`}
            >
              J-POP
              {activeStation === 'default' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: themeColor }} />
              )}
            </button>
            <span>/</span>
            <button 
              onClick={() => setActiveStation('ost')} 
              className={`transition-colors cursor-pointer relative py-1 hover:text-white ${activeStation === 'ost' ? 'text-white font-bold' : ''}`}
            >
              OST
              {activeStation === 'ost' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full" style={{ backgroundColor: themeColor }} />
              )}
            </button>
          </div>

          {/* Статус в эфире */}
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.2em] text-white/50">
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: themeColor }} />
            <span>LIVE SYNC</span>
          </div>

        </div>
      </header>

      {/* 3. ГЛАВНАЯ ЦЕНТРАЛЬНАЯ ХУДОЖЕСТВЕННАЯ СЦЕНА (B&O FULL-SCREEN INSTALLATION) */}
      <main className="flex-1 flex flex-col justify-center items-center select-none relative z-10 w-full max-w-[900px] mx-auto px-6">
        
        {/* 3.1. ХУДОЖЕСТВЕННОЕ ГЛАСС-ЯДРО (THE ACOUSTIC ORB CORE) */}
        <div className="relative flex items-center justify-center w-[300px] h-[300px] aspect-square">
          <canvas 
            ref={coreCanvasRef} 
            width={280} 
            height={280} 
            className="absolute w-[280px] h-[280px] z-10 pointer-events-none" 
          />
          
          {/* Центральная белая кнопка Play/Pause */}
          <button 
            onClick={togglePlayPause}
            className="absolute inset-0 m-auto w-14 h-14 bg-white text-black rounded-full flex items-center justify-center z-20 shadow-[0_15px_30px_rgba(0,0,0,0.45)] cursor-pointer hover:scale-105 transition-transform active:scale-95 border border-white/20"
            style={{ 
              boxShadow: `0 0 35px ${themeGlow}`
            }}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" strokeWidth={0} />
            ) : (
              <Play className="w-5 h-5 ml-0.5 fill-current" strokeWidth={0} />
            )}
          </button>
        </div>

        {/* 3.2. МЕТАДАННЫЕ ТРЕКА */}
        <div className="text-center mt-6 select-none flex flex-col items-center">
          <span className="font-mono text-[9px] tracking-[0.35em] text-white/40 uppercase">{selectedTrack?.artist}</span>
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mt-1.5 uppercase font-mono max-w-[500px] truncate">{selectedTrack?.title}</h2>
        </div>

        {/* 3.3. ТИПОГРАФИЧЕСКАЯ ПРОЕКЦИЯ ТЕКСТА (TYPOGRAPHIC LYRICS OVERLAY - NEVER STRETCHES PARENTS) */}
        <div className="h-16 w-full flex flex-col justify-center items-center text-center mt-6 relative select-none">
          {currentJpLine ? (
            <div className="animate-fade-in flex flex-col items-center gap-1.5">
              <p className="text-sm md:text-base font-black tracking-wide text-white transition-opacity duration-300">
                {currentJpLine}
              </p>
              {currentUzLine && (
                <p className="text-[10px] md:text-xs font-serif italic text-white/45 tracking-wide transition-opacity duration-300">
                  {currentUzLine}
                </p>
              )}
            </div>
          ) : (
            <p className="text-[10px] font-mono tracking-[0.25em] text-white/20 uppercase">
              {selectedTrack?.lyrics ? 'Projector linking...' : 'No synchronized subtitles'}
            </p>
          )}
        </div>

      </main>

      {/* 4. ПРЕМИАЛЬНЫЙ ТИПОГРАФИЧЕСКИЙ ФУТЕР */}
      <footer className="h-24 w-full z-20 select-none flex-shrink-0">
        <div className="flex items-center justify-between w-full max-w-[1150px] mx-auto h-full px-8 border-t border-white/5">
          
          {/* Регулятор громкости (Тонкая плоская линия Bang & Olufsen) */}
          <div className="flex items-center gap-4 select-none">
            <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase">Vol.</span>
            <div 
              ref={volumeLineRef}
              onClick={handleVolumeClick}
              className="relative w-32 h-5 flex items-center cursor-pointer group"
            >
              {/* Линия-трек */}
              <div className="absolute w-full h-[1px] bg-white/10 rounded-full" />
              {/* Активная полоса громкости */}
              <div className="absolute h-[1px] bg-white transition-colors" style={{ width: `${volume * 100}%`, backgroundColor: themeColor }} />
              {/* Маленький индикатор, появляющийся при ховере */}
              <div 
                className="absolute w-2 h-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ 
                  left: `calc(${volume * 100}% - 4px)`, 
                  backgroundColor: themeColor,
                  boxShadow: `0 0 10px ${themeColor}`
                }}
              />
            </div>
            <span className="font-mono text-[9px] font-bold tracking-widest min-w-[30px]" style={{ color: themeColor }}>
              {Math.round(volume * 100)}%
            </span>
          </div>

          {/* Метка платформы */}
          <div className="font-mono text-[8px] tracking-[0.25em] text-white/20 uppercase hidden sm:block">
            KAWAII ACOUSTIC SELECTION // DIGITAL MULTIMEDIA PLATFORM
          </div>

          {/* Слушатели */}
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-white/40 uppercase">
            <Users size={12} style={{ color: themeColor }} />
            <span>{listenersCount} ON AIR</span>
          </div>

        </div>
      </footer>

      {/* Скрытый HTML5 Audio */}
      <audio ref={audioRef} className="hidden" />

    </div>
  );
}