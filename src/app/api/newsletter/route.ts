import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const email = formData.get("email")?.toString();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Valid email required" },
        { status: 400 }
      );
    }

    // In production: add to Mailchimp or your mailing list
    // await mailchimp.lists.addMember({ listId, email, ... });

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Newsletter API error:", e);
    return NextResponse.json(
      { error: "Subscription failed" },
      { status: 500 }
    );
  }
}
