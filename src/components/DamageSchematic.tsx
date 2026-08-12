import type { JSX } from 'react';

interface SchematicProps {
  type: string;
  className?: string;
}

const COLORS = {
  concrete: '#d4d4d8',
  concreteDark: '#a1a1aa',
  rebar: '#52525b',
  crack: '#dc2626',
  crackModerate: '#f59e0b',
  crackLight: '#22c55e',
  crackExtreme: '#991b1b',
  brick: '#b91c1c',
  brickLine: '#7f1d1d',
  mortar: '#9ca3af',
  soil: '#a16207',
  soilDark: '#78350f',
  arrow: '#2563eb',
  label: '#404040',
};

export function DamageSchematic({ type, className = '' }: SchematicProps) {
  const [element, level] = type.split('-');

  return (
    <svg
      viewBox="0 0 300 220"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="300" height="220" fill="#fafafa" rx="8" />
      {renderSchematic(element, level)}
    </svg>
  );
}

function renderSchematic(element: string, level: string): JSX.Element {
  switch (element) {
    case 'column':
      return renderColumn(level);
    case 'wall':
      return renderWall(level);
    case 'beam':
      return renderBeam(level);
    case 'slab':
      return renderSlab(level);
    case 'foundation':
      return renderFoundation(level);
    case 'connection':
      return renderConnection(level);
    case 'frame':
      return renderFrame(level);
    default:
      return <text x="150" y="110" textAnchor="middle">Sin esquema</text>;
  }
}

