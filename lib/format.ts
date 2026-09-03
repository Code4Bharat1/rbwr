export function formatDate(dateStr: string, opts?: Intl.DateTimeFormatOptions) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", opts ?? { year: "numeric", month: "long", day: "numeric" });
}

export function formatDateShort(dateStr: string) {
  return formatDate(dateStr, { year: "numeric", month: "short", day: "numeric" });
}

export function formatDateTime(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatCompactNumber(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function slugToTitleCase(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
