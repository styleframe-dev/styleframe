import type {
	DeclarationsBlock,
	DeclarationsCallback,
	DeclarationsCallbackContext,
} from "./declarations";

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
	variables: Variable[];
	children: ContainerChild[];
};

export type AtRule = {
	type: "at-rule";
	identifier: string;
	rule: string;
	declarations: DeclarationsBlock;
	variables: Variable[];
	children: ContainerChild[];
};

export type CSS = {
	type: "css";
	value: TokenValue[];
};

export type Utility<Name extends string = string> = {
	type: "utility";
	name: Name;
	value: string;
	declarations: DeclarationsBlock;
	variables: Variable[];
	children: ContainerChild[];
	modifiers: string[];
};

export type UtilityCallbackFn = DeclarationsCallback<
	DeclarationsCallbackContext & {
		value: TokenValue;
	}
>;

export type UtilityCreatorFn = (
	values: Record<string, TokenValue>,
	modifiers?: Modifier[],
) => void;

export type ModifierCallbackFn = DeclarationsCallback<
	DeclarationsCallbackContext &
		Pick<Utility, "declarations" | "variables" | "children">
>;

export type Modifier = {
	type: "modifier";
	key: string[];
	factory: ModifierCallbackFn;
};

export type ModifierTransformFn = (args: {
	declarations: DeclarationsBlock;
	key?: string;
}) => DeclarationsBlock;

export type VariantDeclarationsBlock = Record<string, string | true>;

export type Recipe<
	Name extends string = string,
	Variants extends Record<
		string,
		Record<string, VariantDeclarationsBlock>
	> = Record<string, Record<string, VariantDeclarationsBlock>>,
> = {
	type: "recipe";
	name: Name;
	defaults: VariantDeclarationsBlock;
	variants: Variants;
	defaultVariants?: {
		[K in keyof Variants]?: keyof Variants[K] & string;
	};
	compoundVariants?: Array<
		{
			[K in keyof Variants]?: keyof Variants[K] & string;
		} & {
			declarations: VariantDeclarationsBlock;
		}
	>;
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
	| AtRule["type"]
	| CSS["type"]
	| Utility["type"]
	| Modifier["type"]
	| Recipe["type"]
	| Theme["type"]
	| Root["type"];

export type Containerish = {
	children: ContainerChild[];
	variables: Variable[];
	declarations: DeclarationsBlock;
};

export type Container = Root | Theme | Selector | AtRule | Utility;

export type ContainerChild = Variable | Selector | AtRule;

export type Theme = {
	type: "theme";
	name: string;
	variables: Variable[];
	children: ContainerChild[];
};

export type Root = {
	type: "root";
	utilities: Utility[];
	modifiers: Modifier[];
	recipes: Recipe[];
	variables: Variable[];
	children: ContainerChild[];
	themes: Theme[];
};
