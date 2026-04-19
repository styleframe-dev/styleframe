import { styleframe } from "@styleframe/core";
import { useToastBodyRecipe } from "./useToastBodyRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["flex", "minWidth"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useToastBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-body");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useToastBodyRecipe(s);

		expect(recipe.base).toEqual({
			flex: "1",
			minWidth: "0",
		});
	});
});
