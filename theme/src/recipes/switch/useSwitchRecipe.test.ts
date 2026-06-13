import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useSwitchRecipe } from "./useSwitchRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"cursor",
		"userSelect",
		"color",
		"lineHeight",
		"opacity",
		"gap",
		"fontSize",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSwitchRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("switch");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			cursor: "pointer",
			userSelect: "none",
			color: "@color.text",
		});
	});

	describe("variants", () => {
		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				gap: "@0.5",
				fontSize: "@font-size.sm",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	it("should not define compound variants", () => {
		const s = createInstance();
		const recipe = useSwitchRecipe(s);

		expect(recipe.compoundVariants ?? []).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSwitchRecipe(s, {
				filter: { size: ["sm"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
