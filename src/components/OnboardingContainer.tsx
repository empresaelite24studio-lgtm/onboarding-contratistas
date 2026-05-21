import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOnboardingStore } from '../store/useOnboardingStore';

interface Props { children: React.ReactNode; }

export const OnboardingContainer: React.FC<Props> = ({ children }) => {
  const { progress } = useOnboardingStore();

  return (
    <div className="app-shell">
      {/* Ambient orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Architectural grid */}
      <div className="grid-overlay" />

      {/* Progress bar */}
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      {/* Brand */}
      <div className="brand-mark">ELITE 24 STUDIO</div>

      {/* Content */}
      <div className="phase-content">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </div>
    </div>
  );
};
