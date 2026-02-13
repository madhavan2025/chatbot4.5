import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("floating");

  const products = await db.collection("contents").find({}).toArray();

  return NextResponse.json(contents);
}
