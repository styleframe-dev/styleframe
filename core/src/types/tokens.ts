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
	declarations: DeclarationsStore;
};

export type CSS = {
	type: "css";
	value: TokenValue[];
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
	| CSS["type"];

export type DeclarationsStore = Array<Variable | DeclarationsBlock | Selector>;

export type Root = {
	type: "root";
	declarations: DeclarationsStore;
};
