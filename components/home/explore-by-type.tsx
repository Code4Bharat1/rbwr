import Link from "next/link";
import {
  Building2,
  Flag,
  Globe,
  GraduationCap,
  Landmark,
  MapPin,
  Sparkles,
  Swords,
  Users,
  Briefcase,
} from "lucide-react";
import { CategoryGroup } from "@/lib/types";
import { categories } from "@/lib/data/categories";

const groupMeta: Record<CategoryGroup, { icon: typeof Globe; description: string }> = {
  World: { icon: Globe, description: "The pinnacle of achievement, open to all." },
  Rotary: { icon: Sparkles, description: "Records set by Rotary clubs and districts." },
  Club: { icon: Users, description: "Records held by a single Rotary club." },
  District: { icon: Landmark, description: "Records tracked at the Rotary district level." },
  City: { icon: MapPin, description: "Civic records tied to a specific city." },
  Rotarian: { icon: Flag, description: "Personal achievements by individual Rotarians." },
  Battle: { icon: Swords, description: "Actively contested, head-to-head records." },
  Community: { icon: Building2, description: "Large-scale community impact projects." },
  Corporate: { icon: Briefcase, description: "Records set by companies and corporate teams." },
  Educational: { icon: GraduationCap, description: "Records set by schools and student groups." },
};

export function ExploreByType() {
  const groups = Object.keys(groupMeta) as CategoryGroup[];
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {groups.map((group) => {
        const meta = groupMeta[group];
        const count = categories.filter((c) => c.group === group).length;
        return (
          <Link
            key={group}
            href={`/records?group=${encodeURIComponent(group)}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-md"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-navy-gradient text-gold-soft">
              <meta.icon className="h-5 w-5" />
            </span>
            <span className="font-display text-base font-semibold text-navy">{group} Records</span>
            <span className="text-sm text-muted-foreground">{meta.description}</span>
            <span className="text-xs font-medium text-royal">{count} categories →</span>
          </Link>
        );
      })}
    </div>
  );
}
