import { NextResponse } from "next/server";
import { getVisitorTotal, incrementVisitorTotal } from "@/lib/visitors-store";

export const runtime = "nodejs";

/** العداد يتغير بين الطلبات — لا يُخزَّن في كاش CDN */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const total = await getVisitorTotal();
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ total: 0 }, { status: 200 });
  }
}

export async function POST() {
  try {
    const total = await incrementVisitorTotal();
    return NextResponse.json({ total });
  } catch {
    return NextResponse.json({ error: "counter_unavailable" }, { status: 503 });
  }
}
