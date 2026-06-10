import { NextResponse } from "next/server";
import { sendInquiryEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      email,
      phoneNumber,
      subject,
      message,
    } = body;

    if (
      !fullName ||
      !email ||
      !phoneNumber ||
      !subject ||
      !message
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 400 }
      );
    }

    await sendInquiryEmail({
      fullName,
      email,
      phoneNumber,
      subject,
      message,
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry submitted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}