import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Scroll utilities
export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

export const scrollElementToTop = (element: HTMLElement | null, smooth: boolean = true) => {
  if (element) {
    element.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    });
  }
};
