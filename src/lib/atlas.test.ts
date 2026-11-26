import test from 'node:test';
import assert from 'node:assert/strict';
import { stepProjectIndex, resolveProjectById, findConfidentialLeaks } from './atlas';
import {
  ARCHITECTURE_MODES,
  MODEL_PILLARS,
  PROJECTS,
  STUDIO_META,
} from '../content/portfolio';

test('stepProjectIndex cycles forward and backward cleanly', () => {
  assert.equal(stepProjectIndex(0, 1, 3), 1);
  assert.equal(stepProjectIndex(2, 1, 3), 0);
  assert.equal(stepProjectIndex(0, -1, 3), 2);
  assert.equal(stepProjectIndex(1, -1, 3), 0);
  assert.equal(stepProjectIndex(0, 4, 3), 1);
  assert.equal(stepProjectIndex(0, 1, 0), 0);
});

test('resolveProjectById resolves exact entries and handles missing values', () => {
  assert.equal(resolveProjectById(PROJECTS, 'pensuite')?.name, 'PenSuite');
  assert.equal(resolveProjectById(PROJECTS, 'pencore')?.name, 'Pencore');
  assert.equal(resolveProjectById(PROJECTS, 'hmos-model')?.name, 'HMOS Model');
  assert.equal(resolveProjectById(PROJECTS, 'cortex'), null);
  assert.equal(resolveProjectById(PROJECTS, null), null);
});

test('all portfolio sections define complete editorial copy and zero confidential or off-brand leaks', () => {
  assert.equal(STUDIO_META.brand, 'Ideolect');
  assert.equal(PROJECTS.length, 3);
  assert.equal(MODEL_PILLARS.length, 4);
  assert.equal(ARCHITECTURE_MODES.length, 2);

  const allCopy: string[] = [
    STUDIO_META.brand,
    STUDIO_META.kicker,
    STUDIO_META.heroLineOne,
    STUDIO_META.heroLineTwo,
    STUDIO_META.heroDescription,
    STUDIO_META.systemsHeading,
    STUDIO_META.systemsNote,
    STUDIO_META.visionHeading,
    STUDIO_META.visionColophon,
    ...STUDIO_META.visionParagraphs,
    ...MODEL_PILLARS.flatMap((p) => [p.title, p.subtitle, p.detail]),
    ...ARCHITECTURE_MODES.flatMap((m) => [m.label, m.kicker, m.heading, m.body, m.footnote]),
  ];

  for (const project of PROJECTS) {
    assert.ok(project.plateHeadline.length > 0);
    assert.equal(project.platePoints.length, 3);
    allCopy.push(
      project.name,
      project.discipline,
      project.formLabel,
      project.plateEyebrow,
      project.plateHeadline,
      project.plateSubline,
      ...project.platePoints,
      project.summary,
      project.principleLine,
      project.lead,
      ...project.sections.flatMap((s) => [s.heading, s.body]),
    );
  }

  assert.deepEqual(findConfidentialLeaks(allCopy), []);
});
