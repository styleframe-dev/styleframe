import type { CSS, StyleframeOptions } from "@styleframe/core";
import type { ConsumeFunction } from "../types";

/**
 * Consumes a CSS value, equivalent to the string body of a selector
 */
export function createCSSConsumer(consume: ConsumeFunction) {
	return function consumeCSS(
		instance: CSS,
		options: StyleframeOptions,
	): string {
		return instance.value
			.map((part) => consume(part, options))
			.join("")
			.trim();
	};
}
