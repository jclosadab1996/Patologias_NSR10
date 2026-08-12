export type DamageLevelId = 'leve' | 'moderado' | 'riesgoAlto' | 'riesgoExtremo';

export interface DamageLevel {
  id: DamageLevelId;
  name: string;
  shortName: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  description: string;
  plainLanguage: string;
  visualCharacteristics: string[];
  failureType: string;
  futureBehavior: string;
  nsr10Reference: string;
  nsr10Article: string;
  nsr10Recommendation: string;
  actionMessage: string;
  habitability: string;
  interventionUrgency: 'inmediata' | 'corta' | 'media' | 'monitoreo';
  visualSpec: {
    type: 'fotografia' | 'esquema' | 'comparativa';
    description: string;
  };
  schematicType: string;
}

export interface DiagnosisQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    label: string;
    leadsTo: DamageLevelId;
  }[];
}

export interface StructuralElement {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  imageQuery: string;
  imageUrl: string;
  role: string;
  damageLevels: DamageLevel[];
  diagnosisQuestions: DiagnosisQuestion[];
}

export type View = 'home' | 'element' | 'diagnosis' | 'nsr' | 'about';
