import type {
	ContainerChild,
	// Variant,
	// ComponentValue,
	CSS,
	DeclarationsBlock,
	Modifier,
	Recipe,
	Reference,
	Root,
	Selector,
	StyleframeOptions,
	Theme,
	Utility,
	// Calc,
	// Color,
	// AtRule,
	// Reference,
	// Selector,
	// Utility,
	// Theme,
	Variable,
} from "@styleframe/core";
import {
	isCSS,
	isRef,
	// 	Transform,
	// 	isTransform,
	// 	isTokenValue
	isRoot,
	// 	resolvePercentagePropertyValue,
	// 	normalizeTokenName,
	// 	toCssName,
	// 	defaultThemeName,
	// 	isCalc,
	// 	isColor,
	// 	isAtRule,
	// 	isRef,
	isSelector,
	// 	isUtility,
	// 	isTheme,
	isVariable,
} from "@styleframe/core";
import type { ConsumeOptions, Output, OutputFile, OutputLine } from "./types";
import { addIndentToLine, indentLines, normalizeVariableName } from "./utils";
// import { indentLines } from '@styleframe/utils';
// import { rootThemeTemplate, themeTemplate } from './templates';
// import type { VariantProps } from '@styleframe/types';

/**
 * Consumes a variable instance, equivalent to setting a CSS variable
 */

export function consumeVariable(
	instance: Variable,
	options: StyleframeOptions,
): string {
	return `${normalizeVariableName(instance.name, options)}: ${consume(instance.value, options)};`;
}

/**
 * Consumes a declarations block, equivalent to setting CSS properties
 */
export function consumeDeclarations(
	instance: DeclarationsBlock,
	options: StyleframeOptions,
): string[] {
	return Object.entries(instance).map(([propertyName, propertyValue]) => {
		return `${propertyName}: ${consume(propertyValue, options)};`;
	});
}

/**
 * Consumes a selector instance, equivalent to setting a CSS selector
 */
export function consumeSelector(
	instance: Selector,
	options: StyleframeOptions,
): string {
	const variables = instance.variables.map((variable) =>
		addIndentToLine(consumeVariable(variable, options), options),
	);

	const declarations = consumeDeclarations(instance.declarations, options).map(
		(line) => addIndentToLine(line, options),
	);

	const children = instance.children.map((child) => consume(child, options));

	const variablesSpacer =
		variables.length > 0 && (declarations.length > 0 || children.length > 0)
			? "\n"
			: "";

	const declarationsSpacer =
		declarations.length > 0 && children.length > 0 ? "\n" : "";

	return `${instance.query} {
${variables.join("\n")}${variablesSpacer}${declarations.join(
	"\n",
)}${declarationsSpacer}${children.join("\n")}
}`;
}

// /**
//  * Consumes a utility instance, equivalent to setting a utility CSS selector
//  */
// export function consumeUtility(instance: Utility): string {
// 	return consumeSelector(instance.__value);
// }
//
// /**
//  * Consumes a component value, equivalent to the body of a selector
//  */
// export function consumeComponentValue(instance: ComponentValue): string {
// 	return Object.entries(instance)
// 		.map(([propertyName, propertyValue]) =>
// 			propertyName === 'variables'
// 				? consumeSelectorVariables(propertyValue as Variable[])
// 				: consumeSelectorProperty(propertyName, propertyValue)
// 		)
// 		.join('\n');
// }
//
// /**
//  * Consumes a media instance, equivalent to setting a CSS media query
//  */
// export function consumeAtRule(instance: AtRule): string {
// 	let value: string;
// 	if (Array.isArray(instance.__value)) {
// 		value = instance.__value.map(consume).join('\n\n');
// 	} else if (isSelector(instance.__value)) {
// 		value = consumeSelector(instance.__value);
// 	} else if (isTokenValue(instance.__value)) {
// 		value = consume(instance.__value);
// 	} else {
// 		value = consumeComponentValue(instance.__value);
// 	}
//
// 	return `@${instance.__name} ${instance.__identifier} {
// ${indentLines(value)}
// }`;
// }
//
// /**
//  * Consumes a transform value, equivalent to setting a CSS transform value
//  */
// export function consumeTransform(instance: Transform): string {
// 	return `${instance.__name}(${instance.__value.map(consume).join(', ')})`;
// }
//
// /**
//  * Consumes variants, equivalent to stringifying an object
//  */
// export function consumeVariants(
// 	instance: Record<string, Variant>,
// 	options: {
// 		typescript?: boolean;
// 		tailwindcss?: boolean;
// 	}
// ): string {
// 	const variants = Object.entries(instance).reduce<Record<string, VariantProps>>(
// 		(acc, [key, variant]) => {
// 			acc[key] = variant.__value;
// 			return acc;
// 		},
// 		{}
// 	);
//
// 	const importString = options.typescript
// 		? `import { ThemeOptions } from '@inkline/types';\n\n`
// 		: '';
// 	const themeTypeString = options.typescript ? `: ThemeOptions` : '';
//
// 	return `${importString}export const theme${themeTypeString} = {
//     tailwindcss: ${options.tailwindcss},
//     variants: ${indentLines(JSON.stringify(variants, null, 4)).trim()}
// };`;
// }
//
// /**
//  * Consumes a theme instance, setting all variables and selectors
//  */
// export function consumeTheme(instance: Theme) {
// 	const isDefaultTheme = instance.__name === defaultThemeName;
// 	const variables = instance.variables
// 		? Array.from(instance.__keys.variables)
// 			.reduce<string[]>((acc, key) => {
// 				acc.push(consumeVariable(instance.variables[key]));
// 				return acc;
// 			}, [])
// 			.join('\n')
// 		: '';
// 	const selectors = instance.selectors ? instance.selectors.map(consume).join('\n\n') : '';
// 	const utilities = instance.utilities ? instance.utilities.map(consume).join('\n\n') : '';
//
// 	return isDefaultTheme
// 		? rootThemeTemplate(variables, selectors, utilities)
// 		: themeTemplate(`.${instance.__name}-theme`, variables, selectors, utilities);
// }

// export function consumeTheme(instance: Theme): string[] {
// 	return [];
// }

/**
 * Consumes any token instance and returns the CSS string representation
 */
export function consume(instance: unknown, options: StyleframeOptions): string {
	switch (true) {
		case isSelector(instance):
			return consumeSelector(instance, options);
		// case isUtility(instance):
		// 	return consumeUtility(instance, output);
		// 	break;
		// case isAtRule(instance):
		// 	return consumeAtRule(instance, output);
		// 	break;
		// case isTransform(instance):
		// 	return consumeTransform(instance, output);
		// 	break;
		// case isTheme(instance):
		// 	return consumeTheme(instance, output);
		// 	break;
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

/**
 * Consumes a ref instance, equivalent to referencing a CSS variable with optional fallback
 */

export function consumeRef(
	instance: Reference,
	options: StyleframeOptions,
): string {
	return `var(${normalizeVariableName(instance.name, options)}${instance.fallback ? `, ${consume(instance.fallback, options)}` : ""})`;
}

/**
 * Consumes a CSS value, equivalent to the string body of a selector
 */
export function consumeCSS(instance: CSS, options: StyleframeOptions): string {
	return instance.value.map((part) => consume(part, options)).join("");
}

/**
 * Consumes a primitive instance, equivalent to setting a CSS value
 */

export function consumePrimitive(
	instance: unknown,
	_options: StyleframeOptions,
): string {
	return instance !== undefined && instance !== null
		? `${instance as string}`
		: "";
}
