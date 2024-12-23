import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const savePackage = async (packageId: string) => {
  try {
    //setIsLoading(true);
    const response = await fetch("/api/saved-package", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ packageId }),
    });

    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to save package");
    }

    const data = await response.json();
    console.log(data);
    //setShareLink("http://localhost:3000/claim/" + data.savedPackageId);
    return data; // This will be your shareable link
  } catch (error) {
    console.log("Error saving package:", error);
  } finally {
    //setIsLoading(false);
  }
};