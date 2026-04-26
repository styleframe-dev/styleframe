import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useFluidFontSizeDesignTokens } from "./useFluidFontSizeDesignTokens";

describe("useFluidFontSizeDesignTokens", () => {
	it("should create fluid font size variables with range arrays", () => {
		const s = styleframe();
		const { fontSizeSm } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				sm: [0.875, 0.875],
			},
		);

		expect(fontSizeSm).toEqual({
			type: "variable",
			id: expect.any(String),
			parentId: expect.any(String),
			name: "font-size.sm",
			value: expect.objectContaining({
				type: "css",
			}),
		});

		expect(fontSizeSm.name).toBe("font-size.sm");
	});

	it("should create fluid font size with default key", () => {
		const s = styleframe();
		const { fontSize } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
			},
		);

		expect(fontSize).toEqual({
			type: "variable",
			id: expect.any(String),
			parentId: expect.any(String),
			name: "font-size",
			value: expect.objectContaining({
				type: "css",
			}),
		});
	});

	it("should create multiple fluid font size variables", () => {
		const s = styleframe();
		const { fontSizeXs, fontSizeSm, fontSizeMd, fontSizeLg, fontSizeXl } =
			useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					xs: [0.694, 0.8],
					sm: [0.833, 0.889],
					md: [1, 1],
					lg: [1.2, 1.125],
					xl: [1.44, 1.266],
				},
			);

		expect(fontSizeXs.name).toBe("font-size.xs");
		expect(fontSizeSm.name).toBe("font-size.sm");
		expect(fontSizeMd.name).toBe("font-size.md");
		expect(fontSizeLg.name).toBe("font-size.lg");
		expect(fontSizeXl.name).toBe("font-size.xl");
	});

	it("should handle reference values using @ syntax", () => {
		const s = styleframe();
		const { fontSize, fontSizeMd } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				md: [1, 1],
				default: "@font-size.md",
			},
		);

		expect(fontSize).toEqual({
			type: "variable",
			id: expect.any(String),
			parentId: expect.any(String),
			name: "font-size",
			value: {
				type: "reference",
				name: "font-size.md",
				fallback: undefined,
			},
		});

		expect(fontSizeMd.name).toBe("font-size.md");
	});

	it("should add variables to root", () => {
		const s = styleframe();
		useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
				sm: [0.875, 0.875],
			},
		);

		// Should include font-size.min, font-size.max, font-size, font-size.sm
		expect(s.root.variables.length).toBeGreaterThanOrEqual(4);
		expect(s.root.variables.some((v) => v.name === "font-size.min")).toBe(true);
		expect(s.root.variables.some((v) => v.name === "font-size.max")).toBe(true);
		expect(s.root.variables.some((v) => v.name === "font-size")).toBe(true);
		expect(s.root.variables.some((v) => v.name === "font-size.sm")).toBe(true);
	});

	it("should create base font size min and max variables", () => {
		const s = styleframe();
		useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
			},
		);

		const fontSizeMin = s.root.variables.find(
			(v) => v.name === "font-size.min",
		);
		const fontSizeMax = s.root.variables.find(
			(v) => v.name === "font-size.max",
		);

		expect(fontSizeMin).toEqual({
			type: "variable",
			id: expect.any(String),
			parentId: expect.any(String),
			name: "font-size.min",
			value: 16,
		});

		expect(fontSizeMax).toEqual({
			type: "variable",
			id: expect.any(String),
			parentId: expect.any(String),
			name: "font-size.max",
			value: 18,
		});
	});

	it("should handle kebab-case font size names", () => {
		const s = styleframe();
		const { fontSizeExtraLarge } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				"extra-large": [2, 2.25],
			},
		);

		expect(fontSizeExtraLarge.name).toBe("font-size.extra-large");
	});

	it("should handle snake_case font size names", () => {
		const s = styleframe();
		const { fontSizeHeadingPrimary } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				heading_primary: [1.5, 1.75],
			},
		);

		expect(fontSizeHeadingPrimary.name).toBe("font-size.heading_primary");
	});

	it("should handle numeric font size names", () => {
		const s = styleframe();
		const { fontSize100 } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				"100": [0.75, 0.75],
			},
		);

		expect(fontSize100.name).toBe("font-size.100");
	});

	it("should use default breakpoint reference", () => {
		const s = styleframe();
		s.variable("fluid.breakpoint", "100vw");

		useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
			},
		);

		// The function should reference fluid.breakpoint by default
		const fontSize = s.root.variables.find((v) => v.name === "font-size");
		expect(fontSize).toBeDefined();
		expect(fontSize?.value).toEqual(
			expect.objectContaining({
				type: "css",
			}),
		);
	});

	it("should accept custom breakpoint variable", () => {
		const s = styleframe();
		const customBreakpoint = s.variable("custom-breakpoint", "50vw");

		const { fontSize } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
			},
			customBreakpoint,
		);

		expect(fontSize).toBeDefined();
		expect(fontSize.value).toEqual(
			expect.objectContaining({
				type: "css",
			}),
		);
	});

	it("should accept custom breakpoint reference", () => {
		const s = styleframe();
		const customBreakpoint = s.variable("custom-breakpoint", "50vw");

		const { fontSize } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
			},
			s.ref(customBreakpoint),
		);

		expect(fontSize).toBeDefined();
	});

	it("should handle different scale multipliers for min and max", () => {
		const s = styleframe();
		const { fontSizeLg } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				lg: [1.2, 1.5],
			},
		);

		expect(fontSizeLg.name).toBe("font-size.lg");
		expect(fontSizeLg.value).toEqual(
			expect.objectContaining({
				type: "css",
			}),
		);
	});

	it("should compile to correct CSS output using consumeCSS", () => {
		const s = styleframe();
		useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				xs: [0.694, 0.8],
				sm: [0.833, 0.889],
				default: [1, 1],
			},
		);

		const css = consumeCSS(s.root, s.options);

		expect(css).toContain("--font-size--min: 16;");
		expect(css).toContain("--font-size--max: 18;");
		expect(css).toContain("--font-size--xs:");
		expect(css).toContain("--font-size--sm:");
		expect(css).toContain("--font-size:");
	});

	it("should generate calc expressions for fluid values", () => {
		const s = styleframe();
		const { fontSize } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				default: [1, 1],
			},
		);

		const css = consumeCSS(fontSize, s.options);

		// Should contain calc() with fluid formula
		expect(css).toContain("calc(");
		expect(css).toContain("var(--font-size--min)");
		expect(css).toContain("var(--font-size--max)");
	});

	it("should handle complete font size scale with references", () => {
		const s = styleframe();
		const sizes = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				xs: [0.694, 0.8],
				sm: [0.833, 0.889],
				md: [1, 1],
				lg: [1.2, 1.125],
				xl: [1.44, 1.266],
				default: "@font-size.md",
			},
		);

		expect(sizes.fontSizeXs.name).toBe("font-size.xs");
		expect(sizes.fontSizeSm.name).toBe("font-size.sm");
		expect(sizes.fontSizeMd.name).toBe("font-size.md");
		expect(sizes.fontSizeLg.name).toBe("font-size.lg");
		expect(sizes.fontSizeXl.name).toBe("font-size.xl");
		expect(sizes.fontSize.name).toBe("font-size");
		expect(sizes.fontSize.value).toEqual({
			type: "reference",
			name: "font-size.md",
			fallback: undefined,
		});
	});

	it("should handle variable references in range arrays", () => {
		const s = styleframe();
		const minMultiplier = s.variable("scale-min", 1.2);
		const maxMultiplier = s.variable("scale-max", 1.25);

		const { fontSizeLg } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				lg: [s.ref(minMultiplier), s.ref(maxMultiplier)],
			},
		);

		expect(fontSizeLg.name).toBe("font-size.lg");
		expect(fontSizeLg.value).toEqual(
			expect.objectContaining({
				type: "css",
			}),
		);
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		const result = useFluidFontSizeDesignTokens(s, { min: 16, max: 18 }, {});

		// Should still create the base min/max variables
		const fontSizeMin = s.root.variables.find(
			(v) => v.name === "font-size.min",
		);
		const fontSizeMax = s.root.variables.find(
			(v) => v.name === "font-size.max",
		);

		expect(fontSizeMin).toBeDefined();
		expect(fontSizeMax).toBeDefined();
		expect(Object.keys(result)).toHaveLength(0);
	});

	it("should handle zero multipliers", () => {
		const s = styleframe();
		const { fontSizeZero } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				zero: [0, 0],
			},
		);

		expect(fontSizeZero.name).toBe("font-size.zero");
		expect(fontSizeZero.value).toEqual(
			expect.objectContaining({
				type: "css",
			}),
		);
	});

	it("should handle fractional multipliers", () => {
		const s = styleframe();
		const { fontSizeTiny } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				tiny: [0.5, 0.5],
			},
		);

		expect(fontSizeTiny.name).toBe("font-size.tiny");
	});

	it("should handle large multipliers", () => {
		const s = styleframe();
		const { fontSizeHuge } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				huge: [5, 6],
			},
		);

		expect(fontSizeHuge.name).toBe("font-size.huge");
	});

	it("should handle decimal base values", () => {
		const s = styleframe();
		useFluidFontSizeDesignTokens(
			s,
			{ min: 16.5, max: 18.75 },
			{
				default: [1, 1],
			},
		);

		const fontSizeMin = s.root.variables.find(
			(v) => v.name === "font-size.min",
		);
		const fontSizeMax = s.root.variables.find(
			(v) => v.name === "font-size.max",
		);

		expect(fontSizeMin?.value).toBe(16.5);
		expect(fontSizeMax?.value).toBe(18.75);
	});

	it("should handle negative multipliers", () => {
		const s = styleframe();
		const { fontSizeNegative } = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				negative: [-1, -1],
			},
		);

		expect(fontSizeNegative.name).toBe("font-size.negative");
		expect(fontSizeNegative.value).toEqual(
			expect.objectContaining({
				type: "css",
			}),
		);
	});

	it("should work with scale powers from useScalePowers", () => {
		const s = styleframe();

		// Simulate scale powers (similar to what useScalePowers would return)
		const scaleMinPowers = {
			"-2": 0.694,
			"-1": 0.833,
			"0": 1,
			"1": 1.2,
			"2": 1.44,
		};

		const scaleMaxPowers = {
			"-2": 0.64,
			"-1": 0.8,
			"0": 1,
			"1": 1.25,
			"2": 1.563,
		};

		const sizes = useFluidFontSizeDesignTokens(
			s,
			{ min: 16, max: 18 },
			{
				xs: [scaleMinPowers["-2"], scaleMaxPowers["-2"]],
				sm: [scaleMinPowers["-1"], scaleMaxPowers["-1"]],
				md: [scaleMinPowers["0"], scaleMaxPowers["0"]],
				lg: [scaleMinPowers["1"], scaleMaxPowers["1"]],
				xl: [scaleMinPowers["2"], scaleMaxPowers["2"]],
				default: "@font-size.md",
			},
		);

		expect(sizes.fontSizeXs).toBeDefined();
		expect(sizes.fontSizeSm).toBeDefined();
		expect(sizes.fontSizeMd).toBeDefined();
		expect(sizes.fontSizeLg).toBeDefined();
		expect(sizes.fontSizeXl).toBeDefined();
		expect(sizes.fontSize.value).toEqual({
			type: "reference",
			name: "font-size.md",
			fallback: undefined,
		});
	});

	it("should handle mixed reference and range values", () => {
		const s = styleframe();
		const { fontSize, fontSizeSm, fontSizeMd, fontSizeLg } =
			useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					sm: [0.875, 0.875],
					md: [1, 1],
					lg: [1.25, 1.5],
					default: "@font-size.md",
				},
			);

		expect(fontSizeSm.value).toEqual(expect.objectContaining({ type: "css" }));
		expect(fontSizeMd.value).toEqual(expect.objectContaining({ type: "css" }));
		expect(fontSizeLg.value).toEqual(expect.objectContaining({ type: "css" }));
		expect(fontSize.value).toEqual({
			type: "reference",
			name: "font-size.md",
			fallback: undefined,
		});
	});

	describe("type safety", () => {
		it("should preserve exact font size names in return type", () => {
			const s = styleframe();
			const sizes = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					default: [1, 1],
					sm: [0.875, 0.875],
				},
			);

			// Type assertions to verify the generic types are preserved
			const defaultSize: Variable<"font-size"> = sizes.fontSize;
			const smSize: Variable<"font-size.sm"> = sizes.fontSizeSm;

			expect(defaultSize.name).toBe("font-size");
			expect(smSize.name).toBe("font-size.sm");
		});

		it("should maintain type information for kebab-case names", () => {
			const s = styleframe();
			const { fontSizeExtraLarge } = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					"extra-large": [2, 2.25],
				},
			);

			const typed: Variable<"font-size.extra-large"> = fontSizeExtraLarge;
			expect(typed.name).toBe("font-size.extra-large");
		});

		it("should work with const assertion", () => {
			const s = styleframe();

			const sizes = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					default: [1, 1],
					sm: [0.875, 0.875],
				},
			);

			expect(sizes.fontSize.name).toBe("font-size");
			expect(sizes.fontSizeSm.name).toBe("font-size.sm");
		});
	});

	describe("fluid calculation formula", () => {
		it("should generate correct calc formula structure", () => {
			const s = styleframe();
			const { fontSize } = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					default: [1, 1],
				},
			);

			const css = consumeCSS(fontSize, s.options);

			// Should follow the pattern: calc((min / 16 * 1rem) + (max - min) * breakpoint)
			expect(css).toContain("calc(");
			expect(css).toContain("/ 16 * 1rem");
			expect(css).toContain("var(--font-size--min)");
			expect(css).toContain("var(--font-size--max)");
			expect(css).toContain("var(--fluid--breakpoint)");
		});

		it("should multiply base font sizes by scale multipliers", () => {
			const s = styleframe();
			const { fontSize } = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					default: [1.5, 2],
				},
			);

			const css = consumeCSS(fontSize, s.options);

			// Should multiply font-size.min by 1.5 and font-size.max by 2
			expect(css).toContain("var(--font-size--min) * 1.5");
			expect(css).toContain("var(--font-size--max) * 2");
		});
	});

	describe("integration with useFluidRangeValue", () => {
		it("should use useFluidRangeValue internally for range arrays", () => {
			const s = styleframe();
			const { fontSize } = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					default: [1, 1],
				},
			);

			// The result should be a css token (which is what useFluidRangeValue returns)
			expect(fontSize.value).toEqual(
				expect.objectContaining({
					type: "css",
				}),
			);
		});

		it("should pass breakpoint parameter to useFluidRangeValue", () => {
			const s = styleframe();
			const customBreakpoint = s.variable("custom-bp", "75vw");

			const { fontSize } = useFluidFontSizeDesignTokens(
				s,
				{ min: 16, max: 18 },
				{
					default: [1, 1],
				},
				customBreakpoint,
			);

			const css = consumeCSS(fontSize, s.options);

			// Should reference the custom breakpoint
			expect(css).toContain("calc(");
		});
	});
});
