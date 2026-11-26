import type { ArchitectureMode, ModelPillar, ProjectEntry } from '../lib/atlas';

export const STUDIO_META = {
  brand: 'Ideolect',
  kicker: 'Independent systems studio',
  heroLineOne: 'Intelligence,',
  heroLineTwo: 'in formation.',
  heroDescription:
    'Three independent systems by Ideolect — spanning live security engineering, bidirectional cyber intelligence, and the independent HMOS Model built on its own weights.',
  systemsKicker: 'System index',
  systemsHeading: 'Selected systems',
  systemsNote:
    'Each work stands as an independent instrument by Ideolect, designed around a single discipline and connected by verified engineering.',
  visionKicker: 'Studio vision',
  visionHeading: 'Own weights, proven in the work.',
  visionParagraphs: [
    'Software, security, and reasoning are usually divided across separate teams and brittle handoffs. Ideolect approaches them as one continuous discipline: PenSuite observes and tests live systems with surgical precision, Pencore trades intelligence bidirectionally with every active trace, and the HMOS Model carries formal reasoning across logic, algorithms, experiments, proofs, and complex engineering.',
    'Nothing is built as a thin wrapper or a sequential cascade of heuristics. Every system by Ideolect is engineered to keep evidence legible, computation jointly learned across layers, and execution close to the silicon it runs on — with our own weights, our own reasoning, and our own solutions.',
  ],
  visionColophon: 'Logic · Algorithms · Experiments · Proofs · Complex engineering',
} as const;

export const PROJECTS: readonly ProjectEntry[] = [
  {
    id: 'pensuite',
    index: '01',
    name: 'PenSuite',
    discipline: 'Security software',
    formLabel: 'Intercept planes',
    motifId: 'planes',
    accentHex: '#1F6B57',
    accentTint: 'rgba(31, 107, 87, 0.075)',
    plateEyebrow: '01 · Security Software',
    plateHeadline: 'Intercept. Replay. Prove.',
    plateSubline: 'Live protocol inspection and multi-role verification built for minimal, redacted proof.',
    platePoints: ['Live traffic interception', 'Multi-role session replay', 'Minimal redacted proof'],
    summary:
      'A precision security testing workbench for live traffic interception, multi-role replay, and minimal verifiable proof.',
    principleLine: 'Live interception · Redacted proof',
    lead: 'PenSuite is built for engineers who inspect applications from the wire up — turning opaque HTTP and session behavior into reproducible, auditable evidence.',
    sections: [
      {
        heading: 'Live interception without noise',
        body: 'Requests, responses, and role boundaries are captured as structured planes rather than flat logs. Investigators isolate authorization seams, replay mutations across identities, and compare state transitions side by side without leaving the primary flow.',
      },
      {
        heading: 'Minimal verifiable proof',
        body: 'Every finding is reduced to the smallest reproducible exchange required to confirm impact. Sensitive credentials and session tokens are automatically redacted before artifacts leave the workspace, keeping verification clean and defensible.',
      },
      {
        heading: 'Coupled to Pencore',
        body: 'Rather than exporting static scan dumps at the end of a test, PenSuite maintains a live bidirectional channel with Pencore — supplying real runtime context and receiving focused hypotheses as the target surface responds.',
      },
    ],
  },
  {
    id: 'pencore',
    index: '02',
    name: 'Pencore',
    discipline: 'Cybersecurity intelligence',
    formLabel: 'Bidirectional loop',
    motifId: 'exchange',
    accentHex: '#A85524',
    accentTint: 'rgba(168, 85, 36, 0.08)',
    plateEyebrow: '02 · Cybersecurity Intelligence',
    plateHeadline: 'Bidirectional Cyber Model.',
    plateSubline: 'Live two-way exchange with PenSuite separating observation, reachable sink, and demonstrated impact.',
    platePoints: ['Bidirectional intelligence exchange', 'Observation vs. reachable sink', 'Demonstrated, redacted impact'],
    summary:
      'A dedicated cyber model built on bidirectional intelligence exchange — separating observation, reachable sink, and demonstrated impact.',
    principleLine: 'Bidirectional exchange · Verified impact',
    lead: 'Pencore is a specialized cybersecurity intelligence model engineered to reason alongside live security instrumentation rather than operate as a one-way static scanner.',
    sections: [
      {
        heading: 'Bidirectional intelligence exchange',
        body: 'Conventional security automation pushes payloads forward in blind sequential sweeps. Pencore exchanges context in both directions with PenSuite: live responses reshape active hypotheses immediately, and refined hypotheses guide the next targeted check.',
      },
      {
        heading: 'Strict separation of certainty',
        body: 'Pencore enforces a disciplined boundary between three distinct tiers: raw surface observation, a confirmed reachable sink, and demonstrated impact. Teams never confuse a speculative signal for verified exposure.',
      },
      {
        heading: 'Redacted, accountable outputs',
        body: 'Every conclusion traces back to bounded, redacted evidence rather than unverified summaries — giving security and engineering teams a shared record they can validate and remediate immediately.',
      },
    ],
  },
  {
    id: 'hmos-model',
    index: '03',
    name: 'HMOS Model',
    discipline: 'Multi-model agent',
    formLabel: 'Seven-layer field',
    motifId: 'lattice',
    accentHex: '#5B4382',
    accentTint: 'rgba(91, 67, 130, 0.075)',
    plateEyebrow: '03 · Independent HMOS Model',
    plateHeadline: 'Unified Seven-Layer Brain.',
    plateSubline: 'Cross-layer computation for logic, algorithms, experiments, proofs, and complex engineering.',
    platePoints: ['Jointly learned seven-layer brain', 'Verified intelligence training', 'Own weights · Own reasoning'],
    summary:
      'An independent seven-layer reasoning architecture for logic, algorithms, experiments, proofs, and complex engineering.',
    principleLine: 'Unified seven-layer brain · Own weights',
    lead: 'The Independent HMOS Model is engineered for disciplined technical thought — uniting cross-layer computation, verified training, and silicon-native execution under one sovereign architecture.',
    sections: [
      {
        heading: 'Unified Seven-Layer Brain',
        body: 'Jointly learned intelligence and cross-layer computation driven by bidirectional intelligence exchange, not seven sequential processing stages. Representation, formal logic, algorithmic synthesis, and verification inform one another simultaneously.',
      },
      {
        heading: 'Verified Intelligence Training',
        body: 'Training is grounded in correct solutions, structured failure analysis, counterexamples, and iterative optimization — ensuring the model learns why an argument holds or breaks rather than imitating surface fluency.',
      },
      {
        heading: 'Silicon-Native Optimization',
        body: 'Adaptive reasoning depth, optimized kernels, and accelerated inference align the reasoning loop directly with underlying compute so complex proofs and engineering workloads run with disciplined efficiency.',
      },
      {
        heading: 'Independent HMOS Model',
        body: 'Own weights · Own reasoning · Own solutions. Built from first principles for logic, algorithms, experiments, proofs, and complex engineering without reliance on opaque external wrappers.',
      },
    ],
  },
];

