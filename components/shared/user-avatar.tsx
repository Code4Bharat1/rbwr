import { avatarColorClasses } from "@/lib/data/users";
import { AvatarColor } from "@/lib/types";
import { cn } from "@/lib/utils";

export function UserAvatar({
  initials,
  color,
  size = "md",
  className,
}: {
  initials: string;
  color: AvatarColor;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes = {
    sm: "h-7 w-7 text-[10px]",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-24 w-24 text-2xl",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-display font-semibold tracking-wide",
        avatarColorClasses[color],
        sizes[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
