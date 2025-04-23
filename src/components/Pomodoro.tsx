"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw } from "lucide-react";

const POMODORO_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 10 * 60;

type TimerMode = "pomodoro" | "shortBreak" | "longBreak";

export const Pomodoro = () => {
  const [time, setTime] = useState(POMODORO_TIME);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<TimerMode>("pomodoro");
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  const getColor = () => {
    switch (mode) {
      case "pomodoro":
        return "text-red-500";
      case "shortBreak":
        return "text-green-500";
      case "longBreak":
        return "text-blue-500";
    }
  };

  const getModeLabel = () => {
    switch (mode) {
      case "pomodoro":
        return "Focus Session";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
    }
  };

  const setTimer = (newMode: TimerMode) => {
    setIsActive(false);
    setMode(newMode);
    switch (newMode) {
      case "pomodoro":
        setTime(POMODORO_TIME);
        break;
      case "shortBreak":
        setTime(SHORT_BREAK_TIME);
        break;
      case "longBreak":
        setTime(LONG_BREAK_TIME);
        break;
    }
  };

  const toggleTimer = () => setIsActive(!isActive);
  const resetTime = () => {
    setIsActive(false);
    setTimer(mode);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (time > 0 && isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      setCyclesCompleted((prev) => (mode === "pomodoro" ? prev + 1 : prev));
    }
    return () => clearInterval(interval);
  }, [time, isActive]);

  const renderTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    1 -
    time /
      (mode === "pomodoro"
        ? POMODORO_TIME
        : mode === "shortBreak"
        ? SHORT_BREAK_TIME
        : LONG_BREAK_TIME);

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-6">
      <div className="text-xl font-medium text-white  ">
        Current Session:
        <span className={`ml-2 font-semibold ${getColor()}`}>
          {getModeLabel()}
        </span>
      </div>

      <div className="relative w-72 h-72 rounded-full bg-white/10 backdrop-blur-md shadow-xl border border-white/20 flex items-center justify-center">
        <svg className="absolute w-full h-full" viewBox="0 0 100 100">
          <circle
            className="text-gray-200 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
          />
          <motion.circle
            className={`stroke-current ${getColor()}`}
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="48"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: progress }}
            transition={{ duration: 0.3 }}
            style={{
              rotate: "-90deg",
              transformOrigin: "center",
              filter: "drop-shadow(0 0 6px rgba(255,255,255,0.4))",
            }}
          />
        </svg>

        <AnimatePresence mode="wait">
          <motion.div
            key={time}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="text-5xl font-semibold text-white drop-shadow"
          >
            {renderTime()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant={mode === "pomodoro" ? "default" : "outline"}
          onClick={() => setTimer("pomodoro")}
          className="rounded-full px-6"
        >
          Pomodoro
        </Button>
        <Button
          variant={mode === "shortBreak" ? "default" : "outline"}
          onClick={() => setTimer("shortBreak")}
          className="rounded-full px-6"
        >
          Short Break
        </Button>
        <Button
          variant={mode === "longBreak" ? "default" : "outline"}
          onClick={() => setTimer("longBreak")}
          className="rounded-full px-6"
        >
          Long Break
        </Button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-2">
        <Button
          variant="default"
          className={`rounded-full text-white ${getColor()} hover:brightness-110 transition`}
          onClick={toggleTimer}
        >
          {isActive ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>
        <Button variant="outline" className="rounded-full" onClick={resetTime}>
          <RotateCcw className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};
