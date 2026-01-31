import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	useColorVariablesPreset,
	colorScales,
	colorSteps,
	lightColors,
	darkColors,
	lightAlphaColors,
	darkAlphaColors,
	essentialColorScales,
	neutralColorScales,
} from "./useColorVariablesPreset";

describe("useColorVariablesPreset", () => {
	describe("basic functionality", () => {
		it("should create all solid color variables when called with no config", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s);

			// Check that all scales and steps are created
			for (const scale of colorScales) {
				for (const step of colorSteps) {
					const key =
						`color${scale.charAt(0).toUpperCase() + scale.slice(1)}${step}` as keyof typeof result;
					expect(result[key]).toBeDefined();
				}
			}
		});

		it("should create all alpha color variables by default", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s);

			// Check that all alpha scales and steps are created
			for (const scale of colorScales) {
				for (const step of colorSteps) {
					const key =
						`color${scale.charAt(0).toUpperCase() + scale.slice(1)}A${step}` as keyof typeof result;
					expect(result[key]).toBeDefined();
				}
			}
		});

		it("should add solid and alpha variables to root", () => {
			const s = styleframe();
			useColorVariablesPreset(s);

			// 31 scales × 12 steps × 2 (solid + alpha) = 744 variables
			expect(s.root.variables.length).toBe(31 * 12 * 2);
		});

		it("should create a dark theme", () => {
			const s = styleframe();
			useColorVariablesPreset(s);

			expect(s.root.themes.length).toBe(1);
			expect(s.root.themes[0]!.name).toBe("dark");
		});

		it("should generate correct CSS output for light mode solid colors", () => {
			const s = styleframe();
			useColorVariablesPreset(s);

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(":root");
			expect(css).toContain("--color--blue--9");
			expect(css).toContain(lightColors.blue[9]); // #0090ff
		});

		it("should generate correct CSS output for light mode alpha colors", () => {
			const s = styleframe();
			useColorVariablesPreset(s);

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--color--blue--a9");
			expect(css).toContain(lightAlphaColors.blue[9]);
		});

		it("should generate correct CSS output for dark mode solid colors", () => {
			const s = styleframe();
			useColorVariablesPreset(s);

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain('[data-theme="dark"]');
			expect(css).toContain(darkColors.blue[9]); // #0090ff (same in dark)
		});

		it("should generate correct CSS output for dark mode alpha colors", () => {
			const s = styleframe();
			useColorVariablesPreset(s);

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(darkAlphaColors.blue[9]);
		});
	});

	describe("alpha color configuration", () => {
		it("should exclude alpha colors when includeAlpha is false", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s, {
				includeAlpha: false,
			});

			// Solid colors should still exist
			expect(result.colorBlue9).toBeDefined();

			// Alpha colors should not exist
			expect((result as Record<string, unknown>).colorBlueA9).toBeUndefined();

			// Only solid colors: 31 × 12 = 372
			expect(s.root.variables.length).toBe(31 * 12);
		});

		it("should allow alpha light mode overrides", () => {
			const s = styleframe();
			const customAlpha = "#custom0a";
			useColorVariablesPreset(s, {
				alphaLightOverrides: {
					blue: { 9: customAlpha },
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(customAlpha);
		});

		it("should allow alpha dark mode overrides", () => {
			const s = styleframe();
			const customDarkAlpha = "#darkblue0a";
			useColorVariablesPreset(s, {
				alphaDarkOverrides: {
					blue: { 9: customDarkAlpha },
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(customDarkAlpha);
		});
	});

	describe("configuration", () => {
		it("should use custom prefix", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s, {
				prefix: "c",
			});

			// Access via runtime key since TypeScript can't infer custom prefix
			expect((result as Record<string, unknown>).cBlue9).toBeDefined();
			expect((result as Record<string, unknown>).cBlueA9).toBeDefined();

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--c--blue--9");
			expect(css).toContain("--c--blue--a9");
		});

		it("should use custom dark theme name", () => {
			const s = styleframe();
			useColorVariablesPreset(s, {
				darkThemeName: "dark-mode",
			});

			expect(s.root.themes[0]!.name).toBe("dark-mode");

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain('[data-theme="dark-mode"]');
		});

		it("should filter scales based on config", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s, {
				scales: {
					blue: true,
					red: true,
					gray: false,
				},
			});

			expect(result.colorBlue9).toBeDefined();
			expect(result.colorRed9).toBeDefined();
			expect(result.colorBlueA9).toBeDefined();
			expect(result.colorRedA9).toBeDefined();
			// Note: TypeScript still allows accessing undefined keys at runtime
			// gray is disabled so accessing via runtime gives undefined
			expect((result as Record<string, unknown>).colorGray9).toBeUndefined();
			expect((result as Record<string, unknown>).colorGrayA9).toBeUndefined();
		});

		it("should include only enabled scales for both solid and alpha", () => {
			const s = styleframe();
			useColorVariablesPreset(s, {
				scales: essentialColorScales,
			});

			// 6 scales × 12 steps × 2 (solid + alpha) = 144 variables
			expect(s.root.variables.length).toBe(6 * 12 * 2);
		});

		it("should allow light mode overrides", () => {
			const s = styleframe();
			const customBlue = "#custom";
			useColorVariablesPreset(s, {
				lightOverrides: {
					blue: { 9: customBlue },
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(customBlue);
		});

		it("should allow dark mode overrides", () => {
			const s = styleframe();
			const customDarkBlue = "#darkblue";
			useColorVariablesPreset(s, {
				darkOverrides: {
					blue: { 9: customDarkBlue },
				},
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(customDarkBlue);
		});
	});

	describe("scale presets", () => {
		it("essentialColorScales should include only 6 scales", () => {
			const enabledScales = Object.entries(essentialColorScales)
				.filter(([_, enabled]) => enabled)
				.map(([scale]) => scale);

			expect(enabledScales).toHaveLength(6);
			expect(enabledScales).toContain("gray");
			expect(enabledScales).toContain("blue");
			expect(enabledScales).toContain("red");
			expect(enabledScales).toContain("green");
			expect(enabledScales).toContain("amber");
			expect(enabledScales).toContain("orange");
		});

		it("neutralColorScales should include all gray variants", () => {
			const enabledScales = Object.entries(neutralColorScales)
				.filter(([_, enabled]) => enabled)
				.map(([scale]) => scale);

			expect(enabledScales).toHaveLength(6);
			expect(enabledScales).toContain("gray");
			expect(enabledScales).toContain("mauve");
			expect(enabledScales).toContain("slate");
			expect(enabledScales).toContain("sage");
			expect(enabledScales).toContain("olive");
			expect(enabledScales).toContain("sand");
		});
	});

	describe("color data integrity", () => {
		it("should have all 31 color scales defined", () => {
			expect(colorScales).toHaveLength(31);
		});

		it("should have 12 steps per scale in light mode", () => {
			for (const scale of colorScales) {
				expect(Object.keys(lightColors[scale])).toHaveLength(12);
			}
		});

		it("should have 12 steps per scale in dark mode", () => {
			for (const scale of colorScales) {
				expect(Object.keys(darkColors[scale])).toHaveLength(12);
			}
		});

		it("should have 12 steps per scale in light alpha mode", () => {
			for (const scale of colorScales) {
				expect(Object.keys(lightAlphaColors[scale])).toHaveLength(12);
			}
		});

		it("should have 12 steps per scale in dark alpha mode", () => {
			for (const scale of colorScales) {
				expect(Object.keys(darkAlphaColors[scale])).toHaveLength(12);
			}
		});

		it("should have valid hex color values for solid colors", () => {
			const hexRegex = /^#[0-9a-f]{6}$/i;

			for (const scale of colorScales) {
				for (const step of colorSteps) {
					expect(lightColors[scale][step]).toMatch(hexRegex);
					expect(darkColors[scale][step]).toMatch(hexRegex);
				}
			}
		});

		it("should have valid hex color values for alpha colors (6 or 8 char)", () => {
			// Alpha hex can be 8-char (#RRGGBBAA) or 6-char (fully opaque)
			const hexRegex = /^#[0-9a-f]{6,8}$/i;

			for (const scale of colorScales) {
				for (const step of colorSteps) {
					expect(lightAlphaColors[scale][step]).toMatch(hexRegex);
					expect(darkAlphaColors[scale][step]).toMatch(hexRegex);
				}
			}
		});
	});

	describe("integration", () => {
		it("should work with selectors using ref for solid colors", () => {
			const s = styleframe();
			const colors = useColorVariablesPreset(s, {
				scales: { blue: true, gray: true },
			});

			s.selector(".button", {
				backgroundColor: s.ref(colors.colorBlue9),
				color: s.ref(colors.colorGray12),
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("background-color: var(--color--blue--9)");
			expect(css).toContain("color: var(--color--gray--12)");
		});

		it("should work with selectors using ref for alpha colors", () => {
			const s = styleframe();
			const colors = useColorVariablesPreset(s, {
				scales: { blue: true },
			});

			s.selector(".overlay", {
				backgroundColor: s.ref(colors.colorBlueA3),
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("background-color: var(--color--blue--a3)");
		});

		it("should work alongside useDesignTokensPreset", () => {
			const s = styleframe();

			// Use color variables preset
			const colors = useColorVariablesPreset(s, {
				scales: { blue: true },
			});

			// Add some custom variables
			const spacing = s.variable("spacing", "1rem", { default: true });

			s.selector(".card", {
				padding: s.ref(spacing),
				backgroundColor: s.ref(colors.colorBlue1),
				borderColor: s.ref(colors.colorBlue6),
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain("--spacing");
			expect(css).toContain("--color--blue--1");
			expect(css).toContain("--color--blue--6");
		});

		it("should generate accessible color combinations", () => {
			const s = styleframe();
			const colors = useColorVariablesPreset(s, {
				scales: { blue: true },
			});

			// Step 12 text on step 1 background should be accessible
			s.selector(".accessible-text", {
				backgroundColor: s.ref(colors.colorBlue1),
				color: s.ref(colors.colorBlue12),
			});

			// Step 9 is the solid/accent color
			s.selector(".accent-button", {
				backgroundColor: s.ref(colors.colorBlue9),
				// In light mode, this needs white text
			});

			// Alpha colors for overlays
			s.selector(".hover-overlay", {
				backgroundColor: s.ref(colors.colorBlueA4),
			});

			const css = consumeCSS(s.root, s.options);
			expect(css).toContain(".accessible-text");
			expect(css).toContain(".accent-button");
			expect(css).toContain(".hover-overlay");
		});
	});

	describe("type safety", () => {
		it("should have correct return type shape for solid colors", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s);

			// TypeScript should know these exist
			expect(result.colorBlue1).toBeDefined();
			expect(result.colorBlue9).toBeDefined();
			expect(result.colorBlue12).toBeDefined();
			expect(result.colorRed1).toBeDefined();
			expect(result.colorGray1).toBeDefined();
		});

		it("should have correct return type shape for alpha colors", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s);

			// TypeScript should know these exist
			expect(result.colorBlueA1).toBeDefined();
			expect(result.colorBlueA9).toBeDefined();
			expect(result.colorBlueA12).toBeDefined();
			expect(result.colorRedA1).toBeDefined();
			expect(result.colorGrayA1).toBeDefined();
		});

		it("should work with explicit config", () => {
			const s = styleframe();
			const result = useColorVariablesPreset(s, {
				prefix: "color",
				darkThemeName: "dark",
				scales: {
					blue: true,
					red: true,
				},
			});

			expect(result.colorBlue9).toBeDefined();
			expect(result.colorRed9).toBeDefined();
			expect(result.colorBlueA9).toBeDefined();
			expect(result.colorRedA9).toBeDefined();
		});
	});
});
