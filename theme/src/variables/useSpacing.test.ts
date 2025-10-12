import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consume } from "@styleframe/transpiler";
import { useSpacing } from "./useSpacing";

describe("useSpacing", () => {
	it("should create a single spacing variable with 'default' key", () => {
		const s = styleframe();
		const { spacing } = useSpacing(s, {
			default: "1rem",
		});

		expect(spacing).toEqual({
			type: "variable",
			name: "spacing",
			value: "1rem",
		});

		const css = consume(spacing, s.options);
		expect(css).toBe(`--spacing: 1rem;`);
	});

	it("should create spacing variable with modifier for non-default keys", () => {
		const s = styleframe();
		const { spacingSm } = useSpacing(s, {
			sm: "0.5rem",
		});

		expect(spacingSm).toEqual({
			type: "variable",
			name: "spacing--sm",
			value: "0.5rem",
		});

		const css = consume(spacingSm, s.options);
		expect(css).toBe(`--spacing--sm: 0.5rem;`);
	});

	it("should create multiple spacing variables", () => {
		const s = styleframe();
		const { spacing, spacingSm, spacingMd, spacingLg } = useSpacing(s, {
			default: "@md",
			sm: "0.5rem",
			md: "1rem",
			lg: "2rem",
		});

		expect(spacingSm).toEqual({
			type: "variable",
			name: "spacing--sm",
			value: "0.5rem",
		});

		expect(spacingMd).toEqual({
			type: "variable",
			name: "spacing--md",
			value: "1rem",
		});

		expect(spacingLg).toEqual({
			type: "variable",
			name: "spacing--lg",
			value: "2rem",
		});

		expect(spacing).toEqual({
			type: "variable",
			name: "spacing",
			value: {
				type: "reference",
				name: "spacing--md",
				fallback: undefined,
			},
		});
	});

	it("should add variables to root", () => {
		const s = styleframe();
		useSpacing(s, {
			default: "1rem",
			sm: "0.5rem",
		});

		expect(s.root.variables).toHaveLength(2);
		expect(s.root.variables[0]?.name).toBe("spacing");
		expect(s.root.variables[1]?.name).toBe("spacing--sm");
	});

	it("should handle kebab-case spacing names", () => {
		const s = styleframe();
		const { spacingExtraLarge } = useSpacing(s, {
			"extra-large": "3rem",
		});

		expect(spacingExtraLarge).toEqual({
			type: "variable",
			name: "spacing--extra-large",
			value: "3rem",
		});
	});

	it("should handle snake_case spacing names", () => {
		const s = styleframe();
		const { spacingCardPadding } = useSpacing(s, {
			card_padding: "1.5rem",
		});

		expect(spacingCardPadding).toEqual({
			type: "variable",
			name: "spacing--card_padding",
			value: "1.5rem",
		});
	});

	it("should handle numeric spacing names", () => {
		const s = styleframe();
		const { spacing100 } = useSpacing(s, {
			"100": "0.25rem",
		});

		expect(spacing100).toEqual({
			type: "variable",
			name: "spacing--100",
			value: "0.25rem",
		});
	});

	it("should handle pixel values", () => {
		const s = styleframe();
		const { spacing } = useSpacing(s, {
			default: "16px",
		});

		expect(spacing).toEqual({
			type: "variable",
			name: "spacing",
			value: "16px",
		});
	});

	it("should handle em values", () => {
		const s = styleframe();
		const { spacingBase } = useSpacing(s, {
			base: "1.5em",
		});

		expect(spacingBase).toEqual({
			type: "variable",
			name: "spacing--base",
			value: "1.5em",
		});
	});

	it("should handle percentage values", () => {
		const s = styleframe();
		const { spacingRelative } = useSpacing(s, {
			relative: "5%",
		});

		expect(spacingRelative).toEqual({
			type: "variable",
			name: "spacing--relative",
			value: "5%",
		});
	});

	it("should handle viewport units", () => {
		const s = styleframe();
		const { spacingFluid } = useSpacing(s, {
			fluid: "2.5vw",
		});

		expect(spacingFluid).toEqual({
			type: "variable",
			name: "spacing--fluid",
			value: "2.5vw",
		});
	});

	it("should handle calc() expressions", () => {
		const s = styleframe();
		const { spacingDynamic } = useSpacing(s, {
			dynamic: "calc(1rem + 0.5vw)",
		});

		expect(spacingDynamic.value).toBe("calc(1rem + 0.5vw)");
	});

	it("should handle clamp() expressions", () => {
		const s = styleframe();
		const { spacingResponsive } = useSpacing(s, {
			responsive: "clamp(0.5rem, 2vw, 2rem)",
		});

		expect(spacingResponsive.value).toBe("clamp(0.5rem, 2vw, 2rem)");
	});

	it("should handle empty spacing object", () => {
		const s = styleframe();
		const result = useSpacing(s, {});

		expect(result).toEqual({});
		expect(s.root.variables).toHaveLength(0);
	});

	it("should handle spacing references", () => {
		const s = styleframe();
		const baseSpacing = s.variable("base-spacing", "1rem");
		const { spacing } = useSpacing(s, {
			default: s.ref(baseSpacing),
		});

		expect(spacing.value).toEqual({
			type: "reference",
			name: "base-spacing",
			fallback: undefined,
		});
	});

	it("should compile to correct CSS output using consume", () => {
		const s = styleframe();
		useSpacing(s, {
			default: "@md",
			xs: "0.25rem",
			sm: "0.5rem",
			md: "1rem",
			lg: "2rem",
		});

		const css = consume(s.root, s.options);

		expect(css).toBe(`:root {
	--spacing--xs: 0.25rem;
	--spacing--sm: 0.5rem;
	--spacing--md: 1rem;
	--spacing--lg: 2rem;
	--spacing: var(--spacing--md);
}`);
	});

	it("should handle a complete spacing scale", () => {
		const s = styleframe();
		const spaces = useSpacing(s, {
			"0": "0",
			xs: "0.25rem",
			sm: "0.5rem",
			default: "@md",
			md: "1rem",
			lg: "1.5rem",
			xl: "2rem",
			"2xl": "3rem",
			"3xl": "4rem",
		});

		expect(spaces.spacing0.value).toBe("0");
		expect(spaces.spacingXs.value).toBe("0.25rem");
		expect(spaces.spacingSm.value).toBe("0.5rem");
		expect(spaces.spacing.value).toEqual({
			type: "reference",
			name: "spacing--md",
			fallback: undefined,
		});
		expect(spaces.spacingMd.value).toBe("1rem");
		expect(spaces.spacingLg.value).toBe("1.5rem");
		expect(spaces.spacingXl.value).toBe("2rem");
		expect(spaces.spacing2xl.value).toBe("3rem");
		expect(spaces.spacing3xl.value).toBe("4rem");
	});

	describe("type safety", () => {
		it("should preserve exact spacing names in return type", () => {
			const s = styleframe();
			const spaces = useSpacing(s, {
				default: "1rem",
				sm: "0.5rem",
			});

			// Type assertions to verify the generic types are preserved
			const defaultSpacing: Variable<"spacing"> = spaces.spacing;
			const smSpacing: Variable<"spacing--sm"> = spaces.spacingSm;

			expect(defaultSpacing.name).toBe("spacing");
			expect(smSpacing.name).toBe("spacing--sm");
		});

		it("should maintain type information for kebab-case names", () => {
			const s = styleframe();
			const { spacingExtraLarge } = useSpacing(s, {
				"extra-large": "3rem",
			});

			const typed: Variable<"spacing--extra-large"> = spacingExtraLarge;
			expect(typed.name).toBe("spacing--extra-large");
		});

		it("should work with const assertion", () => {
			const s = styleframe();
			const spacingConfig = {
				default: "1rem",
				sm: "0.5rem",
			} as const;

			const spaces = useSpacing(s, spacingConfig);

			expect(spaces.spacing.name).toBe("spacing");
			expect(spaces.spacingSm.name).toBe("spacing--sm");
		});
	});
});
