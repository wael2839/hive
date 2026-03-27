import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { locales } from "@/lib/i18n";

/**
 * POST /api/revalidate?secret=YOUR_SECRET
 * Call after deploy (e.g. Vercel deploy hook) to invalidate ISR immediately.
 * Set REVALIDATE_SECRET in production env.
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET;
  if (!expected || secret !== expected) {
    return Response.json({ ok: false }, { status: 401 });
  }
  for (const locale of locales) {
    revalidatePath(`/${locale}`, "layout");
  }
  return Response.json({ ok: true, revalidated: locales });
}
