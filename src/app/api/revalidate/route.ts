import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { SANITY_CACHE_TAG } from "@/lib/sanity/data";

export async function POST(request: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return Response.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET is not set" },
      { status: 500 },
    );
  }

  if (request.nextUrl.searchParams.get("secret") !== secret) {
    return Response.json(
      { revalidated: false, message: "Invalid secret" },
      { status: 401 },
    );
  }

  revalidateTag(SANITY_CACHE_TAG, { expire: 0 });
  return Response.json({ revalidated: true, now: Date.now() });
}
