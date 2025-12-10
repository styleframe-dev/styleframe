import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Root } from "../types";
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

	test("should deduplicate values across the recipe", () => {
		utility("background", ({ value }) => ({ background: value }));

		const instance = recipe({
			name: "button",
			base: { background: "blue" },
			variants: {
				color: {
					primary: { background: "blue" }, // Same value as base
					secondary: { background: "gray" },
				},
			},
			compoundVariants: [
				{
					match: { color: "primary" },
					css: { background: "blue" }, // Same value again
				},
			],
		});

		processRecipeUtilities(instance, root);

		// Should only create 2 unique background utilities (blue and gray)
		const backgroundUtilities = root.children.filter(
			(child) => child.type === "utility" && child.name === "background",
		);
		expect(backgroundUtilities).toHaveLength(2);
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
});
