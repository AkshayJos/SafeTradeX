import React from "react";

export const Loader = () => {
  return (
    <div className="relative flex flex-col items-center justify-center h-[30rem] w-full text-foreground overflow-hidden animate-gradientFade">
      {/* Floating shimmer background */}
      <div className="absolute inset-0 bg-slate-950 blur-3xl animate-pulse" />

      {/* Glowing animated ring */}
      <div className="relative w-18 h-18 mb-4">
        <div className="absolute inset-0 border-[3px] border-violet-500 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_4px_rgba(139,92,246,0.3)]"></div>
        <div className="absolute inset-4 bg-violet-700 rounded-full shadow-inner shadow-violet-600/40 blur-sm animate-pulse" />
      </div>

      {/* Loading text with animated dots */}
      <div className="flex items-center text-violet-400 text-2xl font-semibold tracking-wide">
        <span>Loading</span>
        <span className="flex space-x-1 ml-2">
          <span className="animate-wave1">.</span>
          <span className="animate-wave2">.</span>
          <span className="animate-wave3">.</span>
        </span>
      </div>
    </div>
  );
};
