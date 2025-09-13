import type { AtRule, StyleframeOptions } from "@styleframe/core";
import type { ConsumeFunction } from "../types";
import { createContainerConsumer } from "./container";

/**
 * Consumes a generic at-rule instance, equivalent to setting a CSS at-rule
 * such as @media, @supports, @keyframes, etc.
 */
export function createAtRuleConsumer(consume: ConsumeFunction) {
	const consumeContainer = createContainerConsumer(consume);

	return function consumeAtRule(
		instance: AtRule,
		options: StyleframeOptions,
	): string {
		const query = `@${instance.identifier} ${instance.rule}`;

		const hasDeclarations = Object.keys(instance.declarations).length > 0;
		const hasVariables = instance.variables.length > 0;
		const hasChildren = instance.children.length > 0;

		return hasDeclarations || hasVariables || hasChildren
			? consumeContainer(query, instance, options)
			: `${query};`;
	};
}
