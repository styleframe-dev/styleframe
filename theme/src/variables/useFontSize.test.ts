import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useFontSize } from "./useFontSize";

describe("useFontSize", () => {
	it("should create a single font size variable with 'default' key", () => {
		const s = styleframe();
		const { fontSize } = useFontSize(s, {
			default: "1rem",
		});

		expect(fontSize).toEqual({
			type: "variable",
			name: "font-size",
			value: "1rem",
		});

		const css = consumeCSS(fontSize, s.options);
		expect(css).toBe(`--font-size: 1rem;`);
	});

	it("should create font size variable with modifier for non-default keys", () => {
		const s = styleframe();
		const { fontSizeSm } = useFontSize(s, {
			sm: "0.875rem",
		});

		expect(fontSizeSm).toEqual({
			type: "variable",
			name: "font-size--sm",
			value: "0.875rem",
		});

		const css = consumeCSS(fontSizeSm, s.options);
		expect(css).toBe(`--font-size--sm: 0.875rem;`);
	});

	it("should create multiple font size variables", () => {
		const s = styleframe();
		const { fontSize, fontSizeSm, fontSizeMd, fontSizeLg } = useFontSize(s, {
			default: "1rem",
			sm: "0.875rem",
			md: "1rem",
			lg: "1.25rem",
		});

		expect(fontSize).toEqual({
			type: "variable",
			name: "font-size",
			value: "1rem",
		});

		expect(fontSizeSm).toEqual({
			type: "variable",
			name: "font-size--sm",
			value: "0.875rem",
		});

		expect(fontSizeMd).toEqual({
			type: "variable",
			name: "font-size--md",
			value: "1rem",
		});

		expect(fontSizeLg).toEqual({
			type: "variable",
			name: "font-size--lg",
			value: "1.25rem",
		});
	});

	it("should add variables to root", () => {
		const s = styleframe();
		useFontSize(s, {
			default: "1rem",
			sm: "0.875rem",
		});

		expect(s.root.variables).toHaveLength(2);
		expect(s.root.variables[0]?.name).toBe("font-size");
		expect(s.root.variables[1]?.name).toBe("font-size--sm");
	});

	it("should handle kebab-case font size names", () => {
		const s = styleframe();
		const { fontSizeExtraLarge } = useFontSize(s, {
			"extra-large": "2rem",
		});

		expect(fontSizeExtraLarge).toEqual({
			type: "variable",
			name: "font-size--extra-large",
			value: "2rem",
		});
	});

	it("should handle snake_case font size names", () => {
		const s = styleframe();
		const { fontSizeHeadingPrimary } = useFontSize(s, {
			heading_primary: "1.5rem",
		});

		expect(fontSizeHeadingPrimary).toEqual({
			type: "variable",
			name: "font-size--heading_primary",
			value: "1.5rem",
		});
	});

	it("should handle numeric font size names", () => {
		const s = styleframe();
		const { fontSize100 } = useFontSize(s, {
			"100": "0.75rem",
		});

		expect(fontSize100).toEqual({
			type: "variable",
			name: "font-size--100",
			value: "0.75rem",
		});
	});

	it("should handle pixel values", () => {
		const s = styleframe();
		const { fontSize } = useFontSize(s, {
			default: "16px",
		});

		expect(fontSize).toEqual({
			type: "variable",
			name: "font-size",
			value: "16px",
		});
	});

	it("should handle em values", () => {
		const s = styleframe();
		const { fontSizeBase } = useFontSize(s, {
			base: "1.5em",
		});

		expect(fontSizeBase).toEqual({
			type: "variable",
			name: "font-size--base",
			value: "1.5em",
		});
	});

	it("should handle percentage values", () => {
		const s = styleframe();
		const { fontSizeRelative } = useFontSize(s, {
			relative: "125%",
		});

		expect(fontSizeRelative).toEqual({
			type: "variable",
			name: "font-size--relative",
			value: "125%",
		});
	});

	it("should handle viewport units", () => {
		const s = styleframe();
		const { fontSizeFluid } = useFontSize(s, {
			fluid: "2.5vw",
		});

		expect(fontSizeFluid).toEqual({
			type: "variable",
			name: "font-size--fluid",
			value: "2.5vw",
		});
	});

	it("should handle calc() expressions", () => {
		const s = styleframe();
		const { fontSizeDynamic } = useFontSize(s, {
			dynamic: "calc(1rem + 0.5vw)",
		});

		expect(fontSizeDynamic.value).toBe("calc(1rem + 0.5vw)");
	});

	it("should handle clamp() expressions", () => {
		const s = styleframe();
		const { fontSizeResponsive } = useFontSize(s, {
			responsive: "clamp(1rem, 2vw, 2rem)",
		});

		expect(fontSizeResponsive.value).toBe("clamp(1rem, 2vw, 2rem)");
	});

	it("should handle empty font size object", () => {
		const s = styleframe();
		const result = useFontSize(s, {});

		expect(result).toEqual({});
		expect(s.root.variables).toHaveLength(0);
	});

	it("should handle font size references", () => {
		const s = styleframe();
		const baseSize = s.variable("base-size", "1rem");
		const { fontSize } = useFontSize(s, {
			default: s.ref(baseSize),
		});

		expect(fontSize.value).toEqual({
			type: "reference",
			name: "base-size",
			fallback: undefined,
		});
	});

	it("should compile to correct CSS output using consumeCSS", () => {
		const s = styleframe();
		useFontSize(s, {
			default: "1rem",
			sm: "0.875rem",
			md: "1rem",
			lg: "1.25rem",
			xl: "1.5rem",
		});

		const css = consumeCSS(s.root, s.options);

		expect(css).toBe(`:root {
	--font-size: 1rem;
	--font-size--sm: 0.875rem;
	--font-size--md: 1rem;
	--font-size--lg: 1.25rem;
	--font-size--xl: 1.5rem;
}`);
	});

	it("should handle a complete font size scale", () => {
		const s = styleframe();
		const sizes = useFontSize(s, {
			xs: "0.75rem",
			sm: "0.875rem",
			default: "1rem",
			md: "1rem",
			lg: "1.25rem",
			xl: "1.5rem",
			"2xl": "2rem",
			"3xl": "2.5rem",
		});

		expect(sizes.fontSizeXs.value).toBe("0.75rem");
		expect(sizes.fontSizeSm.value).toBe("0.875rem");
		expect(sizes.fontSize.value).toBe("1rem");
		expect(sizes.fontSizeMd.value).toBe("1rem");
		expect(sizes.fontSizeLg.value).toBe("1.25rem");
		expect(sizes.fontSizeXl.value).toBe("1.5rem");
		expect(sizes.fontSize2xl.value).toBe("2rem");
		expect(sizes.fontSize3xl.value).toBe("2.5rem");
	});

	describe("type safety", () => {
		it("should preserve exact font size names in return type", () => {
			const s = styleframe();
			const sizes = useFontSize(s, {
				default: "1rem",
				sm: "0.875rem",
			});

			// Type assertions to verify the generic types are preserved
			const defaultSize: Variable<"font-size"> = sizes.fontSize;
			const smSize: Variable<"font-size--sm"> = sizes.fontSizeSm;

			expect(defaultSize.name).toBe("font-size");
			expect(smSize.name).toBe("font-size--sm");
		});

		it("should maintain type information for kebab-case names", () => {
			const s = styleframe();
			const { fontSizeExtraLarge } = useFontSize(s, {
				"extra-large": "2rem",
			});

			const typed: Variable<"font-size--extra-large"> = fontSizeExtraLarge;
			expect(typed.name).toBe("font-size--extra-large");
		});

		it("should work with const assertion", () => {
			const s = styleframe();
			const sizeConfig = {
				default: "1rem",
				sm: "0.875rem",
			} as const;

			const sizes = useFontSize(s, sizeConfig);

			expect(sizes.fontSize.name).toBe("font-size");
			expect(sizes.fontSizeSm.name).toBe("font-size--sm");
		});
	});
});
