"use client";
import React from "react";
import { SoundListType } from "@/types/types";

import { Sound } from "./Sound";
const SoundsList = ({ sounds }: SoundListType) => {
  return (
    <div className="grid gap-[2rem] sm:grid-cols-2 lg:grid-cols-4">
      {sounds.map((sound, index) => {
        return <Sound key={index} {...sound} />;
      })}
    </div>
  );
};

export default SoundsList;
