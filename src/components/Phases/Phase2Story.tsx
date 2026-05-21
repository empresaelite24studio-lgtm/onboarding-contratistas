import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';

const STEPS = [
  { sup:'El Origen', title:'La Semilla\nde un Sueño', body:'Santiago Folleco Ruiz no solo quería construir edificios. Quería construir escenarios donde las vidas de las personas pudieran florecer. Cada proyecto fue un acto de fe sobre el futuro.', img:'/santy ni\u00f1o so\u00f1ador.jpg' },
  { sup:'La Visión', title:'Más que\nArquitectura', body:'ELITE 24 STUDIO nació de la convicción de que cada plano es una promesa y cada obra es un legado. No construimos paredes, construimos futuros. Comunidades que prosperan gracias a espacios bien soñados.', img:'/10.jpg' },
  { sup:'Tu Momento', title:'Hoy eres\nparte de esto', body:'Esta historia ahora tiene tu nombre en ella. No viniste a trabajar. Viniste a dejar huella. A construir algo que permanezca. Tu talento, tu creatividad y tu compromiso son exactamente lo que necesitamos.', img:'/Foto Cefe 6.jpg' },
];

export const Phase2Story: React.FC = () => {
  const [step, setStep] = useState(0);
  const { name, next, prev } = useStore();
  const s = STEPS[step];

  return (
    <div className="scene">
      <div className="content-split" style={{ position:'absolute', inset:0, display:'grid', gridTemplateColumns:'1fr 1fr' }}>
        {/* Image side */}
        <div className="p2-img">
          <AnimatePresence mode="wait">
            <motion.img key={step} src={s.img} alt="" style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover' }} initial={{ scale:1.1, opacity:0 }} animate={{ scale:1, opacity:1 }} exit={{ scale:0.95, opacity:0 }} transition={{ duration:0.7 }} />
          </AnimatePresence>
          <div className="p2-img-shade" />
          {/* Step counter overlay */}
          <div style={{ position:'absolute', bottom:40, left:40, zIndex:5, display:'flex', gap:8 }}>
            {STEPS.map((_,i) => (
              <button key={i} className={`p2-dot${i===step?' on':''}`} onClick={() => setStep(i)} />
            ))}
          </div>
        </div>

        {/* Text side */}
        <div style={{ position:'relative', background:'#06010f', display:'flex', alignItems:'center' }}>
          <div className="bg-grid" style={{ opacity:0.5 }} />
          <div className="p2-txt" style={{ position:'relative', zIndex:5 }}>
            <AnimatePresence mode="wait">
              <motion.div key={step} initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }} transition={{ duration:0.4 }} style={{ display:'flex', flexDirection:'column', gap:20 }}>
                <p className="super shimmer">{s.sup}</p>
                <h2 className="h2 g" style={{ whiteSpace:'pre-line' }}>{s.title}</h2>
                <p className="lead">{s.body}</p>
                {step === 0 && (
                  <div style={{ marginTop: 4, display:'flex', flexDirection:'column', gap: 4 }}>
                    <p style={{
                      fontFamily: 'Outfit, sans-serif', fontWeight: 800,
                      fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', lineHeight: 1.45,
                      background: 'linear-gradient(135deg, #f59e0b, #fff8e7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      "Lo que un día fue un sueño,<br/>hoy es una realidad.
                    </p>
                    <p style={{
                      fontFamily: 'Outfit, sans-serif', fontWeight: 700,
                      fontSize: 'clamp(0.78rem, 1.1vw, 0.95rem)', lineHeight: 1.45,
                      background: 'linear-gradient(135deg, #f59e0b, #fff8e7)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>
                      Niño soñador. Visionario imparable."
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="bottom-nav" style={{ position:'relative', bottom:'auto', left:'auto', right:'auto', justifyContent:'flex-start', marginTop:8 }}>
              <button className="btn btn-g" onClick={() => step===0 ? prev() : setStep(s=>s-1)}>← Atrás</button>
              <button className="btn btn-p" onClick={() => step<STEPS.length-1 ? setStep(s=>s+1) : next()}>
                {step===STEPS.length-1 ? 'Continuar →' : 'Siguiente →'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position:'absolute', bottom:32, left:'50%', transform:'translateX(-50%)', zIndex:20, color:'rgba(255,255,255,0.2)', fontSize:'0.8rem', fontStyle:'italic' }}>
        "Los sueños no solo se construyen, {name}, se viven."
      </div>
    </div>
  );
};
