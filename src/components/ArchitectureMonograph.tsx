import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ARCHITECTURE_MODES, MODEL_PILLARS } from '../content/portfolio';
import type { ArchitectureMode } from '../lib/atlas';

const ARCHITECTURAL_EASE = [0.22, 1, 0.36, 1] as const;

function SevenLayerDiagram() {
  const radii = [28, 46, 64, 82, 100, 118, 136];
  const nodeAngles = [0, 51, 103, 154, 206, 257, 309];

  return (
    <svg
      viewBox="0 0 360 320"
      role="img"
      aria-label="Architectural diagram of the Unified Seven-Layer Brain showing seven concentric cross-coupled layers exchanging intelligence bidirectionally"
      className="h-full w-full max-w-[380px]"
    >
      {/* Subtle cross axes */}
      <line x1="180" y1="14" x2="180" y2="306" stroke="#DCDFDA" strokeWidth="1" />
      <line x1="34" y1="160" x2="326" y2="160" stroke="#DCDFDA" strokeWidth="1" />

      {/* Bidirectional cross-layer chords */}
      {nodeAngles.map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        const r = radii[idx] ?? 100;
        const x = 180 + Math.cos(rad) * r;
        const y = 160 + Math.sin(rad) * r;
        return (
          <motion.line
            key={`chord-${deg}`}
            x1="180"
            y1="160"
            x2={x}
            y2={y}
            stroke="#5B4382"
            strokeOpacity="0.28"
            strokeWidth="1"
            strokeDasharray="3 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: idx * 0.06, ease: ARCHITECTURAL_EASE }}
          />
        );
      })}

      {/* Seven jointly learned concentric rings */}
      {radii.map((r, idx) => (
        <motion.circle
          key={`ring-${r}`}
          cx="180"
          cy="160"
          r={r}
          fill="none"
          stroke={idx === 6 || idx === 3 || idx === 0 ? '#5B4382' : '#BFC4BC'}
          strokeOpacity={idx === 6 ? 0.6 : idx === 3 ? 0.55 : 0.7}
          strokeWidth={idx === 3 ? 1.25 : 1}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: idx * 0.05, ease: ARCHITECTURAL_EASE }}
          style={{ transformOrigin: '180px 160px' }}
        />
      ))}

      {/* Bidirectional orbital energy path (clockwise & counter-clockwise) */}
      <motion.circle
        cx="180"
        cy="160"
        r="82"
        fill="none"
        stroke="#5B4382"
        strokeWidth="1.6"
        strokeDasharray="24 230"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '180px 160px' }}
      />
      <motion.circle
        cx="180"
        cy="160"
        r="118"
        fill="none"
        stroke="#A85524"
        strokeWidth="1.4"
        strokeDasharray="20 350"
        animate={{ rotate: -360 }}
        transition={{ duration: 19, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: '180px 160px' }}
      />

      {/* Seven layer nodes */}
      {nodeAngles.map((deg, idx) => {
        const rad = (deg * Math.PI) / 180;
        const r = radii[idx] ?? 100;
        const x = 180 + Math.cos(rad) * r;
        const y = 160 + Math.sin(rad) * r;
        return (
          <motion.circle
            key={`node-${deg}`}
            cx={x}
            cy={y}
            r="3.2"
            fill="#FFFFFF"
            stroke="#5B4382"
            strokeWidth="1.4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.45, delay: 0.25 + idx * 0.05, ease: ARCHITECTURAL_EASE }}
          />
        );
      })}

      {/* Central unified nucleus */}
      <circle cx="180" cy="160" r="6" fill="#5B4382" />
      <circle cx="180" cy="160" r="14" fill="none" stroke="#5B4382" strokeOpacity="0.35" strokeWidth="1" />

      {/* Quiet technical annotation */}
      <text
        x="180"
        y="314"
        textAnchor="middle"
        fill="#5C615E"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.06em"
      >
        7 layers · Bidirectional cross-computation
      </text>
    </svg>
  );
}

