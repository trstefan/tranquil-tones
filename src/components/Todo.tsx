"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { PlusCircle, Trash2, ArrowUpDown } from "lucide-react";
import { Cormorant_Garamond, Inter } from "next/font/google";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Importance = "Low" | "Medium" | "High";
type SortOrder = "highToLow" | "lowToHigh" | "none";

interface Task {
  id: number;
  text: string;
  importance: Importance;
  completed: boolean;
}

const importanceOrder: Record<Importance, number> = {
  High: 3,
  Medium: 2,
  Low: 1,
};

export default function Todo({
  tasks,
  setTasks,
}: {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}) {
  const [newTask, setNewTask] = useState("");
  const [importance, setImportance] = useState<Importance>("Medium");
  const [sortOrder, setSortOrder] = useState<SortOrder>("none");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, [setTasks]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      const updatedTasks = [
        ...tasks,
        { id: Date.now(), text: newTask.trim(), importance, completed: false },
      ];
      setTasks(updatedTasks);
      setNewTask("");
    }
  };

  const toggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const getImportanceColor = (importance: Importance) => {
    switch (importance) {
      case "Low":
        return "bg-green-100 dark:bg-green-900";
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900";
      case "High":
        return "bg-red-100 dark:bg-red-900";
      default:
        return "bg-gray-100 dark:bg-gray-800";
    }
  };

  const sortedTasks = useMemo(() => {
    if (sortOrder === "none") return tasks;

    return [...tasks].sort((a, b) => {
      const orderA = importanceOrder[a.importance];
      const orderB = importanceOrder[b.importance];
      return sortOrder === "highToLow" ? orderB - orderA : orderA - orderB;
    });
  }, [tasks, sortOrder]);

  return (
    <Card className="max-w-md mx-auto mt-10 ">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-4xl font-bold  text-white">
            To-Do List
          </CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOrder("highToLow")}>
                Sort High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("lowToHigh")}>
                Sort Low to High
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={addTask} className="space-y-4 mb-6">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow"
            />
            <Button type="submit" size="icon" aria-label="Add task">
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          <Select
            value={importance}
            onValueChange={(value) => setImportance(value as Importance)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low Importance</SelectItem>
              <SelectItem value="Medium">Medium Importance</SelectItem>
              <SelectItem value="High">High Importance</SelectItem>
            </SelectContent>
          </Select>
        </form>
        <ul className="space-y-3">
          {sortedTasks.map((task) => (
            <li
              key={task.id}
              className={`p-3 rounded-md shadow-sm transition-all duration-200 ${getImportanceColor(
                task.importance
              )} ${task.completed ? "opacity-50" : ""}`}
            >
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleComplete(task.id)}
                />
                <span
                  className={`flex-grow ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.text}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  {task.importance}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeTask(task.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
