import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';
import { soundWelcome, soundClick } from '../../utils/sounds';

export const Phase1Welcome: React.FC = () => {
  const [name, setName] = React.useState('');
  const { setName: save, next } = useStore();

  useEffect(() => { soundWelcome(); }, []);

  const go = () => {
    if (name.trim()) {
      soundClick();
      save(name.trim());
      next();
    }
  };

  return (
    <div className="scene">
      <div className="bg-base" />
      <div className="bg-grid" />
      <div className="orb orb-a" />
      <div className="orb orb-b" />

      <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, zIndex:2, pointerEvents:'none' }}>
        <ellipse cx="75%" cy="50%" rx="35%" ry="70%" fill="none" stroke="white" strokeWidth="1"/>
        <ellipse cx="75%" cy="50%" rx="28%" ry="55%" fill="none" stroke="white" strokeWidth="0.5"/>
      </svg>

      <div className="content" style={{ zIndex:10 }}>
        <motion.div
          className="p1-box"
          initial={{ opacity:0, y:40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8, ease:[0.22,1,0.36,1] }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity:0, scale:0.8 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ delay:0.1, duration:0.7, ease:[0.22,1,0.36,1] }}
            style={{ display:'flex', justifyContent:'center', marginBottom:4 }}
          >
            <img
              src="/logo.png"
              alt="ELITE 24 STUDIO"
              style={{ width:110, height:110, objectFit:'contain', filter:'drop-shadow(0 0 20px rgba(212,175,55,0.4))' }}
            />
          </motion.div>

          <motion.p className="super shimmer" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
            ✦ ELITE 24 STUDIO — Onboarding
          </motion.p>

          <h1 className="h1">
            <span className="g">¡Bienvenid@</span><br />
            <span style={{ color:'rgba(255,255,255,0.9)' }}>a bordo!</span>
          </h1>

          <p className="lead" style={{ maxWidth:480 }}>
            Estás a punto de entrar a un sueño en construcción.<br />
            Nos emociona tenerte aquí. Dinos quién eres.
          </p>

          <div className="glass p1-input-card">
            <p className="p1-label">Tu nombre</p>
            <input
              className="inp"
              type="text"
              placeholder="Escribe tu nombre completo..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && go()}
              autoFocus
            />
            <button className="btn btn-p" onClick={go} disabled={!name.trim()} style={{ width:'100%', justifyContent:'center', padding:'18px' }}>
              Comenzar la experiencia →
            </button>
          </div>

          <p style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.2)', fontStyle:'italic' }}>
            "El futuro pertenece a quienes creen en la belleza de sus sueños."
          </p>
        </motion.div>
      </div>
    </div>
  );
};
