import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export const dynamic = "force-dynamic";

/*
 * This method is used to obtain the total points, points per month, points this week for a current user.
 */
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
              dateCreated: { $toDate: "$dateCreated" }, //used to convert the dateCreated to a proper date, which we can use to extract the year and month later
            },
          },
          {
            $group: {
              // group by year and month, and obtain totalPoints by summing all of meekPoints
              _id: {
                year: { $year: "$dateCreated" },
                month: { $month: "$dateCreated" },
              },
              totalPoints: { $sum: "$meekPoints" },
            },
          },
          {
            $sort: { "_id.year": 1, "_id.month": 1 }, //sort by both year and month
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
