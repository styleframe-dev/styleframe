import { beforeEach, describe, expect, test } from "vitest";
import type { Root } from "../types";
import { createRecipeFunction } from "./recipe";
import { createRoot } from "./root";

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
