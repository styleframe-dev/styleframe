import type {
	Container,
	Recipe,
	Root,
	VariantDeclarationsBlock,
} from "../types";

export function createRecipeFunction(_parent: Container, root: Root) {
	return function recipe<
		Name extends string,
		Variants extends Record<string, Record<string, VariantDeclarationsBlock>>,
	>(
		name: Name,
		defaults: Recipe<Name, Variants>["defaults"],
		variants: Recipe<Name, Variants>["variants"],
		options?: {
			defaultVariants?: Recipe<Name, Variants>["defaultVariants"];
			compoundVariants?: Recipe<Name, Variants>["compoundVariants"];
		},
	): Recipe<Name, Variants> {
		const instance: Recipe<Name, Variants> = {
			type: "recipe",
			name,
			defaults,
			variants,
			...options,
		};

		root.recipes.push(instance);
		return instance;
	};
}
