import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useCheckboxGroupRecipe } from "./useCheckboxGroupRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"flexWrap",
		"alignItems",
		"gap",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useCheckboxGroupRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCheckboxGroupRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("checkbox-group");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCheckboxGroupRecipe(s);

		expect(recipe.base).toEqual({ display: "flex" });
	});

	describe("variants", () => {
		it("should have all orientation variants", () => {
			const s = createInstance();
			const recipe = useCheckboxGroupRecipe(s);

			expect(Object.keys(recipe.variants!.orientation)).toEqual([
				"vertical",
				"horizontal",
			]);
			expect(recipe.variants!.orientation.vertical).toEqual({
				flexDirection: "column",
			});
			expect(recipe.variants!.orientation.horizontal).toEqual({
				flexDirection: "row",
				flexWrap: "wrap",
				alignItems: "center",
			});
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useCheckboxGroupRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({ gap: "@0.75" });
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCheckboxGroupRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			orientation: "vertical",
			size: "md",
		});
	});

	it("should not define compound variants", () => {
		const s = createInstance();
		const recipe = useCheckboxGroupRecipe(s);

		expect(recipe.compoundVariants ?? []).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useCheckboxGroupRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base?.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter orientation variants", () => {
			const s = createInstance();
			const recipe = useCheckboxGroupRecipe(s, {
				filter: { orientation: ["horizontal"] },
			});

			expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useCheckboxGroupRecipe(s, {
				filter: { orientation: ["horizontal"] },
			});

			expect(recipe.defaultVariants?.orientation).toBeUndefined();
		});
	});
});
