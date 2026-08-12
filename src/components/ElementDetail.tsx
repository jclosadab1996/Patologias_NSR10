import { ArrowLeft, ClipboardCheck, Eye, Info, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { StructuralElement, View } from '@/types';
import { DamageLevelCard } from './DamageLevelCard';

interface ElementDetailProps {
  element: StructuralElement;
  onBack: () => void;
  onNavigate: (view: View) => void;
}

export function ElementDetail({ element, onBack, onNavigate }: ElementDetailProps) {
  const [expanded, setExpanded] = useState<string | null>('leve');
  return <main className="detail-page">
    <div className="detail-hero">
      <div className="detail-hero-image"><img src={element.imageUrl} alt="" /><div className="image-overlay" /></div>
      <div className="detail-hero-content section-shell"><button className="back-link" onClick={onBack}><ArrowLeft size={15} /> Volver a elementos</button><div className="eyebrow light"><span className="eyebrow-line" /> GUÍA POR ELEMENTO</div><h1>{element.name}</h1><p>{element.description}</p></div>
    </div>
    <div className="section-shell detail-body">
      <div className="detail-role"><div className="role-icon"><Info size={19} /></div><div><span className="mini-label">FUNCIÓN EN LA ESTRUCTURA</span><p>{element.role}</p></div></div>
      <div className="detail-heading"><div><div className="eyebrow"><span className="eyebrow-line" /> CLASIFICACIÓN DE DAÑOS</div><h2>Aprende a <em>reconocerlos</em></h2></div><p>Compara lo que observas con cada nivel. Abre una tarjeta para ver el significado técnico, el criterio NSR-10 y la acción recomendada.</p></div>
      <div className="damage-level-list">{element.damageLevels.map((level) => <DamageLevelCard key={level.id} level={level} expanded={expanded === level.id} onToggle={() => setExpanded(expanded === level.id ? null : level.id)} />)}</div>
      <div className="detail-footer-cta"><div><ShieldCheck size={22} /><div><strong>¿Quieres evaluar este elemento?</strong><span>Responde unas preguntas sencillas sobre lo que ves en tu vivienda.</span></div></div><button className="button button-dark" onClick={() => onNavigate('diagnosis')}><ClipboardCheck size={16} /> Evaluación guiada</button></div>
      <div className="detail-disclaimer"><Eye size={15} /> La observación visual orienta, pero solo un profesional puede confirmar la seguridad estructural.</div>
    </div>
  </main>;
}
