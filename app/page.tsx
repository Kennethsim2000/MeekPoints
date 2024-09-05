"use client";
import Button from "@mui/material/Button";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="flex h-screen w-screen bg-slate-100 items-center justify-center space-x-4">
      <Link href="/Jamie" passHref>
        <Button variant="contained" color="primary">
          Jamie Home
        </Button>
      </Link>

      <Link href="/Kenneth" passHref>
        <Button variant="contained" color="secondary">
          Kenneth Home
        </Button>
      </Link>
    </main>
  );
}
