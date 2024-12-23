"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAccount } from "wagmi";

//this is where the receiver need to have a wallet address before they are allowed to claim the package
const Claim = () => {
  const params = useParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [packageId, setPackageId] = useState("");
  const [isClaiming, setIsClaiming] = useState(false);
  const { address } = useAccount();

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        setIsLoading(true);
        const savePackageId = params.id;
        const response = await fetch(`/api/saved-package/${savePackageId}`);

        if (!response.ok) {
          throw new Error("Package not found");
        }

        const data = await response.json();
        setPackageId(data.packageId);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch package"
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchPackage();
    }
  }, [params.id]);

  const handleClaim = async () => {
    try {
      setIsClaiming(true);
      const response = await fetch("/api/claim", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address, packageId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to claim package");
      }

      // Success - you might want to redirect or show a success message
      router.push("/success"); // Create a success page or modify as needed
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to claim package"
      );
    } finally {
      setIsClaiming(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <p className="text-muted-foreground">Loading package details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex flex-col gap-4">
              <p className="text-sm text-muted-foreground">
                Your package is ready to be claimed. Click the button below to
                proceed.
              </p>
              <button
                onClick={handleClaim}
                disabled={isClaiming}
                className="w-full"
              >
                {isClaiming ? <>Claiming...</> : "Claim Package"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Claim;
