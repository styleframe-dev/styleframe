import type { ReactNode } from "react";
import { badge } from "virtual:styleframe";

interface BadgeProps {
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
	variant?: "solid" | "outline" | "soft" | "subtle";
	size?: "xs" | "sm" | "md" | "lg" | "xl";
	children?: ReactNode;
}

export default function Badge({
	color = "neutral",
	variant = "solid",
	size = "sm",
	children,
}: BadgeProps) {
	// `neutral` is the recipe default, so only set color for the others.
	return (
		<span
			className={badge({
				variant,
				size,
				...(color !== "neutral" && { color }),
			})}
		>
			{children}
		</span>
	);
}
