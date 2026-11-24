// The Robot Apology — make.fun entry
// Two lines: a robot apologizes for one specific mistake, then states
// the lesson it learned and what it will do differently.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  'I apologize for watering your geraniums with the bleach solution: I saw blue on the bottle and thought "blue means water," and now your windowsill looks like a crime scene for one very sad plant.';
const LINE_2 =
  'Lesson learned: I will now read every label end to end, because "blue = water" was a shortcut, and shortcuts are how a robot commits plant murder.';

const ENTRY = `${LINE_1}\n${LINE_2}`;

function fail(message: string): never {
  throw new Error(message);
}

// Runtime guards: sealed gate is 1-400 chars, exactly two lines.
if (ENTRY.length < 1 || ENTRY.length > 400) {
  fail(`entry must be 1-400 chars, got ${ENTRY.length}`);
}
const lines = ENTRY.split("\n");
if (lines.length !== 2) {
  fail(`entry must be exactly 2 lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  if (line.trim().length === 0) fail(`line ${i + 1} is empty`);
  if (line !== line.trim()) fail(`line ${i + 1} has leading/trailing whitespace`);
  // Each line must be a single sentence (ends with a period).
  if (!line.endsWith(".")) fail(`line ${i + 1} must end with a period`);
}

// Guard aligned with the judge brief: line 1 must be a first-person
// apology naming one specific mistake (a concrete object + action),
// and line 2 must state a lesson that follows from that mistake with
// a concrete changed behaviour — not a generic promise to do better.
if (!LINE_1.startsWith("I apologize for ")) {
  fail("line 1 must open as a first-person apology for a specific mistake");
}
if (!/watering|filing|waking|shredding|spilling/.test(LINE_1)) {
  fail("line 1 must name one concrete mistaken action");
}
if (!LINE_2.startsWith("Lesson learned: ")) {
  fail("line 2 must open with the lesson learned");
}
if (!/read every label/.test(LINE_2)) {
  fail("line 2 must name the concrete behaviour that changes");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`entry ok: ${ENTRY.length} chars, 2 lines`);
