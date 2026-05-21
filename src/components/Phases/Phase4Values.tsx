import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';

const V = [
  { id:'c', ico:'🛡️', label:'Compromiso', color:'#7c3aed', bg:'rgba(124,58,237,0.15)', title:'Compromiso Sin Fisuras', desc:'No es solo cumplir un horario — es ser guardián de la visión de cada cliente. Tu integridad es nuestro cimiento invisible.', example:'Hacer lo correcto incluso cuando nadie está mirando.' },
  { id:'cr', ico:'🎨', label:'Creatividad', color:'#f59e0b', bg:'rgba(245,158,11,0.15)', title:'Creatividad Radical', desc:'El "no se puede" es solo el comienzo de una nueva solución. Aquí la imaginación no tiene techo.', example:'Convertir una limitación técnica en una oportunidad de diseño que el cliente no esperaba.' },
  { id:'t', ico:'🤝', label:'Sinergia', color:'#ec4899', bg:'rgba(236,72,153,0.15)', title:'Sinergia Colectiva', desc:'Nadie construye una catedral solo. Valoramos la inteligencia colectiva y la generosidad de compartir el conocimiento.', example:'Apoyar al compañero cuando el reto parece imposible — eso es lo que nos hace equipo.' },
];

export const Phase4Values: React.FC = () => {
  const [active, setActive] = useState(0);
  const { next, prev } = useStore();
  const v = V[active];

  return (
    <div className="scene">
      <div className="bg-base" />
      <div className="bg-grid" />
      <div className="orb orb-b" style={{ opacity:0.5 }} />

      <div className="content" style={{ zIndex:10, flexDirection:'column', gap:'clamp(20px,3vh,36px)' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center' }}>
          <p className="super shimmer" style={{ marginBottom:10 }}>Nuestra Brújula</p>
          <h2 className="h2 g">Valores que se viven,<br />no se enmarcan</h2>
        </motion.div>

        <div className="p4-layout">
          <div className="p4-tabs">
            {V.map((val,i) => (
              <button key={val.id} className={`p4-tab${active===i?' on':''}`} onClick={() => setActive(i)}
                style={active===i ? { borderColor:val.color } : {}}>
                <span style={{ fontSize:'1.4rem' }}>{val.ico}</span>
                {val.label}
              </button>
            ))}
          </div>

          <div className="glass p4-panel">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-16 }} transition={{ duration:0.3 }} style={{ display:'flex', flexDirection:'column', gap:18 }}>
                <div style={{ display:'flex', alignItems:'center', gap:16 }}>
                  <div style={{ width:52, height:52, borderRadius:14, background:v.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', flexShrink:0 }}>{v.ico}</div>
                  <h3 className="h3" style={{ color:v.color }}>{v.title}</h3>
                </div>
                <p className="lead" style={{ fontSize:'1.05rem' }}>{v.desc}</p>
                <div className="p4-example">
                  <strong style={{ color:'#fff', fontStyle:'normal', display:'block', marginBottom:6, fontSize:'0.8rem', textTransform:'uppercase', letterSpacing:'0.1em' }}>En la práctica:</strong>
                  "{v.example}"
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="bottom-nav" style={{ position:'relative', bottom:'auto' }}>
          <button className="btn btn-g" onClick={prev}>← Regresar</button>
          <button className="btn btn-p" onClick={next}>He interiorizado estos valores →</button>
        </div>
      </div>
    </div>
  );
};
