"use client"; // This is a client component

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import TableComponent from "./components/table";
import HistoryComponent from "./components/history";
import ModalCompleteComponent from "./components/modalComplete";
import Link from "next/link";
import Form from "react-bootstrap/Form";

export type Task = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

export const dynamic = "force-dynamic";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showComplete, setShowComplete] = useState<boolean>(false);

  useEffect(() => {
    axios.get("/api/task").then((res) => {
      const totalTask = res.data;
      const kennethTask = totalTask.filter(
        (task: Task) => task.owner === "Kenneth"
      );
      setTasks(kennethTask);
    });
  }, []);

  return (
    <main className="flex h-screen w-screen">
      <div className="w-full md:w-4/5 bg-white shadow-md rounded-lg h-screen">
        <div className="h-2/3 overflow-x-auto overflow-y-auto">
          <TableComponent tasks={tasks} />
        </div>
        <div className="bg-slate-300 flex h-1/3 justify-center items-center">
          <div>
            <ButtonGroup variant="outlined" aria-label="Loading button group">
              <Button onClick={() => setShowComplete(true)}>
                Complete Task
              </Button>
              <Button>Add Task</Button>
              <Button>Load Stats</Button>
              <Link href="/Jamie">
                <Button>Visit partner</Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </div>

      <ModalCompleteComponent
        showComplete={showComplete}
        setShowComplete={setShowComplete}
      />

      <div className="hidden md:w-1/5 md:bg-slate-100 md:flex md:flex-col md:p-4">
        <HistoryComponent />
      </div>
    </main>
  );
}
