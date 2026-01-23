import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	defaultColorsMetaConfig,
	useDesignTokensPreset,
	type DesignTokensPresetConfig,
} from "./useDesignTokensPreset";

describe("useDesignTokensPreset", () => {
	describe("basic functionality", () => {
		it("should create all default design tokens when called with no config", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			expect(result.scale).toBeDefined();
			expect(result.scalePowers).toBeDefined();
			expect(result.spacing).toBeDefined();
			expect(result.borderWidth).toBeDefined();
			expect(result.borderRadius).toBeDefined();
			expect(result.borderStyle).toBeDefined();
			expect(result.boxShadow).toBeDefined();
			expect(result.colors).toBeDefined();
			expect(result.fontFamily).toBeDefined();
			expect(result.fontSize).toBeDefined();
			expect(result.fontStyle).toBeDefined();
			expect(result.fontWeight).toBeDefined();
			expect(result.lineHeight).toBeDefined();
			expect(result.letterSpacing).toBeDefined();
			expect(result.breakpoint).toBeDefined();
			expect(result.easing).toBeDefined();
		});

		it("should create all default design tokens when called with empty config", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {});

			expect(result.scale).toBeDefined();
			expect(result.spacing).toBeDefined();
			expect(result.colors).toBeDefined();
			expect(result.fontFamily).toBeDefined();
		});

		it("should add variables to root", () => {
			const s = styleframe();
			useDesignTokensPreset(s);

			expect(s.root.variables.length).toBeGreaterThan(0);
		});

		it("should generate CSS output", () => {
			const s = styleframe();
			useDesignTokensPreset(s);

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(":root");
			expect(css).toContain("--spacing");
			expect(css).toContain("--color");
			expect(css).toContain("--font-size");
		});
	});

	describe("disabling domains", () => {
		it("should disable scale when scale is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: false,
			});

			expect(result.scale).toBeUndefined();
			expect(result.scalePowers).toBeUndefined();
		});

		it("should disable spacing when spacing is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: false,
			});

			expect(result.spacing).toBeUndefined();
		});

		it("should disable border tokens when set to false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				borderWidth: false,
				borderRadius: false,
				borderStyle: false,
			});

			expect(result.borderWidth).toBeUndefined();
			expect(result.borderRadius).toBeUndefined();
			expect(result.borderStyle).toBeUndefined();
		});

		it("should disable boxShadow when boxShadow is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				boxShadow: false,
			});

			expect(result.boxShadow).toBeUndefined();
		});

		it("should disable colors when colors is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: false,
			});

			expect(result.colors).toBeUndefined();
		});

		it("should disable typography tokens when set to false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				fontFamily: false,
				fontSize: false,
				fontStyle: false,
				fontWeight: false,
				lineHeight: false,
				letterSpacing: false,
			});

			expect(result.fontFamily).toBeUndefined();
			expect(result.fontSize).toBeUndefined();
			expect(result.fontStyle).toBeUndefined();
			expect(result.fontWeight).toBeUndefined();
			expect(result.lineHeight).toBeUndefined();
			expect(result.letterSpacing).toBeUndefined();
		});

		it("should disable breakpoint when breakpoint is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				breakpoint: false,
			});

			expect(result.breakpoint).toBeUndefined();
		});

		it("should disable easing when easing is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				easing: false,
			});

			expect(result.easing).toBeUndefined();
		});

		it("should disable all domains when all set to false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: false,
				spacing: false,
				borderWidth: false,
				borderRadius: false,
				borderStyle: false,
				boxShadow: false,
				colors: false,
				fontFamily: false,
				fontSize: false,
				fontStyle: false,
				fontWeight: false,
				lineHeight: false,
				letterSpacing: false,
				breakpoint: false,
				easing: false,
			});

			expect(result.scale).toBeUndefined();
			expect(result.scalePowers).toBeUndefined();
			expect(result.spacing).toBeUndefined();
			expect(result.borderWidth).toBeUndefined();
			expect(result.borderRadius).toBeUndefined();
			expect(result.borderStyle).toBeUndefined();
			expect(result.boxShadow).toBeUndefined();
			expect(result.colors).toBeUndefined();
			expect(result.fontFamily).toBeUndefined();
			expect(result.fontSize).toBeUndefined();
			expect(result.fontStyle).toBeUndefined();
			expect(result.fontWeight).toBeUndefined();
			expect(result.lineHeight).toBeUndefined();
			expect(result.letterSpacing).toBeUndefined();
			expect(result.breakpoint).toBeUndefined();
			expect(result.easing).toBeUndefined();

			expect(s.root.variables).toHaveLength(0);
		});
	});

	describe("custom values", () => {
		it("should use custom spacing values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: {
					default: "1rem",
					sm: "0.5rem",
					lg: "2rem",
				},
			});

			expect(result.spacing?.spacing).toBeDefined();
			expect(result.spacing?.spacingSm).toBeDefined();
			expect(result.spacing?.spacingLg).toBeDefined();
		});

		it("should use custom color values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: {
					primary: "#ff6600",
					secondary: "#333333",
				},
			});

			expect(result.colors?.colorPrimary).toBeDefined();
			expect(result.colors?.colorSecondary).toBeDefined();
		});

		it("should use custom borderRadius values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				borderRadius: {
					default: "4px",
					sm: "2px",
					lg: "8px",
				},
			});

			expect(result.borderRadius?.borderRadius).toBeDefined();
			expect(result.borderRadius?.borderRadiusSm).toBeDefined();
			expect(result.borderRadius?.borderRadiusLg).toBeDefined();
		});

		it("should use custom fontSize values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				fontSize: {
					default: "1rem",
					sm: "0.875rem",
					lg: "1.25rem",
				},
			});

			expect(result.fontSize?.fontSize).toBeDefined();
			expect(result.fontSize?.fontSizeSm).toBeDefined();
			expect(result.fontSize?.fontSizeLg).toBeDefined();
		});

		it("should use custom breakpoint values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				breakpoint: {
					sm: 576,
					md: 768,
					lg: 1024,
				},
			});

			expect(result.breakpoint?.breakpointSm).toBeDefined();
			expect(result.breakpoint?.breakpointMd).toBeDefined();
			expect(result.breakpoint?.breakpointLg).toBeDefined();
		});

		it("should use custom scale values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: {
					default: "1.25",
				},
			});

			expect(result.scale?.scale).toBeDefined();
		});

		it("should use custom scalePowers", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scalePowers: [-2, -1, 0, 1, 2],
			});

			expect(result.scalePowers).toBeDefined();
			expect(Object.keys(result.scalePowers!)).toContain("-2");
			expect(Object.keys(result.scalePowers!)).toContain("2");
		});

		it("should use custom easing values", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				easing: {
					default: "ease",
					linear: "linear",
				},
			});

			expect(result.easing?.easing).toBeDefined();
			expect(result.easing?.easingLinear).toBeDefined();
		});
	});

	describe("meta.colors configuration", () => {
		it("should generate color lightness variations by default", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
			});

			const colorNames = Object.keys(result.colors || {});
			const lightnessVariations = colorNames.filter((name) =>
				/colorPrimary\d+/.test(name),
			);
			expect(lightnessVariations.length).toBeGreaterThan(0);
		});

		it("should generate color shades by default", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
			});

			const colorNames = Object.keys(result.colors || {});
			const shadeVariations = colorNames.filter((name) =>
				/colorPrimaryShade/.test(name),
			);
			expect(shadeVariations.length).toBeGreaterThan(0);
		});

		it("should generate color tints by default", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
			});

			const colorNames = Object.keys(result.colors || {});
			const tintVariations = colorNames.filter((name) =>
				/colorPrimaryTint/.test(name),
			);
			expect(tintVariations.length).toBeGreaterThan(0);
		});

		it("should not generate lightness when generateLightness is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: false,
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			const lightnessVariations = colorNames.filter((name) =>
				/colorPrimary\d+/.test(name),
			);
			expect(lightnessVariations.length).toBe(0);
		});

		it("should not generate shades when generateShades is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateShades: false,
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			const shadeVariations = colorNames.filter((name) =>
				/colorPrimaryShade/.test(name),
			);
			expect(shadeVariations.length).toBe(0);
		});

		it("should not generate tints when generateTints is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateTints: false,
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			const tintVariations = colorNames.filter((name) =>
				/colorPrimaryTint/.test(name),
			);
			expect(tintVariations.length).toBe(0);
		});

		it("should use custom lightness levels", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: true,
						generateShades: false,
						generateTints: false,
						lightnessLevels: { 100: 10, 500: 50, 900: 90 },
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			expect(colorNames).toContain("colorPrimary100");
			expect(colorNames).toContain("colorPrimary500");
			expect(colorNames).toContain("colorPrimary900");
		});

		it("should use custom shade levels", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: true,
						generateTints: false,
						shadeLevels: { 50: 5, 100: 10 },
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			expect(colorNames).toContain("colorPrimaryShade50");
			expect(colorNames).toContain("colorPrimaryShade100");
		});

		it("should use custom tint levels", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: true,
						tintLevels: { 50: 5, 100: 10 },
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			expect(colorNames).toContain("colorPrimaryTint50");
			expect(colorNames).toContain("colorPrimaryTint100");
		});

		it("should disable all color variations", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			const colorNames = Object.keys(result.colors || {});
			expect(colorNames).toEqual(["colorPrimary"]);
		});
	});

	describe("using defaults when domains are omitted", () => {
		it("should use defaults when domain is omitted", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				// All domains omitted - should use defaults
			});

			expect(result.spacing).toBeDefined();
			expect(result.colors).toBeDefined();
			expect(result.scale).toBeDefined();
		});
	});

	describe("defaultColorsMetaConfig", () => {
		it("should have correct default values", () => {
			expect(defaultColorsMetaConfig.generateLightness).toBe(true);
			expect(defaultColorsMetaConfig.generateShades).toBe(true);
			expect(defaultColorsMetaConfig.generateTints).toBe(true);
			expect(defaultColorsMetaConfig.lightnessLevels).toBeDefined();
			expect(defaultColorsMetaConfig.shadeLevels).toBeDefined();
			expect(defaultColorsMetaConfig.tintLevels).toBeDefined();
		});
	});

	describe("integration", () => {
		it("should create a working design system with custom colors and spacing", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: {
					primary: "#006cff",
					secondary: "#6b7280",
				},
				spacing: {
					default: "@md",
					sm: "0.5rem",
					md: "1rem",
					lg: "2rem",
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			expect(result.colors?.colorPrimary).toBeDefined();
			expect(result.colors?.colorSecondary).toBeDefined();
			expect(result.spacing?.spacingSm).toBeDefined();
			expect(result.spacing?.spacingMd).toBeDefined();
			expect(result.spacing?.spacingLg).toBeDefined();

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--color--primary");
			expect(css).toContain("--color--secondary");
			expect(css).toContain("--spacing--sm");
			expect(css).toContain("--spacing--md");
			expect(css).toContain("--spacing--lg");
		});

		it("should allow using variables from preset in selectors", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: {
					default: "1rem",
					md: "1rem",
				},
				colors: {
					primary: "#006cff",
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			s.selector(".button", {
				padding: s.ref(result.spacing.spacingMd),
				backgroundColor: s.ref(result.colors.colorPrimary),
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("padding: var(--spacing--md)");
			expect(css).toContain("background-color: var(--color--primary)");
		});

		it("should work with minimal configuration", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: false,
				borderWidth: false,
				borderRadius: false,
				borderStyle: false,
				boxShadow: false,
				fontFamily: false,
				fontStyle: false,
				fontWeight: false,
				lineHeight: false,
				letterSpacing: false,
				breakpoint: false,
				easing: false,
				spacing: { default: "1rem" },
				colors: { primary: "#000" },
				fontSize: { default: "1rem" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			expect(result.spacing).toBeDefined();
			expect(result.colors).toBeDefined();
			expect(result.fontSize).toBeDefined();

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--spacing");
			expect(css).toContain("--color--primary");
			expect(css).toContain("--font-size");
		});
	});

	describe("edge cases", () => {
		it("should handle multiple colors with variations", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: {
					primary: "#007bff",
					secondary: "#6c757d",
					success: "#28a745",
				},
			});

			// Should have base colors
			expect(result.colors?.colorPrimary).toBeDefined();
			expect(result.colors?.colorSecondary).toBeDefined();
			expect(result.colors?.colorSuccess).toBeDefined();

			// Should have variations for each
			const colorNames = Object.keys(result.colors || {});
			expect(colorNames.some((n) => n.startsWith("colorPrimary"))).toBe(true);
			expect(colorNames.some((n) => n.startsWith("colorSecondary"))).toBe(true);
			expect(colorNames.some((n) => n.startsWith("colorSuccess"))).toBe(true);
		});

		it("should handle empty custom values object", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: {},
			});

			expect(result.spacing).toEqual({});
		});

		it("should not create scalePowers when scale doesn't include scale variable", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: {
					base: "1.25",
				},
			});

			expect(result.scale?.scaleBase).toBeDefined();
			expect(result.scalePowers).toBeUndefined();
		});
	});

	describe("type checking", () => {
		it("should accept valid config types", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: { default: "1rem" },
				colors: { primary: "#000" },
				borderRadius: { default: "4px" },
				// scale: omitted - uses defaults
				easing: false,
			});

			expect(result).toBeDefined();
		});
	});

	describe("type safety", () => {
		it("should infer custom spacing keys in return type", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: { sm: "0.5rem", md: "1rem" },
			});

			// These should compile and exist
			expect(result.spacing.spacingSm).toBeDefined();
			expect(result.spacing.spacingMd).toBeDefined();

			// @ts-expect-error - spacingLg is not in custom config
			result.spacing.spacingLg;
		});

		it("should type disabled domains as undefined", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: false,
				spacing: false,
			});

			// Type checks - these lines verify the type is undefined
			// @ts-expect-error - colors is undefined when disabled
			const _colorsCheck: Record<string, unknown> = result.colors;

			// @ts-expect-error - spacing is undefined when disabled
			const _spacingCheck: Record<string, unknown> = result.spacing;

			// Runtime checks
			expect(result.colors).toBeUndefined();
			expect(result.spacing).toBeUndefined();
		});

		it("should include default keys when domain is omitted", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			// All default keys should be present for all domains
			expect(result.spacing.spacing).toBeDefined();
			expect(result.spacing.spacingMd).toBeDefined();
			expect(result.borderRadius.borderRadius).toBeDefined();
			expect(result.borderRadius.borderRadiusMd).toBeDefined();
			expect(result.fontSize.fontSize).toBeDefined();
			expect(result.fontSize.fontSizeMd).toBeDefined();
		});

		it("should infer custom borderRadius keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				borderRadius: { none: "0", sm: "2px", xl: "16px" },
			});

			expect(result.borderRadius.borderRadiusNone).toBeDefined();
			expect(result.borderRadius.borderRadiusSm).toBeDefined();
			expect(result.borderRadius.borderRadiusXl).toBeDefined();

			// @ts-expect-error - borderRadiusMd is not in custom config
			result.borderRadius.borderRadiusMd;
		});

		it("should infer custom fontSize keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				fontSize: { xs: "0.75rem", base: "1rem" },
			});

			expect(result.fontSize.fontSizeXs).toBeDefined();
			expect(result.fontSize.fontSizeBase).toBeDefined();

			// @ts-expect-error - fontSizeLg is not in custom config
			result.fontSize.fontSizeLg;
		});

		it("should infer custom breakpoint keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				breakpoint: { mobile: 480, tablet: 768, desktop: 1024 },
			});

			expect(result.breakpoint.breakpointMobile).toBeDefined();
			expect(result.breakpoint.breakpointTablet).toBeDefined();
			expect(result.breakpoint.breakpointDesktop).toBeDefined();

			// @ts-expect-error - breakpointSm is not in custom config
			result.breakpoint.breakpointSm;
		});

		it("should infer custom easing keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				easing: {
					linear: "linear",
					bounce: "cubic-bezier(0.68, -0.55, 0.27, 1.55)",
				},
			});

			expect(result.easing.easingLinear).toBeDefined();
			expect(result.easing.easingBounce).toBeDefined();

			// @ts-expect-error - easingEaseIn is not in custom config
			result.easing.easingEaseIn;
		});

		it("should type scalePowers as undefined when scale is false", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: false,
			});

			expect(result.scale).toBeUndefined();
			expect(result.scalePowers).toBeUndefined();
		});

		it("should allow mixed disabled and custom domains", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				spacing: { sm: "0.5rem" },
				borderRadius: false,
				colors: { brand: "#ff0000" },
				easing: false,
			});

			// Custom spacing works
			expect(result.spacing.spacingSm).toBeDefined();
			// @ts-expect-error - spacingMd is not in custom config
			result.spacing.spacingMd;

			// borderRadius is disabled - type check
			expect(result.borderRadius).toBeUndefined();

			// colors is strongly typed for base colors
			expect(result.colors.colorBrand).toBeDefined();
			// @ts-expect-error - colorPrimary is not in custom config
			result.colors.colorPrimary;

			// easing is disabled - type check
			expect(result.easing).toBeUndefined();
		});

		it("should infer custom colors keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff", secondary: "#6c757d", accent: "#ff6600" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			// Base colors are strongly typed
			expect(result.colors.colorPrimary).toBeDefined();
			expect(result.colors.colorSecondary).toBeDefined();
			expect(result.colors.colorAccent).toBeDefined();

			// @ts-expect-error - colorBrand is not in custom config
			result.colors.colorBrand;
		});

		it("should include default color keys when colors is omitted", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				// colors: omitted - uses defaults
			});

			// Default color keys should exist
			expect(result.colors.colorPrimary).toBeDefined();
			expect(result.colors.colorSecondary).toBeDefined();
			expect(result.colors.colorSuccess).toBeDefined();
			expect(result.colors.colorWarning).toBeDefined();
			expect(result.colors.colorDanger).toBeDefined();
		});

		it("should allow access to color variations via type assertion", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
			});

			// Base colors are strongly typed
			expect(result.colors.colorPrimary).toBeDefined();

			const colorsWithVariations = result.colors;
			expect(colorsWithVariations.colorPrimary100).toBeDefined();
			expect(colorsWithVariations.colorPrimaryShade50).toBeDefined();
			expect(colorsWithVariations.colorPrimaryTint50).toBeDefined();

			// @ts-expect-error 1500 is not a valid tint
			expect(colorsWithVariations.colorPrimaryTint1500).not.toBeDefined();
		});

		it("should infer custom fontWeight keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				fontWeight: { light: "300", regular: "400", bold: "700" },
			});

			expect(result.fontWeight.fontWeightLight).toBeDefined();
			expect(result.fontWeight.fontWeightRegular).toBeDefined();
			expect(result.fontWeight.fontWeightBold).toBeDefined();

			// @ts-expect-error - fontWeightMedium is not in custom config
			result.fontWeight.fontWeightMedium;
		});

		it("should infer custom lineHeight keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				lineHeight: { tight: "1.25", normal: "1.5", loose: "2" },
			});

			expect(result.lineHeight.lineHeightTight).toBeDefined();
			expect(result.lineHeight.lineHeightNormal).toBeDefined();
			expect(result.lineHeight.lineHeightLoose).toBeDefined();

			// @ts-expect-error - lineHeightRelaxed is not in custom config
			result.lineHeight.lineHeightRelaxed;
		});
	});
});
