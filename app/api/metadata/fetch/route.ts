import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db/client";
import { metadata } from "@/db/schema";
import { eq } from "drizzle-orm";
import { isAuthorized } from "@/lib/isAuthorised";

export async function GET() {
  // 1️⃣ AUTH
  const user = await isAuthorized();

  if (!user || !user.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 2️⃣ COOKIE FIRST
  const cookieStore = await cookies();
  const metadataCookie = cookieStore.get("metadata");

  if (metadataCookie?.value) {
    return NextResponse.json(
      {
        exists: true,
        source: "cookie",
        data: JSON.parse(metadataCookie.value),
      },
      { status: 200 }
    );
  }

  // 3️⃣ DATABASE FALLBACK
  const record = await db.query.metadata.findFirst({
    where: eq(metadata.user_email, user.email),
  });

  if (record) {
    // 4️⃣ RE-STORE COOKIE FROM DB
    cookieStore.set(
      "metadata",
      JSON.stringify({
        business_name: record.business_name,
      }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
      }
    );

    return NextResponse.json(
      {
        exists: true,
        source: "database",
        data: record,
      },
      { status: 200 }
    );
  }

  // 5️⃣ NOTHING ANYWHERE
  return NextResponse.json(
    { exists: false, data: null },
    { status: 200 }
  );
}
