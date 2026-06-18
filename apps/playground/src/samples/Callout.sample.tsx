import type { ReactNode } from "react";
import { callout } from "virtual:styleframe";

interface CalloutProps {
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
	size?: "sm" | "md" | "lg";
	children?: ReactNode;
}

export default function Callout({
	color = "neutral",
	variant = "subtle",
	size = "md",
	children,
}: CalloutProps) {
	return <div className={callout({ color, variant, size })}>{children}</div>;
}
