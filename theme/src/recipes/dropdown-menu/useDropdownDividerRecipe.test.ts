import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useDropdownDividerRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
		"marginTop",
		"marginBottom",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useDropdownDividerRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDropdownDividerRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("dropdown-divider");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useDropdownDividerRecipe(s);

		expect(recipe.base).toEqual({
			borderTopWidth: "@border-width.thin",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			marginTop: "@0.25",
			marginBottom: "@0.25",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});

		it("should not have size variants", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			expect((recipe.variants as Record<string, unknown>).size).toBeUndefined();
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useDropdownDividerRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct light solid compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct dark solid compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-700",
					"&:dark": {
						borderTopColor: "@color.gray-700",
					},
				},
			});
		});

		it("should have correct neutral solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-700",
					},
				},
			});
		});

		it("should always show visible divider lines even for soft variant", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s);

			const neutralSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "soft",
			);

			expect(neutralSoft?.css?.borderTopColor).toBe("@color.gray-200");
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s, {
				base: { marginTop: "@0.5" },
			});

			expect(recipe.base!.marginTop).toBe("@0.5");
			expect(recipe.base!.marginBottom).toBe("@0.25");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "neutral"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useDropdownDividerRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
		});
	});
});
