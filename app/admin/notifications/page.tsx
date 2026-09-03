"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const sentHistory = [
  { title: "Attempt window reminder", audience: "All Adjudicators", date: "2026-09-01", body: "Reminder: submit adjudication reports within 48 hours of attempt completion." },
  { title: "New verification guidelines", audience: "All Reviewers", date: "2026-08-20", body: "Version 2.4 mass-formation guidelines are now in effect." },
  { title: "Platform maintenance window", audience: "All Users", date: "2026-08-05", body: "RBWR will undergo scheduled maintenance on 10 Aug, 02:00–04:00 UTC." },
];

export default function AdminNotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState("all");
  const [history, setHistory] = useState(sentHistory);

  function send() {
    if (!title.trim() || !body.trim()) return;
    setHistory((h) => [{ title, audience: audience === "all" ? "All Users" : audience, date: new Date().toISOString().slice(0, 10), body }, ...h]);
    toast.success("Notification broadcast sent");
    setTitle("");
    setBody("");
  }

  return (
    <div>
      <PageHeader title="Notifications" description="Broadcast announcements to platform user segments." />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 lg:col-span-1">
          <h3 className="font-display text-sm font-semibold text-navy">Compose Broadcast</h3>
          <div className="mt-3 flex flex-col gap-3">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Select value={audience} onValueChange={setAudience}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="All Adjudicators">All Adjudicators</SelectItem>
                <SelectItem value="All Reviewers">All Reviewers</SelectItem>
                <SelectItem value="All Club Admins">All Club Admins</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Message body…" rows={4} value={body} onChange={(e) => setBody(e.target.value)} />
            <Button className="gap-1.5 bg-navy-gradient text-white hover:opacity-90" onClick={send}>
              <Send className="h-4 w-4" /> Send Broadcast
            </Button>
          </div>
        </div>
        <div className="lg:col-span-2">
          <h3 className="font-display text-sm font-semibold text-navy">Sent History</h3>
          <div className="mt-3 flex flex-col gap-3">
            {history.map((n, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-navy">{n.title}</p>
                  <span className="text-xs text-muted-foreground">{n.date}</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{n.audience}</p>
                <p className="mt-2 text-sm text-foreground/80">{n.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
