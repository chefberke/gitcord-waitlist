import React from "react";
import WaitlistInput from "@/components/waitlist-input";
import WaitlistCounter from "@/components/waitlist-counter";

// The open source way to track GitHub activity
function WaitlistBox() {
  return (
    <div className="flex items-center justify-center w-full flex-1">
      <div className="flex flex-col items-center justify-center gap-4">
        <div>
          <h1 className="text-6xl text-center font-semibold">
            The open source way to <br /> Track GitHub activity
          </h1>
        </div>
        <div>
          <p className="text-center text-neutral-300">
            Monitor and visualize GitHub contributions with a clean, open-source
            dashboard.
          </p>
        </div>
        <div className="pt-3">
          <WaitlistInput />
        </div>
        <div>
          <WaitlistCounter />
        </div>
      </div>
    </div>
  );
}

export default WaitlistBox;
