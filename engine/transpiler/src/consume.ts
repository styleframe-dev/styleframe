import type {
	ContainerChild,
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
	// Variant,
	// ComponentValue,
	// CSS
} from "@styleframe/core";
import {
	isRef,
	// 	isCSS,
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
	// 	isSelector,
	// 	isUtility,
	// 	isTheme,
	isVariable,
} from "@styleframe/core";
import type { Output, OutputFile } from "./types";
import { indentLines, normalizeVariableName } from "./utils";
// import { indentLines } from '@styleframe/utils';
// import { rootThemeTemplate, themeTemplate } from './templates';
// import type { VariantProps } from '@styleframe/types';

/**
 * Consumes each item in an array and joins the result
 */
export function consumeArray(
	instance: unknown[],
	options: StyleframeOptions,
): string {
	return instance.map((child) => consume(child, options)).join(", ");
}

/**
 * Consumes a variable instance, equivalent to setting a CSS variable
 */
export function consumeVariable(
	instance: Variable,
	options: StyleframeOptions,
): string {
	return `${normalizeVariableName(instance.name)}: ${consume(instance.value, options)};`;
}

/**
 * Consumes a ref instance, equivalent to referencing a CSS variable with optional fallback
 */
export function consumeRef(
	instance: Reference,
	options: StyleframeOptions,
): string {
	return `var(${normalizeVariableName(instance.name)}${instance.fallback ? `, ${consume(instance.fallback, options)}` : ""})`;
}

// /**
//  * Consumes a calc instance, equivalent to setting a CSS calc value
//  */
// export function consumeCalc(instance: Calc): string {
// 	return `calc(${consume(instance.__value)})`;
// }
//
// /**
//  * Consumes a color instance, equivalent to setting a CSS color value
//  */
// export function consumeColor(instance: Color): string {
// 	if (isCSS(instance.__value)) {
// 		return `hsla(${consume(instance.__value)})`;
// 	}
//
// 	const h = consume(instance.__value[0]);
// 	const s = resolvePercentagePropertyValue(consume(instance.__value[1]));
// 	const l = resolvePercentagePropertyValue(consume(instance.__value[2]));
// 	const a = consume(instance.__value[3]);
//
// 	return `hsla(${h} ${s} ${l} / ${a})`;
// }
//
// /**
//  * Consumes a selector property, equivalent to setting a CSS property
//  */
// export function consumeSelectorProperty(key: string, value: unknown): string {
// 	const resolvedKey = toCssName(key);
// 	return `${resolvedKey}: ${consume(value)};`;
// }
//
// /**
//  * Consumes a selector variable, equivalent to setting a CSS variable within a selector
//  */
// export function consumeSelectorVariables(value: Variable[]): string {
// 	return value.map(consumeVariable).join('\n');
// }

/**
 * Consumes a selector instance, equivalent to setting a CSS selector
 */
export function consumeSelector(
	instance: Selector,
	options: StyleframeOptions,
): string {
	const declarations = consumeDeclarations(instance.declarations, options);

	return `${instance.query} {
${indentLines(declarations)}
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
//  * Consumes a CSS value, equivalent to the string body of a selector
//  */
// export function consumeCSS(instance: CSS): string {
// 	return instance.__value.map(consume).join('');
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

/**
 * Consumes a primitive instance, equivalent to setting a CSS value
 */
export function consumePrimitive(
	instance: unknown,
	options: StyleframeOptions,
): string {
	return instance !== undefined && instance !== null
		? `${instance as string}`
		: "";
}

export function consumeTheme(instance: Theme): string[] {
	return [];
}

/**
 * Consumes any token instance and returns the CSS string representation
 */
export function consume(instance: unknown, options: StyleframeOptions): string {
	switch (true) {
		case Array.isArray(instance):
			return consumeArray(instance, options);
		case isVariable(instance):
			return consumeVariable(instance, options);
		case isRef(instance):
			return consumeRef(instance, options);
		case isSelector(instance):
			return consumeSelector(instance, options);
		// case isUtility(instance):
		// 	return consumeUtility(instance, output);
		// case isAtRule(instance):
		// 	return consumeAtRule(instance, output);
		// case isTransform(instance):
		// 	return consumeTransform(instance, output);
		// case isTheme(instance):
		// 	return consumeTheme(instance, output);
		// case isCSS(instance):
		// 	return consumeCSS(instance, output);
		default:
			return consumePrimitive(instance, options);
	}
}
