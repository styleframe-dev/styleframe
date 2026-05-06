import { styleframe } from "@styleframe/core";
import { describe, expect, it } from "vitest";
import { usePageHeroImageRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"overflow",
		"maxWidth",
		"borderRadius",
		"boxShadow",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("usePageHeroImageRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePageHeroImageRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("page-hero-image");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePageHeroImageRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			overflow: "hidden",
			maxWidth: "100%",
			borderRadius: "@border-radius.lg",
			boxShadow: "@box-shadow.lg",
		});
	});

	describe("variants", () => {
		it("should have size variants with scaling radius and shadow", () => {
			const s = createInstance();
			const recipe = usePageHeroImageRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					borderRadius: "@border-radius.md",
					boxShadow: "@box-shadow.md",
				},
				md: {
					borderRadius: "@border-radius.lg",
					boxShadow: "@box-shadow.lg",
				},
				lg: {
					borderRadius: "@border-radius.xl",
					boxShadow: "@box-shadow.xl",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePageHeroImageRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePageHeroImageRecipe(s, {
				base: { boxShadow: "@box-shadow.none" },
			});

			expect(recipe.base!.boxShadow).toBe("@box-shadow.none");
			expect(recipe.base!.overflow).toBe("hidden");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = usePageHeroImageRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});
	});
});
