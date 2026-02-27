import type { ThemeSelectorFn, VariableNameFn } from "@styleframe/core";

export { defaultUtilitySelectorFn } from "@styleframe/core";

export const defaultThemeSelectorFn: ThemeSelectorFn = ({ name }) => {
	return `[data-theme="${name}"]`;
};

export const defaultVariableNameFn: VariableNameFn = ({ name }) => {
	return name.replace(/^\.+|\.+$/g, "").replace(/\.+/g, "--");
};
