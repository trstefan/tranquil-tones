"use client";
import React, { useState, useEffect } from "react";
import { SoundListType } from "@/types/types";
import { CircleStop, Volume2, VolumeX } from "lucide-react";

import { Sound } from "./Sound";
import { Button } from "@/components/ui/button";

const SoundsList = ({ sounds }: SoundListType) => {
  const [currentSoundIndex, setCurrentSoundIndex] = useState<number[]>([]);
  const [isMuted, setIsMuted] = useState(false);
  const [playingSounds, setPlayingSounds] = useState<{
    [index: number]: boolean;
  }>({});

  useEffect(() => {
    setPlayingSounds(
      currentSoundIndex.reduce(
        (newPlayingSounds: { [key: number]: boolean }, index) => {
          newPlayingSounds[index] = true;
          return newPlayingSounds;
        },
        {}
      )
    );
  }, [currentSoundIndex]);

  // to debug
  const handleMuteUnmute = () => {
    setIsMuted(!isMuted);
  };

  const stopAll = () => {
    setPlayingSounds({});
    setCurrentSoundIndex([]);
  };

  return (
    <div className="flex flex-col gap-[2rem] justify-center items-center pb-[4rem]">
      <div className="flex gap-[2rem]">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleMuteUnmute}
          title="Mute/Umnute"
        >
          {isMuted ? (
            <VolumeX className=" flex justify-center items-center w-[50px] h-[50px] rounded-[50%] hover:bg-[rgba(255,255,255,.05)]" />
          ) : (
            <Volume2 className=" flex justify-center items-center w-[50px] h-[50px] rounded-[50%] hover:bg-[rgba(255,255,255,.05)]" />
          )}
        </Button>
        <Button variant="ghost" size="sm" title="Stop All">
          <CircleStop
            onClick={stopAll}
            className=" flex justify-center items-center w-[50px] h-[50px] rounded-[50%] hover:bg-[rgba(255,255,255,.05)]"
          />
        </Button>
      </div>
      <div className="grid gap-[2rem] sm:grid-cols-2 lg:grid-cols-4">
        {sounds.map((sound, index) => {
          return (
            <Sound
              key={index}
              {...sound}
              isActive={currentSoundIndex.includes(index)}
              isMuted={isMuted}
              isPlaying={playingSounds[index]}
              onPlay={() =>
                setPlayingSounds({ ...playingSounds, [index]: true })
              }
              onPause={() => {
                const newPlayingSounds = { ...playingSounds };
                delete newPlayingSounds[index];
                setPlayingSounds(newPlayingSounds);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SoundsList;