function SecurityExchangeDiagram() {
  return (
    <svg
      viewBox="0 0 360 320"
      role="img"
      aria-label="Architectural diagram of bidirectional intelligence exchange between PenSuite and Pencore"
      className="h-full w-full max-w-[380px]"
    >
      {/* Subtle architectural baseline */}
      <line x1="28" y1="160" x2="332" y2="160" stroke="#DCDFDA" strokeWidth="1" />

      {/* Left architectural plane: PenSuite */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: ARCHITECTURAL_EASE }}
      >
        <rect
          x="32"
          y="108"
          width="94"
          height="104"
          rx="4"
          fill="#FFFFFF"
          stroke="#1F6B57"
          strokeWidth="1.25"
        />
        <line x1="46" y1="138" x2="112" y2="138" stroke="#1F6B57" strokeOpacity="0.35" strokeWidth="1" />
        <line x1="46" y1="154" x2="104" y2="154" stroke="#1F6B57" strokeOpacity="0.25" strokeWidth="1" />
        <line x1="46" y1="170" x2="112" y2="170" stroke="#1F6B57" strokeOpacity="0.35" strokeWidth="1" />
        <text
          x="79"
          y="194"
          textAnchor="middle"
          fill="#1F6B57"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.06em"
        >
          PENSUITE
        </text>
      </motion.g>

      {/* Right architectural knot: Pencore */}
      <motion.g
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: ARCHITECTURAL_EASE }}
      >
        <rect
          x="234"
          y="108"
          width="94"
          height="104"
          rx="4"
          fill="#FFFFFF"
          stroke="#A85524"
          strokeWidth="1.25"
        />
        <circle cx="281" cy="150" r="20" fill="none" stroke="#A85524" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="281" cy="150" r="10" fill="none" stroke="#A85524" strokeWidth="1.2" />
        <text
          x="281"
          y="194"
          textAnchor="middle"
          fill="#A85524"
          fontSize="10"
          fontFamily="JetBrains Mono, monospace"
          letterSpacing="0.06em"
        >
          PENCORE
        </text>
      </motion.g>

      {/* Upper arc: PenSuite -> Pencore (Live context) */}
      <path
        d="M 126 134 C 158 88, 202 88, 232 132"
        fill="none"
        stroke="#1F6B57"
        strokeOpacity="0.38"
        strokeWidth="1.2"
      />
      <path
        d="M 225 128 L 233 133 L 231 124"
        fill="none"
        stroke="#1F6B57"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M 126 134 C 158 88, 202 88, 232 132"
        fill="none"
        stroke="#1F6B57"
        strokeWidth="1.8"
        strokeDasharray="18 140"
        animate={{ strokeDashoffset: [158, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Lower arc: Pencore -> PenSuite (Verified hypotheses) */}
      <path
        d="M 234 186 C 202 232, 158 232, 128 188"
        fill="none"
        stroke="#A85524"
        strokeOpacity="0.38"
        strokeWidth="1.2"
      />
      <path
        d="M 135 192 L 127 187 L 129 196"
        fill="none"
        stroke="#A85524"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.path
        d="M 234 186 C 202 232, 158 232, 128 188"
        fill="none"
        stroke="#A85524"
        strokeWidth="1.8"
        strokeDasharray="18 140"
        animate={{ strokeDashoffset: [158, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
      />

      {/* Center verification node */}
      <circle cx="180" cy="160" r="5" fill="#111312" />
      <text
        x="180"
        y="78"
        textAnchor="middle"
        fill="#1F6B57"
        fontSize="9.5"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.05em"
      >
        Live trace &amp; state
      </text>
      <text
        x="180"
        y="246"
        textAnchor="middle"
        fill="#A85524"
        fontSize="9.5"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.05em"
      >
        Targeted hypothesis
      </text>
      <text
        x="180"
        y="314"
        textAnchor="middle"
        fill="#5C615E"
        fontSize="10"
        fontFamily="JetBrains Mono, monospace"
        letterSpacing="0.06em"
      >
        Observation · Reachable sink · Impact
      </text>
    </svg>
  );
}

export function ArchitectureMonograph() {
  const [activeModeId, setActiveModeId] = useState<ArchitectureMode['id']>('seven-layer');
  const activeMode =
    ARCHITECTURE_MODES.find((mode) => mode.id === activeModeId) ?? ARCHITECTURE_MODES[0];

  return (
    <section
      id="architecture"
      aria-labelledby="architecture-heading"
      className="border-b border-line bg-surface"
    >
      {/* Upper Spread: Bidirectional Architecture */}
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-stretch px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:px-14">
        <div className="flex flex-col justify-between py-14 sm:py-18 lg:border-r lg:border-line lg:py-20 lg:pr-14">
          <div>
            <div className="mb-4 flex items-center gap-3 font-mono text-[12px] tracking-[0.1em] text-violet">
              <span aria-hidden="true" className="inline-block h-px w-6 bg-violet" />
              <span>Architectural discipline</span>
            </div>

            {/* Quiet Single-Row Editorial Mode Switcher (WAI-ARIA keyboard-accessible underline tabs) */}
            <div
              role="tablist"
              aria-label="Architectural topology perspective"
              onKeyDown={(event) => {
                if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                  event.preventDefault();
                  const next = activeMode.id === 'seven-layer' ? 'exchange' : 'seven-layer';
                  setActiveModeId(next);
                }
              }}
              className="no-scrollbar mb-8 flex flex-nowrap items-center gap-5 overflow-x-auto border-b border-line sm:gap-7"
            >
              {ARCHITECTURE_MODES.map((mode) => {
                const isSelected = mode.id === activeMode.id;
                return (
                  <button
                    key={mode.id}
                    id={`arch-tab-${mode.id}`}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    aria-controls="arch-panel-content"
                    onClick={() => setActiveModeId(mode.id)}
                    className={`relative min-h-[44px] shrink-0 cursor-pointer pb-3 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 sm:text-[14px] ${
                      isSelected ? 'text-ink' : 'text-ink-muted hover:text-ink'
                    }`}
                  >
                    <span>{mode.label}</span>
                    {isSelected && (
                      <motion.span
                        layoutId="architecture-tab-rule"
                        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
                        className="absolute right-0 bottom-0 left-0 h-[2px] bg-ink"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div
              id="arch-panel-content"
              role="tabpanel"
              aria-labelledby={`arch-tab-${activeMode.id}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeMode.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.36, ease: ARCHITECTURAL_EASE }}
                >
                  <h2
                    id="architecture-heading"
                    className="display-heading max-w-[620px] text-balance text-[clamp(30px,3.2vw,46px)] leading-[1.12] font-medium tracking-[-0.028em] text-ink"
                  >
                    {activeMode.heading}
                  </h2>
                  <p className="mt-5 max-w-[590px] text-[16px] leading-[1.68] text-ink-secondary">
                    {activeMode.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-10 border-t border-line pt-4 font-mono text-[12px] text-ink-muted">
            {activeMode.footnote}
          </div>
        </div>

        {/* Right Kinetic Architectural Plate */}
        <div className="blueprint-grid relative flex min-h-[320px] items-center justify-center border-t border-line py-10 lg:border-t-0 lg:py-14 lg:pl-12">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-5 left-5 font-mono text-[11px] tracking-[0.09em] text-ink-muted lg:left-12"
          >
            {activeMode.kicker}
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-4 right-5 font-mono text-[15px] text-line-strong"
          >
            +
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeMode.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.42, ease: ARCHITECTURAL_EASE }}
              className="flex w-full items-center justify-center px-4 pt-6"
            >
              {activeMode.id === 'seven-layer' ? (
                <SevenLayerDiagram />
              ) : (
                <SecurityExchangeDiagram />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Lower Spread: Independent HMOS Model — Four Foundational Pillars */}
      <div id="principles" className="border-t border-line bg-canvas">
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-4 font-mono text-[12px]">
            <div className="flex items-center gap-3 text-violet">
              <span aria-hidden="true" className="inline-block h-px w-5 bg-violet" />
              <span>Independent HMOS Model</span>
            </div>
            <span className="text-ink-muted">Four foundational principles</span>
          </div>

          <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-2 md:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {MODEL_PILLARS.map((pillar, idx) => (
              <motion.article
                key={pillar.index}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.62,
                  delay: idx * 0.09,
                  ease: ARCHITECTURAL_EASE,
                }}
                className={`group relative flex flex-col justify-between py-9 transition-colors duration-300 hover:bg-surface/75 md:px-6 lg:py-11 ${
                  idx === 0 ? 'md:pl-0 lg:pl-0 lg:pr-6' : ''
                } ${idx === MODEL_PILLARS.length - 1 ? 'lg:pr-0' : ''} ${
                  idx >= 2 ? 'md:border-t md:border-line lg:border-t-0' : ''
                } ${idx % 2 === 1 ? 'md:border-l md:border-line lg:border-l' : ''}`}
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[-1px] right-0 left-0 h-[1.5px] origin-left scale-x-0 bg-violet transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <div>
                  <span className="font-mono text-[12px] tabular-nums text-ink-muted transition-colors duration-300 group-hover:text-violet">
                    {pillar.index}
                  </span>
                  <h3 className="display-heading mt-4 text-[20px] leading-[1.22] font-semibold tracking-[-0.02em] text-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.5] font-medium text-ink-secondary">
                    {pillar.subtitle}
                  </p>
                </div>
                <p className="mt-5 text-[14px] leading-[1.6] text-ink-muted">
                  {pillar.detail}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
