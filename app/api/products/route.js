import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("floating");

    const forms = await db.collection("forms").find({}).toArray();

    return NextResponse.json(forms || []);
  } catch (err) {
    console.error("Failed to fetch forms:", err);
    return NextResponse.json({ error: "Failed to fetch forms" }, { status: 500 });
  }
}
