import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';
import { soundSelect, soundClick } from '../../utils/sounds';

const P = [
  { id:'a', ico:'💡', title:'Innovación sin Límites', desc:'Buscamos nuevas formas de transformar espacios y comunidades.', color:'#f59e0b', border:'rgba(245,158,11,0.35)', bg:'rgba(245,158,11,0.1)' },
  { id:'b', ico:'❤️', title:'Impacto Social',        desc:'Cada obra que construimos deja el mundo un poco mejor.',    color:'#ec4899', border:'rgba(236,72,153,0.35)', bg:'rgba(236,72,153,0.1)' },
  { id:'c', ico:'🏛️', title:'Excelencia Arquitectónica', desc:'El detalle hace al maestro. La perfección es nuestro estándar.', color:'#22d3ee', border:'rgba(34,211,238,0.35)', bg:'rgba(34,211,238,0.1)' },
];

export const Phase3Identity: React.FC = () => {
  const [sel, setSel] = useState<string[]>([]);
  const { next, prev } = useStore();
  const toggle = (id:string) => { soundSelect(); setSel(s => s.includes(id)?s.filter(x=>x!==id):[...s,id]); };

  return (
    <div className="scene">
      <div className="bg-base" />
      <div className="bg-grid" />
      <div className="orb orb-a" style={{ opacity:0.6 }} />

      <div className="content" style={{ zIndex:10, flexDirection:'column', gap:'clamp(28px,4vh,48px)' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center' }}>
          <p className="super shimmer" style={{ marginBottom:12 }}>Tu Identidad en el Estudio</p>
          <h2 className="h2 g">¿Dónde quieres<br />dejar tu huella?</h2>
          <p className="lead" style={{ maxWidth:520, margin:'16px auto 0' }}>Selecciona los pilares que representen tu esencia. Pueden ser uno o todos.</p>
        </motion.div>

        <div className="p3-pillars" style={{ maxWidth:900, width:'100%' }}>
          {P.map((p,i) => (
            <motion.div
              key={p.id}
              className={`pillar${sel.includes(p.id)?' sel':''}`}
              initial={{ opacity:0, y:30 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:i*0.12 }}
              onClick={() => toggle(p.id)}
              style={sel.includes(p.id) ? { borderColor:p.border, background:p.bg } : {}}
            >
              <div className="pillar-ico">{p.ico}</div>
              <h3 className="h4">{p.title}</h3>
              <p className="lead" style={{ fontSize:'0.9rem' }}>{p.desc}</p>
              {sel.includes(p.id) && <span style={{ fontSize:'1.2rem', color:p.color }}>✓ Seleccionado</span>}
            </motion.div>
          ))}
        </div>

        <div className="bottom-nav" style={{ position:'relative', bottom:'auto' }}>
          <button className="btn btn-g" onClick={prev}>← Regresar</button>
          <button className="btn btn-p" disabled={sel.length===0} onClick={next}>Continuar →</button>
        </div>
      </div>
    </div>
  );
};
