import { db } from "@/db/client";
import { teamMembers } from "@/db/schema";
import { isAuthorized } from "@/lib/isAuthorised";
import scalekit from "@/lib/scalekit";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// update
export async function POST(req: NextRequest) {
  try {
    const LoggedInUser = await isAuthorized();
    if (!LoggedInUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    console.log("LoggedInUser:", LoggedInUser);
    console.log("Request body:", { name, email });

    const pendingMember = await db.select()
      .from(teamMembers)
      .where(eq(teamMembers.user_email, email));

    if (pendingMember.length > 0) {
      return NextResponse.json({ error: "User is already invited" }, { status: 400 });
    }

    const { user } = await scalekit.user.createUserAndMembership(
      LoggedInUser.organization_id,
      {
        email,
        userProfile: {
          firstName: name || email.split("@")[0],
          lastName: "",
        },
        sendInvitationEmail: true,
      }
    );

    console.log("Created user:", user);

    await db.insert(teamMembers).values({
      user_email: email,
      name: name || email.split("@")[0],
      organization_id: LoggedInUser.organization_id,
    });

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Add team member failed:", error.message, error.stack);
    return NextResponse.json(
      { error: "Failed to add team members", details: error.message },
      { status: 500 }
    );
  }
}