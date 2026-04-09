import { styleframe } from "@styleframe/core";
import { useSpinnerCircleRecipe } from "./useSpinnerCircleRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"animationName",
		"animationDuration",
		"animationTimingFunction",
		"animationIterationCount",
		"transformOrigin",
		"width",
		"height",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useSpinnerCircleRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSpinnerCircleRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("spinner-circle");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSpinnerCircleRecipe(s);

		expect(recipe.base).toEqual({
			animationName: "spinner-rotate",
			animationDuration: "1.2s",
			animationTimingFunction: "linear",
			animationIterationCount: "infinite",
			transformOrigin: "center center",
		});
	});

	describe("variants", () => {
		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useSpinnerCircleRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual([
				"auto",
				"sm",
				"md",
				"lg",
			]);
		});

		it("should have correct size variant styles", () => {
			const s = createInstance();
			const recipe = useSpinnerCircleRecipe(s);

			expect(recipe.variants!.size).toEqual({
				auto: { width: "100%", height: "100%" },
				sm: { width: "@2", height: "@2" },
				md: { width: "@3", height: "@3" },
				lg: { width: "@4", height: "@4" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSpinnerCircleRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = useSpinnerCircleRecipe(s);

		expect(recipe.compoundVariants).toEqual(undefined);
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSpinnerCircleRecipe(s, {
				base: { animationDuration: "2s" },
			});

			expect(recipe.base?.animationDuration).toBe("2s");
			expect(recipe.base?.animationName).toBe("spinner-rotate");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useSpinnerCircleRecipe(s, {
				filter: { size: ["sm", "md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSpinnerCircleRecipe(s, {
				filter: { size: ["sm", "lg"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
