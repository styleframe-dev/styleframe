import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Root } from "../types";
import { createModifierFunction } from "./modifier";
import { createRecipeFunction, processRecipeUtilities } from "./recipe";
import { createRoot } from "./root";
import { createUtilityFunction } from "./utility";

describe("createRecipeFunction", () => {
	let root: Root;
	let recipe: ReturnType<typeof createRecipeFunction>;

	beforeEach(() => {
		root = createRoot();
		recipe = createRecipeFunction(root, root);
	});

	test("should create a recipe function", () => {
		expect(recipe).toBeTypeOf("function");
	});

	test("should register recipe in root.recipes only", () => {
		const instance = recipe({
			name: "button",
			base: { borderWidth: "thin", borderStyle: "solid" },
			variants: {
				color: {
					primary: { background: "primary", color: "white" },
					secondary: { background: "secondary", color: "white" },
				},
				size: {
					sm: { padding: "sm" },
					md: { padding: "md" },
					lg: { padding: "lg" },
				},
			},
		});

		expect(instance).toEqual({
			type: "recipe",
			name: "button",
			base: { borderWidth: "thin", borderStyle: "solid" },
			variants: {
				color: {
					primary: { background: "primary", color: "white" },
					secondary: { background: "secondary", color: "white" },
				},
				size: {
					sm: { padding: "sm" },
					md: { padding: "md" },
					lg: { padding: "lg" },
				},
			},
		});

		expect(root.recipes).toHaveLength(1);
		expect(root.recipes[0]).toBe(instance);

		// Ensure no selectors/variables were created
		expect(root.children).toHaveLength(0);
	});

	test("should support options: defaultVariants and compoundVariants", () => {
		const instance = recipe({
			name: "chip",
			base: { borderWidth: "thin" },
			variants: {
				variant: {
					filled: { background: "primary", color: "white" },
					outline: { background: "transparent", color: "primary" },
				},
				size: {
					sm: { padding: "sm" },
					md: { padding: "md" },
				},
			},
			defaultVariants: { variant: "filled", size: "sm" },
			compoundVariants: [
				{
					match: {
						variant: "filled",
						size: "sm",
					},
					css: { background: "primary", color: "white" },
				},
			],
		});

		expect(instance.defaultVariants).toEqual({
			variant: "filled",
			size: "sm",
		});
		expect(instance.compoundVariants?.length).toBe(1);
		expect(instance.compoundVariants).toEqual([
			{
				match: {
					variant: "filled",
					size: "sm",
				},
				css: { background: "primary", color: "white" },
			},
		]);
	});

	test("should maintain type information for recipe name", () => {
		const instance = recipe({ name: "typed-recipe", base: {}, variants: {} });
		const name: "typed-recipe" = instance.name;
		expect(name).toBe("typed-recipe");
	});
});

