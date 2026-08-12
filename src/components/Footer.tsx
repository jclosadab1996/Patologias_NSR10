import { ShieldCheck } from 'lucide-react';
import type { View } from '@/types';

interface FooterProps {
  onNavigate: (view: View) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="section-shell footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">
            <ShieldCheck size={19} />
          </span>
          <div>
            <strong>estructura segura</strong>
            <span>Guía educativa de daño sísmico</span>
          </div>
        </div>

        <div className="footer-links">
          <button onClick={() => onNavigate('nsr')}>Marco NSR-10</button>
          <button onClick={() => onNavigate('diagnosis')}>Evaluación guiada</button>
          <button onClick={() => onNavigate('about')}>Sobre la guía</button>
        </div>

        <div className="footer-links footer-social">
          <a
            href="https://github.com/jclosadab1996"
            target="_blank"
            rel="noopener noreferrer"
          >
            Mi perfil GitHub
          </a>
          <a
            href="https://github.com/jclosadab1996/Patologias_NSR10"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contribuir al proyecto
          </a>
        </div>

        <div className="footer-note">
          Información orientativa
          <br />
          para propietarios
        </div>
      </div>
    </footer>
  );
}