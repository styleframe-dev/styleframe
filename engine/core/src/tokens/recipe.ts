import { isRef } from "../typeGuards";
import type {
	Container,
	ModifierDeclarationsBlock,
	ModifierFactory,
	Recipe,
	Root,
	TokenValue,
	UtilityFactory,
	VariantDeclarationsBlock,
} from "../types";
import { getModifier } from "../utils/getters";

/**
 * Creates a recipe function to define design system recipes with variants.
 *
 * @example ```ts
 * recipe({
 *     name: "button",
 *     base: {
 *         borderWidth: ref(borderWidth), // Token reference => Variable<'border-width'> => Auto-generate _border-width
 *         borderStyle: ref(borderStyle), // Token reference => Variable<'border-style'> => Auto-generate _border-style
 *  	   boxShadow: ref(boxShadowMd), // Token reference => Variable<'box-shadow.md'> => Auto-generate _box-shadow:md
 *         'hover:focus': { // Applying hover and focus modifiers
 *             boxShadow: ref(boxShadowSm), // Token reference => Variable<'box-shadow.sm'> => Auto-generate _hover:box-shadow:sm
 *         }
 *     },
 *     variants: {
 *         color: {
 *             primary: {
 *                 background: ref(colorPrimary), // Token reference => Variable<'color.primary'> => Auto-generate _background:primary
 *                 color: ref(colorWhite), // Token reference => Variable<'color.white'> => Auto-generate _color:white
 *                 borderColor: ref(colorPrimaryShade50), // Token reference => Variable<'color.primary-shade-50'> => Auto-generate _border-color:primary-shade-50,
 *             },
 *             secondary: {
 *                 background: "@color.secondary", // Token path => Variable<'color.secondary'> => Auto-generate _background:secondary
 *                 color: "@color.white", // Token path => Variable<'color.white'> => Auto-generate _color:white
 *                 borderColor: "@color.secondary-shade-50", // Token path => Variable<'color.secondary-shade-50'> => Auto-generate _border-color:secondary
 *             },
 * 			   disabled: {
 * 				   false: null,
 * 				   true: {
 * 					   opacity: "@opacity.50", // Token path => Variable<'opacity.50'> => Auto-generate _opacity:50
 * 					   cursor: "not-allowed", // Arbitrary value => Auto-generate _cursor:[not-allowed]
 * 				   }
 *             }
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
 *                 disabled: false
 *             },
 *             css: {
 * 				   hover: {
 * 					   background: "@color.primary-shade-50", // Token path => Variable<'color.primary-shade-50'> => Auto-generate _hover:background:primary-shade-50
 * 				   }
 *             },
 *         },
 *         {
 *             match: {
 *                 color: "secondary",
 *                 disabled: false
 *             },
 *             css: {
 * 				   hover: {
 * 					   background: ref(colorSecondaryShade50), // Token reference => Variable<'color.secondary-shade-50'> => Auto-generate _hover:background:secondary-shade-50
 * 				   }
 *             },
 *         },
 *     ],
 *     _processed: {
 * 	       base: {
 * 			   borderWidth: "default",
 * 			   borderStyle: "default",
 *         },
 * 	   	   variants: {
 * 			   color: {
 * 				   primary: {
 * 					   background: "primary",
 * 					   color: "white",
 * 					   borderColor: "primary-shade-50",
 * 				   },
 * 				   secondary: {
 * 					   background: "secondary",
 * 					   color: "white",
 * 					   borderColor: "secondary-shade-50",
 * 				   },
 * 			   },
 *
 *     }
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
 * Type representing an entry for a utility value with its modifier combination.
 */
type UtilityEntry = {
	value: TokenValue;
	modifiers: string[]; // compound modifier as array, e.g., ['hover', 'focus'] for 'hover:focus'
};

/**
 * Checks if a value is a modifier block (an object) vs a primitive declaration value.
 *
 * @param value - The value to check
 * @returns True if the value is a modifier block
 */
function isModifierBlock(
	value: string | boolean | ModifierDeclarationsBlock,
): value is ModifierDeclarationsBlock {
	return !isRef(value) && typeof value === "object" && value !== null;
}

/**
 * Collects all values for a given utility key from a declarations block.
 * Handles modifier blocks (one level deep) by extracting compound modifier keys.
 *
 * @param declarations - The declarations block to process
 * @param utilityEntriesMap - Map to accumulate utility key -> entries with values and modifier combinations
 */
function collectDeclarationsValues(
	declarations: VariantDeclarationsBlock,
	utilityEntriesMap: Map<string, UtilityEntry[]>,
): void {
	const addUtilityEntry = (
		utilityKey: string,
		value: TokenValue,
		modifiers: string[],
	) => {
		let entries = utilityEntriesMap.get(utilityKey);
		if (!entries) {
			entries = [];
			utilityEntriesMap.set(utilityKey, entries);
		}
		entries.push({ value, modifiers });
	};

	for (const [key, value] of Object.entries(declarations)) {
		if (isModifierBlock(value)) {
			const modifiers = key.split(":");
			for (const [utilityKey, utilityValue] of Object.entries(value)) {
				addUtilityEntry(utilityKey, utilityValue, modifiers);
			}
		} else {
			addUtilityEntry(key, value, []);
		}
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
	// Map of utility key -> entries with values and modifier combinations
	const utilityEntriesMap = new Map<string, UtilityEntry[]>();

	// 1. Process base declarations
	if (recipe.base) {
		collectDeclarationsValues(recipe.base, utilityEntriesMap);
	}

	// 2. Process variants.*.* declarations
	if (recipe.variants) {
		for (const variantGroup of Object.values(recipe.variants)) {
			for (const variantOption of Object.values(variantGroup)) {
				collectDeclarationsValues(
					variantOption as VariantDeclarationsBlock,
					utilityEntriesMap,
				);
			}
		}
	}

	// 3. Process compoundVariants.*.css declarations
	if (recipe.compoundVariants) {
		for (const compoundVariant of recipe.compoundVariants) {
			if (compoundVariant.css) {
				collectDeclarationsValues(compoundVariant.css, utilityEntriesMap);
			}
		}
	}

	// Cache for resolved modifier factories
	const modifierCache = new Map<string, ModifierFactory | null>();

	// Create utilities for each collected key
	for (const [utilityKey, entries] of utilityEntriesMap) {
		const utilityFactory = getUtilityFactory(root, utilityKey);

		if (!utilityFactory) {
			console.warn(
				`[styleframe] Utility "${utilityKey}" not found in registry. Skipping.`,
			);
			continue;
		}

		for (const entry of entries) {
			// Resolve modifier factories from modifier keys (using cache)
			const modifierFactories: ModifierFactory[] = [];
			for (const modifier of entry.modifiers) {
				if (!modifierCache.has(modifier)) {
					try {
						modifierCache.set(modifier, getModifier(root, modifier));
					} catch {
						console.warn(
							`[styleframe] Modifier "${modifier}" not found in registry. Skipping modifier for utility "${utilityKey}".`,
						);
						modifierCache.set(modifier, null);
					}
				}

				const modifierFactory = modifierCache.get(modifier);
				if (modifierFactory) {
					modifierFactories.push(modifierFactory);
				}
			}

			// Call create with the value and modifiers (if any)
			utilityFactory.create(
				[entry.value],
				modifierFactories.length > 0 ? modifierFactories : undefined,
			);
		}
	}
}
