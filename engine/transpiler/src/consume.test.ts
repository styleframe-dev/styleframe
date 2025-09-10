import type {
	DeclarationsBlock,
	Root,
	StyleframeOptions,
} from "@styleframe/core";
import {
	createCssFunction,
	createRefFunction,
	createRoot,
	createSelectorFunction,
	createThemeFunction,
	createVariableFunction,
	isSelector,
} from "@styleframe/core";
import {
	consumeContainer,
	consumeCSS,
	consumeDeclarations,
	consumePrimitive,
	consumeRef,
	consumeSelector,
	consumeTheme,
	consumeVariable,
} from "./consume";

const options: StyleframeOptions = {};

describe("consumePrimitive", () => {
	it("should return a string representation of a number", () => {
		expect(consumePrimitive(42, options)).toBe("42");
	});

	it("should return a string representation of a string", () => {
		expect(consumePrimitive("test", options)).toBe("test");
	});

	it("should return a string representation of a boolean", () => {
		expect(consumePrimitive(true, options)).toBe("true");
		expect(consumePrimitive(false, options)).toBe("false");
	});

	it("should return a string representation of zero", () => {
		expect(consumePrimitive(0, options)).toBe("0");
	});

	it("should return a string representation of an empty string", () => {
		expect(consumePrimitive("", options)).toBe("");
	});

	it("should return an empty string for null", () => {
		expect(consumePrimitive(null, options)).toBe("");
	});

	it("should return an empty string for undefined", () => {
		expect(consumePrimitive(undefined, options)).toBe("");
	});

	it("should convert objects to string representation", () => {
		const obj = { a: 1, b: 2 };
		expect(consumePrimitive(obj, options)).toBe("[object Object]");
	});

	it("should convert arrays to string representation", () => {
		const arr = [1, 2, 3];
		expect(consumePrimitive(arr, options)).toBe("1,2,3");
	});

	it("should handle special values like NaN and Infinity", () => {
		expect(consumePrimitive(NaN, options)).toBe("NaN");
		expect(consumePrimitive(Infinity, options)).toBe("Infinity");
	});
});

describe("consumeRef", () => {
	let root: Root;
	let ref: ReturnType<typeof createRefFunction>;
	let variable: ReturnType<typeof createVariableFunction>;

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
				prefix: "sf-",
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

describe("consumeCSS", () => {
	let root: Root;
	let css: ReturnType<typeof createCssFunction>;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;

	beforeEach(() => {
		root = createRoot();
		css = createCssFunction(root, root);
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
	});

	it("should process a simple CSS value", () => {
		const cssValue = css`16px`;
		expect(consumeCSS(cssValue, options)).toBe("16px");
	});

	it("should handle CSS values with variable references", () => {
		const spacingVar = variable("spacing-md", "1rem");
		const paddingValue = css`${ref(spacingVar)} calc(${ref(spacingVar)} * 2)`;

		expect(consumeCSS(paddingValue, options)).toBe(
			"var(--spacing-md) calc(var(--spacing-md) * 2)",
		);
	});

	it("should handle empty CSS values", () => {
		const emptyCss = css``;
		expect(consumeCSS(emptyCss, options)).toBe("");
	});

	it("should respect prefix in options if provided", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				prefix: "sf-",
			},
		};

		const colorVar = variable("color-primary", "#0066ff");
		const colorValue = css`${ref(colorVar)}`;

		expect(consumeCSS(colorValue, prefixOptions)).toBe(
			"var(--sf-color-primary)",
		);
	});

	it("should handle CSS values with numeric interpolations", () => {
		const zIndex = 100;
		const zIndexValue = css`${zIndex}`;

		expect(consumeCSS(zIndexValue, options)).toBe("100");
	});

	it("should handle CSS values with string interpolations", () => {
		const borderWidth = "2px";
		const borderStyle = "solid";
		const borderColor = "#000";
		const borderValue = css`${borderWidth} ${borderStyle} ${borderColor}`;

		expect(consumeCSS(borderValue, options)).toBe("2px solid #000");
	});

	it("should handle CSS values with array interpolations", () => {
		const gridAreas = ["header", "main", "footer"];
		const gridTemplateValue = css`"${gridAreas[0]}" "${gridAreas[1]}" "${gridAreas[2]}"`;

		expect(consumeCSS(gridTemplateValue, options)).toBe(
			'"header" "main" "footer"',
		);
	});

	it("should handle complex CSS values with multiple variable references", () => {
		const fontSize = variable("font-size-base", "16px");
		const lineHeight = variable("line-height-normal", "1.5");
		const fontFamily = variable("font-family-sans", "system-ui, sans-serif");

		const fontValue = css`${ref(fontSize)}/${ref(lineHeight)} ${ref(fontFamily)}`;

		expect(consumeCSS(fontValue, options)).toBe(
			"var(--font-size-base)/var(--line-height-normal) var(--font-family-sans)",
		);
	});

	it("should handle CSS values with calculations", () => {
		const spacing = variable("spacing", "8px");
		const calcValue = css`calc(100% - ${ref(spacing)} * 2)`;

		expect(consumeCSS(calcValue, options)).toBe(
			"calc(100% - var(--spacing) * 2)",
		);
	});

	it("should handle CSS values with color functions", () => {
		const primaryColor = variable("color-primary", "#006cff");
		const colorValue = css`rgba(${ref(primaryColor)}, 0.5)`;

		expect(consumeCSS(colorValue, options)).toBe(
			"rgba(var(--color-primary), 0.5)",
		);
	});

	it("should handle CSS values with gradient functions", () => {
		const primaryColor = variable("color-primary", "#006cff");
		const secondaryColor = variable("color-secondary", "#ff6b6b");

		const gradientValue = css`linear-gradient(135deg, ${ref(primaryColor)} 0%, ${ref(secondaryColor)} 100%)`;

		expect(consumeCSS(gradientValue, options)).toBe(
			"linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)",
		);
	});

	it("should handle CSS values with conditional interpolations", () => {
		const isLarge = true;
		const conditionalValue = css`${isLarge ? "2rem" : "1rem"}`;

		expect(consumeCSS(conditionalValue, options)).toBe("2rem");
	});

	it("should handle CSS values with fallback references", () => {
		const spacingValue = css`${ref("custom-spacing", "16px")}`;

		expect(consumeCSS(spacingValue, options)).toBe(
			"var(--custom-spacing, 16px)",
		);
	});

	it("should handle complex CSS values with multiple expressions", () => {
		const primary = variable("color-primary", "#006cff");
		const secondary = variable("color-secondary", "#ff6b6b");
		const spacing = variable("spacing", "8px");

		const complexValue = css`
			${ref(spacing)} solid ${ref(primary)},
			calc(${ref(spacing)} * 2) dashed ${ref(secondary)}
		`;

		// The function might normalize whitespace
		const result = consumeCSS(complexValue, options);
		expect(result).toContain("var(--spacing) solid var(--color-primary)");
		expect(result).toContain(
			"calc(var(--spacing) * 2) dashed var(--color-secondary)",
		);
	});

	it("should handle CSS values with nested expressions", () => {
		const baseSize = variable("size-base", "16px");
		const multiplier = 1.5;

		const nestedValue = css`calc(${ref(baseSize)} * ${multiplier})`;

		expect(consumeCSS(nestedValue, options)).toBe(
			"calc(var(--size-base) * 1.5)",
		);
	});
});

