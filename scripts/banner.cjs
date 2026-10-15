"use strict";

const fs = require("node:fs");
const path = require("node:path");

const isTTY = Boolean(process.stdout.isTTY);
const isCI = Boolean(process.env.CI);

const useColor =
  isTTY &&
  !isCI &&
  process.env.NO_COLOR === undefined &&
  process.env.TERM !== "dumb";

const ESC = "\x1B[";
const RESET = `${ESC}0m`;
const BOLD = `${ESC}1m`;
const DIM = `${ESC}2m`;

const C = {
  purple: `${ESC}38;2;167;139;250m`,
  violet: `${ESC}38;2;139;92;246m`,
  cyan: `${ESC}38;2;103;232;249m`,
  white: `${ESC}38;2;248;250;252m`,
  muted: `${ESC}38;2;148;163;184m`,
  green: `${ESC}38;2;74;222;128m`,
  border: `${ESC}38;2;71;85;105m`,
};

function paint(value, ...styles) {
  if (!useColor) return value;

  return `${styles.join("")}${value}${RESET}`;
}

function line(value = "") {
  process.stdout.write(`${value}\n`);
}

function getVersion() {
  try {
    const packagePath = path.join(__dirname, "..", "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packagePath, "utf8"));

    return packageJson.version || "unknown";
  } catch {
    return "unknown";
  }
}

function main() {
  // Keep automated installation logs clean.
  if (!isTTY || isCI) return;

  const version = getVersion();

  const border = paint("  ┃", C.border);
  const corner = paint("  ╭", C.violet);
  const horizontal = paint("─".repeat(48), C.border);
  const bottom = paint("  ╰", C.violet);

  line();

  // Brand mark
  line(
    paint("  ◆", C.cyan, BOLD) +
      paint("  CYREF", C.white, BOLD) +
      paint("JS", C.purple, BOLD) +
      paint("                                      ", C.muted),
  );

  line(paint("  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", C.violet));

  line();

  // Tagline
  line(
    paint("  ENGINEERED FOR ", C.muted, DIM) +
      paint("CLEAN CODE", C.cyan, BOLD),
  );

  line(paint("  JavaScript & TypeScript Utility Library", C.white));

  line();

  // Information panel
  line(corner + horizontal + paint("╮", C.violet));

  line(
    border +
      "  " +
      paint("●", C.green) +
      "  " +
      paint("PACKAGE", C.muted) +
      "   " +
      paint("READY", C.green, BOLD) +
      "                                      " +
      border,
  );

  line(
    border +
      "  " +
      paint("◈", C.purple) +
      "  " +
      paint("VERSION", C.muted) +
      "   " +
      paint(`v${version}`, C.white, BOLD) +
      "                                      " +
      border,
  );

  line(
    border +
      "  " +
      paint("◇", C.cyan) +
      "  " +
      paint("MODULE", C.muted) +
      "    " +
      paint("ESM", C.white) +
      paint("  /  ", C.border) +
      paint("TypeScript", C.white) +
      "                             " +
      border,
  );

  line(bottom + horizontal + paint("╯", C.violet));

  line();

  // Links
  line(
    paint("  ↗ ", C.cyan, BOLD) +
      paint("github.com/VibelessYoung/CyrefJS", C.white),
  );

  line(
    paint("  ◇ ", C.purple) +
      paint("MIT License", C.muted) +
      paint("  ·  ", C.border) +
      paint("Open Source", C.muted),
  );

  line();
}

try {
  main();
} catch {
  // A decorative banner must never interrupt installation.
}
