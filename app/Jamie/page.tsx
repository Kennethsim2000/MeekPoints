"use client"; // This is a client component

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TableComponent from "../components/table";
import HistoryComponent from "../components/history";
import Link from "next/link";
import ModalCompleteComponent from "../components/modalComplete";
import ModalAddTaskComponent from "../components/modalAddTask";
import { TaskCompleted } from "../page";

export type Task = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

export const dynamic = "force-dynamic";

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskCompleted[]>([]);
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>("");

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/task");
      const totalTask = await res.json();
      const jamieTask = totalTask.filter(
        (task: Task) => task.owner === "Jamie"
      );
      setTasks(jamieTask);
    }
    async function fetchCompletedTasks() {
      const res = await fetch("/api/completed");
      const totalCompletedTask = await res.json();
      const JamieCompletedTask = totalCompletedTask.filter(
        (task: Task) => task.owner === "Jamie"
      );
      setCompletedTasks(JamieCompletedTask);
    }
    fetchTasks();
    fetchCompletedTasks();
  }, []);

  return (
    <main className="flex h-screen w-screen bg-slate-100">
      <div className="w-full md:w-4/5 bg-slate-100 shadow-md rounded-lg h-screen md:p-8">
        <div className="h-3/5 overflow-x-auto overflow-y-auto md: mb-4">
          <TableComponent
            tasks={tasks}
            showAddTask={showAddTask}
            setShowAddTask={setShowAddTask}
            showComplete={showComplete}
            setShowComplete={setShowComplete}
            setSelectedTask={setSelectedTask}
          />
        </div>
        <div className=" flex bg-white h-2/5 justify-center items-center">
          <div>
            <ButtonGroup variant="outlined" aria-label="Loading button group">
              <Button>Load Stats</Button>
              <Link href="/">
                <Button>Visit partner</Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <ModalCompleteComponent
        user="Jamie"
        showComplete={showComplete}
        setShowComplete={setShowComplete}
        selectedTask={selectedTask}
        setTasks={setTasks}
      />
      <ModalAddTaskComponent
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        user="Jamie"
        setTasks={setTasks}
      />
      <div className="hidden md:w-1/5  md:flex md:flex-col md:p-4">
        <HistoryComponent completedTasks={completedTasks} />
      </div>
    </main>
  );
}
