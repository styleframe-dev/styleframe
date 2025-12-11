import type {
	ModifierDeclarationsBlock,
	Recipe,
	VariantDeclarationsBlock,
} from "./types";

/**
 * Converts a utility name and value to a class name string.
 * Format: _utility-name:value or _modifier:utility-name:value
 *
 * @param utilityName - The name of the utility (e.g., "borderWidth", "padding")
 * @param value - The value of the utility (e.g., "thin", "sm", "2")
 * @param modifiers - Optional array of modifier prefixes (e.g., ["hover", "focus"])
 * @returns The formatted class name (e.g., "_border-width:thin" or "_hover:border-width:thin")
 */
function toClassName(
	utilityName: string,
	value: string | boolean,
	modifiers: string[] = [],
): string {
	// Convert camelCase to kebab-case
	const kebabName = utilityName.replace(
		/[A-Z]/g,
		(letter) => `-${letter.toLowerCase()}`,
	);

	// Build the modifier prefix if any
	const modifierPrefix = modifiers.length > 0 ? `${modifiers.join(":")}:` : "";

	// If value is true, return just the utility name without a value
	if (value === true) {
		return `_${modifierPrefix}${kebabName}`;
	}

	return `_${modifierPrefix}${kebabName}:${value}`;
}

/**
 * Checks if a value is a modifier block (an object) vs a primitive declaration value.
 *
 * @param value - The value to check
 * @returns True if the value is a modifier block
 */
function isModifierBlock(
	value: string | boolean | ModifierDeclarationsBlock,
): value is ModifierDeclarationsBlock {
	return typeof value === "object" && value !== null;
}

/**
 * Processes a declarations block and adds entries to the declarations map.
 * Handles modifier blocks (one level deep) by extracting modifier keys.
 *
 * @param declarations - The declarations block to process
 * @param declarationsMap - Map to accumulate utility declarations
 */
function processDeclarationsBlock(
	declarations: VariantDeclarationsBlock,
	declarationsMap: Map<
		string,
		{ value: string | boolean; modifiers: string[] }
	>,
): void {
	for (const [key, value] of Object.entries(declarations)) {
		if (isModifierBlock(value)) {
			// Key is a modifier (e.g., 'hover', 'hover:focus')
			// Split compound modifiers into individual keys
			const modifierKeys = key.split(":");

			// Process the modifier block's utility declarations (one level only)
			for (const [utilityKey, utilityValue] of Object.entries(value)) {
				const mapKey = `${modifierKeys.join(":")}:${utilityKey}`;
				declarationsMap.set(mapKey, {
					value: utilityValue,
					modifiers: modifierKeys,
				});
			}
		} else {
			// Key is a utility name, value is the declaration value
			declarationsMap.set(key, { value, modifiers: [] });
		}
	}
}

/**
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
		// Key: utility name (possibly with modifier prefix), Value: { value, modifiers }
		const declarationsMap = new Map<
			string,
			{ value: string | boolean; modifiers: string[] }
		>();

		// 1. Apply base declarations
		if (recipe.base) {
			processDeclarationsBlock(recipe.base, declarationsMap);
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
						processDeclarationsBlock(declarations, declarationsMap);
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
					processDeclarationsBlock(compoundVariant.css, declarationsMap);
				}
			}
		}

		// 4. Build the final class name string
		const classNames: string[] = [recipe.name];

		// Convert declarations map to class names
		// Extract the utility name from the map key (remove modifier prefix if present)
		for (const [key, { value, modifiers }] of declarationsMap.entries()) {
			// The key might be "hover:focus:padding" or just "padding"
			// We need to extract just the utility name for toClassName
			const utilityName =
				modifiers.length > 0 ? key.slice(modifiers.join(":").length + 1) : key;
			classNames.push(toClassName(utilityName, value, modifiers));
		}

		return classNames.join(" ");
	};
}
