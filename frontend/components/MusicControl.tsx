"use client";

import { useSound } from "@/hooks/useSound";
import { useEffect } from "react";

export function MusicControl() {
  const { isMusicPlaying, toggleMusic, hasInteracted } = useSound();

  useEffect(() => {
    const handleFirstClick = () => {
      if (!hasInteracted) {
        toggleMusic();
      }
    };

    document.addEventListener("click", handleFirstClick, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstClick);
    };
  }, [hasInteracted, toggleMusic]);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleMusic();
      }}
      className="fixed bottom-4 right-4 z-50 p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors music-control"
    >
      {isMusicPlaying ? "🔇" : "🔊"}
    </button>
  );
}
