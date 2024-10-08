"use client"; // This is a client component

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
