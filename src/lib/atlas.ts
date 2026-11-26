export type ProjectId = 'pensuite' | 'pencore' | 'hmos-model';

export type MotifId = 'planes' | 'exchange' | 'lattice';

export interface BriefSection {
  readonly heading: string;
  readonly body: string;
}

export interface ProjectEntry {
  readonly id: ProjectId;
  readonly index: string;
  readonly name: string;
  readonly discipline: string;
  readonly formLabel: string;
  readonly motifId: MotifId;
  readonly accentHex: string;
  readonly accentTint: string;
  readonly plateEyebrow: string;
  readonly plateHeadline: string;
  readonly plateSubline: string;
  readonly platePoints: readonly [string, string, string];
  readonly summary: string;
  readonly principleLine: string;
  readonly lead: string;
  readonly sections: readonly BriefSection[];
}

export interface ModelPillar {
  readonly index: string;
  readonly title: string;
  readonly subtitle: string;
  readonly detail: string;
}

export interface ArchitectureMode {
  readonly id: 'exchange' | 'seven-layer';
  readonly label: string;
  readonly kicker: string;
  readonly heading: string;
  readonly body: string;
  readonly footnote: string;
}

/**
 * Pure cyclic index step for the System Atlas and Brief Modal steppers.
 */
export function stepProjectIndex(currentIndex: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  const normalized = ((currentIndex % total) + total) % total;
  return (((normalized + delta) % total) + total) % total;
}

/**
 * Pure project lookup by ID.
 */
export function resolveProjectById<T extends { readonly id: ProjectId }>(
  projects: readonly T[],
  id: string | null | undefined,
): T | null {
  if (!id) return null;
  return projects.find((project) => project.id === id) ?? null;
}

/**
 * Validates that public portfolio copy remains free of confidential internal tokens.
 */
const FORBIDDEN_INTERNAL_PATTERNS: readonly RegExp[] = [
  /\bFP\d{2}\b/i,
  /\bGAP-\d{2}\b/i,
  /\bservice\.py\b/i,
  /\bworker\.py\b/i,
  /\bcgroup_scheduler\b/i,
  /\binternal\/grid\b/i,
  /\binternal\/evolution\b/i,
  /\blorem ipsum\b/i,
];

export function findConfidentialLeaks(textBlocks: readonly string[]): string[] {
  const leaks: string[] = [];
  for (const block of textBlocks) {
    for (const pattern of FORBIDDEN_INTERNAL_PATTERNS) {
      const match = block.match(pattern);
      if (match) {
        leaks.push(match[0]);
      }
    }
  }
  return leaks;
}
