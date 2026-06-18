import { input } from "virtual:styleframe";

interface InputProps {
	color?: "light" | "dark" | "neutral";
	variant?: "default" | "soft" | "ghost";
	size?: "sm" | "md" | "lg";
	invalid?: boolean;
	disabled?: boolean;
	placeholder?: string;
	defaultValue?: string;
}

export default function Input({
	color = "neutral",
	variant = "default",
	size = "md",
	invalid,
	disabled,
	placeholder,
	defaultValue,
}: InputProps) {
	return (
		<div className={input({ color, variant, size, invalid, disabled })}>
			<input
				className="input-field"
				placeholder={placeholder}
				defaultValue={defaultValue}
				disabled={disabled}
			/>
		</div>
	);
}
