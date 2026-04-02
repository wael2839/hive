/**
 * Regenerates src/lib/country-dial-raw.ts from restcountries.com (excludes IL).
 * Run from repo root: node scripts/generate-country-dials.mjs
 */
import fs from "fs";

const url = "https://restcountries.com/v3.1/all?fields=cca2,idd";
const res = await fetch(url);
if (!res.ok) throw new Error(`HTTP ${res.status}`);
const raw = await res.json();

function iddToDial(idd) {
  if (!idd || !idd.root) return null;
  const suf = idd.suffixes;
  if (!suf || suf.length === 0) return null;
  const r = String(idd.root).replace(/^\+/, "");
  if (!r) return null;
  if (r === "1") return "1";
  if (suf.length === 1 && suf[0] === "") return r;
  if (r === "7") return "7";
  const first = suf[0];
  if (first === "") return r;
  return r + first;
}

const rows = [];
for (const c of raw) {
  const iso = c.cca2;
  if (iso === "IL") continue;
  const dial = iddToDial(c.idd);
  if (!dial) continue;
  rows.push({ iso, dial });
}

rows.sort((a, b) => a.iso.localeCompare(b.iso));

const unique = [];
const seen = new Set();
for (const r of rows) {
  const k = `${r.iso}|${r.dial}`;
  if (seen.has(k)) continue;
  seen.add(k);
  unique.push(r);
}

console.log("entries", unique.length);

const body = unique.map((r) => `  { iso: "${r.iso}", dial: "${r.dial}" }`).join(",\n");

const out = `/** Auto-generated — excludes IL. Regenerate: node scripts/generate-country-dials.mjs */\nexport const COUNTRY_DIAL_RAW = [\n${body},\n] as const;\n`;

fs.writeFileSync("src/lib/country-dial-raw.ts", out);
