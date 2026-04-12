import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const FILE = path.join(process.cwd(), "data", "visitors.json");

type Stored = { total: number };

async function ensureParentDir() {
  await mkdir(path.dirname(FILE), { recursive: true });
}

export async function getVisitorTotal(): Promise<number> {
  try {
    const raw = await readFile(FILE, "utf-8");
    const j = JSON.parse(raw) as Stored;
    return typeof j.total === "number" && Number.isFinite(j.total) && j.total >= 0
      ? Math.floor(j.total)
      : 0;
  } catch {
    return 0;
  }
}

export async function incrementVisitorTotal(): Promise<number> {
  const prev = await getVisitorTotal();
  const next = prev + 1;
  try {
    await ensureParentDir();
    const payload: Stored = { total: next };
    await writeFile(FILE, `${JSON.stringify(payload)}\n`, "utf-8");
  } catch {
    /* فشل الكتابة (مثلاً نظام ملفات للقراءة فقط في بعض الاستضافات) — نُرجع المحسوب ذاكريًا */
  }
  return next;
}
