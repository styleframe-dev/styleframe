import { styleframe } from "@styleframe/core";
import { useToastDescriptionRecipe } from "./useToastDescriptionRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"marginTop",
		"fontSize",
		"fontWeight",
		"lineHeight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useToastDescriptionRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastDescriptionRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-description");
	});

	it("should step down from the title in weight, with the size on the axis", () => {
		const s = createInstance();
		const recipe = useToastDescriptionRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			marginTop: "@0.25",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
		});
	});

	it("should not set an explicit colour so it inherits the variant", () => {
		const s = createInstance();
		const recipe = useToastDescriptionRecipe(s);

		expect(recipe.base).not.toHaveProperty("color");
	});

	describe("size", () => {
		it("should track the size axis on the literal token, matching the title", () => {
			const s = createInstance();
			const recipe = useToastDescriptionRecipe(s);

			// Title and description share the same literal size token at every
			// step — sm → sm, md → md, lg → lg — so they render equal in size;
			// the title stays dominant through weight alone.
			expect(recipe.variants!.size).toEqual({
				sm: { fontSize: "@font-size.sm" },
				md: { fontSize: "@font-size.md" },
				lg: { fontSize: "@font-size.lg" },
			});
		});

		it("should default to the md size", () => {
			const s = createInstance();
			const recipe = useToastDescriptionRecipe(s);

			expect(recipe.defaultVariants).toEqual({ size: "md" });
		});
	});
});
