import { NextRequest, NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import { Share } from "../../models/Share";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const share = await Share.findById(params.id);

    if (!share) {
      return NextResponse.json({ error: "package not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      packageId: share.packageId,
    });
  } catch (error) {
    console.error("Error fetching share:", error);
    return NextResponse.json(
      { error: "Failed to fetch share" },
      { status: 500 }
    );
  }
}
