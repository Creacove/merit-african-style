import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost: "hover:bg-accent hover:text-accent-foreground rounded-md",
        link: "text-primary underline-offset-4 hover:underline",
        luxury: "bg-gradient-to-b from-[hsl(0,56%,27%)] to-[hsl(0,56%,22%)] text-[hsl(36,37%,95%)] font-semibold shadow-[0_10px_30px_rgba(106,31,31,0.45)] hover:shadow-[0_10px_30px_rgba(106,31,31,0.45),0_0_20px_rgba(199,154,43,0.3)] hover:-translate-y-1 hover:scale-105 active:scale-98 active:translate-y-0 rounded-[2.5rem] min-h-[44px] focus-visible:ring-2 focus-visible:ring-[hsl(42,65%,48%)] focus-visible:ring-offset-2",
        glass: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
        xl: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    // Handle glass variant with custom structure
    if (variant === "glass") {
      return (
        <div className={cn("glass-button-wrap", className)}>
          <Comp
            className="glass-button"
            ref={ref}
            {...props}
          >
            <span>{children}</span>
          </Comp>
          <div className="glass-button-shadow" />
        </div>
      );
    }

    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>{children}</Comp>;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
