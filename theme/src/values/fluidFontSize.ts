import type { TokenValue } from "@styleframe/core";

export type FluidFontSizeRange =
	| [min: TokenValue, max: TokenValue]
	| { min: TokenValue; max: TokenValue }
	| `@${string}`;

export const fluidFontSizeBaseValues = {
	min: 16,
	max: 18,
} as const satisfies {
	min: number;
	max: number;
};

export const fluidFontSizeValues = {
	default: "@font-size.md",
	"3xs": ["@scale.min-powers.-4", "@scale.max-powers.-4"],
	"2xs": ["@scale.min-powers.-3", "@scale.max-powers.-3"],
	xs: ["@scale.min-powers.-2", "@scale.max-powers.-2"],
	sm: ["@scale.min-powers.-1", "@scale.max-powers.-1"],
	md: ["@scale.min-powers.0", "@scale.max-powers.0"],
	lg: ["@scale.min-powers.1", "@scale.max-powers.1"],
	xl: ["@scale.min-powers.2", "@scale.max-powers.2"],
	"2xl": ["@scale.min-powers.3", "@scale.max-powers.3"],
	"3xl": ["@scale.min-powers.4", "@scale.max-powers.4"],
	"4xl": ["@scale.min-powers.5", "@scale.max-powers.5"],
} as const satisfies Record<string, FluidFontSizeRange>;
