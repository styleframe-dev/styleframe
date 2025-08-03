import type { Reference, Root, Selector, Variable } from "../types";
import { createRoot } from "./root";
import { createVariableFunction } from "./variable";

describe("createVariableFunction", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
	});

	describe("basic variable creation", () => {
		it("should create a new variable with correct properties", () => {
			const result = variable("primary-color", "#007bff");

			expect(result).toEqual({
				type: "variable",
				name: "primary-color",
				value: "#007bff",
			});
		});

		it("should add the variable to root declarations", () => {
			const result = variable("spacing", "1rem");

			expect(root.children).toHaveLength(1);
			expect(root.children[0]).toBe(result);
		});
	});

	describe("default behavior", () => {
		describe("when false", () => {
			it("should update existing variable value when default is false", () => {
				const first = variable("border-width", "1px", { default: true });
				const second = variable("border-width", "2px", { default: false });

				expect(second).toBe(first); // Same instance
				expect(second.value).toBe("2px"); // Updated value
				expect(root.children).toHaveLength(1);
			});

			it("should create new variable if none exists with default: false", () => {
				const result = variable("line-height", "1.5", { default: false });

				expect(result.value).toBe("1.5");
				expect(root.children).toHaveLength(1);
			});
		});

		describe("when true", () => {
			it("should return existing variable when default is true", () => {
				const first = variable("color", "red");
				const second = variable("color", "blue", { default: true }); // Should return first, not create new

				expect(second).toBe(first);
				expect(second.value).toBe("red");
				expect(root.children).toHaveLength(1);
			});

			it("should return existing variable with explicit default: true", () => {
				const first = variable("font-size", "16px", { default: true });
				const second = variable("font-size", "18px", { default: true });

				expect(second).toBe(first);
				expect(second.value).toBe("16px");
				expect(root.children).toHaveLength(1);
			});

			it("should create new variable if none exists with default: true", () => {
				const result = variable("margin", "10px", { default: true });

				expect(result.value).toBe("10px");
				expect(root.children).toHaveLength(1);
			});
		});
	});

	describe("multiple variables", () => {
		it("should handle multiple different variables", () => {
			const color = variable("color", "blue");
			const spacing = variable("spacing", "8px");
			const fontSize = variable("font-size", "14px");

			expect(root.children).toHaveLength(3);
			expect(root.children).toContain(color);
			expect(root.children).toContain(spacing);
			expect(root.children).toContain(fontSize);
		});

		it("should find correct existing variable among multiple", () => {
			const color = variable("color", "red");
			const spacing = variable("spacing", "10px");
			const fontSize = variable("font-size", "16px");

			// Try to override the middle variable
			const updatedSpacing = variable("spacing", "20px", { default: false });

			expect(updatedSpacing).toBe(spacing);
			expect(updatedSpacing.value).toBe("20px");
			expect(root.children).toHaveLength(3);
		});
	});

	describe("working with references", () => {
		it("should handle reference token values", () => {
			const reference: Reference = {
				type: "reference",
				name: "base-color",
				fallback: "#000000",
			};

			const result = variable("ref-color", reference);

			expect(result.value).toEqual(reference);
		});
	});

	describe("working with selectors", () => {
		it("should work when root is a selector", () => {
			const selectorInstance: Selector = {
				type: "selector",
				query: ".test",
				declarations: {},
				children: [],
			};

			const selectorVariable = createVariableFunction(selectorInstance, root);
			const result = selectorVariable("nested-var", "50px");

			expect(result.name).toBe("nested-var");
			expect(selectorInstance.children).toHaveLength(1);
			expect(selectorInstance.children[0]).toBe(result);
		});
	});

	describe("edge cases", () => {
		it("should handle empty string values", () => {
			const result = variable("empty", "");
			expect(result.value).toBe("");
		});

		it("should handle null values", () => {
			const result = variable("null-value", null);
			expect(result.value).toBe(null);
		});

		it("should handle undefined values", () => {
			const result = variable("undefined-value", undefined);
			expect(result.value).toBe(undefined);
		});

		it("should handle numeric values", () => {
			const result = variable("numeric", 42);
			expect(result.value).toBe(42);
		});

		it("should handle boolean values", () => {
			const result = variable("boolean", true);
			expect(result.value).toBe(true);
		});
	});

	describe("type safety", () => {
		it("should maintain type information for variable name", () => {
			const result = variable("test-var", "100px");

			// Type assertion to verify the generic type is preserved
			const typedResult: Variable<"test-var"> = result;
			expect(typedResult.name).toBe("test-var");
		});

		it("should preserve generic type parameter", () => {
			const result = variable("typed-var", "test-value");

			// This should compile without type errors
			const name: "typed-var" = result.name;
			expect(name).toBe("typed-var");
		});

		it("should work with different string literal types", () => {
			const colorVar = variable("color-primary", "#ff0000");
			const spacingVar = variable("spacing-lg", "2rem");

			expect(colorVar.name).toBe("color-primary");
			expect(spacingVar.name).toBe("spacing-lg");
		});
	});
});
