import React from "react";

function AppPreview() {
  return (
    <div className="w-full h-full overflow-hidden relative">
      {/* Scrolling container */}
      <div className="animate-scroll-down">
        <div className="p-6 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
              <h3 className="text-white font-semibold">Gitcord Dashboard</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-neutral-400">Live</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-1">Total Commits</p>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-green-500 mt-1">+12.5%</p>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-1">Pull Requests</p>
              <p className="text-2xl font-bold text-white">48</p>
              <p className="text-xs text-green-500 mt-1">+8.3%</p>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-1">Active Repos</p>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-neutral-400 mt-1">—</p>
            </div>
          </div>

          {/* Activity Graph */}
          <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800 mb-6">
            <p className="text-sm text-neutral-400 mb-4">
              Contribution Activity
            </p>
            <div className="flex items-end justify-between h-32 gap-1">
              {[40, 65, 45, 80, 55, 75, 90, 60, 70, 85, 50, 95].map(
                (height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-green-600 to-green-400 rounded-t opacity-80 transition-all hover:opacity-100"
                    style={{ height: `${height}%` }}
                  ></div>
                )
              )}
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs text-neutral-500">Jan</span>
              <span className="text-xs text-neutral-500">Dec</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-neutral-400">Pushed to main in</span>
              <span className="text-white">awesome-project</span>
              <span className="text-neutral-500 ml-auto">2m ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-neutral-400">Opened PR in</span>
              <span className="text-white">react-components</span>
              <span className="text-neutral-500 ml-auto">15m ago</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-neutral-400">Merged PR in</span>
              <span className="text-white">api-services</span>
              <span className="text-neutral-500 ml-auto">1h ago</span>
            </div>
          </div>

          {/* Repository List */}
          <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800 mb-6">
            <p className="text-sm text-neutral-400 mb-4">Active Repositories</p>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded"></div>
                  <div>
                    <p className="text-sm text-white">awesome-project</p>
                    <p className="text-xs text-neutral-500">
                      Updated 2 min ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">⭐ 234</span>
                  <span className="text-xs text-neutral-400">🔀 45</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-neutral-800 rounded"></div>
                  <div>
                    <p className="text-sm text-white">react-components</p>
                    <p className="text-xs text-neutral-500">
                      Updated 15 min ago
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">⭐ 189</span>
                  <span className="text-xs text-neutral-400">🔀 32</span>
                </div>
              </div>
            </div>
          </div>

          {/* Duplicate content for seamless loop */}
          {/* Header (Duplicate) */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-lg"></div>
              <h3 className="text-white font-semibold">Gitcord Dashboard</h3>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-neutral-400">Live</span>
            </div>
          </div>

          {/* Stats Cards (Duplicate) */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-1">Total Commits</p>
              <p className="text-2xl font-bold text-white">1,247</p>
              <p className="text-xs text-green-500 mt-1">+12.5%</p>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-1">Pull Requests</p>
              <p className="text-2xl font-bold text-white">48</p>
              <p className="text-xs text-green-500 mt-1">+8.3%</p>
            </div>
            <div className="bg-neutral-900/50 rounded-lg p-4 border border-neutral-800">
              <p className="text-xs text-neutral-500 mb-1">Active Repos</p>
              <p className="text-2xl font-bold text-white">12</p>
              <p className="text-xs text-neutral-400 mt-1">—</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none"></div>
    </div>
  );
}

export default AppPreview;
