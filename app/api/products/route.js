import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("floating");

  const products = await db.collection("products").find({}).toArray();
console.log(products);

  return NextResponse.json(products);
}
