import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useBorderStyle, defaultBorderStyleValues } from "./useBorderStyle";

describe("useBorderStyle", () => {
	it("should create all border style variables with correct names and values", () => {
		const s = styleframe();
		const {
			borderStyleNone,
			borderStyleSolid,
			borderStyleDashed,
			borderStyleDotted,
			borderStyleDouble,
			borderStyleGroove,
			borderStyleInset,
			borderStyleOutset,
			borderStyle,
		} = useBorderStyle(s);

		expect(borderStyleNone).toEqual({
			type: "variable",
			name: "border-style.none",
			value: "none",
		});

		expect(borderStyleSolid).toEqual({
			type: "variable",
			name: "border-style.solid",
			value: "solid",
		});

		expect(borderStyleDashed).toEqual({
			type: "variable",
			name: "border-style.dashed",
			value: "dashed",
		});

		expect(borderStyleDotted).toEqual({
			type: "variable",
			name: "border-style.dotted",
			value: "dotted",
		});

		expect(borderStyleDouble).toEqual({
			type: "variable",
			name: "border-style.double",
			value: "double",
		});

		expect(borderStyleGroove).toEqual({
			type: "variable",
			name: "border-style.groove",
			value: "groove",
		});

		expect(borderStyleInset).toEqual({
			type: "variable",
			name: "border-style.inset",
			value: "inset",
		});

		expect(borderStyleOutset).toEqual({
			type: "variable",
			name: "border-style.outset",
			value: "outset",
		});

		expect(borderStyle).toEqual({
			type: "variable",
			name: "border-style",
			value: {
				type: "reference",
				name: "border-style.solid",
				fallback: undefined,
			},
		});
	});

	it("should add all border style variables to root", () => {
		const s = styleframe();
		useBorderStyle(s);

		expect(s.root.variables).toHaveLength(9);
		expect(s.root.variables[0]?.name).toBe("border-style.none");
		expect(s.root.variables[1]?.name).toBe("border-style.solid");
		expect(s.root.variables[2]?.name).toBe("border-style.dashed");
		expect(s.root.variables[3]?.name).toBe("border-style.dotted");
		expect(s.root.variables[4]?.name).toBe("border-style.double");
		expect(s.root.variables[5]?.name).toBe("border-style.groove");
		expect(s.root.variables[6]?.name).toBe("border-style.inset");
		expect(s.root.variables[7]?.name).toBe("border-style.outset");
		expect(s.root.variables[8]?.name).toBe("border-style");
	});

	it("should return all border style variables in an object", () => {
		const s = styleframe();
		const borderStyles = useBorderStyle(s);

		expect(Object.keys(borderStyles)).toEqual([
			"borderStyleNone",
			"borderStyleSolid",
			"borderStyleDashed",
			"borderStyleDotted",
			"borderStyleDouble",
			"borderStyleGroove",
			"borderStyleInset",
			"borderStyleOutset",
			"borderStyle",
		]);
	});

	it("should compile to correct CSS output using consumeCSS", () => {
		const s = styleframe();
		useBorderStyle(s);

		const css = consumeCSS(s.root, s.options);

		expect(css).toBe(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
}`);
	});

	it("should compile individual border style variable to correct CSS", () => {
		const s = styleframe();
		const { borderStyleDashed } = useBorderStyle(s);

		const css = consumeCSS(borderStyleDashed, s.options);

		expect(css).toBe("--border-style--dashed: dashed;");
	});

	it("should not create duplicate variables when called multiple times", () => {
		const s = styleframe();
		const borderStyles1 = useBorderStyle(s);
		const borderStyles2 = useBorderStyle(s);

		// Should return the same variables (default: true behavior)
		expect(borderStyles1.borderStyleSolid).toBe(borderStyles2.borderStyleSolid);
		expect(borderStyles1.borderStyle).toBe(borderStyles2.borderStyle);
		expect(s.root.variables).toHaveLength(9);
	});

	it("should allow border style variables to be used as references", () => {
		const s = styleframe();
		const { borderStyleDotted } = useBorderStyle(s);

		const customBorderStyle = s.variable(
			"custom-border-style",
			s.ref(borderStyleDotted),
		);

		expect(customBorderStyle.value).toEqual({
			type: "reference",
			name: "border-style.dotted",
			fallback: undefined,
		});

		const css = consumeCSS(s.root, s.options);
		expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
	--custom-border-style: var(--border-style--dotted);
}`);
	});

	it("should work with selector overrides", () => {
		const s = styleframe();
		const { borderStyleSolid } = useBorderStyle(s);

		s.selector(".custom-border-style", ({ variable }) => {
			variable(borderStyleSolid, "dashed");
		});

		const css = consumeCSS(s.root, s.options);

		expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
}

.custom-border-style {
	--border-style--solid: dashed;
}`);
	});

	describe("type safety", () => {
		it("should preserve exact border style variable names in return type", () => {
			const s = styleframe();
			const borderStyles = useBorderStyle(s);

			// Type assertions to verify the generic types are preserved
			const none: Variable<"border-style.none"> = borderStyles.borderStyleNone;
			const solid: Variable<"border-style.solid"> =
				borderStyles.borderStyleSolid;
			const dashed: Variable<"border-style.dashed"> =
				borderStyles.borderStyleDashed;
			const dotted: Variable<"border-style.dotted"> =
				borderStyles.borderStyleDotted;
			const double: Variable<"border-style.double"> =
				borderStyles.borderStyleDouble;
			const groove: Variable<"border-style.groove"> =
				borderStyles.borderStyleGroove;
			const inset: Variable<"border-style.inset"> =
				borderStyles.borderStyleInset;
			const outset: Variable<"border-style.outset"> =
				borderStyles.borderStyleOutset;
			const borderStyle: Variable<"border-style"> = borderStyles.borderStyle;

			expect(none.name).toBe("border-style.none");
			expect(solid.name).toBe("border-style.solid");
			expect(dashed.name).toBe("border-style.dashed");
			expect(dotted.name).toBe("border-style.dotted");
			expect(double.name).toBe("border-style.double");
			expect(groove.name).toBe("border-style.groove");
			expect(inset.name).toBe("border-style.inset");
			expect(outset.name).toBe("border-style.outset");
			expect(borderStyle.name).toBe("border-style");
		});

		it("should have correct string value types", () => {
			const s = styleframe();
			const borderStyles = useBorderStyle(s);

			expect(typeof borderStyles.borderStyleNone.value).toBe("string");
			expect(typeof borderStyles.borderStyleSolid.value).toBe("string");
			expect(typeof borderStyles.borderStyleDashed.value).toBe("string");
			expect(typeof borderStyles.borderStyleDotted.value).toBe("string");
			expect(typeof borderStyles.borderStyleDouble.value).toBe("string");
			expect(typeof borderStyles.borderStyleGroove.value).toBe("string");
			expect(typeof borderStyles.borderStyleInset.value).toBe("string");
			expect(typeof borderStyles.borderStyleOutset.value).toBe("string");
			expect(typeof borderStyles.borderStyle.value).toBe("object");
		});
	});

	describe("default border style", () => {
		it("should create a default border style variable referencing solid by default", () => {
			const s = styleframe();
			const { borderStyle } = useBorderStyle(s);

			expect(borderStyle).toEqual({
				type: "variable",
				name: "border-style",
				value: {
					type: "reference",
					name: "border-style.solid",
					fallback: undefined,
				},
			});
		});

		it("should allow customizing the default border style", () => {
			const s = styleframe();
			const { borderStyle } = useBorderStyle(s, {
				...defaultBorderStyleValues,
				default: "@dashed",
			});

			expect(borderStyle.value).toEqual({
				type: "reference",
				name: "border-style.dashed",
				fallback: undefined,
			});
		});

		it("should compile default border style to CSS correctly", () => {
			const s = styleframe();
			useBorderStyle(s, {
				...defaultBorderStyleValues,
				default: "@dotted",
			});

			const css = consumeCSS(s.root, s.options);

			expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--dotted);
}`);
		});

		it("should work with different default border styles", () => {
			const borderStyleNames = [
				"none",
				"solid",
				"dashed",
				"dotted",
				"double",
				"groove",
				"inset",
				"outset",
			];

			for (const borderStyleName of borderStyleNames) {
				const s = styleframe();
				const { borderStyle } = useBorderStyle(s, {
					...defaultBorderStyleValues,
					default: `@${borderStyleName}`,
				});

				expect(borderStyle.value).toEqual({
					type: "reference",
					name: `border-style.${borderStyleName}`,
					fallback: undefined,
				});
			}
		});
	});

	describe("border style values", () => {
		it("should have correct CSS keyword values", () => {
			const s = styleframe();
			const {
				borderStyleNone,
				borderStyleSolid,
				borderStyleDashed,
				borderStyleDotted,
				borderStyleDouble,
				borderStyleGroove,
				borderStyleInset,
				borderStyleOutset,
			} = useBorderStyle(s);

			expect(borderStyleNone.value).toBe("none");
			expect(borderStyleSolid.value).toBe("solid");
			expect(borderStyleDashed.value).toBe("dashed");
			expect(borderStyleDotted.value).toBe("dotted");
			expect(borderStyleDouble.value).toBe("double");
			expect(borderStyleGroove.value).toBe("groove");
			expect(borderStyleInset.value).toBe("inset");
			expect(borderStyleOutset.value).toBe("outset");
		});

		it("should have all standard CSS border-style values", () => {
			const s = styleframe();
			const borderStyles = useBorderStyle(s);
			const values = [
				borderStyles.borderStyleNone.value,
				borderStyles.borderStyleSolid.value,
				borderStyles.borderStyleDashed.value,
				borderStyles.borderStyleDotted.value,
				borderStyles.borderStyleDouble.value,
				borderStyles.borderStyleGroove.value,
				borderStyles.borderStyleInset.value,
				borderStyles.borderStyleOutset.value,
			];

			const expectedValues = [
				"none",
				"solid",
				"dashed",
				"dotted",
				"double",
				"groove",
				"inset",
				"outset",
			];

			expect(values).toEqual(expectedValues);
		});
	});

	describe("practical usage", () => {
		it("should work for creating borders with different styles", () => {
			const s = styleframe();
			const { borderStyleSolid, borderStyleDashed } = useBorderStyle(s);

			s.selector(".card", ({ variable }) => {
				variable("border-style", s.ref(borderStyleSolid));
			});

			s.selector(".divider", ({ variable }) => {
				variable("border-style", s.ref(borderStyleDashed));
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
}

.card {
	--border-style: var(--border-style--solid);
}

.divider {
	--border-style: var(--border-style--dashed);
}`);
		});

		it("should work for responsive border style adjustments", () => {
			const s = styleframe();
			const { borderStyleSolid, borderStyleDashed } = useBorderStyle(s);

			const buttonBorderStyle = s.variable(
				"button-border-style",
				s.ref(borderStyleSolid),
			);

			s.selector("@media (max-width: 768px)", ({ variable }) => {
				variable(buttonBorderStyle, s.ref(borderStyleDashed));
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
	--button-border-style: var(--border-style--solid);
}

@media (max-width: 768px) {
	--button-border-style: var(--border-style--dashed);
}`);
		});

		it("should work for theme-specific border style overrides", () => {
			const s = styleframe();
			const { borderStyleSolid, borderStyleDotted } = useBorderStyle(s);

			s.selector(".theme-playful", ({ variable }) => {
				variable(borderStyleSolid, s.ref(borderStyleDotted));
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
}

.theme-playful {
	--border-style--solid: var(--border-style--dotted);
}`);
		});

		it("should work for state-specific border styles", () => {
			const s = styleframe();
			const { borderStyleSolid, borderStyleDashed, borderStyleNone } =
				useBorderStyle(s);

			s.selector(".input", ({ variable }) => {
				variable("border-style", s.ref(borderStyleSolid));
			});

			s.selector(".input:hover", ({ variable }) => {
				variable("border-style", s.ref(borderStyleDashed));
			});

			s.selector(".input:disabled", ({ variable }) => {
				variable("border-style", s.ref(borderStyleNone));
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
}

.input {
	--border-style: var(--border-style--solid);
}

.input:hover {
	--border-style: var(--border-style--dashed);
}

.input:disabled {
	--border-style: var(--border-style--none);
}`);
		});

		it("should work for combining border styles with other border properties", () => {
			const s = styleframe();
			const { borderStyleSolid, borderStyleDouble } = useBorderStyle(s);

			const borderWidth = s.variable("border-width", "1px");
			s.variable("border-color", "#000");

			s.selector(".box", ({ variable }) => {
				variable("border-style", s.ref(borderStyleSolid));
			});

			s.selector(".box-fancy", ({ variable }) => {
				variable("border-style", s.ref(borderStyleDouble));
				variable(borderWidth, "3px");
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toEqual(`:root {
	--border-style--none: none;
	--border-style--solid: solid;
	--border-style--dashed: dashed;
	--border-style--dotted: dotted;
	--border-style--double: double;
	--border-style--groove: groove;
	--border-style--inset: inset;
	--border-style--outset: outset;
	--border-style: var(--border-style--solid);
	--border-width: 1px;
	--border-color: #000;
}

.box {
	--border-style: var(--border-style--solid);
}

.box-fancy {
	--border-style: var(--border-style--double);
	--border-width: 3px;
}`);
		});
	});
});
