import { NextResponse } from "next/server";
import { getVisitorTotal, incrementVisitorTotal } from "@/lib/visitors-store";

export const runtime = "nodejs";

/** العداد يتغير بين الطلبات — لا يُخزَّن في كاش CDN */
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const total = await getVisitorTotal();
    return NextResponse.json({ total });
  } catch (error) {
    console.error("[visitors][GET] Failed to read counter:", error);
    return NextResponse.json({ error: "counter_unavailable" }, { status: 503 });
  }
}

export async function POST() {
  try {
    const total = await incrementVisitorTotal();
    return NextResponse.json({ total });
  } catch (error) {
    console.error("[visitors][POST] Failed to increment counter:", error);
    return NextResponse.json({ error: "counter_unavailable" }, { status: 503 });
  }
}
