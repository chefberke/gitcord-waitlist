import React from "react";
import WaitlistInput from "@/components/waitlist-input";
import WaitlistCounter from "@/components/waitlist-counter";
import AppPreview from "@/components/app-preview";

// The open source way to track GitHub activity
function WaitlistBox() {
  return (
    <div className="flex items-center justify-center w-full flex-1 px-4 md:px-8">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full max-w-7xl">
        {/* Sol taraf - Metin içeriği */}
        <div className="flex flex-col items-center lg:items-start justify-center gap-4 flex-1 max-w-2xl">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl text-center lg:text-left font-semibold">
              The open source way to monitor your GitHub
            </h1>
          </div>
          <div>
            <p className="text-center lg:text-left text-neutral-300 text-lg">
              Monitor and visualize GitHub contributions with a clean,
              open-source dashboard.
            </p>
          </div>
          <div className="pt-3 w-full max-w-md">
            <WaitlistInput />
          </div>
          <div>
            <WaitlistCounter />
          </div>
        </div>

        {/* Sağ taraf - Uygulama görseli */}
        <div className="flex-1 flex items-center justify-center">
          <div className="relative w-full max-w-2xl">
            {/* Glow efekti */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-3xl opacity-50 rounded-full"></div>

            {/* Görsel container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm">
              {/* Örnek dashboard preview veya gerçek görsel */}
              <div className="aspect-[16/10]">
                {/* Veya örnek dashboard component'i: */}
                <AppPreview />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitlistBox;
