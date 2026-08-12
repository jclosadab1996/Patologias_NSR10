import { ArrowLeft, ArrowRight, CheckCircle2, CircleAlert, Home, RotateCcw, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';
import { structuralElements } from '@/data';
import type { DamageLevelId, StructuralElement, View } from '@/types';

interface DiagnosisWizardProps { onNavigate: (view: View) => void; onSelectElement: (element: StructuralElement) => void; }

export function DiagnosisWizard({ onNavigate, onSelectElement }: DiagnosisWizardProps) {
  const [selectedElement, setSelectedElement] = useState<StructuralElement | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<DamageLevelId[]>([]);
  const [result, setResult] = useState<DamageLevelId | null>(null);

  const question = selectedElement?.diagnosisQuestions[step];
  const resultLevel = useMemo(() => selectedElement?.damageLevels.find((level) => level.id === result) ?? null, [selectedElement, result]);

  const startElement = (element: StructuralElement) => { setSelectedElement(element); setStep(0); setAnswers([]); setResult(null); };
  const answer = (level: DamageLevelId) => { const next = [...answers, level]; setAnswers(next); if (selectedElement && step === selectedElement.diagnosisQuestions.length - 1) { const priority: DamageLevelId[] = ['riesgoExtremo', 'riesgoAlto', 'moderado', 'leve']; setResult(priority.find((candidate) => next.includes(candidate)) ?? level); } else setStep(step + 1); };
  const reset = () => { setSelectedElement(null); setStep(0); setAnswers([]); setResult(null); };

  if (resultLevel && selectedElement) return <main className="wizard-page"><div className="wizard-shell"><button className="back-link dark" onClick={reset}><RotateCcw size={15} /> Nueva evaluación</button><div className="result-card"><div className="result-top"><div className={`result-symbol ${resultLevel.id}`}><CheckCircle2 size={31} /></div><div><span className="mini-label">RESULTADO ORIENTATIVO · {selectedElement.name.toUpperCase()}</span><h1>Nivel de daño: <em>{resultLevel.name}</em></h1><p>{resultLevel.habitability}</p></div></div><div className={`result-alert ${resultLevel.id}`}><CircleAlert size={19} /><span>{resultLevel.actionMessage}</span></div><div className="result-grid"><div><span className="mini-label">QUÉ SIGNIFICA</span><p>{resultLevel.failureType}</p></div><div><span className="mini-label">QUÉ HACER AHORA</span><p>{resultLevel.nsr10Recommendation}</p></div></div><div className="result-actions"><button className="button button-dark" onClick={() => onSelectElement(selectedElement)}>Ver guía completa de {selectedElement.shortName} <ArrowRight size={16} /></button><button className="button button-outline" onClick={() => onNavigate('home')}><Home size={16} /> Volver al inicio</button></div></div><div className="wizard-disclaimer"><ShieldCheck size={16} /> Este resultado es una orientación educativa basada en tus respuestas. No reemplaza una inspección estructural profesional.</div></div></main>;

  if (!selectedElement) return <main className="wizard-page"><div className="wizard-shell"><button className="back-link dark" onClick={() => onNavigate('home')}><ArrowLeft size={15} /> Volver al inicio</button><div className="wizard-intro"><div className="eyebrow"><span className="eyebrow-line" /> EVALUACIÓN PASO A PASO</div><h1>Empieza por elegir<br /><em>un elemento.</em></h1><p>Observa tu vivienda con calma. Te haremos tres preguntas sencillas sobre cada elemento.</p></div><div className="wizard-element-grid">{structuralElements.map((element) => <button key={element.id} className="wizard-element" onClick={() => startElement(element)}><img src={element.imageUrl} alt="" /><span>{element.shortName}</span><ArrowRight size={16} /></button>)}</div></div></main>;

  return <main className="wizard-page"><div className="wizard-shell narrow"><button className="back-link dark" onClick={reset}><ArrowLeft size={15} /> Cambiar elemento</button><div className="wizard-progress"><span>0{step + 1}</span><div><div className="progress-track"><span style={{ width: `${((step + 1) / selectedElement.diagnosisQuestions.length) * 100}%` }} /></div><small>Pregunta {step + 1} de {selectedElement.diagnosisQuestions.length}</small></div></div><div className="question-card"><div className="question-element"><img src={selectedElement.imageUrl} alt="" /><span>{selectedElement.shortName}</span></div><h1>{question?.question}</h1><p>{question?.description}</p><div className="answer-list">{question?.options.map((option) => <button key={option.label} className="answer-option" onClick={() => answer(option.leadsTo)}><span>{option.label}</span><ArrowRight size={17} /></button>)}</div></div><div className="wizard-tip"><CircleAlert size={15} /> No necesitas medir con precisión. Elige la opción que más se parezca a lo que observas.</div></div></main>;
}
