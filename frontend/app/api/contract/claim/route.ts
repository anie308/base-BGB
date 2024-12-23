// app/api/claim/route.ts
import { BGBContract } from "@/app/api/lib/contractSetup";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { address, packageId } = body;

    if (!address || !packageId) {
      return NextResponse.json(
        { error: "address and packageId are required" },
        { status: 400 }
      );
    }

    // Initialize contract
    const bgbContract = new BGBContract();

    // Call claim function
    const transaction = await bgbContract.claim(address, packageId);

    return NextResponse.json(
      {
        success: true,
        message: "Claim initiated successfully",
        transactionHash: transaction,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in claim endpoint:", error);
    return NextResponse.json(
      {
        error: "Failed to process claim",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