function renderColumn(level: string): JSX.Element {
  const crackColor =
    level === 'leve' ? COLORS.crackLight :
    level === 'moderado' ? COLORS.crackModerate :
    level === 'riesgoAlto' ? COLORS.crack :
    COLORS.crackExtreme;

  const cracks: JSX.Element[] = [];
  const rebarExposed: JSX.Element[] = [];

  if (level === 'leve') {
    cracks.push(<line key="c1" x1="140" y1="50" x2="145" y2="65" stroke={crackColor} strokeWidth="0.5" />);
    cracks.push(<line key="c2" x1="155" y1="80" x2="160" y2="90" stroke={crackColor} strokeWidth="0.5" />);
    cracks.push(<line key="c3" x1="138" y1="120" x2="142" y2="130" stroke={crackColor} strokeWidth="0.5" />);
  } else if (level === 'moderado') {
    cracks.push(<line key="c1" x1="130" y1="40" x2="145" y2="80" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c2" x1="145" y1="80" x2="135" y2="120" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c3" x1="160" y1="60" x2="170" y2="100" stroke={crackColor} strokeWidth="0.8" />);
    rebarExposed.push(<line key="r1" x1="165" y1="70" x2="165" y2="90" stroke={COLORS.rebar} strokeWidth="2" />);
  } else if (level === 'riesgoAlto') {
    // X-shaped cracks (shear failure)
    cracks.push(<line key="c1" x1="120" y1="40" x2="180" y2="100" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c2" x1="180" y1="40" x2="120" y2="100" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c3" x1="120" y1="100" x2="180" y2="160" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c4" x1="180" y1="100" x2="120" y2="160" stroke={crackColor} strokeWidth="2" />);
    // Exposed and buckled rebar
    rebarExposed.push(<path key="r1" d="M 160 60 Q 170 75 160 90" stroke={COLORS.rebar} strokeWidth="2" fill="none" />);
    rebarExposed.push(<path key="r2" d="M 140 100 Q 130 115 140 130" stroke={COLORS.rebar} strokeWidth="2" fill="none" />);
    // Broken stirrups
    cracks.push(<line key="c5" x1="120" y1="70" x2="110" y2="80" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c6" x1="180" y1="70" x2="190" y2="80" stroke={crackColor} strokeWidth="1" />);
  } else {
    // Extreme: crushed concrete, buckled rebar, loss of section
    cracks.push(<path key="c1" d="M 115 40 L 130 60 L 120 80 L 135 100 L 125 120 L 140 140 L 130 160" stroke={crackColor} strokeWidth="2.5" fill="none" />);
    cracks.push(<path key="c2" d="M 185 40 L 170 60 L 180 80 L 165 100 L 175 120 L 160 140 L 170 160" stroke={crackColor} strokeWidth="2.5" fill="none" />);
    // Severely buckled rebar
    rebarExposed.push(<path key="r1" d="M 150 50 Q 165 65 145 80 Q 125 95 150 110 Q 170 125 140 140 Q 120 155 150 170" stroke={COLORS.rebar} strokeWidth="2.5" fill="none" />);
    // Missing concrete (gaps)
    cracks.push(<rect key="c3" x="125" y="85" width="20" height="15" fill="#fafafa" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<rect key="c4" x="155" y="120" width="20" height="15" fill="#fafafa" stroke={crackColor} strokeWidth="1" />);
  }

  const tilt = level === 'riesgoExtremo' ? 8 : level === 'riesgoAlto' ? 4 : 0;

  return (
    <g transform={`rotate(${tilt} 150 110)`}>
      {/* Floor and ceiling */}
      <rect x="80" y="25" width="140" height="12" fill={COLORS.concreteDark} rx="2" />
      <rect x="80" y="183" width="140" height="12" fill={COLORS.concreteDark} rx="2" />
      {/* Column body */}
      <rect x="120" y="37" width="60" height="146" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" rx="2" />
      {/* Internal rebar (dashed lines) */}
      {level !== 'riesgoExtremo' && (
        <>
          <line x1="130" y1="37" x2="130" y2="183" stroke={COLORS.rebar} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <line x1="170" y1="37" x2="170" y2="183" stroke={COLORS.rebar} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
        </>
      )}
      {/* Stirrups */}
      {level === 'leve' && [50, 70, 90, 110, 130, 150, 170].map((y) => (
        <rect key={`s${y}`} x="128" y={y} width="44" height="6" fill="none" stroke={COLORS.rebar} strokeWidth="0.5" opacity="0.3" />
      ))}
      {cracks}
      {rebarExposed}
      <text x="150" y="210" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">
        Columna
      </text>
    </g>
  );
}

function renderWall(level: string): JSX.Element {
  const crackColor =
    level === 'leve' ? COLORS.crackLight :
    level === 'moderado' ? COLORS.crackModerate :
    level === 'riesgoAlto' ? COLORS.crack :
    COLORS.crackExtreme;

  // Render brick pattern
  const bricks: JSX.Element[] = [];
  const brickW = 30;
  const brickH = 14;
  for (let row = 0; row < 10; row++) {
    const offset = row % 2 === 0 ? 0 : brickW / 2;
    for (let col = -1; col < 10; col++) {
      const x = 40 + col * brickW + offset;
      const y = 30 + row * brickH;
      bricks.push(
        <rect
          key={`b${row}-${col}`}
          x={x}
          y={y}
          width={brickW - 1}
          height={brickH - 1}
          fill={COLORS.brick}
          stroke={COLORS.brickLine}
          strokeWidth="0.5"
          opacity="0.7"
        />
      );
    }
  }

  const cracks: JSX.Element[] = [];
  let displacement = 0;

  if (level === 'leve') {
    // Fine cracks in plaster only
    cracks.push(<line key="c1" x1="100" y1="35" x2="105" y2="60" stroke={crackColor} strokeWidth="0.5" />);
    cracks.push(<line key="c2" x1="200" y1="50" x2="205" y2="80" stroke={crackColor} strokeWidth="0.5" />);
    cracks.push(<line key="c3" x1="150" y1="120" x2="155" y2="145" stroke={crackColor} strokeWidth="0.5" />);
  } else if (level === 'moderado') {
    // Stepped cracks following mortar joints
    cracks.push(<polyline key="c1" points="80,40 95,54 95,68 110,82 110,96 125,110 125,124 140,138"
      stroke={crackColor} strokeWidth="1.5" fill="none" />);
    cracks.push(<polyline key="c2" points="200,40 185,54 185,68 170,82 170,96 185,110"
      stroke={crackColor} strokeWidth="1" fill="none" />);
  } else if (level === 'riesgoAlto') {
    // X-shaped diagonal cracks
    cracks.push(<polyline key="c1" points="60,35 90,65 90,95 120,125 120,155 150,185"
      stroke={crackColor} strokeWidth="3" fill="none" />);
    cracks.push(<polyline key="c2" points="240,35 210,65 210,95 180,125 180,155 150,185"
      stroke={crackColor} strokeWidth="3" fill="none" />);
    // Displaced bricks
    displacement = 3;
  } else {
    // Extreme: massive cracks, wall displacement, partial collapse
    cracks.push(<polyline key="c1" points="50,30 80,55 75,85 105,110 100,140 130,165 125,195"
      stroke={crackColor} strokeWidth="4" fill="none" />);
    cracks.push(<polyline key="c2" points="250,30 220,55 225,85 195,110 200,140 170,165 175,195"
      stroke={crackColor} strokeWidth="4" fill="none" />);
    // Missing bricks (collapse)
    cracks.push(<rect key="c3" x="120" y="100" width="40" height="28" fill="#fafafa" stroke={crackColor} strokeWidth="1.5" />);
    cracks.push(<rect key="c4" x="160" y="128" width="30" height="28" fill="#fafafa" stroke={crackColor} strokeWidth="1.5" />);
    displacement = 8;
  }

  return (
    <g>
      {/* Wall frame */}
      <rect x="35" y="25" width="230" height="165" fill="none" stroke={COLORS.concreteDark} strokeWidth="2" rx="2" />
      <g transform={`translate(${displacement}, 0)`}>
        {bricks}
        {cracks}
      </g>
      <text x="150" y="210" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">
        Muro de Mampostería
      </text>
    </g>
  );
}

function renderBeam(level: string): JSX.Element {
  const crackColor =
    level === 'leve' ? COLORS.crackLight :
    level === 'moderado' ? COLORS.crackModerate :
    level === 'riesgoAlto' ? COLORS.crack :
    COLORS.crackExtreme;

  const cracks: JSX.Element[] = [];
  const rebarExposed: JSX.Element[] = [];

  if (level === 'leve') {
    // Fine vertical flexural cracks in mid-span
    [120, 140, 160].map((x) => (
      cracks.push(<line key={`c${x}`} x1={x} y1="85" x2={x} y2="105" stroke={crackColor} strokeWidth="0.5" />)
    ));
  } else if (level === 'moderado') {
    // Wider flexural cracks + initial diagonal cracks near supports
    [130, 150].map((x) => (
      cracks.push(<line key={`c${x}`} x1={x} y1="82" x2={x} y2="108" stroke={crackColor} strokeWidth="1" />)
    ));
    cracks.push(<line key="d1" x1="70" y1="80" x2="85" y2="95" stroke={crackColor} strokeWidth="0.8" />);
    cracks.push(<line key="d2" x1="210" y1="80" x2="225" y2="95" stroke={crackColor} strokeWidth="0.8" />);
    rebarExposed.push(<line key="r1" x1="135" y1="105" x2="155" y2="105" stroke={COLORS.rebar} strokeWidth="1.5" opacity="0.6" />);
  } else if (level === 'riesgoAlto') {
    // Wide diagonal shear cracks + crushed concrete at supports
    cracks.push(<line key="d1" x1="60" y1="75" x2="95" y2="115" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="d2" x1="95" y1="75" x2="60" y2="115" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="d3" x1="200" y1="75" x2="235" y2="115" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="d4" x1="235" y1="75" x2="200" y2="115" stroke={crackColor} strokeWidth="2.5" />);
    // Crushed concrete at supports
    cracks.push(<rect key="c1" x="55" y="78" width="15" height="30" fill="#fafafa" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<rect key="c2" x="225" y="78" width="15" height="30" fill="#fafafa" stroke={crackColor} strokeWidth="1" />);
    // Exposed buckled rebar
    rebarExposed.push(<path key="r1" d="M 65 105 Q 75 100 65 95" stroke={COLORS.rebar} strokeWidth="2" fill="none" />);
    rebarExposed.push(<path key="r2" d="M 230 105 Q 240 100 230 95" stroke={COLORS.rebar} strokeWidth="2" fill="none" />);
  } else {
    // Extreme: massive concrete loss, buckled rebar, loss of support
    cracks.push(<path key="c1" d="M 55 75 L 80 85 L 70 100 L 95 110 L 85 125" stroke={crackColor} strokeWidth="3" fill="none" />);
    cracks.push(<path key="c2" d="M 240 75 L 215 85 L 225 100 L 200 110 L 210 125" stroke={crackColor} strokeWidth="3" fill="none" />);
    // Massive concrete loss
    cracks.push(<rect key="c3" x="55" y="75" width="25" height="40" fill="#fafafa" stroke={crackColor} strokeWidth="1.5" />);
    cracks.push(<rect key="c4" x="215" y="75" width="25" height="40" fill="#fafafa" stroke={crackColor} strokeWidth="1.5" />);
    cracks.push(<rect key="c5" x="120" y="80" width="30" height="25" fill="#fafafa" stroke={crackColor} strokeWidth="1" />);
    // Severely buckled rebar
    rebarExposed.push(<path key="r1" d="M 60 105 Q 80 90 60 75 Q 40 60 70 50" stroke={COLORS.rebar} strokeWidth="2.5" fill="none" />);
    rebarExposed.push(<path key="r2" d="M 235 105 Q 215 90 235 75 Q 255 60 225 50" stroke={COLORS.rebar} strokeWidth="2.5" fill="none" />);
  }

  const deflection = level === 'riesgoExtremo' ? 12 : level === 'riesgoAlto' ? 6 : level === 'moderado' ? 2 : 0;

  return (
    <g>
      {/* Columns (supports) */}
      <rect x="40" y="50" width="25" height="120" fill={COLORS.concreteDark} rx="2" />
      <rect x="235" y="50" width="25" height="120" fill={COLORS.concreteDark} rx="2" />
      {/* Beam with deflection */}
      <path
        d={`M 65 80 Q 150 ${80 + deflection} 235 80 L 235 115 Q 150 ${115 + deflection} 65 115 Z`}
        fill={COLORS.concrete}
        stroke={COLORS.concreteDark}
        strokeWidth="1.5"
      />
      {/* Internal rebar */}
      {level !== 'riesgoExtremo' && (
        <>
          <line x1="70" y1="88" x2="230" y2="88" stroke={COLORS.rebar} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
          <line x1="70" y1="107" x2="230" y2="107" stroke={COLORS.rebar} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
        </>
      )}
      {/* Stirrups */}
      {level === 'leve' && [80, 110, 140, 170, 200].map((x) => (
        <rect key={`s${x}`} x={x} y="82" width="6" height="30" fill="none" stroke={COLORS.rebar} strokeWidth="0.5" opacity="0.3" />
      ))}
      {cracks}
      {rebarExposed}
      <text x="150" y="200" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">
        Viga
      </text>
    </g>
  );
}

function renderSlab(level: string): JSX.Element {
  const crackColor =
    level === 'leve' ? COLORS.crackLight :
    level === 'moderado' ? COLORS.crackModerate :
    level === 'riesgoAlto' ? COLORS.crack :
    COLORS.crackExtreme;

  const cracks: JSX.Element[] = [];

  if (level === 'leve') {
    // Random shrinkage cracks
    cracks.push(<line key="c1" x1="80" y1="60" x2="95" y2="72" stroke={crackColor} strokeWidth="0.4" />);
    cracks.push(<line key="c2" x1="150" y1="55" x2="165" y2="68" stroke={crackColor} strokeWidth="0.4" />);
    cracks.push(<line key="c3" x1="200" y1="65" x2="215" y2="78" stroke={crackColor} strokeWidth="0.4" />);
    cracks.push(<line key="c4" x1="100" y1="130" x2="115" y2="142" stroke={crackColor} strokeWidth="0.4" />);
    cracks.push(<line key="c5" x1="180" y1="125" x2="195" y2="138" stroke={crackColor} strokeWidth="0.4" />);
  } else if (level === 'moderado') {
    // Linear cracks parallel to supports
    cracks.push(<line key="c1" x1="60" y1="70" x2="240" y2="70" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c2" x1="60" y1="140" x2="240" y2="140" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c3" x1="120" y1="60" x2="120" y2="80" stroke={crackColor} strokeWidth="0.8" />);
    cracks.push(<line key="c4" x1="180" y1="130" x2="180" y2="150" stroke={crackColor} strokeWidth="0.8" />);
  } else if (level === 'riesgoAlto') {
    // Wide cracks with deflection
    cracks.push(<line key="c1" x1="60" y1="65" x2="240" y2="65" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="c2" x1="60" y1="145" x2="240" y2="145" stroke={crackColor} strokeWidth="2.5" />);
    // Perimeter cracks
    cracks.push(<line key="c3" x1="50" y1="55" x2="50" y2="155" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c4" x1="250" y1="55" x2="250" y2="155" stroke={crackColor} strokeWidth="2" />);
    // Localized sinking
    cracks.push(<ellipse key="c5" cx="150" cy="105" rx="25" ry="8" fill="none" stroke={crackColor} strokeWidth="1.5" strokeDasharray="3,2" />);
  } else {
    // Extreme: massive sinking, punching shear
    cracks.push(<line key="c1" x1="50" y1="55" x2="250" y2="55" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c2" x1="50" y1="155" x2="250" y2="155" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c3" x1="50" y1="55" x2="50" y2="155" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c4" x1="250" y1="55" x2="250" y2="155" stroke={crackColor} strokeWidth="3" />);
    // Punching shear zone
    cracks.push(<polygon key="c5" points="120,85 180,85 190,125 110,125" fill="#fafafa" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c6" x1="110" y1="85" x2="120" y2="75" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c7" x1="190" y1="125" x2="200" y2="135" stroke={crackColor} strokeWidth="2" />);
  }

  const deflection = level === 'riesgoExtremo' ? 15 : level === 'riesgoAlto' ? 8 : level === 'moderado' ? 3 : 0;

  return (
    <g>
      {/* Support walls */}
      <rect x="35" y="40" width="15" height="130" fill={COLORS.concreteDark} rx="2" />
      <rect x="250" y="40" width="15" height="130" fill={COLORS.concreteDark} rx="2" />
      {/* Slab with deflection (perspective view) */}
      <path
        d={`M 50 55 L 250 55 L 250 155 L 50 155 Z`}
        fill="none"
      />
      <path
        d={`M 50 55 Q 150 ${55 + deflection} 250 55 L 250 155 Q 150 ${155 + deflection} 50 155 Z`}
        fill={COLORS.concrete}
        stroke={COLORS.concreteDark}
        strokeWidth="1.5"
        opacity="0.85"
      />
      {cracks}
      <text x="150" y="200" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">
        Losa / Entrepiso
      </text>
    </g>
  );
}

function renderFoundation(level: string): JSX.Element {
  const crackColor =
    level === 'leve' ? COLORS.crackLight :
    level === 'moderado' ? COLORS.crackModerate :
    level === 'riesgoAlto' ? COLORS.crack :
    COLORS.crackExtreme;

  const cracks: JSX.Element[] = [];
  const tilt = level === 'riesgoExtremo' ? 10 : level === 'riesgoAlto' ? 5 : level === 'moderado' ? 2 : 0;

  if (level === 'leve') {
    // Fine cracks in walls, uniform settlement
    cracks.push(<line key="c1" x1="100" y1="50" x2="105" y2="65" stroke={crackColor} strokeWidth="0.5" />);
    cracks.push(<line key="c2" x1="190" y1="50" x2="195" y2="65" stroke={crackColor} strokeWidth="0.5" />);
  } else if (level === 'moderado') {
    // Diagonal cracks from differential settlement
    cracks.push(<line key="c1" x1="90" y1="45" x2="110" y2="75" stroke={crackColor} strokeWidth="1.5" />);
    cracks.push(<line key="c2" x1="110" y1="75" x2="95" y2="100" stroke={crackColor} strokeWidth="1.5" />);
    cracks.push(<line key="c3" x1="200" y1="45" x2="185" y2="75" stroke={crackColor} strokeWidth="1" />);
  } else if (level === 'riesgoAlto') {
    // Wide diagonal cracks, visible tilt
    cracks.push(<line key="c1" x1="85" y1="40" x2="115" y2="80" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c2" x1="115" y1="80" x2="90" y2="110" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c3" x1="90" y1="110" x2="115" y2="140" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="c4" x1="205" y1="45" x2="180" y2="85" stroke={crackColor} strokeWidth="2.5" />);
  } else {
    // Extreme: severe tilt, massive cracks, partial collapse
    cracks.push(<line key="c1" x1="75" y1="35" x2="120" y2="85" stroke={crackColor} strokeWidth="4" />);
    cracks.push(<line key="c2" x1="120" y1="85" x2="80" y2="120" stroke={crackColor} strokeWidth="4" />);
    cracks.push(<line key="c3" x1="80" y1="120" x2="125" y2="155" stroke={crackColor} strokeWidth="4" />);
    cracks.push(<line key="c4" x1="210" y1="40" x2="170" y2="90" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<rect key="c5" x="100" y="90" width="25" height="20" fill="#fafafa" stroke={crackColor} strokeWidth="1.5" />);
  }

  return (
    <g>
      {/* Soil */}
      <rect x="0" y="155" width="300" height="65" fill={COLORS.soil} opacity="0.3" />
      <line x1="0" y1="155" x2="300" y2="155" stroke={COLORS.soilDark} strokeWidth="1" strokeDasharray="5,3" />
      {/* Foundation footing */}
      <rect x="70" y="145" width="160" height="15" fill={COLORS.concreteDark} rx="2" />
      {/* Building */}
      <g transform={`rotate(${tilt} 150 145)`}>
        <rect x="90" y="40" width="120" height="105" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" rx="2" />
        {/* Windows and door */}
        <rect x="105" y="55" width="25" height="25" fill="none" stroke={COLORS.concreteDark} strokeWidth="1" />
        <rect x="170" y="55" width="25" height="25" fill="none" stroke={COLORS.concreteDark} strokeWidth="1" />
        <rect x="135" y="100" width="30" height="45" fill="none" stroke={COLORS.concreteDark} strokeWidth="1" />
        {cracks}
      </g>
      {/* Settlement arrows */}
      {level !== 'leve' && (
        <>
          <path d="M 80 175 L 80 165 M 76 168 L 80 165 L 84 168" stroke={COLORS.arrow} strokeWidth="1.5" fill="none" />
          <path d="M 220 175 L 220 165 M 216 168 L 220 165 L 224 168" stroke={COLORS.arrow} strokeWidth="1.5" fill="none" />
        </>
      )}
      <text x="150" y="210" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">
        Cimentación
      </text>
    </g>
  );
}

function renderConnection(level: string): JSX.Element {
  const crackColor =
    level === 'leve' ? COLORS.crackLight :
    level === 'moderado' ? COLORS.crackModerate :
    level === 'riesgoAlto' ? COLORS.crack :
    COLORS.crackExtreme;

  const cracks: JSX.Element[] = [];
  const rebarExposed: JSX.Element[] = [];
  let separation = 0;

  if (level === 'leve') {
    cracks.push(<line key="c1" x1="130" y1="95" x2="135" y2="100" stroke={crackColor} strokeWidth="0.5" />);
    cracks.push(<line key="c2" x1="170" y1="95" x2="175" y2="100" stroke={crackColor} strokeWidth="0.5" />);
  } else if (level === 'moderado') {
    cracks.push(<line key="c1" x1="125" y1="85" x2="140" y2="100" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c2" x1="160" y1="85" x2="175" y2="100" stroke={crackColor} strokeWidth="1" />);
    cracks.push(<line key="c3" x1="140" y1="100" x2="135" y2="115" stroke={crackColor} strokeWidth="0.8" />);
    separation = 2;
  } else if (level === 'riesgoAlto') {
    // Wide cracks in joint, exposed rebar
    cracks.push(<line key="c1" x1="120" y1="80" x2="145" y2="105" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="c2" x1="155" y1="80" x2="180" y2="105" stroke={crackColor} strokeWidth="2.5" />);
    cracks.push(<line key="c3" x1="145" y1="105" x2="135" y2="120" stroke={crackColor} strokeWidth="2" />);
    cracks.push(<line key="c4" x1="155" y1="105" x2="165" y2="120" stroke={crackColor} strokeWidth="2" />);
    rebarExposed.push(<path key="r1" d="M 145 95 Q 150 90 155 95" stroke={COLORS.rebar} strokeWidth="2" fill="none" />);
    separation = 5;
  } else {
    // Extreme: total separation, destroyed joint
    cracks.push(<line key="c1" x1="115" y1="75" x2="150" y2="110" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c2" x1="150" y1="110" x2="185" y2="75" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c3" x1="150" y1="110" x2="130" y2="130" stroke={crackColor} strokeWidth="3" />);
    cracks.push(<line key="c4" x1="150" y1="110" x2="170" y2="130" stroke={crackColor} strokeWidth="3" />);
    rebarExposed.push(<path key="r1" d="M 140 85 Q 160 70 145 100 Q 130 120 160 115" stroke={COLORS.rebar} strokeWidth="2.5" fill="none" />);
    separation = 12;
  }

  return (
    <g>
      {/* Column above */}
      <rect x="130" y="25" width="40" height="55" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" rx="2" />
      {/* Column below */}
      <rect x="130" y="120" width="40" height="55" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" rx="2" />
      {/* Beam left with separation */}
      <rect x={50} y="80" width={80 - separation} height="35" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" rx="2" />
      {/* Beam right with separation */}
      <rect x={170 + separation} y="80" width={80 - separation} height="35" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" rx="2" />
      {/* Joint zone */}
      <rect x="130" y="80" width="40" height="40" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" />
      {cracks}
      {rebarExposed}
      {/* Labels */}
      <text x="150" y="20" textAnchor="middle" fontSize="7" fill={COLORS.label}>Columna</text>
      <text x="80" y="75" textAnchor="middle" fontSize="7" fill={COLORS.label}>Viga</text>
      <text x="220" y="75" textAnchor="middle" fontSize="7" fill={COLORS.label}>Viga</text>
      <text x="150" y="210" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">
        Conexión Viga-Columna
      </text>
    </g>
  );
}

function renderFrame(level: string): JSX.Element {
  const damageColor = level === 'leve' ? COLORS.crackLight : level === 'moderado' ? COLORS.crackModerate : level === 'riesgoAlto' ? COLORS.crack : COLORS.crackExtreme;
  const offset = level === 'riesgoExtremo' ? 10 : level === 'riesgoAlto' ? 5 : level === 'moderado' ? 2 : 0;
  const cracks: JSX.Element[] = [];

  if (level === 'leve') {
    cracks.push(<line key="c1" x1="98" y1="76" x2="104" y2="91" stroke={damageColor} strokeWidth="1" />);
    cracks.push(<line key="c2" x1="196" y1="76" x2="190" y2="91" stroke={damageColor} strokeWidth="1" />);
  } else if (level === 'moderado') {
    cracks.push(<path key="c1" d="M 92 73 L 105 90 L 95 106" stroke={damageColor} strokeWidth="2" fill="none" />);
    cracks.push(<path key="c2" d="M 208 73 L 195 90 L 205 106" stroke={damageColor} strokeWidth="2" fill="none" />);
  } else if (level === 'riesgoAlto') {
    cracks.push(<path key="c1" d="M 83 68 L 112 96 L 93 119" stroke={damageColor} strokeWidth="3" fill="none" />);
    cracks.push(<path key="c2" d="M 217 68 L 188 96 L 207 119" stroke={damageColor} strokeWidth="3" fill="none" />);
  } else {
    cracks.push(<path key="c1" d="M 78 62 L 112 94 L 88 128" stroke={damageColor} strokeWidth="4" fill="none" />);
    cracks.push(<path key="c2" d="M 222 62 L 188 94 L 212 128" stroke={damageColor} strokeWidth="4" fill="none" />);
    cracks.push(<rect key="c3" x="126" y="103" width="48" height="22" fill="#fafafa" stroke={damageColor} strokeWidth="2" />);
  }

  return (
    <g transform={`translate(${offset} ${level === 'riesgoExtremo' ? 4 : 0})`}>
      <line x1="45" y1="180" x2="255" y2="180" stroke={COLORS.soilDark} strokeWidth="3" />
      <rect x="56" y="32" width="18" height="148" fill={COLORS.concreteDark} stroke={COLORS.concreteDark} strokeWidth="1.5" />
      <rect x="226" y="32" width="18" height="148" fill={COLORS.concreteDark} stroke={COLORS.concreteDark} strokeWidth="1.5" />
      <rect x="65" y="55" width="170" height="18" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" />
      <rect x="65" y="124" width="170" height="18" fill={COLORS.concrete} stroke={COLORS.concreteDark} strokeWidth="1.5" />
      <line x1="74" y1="73" x2="74" y2="124" stroke={COLORS.concreteDark} strokeWidth="1" />
      <line x1="226" y1="73" x2="226" y2="124" stroke={COLORS.concreteDark} strokeWidth="1" />
      {cracks}
      {level !== 'leve' && <><line x1="63" y1="53" x2="63" y2="75" stroke={damageColor} strokeWidth="1.5" /><line x1="228" y1="53" x2="228" y2="75" stroke={damageColor} strokeWidth="1.5" /></>}
      <text x="150" y="18" textAnchor="middle" fontSize="8" fill={COLORS.label}>Viga</text>
      <text x="55" y="205" textAnchor="middle" fontSize="8" fill={COLORS.label}>Columna</text>
      <text x="245" y="205" textAnchor="middle" fontSize="8" fill={COLORS.label}>Columna</text>
      <text x="150" y="218" textAnchor="middle" fontSize="9" fill={COLORS.label} fontWeight="600">Sistema aporticado</text>
    </g>
  );
}
