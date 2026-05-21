import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';
import confetti from 'canvas-confetti';
import { soundLegacy } from '../../utils/sounds';

const PARTS = Array.from({length:20},(_,i)=>({
  size: Math.random()*8+3,
  x: Math.random()*100,
  color: ['#7c3aed','#f59e0b','#c084fc','#fff'][i%4],
  dur: Math.random()*10+10,
  delay: Math.random()*6,
}));

export const Phase8Legacy: React.FC = () => {
  const { name, next } = useStore();

  useEffect(() => {
    soundLegacy();
    const end = Date.now() + 4000;
    const run = () => {
      confetti({ particleCount:3, angle:60, spread:55, origin:{x:0}, colors:['#7c3aed','#f59e0b','#c084fc'] });
      confetti({ particleCount:3, angle:120, spread:55, origin:{x:1}, colors:['#7c3aed','#f59e0b','#c084fc'] });
      if (Date.now()<end) requestAnimationFrame(run);
    };
    run();
  }, []);

  return (
    <div className="scene">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 100% 100% at 50% 50%, #2d0660 0%, #06010f 70%)', zIndex:0 }} />
      <div className="bg-grid" />

      {/* Rising particles */}
      <div style={{ position:'absolute', inset:0, zIndex:1, pointerEvents:'none', overflow:'hidden' }}>
        {PARTS.map((p,i) => (
          <div key={i} className="particle" style={{ width:p.size, height:p.size, left:`${p.x}%`, background:p.color, animationDuration:`${p.dur}s`, animationDelay:`${p.delay}s` }} />
        ))}
      </div>

      <div className="content" style={{ zIndex:10, flexDirection:'column', alignItems:'center', textAlign:'center', gap:'clamp(20px,3vh,32px)' }}>
        <motion.p
          className="super shimmer"
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:0.3 }}
        >
          ✦ Tu momento es ahora ✦
        </motion.p>

        <motion.h1
          className="h1 g"
          initial={{ opacity:0, scale:0.85 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.5, duration:0.9, ease:[0.22,1,0.36,1] }}
          style={{ maxWidth:900 }}
        >
          Tu talento ahora<br/>es parte de<br/>nuestra visión
        </motion.h1>

        <motion.p
          className="lead"
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:1.1 }}
          style={{ maxWidth:560, fontSize:'1.2rem' }}
        >
          <strong style={{ color:'#fff' }}>{name}</strong>, ya no eres un espectador.<br/>
          Eres un <span style={{ color:'#f59e0b', fontWeight:600 }}>Constructor de Sueños</span>.<br/>
          Bienvenid@ a la familia ELITE 24 STUDIO.
        </motion.p>

        <motion.button
          className="glow-btn"
          initial={{ opacity:0, y:24 }}
          animate={{ opacity:1, y:0 }}
          transition={{ delay:1.8 }}
          onClick={next}
        >
          Dejar mi legado ✦
        </motion.button>
      </div>
    </div>
  );
};
