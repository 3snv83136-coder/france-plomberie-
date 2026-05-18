import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) {
    return digits.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
  }
  return phone;
}

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace(".", ",");
}

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://artisans-pres-de-chez-vous.fr";

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Artisans Près De Chez Vous";
