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
import ProfileComponent from "../components/profile";

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
  return (
    <main className="flex h-screen w-screen bg-slate-100">
      <ProfileComponent user="Jamie" />
    </main>
  );
}
