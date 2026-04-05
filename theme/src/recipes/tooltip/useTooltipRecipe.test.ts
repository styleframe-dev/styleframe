import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useTooltipRecipe, useTooltipArrowRecipe } from "./useTooltipRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"fontWeight",
		"fontSize",
		"lineHeight",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"borderRadius",
		"boxShadow",
		"zIndex",
		"maxWidth",
		"background",
		"color",
		"width",
		"height",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useTooltipRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("tooltip");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			fontWeight: "@font-weight.medium",
			fontSize: "@font-size.sm",
			lineHeight: "@line-height.normal",
			paddingTop: "@0.375",
			paddingBottom: "@0.375",
			paddingLeft: "@0.625",
			paddingRight: "@0.625",
			borderRadius: "@border-radius.md",
			boxShadow: "@box-shadow.sm",
			zIndex: "@z-index.popover",
			maxWidth: "240px",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.25",
					paddingBottom: "@0.25",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
					borderRadius: "@border-radius.sm",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.625",
					paddingRight: "@0.625",
					borderRadius: "@border-radius.md",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					borderRadius: "@border-radius.md",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useTooltipRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "dark",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct dark/solid compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-900",
					color: "@color.text-inverted",
					borderColor: "@color.gray-800",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.text",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct light/solid compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.white",
						color: "@color.text-inverted",
						borderColor: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct neutral/solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral/subtle compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s);

			const neutralSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);

			expect(neutralSubtle).toEqual({
				match: { color: "neutral", variant: "subtle" },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-600",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				base: { maxWidth: "320px" },
			});

			expect(recipe.base!.maxWidth).toBe("320px");
			expect(recipe.base!.display).toBe("inline-flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { color: ["dark", "light"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["light", "dark"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { color: ["dark"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "dark"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { variant: ["solid", "soft"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
			expect(
				recipe.compoundVariants!.every(
					(cv) => cv.match.variant === "solid" || cv.match.variant === "soft",
				),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useTooltipRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});

describe("useTooltipArrowRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("tooltip-arrow");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.base).toEqual({
			width: "8px",
			height: "8px",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useTooltipArrowRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "dark",
			variant: "solid",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct dark/solid compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-900",
					borderColor: "@color.gray-800",
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral/solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral/subtle compound variant", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s);

			const neutralSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);

			expect(neutralSubtle).toEqual({
				match: { color: "neutral", variant: "subtle" },
				css: {
					background: "@color.gray-100",
					borderColor: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-800",
						borderColor: "@color.gray-600",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s, {
				base: { width: "12px" },
			});

			expect(recipe.base!.width).toBe("12px");
			expect(recipe.base!.height).toBe("8px");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s, {
				filter: { color: ["dark"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["dark"]);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useTooltipArrowRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
		});
	});
});
