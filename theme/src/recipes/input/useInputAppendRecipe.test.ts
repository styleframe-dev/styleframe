import { styleframe } from "@styleframe/core";
import { useInputAppendRecipe } from "./useInputAppendRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["display", "alignItems", "flexShrink"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useInputAppendRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useInputAppendRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("input-append");
	});

	it("should have transparent slot base styles", () => {
		const s = createInstance();
		const recipe = useInputAppendRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			flexShrink: "0",
		});
	});

	it("should have no variants", () => {
		const s = createInstance();
		const recipe = useInputAppendRecipe(s);

		expect(recipe.variants).toBeUndefined();
	});

	it("should have no default variants", () => {
		const s = createInstance();
		const recipe = useInputAppendRecipe(s);

		expect(recipe.defaultVariants).toBeUndefined();
	});
});
