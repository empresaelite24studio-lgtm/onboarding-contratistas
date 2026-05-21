import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';

type Msg = { type:'bot'|'usr'; text:string };

const SMART: [string[], string][] = [
  [['horario','hora','tiempo','jornada'], '¡Buena pregunta! En ELITE 24 valoramos los resultados sobre los horarios. Tendrás flexibilidad siempre que el impacto sea visible. Tu lider de equipo te dará el detalle en tu primera reunión.'],
  [['pago','salario','sueldo','factura','nómina','quincenal'], 'Los pagos se procesan según tu tipo de contrato: si es nómina, el día 6 del mes; si es quincenal, los días 6 y 20. Puede variar según sea contrato, servicio, obra o labor. Revisa tu contrato para confirmarlo — el área administrativa te contactará esta semana para aclarar cualquier detalle. 📄'],
  [['proyecto','asignación','trabajo','tarea'], '¡Me alegra que preguntes! Tu asignación inicial será definida en tu reunión de inicio con tu líder. Mientras tanto, explora el repositorio del equipo para familiarizarte.'],
  [['mentor','guía','apoyo','ayuda'], 'Tendrás un mentor asignado en tu primer día. Será tu punto de contacto principal para cualquier duda técnica o personal durante los primeros 30 días.'],
  [['herramienta','software','app','programa','sistema','erp','plataforma'], 'Usamos nuestro propio ERP desarrollado gracias a SYNO AI — ¡te va a encantar! Todo en un solo lugar: proyectos, comunicación, seguimiento y más. Recibirás tu acceso completo el día de tu inicio formal. 🚀'],
  [['equipo','personas','compañeros','team'], 'Somos un equipo apasionado por la arquitectura y el diseño. Encontrarás personas muy talentosas y generosas. La cultura de colaboración es lo que más nos enorgullece.'],
];

const getReply = (msg: string): string => {
  const lower = msg.toLowerCase();
  for (const [keys, reply] of SMART) {
    if (keys.some(k => lower.includes(k))) return reply;
  }
  return 'Gracias por tu pregunta. La anotaré para que tu mentor la revise contigo en la primera sesión. ¿Hay algo más que quieras saber?';
};

export const Phase6Support: React.FC = () => {
  const { name, next, prev } = useStore();
  const [msgs, setMsgs] = useState<Msg[]>([
    { type:'bot', text:`¡Hola ${name}! 👋 Soy tu guía de bienvenida a ELITE 24 STUDIO. Puedo responder muchas de tus dudas ahora mismo. ¿Qué quieres saber?` }
  ]);
  const [inp, setInp] = useState('');

  const send = (text: string) => {
    if (!text.trim()) return;
    setMsgs(m => [...m, { type:'usr', text }]);
    setInp('');
    setTimeout(() => setMsgs(m => [...m, { type:'bot', text: getReply(text) }]), 900);
  };

  const SUGG = ['¿Cuáles son los horarios?','¿Cómo se hacen los pagos?','¿Quién será mi mentor?','¿Qué herramientas usan?'];

  return (
    <div className="scene">
      <div className="bg-base" />
      <div className="bg-grid" />
      <div className="orb orb-a" style={{ opacity:0.4 }} />

      <div className="content" style={{ zIndex:10, flexDirection:'column', gap:24, alignItems:'center' }}>
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center' }}>
          <p className="super shimmer" style={{ marginBottom:10 }}>Tu Sistema de Apoyo</p>
          <h2 className="h2 g">Nunca caminarás solo</h2>
        </motion.div>

        <div className="p6-wrap">
          {/* Left */}
          <div className="p6-left">
            <div style={{ fontSize:'3rem' }}>🤖</div>
            <h3 className="h4">Guía Inteligente<br/>ELITE 24</h3>
            <p className="lead" style={{ fontSize:'0.9rem' }}>Pregunta lo que quieras — respondo sobre horarios, pagos, equipo, herramientas y más.</p>
            <div className="p6-sugg">
              <p style={{ fontSize:'0.7rem', textTransform:'uppercase', letterSpacing:'0.15em', color:'#f59e0b', fontWeight:700 }}>Sugerencias</p>
              {SUGG.map(s => <button key={s} className="p6-sugg-btn" onClick={() => send(s)}>{s}</button>)}
            </div>
          </div>

          {/* Chat */}
          <div className="p6-chat glass">
            <div className="p6-head">
              <div className="p6-av">🤖</div>
              <div>
                <div style={{ fontFamily:'Outfit,sans-serif', fontWeight:600, fontSize:'0.95rem' }}>Guía ELITE 24</div>
                <div style={{ color:'#22c55e', fontSize:'0.75rem' }}>● En línea ahora</div>
              </div>
            </div>
            <div className="p6-msgs">
              {msgs.map((m,i) => (
                <motion.div key={i} className={`p6-msg ${m.type==='bot'?'bot':'usr'}`} initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }}>
                  {m.text}
                </motion.div>
              ))}
            </div>
            <div className="p6-inp">
              <input className="p6-field" placeholder="Escribe tu pregunta..." value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send(inp)} />
              <button className="p6-send" onClick={() => send(inp)}>→</button>
            </div>
          </div>
        </div>

        <div style={{ display:'flex', gap:16 }}>
          <button className="btn btn-g" onClick={prev}>← Regresar</button>
          <button className="btn btn-p" onClick={next}>Continuar →</button>
        </div>
      </div>
    </div>
  );
};
