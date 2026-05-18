"use client";

import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback_ } from "./CallbackProvider";
import type { CallbackContext } from "./CallbackProvider";

type Props = {
  context?: CallbackContext;
  variant?: "primary" | "secondary" | "cta" | "outline" | "ghost" | "compact";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children?: React.ReactNode;
  label?: string;
};

export function CallbackButton({
  context,
  variant = "cta",
  size = "md",
  className,
  children,
  label,
}: Props) {
  const { open } = useCallback_();

  const sizeClass =
    size === "xl"
      ? "h-14 px-6 text-base"
      : size === "lg"
        ? "h-12 px-5"
        : size === "sm"
          ? "h-9 px-3 text-sm"
          : "h-10 px-4";

  const variantClass =
    variant === "primary"
      ? "btn-primary"
      : variant === "secondary"
        ? "btn-secondary"
        : variant === "outline"
          ? "btn-outline"
          : variant === "ghost"
            ? "btn text-secondary hover:bg-secondary/10"
            : variant === "compact"
              ? "btn text-primary hover:underline px-0 h-auto"
              : "btn-cta";

  return (
    <button
      type="button"
      onClick={() => open(context)}
      className={cn(variantClass, sizeClass, className)}
      aria-label={label ?? "Demander un rappel"}
    >
      {children ?? (
        <>
          <Phone className="w-4 h-4 mr-2" />
          Être rappelé gratuitement
        </>
      )}
    </button>
  );
}
