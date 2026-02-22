import type {
	Styleframe,
	Recipe,
	VariantDeclarationsBlock,
} from "@styleframe/core";
import { defu } from "defu";

export type RecipeConfig<
	Variants extends Record<
		string,
		Record<string, VariantDeclarationsBlock>
	> = Record<string, Record<string, VariantDeclarationsBlock>>,
> = {
	base?: VariantDeclarationsBlock;
	variants?: Variants;
	defaultVariants?: {
		[K in keyof Variants]?: keyof Variants[K] & string;
	};
	compoundVariants?: Array<{
		match: {
			[K in keyof Variants]?: keyof Variants[K] & string;
		};
		css: VariantDeclarationsBlock;
	}>;
};

export type DeepPartial<T> = {
	[P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export function createUseRecipe<
	Name extends string,
	Variants extends Record<string, Record<string, VariantDeclarationsBlock>>,
	Config extends RecipeConfig<Variants>,
>(name: Name, defaults: Config) {
	return function useRecipe(
		s: Styleframe,
		options?: DeepPartial<Config>,
	): Recipe<Name, Variants> {
		const merged = defu(options ?? {}, defaults) as Config;
		return s.recipe({
			name,
			...merged,
		});
	};
}
