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

		const processedVariables = (variables ?? []).map((variable) =>
			addIndentToLine(consumeVariable(variable, options), options),
		);

		const processedDeclarations = consumeDeclarations(
			declarations ?? {},
			options,
		).map((line) => addIndentToLine(line, options));

		const processedChildren = (children ?? []).map((child) => {
			const processedChild = consume(child, options);
			return isRoot ? processedChild : indentLines(processedChild, options);
		});

		const hasVariables = processedVariables.length > 0;
		const hasDeclarations = processedDeclarations.length > 0;
		const hasChildren = processedChildren.length > 0;

		const variablesSpacer =
			hasVariables && (hasDeclarations || hasChildren) ? "\n\n" : "";
		const declarationsSpacer = hasDeclarations && hasChildren ? "\n\n" : "";
		const bracketSpacer =
			hasVariables || hasDeclarations || hasChildren ? "\n" : "";

		if (isRoot) {
			return `${query} {${bracketSpacer}${processedVariables.join(
				"\n",
			)}${variablesSpacer}${processedDeclarations.join(
				"\n",
			)}${bracketSpacer}}${processedChildren.length ? "\n\n" : ""}${processedChildren.join("\n\n")}`;
		}

		return `${query} {${bracketSpacer}${processedVariables.join(
			"\n",
		)}${variablesSpacer}${processedDeclarations.join(
			"\n",
		)}${declarationsSpacer}${processedChildren.join("\n\n")}${bracketSpacer}}`;
	};
}
