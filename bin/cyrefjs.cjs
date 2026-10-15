#!/usr/bin/env node
"use strict";

try {
  require("../scripts/banner.cjs");
} catch (error) {
  console.error("[CYREFJS] Failed to display the banner.");
  console.error(error.message);
  process.exitCode = 1;
}
