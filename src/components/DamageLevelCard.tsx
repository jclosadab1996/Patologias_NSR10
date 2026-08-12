import { AlertCircle, AlertOctagon, AlertTriangle, ShieldCheck } from 'lucide-react';
import type { DamageLevel } from '@/types';
import { DamageSchematic } from './DamageSchematic';

interface DamageLevelCardProps {
  level: DamageLevel;
  expanded: boolean;
  onToggle: () => void;
}

const icons = { ShieldCheck, AlertTriangle, AlertOctagon, AlertCircle };

export function DamageLevelCard({ level, expanded, onToggle }: DamageLevelCardProps) {
  const Icon = icons[level.icon as keyof typeof icons] || ShieldCheck;
  return (
    <article className={`damage-level-card ${level.id} ${expanded ? 'expanded' : ''}`}>
      <button className="damage-card-summary" onClick={onToggle} aria-expanded={expanded}>
        <span className="damage-icon"><Icon size={20} /></span>
        <span className="damage-summary-copy"><strong>{level.name}</strong><span>{level.description}</span></span>
        <span className="damage-chevron">{expanded ? '−' : '+'}</span>
      </button>
      {expanded && <div className="damage-detail">
        <div className="damage-detail-visual"><DamageSchematic type={level.schematicType} /></div>
        <div className="damage-detail-content">
          <div className="plain-language"><span className="mini-label">EXPLICADO DE FORMA SENCILLA</span><p>{level.plainLanguage}</p></div>
          <div className="damage-detail-columns">
            <div><h4>Lo que puedes observar</h4><ul>{level.visualCharacteristics.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><h4>¿Qué significa?</h4><p><strong>Tipo de falla:</strong> {level.failureType}</p><p><strong>Comportamiento ante otro sismo:</strong> {level.futureBehavior}</p></div>
          </div>
          <div className="damage-guidance"><div><span className="mini-label">CRITERIO NSR-10</span><p>{level.nsr10Reference}</p></div><div><span className="mini-label">RECOMENDACIÓN</span><p>{level.nsr10Recommendation}</p></div></div>
          <div className="damage-action"><strong>{level.habitability}</strong><span>{level.actionMessage}</span></div>
          <div className="visual-note"><span>VISUAL RECOMENDADO</span><p>{level.visualSpec.description}</p></div>
        </div>
      </div>}
    </article>
  );
}
