"use client";

import { useState, useEffect } from "react";
import TableComponent from "./table";
import HistoryComponent from "./history";
import ModalCompleteComponent from "./modalComplete";
import ModalAddTaskComponent from "./modalAddTask";
import PointCardComponent from "./pointCard";
import { Points } from "../types/meekpoints";

type PropType = {
  user: string;
};

export type Task = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
  status: string;
};

export type TaskCompleted = {
  _id: string;
  taskName: string;
  meekPoints: number;
  owner: string;
  dateCreated: Date;
};

export const dynamic = "force-dynamic";

export default function ProfileComponent(props: PropType) {
  const partner = props.user === "Kenneth" ? "/Jamie" : "/Kenneth";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasksTotal, setCompletedTasksTotal] = useState<
    TaskCompleted[]
  >([]); // this is used for total completed task by all users
  const [completedTasksUser, setCompletedTasksUser] = useState<TaskCompleted[]>(
    []
  ); // this is used for total completed tasks by current user
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [points, setPoints] = useState<Points>();

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch("/api/task");
      const totalTask = await res.json();
      const kennethTask = totalTask.filter(
        (task: Task) => task.owner === props.user
      );
      setTasks(kennethTask);
    }
    async function fetchCompletedTasks() {
      const res = await fetch("/api/completed");
      const totalCompletedTask: TaskCompleted[] = await res.json();
      const totalUserCompletedTask = totalCompletedTask.filter(
        (task: TaskCompleted) => task.owner === props.user
      );
      setCompletedTasksUser(totalUserCompletedTask);
      setCompletedTasksTotal(totalCompletedTask);
    }

    async function fetchPoints() {
      const res = await fetch(`/api/points?owner=${props.user}`);
      const pointsReceived: Points = await res.json();
      setPoints(pointsReceived);
    }
    fetchTasks();
    fetchPoints();
    fetchCompletedTasks();
  }, []);

  return (
    <main className="flex h-screen w-screen bg-slate-100">
      <div></div>

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
        <div className="flex bg-white h-2/5 justify-center items-center w-full md:px-8">
          <PointCardComponent
            partner={partner}
            user={props.user}
            points={points!}
          />
        </div>
      </div>

      <ModalCompleteComponent
        user={props.user}
        showComplete={showComplete}
        setShowComplete={setShowComplete}
        selectedTask={selectedTask}
        setTasks={setTasks}
        setCompletedTasks={setCompletedTasksTotal}
      />

      <ModalAddTaskComponent
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        user={props.user}
        setTasks={setTasks}
      />
      <div className="hidden md:w-1/5  md:flex md:flex-col md:p-4 overflow-y-auto">
        <HistoryComponent completedTasks={completedTasksTotal} />
      </div>
    </main>
  );
}
