import { NextRequest, NextResponse } from "next/server";
import { SavePackage } from "../models/SavePackage";
import connectDB from "../lib/mongodb";

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
    const savedPackage = await SavePackage.create({ packageId });

    return NextResponse.json({
      success: true,
      savedPackageId: savedPackage._id,
    });
  } catch (error) {
    console.error("Error creating savePackage:", error);
    return NextResponse.json(
      {
        error: "Failed to create savePackage",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
