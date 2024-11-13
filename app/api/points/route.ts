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
      const totalPoints = await collection
        .aggregate([
          {
            $match: {
              owner: owner,
            },
          },
          {
            $group: {
              _id: {
                owner: owner,
              },
              points: { $sum: "$meekPoints" },
            },
          },
          {
            $project: {
              // filters documents to only show the requested fields
              _id: 0,
              points: 1,
            },
          },
        ])
        .toArray();
      const pointsThisMonth = await collection
        .aggregate([
          {
            $addFields: {
              dateCreated: { $toDate: "$dateCreated" }, //used to convert the dateCreated to a proper date, which we can use to extract the year and month later
            },
          },
          {
            $match: {
              owner: owner,
              $expr: {
                $eq: [{ $month: "$dateCreated" }, { $month: new Date() }],
              },
            },
          },
          {
            $group: {
              _id: {
                owner: owner,
              },
              points: { $sum: "$meekPoints" },
            },
          },
          {
            $project: {
              _id: 0,
              points: 1,
            },
          },
        ])
        .toArray();
      const res = {
        total: totalPoints[0].points,
        month: pointsThisMonth[0].points,
      };
      return NextResponse.json(res);
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
