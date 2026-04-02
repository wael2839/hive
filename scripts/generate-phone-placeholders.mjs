/**
 * Builds src/lib/country-phone-placeholders.json from libphonenumber-js (national format).
 * ISO list is taken from country-dial-raw.ts. Run: node scripts/generate-phone-placeholders.mjs
 */
import fs from "fs";
import examples from "libphonenumber-js/mobile/examples";
import { getExampleNumber } from "libphonenumber-js";

const txt = fs.readFileSync("src/lib/country-dial-raw.ts", "utf8");
const isos = [
  ...new Set([...txt.matchAll(/iso: "([A-Z]{2})"/g)].map((m) => m[1])),
].sort();

const out = {};
for (const iso of isos) {
  const ex = getExampleNumber(iso, examples);
  if (ex) out[iso] = ex.formatNational();
}

const path = "src/lib/country-phone-placeholders.json";
fs.writeFileSync(path, JSON.stringify(out, null, 2) + "\n");
console.log("wrote", path, "entries", Object.keys(out).length, "/", isos.length);
