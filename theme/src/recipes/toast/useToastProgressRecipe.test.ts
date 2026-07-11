import { styleframe } from "@styleframe/core";
import { useToastProgressRecipe } from "./useToastProgressRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"bottom",
		"left",
		"right",
		"height",
		"transformOrigin",
		"background",
		"borderRadius",
		"animationName",
		"animationDuration",
		"animationTimingFunction",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useToastProgressRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toast-progress");
	});

	it("should pin a prominent rounded bar inset from the toast's corners", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.base).toEqual({
			position: "absolute",
			bottom: "@0.5",
			left: "@0.5",
			right: "@0.5",
			height: "@0.25",
			transformOrigin: "left center",
			background: "currentColor",
			borderRadius: "@border-radius.full",
			animationName: "toast-progress",
			animationDuration: "var(--toast-duration, 5s)",
			animationTimingFunction: "linear",
		});
	});

	it("should read its duration from the --toast-duration custom property", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.base?.animationDuration).toBe("var(--toast-duration, 5s)");
	});

	it("should have no variants", () => {
		const s = createInstance();
		const recipe = useToastProgressRecipe(s);

		expect(recipe.variants).toBeUndefined();
	});
});
