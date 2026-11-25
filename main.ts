// One-Line Office Joke Laugh-Off — make.fun entry.
// One original one-line joke about office life, written to
// /output/entry.txt. Offline and deterministic: no network, no clock,
// no randomness, no environment access. The program only emits the line.
import * as fs from "node:fs";

const LINE =
  "I told my boss I was drowning in work, so he enrolled me in \u201cSwimming Lessons\u201d for 8 a.m. Monday \u2014 attendance mandatory.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`office joke violates the 1-200 char single-line gate (${chars} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the office joke");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
