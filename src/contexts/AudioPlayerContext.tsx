'use client';

import React, { createContext, useContext, useRef, useState, ReactNode } from 'react';

export interface Track {
  id: string;
  title: string;
  titleRomaji: string;
  artist: string;
  coverArt: string;
  audioSrc: string;
  lyrics: {
    romaji: string;
    russian: string;
    english: string;
    uzbek: string;
  };
  isAnimeOpening?: boolean;
  animeLink?: string;
  animeTitle?: string;
}

interface AudioPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  nextTrack: () => void;
  prevTrack: () => void;
}

const AudioPlayerContext = createContext<AudioPlayerContextType | undefined>(undefined);

const defaultPlaylist: Track[] = [
  {
    id: '1',
    title: 'Kaikai Kitan',
    titleRomaji: 'Kaikai Kitan',
    artist: 'Eve',
    coverArt: 'https://i.scdn.co/image/ab67616d0000b273c1c7b5e5e7c5c5a7f8c1f8b0',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    lyrics: {
        romaji: 'Tsuyogari no kotoba nante mou, nando mo furikaeru...',
        russian: 'Слова притворной храбрости, я оглядываюсь на них снова и снова...',
        english: 'Words of pretending to be strong, I look back on them over and over...',
        uzbek: 'O\'zini kuchli qilib ko\'rsatadigan so\'zlar, men ularga qayta-qayta qarayman...'
    },
    isAnimeOpening: true,
    animeLink: '/anime/jujutsu-kaisen',
    animeTitle: 'Jujutsu Kaisen'
  },
  {
    id: '2',
    title: 'Gurenge',
    titleRomaji: 'Gurenge',
    artist: 'LiSA',
    coverArt: 'https://i.scdn.co/image/ab67616d0000b273c1c7b5e5e7c5c5a7f8c1f8b1',
    audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    lyrics: {
      romaji: 'Tsuyoku nareru riyuu o shitta...',
      russian: 'Я узнал причину, по которой могу стать сильнее...',
      english: 'I learned the reason I can become stronger...',
      uzbek: 'Men kuchli bo\'lishim mumkin bo\'lgan sababni bildim...'
    },
    isAnimeOpening: true,
    animeLink: '/anime/demon-slayer',
    animeTitle: 'Demon Slayer'
  },
];

export const AudioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playTrack = (track: Track) => {
    if (audioRef.current) {
      if (currentTrack?.id === track.id) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.src = track.audioSrc;
        audioRef.current.load();
        audioRef.current.play();
        setCurrentTrack(track);
        setIsPlaying(true);
      }
    } else {
      const audio = new Audio(track.audioSrc);
      audio.volume = volume;
      audio.play();
      audioRef.current = audio;
      setCurrentTrack(track);
      setIsPlaying(true);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setVolume(newVolume);
  };

  const nextTrack = () => {
    console.log('Next track');
  };

  const prevTrack = () => {
    console.log('Prev track');
  };

  return (
    <AudioPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        volume,
        playTrack,
        togglePlayPause,
        setVolume: handleVolumeChange,
        nextTrack,
        prevTrack,
      }}
    >
      {children}
    </AudioPlayerContext.Provider>
  );
};

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (context === undefined) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};
