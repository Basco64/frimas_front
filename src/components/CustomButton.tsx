import {
  cloneElement,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type ReactElement,
} from "react";

type CustomButtonVariant = "primary" | "secondary" | "ghost";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CustomButtonVariant;
  asChild?: false;
}

interface CustomButtonChildProps {
  variant?: CustomButtonVariant;
  asChild: true;
  className?: string;
  children: ReactElement<{ className?: string; style?: CSSProperties }>;
}

type CustomButtonComponentProps = CustomButtonProps | CustomButtonChildProps;

const variantClasses: Record<CustomButtonVariant, string> = {
  primary: "bg-sky-500 text-slate-950 hover:bg-sky-400",
  secondary: "border border-sky-500 text-sky-300 hover:bg-sky-500/10",
  ghost: "text-slate-300 hover:bg-slate-800",
};

export function CustomButton({ ...props }: CustomButtonComponentProps) {
  const { className = "", variant = "primary", children } = props;
  const buttonClassName = `inline-flex items-center justify-center rounded-md px-5 py-2.5 font-rajdhani font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  if ("asChild" in props && props.asChild) {
    return cloneElement(props.children, {
      className: `${buttonClassName} ${props.children.props.className ?? ""}`,
      "data-custom-button": "true",
      style: {
        fontFamily: "Rajdhani, sans-serif",
        ...props.children.props.style,
      },
    });
  }

  const { asChild: _asChild, ...buttonProps } = props;

  return (
    <button
      className={buttonClassName}
      {...buttonProps}
      style={{ fontFamily: "Rajdhani, sans-serif", ...buttonProps.style }}
    >
      {children}
    </button>
  );
}
