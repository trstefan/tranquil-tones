"use client";
import React, { useState } from "react";
import { SoundType } from "@/types/types";
import { Slider } from "@/components/ui/slider";

export const Sound = ({ src, title, icon }: SoundType) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="relative">
      <div
        className={`p-[3rem_5rem] bg-red-200 border-[2px] cursor-pointer border-white rounded-lg flex flex-col gap-[.5rem] justify-center items-center
    }`}
      >
        <div className="text-blue-500 font-bold">{title}</div>
        <img src={icon} alt="" className="w-[75px] h-[75px]" />
      </div>
      {isPlaying ? (
        <Slider
          defaultValue={[33]}
          max={100}
          step={1}
          className="!absolute !left-1/2 !transform !-translate-x-1/2  !bottom-[20px] !w-[170px] !text-white"
        />
      ) : (
        ""
      )}
    </div>
  );
};
