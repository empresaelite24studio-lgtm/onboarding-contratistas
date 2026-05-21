import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from './store/useOnboardingStore';
import { Phase1Welcome } from './components/Phases/Phase1Welcome';
import { Phase2Story } from './components/Phases/Phase2Story';
import { Phase3Identity } from './components/Phases/Phase3Identity';
import { Phase4Values } from './components/Phases/Phase4Values';
import { Phase5Expectations } from './components/Phases/Phase5Expectations';
import { Phase6Support } from './components/Phases/Phase6Support';
import { Phase7Voice } from './components/Phases/Phase7Voice';
import { Phase8Legacy } from './components/Phases/Phase8Legacy';
import { Phase9Closing } from './components/Phases/Phase9Closing';
import { soundTransition } from './utils/sounds';

const TOTAL = 9;

const variants = {
  enter: { opacity: 0, x: 50, scale: 0.99 },
  center: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -50, scale: 0.99 },
};

function App() {
  const { phase, index } = useStore();
  const progress = (index / (TOTAL - 1)) * 100;

  // Play transition sound whenever phase changes
  React.useEffect(() => {
    soundTransition();
  }, [phase]);

  const map: Record<string, React.ReactNode> = {
    welcome: <Phase1Welcome />,
    story: <Phase2Story />,
    identity: <Phase3Identity />,
    values: <Phase4Values />,
    expectations: <Phase5Expectations />,
    support: <Phase6Support />,
    voice: <Phase7Voice />,
    legacy: <Phase8Legacy />,
    closing: <Phase9Closing />,
  };

  return (
    <>
      <div className="progress-bar" style={{ width: `${progress}%` }} />
      <div className="brand">ELITE 24 STUDIO</div>
      <div className="phase-counter">{index + 1} / {TOTAL}</div>

      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh' }}
        >
          {map[phase]}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
