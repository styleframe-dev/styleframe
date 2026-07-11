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

	it("should step down from the title in size and weight", () => {
		const s = createInstance();
		const recipe = useToastDescriptionRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			marginTop: "@0.25",
			fontSize: "@font-size.xs",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
		});
	});

	it("should not set an explicit colour so it inherits the variant", () => {
		const s = createInstance();
		const recipe = useToastDescriptionRecipe(s);

		expect(recipe.base).not.toHaveProperty("color");
	});
});
