import type { Root, Selector } from "../types";
import { createCssFunction } from "./css";
import { createRefFunction } from "./ref";
import { createRoot } from "./root";
import { createVariableFunction } from "./variable";

describe("createCSSFunction", () => {
	let root: Root;
	let selector: Selector;
	let css: ReturnType<typeof createCssFunction>;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;

	beforeEach(() => {
		root = createRoot();
		selector = {
			type: "selector",
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		css = createCssFunction(selector, root);
		variable = createVariableFunction(selector, root);
		ref = createRefFunction(selector, root);
	});

	describe("basic CSS creation", () => {
		it("should create a CSS object with strings only", () => {
			const result = css`color: blue;`;

			expect(result).toEqual({
				type: "css",
				value: ["color: blue;"],
			});
		});

		it("should create a CSS object with empty template", () => {
			const result = css``;

			expect(result).toEqual({
				type: "css",
				value: [""],
			});
		});

		it("should handle multiline CSS", () => {
			const result = css`
				color: blue;
				background: red;
			`;

			expect(result).toEqual({
				type: "css",
				value: ["\n\t\t\t\tcolor: blue;\n\t\t\t\tbackground: red;\n\t\t\t"],
			});
		});
	});

	describe("interpolation handling", () => {
		it("should handle single string interpolation", () => {
			const color = "blue";
			const result = css`color: ${color};`;

			expect(result).toEqual({
				type: "css",
				value: ["color: ", "blue", ";"],
			});
		});

		it("should handle multiple string interpolations", () => {
			const color = "blue";
			const size = "16px";
			const result = css`color: ${color}; font-size: ${size};`;

			expect(result).toEqual({
				type: "css",
				value: ["color: ", "blue", "; font-size: ", "16px", ";"],
			});
		});

		it("should handle interpolation at the beginning", () => {
			const property = "color";
			const result = css`${property}: blue;`;

			expect(result).toEqual({
				type: "css",
				value: ["", "color", ": blue;"],
			});
		});

		it("should handle interpolation at the end", () => {
			const value = "blue";
			const result = css`color: ${value}`;

			expect(result).toEqual({
				type: "css",
				value: ["color: ", "blue", ""],
			});
		});

		it("should handle consecutive interpolations", () => {
			const value1 = "solid";
			const value2 = "1px";
			const result = css`border: ${value1} ${value2};`;

			expect(result).toEqual({
				type: "css",
				value: ["border: ", "solid", " ", "1px", ";"],
			});
		});
	});

	describe("variable reference interpolation", () => {
		it("should handle variable reference interpolation", () => {
			const colorPrimary = variable("color-primary", "#006cff");
			const result = css`color: ${ref(colorPrimary)};`;

			expect(result).toEqual({
				type: "css",
				value: [
					"color: ",
					{
						type: "reference",
						name: "color-primary",
						fallback: undefined,
					},
					";",
				],
			});
		});

		it("should handle multiple variable references", () => {
			const colorPrimary = variable("color-primary", "#006cff");
			const spacing = variable("spacing-md", "1rem");

			const result = css`
				color: ${ref(colorPrimary)};
				padding: ${ref(spacing)};
			`;

			expect(result.value).toEqual([
				"\n\t\t\t\tcolor: ",
				{
					type: "reference",
					name: "color-primary",
					fallback: undefined,
				},
				";\n\t\t\t\tpadding: ",
				{
					type: "reference",
					name: "spacing-md",
					fallback: undefined,
				},
				";\n\t\t\t",
			]);
		});

		it("should handle variable references with fallbacks", () => {
			const result = css`color: ${ref("undefined-color", "#fallback")};`;

			expect(result).toEqual({
				type: "css",
				value: [
					"color: ",
					{
						type: "reference",
						name: "undefined-color",
						fallback: "#fallback",
					},
					";",
				],
			});
		});
	});

	describe("mixed interpolation types", () => {
		it("should handle mixed string and reference interpolations", () => {
			const colorPrimary = variable("color-primary", "#006cff");
			const width = "100%";

			const result = css`
				color: ${ref(colorPrimary)};
				width: ${width};
			`;

			expect(result.value).toEqual([
				"\n\t\t\t\tcolor: ",
				{
					type: "reference",
					name: "color-primary",
					fallback: undefined,
				},
				";\n\t\t\t\twidth: ",
				"100%",
				";\n\t\t\t",
			]);
		});

		it("should handle complex mixed interpolations", () => {
			const primary = variable("primary", "#006cff");
			const secondary = "#ff5733";
			const opacity = "0.8";

			const result = css`
				background: linear-gradient(
					to right,
					${ref(primary)},
					${secondary}
				);
				opacity: ${opacity};
			`;

			expect(result.value).toHaveLength(7); // 4 strings + 3 interpolations
			expect(result.value[1]).toEqual({
				type: "reference",
				name: "primary",
				fallback: undefined,
			});
			expect(result.value[3]).toBe("#ff5733");
			expect(result.value[5]).toBe("0.8");
		});
	});

	describe("context parameter handling", () => {
		it("should work with root context", () => {
			const cssWithRootContext = createCssFunction(root, root);
			const result = cssWithRootContext`color: blue;`;

			expect(result).toEqual({
				type: "css",
				value: ["color: blue;"],
			});
		});

		it("should work with selector context", () => {
			const cssWithSelectorContext = createCssFunction(selector, root);
			const result = cssWithSelectorContext`background: red;`;

			expect(result).toEqual({
				type: "css",
				value: ["background: red;"],
			});
		});

		it("should work with nested selector context", () => {
			const nestedSelector: Selector = {
				type: "selector",
				query: "&:hover",
				variables: [],
				declarations: {},
				children: [],
			};

			const cssWithNestedContext = createCssFunction(nestedSelector, root);
			const result = cssWithNestedContext`opacity: 0.8;`;

			expect(result).toEqual({
				type: "css",
				value: ["opacity: 0.8;"],
			});
		});
	});

	describe("TokenValue types handling", () => {
		it("should handle number interpolations", () => {
			const fontSize = 16;
			const result = css`font-size: ${fontSize}px;`;

			expect(result).toEqual({
				type: "css",
				value: ["font-size: ", 16, "px;"],
			});
		});

		it("should handle boolean interpolations", () => {
			const isVisible = true;
			const result = css`display: ${isVisible ? "block" : "none"};`;

			expect(result).toEqual({
				type: "css",
				value: ["display: ", "block", ";"],
			});
		});

		it("should handle null and undefined interpolations", () => {
			const nullValue = null;
			const undefinedValue = undefined;

			const result1 = css`value: ${nullValue};`;
			const result2 = css`value: ${undefinedValue};`;

			expect(result1.value).toEqual(["value: ", null, ";"]);
			expect(result2.value).toEqual(["value: ", undefined, ";"]);
		});
	});
	describe("edge cases", () => {
		it("should maintain object identity for repeated calls", () => {
			const colorVar = variable("repeat-test", "#fff");

			const ref1 = ref(colorVar);
			const ref2 = ref(colorVar);

			// Should create new objects each time
			expect(ref1).not.toBe(ref2);
			// But should be equal in content
			expect(ref1).toEqual(ref2);
		});

		it("should handle null fallback values", () => {
			const result = ref("test-var", null as any);

			expect(result.fallback).toBeNull();
		});
	});

	describe("real-world usage patterns", () => {
		it("should support design token patterns", () => {
			const blue500 = variable("blue-500", "#3b82f6");
			const blue600 = variable("blue-600", "#2563eb");

			const colorPrimary = variable("color-primary", ref(blue500));
			const colorPrimaryHover = variable("color-primary-hover", ref(blue600));

			expect(colorPrimary.value).toEqual({
				type: "reference",
				name: "blue-500",
				fallback: undefined,
			});

			expect(colorPrimaryHover.value).toEqual({
				type: "reference",
				name: "blue-600",
				fallback: undefined,
			});
		});

		it("should work in CSS template literals", () => {
			const colorPrimary = variable("color-primary", "#006cff");
			const spacingMd = variable("spacing-md", "1rem");

			// Simulate usage in CSS templates
			const colorRef = ref(colorPrimary);
			const spacingRef = ref(spacingMd);
			const fallbackRef = ref("text-color", "#000");

			expect(colorRef).toEqual({
				type: "reference",
				name: "color-primary",
				fallback: undefined,
			});

			expect(spacingRef).toEqual({
				type: "reference",
				name: "spacing-md",
				fallback: undefined,
			});

			expect(fallbackRef).toEqual({
				type: "reference",
				name: "text-color",
				fallback: "#000",
			});
		});

		it("should support conditional references", () => {
			const isDark = false;
			const lightColor = variable("light-bg", "#ffffff");
			const darkColor = variable("dark-bg", "#000000");

			const bgColor = isDark ? ref(darkColor) : ref(lightColor);

			expect(bgColor).toEqual({
				type: "reference",
				name: "light-bg",
				fallback: undefined,
			});
		});
	});

	describe("function context independence", () => {
		it("should create independent functions for different contexts", () => {
			const context1 = createRoot();
			const context2: Selector = {
				type: "selector",
				query: ".test",
				variables: [],
				declarations: {},
				children: [],
			};

			const ref1 = createRefFunction(context1, root);
			const ref2 = createRefFunction(context2, root);

			const result1 = ref1("test-var-1");
			const result2 = ref2("test-var-2");

			expect(result1.name).toBe("test-var-1");
			expect(result2.name).toBe("test-var-2");

			expect(ref1).not.toBe(ref2);
		});
	});
});
