import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	useColorLightness,
	defaultColorLightnessValues,
} from "./useColorLightness";

describe("useColorLightness", () => {
	it("should create lightness levels with default values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const levels = useColorLightness(
			s,
			colorPrimary,
			defaultColorLightnessValues,
		);

		// Test some of the default levels (we know they exist from the default parameter)
		expect(levels.colorPrimary50).toEqual({
			type: "variable",
			name: "color--primary-50",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(levels.colorPrimary500).toEqual({
			type: "variable",
			name: "color--primary-500",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(levels.colorPrimary950).toEqual({
			type: "variable",
			name: "color--primary-950",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consumeCSS(levels.colorPrimary100, s.options);
		expect(css).toBe(
			`--color--primary-100: oklch(from var(--color--primary) 0.1 c h / a);`,
		);
	});

	it("should compile lightness levels to correct CSS output using consumeCSS", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorLightness(s, colorPrimary, {
			100: 10,
			200: 20,
			300: 30,
		});

		const css = consumeCSS(s.root, s.options);

		expect(css).toBe(`:root {
	--color--primary: #007bff;
	--color--primary-100: oklch(from var(--color--primary) 0.1 c h / a);
	--color--primary-200: oklch(from var(--color--primary) 0.2 c h / a);
	--color--primary-300: oklch(from var(--color--primary) 0.3 c h / a);
}`);
	});

	it("should create lightness levels with custom values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const levels = useColorLightness(s, colorPrimary, {
			100: 10,
			200: 20,
			300: 30,
		} as const);

		expect(levels.colorPrimary100).toEqual({
			type: "variable",
			name: "color--primary-100",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(levels.colorPrimary200).toEqual({
			type: "variable",
			name: "color--primary-200",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(levels.colorPrimary300).toEqual({
			type: "variable",
			name: "color--primary-300",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consumeCSS(levels.colorPrimary200, s.options);
		expect(css).toBe(
			"--color--primary-200: oklch(from var(--color--primary) 0.2 c h / a);",
		);
	});

	it("should add variables to root", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorLightness(s, colorPrimary, {
			100: 10,
			200: 20,
		} as const);

		// +1 for the original color variable
		expect(s.root.variables.length).toBeGreaterThanOrEqual(3);
	});

	it("should handle color with kebab-case name", () => {
		const s = styleframe();
		const colorPrimaryDark = s.variable("color--primary-dark", "#0056b3");
		const levels = useColorLightness(s, colorPrimaryDark, {
			100: 10,
		} as const);

		expect(levels.colorPrimaryDark100.name).toBe("color--primary-dark-100");
	});

	it("should handle empty levels object", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const levels = useColorLightness(s, colorPrimary, {} as const);

		expect(levels).toEqual({});
	});

	it("should work with different variable name patterns", () => {
		const s = styleframe();
		const customColor = s.variable("custom-color", "#ff0000");
		const levels = useColorLightness(s, customColor, {
			500: 50,
		} as const);

		expect(levels.customColor500).toEqual({
			type: "variable",
			name: "custom-color-500",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consumeCSS(levels.customColor500, s.options);
		expect(css).toBe(
			`--custom-color-500: oklch(from var(--custom-color) 0.5 c h / a);`,
		);
	});

	describe("type safety", () => {
		it("should preserve variable name in return type", () => {
			const s = styleframe();
			const colorPrimary = s.variable("color--primary", "#007bff");
			const levels = useColorLightness(s, colorPrimary, {
				100: 10,
				200: 20,
			} as const);

			const level100: Variable<"color--primary-100"> = levels.colorPrimary100;
			const level200: Variable<"color--primary-200"> = levels.colorPrimary200;

			expect(level100.name).toBe("color--primary-100");
			expect(level200.name).toBe("color--primary-200");
		});

		it("should work with generic variable names", () => {
			const s = styleframe();
			const colorSecondary = s.variable("color--secondary", "#6c757d");
			const levels = useColorLightness(s, colorSecondary, {
				300: 30,
			} as const);

			const typed: Variable<"color--secondary-300"> = levels.colorSecondary300;
			expect(typed.name).toBe("color--secondary-300");
		});
	});
});
