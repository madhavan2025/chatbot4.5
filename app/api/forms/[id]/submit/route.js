import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  try {
    const { params } = context;
    const body = await req.json();

    const client = await clientPromise;
    const db = client.db("floating");

    // ✅ Basic backend validation
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    const result = await db.collection("form_submissions").insertOne({
      formId: params.id, // ✅ store as string
      name: body.name,
      email: body.email,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      id: result.insertedId,
    });
  } catch (error) {
    console.error("Submission error:", error);

    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
