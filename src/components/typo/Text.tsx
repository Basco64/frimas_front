import type { HTMLAttributes, ReactNode } from "react";

type TextVariant = "p" | "h1" | "h2" | "h3";

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  children: ReactNode;
}

const variantClasses: Record<TextVariant, string> = {
  p: "text-base font-normal",
  h1: "text-4xl font-bold",
  h2: "text-3xl font-semibold",
  h3: "text-2xl font-semibold",
};

export function Text({ variant = "p", className = "", children, ...props }: TextProps) {
  const Tag = variant;

  return (
    <Tag className={`font-cinzel ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </Tag>
  );
}