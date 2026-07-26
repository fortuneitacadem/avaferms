import React, { createContext, useContext, useState } from 'react';
import { audioSynthesizer } from '../utils/audioSynthesizer';

interface SoundContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playRev: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundEnabled, setSoundEnabled] = useState(true);

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    audioSynthesizer.setEnabled(newState);
  };

  const playRev = () => {
    audioSynthesizer.playV12Rev();
  };

  const playClick = () => {
    audioSynthesizer.playClickSound();
  };

  return (
    <SoundContext.Provider value={{ soundEnabled, toggleSound, playRev, playClick }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
