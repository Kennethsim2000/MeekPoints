"use client";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import TableComponent from "./table";
import HistoryComponent from "./history";
import ModalCompleteComponent from "./modalComplete";
import ModalAddTaskComponent from "./modalAddTask";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";

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
  const partner = props.user === "Kenneth" ? "/Jamie" : "/";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<TaskCompleted[]>([]);
  const [showComplete, setShowComplete] = useState<boolean>(false);
  const [showAddTask, setShowAddTask] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>("");
  const [totalPoints, setTotalPoints] = useState<number>(0);

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
      const totalMeekPoints = totalUserCompletedTask.reduce((acc, task) => {
        return acc + task.meekPoints;
      }, 0);
      setTotalPoints(totalMeekPoints);
      setCompletedTasks(totalCompletedTask);
    }
    fetchTasks();
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
          <Card className="md:flex-grow ">
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#Total">
                <Nav.Item>
                  <Nav.Link href="#Total">Total</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#Week">Week</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="#Week">Month</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Card.Title>Total Points earned</Card.Title>
              <Card.Text>{totalPoints} points completed</Card.Text>
              <Link href={partner}>
                <Button>Visit Partner</Button>
              </Link>
            </Card.Body>
          </Card>
          {/* <ButtonGroup variant="outlined" aria-label="Loading button group">
            <Button>Load Stats</Button>
            <Link href={partner}>
              <Button>Visit partner</Button>
            </Link>
          </ButtonGroup> */}
        </div>
      </div>

      <ModalCompleteComponent
        user={props.user}
        showComplete={showComplete}
        setShowComplete={setShowComplete}
        selectedTask={selectedTask}
        setTasks={setTasks}
        setCompletedTasks={setCompletedTasks}
      />

      <ModalAddTaskComponent
        showAddTask={showAddTask}
        setShowAddTask={setShowAddTask}
        user={props.user}
        setTasks={setTasks}
      />
      <div className="hidden md:w-1/5  md:flex md:flex-col md:p-4 overflow-y-auto">
        <HistoryComponent completedTasks={completedTasks} />
      </div>
    </main>
  );
}
