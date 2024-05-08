import React from "react";
import SoundsList from "./SoundsList";

const SoundPanel = () => {
  const sounds = [
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
    {
      src: "/sounds/beach_sound.wav",
      title: "Beach",
      icon: "/images/beach-icon.svg",
    },
  ];

  return <SoundsList sounds={sounds} />;
};

export default SoundPanel;