export const MODEL_PILLARS: readonly ModelPillar[] = [
  {
    index: '01',
    title: 'Unified Seven-Layer Brain',
    subtitle: 'Jointly learned intelligence and cross-layer computation',
    detail:
      'Built on bidirectional intelligence exchange across all seven layers simultaneously — never a rigid cascade of seven sequential processing stages.',
  },
  {
    index: '02',
    title: 'Verified Intelligence Training',
    subtitle: 'Correct solutions, failure analysis, counterexamples and optimization',
    detail:
      'Every reasoning trajectory is sharpened against formal checks, edge-case refutations, and repeatable optimization rather than unverified consensus.',
  },
  {
    index: '03',
    title: 'Silicon-Native Optimization',
    subtitle: 'Adaptive reasoning, optimized kernels and accelerated inference',
    detail:
      'Compute scales dynamically with problem complexity through custom execution kernels and hardware-aligned inference paths.',
  },
  {
    index: '04',
    title: 'Independent HMOS Model',
    subtitle: 'Own weights · Own reasoning · Own solutions',
    detail:
      'Architected end-to-end for logic, algorithms, experiments, proofs, and complex engineering with full sovereignty over every weight and decision.',
  },
];

export const ARCHITECTURE_MODES: readonly ArchitectureMode[] = [
  {
    id: 'seven-layer',
    label: 'Unified Seven-Layer Brain',
    kicker: 'Cross-layer topology',
    heading: 'Bidirectional intelligence exchange, not seven sequential stages.',
    body: 'Instead of passing tokens down a one-way assembly line where early errors compound unchecked, all seven layers exchange constraints, counterexamples, and structural hypotheses in both directions until logic, algorithms, and proofs converge.',
    footnote: 'Jointly learned intelligence · Cross-layer computation · Convergence by verification',
  },
  {
    id: 'exchange',
    label: 'PenSuite ↔ Pencore Loop',
    kicker: 'Security coupling',
    heading: 'Live instrumentation and cyber reasoning in closed dialogue.',
    body: 'PenSuite captures real protocol planes and multi-role state transitions; Pencore analyzes reachable paths and returns surgical verification hypotheses. Observation, reachable sink, and demonstrated impact remain strictly separated.',
    footnote: 'Live interception · Bidirectional context · Minimal redacted proof',
  },
];
