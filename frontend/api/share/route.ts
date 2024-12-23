// app/api/share/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "../lib/mongodb";
import { Share } from "../models/Share";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { packageId } = body;

    if (!packageId) {
      return NextResponse.json(
        { error: "packageId is required" },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectDB();

    // Create new share document
    const share = await Share.create({ packageId });

    return NextResponse.json({
      success: true,
      shareId: share._id,
    });
  } catch (error) {
    console.error("Error creating share:", error);
    return NextResponse.json(
      {
        error: "Failed to create share",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
