import test from 'node:test';
import assert from 'node:assert/strict';
import { stepProjectIndex, resolveProjectById, findConfidentialLeaks } from './atlas';
import { PROJECTS, MODEL_PILLARS, STUDIO_BRIEF, STUDIO_META } from '../content/portfolio';

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

test('all portfolio projects define typographic plate headings and zero confidential leaks', () => {
  assert.equal(PROJECTS.length, 3);
  assert.equal(MODEL_PILLARS.length, 4);

  const allCopy: string[] = [
    STUDIO_META.heroDescription,
    ...STUDIO_META.visionParagraphs,
    STUDIO_BRIEF.lead,
    ...STUDIO_BRIEF.sections.flatMap((s) => [s.heading, s.body]),
    ...MODEL_PILLARS.flatMap((p) => [p.title, p.subtitle, p.detail]),
  ];

  for (const project of PROJECTS) {
    assert.ok(project.plateHeadline.length > 0);
    assert.equal(project.platePoints.length, 3);
    allCopy.push(
      project.plateEyebrow,
      project.plateHeadline,
      project.plateSubline,
      ...project.platePoints,
      project.summary,
      project.lead,
      ...project.sections.flatMap((s) => [s.heading, s.body]),
    );
  }

  assert.deepEqual(findConfidentialLeaks(allCopy), []);
});
