import type { Properties as CSSProperties } from "csstype";
import type {
	createAtRuleFunction,
	createCssFunction,
	createKeyframesFunction,
	createMediaFunction,
	createRefFunction,
	createSelectorFunction,
	createVariableFunction,
} from "../tokens";
import type { TokenValue } from "./tokens";

// Helper type to make CSS property values also accept Reference types
type CSSValueWithReference<T> = T extends string | number | undefined
	? T | TokenValue
	: T extends object
		? CSSValueWithReference<T>
		: T | TokenValue;

// Recursively apply the Reference extension to all CSS properties
export type DeclarationsBlock = {
	[K in keyof CSSProperties]: CSSValueWithReference<CSSProperties[K]>;
} & {
	// Support for nested selectors (like '&:hover', '.child')
	[key: string]:
		| CSSValueWithReference<CSSProperties[keyof CSSProperties]>
		| DeclarationsBlock;
};

export type DeclarationsCallbackContext = {
	variable: ReturnType<typeof createVariableFunction>;
	selector: ReturnType<typeof createSelectorFunction>;
	atRule: ReturnType<typeof createAtRuleFunction>;
	keyframes: ReturnType<typeof createKeyframesFunction>;
	media: ReturnType<typeof createMediaFunction>;
	ref: ReturnType<typeof createRefFunction>;
	css: ReturnType<typeof createCssFunction>;
};

export type DeclarationsCallback<
	Context extends DeclarationsCallbackContext = DeclarationsCallbackContext,
> = (context: Context) => DeclarationsBlock | void;
