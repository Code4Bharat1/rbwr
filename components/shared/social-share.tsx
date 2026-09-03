"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.82L2 22l5.4-1.36a9.86 9.86 0 0 0 4.64 1.18h.01c5.46 0 9.9-4.45 9.9-9.91S17.5 2 12.04 2Zm5.8 14.05c-.24.68-1.4 1.3-1.93 1.37-.5.08-1.03.11-1.66-.1a9.63 9.63 0 0 1-3.5-2.15 10.6 10.6 0 0 1-2.2-3.19c-.29-.62-.02-.96.22-1.2.21-.21.47-.31.63-.31.16 0 .32 0 .46.01.15.01.35-.06.55.42.24.58.81 2 .88 2.15.07.15.12.32.02.5-.1.19-.15.3-.3.46-.15.16-.31.36-.44.48-.15.14-.3.3-.13.59.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.32 2.35 1.47.29.15.46.13.63-.08.17-.21.72-.83.91-1.12.19-.29.38-.24.63-.14.26.1 1.65.78 1.94.92.29.15.48.22.55.34.07.13.07.73-.17 1.4Z" />
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.6h2.55l.38-2.96h-2.93V8.53c0-.86.24-1.44 1.47-1.44h1.57V4.46A21 21 0 0 0 14.2 4.3c-2.24 0-3.78 1.37-3.78 3.87v2.27H7.85v2.96h2.57V21h3.08Z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H3.6V20h3.34V8.5ZM5.28 3.5a1.94 1.94 0 1 0 0 3.88 1.94 1.94 0 0 0 0-3.88ZM20.4 20h-3.33v-5.94c0-1.42-.03-3.24-1.97-3.24-1.98 0-2.28 1.55-2.28 3.14V20H9.5V8.5h3.2v1.57h.05c.44-.84 1.53-1.73 3.16-1.73 3.38 0 4.01 2.23 4.01 5.12V20Z" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.24 3H21l-6.3 7.2L22 21h-6.16l-4.82-6.3L5.5 21H2.73l6.74-7.7L2 3h6.31l4.36 5.77L18.24 3Zm-1.08 16.17h1.53L7.9 4.74H6.26l10.9 14.43Z" />
    </svg>
  );
}

export function SocialShare({ title }: { title: string }) {
  const [open, setOpen] = useState(false);

  function urlOf() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  const platforms = [
    {
      name: "WhatsApp",
      icon: WhatsAppIcon,
      href: () => `https://wa.me/?text=${encodeURIComponent(`${title} — ${urlOf()}`)}`,
    },
    {
      name: "Facebook",
      icon: FacebookIcon,
      href: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlOf())}`,
    },
    {
      name: "X",
      icon: XIcon,
      href: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(urlOf())}`,
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlOf())}`,
    },
  ];

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(urlOf());
      toast.success("Link copied — paste it into Instagram or anywhere else");
    } catch {
      toast("Copy this page's URL to share it");
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-56 p-2">
        <div className="flex flex-col gap-0.5">
          {platforms.map((p) => (
            <a
              key={p.name}
              href={p.href()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm hover:bg-secondary"
            >
              <p.icon className="h-4 w-4 text-royal" />
              {p.name}
            </a>
          ))}
          <button
            onClick={() => {
              setOpen(false);
              copyLink();
            }}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-secondary"
          >
            <InstagramIcon className="h-4 w-4 text-royal" />
            Instagram (copy link)
          </button>
          <button
            onClick={() => {
              setOpen(false);
              copyLink();
            }}
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-secondary"
          >
            <Link2 className="h-4 w-4 text-muted-foreground" />
            Copy Link
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
