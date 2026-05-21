import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';

const C = [
  {
    num: '01',
    ico: '🚀',
    title: 'Toma la Iniciativa',
    desc: 'Si ves algo que puede mejorar, propón el cambio. No esperes permiso para hacer lo correcto.',
    reward: 'Autonomía total en tus proyectos',
    color: '#7c3aed',
    glow: 'rgba(124,58,237,0.3)',
  },
  {
    num: '02',
    ico: '💬',
    title: 'Comunica con Claridad',
    desc: 'La arquitectura es un lenguaje. Exprésate con honestidad. Escucha con empatía. La claridad es respeto.',
    reward: 'Sinergia real en el equipo',
    color: '#f59e0b',
    glow: 'rgba(245,158,11,0.25)',
  },
  {
    num: '03',
    ico: '🔍',
    title: 'Mantente Curioso',
    desc: 'La mejor solución nunca es la primera. Investiga, experimenta, sorpréndenos. La curiosidad es tu superpoder.',
    reward: 'Crecimiento y reconocimiento',
    color: '#ec4899',
    glow: 'rgba(236,72,153,0.25)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 12, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    transition: {
      delay: 0.3 + i * 0.18,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: 0.5 + i * 0.18, duration: 0.5, ease: 'easeOut' },
  }),
};

export const Phase5Expectations: React.FC = () => {
  const { next, prev } = useStore();

  return (
    <div className="scene" style={{ perspective: 1200 }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(ellipse 70% 70% at 50% 100%, #1a0540 0%, transparent 60%), #06010f',
        zIndex: 0,
      }} />
      <div className="bg-grid" />

      {/* Ambient number decoration */}
      <div style={{
        position: 'absolute', top: '10%', right: '5%',
        fontFamily: 'Outfit, sans-serif', fontSize: 'clamp(8rem,15vw,14rem)',
        fontWeight: 900, color: 'rgba(124,58,237,0.04)',
        lineHeight: 1, zIndex: 1, userSelect: 'none', pointerEvents: 'none',
      }}>
        RETOS
      </div>

      <div className="content" style={{ zIndex: 10, flexDirection: 'column', gap: 'clamp(16px,2.5vh,32px)' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <motion.p
            className="super shimmer"
            style={{ marginBottom: 10 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            No son reglas — son retos
          </motion.p>
          <h2 className="h2 g">Así medimos el impacto</h2>
          <motion.p
            className="lead"
            style={{ maxWidth: 520, margin: '10px auto 0', fontSize: '1rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            No medimos el tiempo. Medimos lo que dejas cuando no estás.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          width: '100%',
          maxWidth: 1000,
        }}>
          {C.map((c, i) => (
            <motion.div
              key={c.num}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{
                y: -10,
                boxShadow: `0 24px 48px ${c.glow}`,
                transition: { duration: 0.25 },
              }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 20,
                padding: 'clamp(20px,2.5vh,28px) 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Animated top border */}
              <motion.div
                custom={i}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${c.color}, transparent)`,
                  transformOrigin: 'left',
                }}
              />

              {/* Number badge */}
              <div style={{
                position: 'absolute', top: 16, right: 16,
                fontFamily: 'Outfit, sans-serif', fontSize: '0.7rem',
                fontWeight: 800, color: c.color, opacity: 0.4,
                letterSpacing: '0.1em',
              }}>
                {c.num}
              </div>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.4 + i * 0.18, type: 'spring', stiffness: 200 }}
                style={{
                  width: 60, height: 60, borderRadius: '50%',
                  background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`,
                  border: `1px solid ${c.color}33`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.7rem',
                }}
              >
                {c.ico}
              </motion.div>

              <h3 style={{
                fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                fontSize: 'clamp(1rem,1.6vw,1.2rem)', color: '#fff',
                lineHeight: 1.25,
              }}>
                {c.title}
              </h3>

              <p style={{
                fontSize: 'clamp(0.8rem,1.1vw,0.88rem)',
                color: 'rgba(255,255,255,0.55)', lineHeight: 1.6,
              }}>
                {c.desc}
              </p>

              {/* Reward */}
              <div style={{
                marginTop: 'auto',
                paddingTop: 12,
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{
                  fontSize: '0.68rem', textTransform: 'uppercase',
                  letterSpacing: '0.15em', color: c.color,
                  fontWeight: 700, marginBottom: 4,
                }}>
                  🏆 Recompensa
                </p>
                <p style={{ color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>
                  {c.reward}
                </p>
              </div>

              {/* Hover glow corner */}
              <div style={{
                position: 'absolute', bottom: -30, right: -30,
                width: 80, height: 80, borderRadius: '50%',
                background: c.glow, filter: 'blur(20px)',
                pointerEvents: 'none', opacity: 0.5,
              }} />
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'center' }}>
          <button className="btn btn-g" onClick={prev}>← Regresar</button>
          <button
            className="btn btn-p"
            onClick={next}
            style={{ fontSize: '1.05rem', padding: '16px 44px' }}
          >
            Acepto los retos →
          </button>
        </div>
      </div>
    </div>
  );
};
