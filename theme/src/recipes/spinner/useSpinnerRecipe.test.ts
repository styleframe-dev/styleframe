import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useSpinnerRecipe } from "./useSpinnerRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"position",
		"alignItems",
		"justifyContent",
		"fontSize",
		"lineHeight",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useSpinnerRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSpinnerRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("spinner");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSpinnerRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			position: "relative",
			alignItems: "center",
			justifyContent: "center",
			fontSize: "@font-size.sm",
			lineHeight: "@line-height.normal",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"primary",
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual([
				"auto",
				"sm",
				"md",
				"lg",
			]);
		});

		it("should have correct size variant styles", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(recipe.variants!.size).toEqual({
				auto: {},
				sm: {},
				md: {},
				lg: {},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSpinnerRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "primary",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 4 compound variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(4);
		});

		it("should have correct primary compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "primary",
			);
			expect(cv?.css).toEqual({
				color: "@color.primary",
			});
		});

		it("should have correct light compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "light",
			);
			expect(cv?.css).toEqual({
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.gray-700",
				},
			});
		});

		it("should have correct dark compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "dark");
			expect(cv?.css).toEqual({
				color: "@color.white",
				"&:dark": {
					color: "@color.white",
				},
			});
		});

		it("should have correct neutral compound variant", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral",
			);
			expect(cv?.css).toEqual({
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.white",
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				filter: { color: ["primary"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["primary"]);
		});

		it("should prune compound variants when filtering", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				filter: { color: ["primary", "neutral"] },
			});

			expect(recipe.compoundVariants!.length).toBe(2);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSpinnerRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
