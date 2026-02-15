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
	_exportName?: string;
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

export type UtilityAutogenerateFn = (
	value: TokenValue,
) => Record<string, TokenValue>;

export type UtilityFactory<Name extends string = string> = {
	type: "utility";
	name: Name;
	factory: UtilityCallbackFn;
	values: Array<{ key: string; value: TokenValue; modifiers: string[] }>;
	autogenerate: UtilityAutogenerateFn;
	namespace?: string | string[];
	create: UtilityCreatorFn;
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
	values: Record<string, TokenValue> | TokenValue[],
	modifiers?: ModifierFactory[],
) => void;

export type ModifierCallbackFn = DeclarationsCallback<
	DeclarationsCallbackContext &
		Pick<Utility, "declarations" | "variables" | "children">
>;

export type ModifierFactory = {
	type: "modifier";
	key: string[];
	factory: ModifierCallbackFn;
};

export type ModifierDeclarationsBlock = Record<string, TokenValue>;

export type VariantDeclarationsValue = TokenValue | ModifierDeclarationsBlock;

export type VariantDeclarationsBlock = Record<string, VariantDeclarationsValue>;

export type VariantsBase = Record<
	string,
	Record<string, VariantDeclarationsBlock>
>;

export type RuntimeModifierDeclarationsBlock = Record<
	string,
	PrimitiveTokenValue
>;

export type RuntimeVariantDeclarationsValue =
	| PrimitiveTokenValue
	| RuntimeModifierDeclarationsBlock;

export type RuntimeVariantDeclarationsBlock = Record<
	string,
	RuntimeVariantDeclarationsValue
>;

export type RecipeRuntime<Variants extends VariantsBase = VariantsBase> = {
	base?: RuntimeVariantDeclarationsBlock;
	variants?: {
		[K in keyof Variants]?: {
			[O in keyof Variants[K]]?: RuntimeVariantDeclarationsBlock;
		};
	};
	defaultVariants?: {
		[K in keyof Variants]?: keyof Variants[K] & string;
	};
	compoundVariants?: Array<{
		match: {
			[K in keyof Variants]?: keyof Variants[K] & string;
		};
		css?: RuntimeVariantDeclarationsBlock;
	}>;
};

export type Recipe<
	Name extends string = string,
	Variants extends VariantsBase = VariantsBase,
> = {
	type: "recipe";
	name: Name;
	base?: VariantDeclarationsBlock;
	variants?: Variants;
	defaultVariants?: {
		[K in keyof Variants]?: keyof Variants[K] & string;
	};
	compoundVariants?: Array<{
		match: {
			[K in keyof Variants]?: keyof Variants[K] & string;
		};
		css: VariantDeclarationsBlock;
	}>;
	_runtime?: RecipeRuntime<Variants>;
	_exportName?: string;
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
	| ModifierFactory["type"]
	| Recipe["type"]
	| Theme["type"]
	| Root["type"];

export type Container = {
	children: ContainerChild[];
	variables: Variable[];
	declarations: DeclarationsBlock;
};

export type ContainerChild = Variable | Selector | AtRule | Utility;

export type Theme = {
	type: "theme";
	name: string;
	declarations: DeclarationsBlock;
	variables: Variable[];
	children: ContainerChild[];
};

export type Root = {
	type: "root";
	declarations: DeclarationsBlock;
	utilities: UtilityFactory[];
	modifiers: ModifierFactory[];
	recipes: Recipe[];
	variables: Variable[];
	children: ContainerChild[];
	themes: Theme[];
};
