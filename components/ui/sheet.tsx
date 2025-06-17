"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

export function Sheet({ open, onOpenChange, children }: { open: boolean, onOpenChange: (open: boolean) => void, children: React.ReactNode }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
}

export function SheetContent({ side = "left", className = "", children }: { side?: "left" | "right" | "top" | "bottom", className?: string, children: React.ReactNode }) {
  // You can add more sophisticated animation/positioning here
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
      <Dialog.Content
        className={`fixed z-50 bg-black border-r border-gray-800 ${side === "left" ? "left-0 top-0 h-full w-64" : ""} ${className}`}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export function SheetClose({ asChild = false, children }: { asChild?: boolean, children: React.ReactNode }) {
  return <Dialog.Close asChild={asChild}>{children}</Dialog.Close>;
} 