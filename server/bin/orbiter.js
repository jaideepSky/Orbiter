#!/usr/bin/env node

import { spawn } from "node:child_process";

const child = spawn(
  "npx",
  ["tsx", "src/cli/main.ts", ...process.argv.slice(2)],
  {
    stdio: "inherit",
    shell: true,
  }
);

child.on("exit", (code) => {
  process.exitCode = code ?? 1;
});