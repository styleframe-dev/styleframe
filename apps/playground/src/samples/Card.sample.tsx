import type { ReactNode } from "react";
import { card, cardBody, cardFooter, cardHeader } from "virtual:styleframe";

interface CardProps {
	color?: "light" | "dark" | "neutral";
	variant?: "solid" | "soft" | "subtle";
	size?: "sm" | "md" | "lg";
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
}

export default function Card({
	color = "light",
	variant = "solid",
	size = "md",
	header,
	footer,
	children,
}: CardProps) {
	return (
		<article className={card({ color, variant, size })}>
			{header ? <header className={cardHeader()}>{header}</header> : null}
			<div className={cardBody()}>{children}</div>
			{footer ? <footer className={cardFooter()}>{footer}</footer> : null}
		</article>
	);
}
