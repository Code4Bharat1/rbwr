"use client";

import { RotateCcw, Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useDemoStore } from "@/lib/store/use-demo-store";
import { APPLICATION_STAGES, APPLICATION_STATUS_LABELS, Application, ApplicationStatus } from "@/lib/types";
import { toast } from "sonner";

const ALL_STATUSES: ApplicationStatus[] = [...APPLICATION_STAGES, "not_verified", "appeal", "withdrawn"];

export function SwitchDemoStatus({ application }: { application: Application }) {
  const override = useDemoStore((s) => s.applicationStatusOverrides[application.id]);
  const setApplicationStatus = useDemoStore((s) => s.setApplicationStatus);
  const effectiveStatus = override ?? application.status;

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-dashed border-gold/40 bg-gold/5 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-medium text-gold-deep">
        <Wand2 className="h-4 w-4" />
        Switch Demo Status
        <span className="hidden text-xs font-normal text-muted-foreground sm:inline">
          — preview any stage of this application's lifecycle
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Select
          value={effectiveStatus}
          onValueChange={(v) => {
            setApplicationStatus(application.id, v as ApplicationStatus);
            toast.success(`Application moved to "${APPLICATION_STATUS_LABELS[v as ApplicationStatus]}"`);
          }}
        >
          <SelectTrigger className="w-[200px] bg-background">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ALL_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {APPLICATION_STATUS_LABELS[s]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {override && (
          <Button
            variant="ghost"
            size="icon"
            title="Reset to original status"
            onClick={() => {
              setApplicationStatus(application.id, application.status);
              toast("Reset to original status");
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
