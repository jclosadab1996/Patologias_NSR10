import { ArrowRight, ChevronDown, CircleAlert, MoveDown, ShieldCheck } from 'lucide-react';
import type { View } from '@/types';

interface HeroProps {
  onNavigate: (view: View) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="hero-section">
      <div className="hero-wash" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> GUÍA DE EVALUACIÓN POST-SISMO</div>
          <h1>Conoce el estado<br /><em>real</em> de tu vivienda.</h1>
          <p className="hero-lead">Una guía visual para identificar daños estructurales después de un sismo y tomar decisiones informadas sobre la seguridad de tu hogar.</p>
          <div className="hero-actions">
            <button className="button button-primary" onClick={() => onNavigate('diagnosis')}>Evaluar mi vivienda <ArrowRight size={17} /></button>
            <button className="button button-ghost" onClick={() => onNavigate('nsr')}><span className="button-icon"><ShieldCheck size={16} /></span> ¿Qué dice la NSR-10?</button>
          </div>
          <div className="hero-note"><CircleAlert size={14} /> Esta guía es orientativa. No reemplaza la evaluación de un profesional.</div>
        </div>
        <div className="hero-visual" aria-label="Diagrama de edificación y clasificación de riesgo">
          <div className="hero-grid" />
          <div className="hero-building">
            <div className="building-floor floor-roof"><span /><span /><span /><span /></div>
            <div className="building-floor"><span /><span className="window-lit" /><span /><span className="window-lit" /></div>
            <div className="building-floor"><span className="window-lit" /><span /><span className="window-lit" /><span /></div>
            <div className="building-floor"><span /><span className="window-lit" /><span /><span /></div>
            <div className="building-floor floor-base"><span /><span /><span /><span /></div>
          </div>
          <div className="hero-callout callout-safe"><span className="callout-dot" /> Estado seguro <strong>Leve</strong></div>
          <div className="hero-callout callout-alert"><span className="callout-dot" /> Atención requerida <strong>Moderado</strong></div>
          <div className="hero-callout callout-danger"><span className="callout-dot" /> Riesgo estructural <strong>Alto</strong></div>
          <div className="hero-scale"><span>LEVE</span><span>MODERADO</span><span>ALTO</span><span>EXTREMO</span></div>
          <div className="hero-visual-caption"><MoveDown size={15} /> Clasifica lo que ves. Entiende lo que significa.</div>
        </div>
      </div>
      <button className="scroll-cue" onClick={() => document.getElementById('elements')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Ver elementos"><ChevronDown size={17} /></button>
    </section>
  );
}
