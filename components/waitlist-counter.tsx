"use client";

import React, { useState, useEffect } from "react";

function WaitlistCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCount = async () => {
    try {
      const response = await fetch("/api/waitlist/count");
      const data = await response.json();
      if (response.ok) {
        setCount(data.count);
      }
    } catch (error) {
      console.error("Failed to fetch count:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchCount();

    // Listen for waitlist updates
    const handleUpdate = () => {
      fetchCount();
    };
    window.addEventListener("waitlist-updated", handleUpdate);

    // Poll for updates every 30 seconds
    const interval = setInterval(fetchCount, 30000);

    // Cleanup
    return () => {
      window.removeEventListener("waitlist-updated", handleUpdate);
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center space-x-2 text-neutral-400">
        <div className="w-4 h-4 border-2 border-neutral-600 border-t-transparent rounded-full animate-spin"></div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex items-baseline space-x-2 text-sm">
        <span className="text-neutral-300">
          {count !== null ? count.toLocaleString() : "0"}
        </span>
        <span className="text-neutral-400">people already joined</span>
      </div>
    </div>
  );
}

export default WaitlistCounter;
