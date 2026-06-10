import { styleframe } from "@styleframe/core";
import { useTextareaGroupRecipe } from "./useTextareaGroupRecipe";

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
		"borderLeftWidth",
		"borderRightWidth",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useTextareaGroupRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useTextareaGroupRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("textarea-group");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useTextareaGroupRecipe(s);

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
			const recipe = useTextareaGroupRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useTextareaGroupRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	describe("setup callback", () => {
		it("should register a .textarea-group selector with seam radius rules", () => {
			const s = createInstance();
			useTextareaGroupRecipe(s);

			const groupSelector = s.root.children.find(
				(child) =>
					child.type === "selector" &&
					(child as { query: string }).query === ".textarea-group",
			) as
				| {
						type: "selector";
						query: string;
						children: Array<{ type: string; query?: string }>;
				  }
				| undefined;

			expect(groupSelector).toBeDefined();
			expect(groupSelector?.query).toBe(".textarea-group");

			const expectedQueries = [
				".textarea-prepend + .textarea",
				".textarea-prepend > *:first-child",
				".textarea:has(+ .textarea-append)",
				".textarea-append > *:last-child",
			];

			for (const query of expectedQueries) {
				const rule = groupSelector?.children.find(
					(child) => child.type === "selector" && child.query === query,
				);
				expect(rule, `missing seam rule: ${query}`).toBeDefined();
			}
		});
	});
});
