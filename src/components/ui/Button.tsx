import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SmartLink } from "./SmartLink";

const variants = {
  dark: "bg-ink text-white hover:bg-ink-hover",
  primary: "bg-accent text-white hover:bg-accent-hover",
  white: "bg-white text-ink hover:bg-white-hover",
  outline: "border border-ink text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-soft": "border border-line-strong bg-white text-ink hover:border-ink hover:bg-ink hover:text-white",
  "outline-inverse": "border border-white text-white hover:border-white hover:bg-white hover:text-ink",
};

const sizes = {
  44: "h-11 px-[18px] text-[15px]",
  46: "h-[46px] px-[22px]",
  48: "h-12 px-[22px]",
  50: "h-[50px] px-6",
  52: "h-[52px] px-[26px]",
  54: "h-[54px] px-[26px]",
};

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

type ButtonProps = Common &
  (
    | ({ href: string } & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">)
    | ({ href?: undefined } & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">)
  );

export function buttonClass(variant: keyof typeof variants = "dark", size: keyof typeof sizes = 52, className?: string) {
  return cn(
    "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2.5 rounded-full font-semibold no-underline",
    variants[variant],
    sizes[size],
    className,
  );
}

/** Bouton pilule des maquettes : rend un lien si `href` est fourni, sinon un `<button>`. */
export function Button({ variant = "dark", size = 52, className, children, ...props }: ButtonProps) {
  const classes = buttonClass(variant, size, className);
  if (props.href !== undefined) {
    return (
      <SmartLink {...props} href={props.href} className={classes}>
        {children}
      </SmartLink>
    );
  }
  const { type = "button", ...rest } = props as ComponentPropsWithoutRef<"button">;
  return (
    <button type={type} className={cn(classes, "border-0 font-[inherit]")} {...rest}>
      {children}
    </button>
  );
}
