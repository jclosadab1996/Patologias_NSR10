import type { StructuralElement, DamageLevel } from './types';

const commonDamageLevels = (overrides: Partial<Record<string, Partial<DamageLevel>>>): DamageLevel[] => {
  const base: DamageLevel[] = [
    {
      id: 'leve',
      name: 'Leve',
      shortName: 'Leve',
      color: '#22c55e',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: 'ShieldCheck',
      description: 'Daño superficial que no compromete la capacidad estructural.',
      plainLanguage: 'Ves una marca fina, como una línea de lápiz, pero la pieza sigue firme y en su lugar.',
      visualCharacteristics: [],
      failureType: '',
      futureBehavior: '',
      nsr10Reference: '',
      nsr10Article: 'A.10.2 — Evaluación preliminar',
      nsr10Recommendation: '',
      actionMessage: '',
      habitability: '',
      interventionUrgency: 'monitoreo',
      visualSpec: { type: 'fotografia', description: '' },
      schematicType: '',
    },
    {
      id: 'moderado',
      name: 'Moderado',
      shortName: 'Moderado',
      color: '#f59e0b',
      textColor: 'text-amber-700',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: 'AlertTriangle',
      description: 'Daño que requiere revisión técnica pero no implica riesgo inminente.',
      plainLanguage: 'La marca ya atraviesa parte del elemento. No significa que vaya a caer ahora, pero conviene que un profesional la revise.',
      visualCharacteristics: [],
      failureType: '',
      futureBehavior: '',
      nsr10Reference: '',
      nsr10Article: 'A.10.3 — Evaluación detallada',
      nsr10Recommendation: '',
      actionMessage: '',
      habitability: '',
      interventionUrgency: 'media',
      visualSpec: { type: 'fotografia', description: '' },
      schematicType: '',
    },
    {
      id: 'riesgoAlto',
      name: 'Riesgo Alto',
      shortName: 'Riesgo Alto',
      color: '#f97316',
      textColor: 'text-orange-700',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      icon: 'AlertOctagon',
      description: 'Daño severo que compromete la capacidad estructural. Requiere intervención técnica pronta.',
      plainLanguage: 'El elemento ya está trabajando con menos seguridad. Aleja cargas o personas de la zona y pide una revisión prioritaria.',
      visualCharacteristics: [],
      failureType: '',
      futureBehavior: '',
      nsr10Reference: '',
      nsr10Article: 'A.10.3 — Evaluación detallada',
      nsr10Recommendation: '',
      actionMessage: '',
      habitability: '',
      interventionUrgency: 'corta',
      visualSpec: { type: 'fotografia', description: '' },
      schematicType: '',
    },
    {
      id: 'riesgoExtremo',
      name: 'Riesgo Extremo',
      shortName: 'Riesgo Extremo',
      color: '#dc2626',
      textColor: 'text-red-700',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: 'AlertCircle',
      description: 'Daño crítico con riesgo de colapso. Evacuar y restringir acceso inmediatamente.',
      plainLanguage: 'Hay señales de posible falla. Sal de la zona y no vuelvas a entrar hasta que un profesional confirme que es seguro.',
      visualCharacteristics: [],
      failureType: '',
      futureBehavior: '',
      nsr10Reference: '',
      nsr10Article: 'A.10.4 — Evaluación post-sismo',
      nsr10Recommendation: '',
      actionMessage: '',
      habitability: '',
      interventionUrgency: 'inmediata',
      visualSpec: { type: 'fotografia', description: '' },
      schematicType: '',
    },
  ];
  return base.map((level) => {
    const override = overrides[level.id];
    return override ? { ...level, ...override } : level;
  });
};

