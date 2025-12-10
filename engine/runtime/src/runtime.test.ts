import type { Recipe } from "@styleframe/core";
import { describe, expect, it } from "vitest";
import { createRecipe } from "./runtime";

describe("createRecipe", () => {
	it("should apply base declarations", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				borderWidth: "thin",
				borderStyle: "solid",
				cursor: "pointer",
			},
			variants: {},
		};

		const button = createRecipe(recipe);
		const result = button({});

		expect(result).toContain("button");
		expect(result).toContain("_border-width:thin");
		expect(result).toContain("_border-style:solid");
		expect(result).toContain("_cursor:pointer");
	});

	it("should apply default variants when no props are provided", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				borderWidth: "thin",
				borderStyle: "solid",
				cursor: "pointer",
			},
			variants: {
				color: {
					primary: {
						background: "primary",
						color: "white",
					},
					secondary: {
						background: "secondary",
						color: "white",
					},
				},
				size: {
					sm: {
						padding: "1",
					},
					md: {
						padding: "2",
					},
					lg: {
						padding: "3",
					},
				},
			},
			defaultVariants: {
				color: "primary",
				size: "md",
			},
		};

		const button = createRecipe(recipe);
		const result = button({});

		expect(result).toBe(
			"button _border-width:thin _border-style:solid _cursor:pointer _background:primary _color:white _padding:2",
		);
	});

	it("should apply specified variant overriding default variant", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				borderWidth: "thin",
				borderStyle: "solid",
				cursor: "pointer",
			},
			variants: {
				color: {
					primary: {
						background: "primary",
						color: "white",
					},
					secondary: {
						background: "secondary",
						color: "white",
					},
				},
				size: {
					sm: {
						padding: "1",
					},
					md: {
						padding: "2",
					},
					lg: {
						padding: "3",
					},
				},
			},
			defaultVariants: {
				color: "primary",
				size: "md",
			},
		};

		const button = createRecipe(recipe);
		const result = button({ color: "secondary" });

		expect(result).toBe(
			"button _border-width:thin _border-style:solid _cursor:pointer _background:secondary _color:white _padding:2",
		);
	});

	it("should apply compound variants when conditions match", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				borderWidth: "thin",
				borderStyle: "solid",
				cursor: "pointer",
			},
			variants: {
				color: {
					primary: {
						background: "primary",
						color: "white",
					},
					secondary: {
						background: "secondary",
						color: "white",
					},
				},
				size: {
					sm: {
						padding: "1",
					},
					md: {
						padding: "2",
					},
					lg: {
						padding: "3",
					},
				},
			},
			defaultVariants: {
				color: "primary",
				size: "md",
			},
			compoundVariants: [
				{
					match: {
						color: "primary",
						size: "sm",
					},
					css: {
						padding: "1",
						background: "primary-dark",
						color: "white",
					},
				},
			],
		} as const;

		const button = createRecipe(recipe);
		const result = button({ color: "primary", size: "sm" });

		expect(result).toBe(
			"button _border-width:thin _border-style:solid _cursor:pointer _background:primary-dark _color:white _padding:1",
		);
	});

	it("should not apply compound variants when conditions don't match", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				borderWidth: "thin",
			},
			variants: {
				color: {
					primary: {
						background: "primary",
					},
					secondary: {
						background: "secondary",
					},
				},
				size: {
					sm: {
						padding: "1",
					},
					md: {
						padding: "2",
					},
				},
			},
			defaultVariants: {
				color: "primary",
				size: "md",
			},
			compoundVariants: [
				{
					match: {
						color: "primary",
						size: "sm",
					},
					css: {
						background: "primary-dark",
					},
				},
			],
		};

		const button = createRecipe(recipe);
		const result = button({ color: "secondary", size: "sm" });

		// Should not apply compound variant because color doesn't match
		expect(result).toContain("_background:secondary");
		expect(result).not.toContain("_background:primary-dark");
	});

	it("should convert camelCase utility names to kebab-case", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "card",
			base: {
				borderRadius: "md",
				backgroundColor: "white",
			},
			variants: {},
		};

		const card = createRecipe(recipe);
		const result = card({});

		expect(result).toContain("_border-radius:md");
		expect(result).toContain("_background-color:white");
	});

	it("should handle boolean value true", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "element",
			base: {
				display: true,
			},
			variants: {},
		};

		const element = createRecipe(recipe);
		const result = element({});

		expect(result).toContain("_display");
		expect(result).not.toContain("_display:true");
	});

	it("should handle multiple compound variants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				cursor: "pointer",
			},
			variants: {
				color: {
					primary: { background: "primary" },
					secondary: { background: "secondary" },
				},
				size: {
					sm: { padding: "1" },
					md: { padding: "2" },
				},
				rounded: {
					true: { borderRadius: "full" },
					false: { borderRadius: "none" },
				},
			},
			compoundVariants: [
				{
					match: {
						color: "primary",
						size: "sm",
					},
					css: {
						padding: "0.5",
					},
				},
				{
					match: {
						color: "primary",
						rounded: "true",
					},
					css: {
						boxShadow: "glow",
					},
				},
			],
		};

		const button = createRecipe(recipe);
		const result = button({ color: "primary", size: "sm", rounded: "true" });

		// Should apply both compound variants
		expect(result).toContain("_padding:0.5");
		expect(result).toContain("_box-shadow:glow");
		expect(result).toContain("_border-radius:full");
	});

	it("should handle recipes with no default variants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "text",
			base: {
				fontFamily: "sans",
			},
			variants: {
				size: {
					sm: { fontSize: "12" },
					md: { fontSize: "16" },
				},
			},
		};

		const text = createRecipe(recipe);
		const result = text({});

		expect(result).toBe("text _font-family:sans");
	});

	it("should override declarations in correct order: base < variants < compound variants", () => {
		const recipe: Recipe = {
			type: "recipe",
			name: "button",
			base: {
				padding: "default",
			},
			variants: {
				size: {
					sm: {
						padding: "variant",
					},
				},
			},
			compoundVariants: [
				{
					match: {
						size: "sm",
					},
					css: {
						padding: "compound",
					},
				},
			],
		};

		const button = createRecipe(recipe);
		const result = button({ size: "sm" });

		// Compound variant should override variant, which overrides base
		expect(result).toBe("button _padding:compound");
	});
});
