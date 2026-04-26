import type { TokenValue } from "@styleframe/core";

export type FluidFontSizeRange =
	| [min: TokenValue, max: TokenValue]
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
	"3xs": [0.5, 0.5],
	"2xs": [0.625, 0.625],
	xs: [0.75, 0.8],
	sm: [0.875, 0.9],
	md: [1, 1],
	lg: [1.125, 1.25],
	xl: [1.25, 1.5],
	"2xl": [1.5, 2],
	"3xl": [1.875, 2.5],
	"4xl": [2.25, 3],
} as const satisfies Record<string, FluidFontSizeRange>;
