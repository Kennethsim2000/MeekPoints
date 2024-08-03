import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (req.method === "GET") {
    const client = new MongoClient(process.env.MONGODB_URI!, {});
    try {
      await client.connect();
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("Tasks");
      const allData = await collection.find({}).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    } finally {
      await client.close();
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}
