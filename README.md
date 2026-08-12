# EvalSismo — Guía Visual de Evaluación de Daño Estructural Post-Sismo

Aplicación web interactiva que ayuda a personas no especializadas a identificar y clasificar el daño estructural en viviendas tras un sismo, siguiendo los criterios del **Reglamento Colombiano de Construcción Sismo Resistente (NSR-10)**, Título A — Evaluación y Rehabilitación de Edificaciones.

---

## Tabla de contenidos

- [EvalSismo — Guía Visual de Evaluación de Daño Estructural Post-Sismo](#evalsismo--guía-visual-de-evaluación-de-daño-estructural-post-sismo)
  - [Tabla de contenidos](#tabla-de-contenidos)
  - [Propósito](#propósito)
  - [Características principales](#características-principales)
  - [Elementos estructurales cubiertos](#elementos-estructurales-cubiertos)
  - [Niveles de daño](#niveles-de-daño)
  - [Arquitectura del proyecto](#arquitectura-del-proyecto)
  - [Estructura de archivos](#estructura-de-archivos)
  - [Tecnologías utilizadas](#tecnologías-utilizadas)
  - [Requisitos previos](#requisitos-previos)
  - [Instalación y ejecución](#instalación-y-ejecución)
  - [Scripts disponibles](#scripts-disponibles)
  - [Modelo de datos](#modelo-de-datos)
    - [`DamageLevelId`](#damagelevelid)
    - [`DamageLevel`](#damagelevel)
    - [`StructuralElement`](#structuralelement)
    - [`DiagnosisQuestion`](#diagnosisquestion)
  - [Componentes principales](#componentes-principales)
    - [`App.tsx` — Componente raíz](#apptsx--componente-raíz)
    - [`Header.tsx`](#headertsx)
    - [`Hero.tsx`](#herotsx)
    - [`NoticeBar.tsx`](#noticebartsx)
    - [`StatsStrip.tsx`](#statsstriptsx)
    - [`ElementsSection.tsx`](#elementssectiontsx)
    - [`ElementCard.tsx`](#elementcardtsx)
    - [`ElementDetail.tsx`](#elementdetailtsx)
    - [`DamageLevelCard.tsx`](#damagelevelcardtsx)
    - [`DamageSchematic.tsx`](#damageschematictsx)
    - [`DiagnosisWizard.tsx`](#diagnosiswizardtsx)
    - [`NsrPage.tsx`](#nsrpagetsx)
    - [`AboutPage.tsx`](#aboutpagetsx)
    - [`Footer.tsx`](#footertsx)
  - [Sistema de navegación](#sistema-de-navegación)
  - [Esquemas visuales SVG](#esquemas-visuales-svg)
  - [Asistente de diagnóstico](#asistente-de-diagnóstico)
  - [Referencias normativas NSR-10](#referencias-normativas-nsr-10)
  - [Configuración técnica](#configuración-técnica)
    - [Alias de importación](#alias-de-importación)
    - [Tailwind CSS](#tailwind-css)
    - [Optimización de dependencias](#optimización-de-dependencias)
  - [Despliegue](#despliegue)
  - [Limitaciones y alcance](#limitaciones-y-alcance)
  - [Licencia](#licencia)

---

## Propósito

Tras un sismo, muchas familias necesitan determinar rápidamente si su vivienda es segura. Esta herramienta traduce el lenguaje técnico del NSR-10 a un formato visual y accesible que permite:

- **Identificar** el tipo de elemento estructural dañado (columna, muro, viga, losa, cimentación, conexión, pórtico).
- **Clasificar** el nivel de daño observado en una escala de cuatro niveles.
- **Entender** qué significa el daño, cómo puede evolucionar y qué acciones tomar.
- **Recibir** una recomendación de habitabilidad y urgencia de intervención.

La aplicación no sustituye la evaluación de un ingeniero estructural; la orienta y ayuda a priorizar.

---

## Características principales

- **Seis elementos estructurales** con información detallada de daño.
- **Cuatro niveles de daño** por elemento, cada uno con explicación en lenguaje sencillo.
- **Asistente de diagnóstico interactivo** que guía al usuario mediante preguntas visuales.
- **Esquemas SVG generados dinámicamente** que muestran el patrón de daño esperado para cada nivel.
- **Referencias directas al NSR-10** con artículo, recomendación y clasificación de habitabilidad.
- **Diseño responsivo** optimizado para móvil, tablet y escritorio.
- **Navegación por vistas** sin dependencia de enrutador externo (estado interno de React).
- **Barra de aviso** con información crítica de seguridad.
- **Página informativa del NSR-10** con el contexto normativo completo.

---

## Elementos estructurales cubiertos

| ID | Nombre | Icono | Rol estructural |
|---|---|---|---|
| `columnas` | Columnas | Columns3 | Soportar cargas verticales y resistir fuerzas horizontales |
| `muros` | Muros de Mampostería | BrickWall | Resistir fuerzas sísmicas horizontales como muros de corte |
| `vigas` | Vigas | MinusSquare | Soportar cargas del entrepiso y formar marcos dúctiles |
| `losas` | Losas y Entrepisos | Layers | Actuar como diafragma rígido que integra la estructura |
| `cimentaciones` | Cimentaciones | Shovel | Transmitir todas las cargas al suelo de forma segura |
| `conexiones` | Conexiones Estructurales | Link2 | Transferir fuerzas entre elementos como sistema integral |
| `sistemas-aporticados` | Sistemas Aporticados | Frame | Esqueleto resistente de vigas, columnas y sus uniones |

---

## Niveles de daño

Cada elemento se evalúa en cuatro niveles, con código de color, icono y urgencia de intervención:

| Nivel | Color | Icono | Urgencia | Habitabilidad |
|---|---|---|---|---|
| **Leve** | Verde (`#22c55e`) | ShieldCheck | Solo monitoreo | Habitable sin restricciones |
| **Moderado** | Ámbar (`#f59e0b`) | AlertTriangle | Mediano plazo | Habitable con seguimiento técnico |
| **Riesgo Alto** | Naranja (`#f97316`) | AlertOctagon | Corto plazo | Habitabilidad restringida |
| **Riesgo Extremo** | Rojo (`#dc2626`) | AlertCircle | Inmediata | No habitable, evacuar |

Cada nivel incluye:
- Descripción técnica del daño.
- Explicación en lenguaje sencillo (`plainLanguage`).
- Características visuales observables (lista de verificación).
- Tipo de falla estructural.
- Comportamiento futuro ante un nuevo sismo.
- Referencia al artículo NSR-10 correspondiente.
- Recomendación de intervención.
- Mensaje de acción directo al usuario.
- Especificación visual (fotografía, esquema o comparativa).

---

## Arquitectura del proyecto

```
React 18 + TypeScript + Vite
├── Estado global: useState en App.tsx (vista activa + elemento seleccionado)
├── Datos: src/data.ts (fuente única de verdad, sin backend)
├── Tipos: src/types.ts (interfaces TypeScript)
├── Componentes: src/components/ (13 componentes)
├── Estilos: src/index.css (CSS personalizado + Tailwind)
└── Sin enrutador: navegación mediante estado interno
```

La aplicación es **totalmente front-end**. No requiere backend ni base de datos. Todos los datos de elementos y niveles de daño están codificados en `src/data.ts`.

---

## Estructura de archivos

```
project/
├── index.html                  # HTML raíz
├── package.json                # Dependencias y scripts
├── vite.config.ts              # Configuración de Vite (alias @/ → src/)
├── tailwind.config.js          # Configuración de Tailwind CSS
├── postcss.config.js           # Configuración de PostCSS
├── tsconfig.json               # Configuración base de TypeScript
├── tsconfig.app.json           # Configuración de TS para la app
├── tsconfig.node.json          # Configuración de TS para Node
├── eslint.config.js            # Configuración de ESLint
├── src/
│   ├── main.tsx                # Punto de entrada de React
│   ├── App.tsx                 # Componente raíz y navegación
│   ├── types.ts                # Interfaces TypeScript (DamageLevel, StructuralElement, etc.)
│   ├── data.ts                 # Datos de elementos estructurales y niveles de daño
│   ├── index.css               # Estilos globales y clases personalizadas
│   ├── vite-env.d.ts           # Tipos de entorno de Vite
│   ├── components/
│   │   ├── Header.tsx          # Encabezado con navegación
│   │   ├── Hero.tsx            # Sección principal de inicio
│   │   ├── NoticeBar.tsx       # Barra de aviso de seguridad
│   │   ├── StatsStrip.tsx      # Franja de estadísticas
│   │   ├── ElementsSection.tsx # Sección de tarjetas de elementos
│   │   ├── ElementCard.tsx     # Tarjeta individual de elemento
│   │   ├── ElementDetail.tsx   # Vista de detalle de un elemento
│   │   ├── DamageLevelCard.tsx # Tarjeta de nivel de daño con explicación
│   │   ├── DamageSchematic.tsx # Esquemas SVG generados por nivel
│   │   ├── DiagnosisWizard.tsx  # Asistente de diagnóstico por preguntas
│   │   ├── NsrPage.tsx         # Página informativa del NSR-10
│   │   ├── AboutPage.tsx       # Página "Acerca de"
│   │   └── Footer.tsx          # Pie de página
│   └── assets/
│       └── regulations/
│           └── reglamento_colombiano_construccion_sismo_resistente_*.pdf
└── dist/                       # Carpeta de build de producción
```

---

## Tecnologías utilizadas

| Tecnología | Versión | Propósito |
|---|---|---|
| **React** | ^18.3.1 | Framework de UI |
| **TypeScript** | ^5.5.3 | Tipado estático |
| **Vite** | ^5.4.2 | Bundler y servidor de desarrollo |
| **Tailwind CSS** | ^3.4.1 | Framework de utilidades CSS |
| **Lucide React** | ^0.446.0 | Iconografía |
| **PostCSS** | ^8.4.35 | Procesamiento CSS |
| **Autoprefixer** | ^10.4.18 | Prefijos CSS automáticos |
| **ESLint** | ^9.9.1 | Linter de código |

---

## Requisitos previos

- **Node.js** 18 o superior
- **npm** 9 o superior (incluido con Node.js)

---

## Instalación y ejecución

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar el build de producción
npm run preview
```

El servidor de desarrollo se ejecuta por defecto en `http://localhost:5173`.

---

## Scripts disponibles

| Script | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Vite con hot reload |
| `npm run build` | Compila la aplicación para producción en `dist/` |
| `npm run preview` | Sirve el build de producción localmente |
| `npm run lint` | Ejecuta ESLint sobre el proyecto |
| `npm run typecheck` | Verifica tipos TypeScript sin emitir archivos |

---

## Modelo de datos

La aplicación se basa en tres interfaces TypeScript principales definidas en `src/types.ts`:

### `DamageLevelId`

```typescript
type DamageLevelId = 'leve' | 'moderado' | 'riesgoAlto' | 'riesgoExtremo';
```

### `DamageLevel`

```typescript
interface DamageLevel {
  id: DamageLevelId;
  name: string;
  shortName: string;
  color: string;          // Código hex del color del nivel
  textColor: string;       // Clase de Tailwind para texto
  bgColor: string;         // Clase de Tailwind para fondo
  borderColor: string;    // Clase de Tailwind para borde
  icon: string;            // Nombre del icono Lucide
  description: string;     // Descripción técnica
  plainLanguage: string;   // Explicación en lenguaje sencillo
  visualCharacteristics: string[];  // Lista de señales visuales
  failureType: string;      // Tipo de falla estructural
  futureBehavior: string;   // Comportamiento ante futuro sismo
  nsr10Reference: string;   // Referencia normativa
  nsr10Article: string;     // Artículo del NSR-10
  nsr10Recommendation: string;  // Recomendación de intervención
  actionMessage: string;    // Mensaje de acción al usuario
  habitability: string;     // Estado de habitabilidad
  interventionUrgency: 'inmediata' | 'corta' | 'media' | 'monitoreo';
  visualSpec: {
    type: 'fotografia' | 'esquema' | 'comparativa';
    description: string;
  };
  schematicType: string;    // Tipo de esquema SVG a renderizar
}
```

### `StructuralElement`

```typescript
interface StructuralElement {
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
```

### `DiagnosisQuestion`

```typescript
interface DiagnosisQuestion {
  id: string;
  question: string;
  description: string;
  options: {
    label: string;
    leadsTo: DamageLevelId;
  }[];
}
```

Los datos se generan en `src/data.ts` mediante una función `commonDamageLevels()` que crea los cuatro niveles base y permite sobrescribir campos específicos por elemento.

---

## Componentes principales

### `App.tsx` — Componente raíz

Gestiona el estado global de la aplicación:
- `view`: vista activa (`home`, `element`, `diagnosis`, `nsr`, `about`).
- `selectedElement`: elemento estructural seleccionado para ver detalle.

La función `renderPage()` decide qué componente mostrar según la vista activa.

### `Header.tsx`

Barra de navegación superior con enlaces a las distintas vistas. Resalta la vista activa.

### `Hero.tsx`

Sección principal de la página de inicio con llamado a la acción para iniciar el diagnóstico.

### `NoticeBar.tsx`

Barra de aviso de seguridad que muestra mensajes críticos en la parte superior.

### `StatsStrip.tsx`

Franja con estadísticas clave sobre evaluación de daño.

### `ElementsSection.tsx`

Renderiza la cuadrícula de tarjetas de elementos estructurales. Recibe `onSelect` para abrir el detalle.

### `ElementCard.tsx`

Tarjeta individual de elemento con icono, nombre y descripción breve.

### `ElementDetail.tsx`

Vista de detalle de un elemento estructural. Muestra:
- Descripción y rol del elemento.
- Niveles de daño con tarjetas expandibles.
- Esquemas visuales SVG.
- Botón para iniciar el asistente de diagnóstico.

### `DamageLevelCard.tsx`

Tarjeta de nivel de daño que muestra:
- Explicación en lenguaje sencillo (`plainLanguage`).
- Características visuales observables.
- Tipo de falla y comportamiento futuro.
- Referencia NSR-10 y recomendación.
- Mensaje de acción y habitabilidad.
- Esquema SVG del daño.

### `DamageSchematic.tsx`

Genera esquemas SVG dinámicos que representan visualmente el patrón de daño para cada elemento y nivel. Incluye funciones de renderizado especializadas:

- `renderColumn()` — esquemas de columnas con grietas, pandeo de acero y aplastamiento.
- `renderWall()` — esquemas de muros con grietas diagonales, escalonadas y en X.
- `renderBeam()` — esquemas de vigas con grietas de flexión y corte.
- `renderSlab()` — esquemas de losas con deflexión y punzonamiento.
- `renderFoundation()` — esquemas de cimentaciones con asentamientos diferenciales.
- `renderConnection()` — esquemas de conexiones viga-columna con separación.
- `renderFrame()` — esquemas de sistemas aporticados con deformación lateral.

Cada función recibe el nivel de daño y ajusta el color, grosor de grietas, desplazamiento y severidad visual.

### `DiagnosisWizard.tsx`

Asistente interactivo que guía al usuario mediante preguntas de observación visual. Por cada pregunta, el usuario selecciona una opción que lo dirige a un nivel de daño. Al finalizar, muestra el resultado con el nivel de daño determinado y permite navegar al detalle del elemento.

### `NsrPage.tsx`

Página informativa sobre el NSR-10 con el contexto normativo, artículos relevantes y explicación del proceso de evaluación.

### `AboutPage.tsx`

Página "Acerca de" con información sobre el proyecto y su propósito.

### `Footer.tsx`

Pie de página con enlaces de navegación.

---

## Sistema de navegación

La aplicación no utiliza un enrutador externo (React Router, etc.). La navegación se gestiona mediante estado interno de React:

```typescript
type View = 'home' | 'element' | 'diagnosis' | 'nsr' | 'about';
```

La función `navigate(view)` actualiza el estado y hace scroll suave hacia arriba. La función `openElement(element)` guarda el elemento seleccionado y navega a la vista de detalle.

---

## Esquemas visuales SVG

`DamageSchematic.tsx` es el componente más complejo del proyecto. Genera esquemas vectoriales en tiempo real que muestran:

- **Columnas**: sección transversal con grietas capilares, diagonales, en X, acero expuesto y pandeado, concreto aplastado.
- **Muros**: patrón de grietas verticales, escalonadas, diagonales y en X, separación muro-estructura, desplome.
- **Vigas**: grietas de flexión en zona central, grietas diagonales de corte cerca de apoyos, deflexión, aplastamiento.
- **Losas**: grietas de retracción, grietas lineales, deflexión, hundimiento, falla por punzonamiento.
- **Cimentaciones**: asentamiento uniforme vs diferencial, inclinación de la edificación, grietas asociadas.
- **Conexiones**: fisuras en nudo, separación entre elementos, acero pandeado, pérdida de continuidad.
- **Sistemas aporticados**: marco con deformación lateral, piso blando, nudos abiertos, columnas aplastadas.

El esquema se selecciona mediante el campo `schematicType` de cada nivel de daño (ej: `column-riesgoAlto`, `wall-moderado`).

---

## Asistente de diagnóstico

El `DiagnosisWizard` presenta las preguntas definidas en `diagnosisQuestions` para cada elemento. Cada pregunta tiene:

- Un enunciado y una descripción de ayuda.
- Cuatro opciones, cada una asociada a un `DamageLevelId` mediante `leadsTo`.

El usuario responde las preguntas secuencialmente y, al finalizar, el asistente determina el nivel de daño más probable y ofrece un enlace al detalle completo.

---

## Referencias normativas NSR-10

La aplicación referencia los siguientes artículos del Título A.10 del NSR-10:

| Artículo | Contexto |
|---|---|
| **A.10.2** | Evaluación preliminar de edificaciones |
| **A.10.2.4** | Daños ligeros — continuar uso con monitoreo |
| **A.10.3** | Evaluación detallada por profesional calificado |
| **A.10.3.2** | Daños moderados — evaluación de capacidad residual |
| **A.10.3.4** | Daños estructurales severos — restricción de uso |
| **A.10.4** | Evaluación post-sismo |
| **A.10.4.3** | Edificación insegura — evacuación inmediata |

El PDF del reglamento completo está incluido en `src/assets/regulations/`.

---

## Configuración técnica

### Alias de importación

El proyecto usa el alias `@/` que mapea a `src/`:

```typescript
import { Header } from '@/components/Header';
```

Configurado en `vite.config.ts`:

```typescript
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
}
```

### Tailwind CSS

El contenido escaneado incluye `index.html` y todos los archivos `js, ts, jsx, tsx` dentro de `src/`.

### Optimización de dependencias

`lucide-react` está excluido del pre-bundling de Vite para evitar problemas con su estructura de exportación:

```typescript
optimizeDeps: {
  exclude: ['lucide-react'],
}
```

---

## Despliegue

```bash
npm run build
```

El build se genera en `dist/` e incluye:
- `dist/index.html` — HTML optimizado.
- `dist/assets/` — JS y CSS minificados.
- `dist/_redirects` — reglas de redirección para hosting estático.

El proyecto puede desplegarse en cualquier hosting estático (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Limitaciones y alcance

- **No sustituye** la evaluación de un ingeniero estructural profesional.
- **No realiza** cálculos estructurales ni análisis de capacidad residual.
- **No almacena** datos del usuario ni resultados de diagnóstico.
- **No requiere** conexión a internet una vez cargada (todos los datos son estáticos).
- **No incluye** autenticación ni cuentas de usuario.
- El diagnóstico es **orientativo** y se basa en observación visual reportada por el usuario.
- Las referencias al NSR-10 son **informativas**; la interpretación final corresponde a un profesional calificado.

---

## Licencia

Este proyecto se desarrolla con fines educativos y de divulgación para la evaluación de daño estructural post-sismo según el NSR-10.
