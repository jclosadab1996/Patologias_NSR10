import { CircleAlert, X } from 'lucide-react';
import { useState } from 'react';
export function NoticeBar() { const [visible, setVisible] = useState(true); if (!visible) return null; return <div className="notice-bar"><div><CircleAlert size={16} /><span><strong>Ante un daño visible, actúa con prudencia.</strong> Si observas deformaciones, desprendimientos o grietas amplias, aléjate y solicita evaluación profesional.</span></div><button onClick={() => setVisible(false)} aria-label="Cerrar aviso"><X size={16} /></button></div>; }
