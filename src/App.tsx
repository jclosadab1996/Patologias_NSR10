import { useState } from 'react';
import type { StructuralElement, View } from '@/types';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { StatsStrip } from '@/components/StatsStrip';
import { ElementsSection } from '@/components/ElementsSection';
import { Footer } from '@/components/Footer';
import { ElementDetail } from '@/components/ElementDetail';
import { DiagnosisWizard } from '@/components/DiagnosisWizard';
import { NsrPage } from '@/components/NsrPage';
import { AboutPage } from '@/components/AboutPage';
import { NoticeBar } from '@/components/NoticeBar';

function App() {
  const [view, setView] = useState<View>('home');
  const [selectedElement, setSelectedElement] = useState<StructuralElement | null>(null);

  const navigate = (nextView: View) => {
    setView(nextView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openElement = (element: StructuralElement) => {
    setSelectedElement(element);
    navigate('element');
  };

  const renderPage = () => {
    if (view === 'element' && selectedElement) return <ElementDetail element={selectedElement} onBack={() => navigate('home')} onNavigate={navigate} />;
    if (view === 'diagnosis') return <DiagnosisWizard onNavigate={navigate} onSelectElement={openElement} />;
    if (view === 'nsr') return <NsrPage onBack={() => navigate('home')} onNavigate={navigate} />;
    if (view === 'about') return <AboutPage onBack={() => navigate('home')} onNavigate={navigate} />;
    return <><NoticeBar /><Hero onNavigate={navigate} /><StatsStrip /><ElementsSection onSelect={openElement} onNavigate={navigate} /></>;
  };

  return <div className="app-shell"><Header activeView={view} onNavigate={navigate} />{renderPage()}<Footer onNavigate={navigate} /></div>;
}

export default App;
