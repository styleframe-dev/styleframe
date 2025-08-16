import type { DeclarationsBlock } from "./declarations";

export type Variable<Name extends string = string> = {
	type: "variable";
	name: Name;
	value: TokenValue;
};

export type Reference<Name extends string = string> = {
	type: "reference";
	name: Name;
	fallback?: TokenValue;
};

export type Selector = {
	type: "selector";
	query: string;
	declarations: DeclarationsBlock;
	children: ContainerChild[];
};

export type Media = {
	type: "media";
	query: string;
	declarations: DeclarationsBlock;
	children: ContainerChild[];
};

export type Keyframes<Name extends string = string> = {
	type: "keyframes";
	name: Name;
	declarations: Record<string, DeclarationsBlock>;
};

export type CSS = {
	type: "css";
	value: TokenValue[];
};

export type Utility<Name extends string = string> = {
	type: "utility";
	name: Name;
	declarations: (value: TokenValue) => DeclarationsBlock;
};

export type UtilityCreatorFn = (
	values: Record<string, TokenValue>,
	options?: {
		modifiers?: Modifier[];
	},
) => void;

export type Modifier = {
	type: "modifier";
	key: string[];
	transform: ModifierTransformFn;
};

export type ModifierTransformFn = (args: {
	declarations: DeclarationsBlock;
	key?: string;
}) => DeclarationsBlock;

export type Recipe<Name extends string = string> = {
	type: "recipe";
	name: Name;
	// @TODO Implement this
};

export type PrimitiveTokenValue = number | string | boolean | null | undefined;

export type TokenValue =
	| PrimitiveTokenValue
	| Reference
	| CSS
	| Array<PrimitiveTokenValue | Reference | CSS>;

export type TokenType =
	| Variable["type"]
	| Reference["type"]
	| Selector["type"]
	| Media["type"]
	| Keyframes["type"]
	| CSS["type"]
	| Utility["type"]
	| Modifier["type"];

export type Container = Root | Theme | Selector | Media;

export type ContainerChild = Variable | Selector | Media | Keyframes;

export type Theme = {
	type: "theme";
	name: string;
	children: ContainerChild[];
};

export type Root = {
	type: "root";
	utilities: Utility[];
	modifiers: Modifier[];
	recipes: Recipe[];
	children: ContainerChild[];
	themes: Theme[];
};
