import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useModalBodyRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
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

describe("useModalBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("modal-body");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			gap: "@0.5",
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
			const recipe = useModalBodyRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});

		it("should have size variants with correct padding", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.sm).toEqual({
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useModalBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral solid compound variant", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s);

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

		it("should have correct light subtle compound variant", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s);

			const lightSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "subtle",
			);

			expect(lightSubtle).toEqual({
				match: { color: "light", variant: "subtle" },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-300",
					"&:dark": {
						borderTopColor: "@color.gray-200",
						borderBottomColor: "@color.gray-300",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base!.display).toBe("block");
			expect(recipe.base!.flexDirection).toBe("column");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useModalBodyRecipe(s, {
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
