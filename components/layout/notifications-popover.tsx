"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const notifications = [
  { title: "Application app-13 attempt is live", detail: "Longest Continuous Wheelchair Basketball Marathon — London", time: "2h ago" },
  { title: "Verification requested", detail: "app-11 evidence package ready for review", time: "1d ago" },
  { title: "Certificate issued", detail: "RBWR-KEN-NBO-NBO-2026-00019 certificate generated", time: "3d ago" },
  { title: "Adjudicator assignment conflict", detail: "app-08 needs a non-conflicted adjudicator", time: "5d ago" },
];

export function NotificationsPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-live" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="p-3">
          <p className="text-sm font-semibold text-navy">Notifications</p>
        </div>
        <Separator />
        <div className="max-h-80 overflow-y-auto">
          {notifications.map((n, i) => (
            <div key={i} className="border-b border-border p-3 last:border-0 hover:bg-secondary/50">
              <p className="text-sm font-medium">{n.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.detail}</p>
              <p className="mt-1 text-[11px] text-muted-foreground/70">{n.time}</p>
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
