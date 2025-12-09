import type {
	Container,
	Recipe,
	Root,
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
 *     defaultVariants: {...},
 *     compoundVariants: [...],
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
