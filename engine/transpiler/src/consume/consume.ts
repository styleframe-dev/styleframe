import type { StyleframeOptions } from "@styleframe/core";
import {
	isAtRule,
	isCSS,
	isRef,
	isRoot,
	isSelector,
	isTheme,
	isUtility,
	isVariable,
} from "@styleframe/core";
import { createAtRuleConsumer } from "./at-rule";
import { createCSSTemplateLiteralConsumer } from "./css";
import { createPrimitiveConsumer } from "./primitive";
import { createRefConsumer } from "./ref";
import { createRootConsumer } from "./root";
import { createSelectorConsumer } from "./selector";
import { createThemeConsumer } from "./theme";
import { createUtilityConsumer } from "./utility";
import { createVariableConsumer } from "./variable";

/**
 * Consumes any token instance and returns the CSS string representation
 */
export function consumeCSS(
	instance: unknown,
	options: StyleframeOptions,
): string {
	const consumeRoot = createRootConsumer(consumeCSS);
	const consumeSelector = createSelectorConsumer(consumeCSS);
	const consumeUtility = createUtilityConsumer(consumeCSS);
	const consumeAtRule = createAtRuleConsumer(consumeCSS);
	// const consumeRecipe = createRecipeConsumer(consume);
	const consumeTheme = createThemeConsumer(consumeCSS);
	const consumeVariable = createVariableConsumer(consumeCSS);
	const consumeRef = createRefConsumer(consumeCSS);
	const consumeCSSTemplateLiteral =
		createCSSTemplateLiteralConsumer(consumeCSS);
	const consumePrimitive = createPrimitiveConsumer(consumeCSS);

	switch (true) {
		case isSelector(instance):
			return consumeSelector(instance, options);
		case isUtility(instance):
			return consumeUtility(instance, options);
		case isAtRule(instance):
			return consumeAtRule(instance, options);
		case isRoot(instance):
			return consumeRoot(instance, options);
		case isTheme(instance):
			return consumeTheme(instance, options);
		case isVariable(instance):
			return consumeVariable(instance, options);
		case isRef(instance):
			return consumeRef(instance, options);
		case isCSS(instance):
			return consumeCSSTemplateLiteral(instance, options);
		default:
			return consumePrimitive(instance, options);
	}
}

/**
 * Consumes any token instance and returns the TS string representation
 */
export function consumeTS(
	instance: unknown,
	options: StyleframeOptions,
): string {
	// const consumeRecipe = createRecipeConsumer(consumeTS);

	switch (true) {
		case Array.isArray(instance):
			return instance.map((item) => consumeTS(item, options)).join("\n");
		// case isRecipe(instance):
		// 	return consumeRecipe(instance, options);
		// 	break;
		default:
			return "";
	}
}