describe("consumeVariable", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
	});

	it("should convert a basic variable to CSS variable declaration", () => {
		const colorVar = variable("color-primary", "#006cff");
		const result = consumeVariable(colorVar, options);

		expect(result).toBe("--color-primary: #006cff;");
	});

	it("should handle variable with dashed names", () => {
		const spacingVar = variable("spacing--md", "1rem");
		const result = consumeVariable(spacingVar, options);

		expect(result).toBe("--spacing--md: 1rem;");
	});

	it("should convert variable with numeric value", () => {
		const zIndexVar = variable("z-index-header", 100);
		const result = consumeVariable(zIndexVar, options);

		expect(result).toBe("--z-index-header: 100;");
	});

	it("should handle variable with empty string value", () => {
		const emptyVar = variable("empty-var", "");
		const result = consumeVariable(emptyVar, options);

		expect(result).toBe("--empty-var: ;");
	});

	it("should respect prefix in options if provided", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				prefix: "sf-",
			},
		};

		const colorVar = variable("color-primary", "#006cff");
		const result = consumeVariable(colorVar, prefixOptions);

		expect(result).toBe("--sf-color-primary: #006cff;");
	});

	it("should handle variable with complex values like calc expressions", () => {
		const calcVar = variable("sidebar-width", "calc(100% - 200px)");
		const result = consumeVariable(calcVar, options);

		expect(result).toBe("--sidebar-width: calc(100% - 200px);");
	});

	it("should handle variable referencing another variable", () => {
		// Create a base variable
		const baseColorVar = variable("color-base", "#006cff");

		// Create a reference to the base variable
		const baseColorRef = ref(baseColorVar);

		// Create a variable that uses the reference
		const colorPrimaryVar = variable("color-primary", baseColorRef);

		const result = consumeVariable(colorPrimaryVar, options);

		expect(result).toBe("--color-primary: var(--color-base);");
	});

	it("should handle variable with string reference", () => {
		// Create a reference using a string name
		const colorRef = ref("color-base");

		// Create a variable that uses the reference
		const colorPrimaryVar = variable("color-primary", colorRef);

		const result = consumeVariable(colorPrimaryVar, options);

		expect(result).toBe("--color-primary: var(--color-base);");
	});

	it("should handle variable with reference that has fallback", () => {
		// Create a reference with fallback value
		const fontSizeRef = ref("font-size", "16px");

		// Create a variable that uses the reference with fallback
		const bodyFontVar = variable("body-font-size", fontSizeRef);

		const result = consumeVariable(bodyFontVar, options);

		expect(result).toBe("--body-font-size: var(--font-size, 16px);");
	});

	it("should handle variable with null value", () => {
		const nullVar = variable("null-var", null);
		const result = consumeVariable(nullVar, options);

		expect(result).toBe("--null-var: ;");
	});

	it("should handle variable with undefined value", () => {
		const undefinedVar = variable("undefined-var", undefined);
		const result = consumeVariable(undefinedVar, options);

		expect(result).toBe("--undefined-var: ;");
	});

	it("should handle variable with boolean value", () => {
		const boolVar = variable("feature-enabled", true);
		const result = consumeVariable(boolVar, options);

		expect(result).toBe("--feature-enabled: true;");
	});

	it("should handle variable with array value", () => {
		const arrayVar = variable("font-stack", [
			"Helvetica",
			"Arial",
			"sans-serif",
		]);
		const result = consumeVariable(arrayVar, options);

		expect(result).toBe("--font-stack: Helvetica,Arial,sans-serif;");
	});

	it("should handle variable with complex CSS values", () => {
		const shadowVar = variable(
			"box-shadow",
			"0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05)",
		);
		const result = consumeVariable(shadowVar, options);

		expect(result).toBe(
			"--box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 8px rgba(0, 0, 0, 0.05);",
		);
	});

	it("should handle chained variable references", () => {
		// Create a base color variable
		const baseColorVar = variable("color-base", "#006cff");

		// Create an intermediate variable that references the base
		const primaryColorVar = variable("color-primary", ref(baseColorVar));

		// Create a final variable that references the intermediate one
		const buttonColorVar = variable("button-color", ref(primaryColorVar));

		const result = consumeVariable(buttonColorVar, options);

		expect(result).toBe("--button-color: var(--color-primary);");
	});

	it("should handle variable with object value by converting to string", () => {
		// @ts-expect-error - Ignoring type to test object handling
		const objVar = variable("object-var", { key: "value" });
		const result = consumeVariable(objVar, options);

		// Object should be converted to string
		expect(result).toBe("--object-var: [object Object];");
	});

	it("should apply variable prefix consistently when referencing other variables", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				prefix: "sf-",
			},
		};

		// Create a base color variable
		const baseColorVar = variable("color-base", "#006cff");

		// Create a variable that references the base
		const primaryColorVar = variable("color-primary", ref(baseColorVar));

		const result = consumeVariable(primaryColorVar, prefixOptions);

		// Both the variable name and the referenced variable should have the prefix
		expect(result).toBe("--sf-color-primary: var(--sf-color-base);");
	});
});

