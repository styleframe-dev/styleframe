import type { Container, Media, Root, Selector, Variable } from "../types";
import {
	createDeclarationsCallbackContext,
	parseDeclarationsBlock,
} from "./declarations";
import { createMediaFunction } from "./media";
import { createRoot } from "./root";
import { createSelectorFunction } from "./selector";
import { createVariableFunction } from "./variable";

describe("parseDeclarationsBlock", () => {
	let mockContext: any;

	beforeEach(() => {
		mockContext = {
			selector: vi.fn(),
			variable: vi.fn(),
			keyframes: vi.fn(),
			media: vi.fn(),
		};
	});

	describe("nested selector parsing", () => {
		it("should parse selectors starting with &", () => {
			const declarations = {
				color: "blue",
				"&:hover": { color: "red" },
				"&::before": { content: '""' },
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(mockContext.selector).toHaveBeenCalledTimes(2);
			expect(mockContext.selector).toHaveBeenCalledWith("&:hover", {
				color: "red",
			});
			expect(mockContext.selector).toHaveBeenCalledWith("&::before", {
				content: '""',
			});

			// Should remove nested selectors from original declarations
			expect(declarations).not.toHaveProperty("&:hover");
			expect(declarations).not.toHaveProperty("&::before");
			expect(declarations).toHaveProperty("color", "blue");
		});

		it("should parse selectors starting with .", () => {
			const declarations = {
				padding: "1rem",
				".child": { fontSize: "14px" },
				".another-child": { margin: "0.5rem" },
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(mockContext.selector).toHaveBeenCalledTimes(2);
			expect(mockContext.selector).toHaveBeenCalledWith(".child", {
				fontSize: "14px",
			});
			expect(mockContext.selector).toHaveBeenCalledWith(".another-child", {
				margin: "0.5rem",
			});
		});

		it("should parse selectors starting with :", () => {
			const declarations = {
				display: "block",
				":hover": { opacity: 0.8 },
				":focus": { outline: "2px solid blue" },
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(mockContext.selector).toHaveBeenCalledTimes(2);
			expect(mockContext.selector).toHaveBeenCalledWith(":hover", {
				opacity: 0.8,
			});
			expect(mockContext.selector).toHaveBeenCalledWith(":focus", {
				outline: "2px solid blue",
			});
		});

		it("should not parse regular CSS properties", () => {
			const declarations = {
				color: "blue",
				fontSize: "16px",
				marginTop: "1rem",
				backgroundColor: "#ffffff",
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(mockContext.selector).not.toHaveBeenCalled();
			// All properties should remain
			expect(Object.keys(declarations)).toHaveLength(4);
		});

		it("should handle mixed declarations", () => {
			const declarations = {
				padding: "1rem",
				color: "blue",
				"&:hover": { color: "red" },
				fontSize: "16px",
				".child": { margin: "0.5rem" },
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(mockContext.selector).toHaveBeenCalledTimes(2);

			// Regular properties should remain
			expect(declarations).toHaveProperty("padding", "1rem");
			expect(declarations).toHaveProperty("color", "blue");
			expect(declarations).toHaveProperty("fontSize", "16px");

			// Nested selectors should be removed
			expect(declarations).not.toHaveProperty("&:hover");
			expect(declarations).not.toHaveProperty(".child");
		});
	});

	describe("media query handling", () => {
		it("should handle media queries", () => {
			const declarations = {
				width: "100%",
				"@media (min-width: 768px)": {
					width: "50%",
				},
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(declarations).not.toHaveProperty("@media (min-width: 768px)");
			expect(mockContext.media).toHaveBeenCalledTimes(1);
			expect(mockContext.media).toHaveBeenCalledWith(
				"@media (min-width: 768px)",
				{ width: "50%" },
			);
		});
	});

	describe("edge cases", () => {
		it("should handle non-object nested values", () => {
			const declarations = {
				color: "blue",
				"&:hover": "not-an-object",
				".child": { fontSize: "14px" },
			};

			parseDeclarationsBlock(declarations, mockContext);

			// Should only process object values
			expect(mockContext.selector).toHaveBeenCalledTimes(1);
			expect(mockContext.selector).toHaveBeenCalledWith(".child", {
				fontSize: "14px",
			});

			// Non-object nested value should remain
			expect(declarations).toHaveProperty("&:hover", "not-an-object");
		});

		it("should handle empty nested objects", () => {
			const declarations = {
				color: "blue",
				"&:hover": {},
				".child": {},
			};

			parseDeclarationsBlock(declarations, mockContext);

			expect(mockContext.selector).toHaveBeenCalledTimes(2);
			expect(mockContext.selector).toHaveBeenCalledWith("&:hover", {});
			expect(mockContext.selector).toHaveBeenCalledWith(".child", {});
		});
	});
});

describe("createDeclarationsCallbackContext", () => {
	let root: Root;
	let selector: Selector;
	let media: Media;

	beforeEach(() => {
		root = createRoot();
		selector = {
			type: "selector",
			query: ".test",
			declarations: {},
			children: [],
		};
		media = {
			type: "media",
			query: "(min-width: 768px)",
			declarations: {},
			children: [],
		};
	});

	describe("basic context creation", () => {
		it("should create context with all required functions for root container", () => {
			const context = createDeclarationsCallbackContext(root, root);

			expect(context).toHaveProperty("variable");
			expect(context).toHaveProperty("selector");
			expect(context).toHaveProperty("media");
			expect(typeof context.variable).toBe("function");
			expect(typeof context.selector).toBe("function");
			expect(typeof context.media).toBe("function");
		});

		it("should create context with all required functions for selector container", () => {
			const context = createDeclarationsCallbackContext(selector, root);

			expect(context).toHaveProperty("variable");
			expect(context).toHaveProperty("selector");
			expect(context).toHaveProperty("media");
			expect(typeof context.variable).toBe("function");
			expect(typeof context.selector).toBe("function");
			expect(typeof context.media).toBe("function");
		});

		it("should create context with all required functions for media container", () => {
			const context = createDeclarationsCallbackContext(media, root);

			expect(context).toHaveProperty("variable");
			expect(context).toHaveProperty("selector");
			expect(context).toHaveProperty("media");
			expect(typeof context.variable).toBe("function");
			expect(typeof context.selector).toBe("function");
			expect(typeof context.media).toBe("function");
		});
	});

	describe("function creation with proper context", () => {
		it("should create variable function bound to correct parent and root", () => {
			const context = createDeclarationsCallbackContext(selector, root);

			const testVar = context.variable("test-var", "test-value");

			expect(testVar.name).toBe("test-var");
			expect(testVar.value).toBe("test-value");
			expect(selector.children).toContainEqual(testVar);
		});

		it("should create selector function bound to correct parent and root", () => {
			const context = createDeclarationsCallbackContext(root, root);

			const testSelector = context.selector(".test-selector", {
				color: "red",
			});

			expect(testSelector.query).toBe(".test-selector");
			expect(testSelector.declarations).toEqual({ color: "red" });
			expect(root.children).toContainEqual(testSelector);
		});

		it("should create media function bound to correct parent and root", () => {
			const context = createDeclarationsCallbackContext(root, root);

			const testMedia = context.media("(min-width: 768px)", {
				fontSize: "18px",
			});

			expect(testMedia.query).toBe("(min-width: 768px)");
			expect(testMedia.declarations).toEqual({ fontSize: "18px" });
			expect(root.children).toContainEqual(testMedia);
		});
	});

	describe("nested context functionality", () => {
		it("should support nested variable creation in selector context", () => {
			const context = createDeclarationsCallbackContext(selector, root);

			const nestedVar = context.variable("nested-var", "#006cff");

			expect(nestedVar.name).toBe("nested-var");
			expect(nestedVar.value).toBe("#006cff");
			expect(selector.children).toContainEqual(nestedVar);
		});

		it("should support nested selector creation in media context", () => {
			const context = createDeclarationsCallbackContext(media, root);

			const nestedSelector = context.selector(".nested", {
				padding: "1rem",
			});

			expect(nestedSelector.query).toBe(".nested");
			expect(nestedSelector.declarations).toEqual({ padding: "1rem" });
			expect(media.children).toContainEqual(nestedSelector);
		});

		it("should support nested media creation in selector context", () => {
			const context = createDeclarationsCallbackContext(selector, root);

			const nestedMedia = context.media("(hover: hover)", {
				opacity: "0.8",
			});

			expect(nestedMedia.query).toBe("(hover: hover)");
			expect(nestedMedia.declarations).toEqual({ opacity: "0.8" });
			expect(selector.children).toContainEqual(nestedMedia);
		});
	});

	describe("function independence", () => {
		it("should create independent function instances for different contexts", () => {
			const context1 = createDeclarationsCallbackContext(root, root);
			const context2 = createDeclarationsCallbackContext(selector, root);

			expect(context1.variable).not.toBe(context2.variable);
			expect(context1.selector).not.toBe(context2.selector);
			expect(context1.media).not.toBe(context2.media);
		});

		it("should create functions that operate on different parent containers", () => {
			const root1 = createRoot();
			const root2 = createRoot();

			const context1 = createDeclarationsCallbackContext(root1, root1);
			const context2 = createDeclarationsCallbackContext(root2, root2);

			context1.variable("var1", "value1");
			context2.variable("var2", "value2");

			expect(root1.children).toHaveLength(1);
			expect(root2.children).toHaveLength(1);
			expect(root1.children[0]).not.toEqual(root2.children[0]);
		});
	});

	describe("container type handling", () => {
		it("should work with all Container union types", () => {
			const containers: Container[] = [root, selector, media];

			containers.forEach((container) => {
				const context = createDeclarationsCallbackContext(container, root);

				expect(context).toHaveProperty("variable");
				expect(context).toHaveProperty("selector");
				expect(context).toHaveProperty("media");
			});
		});

		it("should maintain proper parent-child relationships for different container types", () => {
			const contexts = [
				{ parent: root, name: "root" },
				{ parent: selector, name: "selector" },
				{ parent: media, name: "media" },
			];

			contexts.forEach(({ parent, name }) => {
				const context = createDeclarationsCallbackContext(parent, root);
				const initialChildrenCount = parent.children.length;

				context.variable(`${name}-var`, "test");

				expect(parent.children).toHaveLength(initialChildrenCount + 1);

				const lastChild = parent.children[
					parent.children.length - 1
				] as Variable;
				expect(lastChild.type).toBe("variable");
			});
		});
	});

	describe("root parameter handling", () => {
		it("should pass root parameter correctly to all created functions", () => {
			const customRoot = createRoot();
			const context = createDeclarationsCallbackContext(selector, customRoot);

			// The functions should use the passed root, but this is primarily internal
			// We can verify they work correctly by checking the functions execute
			const testVar = context.variable("test", "value");
			const testSelector = context.selector(".test", {});
			const testMedia = context.media("(test)", {});

			expect(testVar).toBeDefined();
			expect(testSelector).toBeDefined();
			expect(testMedia).toBeDefined();
		});

		it("should handle when parent and root are the same", () => {
			const context = createDeclarationsCallbackContext(root, root);

			const testVar = context.variable("root-var", "value");

			expect(testVar.name).toBe("root-var");
			expect(root.children).toContainEqual(testVar);
		});

		it("should handle when parent and root are different", () => {
			const differentRoot = createRoot();
			const context = createDeclarationsCallbackContext(
				selector,
				differentRoot,
			);

			const testVar = context.variable("different-root-var", "value");

			expect(testVar.name).toBe("different-root-var");
			expect(selector.children).toContainEqual(testVar);
			expect(differentRoot.children).not.toContainEqual(testVar);
		});
	});

	describe("context object properties", () => {
		it("should return object with exactly four properties", () => {
			const context = createDeclarationsCallbackContext(root, root);
			const keys = Object.keys(context);

			expect(keys).toHaveLength(4);
			expect(keys).toContain("variable");
			expect(keys).toContain("selector");
			expect(keys).toContain("keyframes");
			expect(keys).toContain("media");
		});

		it("should not have enumerable prototype properties", () => {
			const context = createDeclarationsCallbackContext(root, root);

			expect(context.hasOwnProperty("variable")).toBe(true);
			expect(context.hasOwnProperty("selector")).toBe(true);
			expect(context.hasOwnProperty("keyframes")).toBe(true);
			expect(context.hasOwnProperty("media")).toBe(true);
		});

		it("should return functions with correct return types", () => {
			const context = createDeclarationsCallbackContext(root, root);

			const varResult = context.variable("test-var", "value");
			const selectorResult = context.selector(".test", {});
			const keyframesResult = context.keyframes("test-animation", {
				"0%": { opacity: 0 },
				"100%": { opacity: 1 },
			});
			const mediaResult = context.media("(test)", {});

			expect(varResult.type).toBe("variable");
			expect(selectorResult.type).toBe("selector");
			expect(keyframesResult.type).toBe("keyframes");
			expect(mediaResult.type).toBe("media");
		});
	});

	describe("real-world usage patterns", () => {
		it("should support chaining multiple function calls", () => {
			const context = createDeclarationsCallbackContext(root, root);

			const primaryColor = context.variable("primary-color", "#006cff");
			const button = context.selector(".button", {
				backgroundColor: primaryColor.value as string,
			});

			context.media("(min-width: 768px)", ({ selector }) => {
				selector(".button", {
					padding: "1rem 2rem",
				});
			});

			expect(root.children).toHaveLength(3); // variable + selector + media
		});

		it("should work in complex nested scenarios", () => {
			const context = createDeclarationsCallbackContext(root, root);

			context.selector(
				".component",
				{
					display: "block",
				},
				({ variable, media }) => {
					const componentSpacing = variable("component-spacing", "1rem");

					media("(min-width: 768px)", {
						padding: componentSpacing.value as string,
					});
				},
			);

			expect(root.children).toHaveLength(1); // main selector
			const mainSelector = root.children[0] as Selector;
			expect(mainSelector.children).toHaveLength(2); // variable + media
		});

		it("should support design system patterns", () => {
			const context = createDeclarationsCallbackContext(root, root);

			// Define tokens
			const spacing = context.variable("spacing-md", "1rem");
			const color = context.variable("color-primary", "#006cff");

			// Create component with responsive behavior
			context.selector(
				".card",
				{
					padding: spacing.value as string,
					borderColor: color.value as string,
				},
				({ media }) => {
					media("(min-width: 768px)", {
						padding: "1.5rem",
					});
				},
			);

			expect(root.children).toHaveLength(3); // 2 variables + 1 selector
		});
	});

	describe("error handling and edge cases", () => {
		it("should handle empty containers", () => {
			const emptySelector: Selector = {
				type: "selector",
				query: "",
				declarations: {},
				children: [],
			};

			const context = createDeclarationsCallbackContext(emptySelector, root);

			expect(() => context.variable("test", "value")).not.toThrow();
			expect(() => context.selector(".test", {})).not.toThrow();
			expect(() => context.media("(test)", {})).not.toThrow();
		});

		it("should handle containers with existing children", () => {
			const existingVar = {
				type: "variable" as const,
				name: "existing",
				value: "value",
			};

			selector.children.push(existingVar);
			const initialLength = selector.children.length;

			const context = createDeclarationsCallbackContext(selector, root);
			context.variable("new-var", "new-value");

			expect(selector.children).toHaveLength(initialLength + 1);
			expect(selector.children).toContain(existingVar);
		});
	});

	describe("type consistency", () => {
		it("should maintain type consistency across function calls", () => {
			const context = createDeclarationsCallbackContext(root, root);

			// All functions should work with the same interfaces they would individually
			const variableFunction = createVariableFunction(root, root);
			const selectorFunction = createSelectorFunction(root, root);
			const mediaFunction = createMediaFunction(root, root);

			// Context functions should behave identically
			const contextVar = context.variable("test1", "value1");
			const directVar = variableFunction("test2", "value2");

			expect(contextVar.type).toBe(directVar.type);
			expect(typeof contextVar.name).toBe(typeof directVar.name);
			expect(typeof contextVar.value).toBe(typeof directVar.value);
		});
	});
});
