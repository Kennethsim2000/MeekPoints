"use client";

import ProfileComponent from "./components/profile";

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

export default function Home() {
  return (
    <main className="flex h-screen w-screen bg-slate-100">
      <ProfileComponent user="Kenneth" />
    </main>
  );
}
