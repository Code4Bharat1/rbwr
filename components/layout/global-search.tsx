"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { records } from "@/lib/data/records";
import { applications } from "@/lib/data/applications";
import { users } from "@/lib/data/users";
import { clubs } from "@/lib/data/geo";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="hidden gap-2 text-muted-foreground sm:flex"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4" />
        Search
        <kbd className="ml-2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px]">⌘K</kbd>
      </Button>
      <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => setOpen(true)}>
        <Search className="h-4 w-4" />
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search records, applications, people, clubs…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Records">
            {records.slice(0, 8).map((r) => (
              <CommandItem key={r.id} value={`${r.title} ${r.id}`} onSelect={() => go(`/records/${r.id}`)}>
                {r.title}
                <span className="ml-auto text-xs text-muted-foreground">{r.id}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Applications">
            {applications.slice(0, 8).map((a) => (
              <CommandItem
                key={a.id}
                value={`${a.proposedTitle ?? a.id} ${a.id}`}
                onSelect={() => go(`/applications/${a.id}`)}
              >
                {a.proposedTitle ?? `Application ${a.id}`}
                <span className="ml-auto text-xs text-muted-foreground">{a.id}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="People">
            {users.slice(0, 8).map((u) => (
              <CommandItem key={u.id} value={u.name} onSelect={() => go(`/passport/${u.id}`)}>
                {u.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Clubs">
            {clubs.map((c) => (
              <CommandItem key={c.id} value={c.name} onSelect={() => go(`/club`)}>
                {c.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
