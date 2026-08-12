import { BookOpen, Camera, ShieldCheck } from 'lucide-react';

export function StatsStrip() {
  const stats = [
    { icon: <Camera size={20} />, value: '06', label: 'Elementos estructurales', tone: 'blue' },
    { icon: <ShieldCheck size={20} />, value: '04', label: 'Niveles de daño', tone: 'green' },
    { icon: <BookOpen size={20} />, value: 'NSR-10', label: 'Criterio normativo', tone: 'sand' },
  ];
  return <div className="stats-strip">{stats.map((stat) => <div className={`stat-item ${stat.tone}`} key={stat.label}><div className="stat-icon">{stat.icon}</div><div><strong>{stat.value}</strong><span>{stat.label}</span></div></div>)}</div>;
}
