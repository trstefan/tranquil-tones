export type SoundType = {
  src: string;
  title: string;
  icon: string;
  isActive: boolean;
  isPlaying: boolean;

  isMuted: boolean;
  onPlay: () => void;
  onPause: () => void;
};

export type SoundItemType = {
  src: string;
  title: string;
  icon: string;
};

export type SoundListType = {
  sounds: SoundItemType[];
};
