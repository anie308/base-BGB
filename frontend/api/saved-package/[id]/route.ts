import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { SavePackage } from "../../models/SavePackage";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const savePackage = await SavePackage.findById(params.id);

    if (!savePackage) {
      return NextResponse.json({ error: "package not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      packageId: savePackage.packageId,
    });
  } catch (error) {
    console.error("Error fetching savePackage:", error);
    return NextResponse.json(
      { error: "Failed to fetch savePackage" },
      { status: 500 }
    );
  }
}
