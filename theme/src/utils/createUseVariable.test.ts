import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consume } from "@styleframe/transpiler";
import { createUseVariable } from "./createUseVariable";

describe("createUseVariable", () => {
	it("should create a composable for font-family property", () => {
		const useFontFamily = createUseVariable("font-family");
		const s = styleframe();
		const { fontFamily } = useFontFamily(s, {
			default: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
		});

		expect(fontFamily).toEqual({
			type: "variable",
			name: "font-family",
			value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto",
		});
	});

	it("should create a composable for line-height property", () => {
		const useLineHeight = createUseVariable("line-height");
		const s = styleframe();
		const { lineHeight } = useLineHeight(s, {
			default: "1.5",
		});

		expect(lineHeight).toEqual({
			type: "variable",
			name: "line-height",
			value: "1.5",
		});
	});

	it("should create a composable for custom property", () => {
		const useCustomProp = createUseVariable("custom-property");
		const s = styleframe();
		const { customProperty } = useCustomProp(s, {
			default: "value",
		});

		expect(customProperty).toEqual({
			type: "variable",
			name: "custom-property",
			value: "value",
		});
	});

	it("should create variable with modifier for non-default keys", () => {
		const useFontSize = createUseVariable("font-size");
		const s = styleframe();
		const { fontSizeLarge } = useFontSize(s, {
			large: "20px",
		});

		expect(fontSizeLarge).toEqual({
			type: "variable",
			name: "font-size--large",
			value: "20px",
		});
	});

	it("should create multiple variables", () => {
		const useSpacing = createUseVariable("spacing");
		const s = styleframe();
		const { spacing, spacingSmall, spacingLarge } = useSpacing(s, {
			default: "16px",
			small: "8px",
			large: "32px",
		});

		expect(spacing).toEqual({
			type: "variable",
			name: "spacing",
			value: "16px",
		});

		expect(spacingSmall).toEqual({
			type: "variable",
			name: "spacing--small",
			value: "8px",
		});

		expect(spacingLarge).toEqual({
			type: "variable",
			name: "spacing--large",
			value: "32px",
		});
	});

	it("should add variables to root", () => {
		const useBorderWidth = createUseVariable("border-width");
		const s = styleframe();
		useBorderWidth(s, {
			default: "1px",
			thick: "3px",
		});

		expect(s.root.variables).toHaveLength(2);
		expect(s.root.variables[0]?.name).toBe("border-width");
		expect(s.root.variables[1]?.name).toBe("border-width--thick");
	});

	it("should handle kebab-case token names", () => {
		const useColor = createUseVariable("color");
		const s = styleframe();
		const { colorPrimaryLight } = useColor(s, {
			"primary-light": "#3b82f6",
		});

		expect(colorPrimaryLight).toEqual({
			type: "variable",
			name: "color--primary-light",
			value: "#3b82f6",
		});
	});

	it("should handle snake_case token names", () => {
		const useColor = createUseVariable("color");
		const s = styleframe();
		const { colorPrimaryDark } = useColor(s, {
			primary_dark: "#1e40af",
		});

		expect(colorPrimaryDark).toEqual({
			type: "variable",
			name: "color--primary_dark",
			value: "#1e40af",
		});
	});

	it("should handle numeric token names", () => {
		const useFontWeight = createUseVariable("font-weight");
		const s = styleframe();
		const { fontWeight400 } = useFontWeight(s, {
			"400": "400",
		});

		expect(fontWeight400).toEqual({
			type: "variable",
			name: "font-weight--400",
			value: "400",
		});
	});

	it("should handle empty token object", () => {
		const useMargin = createUseVariable("margin");
		const s = styleframe();
		const result = useMargin(s, {});

		expect(result).toEqual({});
		expect(s.root.variables).toHaveLength(0);
	});

	it("should handle variable references", () => {
		const useSize = createUseVariable("size");
		const s = styleframe();
		const baseSize = s.variable("base-size", "16px");
		const { size } = useSize(s, {
			default: s.ref(baseSize),
		});

		expect(size.value).toEqual({
			type: "reference",
			name: "base-size",
			fallback: undefined,
		});
	});

	it("should compile to correct CSS output", () => {
		const usePadding = createUseVariable("padding");
		const s = styleframe();
		usePadding(s, {
			default: "16px",
			small: "8px",
			large: "32px",
		});

		const css = consume(s.root, s.options);

		expect(css).toBe(`:root {
	--padding: 16px;
	--padding--small: 8px;
	--padding--large: 32px;
}`);
	});

	describe("type safety", () => {
		it("should preserve exact variable names in return type", () => {
			const useMargin = createUseVariable("margin");
			const s = styleframe();
			const margins = useMargin(s, {
				default: "0",
				auto: "auto",
			});

			// Type assertions to verify the generic types are preserved
			const defaultMargin: Variable<"margin"> = margins.margin;
			const autoMargin: Variable<"margin--auto"> = margins.marginAuto;

			expect(defaultMargin.name).toBe("margin");
			expect(autoMargin.name).toBe("margin--auto");
		});

		it("should maintain type information for kebab-case names", () => {
			const useTransition = createUseVariable("transition");
			const s = styleframe();
			const { transitionFastEase } = useTransition(s, {
				"fast-ease": "200ms ease",
			});

			const typed: Variable<"transition--fast-ease"> = transitionFastEase;
			expect(typed.name).toBe("transition--fast-ease");
		});
	});

	describe("property name variations", () => {
		it("should work with single-word properties", () => {
			const useWidth = createUseVariable("width");
			const s = styleframe();
			const { width } = useWidth(s, { default: "100%" });

			expect(width.name).toBe("width");
		});

		it("should work with multi-word kebab-case properties", () => {
			const useBoxShadow = createUseVariable("box-shadow");
			const s = styleframe();
			const { boxShadow } = useBoxShadow(s, {
				default: "0 2px 4px rgba(0,0,0,0.1)",
			});

			expect(boxShadow.name).toBe("box-shadow");
		});

		it("should work with complex property names", () => {
			const useBorderTopLeftRadius = createUseVariable(
				"border-top-left-radius",
			);
			const s = styleframe();
			const { borderTopLeftRadius } = useBorderTopLeftRadius(s, {
				default: "4px",
			});

			expect(borderTopLeftRadius.name).toBe("border-top-left-radius");
		});
	});

	describe("propertyValueFn", () => {
		it("should transform values using propertyValueFn", () => {
			const useSize = createUseVariable("size", {
				transform: (value) => `${value}px`,
			});
			const s = styleframe();
			const { size, sizeLarge } = useSize(s, {
				default: "16",
				large: "32",
			});

			expect(size.value).toBe("16px");
			expect(sizeLarge.value).toBe("32px");
		});

		it("should transform string values to uppercase", () => {
			const useFont = createUseVariable("font", {
				transform: (value) => String(value).toUpperCase(),
			});
			const s = styleframe();
			const { font, fontBold } = useFont(s, {
				default: "arial",
				bold: "helvetica",
			});

			expect(font.value).toBe("ARIAL");
			expect(fontBold.value).toBe("HELVETICA");
		});

		it("should transform numeric values", () => {
			const useOpacity = createUseVariable("opacity", {
				transform: (value) => (typeof value === "number" ? value / 100 : value),
			});
			const s = styleframe();
			const { opacity, opacityHalf } = useOpacity(s, {
				default: 100,
				half: 50,
			});

			expect(opacity.value).toBe(1);
			expect(opacityHalf.value).toBe(0.5);
		});

		it("should wrap values in calc()", () => {
			const useSpacing = createUseVariable("spacing", {
				transform: (value) => `calc(${value} * var(--scale))`,
			});
			const s = styleframe();
			const { spacing, spacingDouble } = useSpacing(s, {
				default: "1rem",
				double: "2rem",
			});

			expect(spacing.value).toBe("calc(1rem * var(--scale))");
			expect(spacingDouble.value).toBe("calc(2rem * var(--scale))");
		});

		it("should add units to unitless values", () => {
			const usePadding = createUseVariable("padding", {
				transform: (value) => {
					if (typeof value === "number" || /^\d+$/.test(String(value))) {
						return `${value}px`;
					}
					return value;
				},
			});
			const s = styleframe();
			const { padding, paddingSmall } = usePadding(s, {
				default: "16",
				small: 8,
			});

			expect(padding.value).toBe("16px");
			expect(paddingSmall.value).toBe("8px");
		});

		it("should handle variable references in transformer", () => {
			const useColor = createUseVariable("color", {
				transform: (value) => {
					if (typeof value === "object" && value !== null && "type" in value) {
						return value; // Pass through variable references
					}
					return `rgb(${value})`;
				},
			});
			const s = styleframe();
			const baseColor = s.variable("base-color", "255, 0, 0");
			const { color, colorCustom } = useColor(s, {
				default: s.ref(baseColor),
				custom: "0, 255, 0",
			});

			expect(color.value).toEqual({
				type: "reference",
				name: "base-color",
				fallback: undefined,
			});
			expect(colorCustom.value).toBe("rgb(0, 255, 0)");
		});

		it("should preserve complex values through transformer", () => {
			const useShadow = createUseVariable("shadow", {
				transform: (value) => {
					if (String(value).includes("rgba")) {
						return value;
					}
					return `0 2px 4px ${value}`;
				},
			});
			const s = styleframe();
			const { shadow, shadowCustom } = useShadow(s, {
				default: "rgba(0, 0, 0, 0.1)",
				custom: "red",
			});

			expect(shadow.value).toBe("rgba(0, 0, 0, 0.1)");
			expect(shadowCustom.value).toBe("0 2px 4px red");
		});

		it("should compile transformed values to CSS correctly", () => {
			const useMargin = createUseVariable("margin", {
				transform: (value) => `${value}rem`,
			});
			const s = styleframe();
			useMargin(s, {
				default: "1",
				large: "2",
			});

			const css = consume(s.root, s.options);

			expect(css).toBe(`:root {
	--margin: 1rem;
	--margin--large: 2rem;
}`);
		});

		it("should use default identity function when not provided", () => {
			const useWidth = createUseVariable("width");
			const s = styleframe();
			const { width } = useWidth(s, {
				default: "100%",
			});

			expect(width.value).toBe("100%");
		});

		it("should transform all tokens consistently", () => {
			const useRounded = createUseVariable("border-radius", {
				transform: (value) => (value === "full" ? "9999px" : value),
			});
			const s = styleframe();
			const {
				borderRadius,
				borderRadiusSmall,
				borderRadiusMedium,
				borderRadiusFull,
			} = useRounded(s, {
				default: "0",
				small: "4px",
				medium: "8px",
				full: "full",
			});

			expect(borderRadius.value).toBe("0");
			expect(borderRadiusSmall.value).toBe("4px");
			expect(borderRadiusMedium.value).toBe("8px");
			expect(borderRadiusFull.value).toBe("9999px");
		});
	});

	describe("real-world use cases", () => {
		it("should replicate useFontFamily behavior", () => {
			const useFontFamily = createUseVariable("font-family");
			const s = styleframe();
			const { fontFamily, fontFamilyMono, fontFamilySerif } = useFontFamily(s, {
				default:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
				mono: "'SFMono-Regular', Menlo, Monaco, Consolas, monospace",
				serif: "'Georgia', 'Times New Roman', Times, serif",
			});

			expect(fontFamily.name).toBe("font-family");
			expect(fontFamilyMono.name).toBe("font-family--mono");
			expect(fontFamilySerif.name).toBe("font-family--serif");
		});

		it("should work for spacing scale", () => {
			const useSpacing = createUseVariable("spacing");
			const s = styleframe();
			const { spacing, spacingXs, spacingSm, spacingMd, spacingLg, spacingXl } =
				useSpacing(s, {
					default: "16px",
					xs: "4px",
					sm: "8px",
					md: "16px",
					lg: "24px",
					xl: "32px",
				});

			expect(spacing.value).toBe("16px");
			expect(spacingXs.value).toBe("4px");
			expect(spacingXl.value).toBe("32px");
		});

		it("should work for z-index scale", () => {
			const useZIndex = createUseVariable("z-index");
			const s = styleframe();
			const { zIndexDropdown, zIndexModal, zIndexTooltip } = useZIndex(s, {
				dropdown: "1000",
				modal: "2000",
				tooltip: "3000",
			});

			expect(zIndexDropdown.name).toBe("z-index--dropdown");
			expect(zIndexModal.name).toBe("z-index--modal");
			expect(zIndexTooltip.name).toBe("z-index--tooltip");
		});
	});
});
