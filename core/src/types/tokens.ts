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
	| Media["type"]
	| CSS["type"];

export type Container = Root | Selector | Media;

export type ContainerChild = Variable | Selector | Media;

export type Root = {
	type: "root";
	children: ContainerChild[];
};
