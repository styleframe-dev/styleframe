import type {
	ContainerChild,
	DeclarationsBlock,
	StyleframeOptions,
	Variable,
} from "@styleframe/core";
import type { ConsumeFunction } from "../types";
import { addIndentToLine, indentLines } from "../utils";
import { createDeclarationsConsumer } from "./declarations";
import { createVariableConsumer } from "./variable";
import { genSelector } from "../generator";

/**
 * Base function for consuming container-like structures (Selector, AtRule)
 */
export function createContainerConsumer(consume: ConsumeFunction) {
	const consumeVariable = createVariableConsumer(consume);
	const consumeDeclarations = createDeclarationsConsumer(consume);

	return function consumeContainer(
		query: string,
		instance: {
			variables?: Variable[];
			declarations?: DeclarationsBlock;
			children?: ContainerChild[];
		},
		options: StyleframeOptions,
	): string {
		const { variables, declarations, children } = instance;
		const isRoot = query === ":root";

		const consumedVariables = (variables ?? []).map((variable) =>
			consumeVariable(variable, options),
		);

		const consumedDeclarations = consumeDeclarations(
			declarations ?? {},
			options,
		);

		const consumedChildren = (children ?? []).map((child) =>
			consume(child, options),
		);

		const hasVariables = consumedVariables.length > 0;
		const hasDeclarations = consumedDeclarations.length > 0;
		const hasChildren = consumedChildren.length > 0;

		if (isRoot) {
			return `${
				hasVariables || hasDeclarations
					? genSelector(query, [
							...consumedVariables,
							...(hasVariables && (hasChildren || hasDeclarations) ? [""] : []),
							...consumedDeclarations,
						])
					: ""
			}${
				hasChildren && (hasVariables || hasDeclarations) ? "\n\t\n" : ""
			}${consumedChildren.join("\n\t")}`;
		}

		return genSelector(query, [
			...consumedVariables,
			...(hasVariables && (hasChildren || hasDeclarations) ? [""] : []),
			...consumedDeclarations,
			...(hasDeclarations && hasChildren ? [""] : []),
			...consumedChildren,
		]);
	};
}
