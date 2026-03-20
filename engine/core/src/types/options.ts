export type VariableNameFn = (options: { name: string }) => string;

export interface UtilitySelectorOptions {
	name: string;
	value: string;
	modifiers: string[];
}

export type UtilitySelectorFn = (options: UtilitySelectorOptions) => string;

export type ThemeSelectorFn = (options: { name: string }) => string;

export type StyleframeOptions = {
	indent?: string;
	variables?: {
		name?: VariableNameFn;
	};
	utilities?: {
		selector?: UtilitySelectorFn;
	};
	themes?: {
		selector?: ThemeSelectorFn;
	};
};
