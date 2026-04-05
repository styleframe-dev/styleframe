import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useModalFooterRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"gap",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useModalFooterRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useModalFooterRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("modal-footer");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useModalFooterRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			gap: "@0.75",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			borderTopWidth: "@border-width.thin",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});

		it("should have size variants with correct padding", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.lg).toEqual({
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useModalFooterRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral solid compound variant", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-800",
						borderBottomColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral soft compound variant", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s);

			const neutralSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "soft",
			);

			expect(neutralSoft).toEqual({
				match: { color: "neutral", variant: "soft" },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-700",
						borderBottomColor: "@color.gray-700",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.alignItems).toBe("center");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useModalFooterRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "neutral"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(3);
		});
	});
});
