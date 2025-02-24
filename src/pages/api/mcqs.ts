import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const collection = db.collection("questions");

    const mcqs = await collection.find({}).toArray();

    return res.status(200).json(mcqs);
  } catch (error) {
    console.error("Database fetch error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
