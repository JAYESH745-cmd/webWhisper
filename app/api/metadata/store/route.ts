import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/db/client";
import { metadata } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorised";

export async function POST(req: Request) {
  // 1️⃣ AUTH CHECK
  const user = await isAuthorized();

  if (!user || !user.email) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 2️⃣ FETCH DETAILS FROM REQUEST
  const { business_name, website_url, external_links } = await req.json();

  // 3️⃣ VALIDATION
  if (!business_name || !website_url) {
    return NextResponse.json(
      { error: "Missing business name or website URL" },
      { status: 400 }
    );
  }

  // 4️⃣ INSERT INTO DATABASE
  await db.insert(metadata).values({
    user_email: user.email,
    business_name,
    website_url,
    external_links,
  });

  // 5️⃣ STORE IN COOKIE (THIS IS WHERE YOU WERE FUCKING UP)
  const cookieStore = await cookies();

  cookieStore.set(
    "metadata",
    JSON.stringify({
      business_name,
      website_url,
      external_links,
    }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    }
  );

  // 6️⃣ RESPONSE
  return NextResponse.json(
    { success: true },
    { status: 201 }
  );
}
