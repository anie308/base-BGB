import { useCallback, useState } from "react";

type SoundType = "bell";

export const useSound = () => {
  const [volume, setVolume] = useState(1);

  const playSound = useCallback(
    (type: SoundType) => {
      const soundMap = {
        bell: "/sounds/jingle-bells-107671.mp3",
      };

      const audio = new Audio(soundMap[type]);
      audio.volume = volume;
      audio.play().catch((error) => {
        console.log("Audio playback failed:", error);
      });
    },
    [volume]
  );

  return {
    playSound,
    setVolume,
    playBellSound: () => playSound("bell"),
  };
};
