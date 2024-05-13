import React from "react";
import SoundsList from "./SoundsList";

const SoundPanel = () => {
  const sounds = [
    {
      src: "/sounds/ocean_sound.wav",
      title: "Waves",
      icon: "/images/ocean-icon.svg",
    },
    {
      src: "/sounds/cheerful-chirping.wav",
      title: "Birds",
      icon: "/images/bird-icon.svg",
    },
    {
      src: "/sounds/rain_sound.wav",
      title: "Rain",
      icon: "/images/rain-icon.svg",
    },
    {
      src: "/sounds/fireplace_sound.wav",
      title: "Fireplace",
      icon: "/images/fire-icon.svg",
    },
    {
      src: "/sounds/white_sound.wav",
      title: "White Noise",
      icon: "/images/whitenoise-icon.svg",
    },
  ];

  return <SoundsList sounds={sounds} />;
};

export default SoundPanel;