describe("processRecipeUtilities", () => {
	let root: Root;
	let recipe: ReturnType<typeof createRecipeFunction>;
	let utility: ReturnType<typeof createUtilityFunction>;

	beforeEach(() => {
		root = createRoot();
		recipe = createRecipeFunction(root, root);
		utility = createUtilityFunction(root, root);
	});

	test("should process base declarations and create utilities", () => {
		// Register utilities
		utility("borderWidth", ({ value }) => ({ borderWidth: value }));
		utility("borderStyle", ({ value }) => ({ borderStyle: value }));

		const instance = recipe({
			name: "button",
			base: { borderWidth: "thin", borderStyle: "solid" },
			variants: {},
		});

		processRecipeUtilities(instance, root);

		// Should have created 2 utility instances
		expect(root.children).toHaveLength(2);
		expect(root.children[0]).toMatchObject({
			type: "utility",
			name: "borderWidth",
			value: "[thin]",
		});
		expect(root.children[1]).toMatchObject({
			type: "utility",
			name: "borderStyle",
			value: "[solid]",
		});
	});

	test("should process variant declarations and create utilities", () => {
		utility("background", ({ value }) => ({ background: value }));
		utility("color", ({ value }) => ({ color: value }));
		utility("padding", ({ value }) => ({ padding: value }));

		const instance = recipe({
			name: "button",
			variants: {
				color: {
					primary: { background: "blue", color: "white" },
					secondary: { background: "gray", color: "black" },
				},
				size: {
					sm: { padding: "0.5rem" },
					lg: { padding: "1rem" },
				},
			},
		});

		processRecipeUtilities(instance, root);

		// Should have created utilities for all variant values
		const backgroundUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "background",
		);
		const colorUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "color",
		);
		const paddingUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "padding",
		);

		expect(backgroundUtilities).toHaveLength(2);
		expect(colorUtilities).toHaveLength(2);
		expect(paddingUtilities).toHaveLength(2);
	});

	test("should process compoundVariants declarations and create utilities", () => {
		utility("padding", ({ value }) => ({ padding: value }));
		utility("fontWeight", ({ value }) => ({ fontWeight: value }));

		const instance = recipe({
			name: "button",
			variants: {
				color: {
					primary: {},
				},
				size: {
					lg: {},
				},
			},
			compoundVariants: [
				{
					match: { color: "primary", size: "lg" },
					css: { padding: "2rem", fontWeight: "bold" },
				},
			],
		});

		processRecipeUtilities(instance, root);

		expect(root.children).toHaveLength(2);
		expect(root.children[0]).toMatchObject({
			type: "utility",
			name: "padding",
			value: "[2rem]",
		});
		expect(root.children[1]).toMatchObject({
			type: "utility",
			name: "fontWeight",
			value: "[bold]",
		});
	});

	test("should process all three locations exhaustively", () => {
		utility("borderWidth", ({ value }) => ({ borderWidth: value }));
		utility("background", ({ value }) => ({ background: value }));
		utility("padding", ({ value }) => ({ padding: value }));
		utility("fontWeight", ({ value }) => ({ fontWeight: value }));

		const instance = recipe({
			name: "button",
			base: { borderWidth: "thin" },
			variants: {
				color: {
					primary: { background: "blue" },
				},
				size: {
					sm: { padding: "0.5rem" },
				},
			},
			compoundVariants: [
				{
					match: { color: "primary", size: "sm" },
					css: { fontWeight: "bold" },
				},
			],
		});

		processRecipeUtilities(instance, root);

		const utilityNames = root.children.map((child) =>
			child.type === "utility" ? child.name : null,
		);

		expect(utilityNames).toContain("borderWidth");
		expect(utilityNames).toContain("background");
		expect(utilityNames).toContain("padding");
		expect(utilityNames).toContain("fontWeight");
	});

	test("should warn and skip when utility is not found in registry", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		const instance = recipe({
			name: "button",
			base: { unknownUtility: "value" },
			variants: {},
		});

		processRecipeUtilities(instance, root);

		expect(warnSpy).toHaveBeenCalledWith(
			'[styleframe] Utility "unknownUtility" not found in registry. Skipping.',
		);
		expect(root.children).toHaveLength(0);

		warnSpy.mockRestore();
	});

	test("should handle empty recipe gracefully", () => {
		const instance = recipe({
			name: "empty",
			variants: {},
		});

		processRecipeUtilities(instance, root);

		expect(root.children).toHaveLength(0);
	});

	test("should handle recipe with only empty base", () => {
		const instance = recipe({
			name: "empty",
			base: {},
			variants: {},
		});

		processRecipeUtilities(instance, root);

		expect(root.children).toHaveLength(0);
	});

	test("should handle recipe with empty variants", () => {
		utility("borderWidth", ({ value }) => ({ borderWidth: value }));

		const instance = recipe({
			name: "button",
			base: { borderWidth: "thin" },
			variants: {
				color: {},
				size: {},
			},
		});

		processRecipeUtilities(instance, root);

		expect(root.children).toHaveLength(1);
	});

	test("should handle recipe with empty compoundVariants array", () => {
		utility("borderWidth", ({ value }) => ({ borderWidth: value }));

		const instance = recipe({
			name: "button",
			base: { borderWidth: "thin" },
			variants: {},
			compoundVariants: [],
		});

		processRecipeUtilities(instance, root);

		expect(root.children).toHaveLength(1);
	});

	test("should handle boolean values", () => {
		utility("hidden", ({ value }) => ({
			display: value === true ? "none" : "block",
		}));

		const instance = recipe({
			name: "element",
			base: { hidden: true },
			variants: {},
		});

		processRecipeUtilities(instance, root);

		expect(root.children).toHaveLength(1);
		expect(root.children[0]).toMatchObject({
			type: "utility",
			name: "hidden",
			value: "[true]",
		});
	});

	test("should process multiple variant groups correctly", () => {
		utility("background", ({ value }) => ({ background: value }));
		utility("padding", ({ value }) => ({ padding: value }));
		utility("fontSize", ({ value }) => ({ fontSize: value }));

		const instance = recipe({
			name: "button",
			variants: {
				color: {
					primary: { background: "blue" },
					secondary: { background: "gray" },
					tertiary: { background: "green" },
				},
				size: {
					sm: { padding: "0.5rem", fontSize: "0.875rem" },
					md: { padding: "1rem", fontSize: "1rem" },
					lg: { padding: "1.5rem", fontSize: "1.25rem" },
				},
			},
		});

		processRecipeUtilities(instance, root);

		const backgroundUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "background",
		);
		const paddingUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "padding",
		);
		const fontSizeUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "fontSize",
		);

		expect(backgroundUtilities).toHaveLength(3);
		expect(paddingUtilities).toHaveLength(3);
		expect(fontSizeUtilities).toHaveLength(3);
	});

	test("should process multiple compoundVariants correctly", () => {
		utility("padding", ({ value }) => ({ padding: value }));
		utility("margin", ({ value }) => ({ margin: value }));

		const instance = recipe({
			name: "button",
			variants: {
				color: {
					primary: {},
					secondary: {},
				},
				size: {
					sm: {},
					lg: {},
				},
			},
			compoundVariants: [
				{
					match: { color: "primary", size: "sm" },
					css: { padding: "0.5rem" },
				},
				{
					match: { color: "primary", size: "lg" },
					css: { padding: "2rem" },
				},
				{
					match: { color: "secondary", size: "sm" },
					css: { margin: "1rem" },
				},
			],
		});

		processRecipeUtilities(instance, root);

		const paddingUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "padding",
		);
		const marginUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "margin",
		);

		expect(paddingUtilities).toHaveLength(2);
		expect(marginUtilities).toHaveLength(1);
	});

	test("should continue processing other utilities when one is missing", () => {
		const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

		utility("borderWidth", ({ value }) => ({ borderWidth: value }));
		// Note: borderStyle utility is NOT registered

		const instance = recipe({
			name: "button",
			base: { borderWidth: "thin", borderStyle: "solid" },
			variants: {},
		});

		processRecipeUtilities(instance, root);

		// Should still create the borderWidth utility
		expect(root.children).toHaveLength(1);
		expect(root.children[0]).toMatchObject({
			type: "utility",
			name: "borderWidth",
		});

		// Should warn about missing borderStyle
		expect(warnSpy).toHaveBeenCalledWith(
			'[styleframe] Utility "borderStyle" not found in registry. Skipping.',
		);

		warnSpy.mockRestore();
	});

	describe("modifier support", () => {
		let modifier: ReturnType<typeof createModifierFunction>;

		beforeEach(() => {
			modifier = createModifierFunction(root, root);
		});

		test("should process modifier blocks in base declarations", () => {
			utility("background", ({ value }) => ({ background: value }));
			utility("boxShadow", ({ value }) => ({ boxShadow: value }));
			modifier("hover", ({ selector }) => {
				selector("&:hover", {});
			});

			const instance = recipe({
				name: "button",
				base: {
					background: "blue",
					hover: {
						boxShadow: "lg",
					},
				},
				variants: {},
			});

			processRecipeUtilities(instance, root);

			// Should have created:
			// 1. background utility without modifier
			// 2. boxShadow utility without modifier (base)
			// 3. boxShadow utility with hover modifier
			const backgroundUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "background",
			);
			const boxShadowUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "boxShadow",
			);

			expect(backgroundUtilities).toHaveLength(1);
			expect(boxShadowUtilities).toHaveLength(2); // base + hover modified

			// Check that one has the hover modifier
			const hoverBoxShadow = boxShadowUtilities.find(
				(u) => u.type === "utility" && u.modifiers?.includes("hover"),
			);
			expect(hoverBoxShadow).toBeDefined();
		});

		test("should process compound modifiers like hover:focus", () => {
			utility("boxShadow", ({ value }) => ({ boxShadow: value }));
			modifier("hover", ({ selector }) => {
				selector("&:hover", {});
			});
			modifier("focus", ({ selector }) => {
				selector("&:focus", {});
			});

			const instance = recipe({
				name: "button",
				base: {
					"hover:focus": {
						boxShadow: "sm",
					},
				},
				variants: {},
			});

			processRecipeUtilities(instance, root);

			// Should create modified utilities with both hover and focus
			const boxShadowUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "boxShadow",
			);

			// Base utility + combinations with hover, focus, and hover+focus
			expect(boxShadowUtilities.length).toBeGreaterThanOrEqual(1);

			// Check that there's a utility with both modifiers
			const hoverFocusBoxShadow = boxShadowUtilities.find(
				(u) =>
					u.type === "utility" &&
					u.modifiers?.includes("hover") &&
					u.modifiers?.includes("focus"),
			);
			expect(hoverFocusBoxShadow).toBeDefined();
		});

		test("should process modifier blocks in variant declarations", () => {
			utility("background", ({ value }) => ({ background: value }));
			modifier("hover", ({ selector }) => {
				selector("&:hover", {});
			});

			const instance = recipe({
				name: "button",
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
			});

			processRecipeUtilities(instance, root);

			const backgroundUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "background",
			);

			// Should have created utilities for both values with hover modifier variants
			expect(backgroundUtilities.length).toBeGreaterThanOrEqual(2);

			// Check that there's a hover-modified background utility
			const hoverBackground = backgroundUtilities.find(
				(u) => u.type === "utility" && u.modifiers?.includes("hover"),
			);
			expect(hoverBackground).toBeDefined();
		});

		test("should process modifier blocks in compoundVariants", () => {
			utility("background", ({ value }) => ({ background: value }));
			modifier("hover", ({ selector }) => {
				selector("&:hover", {});
			});

			const instance = recipe({
				name: "button",
				variants: {
					color: {
						primary: {},
					},
					disabled: {
						false: {},
					},
				},
				compoundVariants: [
					{
						match: { color: "primary", disabled: "false" },
						css: {
							hover: {
								background: "primary-shade-50",
							},
						},
					},
				],
			});

			processRecipeUtilities(instance, root);

			const backgroundUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "background",
			);

			expect(backgroundUtilities.length).toBeGreaterThanOrEqual(1);

			const hoverBackground = backgroundUtilities.find(
				(u) => u.type === "utility" && u.modifiers?.includes("hover"),
			);
			expect(hoverBackground).toBeDefined();
		});

		test("should warn when modifier is not found in registry", () => {
			const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

			utility("boxShadow", ({ value }) => ({ boxShadow: value }));
			// Note: hover modifier is NOT registered

			const instance = recipe({
				name: "button",
				base: {
					hover: {
						boxShadow: "lg",
					},
				},
				variants: {},
			});

			processRecipeUtilities(instance, root);

			// Should warn about missing hover modifier
			expect(warnSpy).toHaveBeenCalledWith(
				'[styleframe] Modifier "hover" not found in registry. Skipping modifier for utility "boxShadow".',
			);

			// Should still create the base utility without modifier
			const boxShadowUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "boxShadow",
			);
			expect(boxShadowUtilities).toHaveLength(1);

			warnSpy.mockRestore();
		});

		test("should collect modifiers across multiple declarations", () => {
			utility("background", ({ value }) => ({ background: value }));
			utility("color", ({ value }) => ({ color: value }));
			modifier("hover", ({ selector }) => {
				selector("&:hover", {});
			});
			modifier("focus", ({ selector }) => {
				selector("&:focus", {});
			});

			const instance = recipe({
				name: "button",
				base: {
					background: "blue",
					hover: {
						background: "darkblue",
					},
					focus: {
						color: "white",
					},
				},
				variants: {},
			});

			processRecipeUtilities(instance, root);

			// background should have hover modifier
			const backgroundUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "background",
			);
			const hoverBackground = backgroundUtilities.find(
				(u) => u.type === "utility" && u.modifiers?.includes("hover"),
			);
			expect(hoverBackground).toBeDefined();

			// color should have focus modifier
			const colorUtilities = root.children.filter(
				(child) => child.type === "utility" && child.name === "color",
			);
			const focusColor = colorUtilities.find(
				(u) => u.type === "utility" && u.modifiers?.includes("focus"),
			);
			expect(focusColor).toBeDefined();
		});
	});
});
