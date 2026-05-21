import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useOnboardingStore';
import { soundMicOn, soundMicOff, soundComplete } from '../../utils/sounds';

// Web Speech API types
declare global {
  interface Window { SpeechRecognition: any; webkitSpeechRecognition: any; }
}

export const Phase7Voice: React.FC = () => {
  const { name, setVoiceText, next, prev } = useStore();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recogRef = useRef<any>(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { setSupported(false); return; }
    const r = new SR();
    r.continuous = true;
    r.interimResults = true;
    r.lang = 'es-ES';
    r.onresult = (e: any) => {
      let full = '';
      for (let i = 0; i < e.results.length; i++) full += e.results[i][0].transcript;
      setTranscript(full);
    };
    r.onend = () => setListening(false);
    recogRef.current = r;
  }, []);

  const toggle = () => {
    if (!recogRef.current) return;
    if (listening) { recogRef.current.stop(); setListening(false); soundMicOff(); }
    else { recogRef.current.start(); setListening(true); soundMicOn(); }
  };

  const handleContinue = () => {
    if (recogRef.current && listening) recogRef.current.stop();
    soundComplete();
    setVoiceText(transcript);
    next();
  };

  return (
    <div className="scene">
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 80% at 50% 120%, #1a0540 0%, transparent 55%), #06010f', zIndex:0 }} />
      <div className="bg-grid" />

      <div className="content" style={{ zIndex:10, flexDirection:'column', alignItems:'center', gap:'clamp(20px,3vh,36px)' }}>
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} style={{ textAlign:'center' }}>
          <p className="super shimmer" style={{ marginBottom:14 }}>Antes de tu gran bienvenida</p>
          <h2 className="h2 g">¿Qué expectativas<br />traes contigo, {name}?</h2>
          <p className="lead" style={{ maxWidth:540, margin:'16px auto 0' }}>
            Cuéntanos en voz alta qué esperas de este viaje. Tus palabras son el primer ladrillo de tu historia aquí.
          </p>
        </motion.div>

        <div className="p7-wrap">
          {/* Mic button */}
          <motion.button
            className={`mic-btn ${listening ? 'listening' : 'idle'}`}
            onClick={toggle}
            whileTap={{ scale: 0.93 }}
            title={listening ? 'Detener' : 'Hablar'}
          >
            {listening ? '⏹' : '🎙️'}
          </motion.button>

          <p className="mic-status">
            {!supported ? '⚠️ Tu navegador no soporta voz. Escribe abajo.' : listening ? '🔴 Escuchando en tiempo real...' : transcript ? '✅ Grabación lista' : 'Toca el micrófono y habla'}
          </p>

          {/* Transcript / text area */}
          {supported ? (
            <div className="transcript-box glass">
              {transcript || <span style={{ color:'rgba(255,255,255,0.2)', fontStyle:'italic' }}>Tu mensaje aparecerá aquí mientras hablas...</span>}
            </div>
          ) : (
            <textarea
              className="transcript-box glass"
              placeholder="Escribe tus expectativas aquí..."
              value={transcript}
              onChange={e => setTranscript(e.target.value)}
              style={{ resize:'none', cursor:'text', background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:16, color:'#fff', fontFamily:'Inter,sans-serif', fontSize:'1rem', lineHeight:1.7, padding:'20px 24px', width:'100%', minHeight:90, outline:'none' }}
            />
          )}

          <p className="lead" style={{ fontSize:'0.85rem', textAlign:'center', maxWidth:440 }}>
            {transcript ? 'Puedes seguir hablando o editar el texto. Cuando estés listo, continúa.' : 'No hay respuestas incorrectas. Sé auténtic@.'}
          </p>
        </div>

        <div style={{ display:'flex', gap:16 }}>
          <button className="btn btn-g" onClick={prev}>← Regresar</button>
          <button className="btn btn-p" onClick={handleContinue}>
            {transcript ? 'Guardar y continuar →' : 'Saltar esta parte →'}
          </button>
        </div>
      </div>
    </div>
  );
};
