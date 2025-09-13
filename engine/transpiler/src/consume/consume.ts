import type { StyleframeOptions } from "@styleframe/core";
import {
	isAtRule,
	isCSS,
	isRef,
	isSelector,
	isTheme,
	isUtility,
	isVariable,
} from "@styleframe/core";
import { createAtRuleConsumer } from "./at-rule";
import { createSelectorConsumer } from "./selector";
import { createUtilityConsumer } from "./utility";
import { createThemeConsumer } from "./theme";
import { createVariableConsumer } from "./variable";
import { createRefConsumer } from "./ref";
import { createCSSConsumer } from "./css";
import { createPrimitiveConsumer } from "./primitive";

/**
 * Consumes any token instance and returns the CSS string representation
 */
export function consume(instance: unknown, options: StyleframeOptions): string {
	const consumeSelector = createSelectorConsumer(consume);
	const consumeUtility = createUtilityConsumer(consume);
	const consumeAtRule = createAtRuleConsumer(consume);
	// const consumeRecipe = createRecipeConsumer(consume);
	const consumeTheme = createThemeConsumer(consume);
	const consumeVariable = createVariableConsumer(consume);
	const consumeRef = createRefConsumer(consume);
	const consumeCSS = createCSSConsumer(consume);
	const consumePrimitive = createPrimitiveConsumer(consume);

	switch (true) {
		case isSelector(instance):
			return consumeSelector(instance, options);
		case isUtility(instance):
			return consumeUtility(instance, options);
		case isAtRule(instance):
			return consumeAtRule(instance, options);
		// case isRecipe(instance):
		// 	return consumeRecipe(instance, options);
		// 	break;
		case isTheme(instance):
			return consumeTheme(instance, options);
		case isVariable(instance):
			return consumeVariable(instance, options);
		case isRef(instance):
			return consumeRef(instance, options);
		case isCSS(instance):
			return consumeCSS(instance, options);
		default:
			return consumePrimitive(instance, options);
	}
}
