import type { Root, StyleframeOptions } from "@styleframe/core";
import {
	createRefFunction,
	createRoot,
	createVariableFunction,
} from "@styleframe/core";
import { createRefConsumer } from "./ref";
import { consumeCSS } from "./consume";

describe("createRefConsumer", () => {
	let root: Root;
	let ref: ReturnType<typeof createRefFunction>;
	let variable: ReturnType<typeof createVariableFunction>;

	const consumeRef = createRefConsumer(consumeCSS);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
	});

	it("should convert a simple reference to CSS var() syntax", () => {
		const colorRef = ref("color-primary");
		expect(consumeRef(colorRef, options)).toBe("var(--color-primary)");
	});

	it("should handle references created from variables", () => {
		const colorVar = variable("color-primary", "#0066ff");
		const colorRef = ref(colorVar);
		expect(consumeRef(colorRef, options)).toBe("var(--color-primary)");
	});

	it("should include fallback value when provided", () => {
		const sizeRef = ref("font-size", "16px");
		expect(consumeRef(sizeRef, options)).toBe("var(--font-size, 16px)");
	});

	it("should handle references with dashes in the name", () => {
		const spacingRef = ref("spacing--md");
		expect(consumeRef(spacingRef, options)).toBe("var(--spacing--md)");
	});

	it("should not modify variable names", () => {
		// Assuming the normalizeVariableName function is used internally
		// and converts camelCase to kebab-case
		const colorRef = ref("colorPrimary");
		expect(consumeRef(colorRef, options)).toBe("var(--colorPrimary)");
	});

	it("should handle complex fallback values", () => {
		const marginRef = ref("margin-x", "calc(2rem + 10px)");
		expect(consumeRef(marginRef, options)).toBe(
			"var(--margin-x, calc(2rem + 10px))",
		);
	});

	it("should respect prefix in options if provided", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				name: ({ name }) => `--sf-${name}`,
			},
		};
		const colorRef = ref("color-primary");
		expect(consumeRef(colorRef, prefixOptions)).toBe("var(--sf-color-primary)");
	});

	it("should handle references with empty fallback values", () => {
		const emptyRef = ref("empty-var", "");
		expect(consumeRef(emptyRef, options)).toBe("var(--empty-var)");
	});

	it("should handle references with undefined fallback", () => {
		const undefinedRef = ref("undefined-var", undefined);
		expect(consumeRef(undefinedRef, options)).toBe("var(--undefined-var)");
	});

	it("should handle references with null fallback value", () => {
		// @ts-expect-error Passing null for testing purposes
		const nullRef = ref("null-var", null);
		expect(consumeRef(nullRef, options)).toBe("var(--null-var)");
	});
});
