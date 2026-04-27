import type { TokenValue } from "@styleframe/core";

export const fluidViewportValues = {
	minWidth: 320,
	maxWidth: 1440,
} as const satisfies {
	minWidth: TokenValue;
	maxWidth: TokenValue;
};
