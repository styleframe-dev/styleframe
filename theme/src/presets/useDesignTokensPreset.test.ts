import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	defaultColorsMetaConfig,
	useDesignTokensPreset,
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
				zIndex: false,
				colors: false,
				fontFamily: false,
				fontSize: false,
				fontStyle: false,
				fontWeight: false,
				lineHeight: false,
				letterSpacing: false,
				breakpoint: false,
				easing: false,
				duration: false,
			});

			expect(result.scale).toBeUndefined();
			expect(result.scalePowers).toBeUndefined();
			expect(result.spacing).toBeUndefined();
			expect(result.borderWidth).toBeUndefined();
			expect(result.borderRadius).toBeUndefined();
			expect(result.borderStyle).toBeUndefined();
			expect(result.boxShadow).toBeUndefined();
			expect(result.zIndex).toBeUndefined();
			expect(result.colors).toBeUndefined();
			expect(result.fontFamily).toBeUndefined();
			expect(result.fontSize).toBeUndefined();
			expect(result.fontStyle).toBeUndefined();
			expect(result.fontWeight).toBeUndefined();
			expect(result.lineHeight).toBeUndefined();
			expect(result.letterSpacing).toBeUndefined();
			expect(result.breakpoint).toBeUndefined();
			expect(result.easing).toBeUndefined();
			expect(result.duration).toBeUndefined();

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
						shadeLevels: { "shade-50": 5, "shade-100": 10 },
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
						tintLevels: { "tint-50": 5, "tint-100": 10 },
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

	describe("return value keys", () => {
		it("should return all default spacing keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.spacing.spacing;
			result.spacing.spacing2xs;
			result.spacing.spacingXs;
			result.spacing.spacingSm;
			result.spacing.spacingMd;
			result.spacing.spacingLg;
			result.spacing.spacingXl;
			result.spacing.spacing2xl;
			result.spacing.spacing3xl;

			// @ts-expect-error - spacingXxl is not a default key
			result.spacing.spacingXxl;
		});

		it("should return all default borderWidth keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.borderWidth.borderWidth;
			result.borderWidth.borderWidthNone;
			result.borderWidth.borderWidthThin;
			result.borderWidth.borderWidthMedium;
			result.borderWidth.borderWidthThick;

			// @ts-expect-error - borderWidthHeavy is not a default key
			result.borderWidth.borderWidthHeavy;
		});

		it("should return all default borderRadius keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.borderRadius.borderRadius;
			result.borderRadius.borderRadiusNone;
			result.borderRadius.borderRadiusSm;
			result.borderRadius.borderRadiusMd;
			result.borderRadius.borderRadiusLg;
			result.borderRadius.borderRadiusXl;
			result.borderRadius.borderRadius2xl;
			result.borderRadius.borderRadiusFull;

			// @ts-expect-error - borderRadius3xl is not a default key
			result.borderRadius.borderRadius3xl;
		});

		it("should return all default borderStyle keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.borderStyle.borderStyle;
			result.borderStyle.borderStyleNone;
			result.borderStyle.borderStyleSolid;
			result.borderStyle.borderStyleDashed;
			result.borderStyle.borderStyleDotted;
			result.borderStyle.borderStyleDouble;
			result.borderStyle.borderStyleGroove;
			result.borderStyle.borderStyleInset;
			result.borderStyle.borderStyleOutset;

			// @ts-expect-error - borderStyleRidge is not a default key
			result.borderStyle.borderStyleRidge;
		});

		it("should return all default boxShadow keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.boxShadow.boxShadow;
			result.boxShadow.boxShadowNone;
			result.boxShadow.boxShadowXs;
			result.boxShadow.boxShadowSm;
			result.boxShadow.boxShadowMd;
			result.boxShadow.boxShadowLg;
			result.boxShadow.boxShadowXl;
			result.boxShadow.boxShadow2xl;
			result.boxShadow.boxShadowInner;
			result.boxShadow.boxShadowRing;

			// @ts-expect-error - boxShadow3xl is not a default key
			result.boxShadow.boxShadow3xl;
		});

		it("should return all default fontFamily keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.fontFamily.fontFamily;
			result.fontFamily.fontFamilyBase;
			result.fontFamily.fontFamilyPrint;
			result.fontFamily.fontFamilyMono;

			// @ts-expect-error - fontFamilySans is not a default key
			result.fontFamily.fontFamilySans;
		});

		it("should return all default fontSize keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.fontSize.fontSize;
			result.fontSize.fontSize3xs;
			result.fontSize.fontSize2xs;
			result.fontSize.fontSizeXs;
			result.fontSize.fontSizeSm;
			result.fontSize.fontSizeMd;
			result.fontSize.fontSizeLg;
			result.fontSize.fontSizeXl;
			result.fontSize.fontSize2xl;
			result.fontSize.fontSize3xl;
			result.fontSize.fontSize4xl;

			// @ts-expect-error - fontSize5xl is not a default key
			result.fontSize.fontSize5xl;
		});

		it("should return all default fontStyle keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.fontStyle.fontStyle;
			result.fontStyle.fontStyleItalic;
			result.fontStyle.fontStyleOblique;
			result.fontStyle.fontStyleNormal;
			result.fontStyle.fontStyleInherit;

			// @ts-expect-error - fontStyleRevert is not a default key
			result.fontStyle.fontStyleRevert;
		});

		it("should return all default fontWeight keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.fontWeight.fontWeight;
			result.fontWeight.fontWeightExtralight;
			result.fontWeight.fontWeightLight;
			result.fontWeight.fontWeightNormal;
			result.fontWeight.fontWeightMedium;
			result.fontWeight.fontWeightSemibold;
			result.fontWeight.fontWeightBold;
			result.fontWeight.fontWeightBlack;
			result.fontWeight.fontWeightLighter;
			result.fontWeight.fontWeightBolder;
			result.fontWeight.fontWeightInherit;

			// @ts-expect-error - fontWeightThin is not a default key
			result.fontWeight.fontWeightThin;
		});

		it("should return all default lineHeight keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.lineHeight.lineHeight;
			result.lineHeight.lineHeightTight;
			result.lineHeight.lineHeightSnug;
			result.lineHeight.lineHeightNormal;
			result.lineHeight.lineHeightRelaxed;
			result.lineHeight.lineHeightLoose;

			// @ts-expect-error - lineHeightCompact is not a default key
			result.lineHeight.lineHeightCompact;
		});

		it("should return all default letterSpacing keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.letterSpacing.letterSpacing;
			result.letterSpacing.letterSpacingTighter;
			result.letterSpacing.letterSpacingTight;
			result.letterSpacing.letterSpacingNormal;
			result.letterSpacing.letterSpacingWide;
			result.letterSpacing.letterSpacingWider;

			// @ts-expect-error - letterSpacingWidest is not a default key
			result.letterSpacing.letterSpacingWidest;
		});

		it("should return all default scale keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.scale.scale;
			result.scale.scaleMinorSecond;
			result.scale.scaleMajorSecond;
			result.scale.scaleMinorThird;
			result.scale.scaleMajorThird;
			result.scale.scalePerfectFourth;
			result.scale.scaleAugmentedFourth;
			result.scale.scalePerfectFifth;
			result.scale.scaleGolden;

			// @ts-expect-error - scaleOctave is not a default key
			result.scale.scaleOctave;
		});

		it("should return all default breakpoint keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.breakpoint.breakpointXs;
			result.breakpoint.breakpointSm;
			result.breakpoint.breakpointMd;
			result.breakpoint.breakpointLg;
			result.breakpoint.breakpointXl;
			result.breakpoint.breakpoint2xl;
		});

		it("should return all default easing keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			result.easing.easingLinear;
			result.easing.easingEase;
			result.easing.easingEaseIn;
			result.easing.easingEaseOut;
			result.easing.easingEaseInOut;
			result.easing.easingEaseInSine;
			result.easing.easingEaseOutSine;
			result.easing.easingEaseInOutSine;
			result.easing.easingEaseInCubic;
			result.easing.easingEaseOutCubic;
			result.easing.easingEaseInOutCubic;
			result.easing.easingSpring;
			result.easing.easingBounce;

			// @ts-expect-error - easingSnap is not a default key
			result.easing.easingSnap;
		});

		it("should return all default color keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			result.colors.colorPrimary;
			result.colors.colorSecondary;
			result.colors.colorSuccess;
			result.colors.colorWarning;
			result.colors.colorDanger;
			result.colors.colorInfo;
			// @ts-expect-error - colorBrand is not a default key
			result.colors.colorBrand;
		});

		it("should return color lightness variation keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: true,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			result.colors.colorPrimary;
			result.colors.colorPrimary50;
			result.colors.colorPrimary100;
			result.colors.colorPrimary200;
			result.colors.colorPrimary300;
			result.colors.colorPrimary400;
			result.colors.colorPrimary500;
			result.colors.colorPrimary600;
			result.colors.colorPrimary700;
			result.colors.colorPrimary800;
			result.colors.colorPrimary900;
			result.colors.colorPrimary950;

			// @ts-expect-error - colorPrimary1000 is not a valid lightness level
			result.colors.colorPrimary1000;
		});

		it("should return color shade variation keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: true,
						generateTints: false,
					},
				},
			});

			result.colors.colorPrimary;
			result.colors.colorPrimaryShade50;
			result.colors.colorPrimaryShade100;
			result.colors.colorPrimaryShade150;
			result.colors.colorPrimaryShade200;

			// @ts-expect-error - colorPrimaryShade300 is not a valid shade level
			result.colors.colorPrimaryShade300;
		});

		it("should return color tint variation keys", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: true,
					},
				},
			});

			result.colors.colorPrimary;
			result.colors.colorPrimaryTint50;
			result.colors.colorPrimaryTint100;
			result.colors.colorPrimaryTint150;
			result.colors.colorPrimaryTint200;

			// @ts-expect-error - colorPrimaryTint300 is not a valid tint level
			result.colors.colorPrimaryTint300;
		});

		it("should return all variation keys for multiple colors", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { primary: "#007bff", danger: "#ef4444" },
			});

			// primary variations
			result.colors.colorPrimary;
			result.colors.colorPrimary500;
			result.colors.colorPrimaryShade100;
			result.colors.colorPrimaryTint100;

			// danger variations
			result.colors.colorDanger;
			result.colors.colorDanger500;
			result.colors.colorDangerShade100;
			result.colors.colorDangerTint100;

			// @ts-expect-error - colorSuccess is not in custom config
			result.colors.colorSuccess;
		});

		it("should return scalePowers when scale is enabled", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s);

			expect(result.scalePowers).toBeDefined();
			expect(result.scalePowers[-2]).toBeDefined();
			expect(result.scalePowers[-1]).toBeDefined();
			expect(result.scalePowers[0]).toBeDefined();
			expect(result.scalePowers[1]).toBeDefined();
			expect(result.scalePowers[2]).toBeDefined();
			expect(result.scalePowers[3]).toBeDefined();
			expect(result.scalePowers[4]).toBeDefined();
			expect(result.scalePowers[5]).toBeDefined();
		});

		it("should type scalePowers as undefined when scale is disabled", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				scale: false,
			});

			expect(result.scalePowers).toBeUndefined();
		});

		it("should type colors as undefined when colors is disabled", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: false,
			});

			expect(result.colors).toBeUndefined();

			// @ts-expect-error - colors is undefined when disabled
			const _colorsCheck: Record<string, unknown> = result.colors;
		});
	});

	describe("themes", () => {
		it("should create a theme block with color overrides", () => {
			const s = styleframe();
			useDesignTokensPreset(s, {
				colors: { primary: "#007bff", secondary: "#6c757d" },
				themes: {
					dark: {
						colors: { primary: "#60a5fa", secondary: "#cbd5e1" },
					},
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(":root");
			expect(css).toContain("--color--primary");
			expect(css).toContain('[data-theme="dark"]');

			expect(s.root.themes).toHaveLength(1);
			expect(s.root.themes[0]!.name).toBe("dark");
			expect(s.root.themes[0]!.variables.length).toBeGreaterThan(0);
		});

		it("should create a theme block with spacing overrides", () => {
			const s = styleframe();
			useDesignTokensPreset(s, {
				spacing: { default: "1rem", sm: "0.5rem", lg: "2rem" },
				themes: {
					compact: {
						spacing: { default: "0.75rem", sm: "0.25rem", lg: "1.5rem" },
					},
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain('[data-theme="compact"]');
			expect(s.root.themes).toHaveLength(2);
			expect(s.root.themes.map((t) => t.name)).toContain("compact");
			expect(s.root.themes.map((t) => t.name)).toContain("dark");
		});

		it("should support multiple themes", () => {
			const s = styleframe();
			useDesignTokensPreset(s, {
				colors: { primary: "#007bff" },
				themes: {
					dark: {
						colors: { primary: "#60a5fa" },
					},
					high_contrast: {
						colors: { primary: "#0000ff" },
					},
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			expect(s.root.themes).toHaveLength(2);
			expect(s.root.themes.map((t) => t.name)).toContain("dark");
			expect(s.root.themes.map((t) => t.name)).toContain("high_contrast");

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain('[data-theme="dark"]');
			expect(css).toContain('[data-theme="high_contrast"]');
		});

		it("should use themes.default to fill in undefined root-level config", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				themes: {
					default: {
						colors: { primary: "#ff6600", secondary: "#333" },
						spacing: {
							default: "0.5rem",
							sm: "0.25rem",
						},
					},
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			// Colors and spacing should have been created at root level
			expect(result.colors).toBeDefined();
			expect(result.spacing).toBeDefined();

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--color--primary");
			expect(css).toContain("--spacing--sm");
			// themes.default should NOT create a [data-theme="default"] block
			expect(css).not.toContain('[data-theme="default"]');
		});

		it("should give root-level config precedence over themes.default", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: { brand: "#ff0000" },
				themes: {
					default: {
						colors: { primary: "#007bff" },
					},
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			// Root-level colors should win (brand, not primary)
			const colorKeys = Object.keys(result.colors || {});
			expect(colorKeys).toContain("colorBrand");
			expect(colorKeys).not.toContain("colorPrimary");
		});

		it("should create domain-level default themes when themes is empty", () => {
			const s = styleframe();
			useDesignTokensPreset(s, {
				themes: {},
			});

			expect(s.root.themes).toHaveLength(1);
			expect(s.root.themes[0]!.name).toBe("dark");
		});

		it("should create domain-level default themes when themes only has default", () => {
			const s = styleframe();
			useDesignTokensPreset(s, {
				themes: {
					default: {
						colors: { primary: "#007bff" },
					},
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			expect(s.root.themes).toHaveLength(1);
			expect(s.root.themes[0]!.name).toBe("dark");
		});

		it("should work with themes.default and additional themes together", () => {
			const s = styleframe();
			useDesignTokensPreset(s, {
				themes: {
					default: {
						colors: {
							primary: "#ff6600",
							secondary: "#333",
							accent: "#00bcd4",
						},
						spacing: {
							default: "0.5rem",
							sm: "0.25rem",
							md: "0.5rem",
							lg: "1rem",
						},
					},
					dark: {
						colors: {
							primary: "#ff6600",
							secondary: "#fff",
							accent: "#00bcd4",
						},
					},
				},
				meta: {
					colors: {
						generateLightness: false,
						generateShades: false,
						generateTints: false,
					},
				},
			});

			// Root should have colors and spacing
			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--color--primary");
			expect(css).toContain("--spacing--sm");

			// Dark theme should exist
			expect(s.root.themes).toHaveLength(1);
			expect(s.root.themes[0]!.name).toBe("dark");
			expect(css).toContain('[data-theme="dark"]');
		});

		it("should not apply theme overrides for domains disabled at root level", () => {
			const s = styleframe();
			const result = useDesignTokensPreset(s, {
				colors: false,
				themes: {
					dark: {
						colors: { primary: "#60a5fa" },
					},
				},
			});

			// Colors are disabled at root level
			expect(result.colors).toBeUndefined();

			// The dark theme still exists but only has color overrides
			expect(s.root.themes).toHaveLength(1);
		});
	});
});
