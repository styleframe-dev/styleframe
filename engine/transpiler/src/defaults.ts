import type {
	ThemeSelectorFn,
	UtilitySelectorFn,
	VariableNameFn,
} from "@styleframe/core";

export const defaultThemeSelectorFn: ThemeSelectorFn = ({ name }) => {
	return `[data-theme="${name}"]`;
};

export const defaultUtilitySelectorFn: UtilitySelectorFn = ({
	name,
	value,
	modifiers,
}) => {
	return `._${[...modifiers, name, value].filter(Boolean).join("\\:")}`;
};

export const defaultVariableNameFn: VariableNameFn = ({ name }) => {
	return name.startsWith("--") ? name : `--${name}`;
};
