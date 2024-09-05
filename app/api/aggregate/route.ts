import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise;
      const database = client.db(process.env.DATABASE);
      const collection = database.collection("CompletedTasks");

      const { searchParams } = new URL(req.url);
      const owner = searchParams.get("owner");
      const aggregatedData = await collection
        .aggregate([
          {
            $match: {
              owner: owner,
            },
          },
          {
            $addFields: {
              dateCreated: { $toDate: "$dateCreated" },
            },
          },
          {
            $group: {
              _id: {
                year: { $year: "$dateCreated" },
                month: { $month: "$dateCreated" },
              },
              totalPoints: { $sum: "$meekPoints" },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 },
          },
          {
            $project: {
              _id: 0,
              year: "$_id.year",
              month: "$_id.month",
              totalPoints: 1,
            },
          },
        ])
        .toArray();

      return NextResponse.json(aggregatedData);
    } catch (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed!" },
      { status: 405 }
    );
  }
}

/*We are using mongodb aggregation pipeline. Here, we are grouping by both year and month, 
where we are extracting the year and month from the dateCreated field. */
