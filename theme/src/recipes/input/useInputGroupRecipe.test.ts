import { styleframe } from "@styleframe/core";
import { useInputGroupRecipe } from "./useInputGroupRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"width",
		"position",
		"borderTopLeftRadius",
		"borderBottomLeftRadius",
		"borderTopRightRadius",
		"borderBottomRightRadius",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useInputGroupRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useInputGroupRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("input-group");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useInputGroupRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "stretch",
			width: "100%",
			position: "relative",
		});
	});

	describe("variants", () => {
		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useInputGroupRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useInputGroupRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	describe("setup callback", () => {
		it("should register a .input-group selector with seam radius rules", () => {
			const s = createInstance();
			useInputGroupRecipe(s);

			const inputGroupSelector = s.root.children.find(
				(child) =>
					child.type === "selector" &&
					(child as { query: string }).query === ".input-group",
			) as
				| {
						type: "selector";
						query: string;
						children: Array<{ type: string; query?: string }>;
				  }
				| undefined;

			expect(inputGroupSelector).toBeDefined();
			expect(inputGroupSelector?.query).toBe(".input-group");

			const expectedQueries = [
				".input-prepend + .input",
				".input-prepend > *:first-child",
				".input:has(+ .input-append)",
				".input-append > *:last-child",
			];

			for (const query of expectedQueries) {
				const rule = inputGroupSelector?.children.find(
					(child) => child.type === "selector" && child.query === query,
				);
				expect(rule, `missing seam rule: ${query}`).toBeDefined();
			}
		});
	});
});
