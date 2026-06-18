import type { ReactNode } from "react";
import { checkbox, checkboxField } from "virtual:styleframe";

interface CheckboxProps {
	size?: "sm" | "md" | "lg";
	defaultChecked?: boolean;
	disabled?: boolean;
	children?: ReactNode;
}

export default function Checkbox({
	size = "md",
	defaultChecked,
	disabled,
	children,
}: CheckboxProps) {
	return (
		<label className={checkbox({ size })}>
			<input
				type="checkbox"
				className={checkboxField({ size })}
				defaultChecked={defaultChecked}
				disabled={disabled}
			/>
			{children ? <span>{children}</span> : null}
		</label>
	);
}
