import type { TokenValue } from "./tokens";

export type VariableNameFn = (options: { name: string }) => string;

export type UtilitySelectorFn = (options: {
	name: string;
	value: string;
	modifiers: string[];
}) => string;

export type UtilityAutogenerateFn = (options: {
	name: string;
	value: TokenValue;
}) => string;

export type ThemeSelectorFn = (options: { name: string }) => string;

export type StyleframeOptions = {
	indent?: string;
	variables?: {
		name?: VariableNameFn;
	};
	utilities?: {
		selector?: UtilitySelectorFn;
		autogenerate?: UtilityAutogenerateFn;
	};
	themes?: {
		selector?: ThemeSelectorFn;
	};
};
