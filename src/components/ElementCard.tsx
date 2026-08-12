import { ArrowUpRight } from 'lucide-react';
import type { StructuralElement } from '@/types';

interface ElementCardProps {
  element: StructuralElement;
  index: number;
  onSelect: (element: StructuralElement) => void;
}

export function ElementCard({ element, index, onSelect }: ElementCardProps) {
  return (
    <button className="element-card" onClick={() => onSelect(element)}>
      <div className="element-card-topline"><span>0{index + 1}</span><ArrowUpRight size={18} /></div>
      <div className="element-image-wrap">
        <img src={element.imageUrl} alt={element.name} />
        <div className="image-overlay" />
        <span className="element-pill">{element.shortName}</span>
      </div>
      <div className="element-card-body">
        <h3>{element.name}</h3>
        <p>{element.role}</p>
        <span className="card-link">Ver niveles de daño <span>→</span></span>
      </div>
    </button>
  );
}
