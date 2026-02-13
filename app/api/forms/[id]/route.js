import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  try {
    const { params } = context;

    const client = await clientPromise;
    const db = client.db("floating");

    const form = await db
      .collection("forms")
      .findOne({ id: params.id }); // ✅ string id

    if (!form) {
      return NextResponse.json(
        { error: "Form not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(form);
  } catch (error) {
    console.error("Error fetching form:", error);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