export const structuralElements: StructuralElement[] = [
  {
    id: 'columnas',
    name: 'Columnas',
    shortName: 'Columnas',
    description:
      'Son los pilares verticales de concreto reforzado que sostienen el peso de la edificación y transmiten las cargas a la cimentación. Son el elemento más crítico: si una columna falla, el edificio puede colapsar.',
    icon: 'Columns3',
    imageQuery: 'concrete columns construction',
    imageUrl: 'https://images.pexels.com/photos/32777399/pexels-photo-32777399.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Soportar las cargas verticales (peso) de la edificación y resistir fuerzas horizontales durante un sismo. Son la "columna vertebral" de la estructura.',
    damageLevels: commonDamageLevels({
      leve: {
        description:
          'Grietas finas en la superficie del concreto, sin exposición del acero de refuerzo. El elemento conserva su forma y capacidad original.',
        visualCharacteristics: [
          'Grietas capilares menores a 0.3 mm de ancho',
          'Fisuras superficiales en el recubrimiento de concreto',
          'Sin desplome o inclinación visible',
          'No hay exposición del acero de refuerzo',
          'No hay aplastamiento del concreto',
        ],
        failureType:
          'No representa una falla estructural. Son fisuras por retracción de fraguado, cambios térmicos o asentamientos menores.',
        futureBehavior:
          'Bajo un sismo futuro, la columna mantiene su capacidad de carga. Las grietas capilares no progresan significativamente.',
        nsr10Reference:
          'NSR-10 A.10.2.4: Edificios con daños ligeros pueden continuar en uso. Se requiere inspección visual y monitoreo.',
        nsr10Recommendation:
          'Reparación cosmética con sellado de grietas. Monitorear evolución cada 6 meses. No requiere evacuación.',
        actionMessage:
          'Su vivienda está en condiciones seguras. Las grietas son superficiales y no afectan la estructura. Selle las grietas y monitoree que no crezcan.',
        habitability: 'Habitable sin restricciones',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía macro de grieta capilar junto a una moneda para escala. Esquema que muestra la sección transversal de la columna con grieta superficial en el recubrimiento.',
        },
        schematicType: 'column-leve',
      },
      moderado: {
        description:
          'Grietas visibles que cruzan el núcleo de la columna, posible exposición parcial del acero. Se observa pérdida de recubrimiento pero el núcleo mantiene integridad.',
        visualCharacteristics: [
          'Grietas de 0.3 mm a 1.0 mm de ancho',
          'Grietas diagonales o verticales que atraviesan la sección',
          'Posible exposición parcial del acero longitudinal',
          'Leve desplome (menos de 1/500 de la altura)',
          'Estallido del recubrimiento de concreto en zonas localizadas',
        ],
        failureType:
          'Inicio de degradación por flexión o flexocompresión. Puede haber pérdida parcial de capacidad de carga del 10-20%.',
        futureBehavior:
          'Bajo un sismo moderado a fuerte, las grietas pueden propagarse y el acero expuesto puede corroerse. Existe riesgo de pérdida progresiva de capacidad.',
        nsr10Reference:
          'NSR-10 A.10.3.2: Requiere evaluación detallada por profesional calificado. Determinar capacidad residual y necesidad de reforzamiento.',
        nsr10Recommendation:
          'Reparación con epóxico estructural, restitución de recubrimiento. Evaluación por ingeniero estructural en plazo no mayor a 3 meses.',
        actionMessage:
          'Su vivienda requiere revisión por un ingeniero estructural en los próximos meses. El daño es reparable, pero no debe ignorarse. Programe una evaluación técnica.',
        habitability: 'Habitable con monitoreo técnico',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de caso real mostrando grietas diagonales en columna con regla graduada para medir abertura. Esquema de sección transversal mostrando grieta penetrando al núcleo.',
        },
        schematicType: 'column-moderado',
      },
      riesgoAlto: {
        description:
          'Grietas anchas y penetrantes, exposición significativa del acero, aplastamiento del concreto en zonas críticas. La columna ha perdido una parte importante de su capacidad.',
        visualCharacteristics: [
          'Grietas mayores a 1.0 mm de ancho',
          'Aplastamiento del concreto núcleo (confinamiento roto)',
          'Acero longitudinal expuesto y posiblemente pandeado',
          'Estribos rotos o separados (pérdida de confinamiento)',
          'Desplome visible mayor a 1/250 de la altura',
          'Grietas en forma de X características de falla por corte',
        ],
        failureType:
          'Falla por flexocompresión o corte. La columna ha perdido 30-50% de su capacidad original. Riesgo de falla frágil bajo nueva solicitación sísmica.',
        futureBehavior:
          'Bajo un sismo fuerte, la columna puede fallar de forma frágil (súbita), provocando el colapso parcial o total del entrepiso. No es seguro ante un evento sísmico significativo.',
        nsr10Reference:
          'NSR-10 A.10.3.4: Edificios con daños estructurales severos requieren evaluación detallada urgente. Posible restricción de uso parcial o total.',
        nsr10Recommendation:
          'Reforzamiento estructural obligatorio (encamisado con concreto, fibra de carbono, o sustitución del elemento). Restringir uso del entrepiso afectado hasta intervención.',
        actionMessage:
          'Su vivienda requiere evaluación estructural urgente y reforzamiento. Restrinja el uso de las áreas cercanas a la columna dañada. Contacte a un ingeniero inmediatamente.',
        habitability: 'Habitabilidad restringida. Posible evacuación parcial.',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de columna con grietas en X y acero expuesto. Comparativa lado a lado: columna sana vs columna con daño alto. Esquema mostrando pandeo de acero longitudinal y rotura de estribos.',
        },
        schematicType: 'column-riesgoAlto',
      },
      riesgoExtremo: {
        description:
          'Columna al borde del colapso: acero pandeado severamente, concreto aplastado y desprendido, pérdida de sección transversal, desplome crítico. Riesgo inminente de falla.',
        visualCharacteristics: [
          'Concreto desprendido masivamente, núcleo expuesto',
          'Acero longitudinal pandeado severamente (fuera de posición)',
          'Estribos completamente rotos o ausentes',
          'Sección transversal reducida por aplastamiento',
          'Desplome mayor a 1/100 de la altura',
          'Posible separación de la viga o losa superior',
          'Asentamiento del entrepiso superior',
        ],
        failureType:
          'Falla inminente por pérdida total de capacidad. La columna ya no puede soportar las cargas gravitacionales. Colapso progresivo en progreso.',
        futureBehavior:
          'La columna puede colapsar en cualquier momento, incluso sin un nuevo sismo. Bajo cualquier solicitación adicional, el colapso es casi seguro.',
        nsr10Reference:
          'NSR-10 A.10.4.3: Evacuación inmediata. Edificación clasificada como insegura. Prohibir acceso hasta evaluación y demolición o reforzamiento mayor.',
        nsr10Recommendation:
          'Evacuación inmediata. Apuntalamiento de emergencia. Evaluación por profesional para determinar si es recuperable o requiere demolición.',
        actionMessage:
          'PELIGRO INMEDIATO. Evacue la vivienda ahora. No regrese hasta que un ingeniero estructural certificado evalúe la edificación. La columna puede colapsar en cualquier momento.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de columna severamente dañada al borde del colapso. Esquema mostrando sección con acero pandeado, concreto desprendido y pérdida de capacidad de carga.',
        },
        schematicType: 'column-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      {
        id: 'col-q1',
        question: '¿Qué tipo de grietas observa en la columna?',
        description: 'Observe la superficie del concreto y identifique el patrón de grietas más representativo.',
        options: [
          { label: 'Grietas muy finas como un cabello, apenas visibles', leadsTo: 'leve' },
          { label: 'Grietas visibles que cruzan la columna, de menos de 1 mm', leadsTo: 'moderado' },
          { label: 'Grietas anchas en forma de X, con concreto astillado', leadsTo: 'riesgoAlto' },
          { label: 'Concreto desprendido, acero doblado, columna deformada', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'col-q2',
        question: '¿Se ve el acero de refuerzo (varillas metálicas)?',
        description: 'El acero de refuerzo son las varillas metálicas dentro del concreto. Si son visibles, el daño es significativo.',
        options: [
          { label: 'No, el concreto cubre todo el acero', leadsTo: 'leve' },
          { label: 'Se ve una pequeña sección de acero expuesta', leadsTo: 'moderado' },
          { label: 'Acero visible y posiblemente doblado', leadsTo: 'riesgoAlto' },
          { label: 'Acero muy expuesto, doblado y deformado', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'col-q3',
        question: '¿La columna está vertical o se inclina?',
        description: 'Mire la columna de abajo hacia arriba. ¿Está perfectamente recta o se desploma hacia un lado?',
        options: [
          { label: 'Está recta, sin inclinación', leadsTo: 'leve' },
          { label: 'Leve inclinación, apenas perceptible', leadsTo: 'moderado' },
          { label: 'Inclinación claramente visible', leadsTo: 'riesgoAlto' },
          { label: 'Inclinación severa o desplome evidente', leadsTo: 'riesgoExtremo' },
        ],
      },
    ],
  },
  {
    id: 'muros',
    name: 'Muros de Mampostería',
    shortName: 'Muros',
    description:
      'Son los muros de ladrillo o bloque que además de dividir espacios pueden actuar como elementos resistentes ante sismos. En viviendas de uno y dos pisos, los muros de mampostería son el principal sistema de resistencia sísmica.',
    icon: 'BrickWall',
    imageQuery: 'cracked brick masonry wall',
    imageUrl: 'https://images.pexels.com/photos/31844481/pexels-photo-31844481.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Resistir las fuerzas horizontales del sismo y transmitirlas a la cimentación. Actúan como "muros de corte" que dan rigidez a la edificación.',
    damageLevels: commonDamageLevels({
      leve: {
        description:
          'Grietas finas en el revoque o acabado superficial. El muro de mampostería estructural está intacto. No hay separación entre muro y estructura.',
        visualCharacteristics: [
          'Grietas en el revoque o pañete menores a 0.5 mm',
          'Fisuras verticales u horizontales aisladas',
          'No hay grietas que crucen las juntas de mortero',
          'No hay separación entre muro y vigas/columnas',
          'No hay desplome del muro',
        ],
        failureType:
          'No representa falla estructural. Son fisuras en el acabado superficial por retracción del mortero o asentamiento diferencial menor.',
        futureBehavior:
          'El muro mantiene su capacidad de resistencia sísmica. Las fisuras superficiales no afectan el comportamiento estructural.',
        nsr10Reference:
          'NSR-10 A.10.2.4: Daños no estructurales. Continuar uso normal. Reparación cosmética.',
        nsr10Recommendation:
          'Raspar y rellenar grietas con mortero. Pintar. No requiere intervención estructural.',
        actionMessage:
          'Su vivienda está segura. Las grietas son solo en el acabado superficial y no afectan la estructura. Repárelas cosméticamente.',
        habitability: 'Habitable sin restricciones',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de muro con fisuras finas en el pañete. Esquema mostrando capa de revoque con grieta superficial sobre mampostería intacta.',
        },
        schematicType: 'wall-leve',
      },
      moderado: {
        description:
          'Grietas que penetran la mampostería (no solo el revoque). Posible separación leve entre muro y elementos de concreto. El muro aún resiste pero su capacidad está reducida.',
        visualCharacteristics: [
          'Grietas de 0.5 mm a 3 mm que atraviesan ladrillos o bloques',
          'Grietas escalonadas siguiendo las juntas de mortero',
          'Separación menor a 5 mm entre muro y viga/columna',
          'Posibles grietas diagonales aisladas',
          'No hay desplome significativo',
        ],
        failureType:
          'Inicio de falla por corte o flexión en el muro. La capacidad de resistencia sísmica del muro está reducida en 15-25%.',
        futureBehavior:
          'Bajo un sismo moderado, las grietas pueden propagarse. El muro puede perder capacidad de resistencia sísmica progresivamente.',
        nsr10Reference:
          'NSR-10 A.10.3.2: Requiere evaluación detallada. Determinar si el muro es portante y su capacidad residual.',
        nsr10Recommendation:
          'Inyección de grietas con epóxico. Reposición de tramos de mampostería dañada. Evaluación por profesional en 3 meses.',
        actionMessage:
          'Su vivienda requiere revisión técnica. Las grietas han penetrado la mampostería y reducen la resistencia sísmica. Contacte a un ingeniero para evaluar y reparar.',
        habitability: 'Habitable con seguimiento técnico',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de muro con grietas escalonadas en juntas de mortero. Esquema mostrando grieta diagonal penetrando ladrillos. Comparativa: grieta en revoque vs grieta en mampostería.',
        },
        schematicType: 'wall-moderado',
      },
      riesgoAlto: {
        description:
          'Grietas diagonales amplias que cruzan toda la altura del muro, separación significativa entre muro y estructura, posibles desplomes. El muro ha perdido gran parte de su capacidad de resistencia.',
        visualCharacteristics: [
          'Grietas diagonales mayores a 3 mm de ancho',
          'Grietas en forma de X (características de falla por corte)',
          'Separación mayor a 10 mm entre muro y vigas/columnas',
          'Ladrillos o bloques fracturados y desplazados',
          'Desplome visible del muro',
          'Posible aplastamiento de esquinas',
        ],
        failureType:
          'Falla por corte del muro. La capacidad de resistencia sísmica del muro está reducida en 40-60%. El muro puede no contribuir a la resistencia en el próximo sismo.',
        futureBehavior:
          'Bajo un sismo fuerte, el muro puede colapsar o desprenderse, perdiendo su función de resistencia. La edificación queda con menor capacidad sísmica global.',
        nsr10Reference:
          'NSR-10 A.10.3.4: Daño estructural severo. Requiere evaluación detallada urgente y posible restricción de uso.',
        nsr10Recommendation:
          'Reconstrucción del muro o reforzamiento (repello estructural, malla electrosoldada). Evaluación urgente por ingeniero. Posible evacuación parcial.',
        actionMessage:
          'Su vivienda tiene daño estructural severo en los muros. Requiere evaluación y reforzamiento urgente. Evite permanecer cerca del muro dañado y contacte a un ingeniero estructural de inmediato.',
        habitability: 'Habitabilidad restringida. Evacuar zonas cercanas al muro dañado.',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de muro con grietas en X amplias. Esquema mostrando patrón de grietas diagonales por corte sísmico. Comparativa lado a lado: muro sano vs muro con falla por corte.',
        },
        schematicType: 'wall-riesgoAlto',
      },
      riesgoExtremo: {
        description:
          'Muro al borde del colapso o ya parcialmente colapsado. Grietas masivas, desplazamiento de paneles enteros, separación total de la estructura. Riesgo de caída inminente.',
        visualCharacteristics: [
          'Muro desplazado fuera de su plano (pandeo)',
          'Separación total de la estructura (columnas/vigas)',
          'Colapso parcial del muro (ladrillos caídos)',
          'Grietas mayores a 10 mm con desplazamiento',
          'Desplome severo con riesgo de vuelco',
          'Posible daño en entrepiso por pérdida de apoyo',
        ],
        failureType:
          'Falla total del muro. Ha perdido su capacidad de resistencia y puede colapsar bajo su propio peso o ante cualquier solicitación.',
        futureBehavior:
          'El muro puede colapsar en cualquier momento. La edificación ha perdido un elemento de resistencia sísmica crítico, aumentando el riesgo global de colapso.',
        nsr10Reference:
          'NSR-10 A.10.4.3: Evacuación inmediata. Clasificación como insegura. Apuntalamiento y evaluación de estabilidad global.',
        nsr10Recommendation:
          'Evacuación inmediata. Apuntalamiento de emergencia del muro y áreas adyacentes. Reconstrucción o refuerzo mayor. Evaluación de estabilidad global de la edificación.',
        actionMessage:
          'PELIGRO INMEDIATO. El muro puede colapsar en cualquier momento. Evacue la vivienda y no se acerque al muro dañado. Contacte a un ingeniero estructural de emergencia.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de muro con pandeo y colapso parcial. Esquema mostrando muro desplazado fuera de plano con riesgo de vuelco.',
        },
        schematicType: 'wall-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      {
        id: 'mur-q1',
        question: '¿Las grietas están solo en el acabado (pañete/revoque) o penetran los ladrillos?',
        description: 'Raspe suavemente la zona dañada. Si la grieta continúa en el ladrillo, el daño es estructural.',
        options: [
          { label: 'Solo en el pañete o pintura', leadsTo: 'leve' },
          { label: 'Penetra ladrillos pero son finas', leadsTo: 'moderado' },
          { label: 'Grietas anchas que cruzan los ladrillos', leadsTo: 'riesgoAlto' },
          { label: 'Ladrillos caídos o muro deformado', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'mur-q2',
        question: '¿Qué patrón tienen las grietas?',
        description: 'El patrón de las grietas indica el tipo de fuerza que sufrió el muro.',
        options: [
          { label: 'Verticales u horizontales finas y aisladas', leadsTo: 'leve' },
          { label: 'Escalonadas siguiendo las juntas de mortero', leadsTo: 'moderado' },
          { label: 'Diagonales amplias o en forma de X', leadsTo: 'riesgoAlto' },
          { label: 'Grietas masivas con muro desplazado', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'mur-q3',
        question: '¿Hay separación entre el muro y las columnas o vigas?',
        description: 'Observe la unión entre el muro y los elementos de concreto. ¿Están separados?',
        options: [
          { label: 'No hay separación', leadsTo: 'leve' },
          { label: 'Separación menor, menos de 5 mm', leadsTo: 'moderado' },
          { label: 'Separación visible, más de 1 cm', leadsTo: 'riesgoAlto' },
          { label: 'Separación total, muro desprendido', leadsTo: 'riesgoExtremo' },
        ],
      },
    ],
  },
  {
    id: 'vigas',
    name: 'Vigas',
    shortName: 'Vigas',
    description:
      'Son los elementos horizontales de concreto reforzado que soportan los entrepisos y transmiten las cargas a las columnas. Las vigas son fundamentales para el comportamiento dúctil del edificio ante sismos.',
    icon: 'MinusSquare',
    imageQuery: 'concrete beam construction rebar',
    imageUrl: 'https://images.pexels.com/photos/14546924/pexels-photo-14546924.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Soportar las cargas del entrepiso y transmitirlas a las columnas. En sismo, las vigas forman "marcos dúctiles" que disipan energía mediante rotaciones inelásticas en sus extremos.',
    damageLevels: commonDamageLevels({
      leve: {
        description:
          'Grietas finas de flexión en la zona central de la viga. Sin grietas diagonales de corte. La viga conserva su capacidad total.',
        visualCharacteristics: [
          'Grietas de flexión menores a 0.3 mm en la mitad de la luz',
          'Fisuras verticales en la cara inferior de la viga',
          'Sin grietas diagonales',
          'Sin exposición de acero',
          'No hay deflexión visible',
        ],
        failureType:
          'No representa falla estructural. Son fisuras de flexión que ocurren bajo cargas normales de servicio.',
        futureBehavior:
          'La viga mantiene su capacidad. Bajo sismo futuro, las grietas no progresan significativamente. El comportamiento dúctil se conserva.',
        nsr10Reference:
          'NSR-10 A.10.2.4: Daños ligeros. Continuar uso normal. Monitoreo visual periódico.',
        nsr10Recommendation:
          'Sellado de grietas. Monitoreo visual cada 6 meses. No requiere intervención estructural.',
        actionMessage:
          'Su vivienda está segura. Las grietas en las vigas son normales por flexión y no comprometen la estructura. Selle las grietas y monitoree.',
        habitability: 'Habitable sin restricciones',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de viga con grietas finas de flexión en el centro. Esquema mostrando patrón de grietas verticales en zona de momento positivo.',
        },
        schematicType: 'beam-leve',
      },
      moderado: {
        description:
          'Grietas de flexión más anchas y posiblemente grietas diagonales iniciales cerca de los apoyos. Exposición parcial del acero posible. La viga tiene capacidad reducida pero funcional.',
        visualCharacteristics: [
          'Grietas de flexión de 0.3 mm a 1.0 mm',
          'Grietas diagonales iniciales cerca de columnas (menores a 0.5 mm)',
          'Posible exposición parcial del acero inferior',
          'Leve deflexión visible',
          'Posibles fisuras en la unión viga-columna',
        ],
        failureType:
          'Inicio de degradación por flexión y/o corte. La capacidad de la viga está reducida en 15-25%. La ductilidad puede estar afectada.',
        futureBehavior:
          'Bajo un sismo moderado, las grietas pueden propagarse. La capacidad de disipación de energía del marco se reduce, aumentando las demandas en columnas.',
        nsr10Reference:
          'NSR-10 A.10.3.2: Requiere evaluación detallada. Verificar capacidad residual y cumplimiento de jerarquía de resistencia (viga débil, columna fuerte).',
        nsr10Recommendation:
          'Reparación con resina epóxica, restitución de recubrimiento. Evaluación por ingeniero estructural en 3 meses.',
        actionMessage:
          'Su vivienda requiere revisión técnica. Las grietas en las vigas indican daño que necesita reparación. Contacte a un ingeniero para evaluar y reparar.',
        habitability: 'Habitable con seguimiento técnico',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de viga con grietas de flexión y diagonales iniciales. Esquema mostrando patrón de grietas en zona de momento positivo y negativo.',
        },
        schematicType: 'beam-moderado',
      },
      riesgoAlto: {
        description:
          'Grietas diagonales amplias de corte, aplastamiento del concreto en zonas de apoyo, exposición y pandeo del acero. La viga ha perdido capacidad significativa.',
        visualCharacteristics: [
          'Grietas diagonales mayores a 1.0 mm (falla por corte)',
          'Aplastamiento del concreto en zonas de apoyo',
          'Acero longitudinal expuesto y posiblemente pandeado',
          'Estribos rotos o separados (pérdida de confinamiento)',
          'Deflexión visible significativa',
          'Grietas en la unión viga-columna con separación',
        ],
        failureType:
          'Falla por corte o flexión severa. La viga ha perdido 40-60% de su capacidad. Riesgo de falla frágil por corte bajo nueva solicitación.',
        futureBehavior:
          'Bajo un sismo fuerte, la viga puede fallar por corte de forma frágil (súbita), provocando el colapso del entrepiso que soporta. La jerarquía de resistencia del marco está comprometida.',
        nsr10Reference:
          'NSR-10 A.10.3.4: Daño estructural severo. Requiere evaluación detallada urgente. Posible restricción de uso del entrepiso.',
        nsr10Recommendation:
          'Reforzamiento estructural obligatorio (encamisado, fibra de carbono, o refuerzo con acero). Restringir carga del entrepiso. Evaluación urgente.',
        actionMessage:
          'Su vivienda requiere evaluación estructural urgente y reforzamiento de las vigas dañadas. Reduzca las cargas en el entrepiso afectado y contacte a un ingeniero inmediatamente.',
        habitability: 'Habitabilidad restringida. Reducir cargas en el entrepiso.',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de viga con grietas diagonales de corte y acero expuesto. Esquema mostrando patrón de grietas diagonales y aplastamiento en apoyos. Comparativa: viga sana vs viga con falla por corte.',
        },
        schematicType: 'beam-riesgoAlto',
      },
      riesgoExtremo: {
        description:
          'Viga al borde del colapso: concreto desprendido masivamente, acero pandeado severo, pérdida de capacidad de apoyo. Riesgo de caída del entrepiso.',
        visualCharacteristics: [
          'Concreto desprendido en gran parte de la sección',
          'Acero longitudinal y estribos pandeados severamente',
          'Pérdida de apoyo en columna (separación total)',
          'Deflexión severa con posible colapso del entrepiso',
          'Grietas mayores a 5 mm con desplazamiento',
          'Posible asentamiento del entrepiso superior',
        ],
        failureType:
          'Falla inminente por pérdida total de capacidad. La viga no puede soportar las cargas del entrepiso. Colapso progresivo en progreso.',
        futureBehavior:
          'La viga puede colapsar en cualquier momento. El entrepiso que soporta puede caer, provocando colapso progresivo de los pisos inferiores.',
        nsr10Reference:
          'NSR-10 A.10.4.3: Evacuación inmediata. Clasificación como insegura. Apuntalamiento del entrepiso. Prohibir acceso.',
        nsr10Recommendation:
          'Evacuación inmediata. Apuntalamiento de emergencia del entrepiso. Reconstrucción o refuerzo mayor. Evaluación de estabilidad global.',
        actionMessage:
          'PELIGRO INMEDIATO. La viga puede fallar en cualquier momento y el entrepiso puede colapsar. Evacue la vivienda ahora. No regrese hasta evaluación de un ingeniero estructural.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de viga severamente dañada con concreto desprendido y acero pandeado. Esquema mostrando sección con pérdida de apoyo y colapso inminente.',
        },
        schematicType: 'beam-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      {
        id: 'vig-q1',
        question: '¿Qué tipo de grietas observa en la viga?',
        description: 'Las vigas son los elementos horizontales que soportan el techo o entrepiso. Observe el patrón de grietas.',
        options: [
          { label: 'Grietas finas verticales en el centro de la viga', leadsTo: 'leve' },
          { label: 'Grietas visibles, algunas diagonales cerca de las columnas', leadsTo: 'moderado' },
          { label: 'Grietas diagonales anchas con concreto astillado', leadsTo: 'riesgoAlto' },
          { label: 'Concreto desprendido, viga deformada o colapsada', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'vig-q2',
        question: '¿La viga está horizontal o se flexiona visiblemente?',
        description: 'Mire la viga a lo largo. ¿Está recta o se curva hacia abajo en el centro?',
        options: [
          { label: 'Está recta, sin flexión visible', leadsTo: 'leve' },
          { label: 'Leve flexión, apenas perceptible', leadsTo: 'moderado' },
          { label: 'Flexión claramente visible', leadsTo: 'riesgoAlto' },
          { label: 'Flexión severa o colapso parcial', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'vig-q3',
        question: '¿Cómo se ve la unión entre la viga y las columnas?',
        description: 'Observe donde la viga se encuentra con las columnas. Esta unión es crítica para el comportamiento sísmico.',
        options: [
          { label: 'Unión intacta, sin grietas', leadsTo: 'leve' },
          { label: 'Pequeñas fisuras en la unión', leadsTo: 'moderado' },
          { label: 'Grietas anchas con separación visible', leadsTo: 'riesgoAlto' },
          { label: 'Separación total, viga desprendida', leadsTo: 'riesgoExtremo' },
        ],
      },
    ],
  },
  {
    id: 'losas',
    name: 'Losas y Entrepisos',
    shortName: 'Losas',
    description:
      'Son las placas horizontales de concreto que forman los pisos y techos. Soportan las cargas de uso (muebles, personas) y transmiten las fuerzas sísmicas a los muros y marcos.',
    icon: 'Layers',
    imageQuery: 'concrete slab floor ceiling',
    imageUrl: 'https://images.pexels.com/photos/3964862/pexels-photo-3964862.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Soportar las cargas verticales de uso y transmitir las fuerzas sísmicas horizontales a los muros y marcos. Actúan como "diafragma rígido" que integra la estructura.',
    damageLevels: commonDamageLevels({
      leve: {
        description:
          'Grietas finas de retracción en la superficie de la losa. Sin grietas estructurales. La losa conserva su capacidad de diafragma.',
        visualCharacteristics: [
          'Grietas de retracción menores a 0.3 mm (patrón aleatorio)',
          'Fisuras superficiales en el acabado',
          'Sin grietas en la cara inferior (techo del piso inferior)',
          'No hay deflexión visible',
          'No hay separación entre losa y apoyos',
        ],
        failureType:
          'No representa falla estructural. Son grietas por retracción de fraguado del concreto, comunes en losas nuevas.',
        futureBehavior:
          'La losa mantiene su capacidad de diafragma. Las grietas de retracción no progresan bajo sismo.',
        nsr10Reference:
          'NSR-10 A.10.2.4: Daños no estructurales. Continuar uso normal.',
        nsr10Recommendation:
          'Sellado de grietas. No requiere intervención estructural.',
        actionMessage:
          'Su vivienda está segura. Las grietas en la losa son normales por retracción del concreto y no afectan la estructura.',
        habitability: 'Habitable sin restricciones',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de losa con grietas de retracción en patrón aleatorio. Esquema mostrando grietas superficiales en capa de acabado.',
        },
        schematicType: 'slab-leve',
      },
      moderado: {
        description:
          'Grietas más anchas en la superficie, posibles grietas en la cara inferior. Deflexión leve. La losa funciona pero requiere evaluación.',
        visualCharacteristics: [
          'Grietas de 0.3 mm a 1.0 mm en la superficie',
          'Posibles grietas visibles en el techo del piso inferior',
          'Grietas lineales paralelas a los apoyos',
          'Leve deflexión visible',
          'Posibles manchas de humedad asociadas',
        ],
        failureType:
          'Inicio de degradación por flexión. La capacidad de la losa está reducida en 10-20%. La función de diafragma puede estar comprometida parcialmente.',
        futureBehavior:
          'Bajo un sismo fuerte, las grietas pueden propagarse. La deflexión puede aumentar. La transmisión de fuerzas sísmicas puede ser menos eficiente.',
        nsr10Reference:
          'NSR-10 A.10.3.2: Requiere evaluación detallada. Verificar capacidad de diafragma y deflexiones.',
        nsr10Recommendation:
          'Inyección de grietas con epóxico. Evaluación por ingeniero en 3 meses. Verificar deflexiones.',
        actionMessage:
          'Su vivienda requiere revisión técnica. Las grietas en la losa indican daño que necesita evaluación. Contacte a un ingeniero para revisar.',
        habitability: 'Habitable con seguimiento técnico',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de losa con grietas lineales en superficie y techo inferior. Esquema mostrando grietas por flexión en zona de momento positivo.',
        },
        schematicType: 'slab-moderado',
      },
      riesgoAlto: {
        description:
          'Grietas amplias, deflexión significativa, posible exposición de acero. La losa ha perdido capacidad y puede no funcionar como diafragma sísmico.',
        visualCharacteristics: [
          'Grietas mayores a 1.0 mm con posible desplazamiento',
          'Deflexión visible significativa',
          'Grietas en el techo inferior con exposición de acero',
          'Posible separación entre losa y muros/vigas de apoyo',
          'Posibles hundimientos localizados',
          'Grietas perimetrales en la unión con muros',
        ],
        failureType:
          'Falla por flexión o punzonamiento. La capacidad de la losa está reducida en 40-60%. La función de diafragma sísmico está comprometida.',
        futureBehavior:
          'Bajo un sismo fuerte, la losa puede fallar por flexión o punzonamiento. La transmisión de fuerzas sísmicas a muros y marcos puede ser insuficiente, provocando daños en otros elementos.',
        nsr10Reference:
          'NSR-10 A.10.3.4: Daño estructural severo. Requiere evaluación detallada urgente. Restringir cargas.',
        nsr10Recommendation:
          'Reforzamiento estructural (losa adicional, fibra de carbono). Restringir cargas en el entrepiso. Evaluación urgente.',
        actionMessage:
          'Su vivienda requiere evaluación estructural urgente. La losa tiene daño severo que compromete su función estructural. Reduzca las cargas y contacte a un ingeniero inmediatamente.',
        habitability: 'Habitabilidad restringida. Reducir cargas del entrepiso.',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de losa con grietas amplias y deflexión. Esquema mostrando falla por flexión y punzonamiento. Comparativa: losa sana vs losa con deflexión.',
        },
        schematicType: 'slab-riesgoAlto',
      },
      riesgoExtremo: {
        description:
          'Losa al borde del colapso: grietas masivas, hundimiento, exposición severa de acero, posible falla por punzonamiento. Riesgo de caída del entrepiso.',
        visualCharacteristics: [
          'Hundimiento visible de la losa',
          'Grietas mayores a 5 mm con desplazamiento vertical',
          'Acero expuesto y pandeado severamente',
          'Falla por punzonamiento en zona de apoyo',
          'Posible colapso parcial de la losa',
          'Separación total de los apoyos',
        ],
        failureType:
          'Falla inminente por punzonamiento o flexión. La losa no puede soportar las cargas. Colapso del entrepiso en progreso.',
        futureBehavior:
          'La losa puede colapsar en cualquier momento, provocando la caída del entrepiso y posible colapso progresivo.',
        nsr10Reference:
          'NSR-10 A.10.4.3: Evacuación inmediata. Apuntalamiento del entrepiso. Prohibir acceso.',
        nsr10Recommendation:
          'Evacuación inmediata. Apuntalamiento de emergencia. Reconstrucción o refuerzo mayor. Evaluación de estabilidad global.',
        actionMessage:
          'PELIGRO INMEDIATO. La losa puede colapsar en cualquier momento. Evacue la vivienda. No regrese hasta evaluación de un ingeniero estructural.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de losa con hundimiento y falla por punzonamiento. Esquema mostrando colapso inminente del entrepiso.',
        },
        schematicType: 'slab-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      {
        id: 'los-q1',
        question: '¿Qué tipo de grietas observa en el piso o techo?',
        description: 'Observe la superficie del entrepiso. ¿Qué patrón de grietas ve?',
        options: [
          { label: 'Grietas finas al azar, como líneas de cabello', leadsTo: 'leve' },
          { label: 'Grietas lineales paralelas a los muros', leadsTo: 'moderado' },
          { label: 'Grietas anchas con hundimiento visible', leadsTo: 'riesgoAlto' },
          { label: 'Hundimiento severo o colapso parcial', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'los-q2',
        question: '¿El piso o techo está plano o se flexiona?',
        description: 'Mire a lo largo de la superficie del entrepiso. ¿Está plano o se curva hacia abajo?',
        options: [
          { label: 'Está plano, sin flexión', leadsTo: 'leve' },
          { label: 'Leve flexión, apenas visible', leadsTo: 'moderado' },
          { label: 'Flexión claramente visible', leadsTo: 'riesgoAlto' },
          { label: 'Hundimiento severo o colapso', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'los-q3',
        question: '¿Ve grietas en el techo del piso inferior?',
        description: 'Las grietas en la cara inferior de la losa (techo del piso de abajo) indican daño estructural.',
        options: [
          { label: 'No hay grietas en el techo inferior', leadsTo: 'leve' },
          { label: 'Grietas finas visibles', leadsTo: 'moderado' },
          { label: 'Grietas anchas con acero expuesto', leadsTo: 'riesgoAlto' },
          { label: 'Colapso parcial o acero pandeado', leadsTo: 'riesgoExtremo' },
        ],
      },
    ],
  },
  {
    id: 'cimentaciones',
    name: 'Cimentaciones',
    shortName: 'Cimentaciones',
    description:
      'Son la base de la edificación, encargadas de transmitir todas las cargas al suelo. Los daños en cimentaciones son difíciles de observar directamente pero se manifiestan en toda la estructura.',
    icon: 'Shovel',
    imageQuery: 'building foundation excavation',
    imageUrl: 'https://images.pexels.com/photos/36606405/pexels-photo-36606405.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Transmitir todas las cargas de la edificación al suelo de forma segura. Deben resistir sin asentamientos diferenciales que dañen la estructura.',
    damageLevels: commonDamageLevels({
      leve: {
        description:
          'Asentamientos menores uniformes que producen grietas finas en muros y acabados. No hay inclinación visible de la edificación.',
        visualCharacteristics: [
          'Grietas finas en muros del primer piso (menores a 0.5 mm)',
          'Asentamiento uniforme menor a 25 mm',
          'Sin inclinación visible de la edificación',
          'Puertas y ventanas cierran correctamente',
          'No hay grietas en vigas de amarre o cimentación',
        ],
        failureType:
          'Asentamiento elástico normal del suelo bajo las cargas. No representa falla de la cimentación.',
        futureBehavior:
          'Los asentamientos menores se estabilizan con el tiempo. Bajo sismo, la cimentación mantiene su capacidad.',
        nsr10Reference:
          'NSR-10 A.10.2.4: Daños ligeros. Monitoreo de asentamientos. Continuar uso.',
        nsr10Recommendation:
          'Monitoreo de asentamientos con puntos de referencia. Reparación cosmética de grietas. No requiere intervención.',
        actionMessage:
          'Su vivienda está segura. Los asentamientos menores son normales. Monitoree que las grietas no crezcan y selle las fisuras.',
        habitability: 'Habitable sin restricciones',
        visualSpec: {
          type: 'esquema',
          description:
            'Esquema mostrando asentamiento uniforme con grietas finas distribuidas. Diagrama de cimentación con asentamiento menor.',
        },
        schematicType: 'foundation-leve',
      },
      moderado: {
        description:
          'Asentamientos diferenciales que producen grietas en muros y posibles inclinaciones leves. Puertas y ventanas pueden no cerrar correctamente.',
        visualCharacteristics: [
          'Grietas diagonales en muros del primer piso (0.5 a 3 mm)',
          'Asentamiento diferencial de 25 a 50 mm',
          'Leve inclinación visible de la edificación',
          'Puertas y ventanas rozan o no cierran bien',
          'Grietas en pisos y losas del primer nivel',
          'Posibles grietas en vigas de amarre',
        ],
        failureType:
          'Asentamiento diferencial del suelo. La cimentación no está distribuyendo las cargas uniformemente. Capacidad reducida en 15-25%.',
        futureBehavior:
          'Los asentamientos pueden continuar progresivamente. Bajo sismo, la cimentación puede tener comportamiento desigual, amplificando las demandas en algunos elementos.',
        nsr10Reference:
          'NSR-10 A.10.3.2: Requiere evaluación detallada. Estudio geotécnico y estructural de la cimentación.',
        nsr10Recommendation:
          'Estudio geotécnico. Posible recalce o mejoramiento del suelo. Evaluación por ingeniero geotécnico en 3 meses.',
        actionMessage:
          'Su vivienda requiere revisión técnica. Los asentamientos diferenciales están dañando la estructura. Contacte a un ingeniero geotécnico para evaluar la cimentación.',
        habitability: 'Habitable con seguimiento técnico',
        visualSpec: {
          type: 'esquema',
          description:
            'Esquema mostrando asentamiento diferencial con grietas diagonales en muros. Diagrama de cimentación con asentamiento desigual.',
        },
        schematicType: 'foundation-moderado',
      },
      riesgoAlto: {
        description:
          'Asentamientos diferenciales severos con inclinación visible de la edificación, grietas amplias en muros y estructura. La cimentación ha perdido capacidad significativa.',
        visualCharacteristics: [
          'Inclinación visible de la edificación (más de 1/250)',
          'Grietas diagonales amplias en muros (mayores a 3 mm)',
          'Asentamiento diferencial mayor a 50 mm',
          'Puertas y ventanas no cierran',
          'Grietas en columnas y vigas del primer nivel',
          'Posible separación entre cimentación y muros',
          'Grietas en el piso del primer nivel con desplazamiento',
        ],
        failureType:
          'Falla por capacidad portante del suelo o asentamiento diferencial severo. La cimentación no soporta las cargas adecuadamente. Capacidad reducida en 40-60%.',
        futureBehavior:
          'Los asentamientos pueden acelerarse. Bajo sismo, la cimentación puede fallar, provocando inclinación progresiva o colapso de la edificación.',
        nsr10Reference:
          'NSR-10 A.10.3.4: Daño estructural severo. Requiere evaluación detallada urgente. Posible restricción de uso.',
        nsr10Recommendation:
          'Estudio geotécnico urgente. Recalce o mejoramiento del suelo. Posible subexcavación. Evaluación urgente por ingeniero geotécnico y estructural.',
        actionMessage:
          'Su vivienda requiere evaluación urgente de la cimentación. La inclinación y las grietas indican daño severo. Contacte a un ingeniero geotécnico de inmediato.',
        habitability: 'Habitabilidad restringida. Posible evacuación parcial.',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de edificación inclinada con grietas amplias. Esquema mostrando asentamiento diferencial severo y falla por capacidad portante.',
        },
        schematicType: 'foundation-riesgoAlto',
      },
      riesgoExtremo: {
        description:
          'Inclinación severa de la edificación, colapso parcial de cimentación, grietas masivas en toda la estructura. Riesgo de vuelco o colapso total.',
        visualCharacteristics: [
          'Inclinación severa de la edificación (más de 1/100)',
          'Colapso parcial de cimentación visible',
          'Grietas masivas en toda la estructura',
          'Asentamiento diferencial mayor a 100 mm',
          'Posible separación entre cimentación y estructura',
          'Colapso de muros y columnas del primer nivel',
          'Posible vuelco de la edificación',
        ],
        failureType:
          'Falla total de la cimentación. El suelo ha perdido capacidad portante o la cimentación está destruida. Colapso inminente.',
        futureBehavior:
          'La edificación puede colapsar o volcar en cualquier momento. Bajo cualquier solicitación adicional, el colapso es casi seguro.',
        nsr10Reference:
          'NSR-10 A.10.4.3: Evacuación inmediata. Clasificación como insegura. Demolición o reforzamiento mayor.',
        nsr10Recommendation:
          'Evacuación inmediata. Evaluación de estabilidad. Posible demolición o reforzamiento mayor de cimentación.',
        actionMessage:
          'PELIGRO INMEDIATO. La cimentación ha fallado y la edificación puede colapsar. Evacue ahora. No regrese hasta evaluación de un ingeniero.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de edificación con inclinación severa y colapso parcial. Esquema mostrando falla total de cimentación y riesgo de vuelco.',
        },
        schematicType: 'foundation-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      {
        id: 'cim-q1',
        question: '¿La edificación está recta o se inclina hacia un lado?',
        description: 'Observe la edificación desde afuera. ¿Está vertical o se inclina visiblemente?',
        options: [
          { label: 'Está recta, sin inclinación', leadsTo: 'leve' },
          { label: 'Leve inclinación, apenas perceptible', leadsTo: 'moderado' },
          { label: 'Inclinación claramente visible', leadsTo: 'riesgoAlto' },
          { label: 'Inclinación severa o riesgo de vuelco', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'cim-q2',
        question: '¿Las puertas y ventanas cierran correctamente?',
        description: 'Las puertas y ventanas que no cierran bien son un indicador de asentamientos diferenciales.',
        options: [
          { label: 'Todas cierran correctamente', leadsTo: 'leve' },
          { label: 'Algunas rozan o cuesta cerrarlas', leadsTo: 'moderado' },
          { label: 'Varias no cierran o se traban', leadsTo: 'riesgoAlto' },
          { label: 'La mayoría no cierran o se deformaron', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'cim-q3',
        question: '¿Qué tipo de grietas ve en los muros del primer piso?',
        description: 'Las grietas diagonales en muros del primer piso son indicador de problemas de cimentación.',
        options: [
          { label: 'Grietas finas, menores a 0.5 mm', leadsTo: 'leve' },
          { label: 'Grietas diagonales de hasta 3 mm', leadsTo: 'moderado' },
          { label: 'Grietas diagonales amplias, más de 3 mm', leadsTo: 'riesgoAlto' },
          { label: 'Grietas masivas con colapso parcial', leadsTo: 'riesgoExtremo' },
        ],
      },
    ],
  },
  {
    id: 'conexiones',
    name: 'Conexiones Estructurales',
    shortName: 'Conexiones',
    description:
      'Son las uniones entre elementos estructurales: viga-columna, losa-muro, columna-cimentación. Las conexiones son críticas porque si fallan, los elementos individuales no pueden trabajar juntos.',
    icon: 'Link2',
    imageQuery: 'steel beam connection welding',
    imageUrl: 'https://images.pexels.com/photos/13944023/pexels-photo-13944023.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Transferir las fuerzas entre elementos estructurales de forma que actúen como un sistema integral. En sismo, las conexiones viga-columna son las más críticas para el comportamiento dúctil.',
    damageLevels: commonDamageLevels({
      leve: {
        description:
          'Fisuras finas en la unión viga-columna, sin separación. La conexión mantiene su capacidad de transferencia.',
        visualCharacteristics: [
          'Fisuras menores a 0.3 mm en la unión',
          'Sin separación entre elementos',
          'Sin exposición de acero',
          'No hay desplazamiento relativo entre elementos',
          'El nudo mantiene integridad',
        ],
        failureType:
          'No representa falla estructural. Son fisuras iniciales por cambios volumétricos o cargas de servicio.',
        futureBehavior:
          'La conexión mantiene su capacidad. Bajo sismo, el comportamiento del nudo es adecuado.',
        nsr10Reference:
          'NSR-10 A.10.2.4: Daños ligeros. Continuar uso. Monitoreo visual.',
        nsr10Recommendation:
          'Sellado de fisuras. Monitoreo visual. No requiere intervención estructural.',
        actionMessage:
          'Su vivienda está segura. Las fisuras en las uniones son superficiales y no afectan la estructura.',
        habitability: 'Habitable sin restricciones',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de unión viga-columna con fisuras finas. Esquema mostrando nudo con fisuras superficiales.',
        },
        schematicType: 'connection-leve',
      },
      moderado: {
        description:
          'Grietas visibles en la unión, posible separación leve. La conexión puede tener capacidad reducida pero funciona.',
        visualCharacteristics: [
          'Grietas de 0.3 mm a 1.0 mm en la unión',
          'Posible separación menor a 5 mm entre elementos',
          'Grietas diagonales iniciales en el nudo',
          'Posible exposición parcial del acero',
          'Leve desplazamiento relativo entre elementos',
        ],
        failureType:
          'Inicio de degradación del nudo. La capacidad de transferencia de momentos puede estar reducida en 15-25%.',
        futureBehavior:
          'Bajo un sismo moderado, las grietas pueden propagarse. La ductilidad del nudo puede estar afectada, reduciendo la capacidad de disipación de energía.',
        nsr10Reference:
          'NSR-10 A.10.3.2: Requiere evaluación detallada. Verificar capacidad del nudo y cumplimiento de jerarquía de resistencia.',
        nsr10Recommendation:
          'Reparación con epóxico estructural. Evaluación por ingeniero en 3 meses. Posible refuerzo del nudo.',
        actionMessage:
          'Su vivienda requiere revisión técnica. Las uniones entre elementos tienen daño que necesita evaluación. Contacte a un ingeniero para revisar.',
        habitability: 'Habitable con seguimiento técnico',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de unión viga-columna con grietas y separación leve. Esquema mostrando degradación del nudo.',
        },
        schematicType: 'connection-moderado',
      },
      riesgoAlto: {
        description:
          'Grietas amplias en el nudo, separación significativa, exposición de acero. La conexión ha perdido capacidad de transferencia.',
        visualCharacteristics: [
          'Grietas mayores a 1.0 mm en el nudo',
          'Separación mayor a 10 mm entre elementos',
          'Acero expuesto y posiblemente pandeado',
          'Desplazamiento relativo visible entre elementos',
          'Aplastamiento del concreto en el nudo',
          'Posible falla de la losa en zona de apoyo',
        ],
        failureType:
          'Falla del nudo por corte o adherencia. La conexión ha perdido 40-60% de capacidad. La continuidad estructural está comprometida.',
        futureBehavior:
          'Bajo un sismo fuerte, el nudo puede fallar, perdiendo la capacidad de transferir momentos entre viga y columna. Esto puede provocar colapso parcial del marco.',
        nsr10Reference:
          'NSR-10 A.10.3.4: Daño estructural severo. Requiere evaluación detallada urgente. Posible restricción de uso.',
        nsr10Recommendation:
          'Reforzamiento del nudo (encamisado, ángulos de acero, fibra de carbono). Evaluación urgente por ingeniero. Restringir uso.',
        actionMessage:
          'Su vivienda requiere evaluación estructural urgente. Las uniones entre vigas y columnas están severamente dañadas. Contacte a un ingeniero inmediatamente.',
        habitability: 'Habitabilidad restringida. Posible evacuación parcial.',
        visualSpec: {
          type: 'comparativa',
          description:
            'Fotografía de nudo con grietas amplias y acero expuesto. Esquema mostrando falla del nudo y pérdida de continuidad estructural.',
        },
        schematicType: 'connection-riesgoAlto',
      },
      riesgoExtremo: {
        description:
          'Conexión destruida: separación total entre elementos, acero pandeado o roto, concreto desprendido. La continuidad estructural se ha perdido.',
        visualCharacteristics: [
          'Separación total entre viga y columna',
          'Acero longitudinal roto o pandeado severamente',
          'Concreto desprendido masivamente en el nudo',
          'Desplazamiento relativo severo entre elementos',
          'Posible colapso del marco en esa unión',
          'Pérdida de apoyo del entrepiso',
        ],
        failureType:
          'Falla total de la conexión. La continuidad estructural se ha perdido. Los elementos no pueden transferir fuerzas entre sí.',
        futureBehavior:
          'La conexión puede colapsar en cualquier momento. Sin continuidad, el marco no puede resistir fuerzas sísmicas, provocando colapso progresivo.',
        nsr10Reference:
          'NSR-10 A.10.4.3: Evacuación inmediata. Apuntalamiento. Prohibir acceso.',
        nsr10Recommendation:
          'Evacuación inmediata. Apuntalamiento de emergencia. Reconstrucción del nudo o refuerzo mayor. Evaluación de estabilidad global.',
        actionMessage:
          'PELIGRO INMEDIATO. La unión entre elementos estructurales está destruida y puede colapsar. Evacue la vivienda. No regrese hasta evaluación de un ingeniero.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: {
          type: 'fotografia',
          description:
            'Fotografía de nudo destruido con separación total. Esquema mostrando pérdida de continuidad estructural.',
        },
        schematicType: 'connection-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      {
        id: 'con-q1',
        question: '¿Qué observa en la unión entre vigas y columnas?',
        description: 'Observe donde los elementos horizontales (vigas) se encuentran con los verticales (columnas).',
        options: [
          { label: 'Unión intacta, sin grietas', leadsTo: 'leve' },
          { label: 'Grietas visibles en la unión', leadsTo: 'moderado' },
          { label: 'Grietas amplias con separación', leadsTo: 'riesgoAlto' },
          { label: 'Separación total, unión destruida', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'con-q2',
        question: '¿Hay separación visible entre los elementos?',
        description: '¿Se ven espacios o huecos donde los elementos se unen?',
        options: [
          { label: 'No hay separación', leadsTo: 'leve' },
          { label: 'Separación menor, menos de 5 mm', leadsTo: 'moderado' },
          { label: 'Separación visible, más de 1 cm', leadsTo: 'riesgoAlto' },
          { label: 'Separación total, elementos desprendidos', leadsTo: 'riesgoExtremo' },
        ],
      },
      {
        id: 'con-q3',
        question: '¿Se ve el acero en la unión?',
        description: 'Si las varillas metálicas son visibles en la unión, el daño es significativo.',
        options: [
          { label: 'No, el concreto cubre todo', leadsTo: 'leve' },
          { label: 'Acero parcialmente expuesto', leadsTo: 'moderado' },
          { label: 'Acero expuesto y posiblemente doblado', leadsTo: 'riesgoAlto' },
          { label: 'Acero roto o severamente deformado', leadsTo: 'riesgoExtremo' },
        ],
      },
    ],
  },
  {
    id: 'sistemas-aporticados',
    name: 'Sistemas Aporticados',
    shortName: 'Pórticos',
    description:
      'Es un sistema formado por columnas y vigas conectadas entre sí. Estas uniones trabajan como un marco: reciben el movimiento del sismo, se deforman y disipan parte de su energía sin perder estabilidad.',
    icon: 'Frame',
    imageQuery: 'reinforced concrete frame building construction',
    imageUrl: 'https://images.pexels.com/photos/33044594/pexels-photo-33044594.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    role: 'Formar el esqueleto resistente de la vivienda. Las columnas, vigas y sus uniones deben trabajar juntas; el daño en un solo nudo puede afectar todo el marco.',
    damageLevels: commonDamageLevels({
      leve: {
        description: 'Fisuras finas en vigas o columnas, sin deformación visible del marco ni separación en las uniones.',
        plainLanguage: 'El marco tiene pequeñas marcas, pero sigue recto y las vigas todavía descansan bien sobre las columnas.',
        visualCharacteristics: ['Fisuras finas menores a 0.3 mm en vigas o columnas', 'Marco recto, sin inclinación visible', 'Uniones viga-columna cerradas e íntegras', 'Sin concreto desprendido ni acero expuesto', 'Puertas y ventanas funcionan normalmente'],
        failureType: 'No se identifica una falla del sistema aporticado. Son daños superficiales o de servicio.',
        futureBehavior: 'El marco conserva su capacidad de trabajar como conjunto ante un sismo futuro.',
        nsr10Reference: 'NSR-10 A.10.2: Evaluación preliminar. Daños ligeros sin pérdida observable del sistema resistente.',
        nsr10Recommendation: 'Sellar fisuras, registrar fotografías y revisar periódicamente. No requiere evacuación por este hallazgo aislado.',
        actionMessage: 'El marco de su vivienda se ve estable. Selle las fisuras y vigile que no aumenten; si aparecen en varias uniones, solicite una revisión.',
        habitability: 'Habitable sin restricciones',
        visualSpec: { type: 'comparativa', description: 'Esquema de un marco sano junto a un marco con fisuras finas verdes en vigas y columnas. Use una regla o moneda para mostrar la escala.' },
        schematicType: 'frame-leve',
      },
      moderado: {
        description: 'Grietas visibles en varias vigas, columnas o nudos, con leve deformación del marco. La estructura sigue conectada, pero su reserva de seguridad puede haber disminuido.',
        plainLanguage: 'El marco ya no se ve completamente igual: algunas uniones tienen grietas y puede haber una ligera deformación. No lo ignores.',
        visualCharacteristics: ['Grietas de 0.3 a 1 mm en más de una unión', 'Leve desplazamiento lateral del marco', 'Grietas diagonales iniciales en nudos', 'Pequeña separación entre viga y columna', 'Sin pandeo de acero ni aplastamiento importante'],
        failureType: 'Inicio de daño por flexión o corte en el marco. Se reduce la capacidad de disipar energía y de distribuir las fuerzas sísmicas.',
        futureBehavior: 'En otro sismo, las grietas pueden crecer y concentrar el movimiento en algunas columnas o conexiones.',
        nsr10Reference: 'NSR-10 A.10.3: Evaluación detallada del sistema resistente, continuidad de nudos y deriva residual.',
        nsr10Recommendation: 'Solicitar evaluación de un ingeniero estructural, revisar todas las conexiones y reparar o reforzar antes de aumentar cargas.',
        actionMessage: 'El marco necesita una revisión técnica programada. Puedes mantenerte alejado de las zonas dañadas, pero no hagas ampliaciones ni cargues más los entrepisos.',
        habitability: 'Habitable con seguimiento técnico',
        visualSpec: { type: 'comparativa', description: 'Comparativa lado a lado: marco recto y marco con desplazamiento lateral. Marque con flechas las grietas diagonales en los nudos y mida la separación.' },
        schematicType: 'frame-moderado',
      },
      riesgoAlto: {
        description: 'El marco presenta deformación lateral visible, grietas diagonales amplias, aplastamiento en columnas o daño severo en varias conexiones.',
        plainLanguage: 'El esqueleto de la vivienda se ha movido o está perdiendo piezas de apoyo. Esa combinación puede hacer que el siguiente sismo sea mucho más peligroso.',
        visualCharacteristics: ['Desplazamiento lateral visible del conjunto', 'Grietas en X o diagonales mayores a 1 mm', 'Aplastamiento en extremos de vigas o columnas', 'Separación importante en nudos viga-columna', 'Acero expuesto, doblado o estribos rotos', 'Daño repetido en varios niveles'],
        failureType: 'Pérdida importante de rigidez, resistencia y ductilidad del sistema aporticado. Existe riesgo de mecanismo de piso blando o falla de columna.',
        futureBehavior: 'Un sismo futuro puede concentrar la deformación en un piso y producir una falla frágil o un colapso parcial.',
        nsr10Reference: 'NSR-10 A.10.3 y A.10.4: Evaluación detallada urgente, verificación de derivas, mecanismo resistente y seguridad de uso.',
        nsr10Recommendation: 'Restringir áreas afectadas, reducir cargas y ejecutar apuntalamiento si lo indica el profesional. Reforzar antes de volver al uso normal.',
        actionMessage: 'La vivienda requiere evaluación estructural urgente. Aléjate de las zonas dañadas, no uses el entrepiso afectado y solicita ayuda profesional.',
        habitability: 'Habitabilidad restringida. Posible evacuación parcial.',
        visualSpec: { type: 'comparativa', description: 'Esquema de marco deformado con piso blando resaltado en rojo, columnas aplastadas y nudos abiertos. Fotografía real de un pórtico dañado como referencia, no como diagnóstico.' },
        schematicType: 'frame-riesgoAlto',
      },
      riesgoExtremo: {
        description: 'El marco está severamente deformado o parcialmente colapsado, con pérdida de apoyo, columnas muy dañadas o conexiones destruidas.',
        plainLanguage: 'El esqueleto ya no está sosteniendo la vivienda de forma confiable. No intentes entrar ni retirar objetos: puede fallar sin aviso.',
        visualCharacteristics: ['Colapso o desplazamiento severo de un nivel', 'Columnas con concreto aplastado y acero pandeado', 'Nudos separados o destruidos', 'Vigas sin apoyo o entrepisos asentados', 'Pérdida de verticalidad del edificio'],
        failureType: 'Pérdida del mecanismo resistente global, con posibilidad de colapso progresivo.',
        futureBehavior: 'Puede colapsar con una réplica, vibración adicional o incluso bajo cargas gravitacionales.',
        nsr10Reference: 'NSR-10 A.10.4: Edificación insegura. Evacuación y restricción inmediata de acceso.',
        nsr10Recommendation: 'Evacuar, aislar el área y permitir únicamente apuntalamiento o evaluación de emergencia por personal competente.',
        actionMessage: 'PELIGRO INMEDIATO. Evacua la vivienda y no regreses hasta que un ingeniero estructural confirme que es seguro.',
        habitability: 'NO HABITABLE. Evacuar inmediatamente.',
        visualSpec: { type: 'fotografia', description: 'Fotografía de referencia de un marco parcialmente colapsado y esquema de pérdida de apoyo. Debe incluir señalización clara de no acceso.' },
        schematicType: 'frame-riesgoExtremo',
      },
    }),
    diagnosisQuestions: [
      { id: 'frame-q1', question: '¿El conjunto de vigas y columnas sigue recto?', description: 'Mira el marco desde un extremo o compara líneas verticales y horizontales.', options: [{ label: 'Sí, está recto y sin deformaciones', leadsTo: 'leve' }, { label: 'Tiene una leve deformación', leadsTo: 'moderado' }, { label: 'Está claramente inclinado o desplazado', leadsTo: 'riesgoAlto' }, { label: 'Hay un nivel hundido o parcialmente colapsado', leadsTo: 'riesgoExtremo' }] },
      { id: 'frame-q2', question: '¿Cómo están las uniones entre vigas y columnas?', description: 'Revisa especialmente las esquinas de cada marco.', options: [{ label: 'Cerradas, sin grietas importantes', leadsTo: 'leve' }, { label: 'Con grietas finas o pequeña separación', leadsTo: 'moderado' }, { label: 'Con grietas anchas, concreto aplastado o acero visible', leadsTo: 'riesgoAlto' }, { label: 'Separadas, rotas o sin apoyo', leadsTo: 'riesgoExtremo' }] },
      { id: 'frame-q3', question: '¿El daño aparece en una sola pieza o en varias?', description: 'Un daño repetido en columnas, vigas y conexiones puede indicar un problema del sistema completo.', options: [{ label: 'Solo una fisura aislada', leadsTo: 'leve' }, { label: 'Varias grietas, pero sin deformación', leadsTo: 'moderado' }, { label: 'Varias piezas dañadas en el mismo nivel', leadsTo: 'riesgoAlto' }, { label: 'Daño severo en varios niveles o pérdida de apoyos', leadsTo: 'riesgoExtremo' }] },
    ],
  },
];

export const urgencyLabels: Record<string, { label: string; color: string }> = {
  inmediata: { label: 'Intervención inmediata', color: 'text-red-700' },
  corta: { label: 'Intervención a corto plazo', color: 'text-orange-700' },
  media: { label: 'Intervención a mediano plazo', color: 'text-amber-700' },
  monitoreo: { label: 'Solo monitoreo', color: 'text-emerald-700' },
};