describe("consumeDeclarations", () => {
	let root: ReturnType<typeof createRoot>;
	let ref: ReturnType<typeof createRefFunction>;
	let variable: ReturnType<typeof createVariableFunction>;
	let css: ReturnType<typeof createCssFunction>;

	beforeEach(() => {
		root = createRoot();
		ref = createRefFunction(root, root);
		variable = createVariableFunction(root, root);
		css = createCssFunction(root, root);
	});

	it("should convert a simple declarations block to CSS declarations", () => {
		const declarations: DeclarationsBlock = {
			color: "#ff0000",
			fontSize: "16px",
			margin: "10px",
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"color: #ff0000;",
			"fontSize: 16px;",
			"margin: 10px;",
		]);
	});

	it("should handle empty declarations block", () => {
		const declarations: DeclarationsBlock = {};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([]);
	});

	it("should handle declarations with variable references", () => {
		const colorVar = variable("color-primary", "#006cff");
		const fontSizeVar = variable("font-size", "16px");

		const declarations: DeclarationsBlock = {
			color: ref(colorVar),
			fontSize: ref(fontSizeVar),
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"color: var(--color-primary);",
			"fontSize: var(--font-size);",
		]);
	});

	it("should handle declarations with string references", () => {
		const declarations: DeclarationsBlock = {
			color: ref("color-primary"),
			fontSize: ref("font-size"),
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"color: var(--color-primary);",
			"fontSize: var(--font-size);",
		]);
	});

	it("should handle declarations with references that have fallbacks", () => {
		const declarations: DeclarationsBlock = {
			color: ref("color-primary", "#006cff"),
			fontSize: ref("font-size", "16px"),
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"color: var(--color-primary, #006cff);",
			"fontSize: var(--font-size, 16px);",
		]);
	});

	it("should handle declarations with CSS values", () => {
		const declarations: DeclarationsBlock = {
			boxShadow: css`0 2px 4px rgba(0, 0, 0, 0.1)`,
			transform: css`translate(10px, 20px)`,
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"boxShadow: 0 2px 4px rgba(0, 0, 0, 0.1);",
			"transform: translate(10px, 20px);",
		]);
	});

	it("should handle declarations with complex CSS values that include references", () => {
		const spacingVar = variable("spacing", "8px");

		const declarations: DeclarationsBlock = {
			padding: css`${ref(spacingVar)} calc(${ref(spacingVar)} * 2)`,
			margin: css`${ref("margin", "10px")} auto`,
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"padding: var(--spacing) calc(var(--spacing) * 2);",
			"margin: var(--margin, 10px) auto;",
		]);
	});

	it("should handle declarations with null or undefined values", () => {
		const declarations: DeclarationsBlock = {
			color: null,
			fontSize: undefined,
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual(["color: ;", "fontSize: ;"]);
	});

	it("should handle declarations with numeric values", () => {
		const declarations: DeclarationsBlock = {
			zIndex: 100,
			opacity: 0.5,
			flex: 1,
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual(["zIndex: 100;", "opacity: 0.5;", "flex: 1;"]);
	});

	it("should respect variable prefix in options if provided", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				prefix: "sf-",
			},
		};

		const colorVar = variable("color-primary", "#006cff");

		const declarations: DeclarationsBlock = {
			color: ref(colorVar),
			backgroundColor: ref("color-secondary"),
		};

		const result = consumeDeclarations(declarations, prefixOptions);

		expect(result).toEqual([
			"color: var(--sf-color-primary);",
			"backgroundColor: var(--sf-color-secondary);",
		]);
	});

	it("should handle declarations with boolean values", () => {
		const declarations: DeclarationsBlock = {
			// These would be converted to strings in CSS
			visible: true,
			disabled: false,
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual(["visible: true;", "disabled: false;"]);
	});

	it("should handle declarations with array values", () => {
		const declarations: DeclarationsBlock = {
			fontFamily: ["Helvetica", "Arial", "sans-serif"],
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual(["fontFamily: Helvetica,Arial,sans-serif;"]);
	});

	it("should handle custom property names", () => {
		const declarations: DeclarationsBlock = {
			"--custom-property": "value",
			"--another-custom": 42,
		};

		const result = consumeDeclarations(declarations, options);

		expect(result).toEqual([
			"--custom-property: value;",
			"--another-custom: 42;",
		]);
	});
});

