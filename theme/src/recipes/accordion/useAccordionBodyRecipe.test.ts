import { styleframe } from "@styleframe/core";
import { useAccordionBodyRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"overflow",
		"minHeight",
		"fontSize",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useAccordionBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("accordion-body");
	});

	it("should clip overflow so the grid row can collapse", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.base).toEqual({
			overflow: "hidden",
			minHeight: "0",
		});
	});

	it("should scale padding and font with size", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.variants!.size.md).toEqual({
			fontSize: "@font-size.sm",
			paddingTop: "@0.5",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
		});
	});

	it("should not declare compound variants", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.compoundVariants).toBeUndefined();
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useAccordionBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});
});
