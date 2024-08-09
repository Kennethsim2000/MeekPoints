import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("CompletedTasks");
      const allData = await collection.find({}).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}
