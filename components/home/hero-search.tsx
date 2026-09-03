"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function HeroSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q ? `/records?q=${encodeURIComponent(q)}` : "/records");
  }

  return (
    <form onSubmit={submit} className="flex w-full max-w-xl gap-2 rounded-2xl bg-white/95 p-2 shadow-xl">
      <div className="flex flex-1 items-center gap-2 px-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search records, holders, clubs, cities…"
          className="border-0 shadow-none focus-visible:ring-0"
        />
      </div>
      <Button type="submit" className="bg-navy-gradient text-white hover:opacity-90">
        Search
      </Button>
    </form>
  );
}
