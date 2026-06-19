import type { ReactNode } from "react";
import { button } from "virtual:styleframe";

interface ButtonProps {
	color?:
		| "primary"
		| "secondary"
		| "success"
		| "info"
		| "warning"
		| "error"
		| "light"
		| "dark"
		| "neutral";
	variant?: "solid" | "outline" | "soft" | "subtle" | "ghost" | "link";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	disabled?: boolean;
	children?: ReactNode;
}

export default function Button({
	color = "primary",
	variant = "solid",
	size = "md",
	disabled,
	children,
}: ButtonProps) {
	// `neutral` is the recipe default, so only set color for the others.
	return (
		<button
			type="button"
			className={button({
				variant,
				size,
				...(color !== "neutral" && { color }),
			})}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
