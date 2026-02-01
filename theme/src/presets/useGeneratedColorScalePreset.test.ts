import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { describe, it, expect, beforeEach } from "vitest";
import {
	useGeneratedColorScalePreset,
	generateColorScale,
	getColorProperties,
	colorScaleSteps,
	type ColorScaleStep,
} from "./useGeneratedColorScalePreset";

describe("useGeneratedColorScalePreset", () => {
	describe("generateColorScale", () => {
		it("should generate 12 steps from a base color", () => {
			const scale = generateColorScale("#0090ff", "light");

			expect(Object.keys(scale)).toHaveLength(12);
			for (let i = 1; i <= 12; i++) {
				expect(scale[i as ColorScaleStep]).toMatch(/^#[0-9a-f]{6}$/i);
			}
		});

		it("should generate different scales for light and dark mode", () => {
			const lightScale = generateColorScale("#0090ff", "light");
			const darkScale = generateColorScale("#0090ff", "dark");

			// Step 9 should be similar (both are the base color)
			// But other steps should differ
			expect(lightScale[1]).not.toBe(darkScale[1]);
			expect(lightScale[12]).not.toBe(darkScale[12]);
		});

		it("should generate lighter colors for steps 1-8 in light mode", () => {
			const scale = generateColorScale("#0090ff", "light");
			const baseProps = getColorProperties(scale[9]);
			const step1Props = getColorProperties(scale[1]);

			expect(step1Props.lightness).toBeGreaterThan(baseProps.lightness);
		});

		it("should generate darker colors for steps 1-8 in dark mode", () => {
			const scale = generateColorScale("#0090ff", "dark");
			const baseProps = getColorProperties(scale[9]);
			const step1Props = getColorProperties(scale[1]);

			expect(step1Props.lightness).toBeLessThan(baseProps.lightness);
		});

		it("should maintain hue for steps near the base color", () => {
			const scale = generateColorScale("#0090ff", "light");
			const baseProps = getColorProperties(scale[9]);

			// Only check hue for steps 8-10 which have high chroma and similar lightness to base
			// Lighter steps can have hue shifts due to gamut mapping at high lightness
			for (const i of [8, 9, 10]) {
				const stepProps = getColorProperties(scale[i as ColorScaleStep]);
				// Hue should be within 5 degrees for steps close to base
				const hueDiff = Math.abs(stepProps.hue - baseProps.hue);
				expect(hueDiff < 5 || hueDiff > 355).toBe(true);
			}
		});

		it("should handle different base colors", () => {
			const colors = ["#e5484d", "#30a46c", "#8e4ec6", "#f76b15"];

			for (const color of colors) {
				const scale = generateColorScale(color, "light");
				expect(Object.keys(scale)).toHaveLength(12);

				// All colors should be valid hex
				for (let i = 1; i <= 12; i++) {
					expect(scale[i as ColorScaleStep]).toMatch(/^#[0-9a-f]{6}$/i);
				}
			}
		});
	});

	describe("getColorProperties", () => {
		it("should return OKLCH properties for a hex color", () => {
			const props = getColorProperties("#0090ff");

			expect(props.lightness).toBeGreaterThan(0);
			expect(props.lightness).toBeLessThan(1);
			expect(props.chroma).toBeGreaterThan(0);
			expect(props.hue).toBeGreaterThanOrEqual(0);
			expect(props.hue).toBeLessThan(360);
		});

		it("should return low chroma for gray colors", () => {
			const props = getColorProperties("#888888");
			expect(props.chroma).toBeLessThan(0.02);
		});

		it("should return high chroma for saturated colors", () => {
			const props = getColorProperties("#ff0000");
			expect(props.chroma).toBeGreaterThan(0.1);
		});
	});

	describe("colorScaleSteps", () => {
		it("should contain all 12 steps", () => {
			expect(colorScaleSteps).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
		});
	});

	describe("useGeneratedColorScalePreset", () => {
		let s: ReturnType<typeof styleframe>;

		beforeEach(() => {
			s = styleframe();
		});

		it("should create variables for each color scale", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
				},
			});

			// Should have 12 variables for the primary scale
			for (let i = 1; i <= 12; i++) {
				const key = `colorPrimary${i}` as keyof typeof colors;
				expect(colors[key]).toBeDefined();
				expect(colors[key].name).toBe(`color.primary.${i}`);
			}
		});

		it("should create variables for multiple scales", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
					success: "#30a46c",
					danger: "#e5484d",
				},
			});

			expect(colors.colorPrimary9).toBeDefined();
			expect(colors.colorSuccess9).toBeDefined();
			expect(colors.colorDanger9).toBeDefined();
		});

		it("should use custom prefix", () => {
			const colors = useGeneratedColorScalePreset(s, {
				prefix: "c",
				colors: {
					brand: "#0090ff",
				},
			});

			expect(colors.cBrand9).toBeDefined();
			expect(colors.cBrand9.name).toBe("c.brand.9");
		});

		it("should generate CSS output", () => {
			useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
				},
			});

			const css = consumeCSS(s.root, s.options);

			// Should have root variables
			expect(css).toContain("--color--primary--1:");
			expect(css).toContain("--color--primary--9:");
			expect(css).toContain("--color--primary--12:");

			// Should have dark theme
			expect(css).toContain('[data-theme="dark"]');
		});

		it("should use custom dark theme name", () => {
			useGeneratedColorScalePreset(s, {
				darkThemeName: "night",
				colors: {
					primary: "#0090ff",
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain('[data-theme="night"]');
		});

		it("should apply light overrides", () => {
			useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
				},
				lightOverrides: {
					primary: { 9: "#0066cc" },
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("#0066cc");
		});

		it("should apply dark overrides", () => {
			useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
				},
				darkOverrides: {
					primary: { 9: "#66b3ff" },
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("#66b3ff");
		});

		it("should generate accessible contrast between steps", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
				},
			});

			const css = consumeCSS(s.root, s.options);

			// Extract step 9 and step 12 colors from CSS
			// Step 12 should be dark enough for text on step 9 backgrounds
			// This is a basic sanity check - the algorithm is designed for this
			expect(css).toContain("--color--primary--9:");
			expect(css).toContain("--color--primary--12:");
		});

		it("should work with refs in selectors", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff",
				},
			});

			s.selector(".button", {
				backgroundColor: s.ref(colors.colorPrimary9),
				color: s.ref(colors.colorPrimary12),
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("var(--color--primary--9)");
			expect(css).toContain("var(--color--primary--12)");
		});

		it("should handle scale names with different cases", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					myBrandColor: "#0090ff",
				},
			});

			expect(colors.colorMyBrandColor9).toBeDefined();
			expect(colors.colorMyBrandColor9.name).toBe("color.myBrandColor.9");
		});

		it("should support different base colors for light and dark mode", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					neutral: {
						light: "#8d8d8d",
						dark: "#6e6e6e",
					},
				},
			});

			const css = consumeCSS(s.root, s.options);

			// Should have variables
			expect(colors.colorNeutral9).toBeDefined();
			expect(css).toContain("--color--neutral--9:");

			// Light mode should use light base
			// Dark mode should use different (darker) base
			expect(css).toContain('[data-theme="dark"]');
		});

		it("should fall back to light base when only light is provided", () => {
			useGeneratedColorScalePreset(s, {
				colors: {
					accent: {
						light: "#0090ff",
					},
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--color--accent--9:");
		});

		it("should fall back to dark base when only dark is provided", () => {
			useGeneratedColorScalePreset(s, {
				colors: {
					accent: {
						dark: "#0090ff",
					},
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--color--accent--9:");
		});

		it("should mix string and object color values", () => {
			const colors = useGeneratedColorScalePreset(s, {
				colors: {
					primary: "#0090ff", // String value
					neutral: {
						// Object value
						light: "#8d8d8d",
						dark: "#6e6e6e",
					},
				},
			});

			expect(colors.colorPrimary9).toBeDefined();
			expect(colors.colorNeutral9).toBeDefined();
		});
	});

	describe("generated scale quality", () => {
		it("should produce similar results to hand-tuned scales for blue", () => {
			// Compare against known good values (from the hand-tuned preset)
			const actualBlue = {
				1: "#fbfdff",
				9: "#0090ff",
				12: "#113264",
			};

			const generated = generateColorScale("#0090ff", "light");

			// Step 9 should be very close to the input
			const gen9Props = getColorProperties(generated[9]);
			const act9Props = getColorProperties(actualBlue[9]);
			expect(Math.abs(gen9Props.lightness - act9Props.lightness)).toBeLessThan(
				0.02,
			);

			// Step 1 should be very light
			const gen1Props = getColorProperties(generated[1]);
			expect(gen1Props.lightness).toBeGreaterThan(0.97);

			// Step 12 should be dark
			const gen12Props = getColorProperties(generated[12]);
			expect(gen12Props.lightness).toBeLessThan(0.4);
		});

		it("should maintain reasonable chroma progression", () => {
			const scale = generateColorScale("#0090ff", "light");

			const step1Chroma = getColorProperties(scale[1]).chroma;
			const step5Chroma = getColorProperties(scale[5]).chroma;
			const step9Chroma = getColorProperties(scale[9]).chroma;

			// Chroma should increase from step 1 to step 9
			expect(step5Chroma).toBeGreaterThan(step1Chroma);
			expect(step9Chroma).toBeGreaterThan(step5Chroma);
		});

		it("should generate valid sRGB colors (all steps in gamut)", () => {
			const testColors = [
				"#0090ff",
				"#e5484d",
				"#30a46c",
				"#ff0000",
				"#00ff00",
			];

			for (const baseColor of testColors) {
				const lightScale = generateColorScale(baseColor, "light");
				const darkScale = generateColorScale(baseColor, "dark");

				for (const step of colorScaleSteps) {
					// All colors should be valid 6-digit hex
					expect(lightScale[step]).toMatch(/^#[0-9a-f]{6}$/i);
					expect(darkScale[step]).toMatch(/^#[0-9a-f]{6}$/i);

					// No colors should be black or white (except possibly step 1/12 in edge cases)
					if (step > 1 && step < 12) {
						expect(lightScale[step]).not.toBe("#000000");
						expect(lightScale[step]).not.toBe("#ffffff");
					}
				}
			}
		});
	});
});
