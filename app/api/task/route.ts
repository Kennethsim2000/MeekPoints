import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("Tasks");
      const allData = await collection.find({}).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("Tasks");
      const task = await req.json();
      await collection.insertOne(task);
      const allData = await collection.find({}).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}

export async function DELETE(req: Request) {
  if (req.method === "DELETE") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("Tasks");
      const url = new URL(req.url);
      const id = url.searchParams.get("id");
      collection.deleteOne({ _id: new ObjectId(id || "") });
      const allData = await collection.find({}).toArray();
      return NextResponse.json(allData);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}
