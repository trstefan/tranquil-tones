"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Pomodoro = () => {
  const [time, setTime] = useState(25 * 60);

  const [initialTime, setInitialTime] = useState(time);

  const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
  const [shortBreakTime, setShortBreakTime] = useState(5 * 60);
  const [longBreakTime, setLongBreakTime] = useState(10 * 60);

  const [isActive, setIsActive] = useState(false);

  const renderTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time - minutes * 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    } `;
  };

  const pomodoroTimer = () => {
    setTime(pomodoroTime);
    setIsActive(false);
    setInitialTime(pomodoroTime);
  };

  const shortBreakTimer = () => {
    setTime(shortBreakTime);
    setIsActive(false);
    setInitialTime(shortBreakTime);
  };

  const longBreakTimer = () => {
    setTime(longBreakTime);
    setIsActive(false);
    setInitialTime(longBreakTime);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTime = () => {
    setIsActive(false);
    setTime(initialTime);
  };

  useEffect(() => {
    if (time > 0 && isActive) {
      const interval = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [time, isActive]);

  return (
    <div className="p-4 flex flex-col gap-4 items-center justify-center">
      <div className="flex gap-4 justify-center items-center">
        <Button
          onClick={pomodoroTimer}
          variant={"default"}
          className="bg-white px-8 py-4 rounded-full lowercase  tracking-normal text-center text-base font-semibold text-black"
        >
          pomodoro
        </Button>
        <Button
          onClick={shortBreakTimer}
          variant={"default"}
          className="bg-white px-8 py-4 rounded-full lowercase  tracking-normal text-center text-base font-semibold text-black"
        >
          short break
        </Button>
        <Button
          onClick={longBreakTimer}
          variant={"default"}
          className="bg-white px-8 py-4 rounded-full lowercase  tracking-normal text-center text-base font-semibold text-black"
        >
          long break
        </Button>
      </div>
      <div className="text-center">
        <h1 className="text-8xl	">{renderTime()}</h1>
      </div>

      <div className="flex gap-4 justify-center items-center">
        <Button
          variant={"default"}
          className="bg-white px-8 py-4 rounded-full lowercase  tracking-normal text-center text-base font-semibold text-black"
          onClick={toggleTimer}
        >
          {" "}
          {isActive ? "pause" : "start"}{" "}
        </Button>
        <Button
          variant={"destructive"}
          className="rounded-full lowercase  tracking-normal text-center text-base font-semibold text-black"
          onClick={resetTime}
        >
          {" "}
          Reset{" "}
        </Button>
      </div>
    </div>
  );
};
