"use client";

import InitialForm from "@/components/dashboard/initialform";
import { useEffect, useState } from "react";


const Page = () => {
  const [isMetaDataAvailable, setIsMetaDataAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch("/api/metadata/fetch");
        const data = await response.json();

        setIsMetaDataAvailable(data.exists);
      } catch (error) {
        console.error("Failed to fetch metadata", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full min-h-screen items-center justify-center">
        <span className="text-zinc-400 text-sm">Loading…</span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex w-full">
      {!isMetaDataAvailable ? (
        <div className="w-full flex items-center justify-center p-4 min-h-screen">
          <InitialForm/>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center p-4 min-h-screen">
          {/* Replace this with dashboard / main app */}
          <span className="text-zinc-400 text-sm">
            Metadata already exists
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;
