import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

/*
 * This is used to obtain all the tasks that has been completed by both kenneth and jamie(can be used by the history section)
 */
export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("CompletedTasks");
      const allData = await collection.find({}).sort({ _id: -1 }).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}

/*
 * This is used to post a new completedTask after completion of task
 */
export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("CompletedTasks");
      const completedTask = await req.json();
      await collection.insertOne(completedTask);
      const allData = await collection.find({}).sort({ _id: -1 }).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}
