"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Grid, X } from "lucide-react";
import { Pomodoro } from "@/components/Pomodoro";
import SoundPanel from "@/components/SoundPanel";
import Todo from "@/components/Todo";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  id: number;
  text: string;
  importance: "Low" | "Medium" | "High";
  completed: boolean;
}

export default function Home() {
  const [isGridVisible, setIsGridVisible] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Error loading tasks from localStorage", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleGrid = () => setIsGridVisible(!isGridVisible);

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-[#247a4d] to-[#0b2c24]  px-4 pb-16">
      <div className="max-w-6xl mx-auto pt-16 text-center">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
          Tranquil Tones
        </h1>
        <p className="mt-2 text-md sm:text-lg italic">
          Enhance Relaxation, Improve Sleep, and Boost Focus with Soothing Audio
        </p>

        <div className="mt-8">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={toggleGrid}
                  className="rounded-full"
                  aria-label={isGridVisible ? "Hide Tools" : "Show Tools"}
                >
                  {isGridVisible ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Grid className="h-4 w-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {isGridVisible
                  ? "Hide Productivity Tools"
                  : "Show Productivity Tools"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <AnimatePresence>
          {isGridVisible && (
            <motion.div
              className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-center"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.1, duration: 0.6 },
                },
              }}
            >
              <motion.div className=" shadow-xl backdrop-blur-md p-6 rounded-2xl opacity-[1] bg-[rgba(255,255,255,.05)] ">
                <Pomodoro />
              </motion.div>

              <motion.div className="shadow-xl backdrop-blur-md p-6 rounded-2xl  opacity-[1] bg-[rgba(255,255,255,.05)]">
                <Todo tasks={tasks} setTasks={setTasks} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-16">
          <SoundPanel />
        </div>
      </div>
    </main>
  );
}
