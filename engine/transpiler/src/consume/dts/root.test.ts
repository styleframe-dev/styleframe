import type { Root, StyleframeOptions } from "@styleframe/core";
import {
	createRecipeFunction,
	createRoot,
	createUtilityFunction,
} from "@styleframe/core";
import { consume } from "./consume";
import { createRootConsumer } from "./root";

describe("createRootConsumer (dts)", () => {
	let root: Root;
	let recipe: ReturnType<typeof createRecipeFunction>;
	let utility: ReturnType<typeof createUtilityFunction>;

	const consumeRoot = createRootConsumer(consume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		utility = createUtilityFunction(root, root);
		recipe = createRecipeFunction(root, root);
	});

	it("should emit all recipes when _usage.recipes is empty", () => {
		recipe({ name: "button", base: {}, variants: { size: { sm: {} } } });
		recipe({ name: "card", base: {}, variants: { size: { sm: {} } } });

		const result = consumeRoot(root, options);

		expect(result).toContain("ButtonProps");
		expect(result).toContain("export const button");
		expect(result).toContain("CardProps");
		expect(result).toContain("export const card");
	});

	it("should emit only recipes in _usage.recipes when set is non-empty", () => {
		recipe({ name: "button", base: {}, variants: { size: { sm: {} } } });
		recipe({ name: "card", base: {}, variants: { size: { sm: {} } } });

		root._usage.recipes.add("button");

		const result = consumeRoot(root, options);

		expect(result).toContain("ButtonProps");
		expect(result).toContain("export const button");
		expect(result).not.toContain("CardProps");
		expect(result).not.toContain("export const card");
	});

	it("should return module declaration with no recipe exports when all recipes are filtered", () => {
		recipe({ name: "button", base: {}, variants: { size: { sm: {} } } });

		root._usage.recipes.add("nonexistent");

		const result = consumeRoot(root, options);

		expect(result).toContain('declare module "virtual:styleframe"');
		expect(result).not.toContain("ButtonProps");
		expect(result).not.toContain("export const button");
	});
});
