import { styleframe } from "@styleframe/core";
import { useToastTitleRecipe } from "./useToastTitleRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "fontWeight", "lineHeight"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useToastTitleRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastTitleRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-title");
	});

	it("should render a semibold headline that inherits colour", () => {
		const s = createInstance();
		const recipe = useToastTitleRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			fontWeight: "@font-weight.semibold",
			lineHeight: "@line-height.snug",
		});
	});

	it("should not set an explicit colour so it inherits the variant", () => {
		const s = createInstance();
		const recipe = useToastTitleRecipe(s);

		expect(recipe.base).not.toHaveProperty("color");
	});
});
