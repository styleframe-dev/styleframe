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
	return `._${[...modifiers, name, ...(value === "default" ? [] : [value])]
		.filter(Boolean)
		.join("\\:")
		.replace(/\[/g, "\\[")
		.replace(/\]/g, "\\]")
		.replace(/\./g, "\\.")}`;
};

export const defaultVariableNameFn: VariableNameFn = ({ name }) => {
	return name.replace(/^\.+|\.+$/g, "").replace(/\.+/g, "--");
};
