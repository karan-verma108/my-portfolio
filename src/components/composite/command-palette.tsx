"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  ArrowDown,
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Twitter,
  FileText,
  Code2,
  CornerDownLeft,
  Search,
} from "lucide-react";
import { useTheme } from "next-themes";

import { NAV_ITEMS, OWNER, SOCIAL_LINKS } from "@/constants/site";

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter();
  const { setTheme } = useTheme();

  const goTo = (id: string) => {
    onOpenChange(false);
    // Defer to allow the dialog to start closing before we scroll.
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search sections, jump to, or run a command…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Navigate">
          {NAV_ITEMS.map((item) => (
            <CommandItem
              key={item.id}
              value={`${item.label} ${item.index} navigate jump section`}
              onSelect={() => goTo(item.id)}
            >
              <span className="mr-2 font-mono text-xs text-muted-foreground">{item.index}</span>
              <Search className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>{item.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Theme">
          <CommandItem
            value="theme light mode"
            onSelect={() => {
              setTheme("light");
              onOpenChange(false);
            }}
          >
            <Sun className="mr-2 h-4 w-4" />
            <span>Switch to light theme</span>
          </CommandItem>
          <CommandItem
            value="theme dark mode"
            onSelect={() => {
              setTheme("dark");
              onOpenChange(false);
            }}
          >
            <Moon className="mr-2 h-4 w-4" />
            <span>Switch to dark theme</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Links">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <CommandItem
                key={link.id}
                value={`${link.label} ${link.handle ?? ""} external link open`}
                onSelect={() => {
                  onOpenChange(false);
                  window.open(link.href, "_blank", "noopener,noreferrer");
                }}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{link.label}</span>
                {link.handle ? (
                  <span className="ml-auto text-xs text-muted-foreground">{link.handle}</span>
                ) : null}
              </CommandItem>
            );
          })}
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick actions">
          <CommandItem
            value="scroll to top"
            onSelect={() => {
              onOpenChange(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <ArrowDown className="mr-2 h-4 w-4 rotate-180" />
            <span>Scroll to top</span>
          </CommandItem>
          <CommandItem
            value="email contact compose"
            onSelect={() => {
              onOpenChange(false);
              window.location.href = `mailto:${OWNER.email}`;
            }}
          >
            <Mail className="mr-2 h-4 w-4" />
            <span>Compose an email</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />
        <div className="flex items-center justify-between px-3 py-2 text-[10px] uppercase tracking-wider text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <CornerDownLeft className="h-3 w-3" /> select
          </span>
          <span>esc to close</span>
        </div>
      </CommandList>
    </CommandDialog>
  );
}

/** Icons kept here so the tree-shaker can drop them if unused. */
export const PaletteIcons = { Github, Linkedin, Mail, Twitter, FileText, Code2 };
