import type { MotifId } from '../lib/atlas';

interface ArchitecturalMotifProps {
  readonly motifId: MotifId;
  readonly accentHex: string;
  readonly variant?: 'hero' | 'card' | 'modal';
}

/**
 * Purpose-built, non-random Swiss architectural drafting backdrops tailored
 * to each system's real engineering topology:
 * - planes: PenSuite parallel protocol interception planes & boundary seam
 * - exchange: Pencore bidirectional harmonic arcs & 3 certainty strata
 * - lattice: HMOS Model 7-layer concentric cross-coupled geometric lattice
 */
export function ArchitecturalMotif({
  motifId,
  accentHex,
  variant = 'card',
}: ArchitecturalMotifProps) {
  const opacityClass =
    variant === 'hero'
      ? 'opacity-90'
      : variant === 'modal'
        ? 'opacity-80'
        : 'opacity-85 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]';

  if (motifId === 'planes') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 480 320"
        preserveAspectRatio="xMidYMid slice"
        className={`pointer-events-none absolute inset-0 h-full w-full ${opacityClass}`}
      >
        <defs>
          <linearGradient id={`planes-fade-${variant}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.11" />
            <stop offset="55%" stopColor={accentHex} stopOpacity="0.03" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="480" height="320" fill={`url(#planes-fade-${variant})`} />

        {/* Architectural baseline coordinate grid */}
        <g stroke="#111312" strokeOpacity="0.055" strokeWidth="1">
          <line x1="0" y1="64" x2="480" y2="64" />
          <line x1="0" y1="128" x2="480" y2="128" />
          <line x1="0" y1="192" x2="480" y2="192" />
          <line x1="0" y1="256" x2="480" y2="256" />
          <line x1="280" y1="0" x2="280" y2="320" />
          <line x1="360" y1="0" x2="360" y2="320" />
          <line x1="420" y1="0" x2="420" y2="320" />
        </g>

        {/* Four staggered protocol interception planes on right architectural flank */}
        <g fill="none" stroke={accentHex}>
          <path d="M 248 296 L 348 44 L 468 44" strokeOpacity="0.16" strokeWidth="1" />
          <path d="M 272 296 L 372 44 L 476 44" strokeOpacity="0.22" strokeWidth="1" />
          <path d="M 296 296 L 396 44 L 480 44" strokeOpacity="0.3" strokeWidth="1.15" />
          <path d="M 320 296 L 420 44 L 480 44" strokeOpacity="0.18" strokeWidth="1" />
        </g>

        {/* Calibrated boundary seam & inspection ticks */}
        <line
          x1="230"
          y1="168"
          x2="452"
          y2="168"
          stroke={accentHex}
          strokeOpacity="0.35"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <circle cx="347" cy="168" r="3.5" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.4" />
        <circle cx="371" cy="168" r="2.5" fill={accentHex} fillOpacity="0.45" />
        <circle cx="395" cy="168" r="2.5" fill={accentHex} fillOpacity="0.25" />
      </svg>
    );
  }

  if (motifId === 'exchange') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 480 320"
        preserveAspectRatio="xMidYMid slice"
        className={`pointer-events-none absolute inset-0 h-full w-full ${opacityClass}`}
      >
        <defs>
          <radialGradient id={`exchange-glow-${variant}`} cx="76%" cy="48%" r="58%">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.12" />
            <stop offset="65%" stopColor={accentHex} stopOpacity="0.025" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="480" height="320" fill={`url(#exchange-glow-${variant})`} />

        {/* Architectural drafting axes */}
        <g stroke="#111312" strokeOpacity="0.055" strokeWidth="1">
          <line x1="0" y1="160" x2="480" y2="160" />
          <line x1="355" y1="0" x2="355" y2="320" />
        </g>

        {/* Three calibrated certainty strata (Observation / Reachable Sink / Impact) */}
        <g fill="none" stroke={accentHex}>
          <circle cx="355" cy="160" r="126" strokeOpacity="0.14" strokeWidth="1" />
          <circle cx="355" cy="160" r="88" strokeOpacity="0.22" strokeWidth="1" />
          <circle cx="355" cy="160" r="50" strokeOpacity="0.34" strokeWidth="1.2" />
        </g>

        {/* Bidirectional interlocking exchange arcs */}
        <path
          d="M 244 128 C 296 76, 408 76, 456 138"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.32"
          strokeWidth="1.2"
        />
        <path
          d="M 456 182 C 408 244, 296 244, 244 192"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.32"
          strokeWidth="1.2"
          strokeDasharray="4 4"
        />

        {/* Registration nodes */}
        <circle cx="355" cy="160" r="4" fill={accentHex} fillOpacity="0.75" />
        <circle cx="267" cy="160" r="3" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
        <circle cx="443" cy="160" r="3" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
      </svg>
    );
  }

  // lattice — HMOS Model Unified Seven-Layer Brain geometric architecture
  const radii = [24, 42, 60, 78, 96, 114, 132];
  const spokes = [0, 45, 90, 135, 180, 225, 270, 315];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 480 320"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${opacityClass}`}
    >
      <defs>
        <radialGradient id={`lattice-glow-${variant}`} cx="78%" cy="50%" r="56%">
          <stop offset="0%" stopColor={accentHex} stopOpacity="0.12" />
          <stop offset="65%" stopColor={accentHex} stopOpacity="0.025" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="320" fill={`url(#lattice-glow-${variant})`} />

      {/* Cross-layer radial coupling chords */}
      <g stroke={accentHex} strokeOpacity="0.14" strokeWidth="1">
        {spokes.map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x2 = 368 + Math.cos(rad) * 144;
          const y2 = 160 + Math.sin(rad) * 144;
          return <line key={angle} x1="368" y1="160" x2={x2} y2={y2} />;
        })}
      </g>

      {/* Exactly seven concentric architectural layer rings */}
      <g fill="none" stroke={accentHex}>
        {radii.map((r, idx) => (
          <circle
            key={r}
            cx="368"
            cy="160"
            r={r}
            strokeOpacity={idx === 3 || idx === 6 ? 0.34 : 0.16}
            strokeWidth={idx === 3 ? 1.2 : 1}
          />
        ))}
      </g>

      {/* Nucleus & orbital registration ticks */}
      <circle cx="368" cy="160" r="4" fill={accentHex} fillOpacity="0.8" />
      <circle cx="368" cy="82" r="2.6" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.25" />
      <circle cx="290" cy="160" r="2.6" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.25" />
      <circle cx="446" cy="160" r="2.6" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.25" />
      <circle cx="368" cy="238" r="2.6" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.25" />
    </svg>
  );
}
