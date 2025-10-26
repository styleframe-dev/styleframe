import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useColorShade, defaultColorShadeValues } from "./useColorShade";

describe("useColorShade", () => {
	it("should create shade levels with default values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const shades = useColorShade(s, colorPrimary, defaultColorShadeValues);

		expect(shades.colorPrimaryShade50).toEqual({
			type: "variable",
			name: "color--primary-shade-50",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(shades.colorPrimaryShade100).toEqual({
			type: "variable",
			name: "color--primary-shade-100",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(shades.colorPrimaryShade150).toEqual({
			type: "variable",
			name: "color--primary-shade-150",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consumeCSS(shades.colorPrimaryShade100, s.options);
		expect(css).toBe(
			`--color--primary-shade-100: oklch(from var(--color--primary) calc(l - 0.1) c h / a);`,
		);
	});

	it("should create shade levels with custom values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const shades = useColorShade(s, colorPrimary, {
			25: 2.5,
			50: 5,
			75: 7.5,
			100: 10,
		} as const);

		expect(shades.colorPrimaryShade25).toEqual({
			type: "variable",
			name: "color--primary-shade-25",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(shades.colorPrimaryShade50).toEqual({
			type: "variable",
			name: "color--primary-shade-50",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(shades.colorPrimaryShade75).toEqual({
			type: "variable",
			name: "color--primary-shade-75",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(shades.colorPrimaryShade100).toEqual({
			type: "variable",
			name: "color--primary-shade-100",
			value: expect.objectContaining({ type: "css" }),
		});
	});

	it("should compile shade levels to correct CSS output using consumeCSS", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");

		useColorShade(s, colorPrimary, {
			50: 5,
			100: 10,
		});

		const css = consumeCSS(s.root, s.options);

		expect(css).toBe(`:root {
	--color--primary: #007bff;
	--color--primary-shade-50: oklch(from var(--color--primary) calc(l - 0.05) c h / a);
	--color--primary-shade-100: oklch(from var(--color--primary) calc(l - 0.1) c h / a);
}`);
	});

	it("should add variables to root", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");

		useColorShade(s, colorPrimary, {
			50: 5,
			100: 10,
		} as const);

		// +1 for the original color variable
		expect(s.root.variables.length).toBeGreaterThanOrEqual(3);
	});

	it("should handle color with kebab-case name", () => {
		const s = styleframe();
		const colorPrimaryDark = s.variable("color--primary-dark", "#0056b3");
		const shades = useColorShade(s, colorPrimaryDark, { 50: 5 });

		expect(shades.colorPrimaryDarkShade50).toEqual({
			type: "variable",
			name: "color--primary-dark-shade-50",
			value: expect.objectContaining({ type: "css" }),
		});
	});

	it("should handle empty levels object", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const shades = useColorShade(s, colorPrimary, {} as const);

		expect(shades).toEqual({});
	});

	it("should work with different variable name patterns", () => {
		const s = styleframe();
		const customColor = s.variable("custom-color", "#ff0000");
		const shades = useColorShade(s, customColor, {
			100: 10,
		} as const);

		expect(shades.customColorShade100).toEqual({
			type: "variable",
			name: "custom-color-shade-100",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consumeCSS(shades.customColorShade100, s.options);
		expect(css).toBe(
			`--custom-color-shade-100: oklch(from var(--custom-color) calc(l - 0.1) c h / a);`,
		);
	});

	describe("type safety", () => {
		it("should preserve variable name in return type", () => {
			const s = styleframe();
			const colorPrimary = s.variable("color--primary", "#007bff");
			const shades = useColorShade(s, colorPrimary, {
				50: 5,
				100: 10,
			} as const);

			const shade50: Variable<"color--primary-shade-50"> =
				shades.colorPrimaryShade50;
			const shade100: Variable<"color--primary-shade-100"> =
				shades.colorPrimaryShade100;

			expect(shade50.name).toBe("color--primary-shade-50");
			expect(shade100.name).toBe("color--primary-shade-100");
		});

		it("should work with generic variable names", () => {
			const s = styleframe();
			const colorSecondary = s.variable("color--secondary", "#6c757d");
			const shades = useColorShade(s, colorSecondary, {
				75: 7.5,
			} as const);

			const typed: Variable<"color--secondary-shade-75"> =
				shades.colorSecondaryShade75;
			expect(typed.name).toBe("color--secondary-shade-75");
		});
	});
});
