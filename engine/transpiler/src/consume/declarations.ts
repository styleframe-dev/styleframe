import type { DeclarationsBlock, StyleframeOptions } from "@styleframe/core";
import type { ConsumeFunction } from "../types";

/**
 * Consumes a declarations block, equivalent to setting CSS properties
 */
export function createDeclarationsConsumer(consume: ConsumeFunction) {
	return function consumeDeclarations(
		instance: DeclarationsBlock,
		options: StyleframeOptions,
	): string[] {
		return Object.entries(instance).map(([propertyName, propertyValue]) => {
			return `${propertyName}: ${consume(propertyValue, options)};`;
		});
	};
}
