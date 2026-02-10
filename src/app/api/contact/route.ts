import { NextRequest, NextResponse } from "next/server";

export interface ContactBody {
  honeypot?: string;
  fullName: string;
  email: string;
  phone: string;
  service: string;
  propertyType: string;
  zipCode: string;
  projectDetails?: string;
  preferredContact: string;
  otherService?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactBody = await request.json();

    if (body.honeypot && body.honeypot.length > 0) {
      return NextResponse.json({ success: true, confirmationId: "CSI-SPAM" });
    }

    const { fullName, email, phone, service, propertyType, zipCode, projectDetails, preferredContact } = body;
    if (!fullName || !email || !phone || !service || !zipCode) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const confirmationId = `CSI-${Date.now().toString(36).toUpperCase()}`;

    // In production: save to database (MongoDB/PostgreSQL)
    // await db.quotes.insert({ ...body, confirmationId, status: 'new', createdAt: new Date() });

    // In production: send email via Nodemailer/SendGrid to info@citysuburbinc.com
    // await sendEmail({ to: 'info@citysuburbinc.com', subject: `New Quote: ${confirmationId}`, body: ... });
    // await sendEmail({ to: email, subject: 'We received your quote request', template: 'auto-response', ... });

    return NextResponse.json({
      success: true,
      confirmationId,
    });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Submission failed. Please try again or call (718) 849-8999." },
      { status: 500 }
    );
  }
}
