import { Menu, ShieldCheck, X } from 'lucide-react';
import { useState } from 'react';
import type { View } from '@/types';

interface HeaderProps {
  activeView: View;
  onNavigate: (view: View) => void;
}

export function Header({ activeView, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links: { label: string; view: View }[] = [
    { label: 'Inicio', view: 'home' },
    { label: 'Evaluación guiada', view: 'diagnosis' },
    { label: 'Elementos', view: 'home' },
    { label: 'NSR-10', view: 'nsr' },
  ];

  const handleNavigate = (view: View) => {
    onNavigate(view);
    setMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-inner">
        <button className="brand" onClick={() => handleNavigate('home')} aria-label="Volver al inicio">
          <span className="brand-mark"><ShieldCheck size={21} strokeWidth={2.5} /></span>
          <span className="brand-copy">
            <strong>estructura</strong><span>segura</span>
          </span>
        </button>

        <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
          {links.map((link) => (
            <button
              key={link.label}
              className={`nav-link ${activeView === link.view ? 'active' : ''}`}
              onClick={() => handleNavigate(link.view)}
            >
              {link.label}
            </button>
          ))}
          <button className="nav-cta" onClick={() => handleNavigate('diagnosis')}>Evaluar mi vivienda <span>→</span></button>
        </nav>

        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menú">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}
