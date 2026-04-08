import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { usePlaceholderRecipe } from "./usePlaceholderRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"overflow",
		"position",
		"opacity",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("usePlaceholderRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePlaceholderRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("placeholder");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePlaceholderRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.dashed",
			borderColor: "@color.gray-300",
			borderRadius: "@border-radius.md",
			overflow: "hidden",
			position: "relative",
			opacity: "0.75",
			"&:dark": {
				borderColor: "@color.gray-600",
			},
		});
	});

	describe("variants", () => {
		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = usePlaceholderRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
				},
				md: {
					paddingTop: "@1",
					paddingBottom: "@1",
					paddingLeft: "@1",
					paddingRight: "@1",
				},
				lg: {
					paddingTop: "@1.5",
					paddingBottom: "@1.5",
					paddingLeft: "@1.5",
					paddingRight: "@1.5",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePlaceholderRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = usePlaceholderRecipe(s);

		expect(recipe.compoundVariants).toHaveLength(0);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = usePlaceholderRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.alignItems).toBe("center");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = usePlaceholderRecipe(s, {
				filter: { size: ["sm", "lg"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "lg"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = usePlaceholderRecipe(s, {
				filter: { size: ["sm", "lg"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
