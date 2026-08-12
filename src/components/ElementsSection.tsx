import { ArrowRight, ScanSearch } from 'lucide-react';
import { structuralElements } from '@/data';
import type { StructuralElement, View } from '@/types';
import { ElementCard } from './ElementCard';

interface ElementsSectionProps {
  onSelect: (element: StructuralElement) => void;
  onNavigate: (view: View) => void;
}

export function ElementsSection({ onSelect, onNavigate }: ElementsSectionProps) {
  return (
    <section className="elements-section" id="elements">
      <div className="section-shell">
        <div className="section-heading-row">
          <div>
            <div className="eyebrow"><span className="eyebrow-line" /> EXPLORA POR ELEMENTO</div>
            <h2>¿Qué parte de tu vivienda<br /><em>quieres revisar?</em></h2>
          </div>
          <p className="section-intro">Cada elemento cumple una función distinta. Aprende a reconocer sus daños y entiende cuándo requieren atención profesional.</p>
        </div>
        <div className="element-grid">
          {structuralElements.map((element, index) => <ElementCard key={element.id} element={element} index={index} onSelect={onSelect} />)}
        </div>
        <div className="assessment-banner">
          <div className="assessment-icon"><ScanSearch size={25} /></div>
          <div className="assessment-copy"><strong>¿No sabes por dónde empezar?</strong><span>Te guiamos paso a paso con preguntas sencillas sobre lo que puedes observar.</span></div>
          <button className="button button-light" onClick={() => onNavigate('diagnosis')}>Iniciar evaluación guiada <ArrowRight size={16} /></button>
        </div>
      </div>
    </section>
  );
}
