export type VariableNameFn = (options: { name: string }) => string;

export type UtilitySelectorFn = (options: {
	name: string;
	value: string;
	modifiers: string[];
}) => string;

export type ThemeSelectorFn = (options: { name: string }) => string;

export type StyleframeOptions = {
	indent?: string;
	variables?: {
		name?: VariableNameFn;
	};
	utilities?: {
		selector?: UtilitySelectorFn;
	};
	theme?: {
		selector?: ThemeSelectorFn;
	};
};
