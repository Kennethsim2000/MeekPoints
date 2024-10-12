import clientPromise from "../../../lib/supabase";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(req: Request) {
  if (req.method === "GET") {
    try {
      const client = await clientPromise();
      const result = await client.query(`
        SELECT * FROM public."Questions";
      `);
      return NextResponse.json({ tables: result.rows });
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
      const client = await clientPromise();
      const question = await req.json();
      const { rows } = await client.query(
        `INSERT INTO public."Questions"(topic, question, answer, username, date_shown) 
        VALUES($1, $2, $3, $4, $5)
        RETURNING *`,
        [
          question.topic,
          question.question,
          question.answer,
          question.username,
          question.date_shown,
        ]
      );
      return NextResponse.json(rows);
    } catch (error) {
      return NextResponse.json({ message: error });
    }
  } else {
    return NextResponse.json({ message: "Method not allowed!" });
  }
}
