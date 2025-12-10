import type {
	Container,
	Recipe,
	Root,
	TokenValue,
	UtilityFactory,
	VariantDeclarationsBlock,
} from "../types";

/**
 * Creates a recipe function to define design system recipes with variants.
 *
 * @example ```ts
 * recipe({
 *     name: "button",
 *     base: {
 *         borderWidth: ref(borderWidth), // Token reference => Variable<'border-width'> => Auto-generate _border-width
 *         borderStyle: ref(borderStyle), // Token reference => Variable<'border-style'> => Auto-generate _border-style
 *     },
 *     variants: {
 *         color: {
 *             primary: {
 *                 background: ref(colorPrimary), // Token reference => Variable<'color.primary'> => Auto-generate _background:primary
 *                 color: ref(colorWhite), // Token reference => Variable<'color.white'> => Auto-generate _color:white
 *                 borderColor: ref(colorPrimaryShade50), // Token reference => Variable<'color.primary-shade-50'> => Auto-generate _border-color:primary-shade-50
 *             },
 *             secondary: {
 *                 background: "@color.secondary", // Token path => Variable<'color.secondary'> => Auto-generate _background:secondary
 *                 color: "@color.white", // Token path => Variable<'color.white'> => Auto-generate _color:white
 *                 borderColor: "@color.secondary", // Token path => Variable<'color.secondary'> => Auto-generate _border-color:secondary
 *             },
 *         },
 *         size: {
 *             sm: {
 *                 padding: "@spacing.sm", // Token path => Variable<'spacing.sm'> => Auto-generate _padding:sm
 *                 fontSize: "@font-size.sm", // Token path => Variable<'font-size.sm'> => Auto-generate _font-size:sm
 *             },
 *             md: {
 *                 padding: "1rem", // Arbitrary value => Auto-generate _padding:[1rem]
 *                 fontSize: "1rem", // Arbitrary value => Auto-generate _font-size:[1rem]
 *             },
 *             lg: {
 *                 padding: "@spacing.lg", // Token path => Variable<'spacing.lg'> => Auto-generate _padding:lg
 *                 fontSize: "1.25rem", // Arbitrary value => Auto-generate _font-size:[1.25rem]
 *             },
 *         },
 *     },
 *     defaultVariants: {
 * 		   color: "primary",
 * 	       size: "md",
 *     },
 *     compoundVariants: [
 *         {
 *             match: {
 *                 color: "primary",
 *                 size: "lg",
 *             },
 *             css: {
 *                 padding: "@spacing.xl", // Token path => Variable<'spacing.xl'> => Auto-generate _padding:xl
 *                 fontWeight: "bold", // Arbitrary value => Auto-generate _font-weight:[bold]
 *             },
 *         },
 *         {
 *             match: {
 *                 color: "secondary",
 *                 size: "sm",
 *             },
 *             css: {
 *                 borderColor: ref(colorSecondaryShade50), // Token reference => Variable<'color.secondary-shade-50'> => Auto-generate _border-color:secondary-shade-50
 *                 padding: "@spacing.xs", // Token path => Variable<'spacing.xs'> => Auto-generate _padding:xs
 *             },
 *         },
 *     ],
 * });
 * ```
 */
export function createRecipeFunction(_parent: Container, root: Root) {
	return function recipe<
		Name extends string,
		Variants extends Record<string, Record<string, VariantDeclarationsBlock>>,
	>(options: Omit<Recipe<Name, Variants>, "type">): Recipe<Name, Variants> {
		const instance: Recipe<Name, Variants> = {
			type: "recipe",
			...options,
		};

		root.recipes.push(instance);
		return instance;
	};
}

/**
 * Collects all values for a given utility key from a declarations block.
 *
 * @param declarations - The declarations block to process
 * @param utilityValuesMap - Map to accumulate utility key -> values
 */
function collectDeclarationsValues(
	declarations: VariantDeclarationsBlock,
	utilityValuesMap: Map<string, Set<TokenValue>>,
): void {
	for (const [key, value] of Object.entries(declarations)) {
		let valuesSet = utilityValuesMap.get(key);
		if (!valuesSet) {
			valuesSet = new Set();
			utilityValuesMap.set(key, valuesSet);
		}
		valuesSet.add(value);
	}
}

/**
 * Retrieves a utility factory from the root registry by name.
 * Returns undefined if the utility is not found.
 *
 * @param root - The root object containing utility factories
 * @param name - The name of the utility to find
 * @returns The utility factory or undefined
 */
function getUtilityFactory(
	root: Root,
	name: string,
): UtilityFactory | undefined {
	return root.utilities.find((utility) => utility.name === name);
}

/**
 * Processes a recipe and creates utilities for all style declarations.
 *
 * This function iterates through all style fields in a recipe:
 * 1. `base` - Root level field key-value pairs
 * 2. `variants.*.*` - Each variant group's options containing field key-value pairs
 * 3. `compoundVariants.*.css` - Each compound variant's css declarations
 *
 * For efficiency, it:
 * - Collects all values needed for each utility key across the entire recipe
 * - Retrieves each utility factory only once
 * - Creates all utility instances in a single call per utility
 *
 * @param recipe - The recipe to process
 * @param root - The root object containing utility factories
 *
 * @example
 * ```ts
 * const buttonRecipe = recipe({
 *   name: "button",
 *   base: { borderWidth: "thin" },
 *   variants: {
 *     size: {
 *       sm: { padding: "0.5rem" },
 *       lg: { padding: "1rem" },
 *     },
 *   },
 * });
 *
 * processRecipeUtilities(buttonRecipe, root);
 * // Creates:
 * // - borderWidth utility with value "thin"
 * // - padding utility with values ["0.5rem", "1rem"]
 * ```
 */
export function processRecipeUtilities(recipe: Recipe, root: Root): void {
	// Map of utility key -> Set of values to create
	const utilityValuesMap = new Map<string, Set<TokenValue>>();

	// 1. Process base declarations
	if (recipe.base) {
		collectDeclarationsValues(recipe.base, utilityValuesMap);
	}

	// 2. Process variants.*.* declarations
	if (recipe.variants) {
		for (const variantGroup of Object.values(recipe.variants)) {
			for (const variantOption of Object.values(variantGroup)) {
				collectDeclarationsValues(
					variantOption as VariantDeclarationsBlock,
					utilityValuesMap,
				);
			}
		}
	}

	// 3. Process compoundVariants.*.css declarations
	if (recipe.compoundVariants) {
		for (const compoundVariant of recipe.compoundVariants) {
			if (compoundVariant.css) {
				collectDeclarationsValues(compoundVariant.css, utilityValuesMap);
			}
		}
	}

	// Create utilities for each collected key
	for (const [utilityKey, valuesSet] of utilityValuesMap) {
		const utilityFactory = getUtilityFactory(root, utilityKey);

		if (!utilityFactory) {
			console.warn(
				`[styleframe] Utility "${utilityKey}" not found in registry. Skipping.`,
			);
			continue;
		}

		// Convert Set to Array for the create function
		const valuesArray = Array.from(valuesSet);

		// Call create with the array of values
		utilityFactory.create(valuesArray);
	}
}
