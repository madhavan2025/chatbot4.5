import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("floating");

    const theme = await db.collection("ChatThemes").findOne({ name: "default" });

    return NextResponse.json(theme);
  } catch (err) {
    console.error("Failed to fetch theme:", err);
    return NextResponse.json({ error: "Failed to fetch theme" }, { status: 500 });
  }
}

