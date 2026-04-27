import type { TokenValue } from "@styleframe/core";

export const fluidScaleValues = {
	min: "@scale.major-second",
	max: "@scale.major-third",
} as const satisfies {
	min: TokenValue;
	max: TokenValue;
};
