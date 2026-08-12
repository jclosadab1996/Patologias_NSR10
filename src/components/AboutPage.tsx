import { ArrowLeft, HeartHandshake, ShieldCheck } from "lucide-react";
import type { View } from "@/types";

interface AboutPageProps {
  onBack: () => void;
  onNavigate: (view: View) => void;
}
export function AboutPage({ onBack, onNavigate }: AboutPageProps) {
  return (
    <main className="about-page">
      <div className="section-shell">
        <button className="back-link dark" onClick={onBack}>
          <ArrowLeft size={15} /> Volver al inicio
        </button>
        <div className="about-layout">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> SOBRE ESTA GUÍA
            </div>
            <h1>
              Entender el riesgo
              <br />
              <em>es el primer paso.</em>
            </h1>
            <p>
              Esta guía nace para acercar el lenguaje de la ingeniería
              estructural a las personas que habitan sus viviendas. La
              información está organizada para ayudarte a observar, comparar y
              decidir cuándo buscar una evaluación profesional.
            </p>
            <button
              className="button button-dark"
              onClick={() => onNavigate("diagnosis")}
            >
              Evaluar mi vivienda <span>→</span>
            </button>
          </div>
          <div className="about-card">
            <HeartHandshake size={25} />
            <h2>Seguridad antes que certeza</h2>
            <p>
              Una evaluación visual nunca reemplaza a un profesional. Su
              propósito es que puedas reconocer señales importantes, actuar con
              prudencia y comunicar mejor lo que ves.
            </p>
            <div>
              <ShieldCheck size={17} />
              <span>Basada en principios de evaluación post-sismo NSR-10</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
