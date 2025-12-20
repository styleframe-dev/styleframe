import type { RecipeRuntime } from "@styleframe/core";
import { describe, expect, it } from "vitest";
import { createRecipe } from "./runtime";

describe("createRecipe", () => {
	it("should apply base declarations", () => {
		const runtime: RecipeRuntime = {
			base: {
				borderWidth: "thin",
				borderStyle: "solid",
				cursor: "pointer",
			},
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toContain("button");
		expect(result).toContain("_border-width:thin");
		expect(result).toContain("_border-style:solid");
		expect(result).toContain("_cursor:pointer");
	});

	it("should apply default variants when no props are provided", () => {
		const runtime: RecipeRuntime = {
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

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toBe(
			"button _border-width:thin _border-style:solid _cursor:pointer _background:primary _color:white _padding:2",
		);
	});

	it("should apply specified variant overriding default variant", () => {
		const runtime: RecipeRuntime = {
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

		const button = createRecipe("button", runtime);
		const result = button({ color: "secondary" });

		expect(result).toBe(
			"button _border-width:thin _border-style:solid _cursor:pointer _background:secondary _color:white _padding:2",
		);
	});

	it("should apply compound variants when conditions match", () => {
		const runtime: RecipeRuntime = {
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
		};

		const button = createRecipe("button", runtime);
		const result = button({ color: "primary", size: "sm" });

		expect(result).toBe(
			"button _border-width:thin _border-style:solid _cursor:pointer _background:primary-dark _color:white _padding:1",
		);
	});

	it("should not apply compound variants when conditions don't match", () => {
		const runtime: RecipeRuntime = {
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

		const button = createRecipe("button", runtime);
		const result = button({ color: "secondary", size: "sm" });

		// Should not apply compound variant because color doesn't match
		expect(result).toContain("_background:secondary");
		expect(result).not.toContain("_background:primary-dark");
	});

	it("should convert camelCase utility names to kebab-case", () => {
		const runtime: RecipeRuntime = {
			base: {
				borderRadius: "md",
				backgroundColor: "white",
			},
		};

		const card = createRecipe("card", runtime);
		const result = card({});

		expect(result).toContain("_border-radius:md");
		expect(result).toContain("_background-color:white");
	});

	it("should handle boolean value true", () => {
		const runtime: RecipeRuntime = {
			base: {
				display: true,
			},
		};

		const element = createRecipe("element", runtime);
		const result = element({});

		expect(result).toContain("_display");
		expect(result).not.toContain("_display:true");
	});

	it("should handle multiple compound variants", () => {
		const runtime: RecipeRuntime = {
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

		const button = createRecipe("button", runtime);
		const result = button({ color: "primary", size: "sm", rounded: "true" });

		// Should apply both compound variants
		expect(result).toContain("_padding:0.5");
		expect(result).toContain("_box-shadow:glow");
		expect(result).toContain("_border-radius:full");
	});

	it("should handle recipes with no default variants", () => {
		const runtime: RecipeRuntime = {
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

		const text = createRecipe("text", runtime);
		const result = text({});

		expect(result).toBe("text _font-family:sans");
	});

	it("should override declarations in correct order: base < variants < compound variants", () => {
		const runtime: RecipeRuntime = {
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

		const button = createRecipe("button", runtime);
		const result = button({ size: "sm" });

		// Compound variant should override variant, which overrides base
		expect(result).toBe("button _padding:compound");
	});

	it("should handle modifier blocks in base declarations", () => {
		const runtime: RecipeRuntime = {
			base: {
				background: "blue",
				hover: {
					background: "darkblue",
				},
			},
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toContain("_background:blue");
		expect(result).toContain("_hover:background:darkblue");
	});

	it("should handle compound modifiers like hover:focus", () => {
		const runtime: RecipeRuntime = {
			base: {
				boxShadow: "none",
				"hover:focus": {
					boxShadow: "lg",
				},
			},
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toContain("_box-shadow:none");
		expect(result).toContain("_hover:focus:box-shadow:lg");
	});

	it("should handle modifier blocks in variant declarations", () => {
		const runtime: RecipeRuntime = {
			base: {},
			variants: {
				color: {
					primary: {
						background: "blue",
						hover: {
							background: "darkblue",
						},
					},
				},
			},
			defaultVariants: {
				color: "primary",
			},
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toContain("_background:blue");
		expect(result).toContain("_hover:background:darkblue");
	});

	it("should handle modifier blocks in compoundVariants", () => {
		const runtime: RecipeRuntime = {
			base: {},
			variants: {
				color: {
					primary: {},
				},
				disabled: {
					false: {},
				},
			},
			defaultVariants: {
				color: "primary",
				disabled: "false",
			},
			compoundVariants: [
				{
					match: {
						color: "primary",
						disabled: "false",
					},
					css: {
						hover: {
							background: "primary-shade-50",
						},
					},
				},
			],
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toContain("_hover:background:primary-shade-50");
	});

	it("should handle multiple modifiers in same block", () => {
		const runtime: RecipeRuntime = {
			base: {
				background: "blue",
				hover: {
					background: "darkblue",
				},
				focus: {
					outline: "ring",
				},
			},
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		expect(result).toContain("_background:blue");
		expect(result).toContain("_hover:background:darkblue");
		expect(result).toContain("_focus:outline:ring");
	});

	it("should override modifier declarations correctly", () => {
		const runtime: RecipeRuntime = {
			base: {
				hover: {
					background: "base-hover",
				},
			},
			variants: {
				color: {
					primary: {
						hover: {
							background: "variant-hover",
						},
					},
				},
			},
			defaultVariants: {
				color: "primary",
			},
		};

		const button = createRecipe("button", runtime);
		const result = button({});

		// Variant should override base for the same modifier+utility combination
		expect(result).toContain("_hover:background:variant-hover");
		expect(result).not.toContain("_hover:background:base-hover");
	});

	it("should handle empty runtime", () => {
		const runtime: RecipeRuntime = {};

		const element = createRecipe("element", runtime);
		const result = element({});

		expect(result).toBe("element");
	});

	it("should handle runtime with only variants and no base", () => {
		const runtime: RecipeRuntime = {
			variants: {
				size: {
					sm: { padding: "1" },
					md: { padding: "2" },
				},
			},
			defaultVariants: {
				size: "sm",
			},
		};

		const element = createRecipe("element", runtime);
		const result = element({});

		expect(result).toBe("element _padding:1");
	});

	it("should handle variant with undefined value", () => {
		const runtime: RecipeRuntime = {
			base: {
				padding: "default",
			},
			variants: {
				size: {
					none: undefined,
					sm: { padding: "1" },
				},
			},
		};

		const element = createRecipe("element", runtime);
		const result = element({ size: "none" });

		// Should only have base padding since variant is undefined
		expect(result).toBe("element _padding:default");
	});
});
