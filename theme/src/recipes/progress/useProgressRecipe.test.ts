import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useProgressBarRecipe, useProgressRecipe } from "./useProgressRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"width",
		"height",
		"overflow",
		"borderRadius",
		"background",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useProgressRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useProgressRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("progress");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useProgressRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			width: "100%",
			overflow: "hidden",
			borderRadius: "@border-radius.md",
		});
	});

	describe("variants", () => {
		it("should have non-semantic color variants only", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: {
					height: "@0.25",
					borderRadius: "@border-radius.sm",
				},
				sm: {
					height: "@0.375",
					borderRadius: "@border-radius.sm",
				},
				md: {
					height: "@0.5",
					borderRadius: "@border-radius.md",
				},
				lg: {
					height: "@0.75",
					borderRadius: "@border-radius.md",
				},
				xl: {
					height: "@1",
					borderRadius: "@border-radius.lg",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useProgressRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			// 3 non-semantic colors × 1 (no variant axis) = 3
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have correct light color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const light = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light",
			);

			expect(light).toEqual({
				match: { color: "light" },
				css: {
					background: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct dark color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const dark = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark",
			);

			expect(dark).toEqual({
				match: { color: "dark" },
				css: {
					background: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-700",
					},
				},
			});
		});

		it("should have correct neutral color compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s);

			const neutral = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral",
			);

			expect(neutral).toEqual({
				match: { color: "neutral" },
				css: {
					background: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-800",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.width).toBe("100%");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				filter: { color: ["light", "dark"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "neutral"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useProgressRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});

describe("useProgressBarRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useProgressBarRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("progress-bar");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useProgressBarRecipe(s);

		expect(recipe.base).toEqual({
			height: "100%",
			borderRadius: "@border-radius.md",
			transitionProperty: "width",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "300ms",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"primary",
				"secondary",
				"success",
				"info",
				"warning",
				"error",
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have variant axis with solid", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid"]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: { borderRadius: "@border-radius.sm" },
				sm: { borderRadius: "@border-radius.sm" },
				md: { borderRadius: "@border-radius.md" },
				lg: { borderRadius: "@border-radius.md" },
				xl: { borderRadius: "@border-radius.lg" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useProgressBarRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "primary",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			// 6 semantic × 1 variant + 3 non-semantic × 1 variant = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct solid compound variant for standard colors", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const primarySolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "primary" && cv.match.variant === "solid",
			);

			expect(primarySolid).toEqual({
				match: { color: "primary", variant: "solid" },
				css: {
					background: "@color.primary",
				},
			});
		});

		it("should have correct light color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					background: "@color.gray-400",
					"&:dark": {
						background: "@color.gray-400",
					},
				},
			});
		});

		it("should have correct dark color compound variant", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-500",
					"&:dark": {
						background: "@color.gray-500",
					},
				},
			});
		});

		it("should have correct neutral color compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.gray-400",
					"&:dark": {
						background: "@color.gray-500",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				base: { height: "50%" },
			});

			expect(recipe.base!.height).toBe("50%");
			expect(recipe.base!.borderRadius).toBe("@border-radius.md");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				filter: { color: ["primary", "success"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"primary",
				"success",
			]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				filter: { color: ["primary"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "primary"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useProgressBarRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