describe("consumeSelector", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;
	let selector: ReturnType<typeof createSelectorFunction>;
	let css: ReturnType<typeof createCssFunction>;

	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
		selector = createSelectorFunction(root, root);
		css = createCssFunction(root, root);
	});

	it("should create a basic selector with declarations", () => {
		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
			backgroundColor: "#006cff",
			color: "white",
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;
	color: white;
}`);
	});

	it("should create a selector with variables", () => {
		const buttonSelector = selector(".button", ({ variable }) => {
			variable("button-color", "#006cff");

			return {
				padding: "0.5rem 1rem",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;

	padding: 0.5rem 1rem;
}`);
	});

	it("should create a selector with child selectors", () => {
		const buttonSelector = selector(".button", ({ selector }) => {
			selector("&:hover", {
				backgroundColor: "#0056cc",
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;

	&:hover {
		backgroundColor: #0056cc;
	}
}`);
	});

	it("should create a selector with variables, declarations and children", () => {
		const buttonSelector = selector(".button", ({ variable, selector }) => {
			const colorVar = variable("button-color", "#006cff");
			const hoverVar = variable("button-hover-color", "#0056cc");

			selector("&:hover", {
				backgroundColor: ref(hoverVar),
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: ref(colorVar),
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;
	--button-hover-color: #0056cc;

	padding: 0.5rem 1rem;
	backgroundColor: var(--button-color);

	&:hover {
		backgroundColor: var(--button-hover-color);
	}
}`);
	});

	it("should handle empty declarations", () => {
		const buttonSelector = selector(".button", ({ selector }) => {
			selector("&:hover", {
				backgroundColor: "#0056cc",
			});
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	&:hover {
		backgroundColor: #0056cc;
	}
}`);
	});

	it("should handle empty variables", () => {
		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
}`);
	});

	it("should handle empty children", () => {
		const buttonSelector = selector(".button", ({ variable }) => {
			variable("button-color", "#006cff");

			return {
				padding: "0.5rem 1rem",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;

	padding: 0.5rem 1rem;
}`);
	});

	it("should handle completely empty selector", () => {
		const emptySelector = selector(".empty", {});

		const result = consumeSelector(emptySelector, options);

		expect(result).toBe(`.empty {}`);
	});

	it("should respect custom indentation in options", () => {
		const customOptions: StyleframeOptions = {
			indent: "    ", // 4 spaces instead of default 2
		};

		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
			backgroundColor: "#006cff",
		});

		const result = consumeSelector(buttonSelector, customOptions);

		expect(result).toBe(`.button {
    padding: 0.5rem 1rem;
    backgroundColor: #006cff;
}`);
	});

	it("should handle nested children multiple levels deep", () => {
		const buttonSelector = selector(".button", ({ selector }) => {
			selector("&:hover", ({ selector }) => {
				selector("&:active", {
					transform: "scale(0.98)",
				});

				return {
					backgroundColor: "#0056cc",
				};
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;

	&:hover {
		backgroundColor: #0056cc;
\t
		&:active {
			transform: scale(0.98);
		}
	}
}`);
	});

	it("should handle complex nested selector structures", () => {
		const buttonSelector = selector(".button", ({ selector, variable }) => {
			const colorVar = variable("button-color", "#006cff");

			selector("&:hover", ({ selector }) => {
				selector("&:active", {
					transform: "scale(0.98)",
				});

				return {
					backgroundColor: "#0056cc",
				};
			});

			selector("& > .icon", {
				marginRight: "0.5rem",
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: ref(colorVar),
				display: "flex",
				alignItems: "center",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;

	padding: 0.5rem 1rem;
	backgroundColor: var(--button-color);
	display: flex;
	alignItems: center;

	&:hover {
		backgroundColor: #0056cc;
\t
		&:active {
			transform: scale(0.98);
		}
	}

	& > .icon {
		marginRight: 0.5rem;
	}
}`);
	});

	it("should handle selectors with inline nesting syntax", () => {
		const cardSelector = selector(".card", {
			padding: "1rem",
			borderRadius: "8px",

			// Inline nested selectors
			".card-title": {
				fontSize: "1.5rem",
				fontWeight: "bold",
			},

			".card-content": {
				marginTop: "0.5rem",
			},
		});

		// Extract the created nested selectors
		const nestedSelectors = cardSelector.children.filter((child) =>
			isSelector(child),
		);

		// Confirm we have the expected nested selectors
		expect(nestedSelectors.length).toBe(2);

		const result = consumeSelector(cardSelector, options);

		expect(result).toBe(`.card {
	padding: 1rem;
	borderRadius: 8px;

	.card-title {
		fontSize: 1.5rem;
		fontWeight: bold;
	}

	.card-content {
		marginTop: 0.5rem;
	}
}`);
	});

	it("should handle selectors with pseudo-classes", () => {
		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
			backgroundColor: "#006cff",
			color: "white",
			transition: "background-color 0.2s",

			"&:hover": {
				backgroundColor: "#0056cc",
			},

			"&:active": {
				backgroundColor: "#004099",
			},

			"&::before": {
				content: '""',
				display: "inline-block",
				marginRight: "0.5rem",
			},
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;
	color: white;
	transition: background-color 0.2s;

	&:hover {
		backgroundColor: #0056cc;
	}

	&:active {
		backgroundColor: #004099;
	}

	&::before {
		content: "";
		display: inline-block;
		marginRight: 0.5rem;
	}
}`);
	});

	it("should handle selectors with variable references for consistent theming", () => {
		const buttonSelector = selector(".button", ({ variable }) => {
			const borderRadiusSm = variable("border-radius-sm", "4px");
			const colorPrimary = variable("color-primary", "#006cff");
			const colorPrimaryDark = variable("color-primary-dark", "#0056cc");
			const spacingMd = variable("spacing-md", "1rem");

			return {
				backgroundColor: ref(colorPrimary),
				borderRadius: ref(borderRadiusSm),
				color: "white",
				padding: ref(spacingMd),

				"&:hover": {
					backgroundColor: ref(colorPrimaryDark),
				},
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--border-radius-sm: 4px;
	--color-primary: #006cff;
	--color-primary-dark: #0056cc;
	--spacing-md: 1rem;

	backgroundColor: var(--color-primary);
	borderRadius: var(--border-radius-sm);
	color: white;
	padding: var(--spacing-md);

	&:hover {
		backgroundColor: var(--color-primary-dark);
	}
}`);
	});

	it("should handle selectors with media query nesting", () => {
		const cardSelector = selector(".card", {
			width: "100%",
			padding: "1rem",

			"@media (min-width: 768px)": {
				width: "50%",
				padding: "2rem",
			},
		});

		const result = consumeSelector(cardSelector, options);

		expect(result).toBe(`.card {
	width: 100%;
	padding: 1rem;

	@media (min-width: 768px) {
		width: 50%;
		padding: 2rem;
	}
}`);
	});

	it("should handle selectors with calc() expressions", () => {
		const spacingBase = variable("spacing-base", "8px");

		const containerSelector = selector(".container", {
			padding: "calc(2 * 1rem)",
			margin: css`calc(${ref(spacingBase)} * 2)`,
			width: "calc(100% - 2rem)",
		});

		const result = consumeSelector(containerSelector, options);

		expect(result).toBe(`.container {
	padding: calc(2 * 1rem);
	margin: calc(var(--spacing-base) * 2);
	width: calc(100% - 2rem);
}`);
	});
});

describe("consumeContainer", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;
	let selector: ReturnType<typeof createSelectorFunction>;

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
		selector = createSelectorFunction(root, root);
	});

	it("should handle empty container with only query", () => {
		const result = consumeContainer(
			".test",
			{
				variables: [],
				declarations: {},
				children: [],
			},
			options,
		);
		expect(result).toBe(".test {}");
	});

	it("should handle container with only variables", () => {
		const colorVar = variable("color", "#ff0000");
		const result = consumeContainer(
			".test",
			{
				variables: [colorVar],
				declarations: {},
				children: [],
			},
			options,
		);
		expect(result).toBe(".test {\n\t--color: #ff0000;\n}");
	});

	it("should handle container with only declarations", () => {
		const declarations: DeclarationsBlock = {
			color: "red",
			"font-size": "16px",
		};
		const result = consumeContainer(
			".test",
			{
				variables: [],
				declarations,
				children: [],
			},
			options,
		);
		expect(result).toBe(".test {\n\tcolor: red;\n\tfont-size: 16px;\n}");
	});

	it("should handle container with only children", () => {
		const childSelector = selector("&:hover", {
			color: "blue",
		});
		const result = consumeContainer(
			".test",
			{
				variables: [],
				declarations: {},
				children: [childSelector],
			},
			options,
		);
		expect(result).toBe(".test {\n\t&:hover {\n\t\tcolor: blue;\n\t}\n}");
	});

	it("should handle container with variables and declarations", () => {
		const colorVar = variable("primary", "#0066ff");
		const declarations: DeclarationsBlock = {
			color: ref(colorVar),
		};
		const result = consumeContainer(
			".button",
			{
				variables: [colorVar],
				declarations,
				children: [],
			},
			options,
		);
		expect(result).toBe(
			".button {\n\t--primary: #0066ff;\n\n\tcolor: var(--primary);\n}",
		);
	});

	it("should handle container with variables and children", () => {
		const colorVar = variable("hover-color", "#ff6b6b");
		const childSelector = selector("&:hover", {
			color: ref(colorVar),
		});
		const result = consumeContainer(
			".card",
			{
				variables: [colorVar],
				declarations: {},
				children: [childSelector],
			},
			options,
		);
		expect(result).toBe(
			".card {\n\t--hover-color: #ff6b6b;\n\n\t&:hover {\n\t\tcolor: var(--hover-color);\n\t}\n}",
		);
	});

	it("should handle container with declarations and children", () => {
		const declarations: DeclarationsBlock = {
			display: "flex",
			"align-items": "center",
		};
		const childSelector = selector("&:focus", {
			outline: "2px solid blue",
		});
		const result = consumeContainer(
			".component",
			{
				variables: [],
				declarations,
				children: [childSelector],
			},
			options,
		);
		expect(result).toBe(
			".component {\n\tdisplay: flex;\n\talign-items: center;\n\n\t&:focus {\n\t\toutline: 2px solid blue;\n\t}\n}",
		);
	});

	it("should handle container with variables, declarations, and children", () => {
		const sizeVar = variable("size", "1rem");
		const colorVar = variable("text-color", "#333");
		const declarations: DeclarationsBlock = {
			"font-size": ref(sizeVar),
			color: ref(colorVar),
		};
		const hoverSelector = selector("&:hover", {
			transform: "scale(1.05)",
		});
		const focusSelector = selector("&:focus", {
			outline: "2px solid currentColor",
		});

		const result = consumeContainer(
			".interactive",
			{
				variables: [sizeVar, colorVar],
				declarations,
				children: [hoverSelector, focusSelector],
			},
			options,
		);

		const expected =
			".interactive {\n\t--size: 1rem;\n\t--text-color: #333;\n\n\tfont-size: var(--size);\n\tcolor: var(--text-color);\n\n\t&:hover {\n\t\ttransform: scale(1.05);\n\t}\n\n\t&:focus {\n\t\toutline: 2px solid currentColor;\n\t}\n}";
		expect(result).toBe(expected);
	});

	it("should handle multiple variables of same type", () => {
		const primaryVar = variable("primary", "#0066ff");
		const secondaryVar = variable("secondary", "#ff6b6b");
		const accentVar = variable("accent", "#00cc66");

		const result = consumeContainer(
			".theme",
			{
				variables: [primaryVar, secondaryVar, accentVar],
				declarations: {},
				children: [],
			},
			options,
		);

		expect(result).toBe(
			".theme {\n\t--primary: #0066ff;\n\t--secondary: #ff6b6b;\n\t--accent: #00cc66;\n}",
		);
	});

	it("should handle multiple children selectors", () => {
		const child1 = selector("& > .item", {
			margin: "0.5rem",
		});
		const child2 = selector("& .nested", {
			padding: "1rem",
		});
		const child3 = selector("&::before", {
			content: '""',
			position: "absolute",
		});

		const result = consumeContainer(
			".container",
			{
				variables: [],
				declarations: {},
				children: [child1, child2, child3],
			},
			options,
		);

		const expected =
			'.container {\n\t& > .item {\n\t\tmargin: 0.5rem;\n\t}\n\n\t& .nested {\n\t\tpadding: 1rem;\n\t}\n\n\t&::before {\n\t\tcontent: "";\n\t\tposition: absolute;\n\t}\n}';
		expect(result).toBe(expected);
	});

	it("should handle complex query strings", () => {
		const result = consumeContainer(
			"@media (min-width: 768px) and (max-width: 1024px)",
			{
				variables: [],
				declarations: { display: "grid" },
				children: [],
			},
			options,
		);
		expect(result).toBe(
			"@media (min-width: 768px) and (max-width: 1024px) {\n\tdisplay: grid;\n}",
		);
	});

	it("should handle nested container structures", () => {
		const parentChild = selector("& .parent", ({ selector }) => {
			const nestedChild = selector("& .deeply-nested", {
				"font-weight": "bold",
			});

			return {
				position: "relative",
			};
		});

		const result = consumeContainer(
			".root",
			{
				variables: [],
				declarations: {},
				children: [parentChild],
			},
			options,
		);

		const expected =
			".root {\n\t& .parent {\n\t\tposition: relative;\n\t\n\t\t& .deeply-nested {\n\t\t\tfont-weight: bold;\n\t\t}\n\t}\n}";
		expect(result).toBe(expected);
	});

	it("should handle container with custom options prefix", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				prefix: "sf-",
			},
		};
		const colorVar = variable("primary", "#0066ff");
		const declarations: DeclarationsBlock = {
			color: ref(colorVar),
		};

		const result = consumeContainer(
			".component",
			{
				variables: [colorVar],
				declarations,
				children: [],
			},
			prefixOptions,
		);

		expect(result).toBe(
			".component {\n\t--sf-primary: #0066ff;\n\n\tcolor: var(--sf-primary);\n}",
		);
	});

	it("should handle container with custom indentation", () => {
		const customIndentOptions: StyleframeOptions = {
			indent: "    ", // 4 spaces instead of default 2
		};
		const colorVar = variable("color", "red");

		const result = consumeContainer(
			".test",
			{
				variables: [colorVar],
				declarations: { display: "block" },
				children: [],
			},
			customIndentOptions,
		);

		expect(result).toBe(".test {\n    --color: red;\n\n    display: block;\n}");
	});

	it("should handle variables with complex values", () => {
		const gradientVar = variable(
			"gradient",
			"linear-gradient(45deg, #ff0000, #0000ff)",
		);
		const shadowVar = variable(
			"shadow",
			"0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)",
		);

		const result = consumeContainer(
			".complex",
			{
				variables: [gradientVar, shadowVar],
				declarations: {},
				children: [],
			},
			options,
		);

		const expected =
			".complex {\n\t--gradient: linear-gradient(45deg, #ff0000, #0000ff);\n\t--shadow: 0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1);\n}";
		expect(result).toBe(expected);
	});

	it("should handle declarations with reference values", () => {
		const sizeVar = variable("base-size", "16px");
		const declarations: DeclarationsBlock = {
			"font-size": ref(sizeVar),
			"line-height": ref("line-height-normal", "1.5"),
			padding: ref("spacing", "1rem"),
		};

		const result = consumeContainer(
			".text",
			{
				variables: [sizeVar],
				declarations,
				children: [],
			},
			options,
		);

		const expected =
			".text {\n\t--base-size: 16px;\n\n\tfont-size: var(--base-size);\n\tline-height: var(--line-height-normal, 1.5);\n\tpadding: var(--spacing, 1rem);\n}";
		expect(result).toBe(expected);
	});
});

describe("consumeTheme", () => {
	let root: Root;
	let theme: ReturnType<typeof createThemeFunction>;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;
	let css: ReturnType<typeof createCssFunction>;

	beforeEach(() => {
		root = createRoot();
		theme = createThemeFunction(root, root);
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
		css = createCssFunction(root, root);
	});

	it("should convert a basic theme to CSS with default selector format", () => {
		const lightTheme = theme("light", ({ variable: v }) => {
			v("color-primary", "#0066ff");
		});

		expect(consumeTheme(lightTheme, options)).toBe(
			'[data-theme="light"] {\n\t--color-primary: #0066ff;\n}',
		);
	});

	it("should handle themes with multiple variables", () => {
		const darkTheme = theme("dark", ({ variable: v }) => {
			v("color-primary", "#4d9eff");
			v("color-secondary", "#ff6b6b");
			v("background", "#1a1a1a");
		});

		const result = consumeTheme(darkTheme, options);
		expect(result).toEqual(
			'[data-theme="dark"] {\n\t--color-primary: #4d9eff;\n\t--color-secondary: #ff6b6b;\n\t--background: #1a1a1a;\n}',
		);
	});

	it("should handle themes with nested selectors", () => {
		const themeWithSelectors = theme(
			"colorful",
			({ variable: v, selector: s }) => {
				v("primary-color", "#ff0066");
				s(".button", {
					color: ref("primary-color"),
					backgroundColor: "white",
				});
			},
		);

		const result = consumeTheme(themeWithSelectors, options);
		expect(result).toEqual(`[data-theme="colorful"] {
\t--primary-color: #ff0066;

\t.button {
\t\tcolor: var(--primary-color);
\t\tbackgroundColor: white;
\t}
}`);
	});

	it("should respect custom theme selector format", () => {
		const customOptions: StyleframeOptions = {
			theme: {
				selector: ".theme-%s",
			},
		};

		const customTheme = theme("neon", ({ variable: v }) => {
			v("accent-color", "#00ff88");
		});

		expect(consumeTheme(customTheme, customOptions)).toBe(
			".theme-neon {\n\t--accent-color: #00ff88;\n}",
		);
	});

	it("should handle themes with variable prefix", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				prefix: "app-",
			},
		};

		const prefixedTheme = theme("branded", ({ variable: v }) => {
			v("brand-color", "#123456");
		});

		expect(consumeTheme(prefixedTheme, prefixOptions)).toBe(
			'[data-theme="branded"] {\n\t--app-brand-color: #123456;\n}',
		);
	});

	it("should handle empty themes", () => {
		const emptyTheme = theme("empty", () => {});

		expect(consumeTheme(emptyTheme, options)).toBe('[data-theme="empty"] {}');
	});

	it("should handle themes with only nested children", () => {
		const childrenOnlyTheme = theme("structure", ({ selector: s }) => {
			s(".header", {
				padding: "1rem",
			});

			s(".footer", {
				margin: "2rem 0",
			});
		});

		const result = consumeTheme(childrenOnlyTheme, options);
		expect(result).toEqual(
			`[data-theme="structure"] {
\t.header {
\t\tpadding: 1rem;
\t}

\t.footer {
\t\tmargin: 2rem 0;
\t}
}`,
		);
	});

	it("should handle themes with complex nested structures", () => {
		const complexTheme = theme(
			"advanced",
			({ variable: v, selector: s, css }) => {
				v("spacing-unit", "8px");
				v("primary-hue", "240");

				s(".card", ({ selector: nested }) => {
					nested("&:hover", {
						transform: "translateY(-2px)",
					});

					nested(".card-header", {
						backgroundColor: css`hsl(${ref("primary-hue")}, 70%, 90%)`,
					});

					return {
						padding: ref("spacing-unit"),
						borderRadius: "4px",
					};
				});
			},
		);

		const result = consumeTheme(complexTheme, options);
		expect(result).toEqual(`[data-theme="advanced"] {
\t--spacing-unit: 8px;
\t--primary-hue: 240;

\t.card {
\t\tpadding: var(--spacing-unit);
\t\tborderRadius: 4px;
\t
\t\t&:hover {
\t\t\ttransform: translateY(-2px);
\t\t}
\t
\t\t.card-header {
\t\t\tbackgroundColor: hsl(var(--primary-hue), 70%, 90%);
\t\t}
\t}
}`);
	});

	it("should handle themes with CSS variable references", () => {
		const baseVar = variable("base-size", "16px");
		const refTheme = theme("referenced", ({ variable: v }) => {
			v("large-size", css`calc(${ref(baseVar)} * 1.5)`);
			v("small-size", css`calc(${ref(baseVar)} * 0.875)`);
		});

		const result = consumeTheme(refTheme, options);
		expect(result).toEqual(`[data-theme="referenced"] {
\t--large-size: calc(var(--base-size) * 1.5);
\t--small-size: calc(var(--base-size) * 0.875);
}`);
	});

	it("should handle themes with both custom selector and variable prefix", () => {
		const combinedOptions: StyleframeOptions = {
			theme: {
				selector: "#theme-%s",
			},
			variables: {
				prefix: "ui-",
			},
		};

		const combinedTheme = theme("custom", ({ variable: v }) => {
			v("text-color", "#333333");
		});

		expect(consumeTheme(combinedTheme, combinedOptions)).toBe(
			"#theme-custom {\n\t--ui-text-color: #333333;\n}",
		);
	});
});
