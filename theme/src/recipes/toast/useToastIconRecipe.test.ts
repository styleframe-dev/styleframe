import { styleframe } from "@styleframe/core";
import { useToastIconRecipe } from "./useToastIconRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "flexShrink"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useToastIconRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastIconRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-icon");
	});

	it("should keep the icon from shrinking", () => {
		const s = createInstance();
		const recipe = useToastIconRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			flexShrink: "0",
		});
	});
});
