#!/usr/bin/env node
import { run } from "../dist/index.js";

process.noDeprecation = true;
process.on("uncaughtException", err => {
  console.error(err.message || err);
  process.exit(1);
});
run(process.argv);
