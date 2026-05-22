import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';
import { soundWelcome } from '../../utils/sounds';
import { sendOnboardingNotification } from '../../utils/emailService';

const SOCIALS = [
  {
    label: 'Website', handle: 'elite24studio.com.co', href: 'https://elite24studio.com.co/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram', handle: '@elite24studio', href: 'https://www.instagram.com/elite24studio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    label: 'YouTube', handle: '@elite24studio', href: 'https://www.youtube.com/@elite24studio',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
];

export const Phase9Closing: React.FC = () => {
  const { name, voiceText, pillars } = useStore();

  useEffect(() => {
    soundWelcome();
    // Send notification to RRHH
    sendOnboardingNotification({
      contractorName: name,
      voiceText: voiceText,
      pillars: pillars,
      completedAt: new Date().toLocaleString('es-CO', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'America/Bogota',
      }),
    }).catch(err => console.warn('[Email] Could not send notification:', err));
  }, []); // eslint-disable-line

  return (
    <div className="scene">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 80% at 30% 50%, #1a0540 0%, transparent 60%), #06010f', zIndex:0 }} />
      <div className="bg-grid" />
      <div className="orb orb-b" style={{ opacity:0.3 }} />

      <div className="content" style={{ zIndex:10, flexDirection:'column', alignItems:'center', gap:'clamp(14px,2vh,22px)' }}>
        <div className="p9-wrap">
          <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ delay:0.2, type:'spring', stiffness:200, damping:15 }}
            style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}
          >
            <img
              src="/logo.png"
              alt="ELITE 24 STUDIO"
              style={{ width:90, height:90, objectFit:'contain', filter:'drop-shadow(0 0 16px rgba(212,175,55,0.5))' }}
            />
            <span style={{ fontSize:'3rem' }}>✅</span>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}>
            <h1 className="h2 g">¡Bienvenid@ a bordo,<br/>{name}!</h1>
          </motion.div>

          {voiceText && (
            <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }} className="glass"
              style={{ padding:'18px 24px', maxWidth:600, width:'100%', textAlign:'left' }}>
              <p style={{ fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.2em', color:'#f59e0b', fontWeight:700, marginBottom:8 }}>
                🎙️ Tus expectativas — guardadas
              </p>
              <p className="lead" style={{ fontSize:'0.92rem', fontStyle:'italic', lineHeight:1.65 }}>"{voiceText}"</p>
            </motion.div>
          )}

          <motion.div className="glass p9-card" initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9 }}>
            <div style={{ position:'absolute', top:-60, right:-60, width:200, height:200, background:'rgba(124,58,237,0.07)', borderRadius:'50%', filter:'blur(40px)', pointerEvents:'none' }} />
            <p className="p9-quote">
              "En ELITE 24 STUDIO no contratamos solo manos — contratamos corazones que sueñan. Hoy, {name}, tu corazón late con el nuestro."
            </p>
            <p className="p9-ceo">— Santiago Folleco Ruiz, Fundador & CEO</p>
            <div className="p9-divider" style={{ margin:'18px auto' }} />

            {/* Social Links */}
            <p style={{ color:'rgba(255,255,255,0.3)', fontSize:'0.8rem', marginBottom:14, textAlign:'center' }}>Síguenos en nuestra misión:</p>
            <div style={{ display:'flex', gap:10, justifyContent:'center', flexWrap:'wrap' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  style={{
                    display:'flex', flexDirection:'column', alignItems:'center', gap:6,
                    padding:'12px 16px', borderRadius:14,
                    background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)',
                    color:'rgba(255,255,255,0.55)', textDecoration:'none',
                    transition:'all 0.2s', minWidth:80,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background='rgba(124,58,237,0.15)'; (e.currentTarget as HTMLElement).style.color='#fff'; (e.currentTarget as HTMLElement).style.borderColor='rgba(124,58,237,0.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color='rgba(255,255,255,0.55)'; (e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.09)'; }}
                >
                  {s.icon}
                  <span style={{ fontSize:'0.68rem', fontWeight:600, letterSpacing:'0.05em' }}>{s.label}</span>
                </a>
              ))}
            </div>
            <p style={{ textAlign:'center', marginTop:12, color:'rgba(255,255,255,0.2)', fontSize:'0.78rem', fontWeight:500 }}>
              @elite24studio
            </p>
          </motion.div>

          <motion.p className="p9-footer" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.5 }}>
            <span>Hecho con</span>
            <span style={{ color:'#ec4899' }}>❤️</span>
            <span>por el equipo de Talento ELITE 24 STUDIO</span>
          </motion.p>
        </div>
      </div>
    </div>
  );
};
