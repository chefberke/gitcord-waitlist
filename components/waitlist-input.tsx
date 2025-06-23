"use client";

import React, { useState, useEffect } from "react";

function WaitlistInput() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [retryAfter, setRetryAfter] = useState<number | null>(null);

  // Auto-hide message after 3 seconds for success, 5 seconds for errors
  useEffect(() => {
    if (message) {
      const duration = message.type === "success" ? 3000 : 5000;
      const timer = setTimeout(() => {
        setMessage(null);
        setRetryAfter(null);
      }, duration);

      // Cleanup timer if component unmounts or message changes
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setMessage(null);
    setRetryAfter(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: data.message || "Successfully joined the waitlist!",
        });
        setEmail("");

        // Trigger a custom event to update the counter
        window.dispatchEvent(new Event("waitlist-updated"));
      } else {
        // Handle different error types
        let errorMessage = data.error || "Something went wrong";

        // Handle rate limiting
        if (response.status === 429) {
          const retrySeconds = data.retryAfter || 60;
          setRetryAfter(retrySeconds);
          errorMessage = `Too many requests. Please try again in ${retrySeconds} seconds.`;
        }

        // Handle validation errors
        if (response.status === 400 && data.details) {
          errorMessage = data.details
            .map((d: { message: string }) => d.message)
            .join(", ");
        }

        setMessage({
          type: "error",
          text: errorMessage,
        });
      }
    } catch (error) {
      console.error("Waitlist submission error:", error);
      setMessage({
        type: "error",
        text: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <form onSubmit={handleSubmit} className="w-full space-y-4">
        <div className="relative w-full max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full pl-6 pr-32 sm:pr-40 py-4 text-base text-white bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all duration-300 placeholder:text-white/40"
            required
            disabled={isLoading || retryAfter !== null}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5">
            <button
              type="submit"
              disabled={isLoading || !email || retryAfter !== null}
              className="px-4 sm:px-6 py-2.5 text-xs sm:text-sm font-medium text-black bg-white rounded-xl hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[0.98] active:scale-[0.96]"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Joining...</span>
                  <span className="sm:hidden">...</span>
                </span>
              ) : retryAfter !== null ? (
                <span className="text-xs">Wait {retryAfter}s</span>
              ) : (
                <>
                  <span className="hidden sm:inline">Join Waitlist</span>
                  <span className="sm:hidden">Join</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Message with animation */}
      <div
        className={`mt-4 text-sm text-center transition-all duration-300 px-4 ${
          message
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {message && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm ${
              message.type === "success"
                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                : "bg-red-500/10 text-red-400 border border-red-500/20"
            }`}
          >
            {message.type === "success" ? (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
            <span>{message.text}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default WaitlistInput;
