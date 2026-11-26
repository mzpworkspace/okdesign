import type { MotifId } from '../lib/atlas';

interface ArchitecturalMotifProps {
  readonly motifId: MotifId;
  readonly accentHex: string;
  readonly variant?: 'hero' | 'card' | 'modal';
}

/**
 * Living Swiss architectural drafting backdrops tailored to each system's
 * real engineering topology — animated purely via GPU/SVG keyframes:
 * - planes: PenSuite parallel protocol interception planes + calibrated seam sweep
 * - exchange: Pencore bidirectional harmonic signal arcs + breathing certainty strata
 * - lattice: HMOS Model 7-layer concentric cross-coupled counter-rotating lattice
 */
export function ArchitecturalMotif({
  motifId,
  accentHex,
  variant = 'card',
}: ArchitecturalMotifProps) {
  const opacityClass =
    variant === 'hero'
      ? 'opacity-95'
      : variant === 'modal'
        ? 'opacity-85'
        : 'opacity-90 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]';

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
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.12" />
            <stop offset="55%" stopColor={accentHex} stopOpacity="0.035" />
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

        {/* Four staggered protocol interception planes */}
        <g fill="none" stroke={accentHex}>
          <path d="M 248 296 L 348 44 L 468 44" strokeOpacity="0.18" strokeWidth="1" />
          <path d="M 272 296 L 372 44 L 476 44" strokeOpacity="0.24" strokeWidth="1" />
          <path d="M 296 296 L 396 44 L 480 44" strokeOpacity="0.34" strokeWidth="1.2" />
          <path d="M 320 296 L 420 44 L 480 44" strokeOpacity="0.2" strokeWidth="1" />

          {/* Traveling live optical trace along primary intercept plane */}
          <path
            d="M 296 296 L 396 44 L 480 44"
            strokeOpacity="0.82"
            strokeWidth="1.8"
            strokeDasharray="36 204"
            className="arch-flow-forward"
          />
          <path
            d="M 248 296 L 348 44 L 468 44"
            strokeOpacity="0.52"
            strokeWidth="1.35"
            strokeDasharray="24 216"
            className="arch-flow-reverse"
          />
        </g>

        {/* Calibrated horizontal inspection seam + animated sweep indicator */}
        <line
          x1="226"
          y1="168"
          x2="462"
          y2="168"
          stroke={accentHex}
          strokeOpacity="0.34"
          strokeWidth="1"
          strokeDasharray="4 4"
        />

        <g className="arch-seam-sweep">
          <line x1="312" y1="146" x2="312" y2="190" stroke={accentHex} strokeOpacity="0.65" strokeWidth="1.2" />
          <circle cx="312" cy="168" r="4" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.6" />
        </g>

        <circle cx="347" cy="168" r="3" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
        <circle cx="371" cy="168" r="2.4" fill={accentHex} fillOpacity="0.5" />
        <circle cx="395" cy="168" r="2.4" fill={accentHex} fillOpacity="0.3" />
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
          <radialGradient id={`exchange-glow-${variant}`} cx="75%" cy="48%" r="58%">
            <stop offset="0%" stopColor={accentHex} stopOpacity="0.14" />
            <stop offset="65%" stopColor={accentHex} stopOpacity="0.03" />
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
          <circle cx="355" cy="160" r="126" strokeOpacity="0.16" strokeWidth="1" />
          <circle cx="355" cy="160" r="88" strokeOpacity="0.24" strokeWidth="1" />
          <circle cx="355" cy="160" r="50" strokeOpacity="0.38" strokeWidth="1.2" />
          <circle
            cx="355"
            cy="160"
            r="50"
            strokeOpacity="0.55"
            strokeWidth="1.2"
            className="arch-breathe"
            style={{ transformOrigin: '355px 160px' }}
          />
          {/* Slow orbital calibration arc */}
          <circle
            cx="355"
            cy="160"
            r="88"
            strokeOpacity="0.65"
            strokeWidth="1.5"
            strokeDasharray="34 520"
            className="arch-orbit-cw"
            style={{ transformOrigin: '355px 160px' }}
          />
        </g>

        {/* Bidirectional interlocking exchange arcs with traveling live pulses */}
        <path
          d="M 244 128 C 296 76, 408 76, 456 138"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.28"
          strokeWidth="1.15"
        />
        <path
          d="M 244 128 C 296 76, 408 76, 456 138"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.88"
          strokeWidth="1.8"
          strokeDasharray="32 208"
          className="arch-flow-forward"
        />

        <path
          d="M 456 182 C 408 244, 296 244, 244 192"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.28"
          strokeWidth="1.15"
          strokeDasharray="4 4"
        />
        <path
          d="M 456 182 C 408 244, 296 244, 244 192"
          fill="none"
          stroke={accentHex}
          strokeOpacity="0.82"
          strokeWidth="1.8"
          strokeDasharray="32 208"
          className="arch-flow-forward"
        />

        {/* Registration nodes */}
        <circle cx="355" cy="160" r="4.5" fill={accentHex} fillOpacity="0.85" />
        <circle cx="267" cy="160" r="3.2" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.4" />
        <circle cx="443" cy="160" r="3.2" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.4" />
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
          <stop offset="0%" stopColor={accentHex} stopOpacity="0.14" />
          <stop offset="65%" stopColor={accentHex} stopOpacity="0.03" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="480" height="320" fill={`url(#lattice-glow-${variant})`} />

      {/* Cross-layer radial coupling chords */}
      <g stroke={accentHex} strokeOpacity="0.15" strokeWidth="1">
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
            strokeOpacity={idx === 3 || idx === 6 ? 0.36 : 0.17}
            strokeWidth={idx === 3 ? 1.2 : 1}
          />
        ))}

        {/* Bidirectional counter-rotating orbital intelligence vectors across layers */}
        <circle
          cx="368"
          cy="160"
          r="78"
          strokeOpacity="0.82"
          strokeWidth="1.7"
          strokeDasharray="32 460"
          className="arch-orbit-cw"
          style={{ transformOrigin: '368px 160px' }}
        />
        <circle
          cx="368"
          cy="160"
          r="114"
          strokeOpacity="0.68"
          strokeWidth="1.5"
          strokeDasharray="42 680"
          className="arch-orbit-ccw"
          style={{ transformOrigin: '368px 160px' }}
        />
        <circle
          cx="368"
          cy="160"
          r="42"
          strokeOpacity="0.58"
          strokeWidth="1.35"
          strokeDasharray="18 250"
          className="arch-orbit-ccw"
          style={{ transformOrigin: '368px 160px' }}
        />
      </g>

      {/* Nucleus & rotating registration nodes */}
      <circle
        cx="368"
        cy="160"
        r="14"
        fill="none"
        stroke={accentHex}
        strokeWidth="1"
        className="arch-breathe"
        style={{ transformOrigin: '368px 160px' }}
      />
      <circle cx="368" cy="160" r="4.5" fill={accentHex} fillOpacity="0.85" />
      <g className="arch-orbit-cw" style={{ transformOrigin: '368px 160px' }}>
        <circle cx="368" cy="82" r="2.8" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
        <circle cx="446" cy="160" r="2.8" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
        <circle cx="368" cy="238" r="2.8" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
        <circle cx="290" cy="160" r="2.8" fill="#FFFFFF" stroke={accentHex} strokeWidth="1.3" />
      </g>
    </svg>
  );
}
