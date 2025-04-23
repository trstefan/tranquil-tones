"use client";
import React, { useState, useEffect } from "react";
import { SoundListType } from "@/types/types";
import { CircleStop, Volume2, VolumeX } from "lucide-react";
import { ModalBox } from "./ModalBox";
import { Sound } from "./Sound";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="default"
                onClick={handleMuteUnmute}
                title="Mute/Unmute"
              >
                {isMuted ? (
                  <VolumeX className=" flex justify-center items-center  rounded-[50%]" />
                ) : (
                  <Volume2 className=" flex justify-center items-center rounded-[50%] " />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="default" title="Stop All">
                <CircleStop
                  onClick={stopAll}
                  className=" flex justify-center items-center  rounded-[50%] hover:bg-[rgba(255,255,255,.05)]"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Stop all</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
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
        <ModalBox />
      </div>
    </div>
  );
};

export default SoundsList;
