"use client";


import { useState } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [shareLink, setShareLink] = useState("");

  //this function should be called after the sender has created a package on the smart contract,
  //when the package id is returned, we can now save it to the database by calling savePackage
  const savePackage = async (packageId: string) => {
    try {
      setIsLoading(true);
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
      setShareLink("http://localhost:3000/claim/" + data.savedPackageId);
      return data; // This will be your shareable link
    } catch (error) {
      console.log("Error saving package:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col min-h-screen font-sans dark:bg-background dark:text-white bg-white text-black">

      <div>
        <h1>Sample to save package</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => savePackage("123")}
        >
          Save Package
        </button>
        {isLoading && <p>Loading...</p>}
        {shareLink && <p>Share Link: {shareLink}</p>}
      </div>
    </div>
  );
}
