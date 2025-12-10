import type { Recipe, VariantDeclarationsBlock } from "./types";

/**
 * Converts a utility name and value to a class name string.
 * Format: _utility-name:value
 *
 * @param utilityName - The name of the utility (e.g., "borderWidth", "padding")
 * @param value - The value of the utility (e.g., "thin", "sm", "2")
 * @returns The formatted class name (e.g., "_border-width:thin")
 */
function toClassName(utilityName: string, value: string | true): string {
	// Convert camelCase to kebab-case
	const kebabName = utilityName.replace(
		/[A-Z]/g,
		(letter) => `-${letter.toLowerCase()}`,
	);

	// If value is true, return just the utility name without a value
	if (value === true) {
		return `_${kebabName}`;
	}

	return `_${kebabName}:${value}`;
} /**
 * Creates a runtime recipe function that generates utility class strings based on variant props.
 *
 * The function:
 * 1. Applies the recipe name as the base class
 * 2. Applies all base declarations
 * 3. Applies variant declarations based on props (with defaultVariants as fallback)
 * 4. Applies compound variants if all conditions match
 * 5. Later declarations override earlier ones
 *
 * @param recipe - The recipe configuration object
 * @returns A function that accepts variant props and returns a className string
 *
 * @example
 * ```ts
 * const buttonRecipe: Recipe = {
 *     name: "button",
 *     base: {
 *         borderWidth: "thin", // Example of normal value
 *         borderStyle: "[solid]", // Example of using brackets for raw value
 *     },
 *     variants: {
 *         color: {
 *             primary: { background: "primary", color: "white" },
 *             secondary: { background: "secondary", color: "white" },
 *         },
 *         size: {
 *             sm: { padding: "[10px]" },
 *             md: { padding: "2" },
 *         },
 *     },
 *     defaultVariants: {
 *         color: "primary",
 *         size: "md",
 *     },
 * };
 *
 * const button = createRecipe(buttonRecipe);
 * button({}); // "button _border-width:thin _border-style:solid _background:primary _color:white _padding:2"
 * button({ color: "secondary" }); // "button _border-width:thin _border-style:solid _background:secondary _color:white _padding:2"
 * ```
 */
export function createRecipe<
	Name extends string,
	Variants extends Record<string, Record<string, VariantDeclarationsBlock>>,
>(
	recipe: Recipe<Name, Variants>,
): (
	props?: {
		[K in keyof Variants]?: keyof Variants[K] & string;
	},
) => string {
	return (props = {}) => {
		// Track all declarations in a map to handle overrides
		// Key: utility name, Value: utility value
		const declarationsMap = new Map<string, string | true>();

		// 1. Apply base declarations
		if (recipe.base) {
			for (const [key, value] of Object.entries(recipe.base)) {
				declarationsMap.set(key, value);
			}
		}

		// 2. Apply variant declarations (with defaultVariants as fallback)
		if (recipe.variants) {
			for (const [variantKey, variantOptions] of Object.entries(
				recipe.variants,
			)) {
				// Get the selected variant value from props or defaultVariants
				const selectedVariant =
					(props as Record<string, string>)[variantKey] ??
					recipe.defaultVariants?.[
						variantKey as keyof typeof recipe.defaultVariants
					];

				if (selectedVariant && variantOptions[selectedVariant as string]) {
					const declarations = variantOptions[selectedVariant as string];
					if (declarations) {
						for (const [key, value] of Object.entries(declarations)) {
							declarationsMap.set(key, value);
						}
					}
				}
			}
		}

		// 3. Apply compound variants if conditions match
		if (recipe.compoundVariants) {
			for (const compoundVariant of recipe.compoundVariants) {
				// Check if all variant conditions match
				let allConditionsMatch = true;

				for (const [variantKey, variantValue] of Object.entries(
					compoundVariant.match,
				)) {
					// Get the selected variant value from props or defaultVariants
					const selectedVariant =
						(props as Record<string, string>)[variantKey] ??
						recipe.defaultVariants?.[
							variantKey as keyof typeof recipe.defaultVariants
						];

					if (selectedVariant !== variantValue) {
						allConditionsMatch = false;
						break;
					}
				}

				// If all conditions match, apply the compound variant css declarations
				if (allConditionsMatch) {
					for (const [key, value] of Object.entries(compoundVariant.css)) {
						declarationsMap.set(key, value);
					}
				}
			}
		}

		// 4. Build the final class name string
		const classNames: string[] = [recipe.name];

		// Convert declarations map to class names
		for (const [key, value] of declarationsMap.entries()) {
			classNames.push(toClassName(key, value));
		}

		return classNames.join(" ");
	};
}
