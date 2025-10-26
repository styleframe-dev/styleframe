import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { oklch } from "culori";
import { useColor } from "./useColor";
import { useColorLightness } from "./useColorLightness";
import { useColorShade } from "./useColorShade";
import { useColorTint } from "./useColorTint";

// Helper function to convert color to expected OKLCH format
function toOklch(color: string): string {
	const result = oklch(color);
	if (!result) return color;
	const { l, c, h, alpha = 1 } = result;
	return `oklch(${l} ${c} ${h} / ${alpha})`;
}

describe("useColor", () => {
	it("should create a single color variable with correct naming", () => {
		const s = styleframe();
		const { colorPrimary } = useColor(s, {
			primary: "#007bff",
		});

		expect(colorPrimary).toEqual({
			type: "variable",
			name: "color--primary",
			value: toOklch("#007bff"),
		});

		const css = consumeCSS(colorPrimary, s.options);
		expect(css).toBe(`--color--primary: ${toOklch("#007bff")};`);
	});

	it("should create multiple color variables", () => {
		const s = styleframe();
		const { colorPrimary, colorSecondary, colorTertiary } = useColor(s, {
			primary: "#007bff",
			secondary: "#6c757d",
			tertiary: "#28a745",
		});

		expect(colorPrimary).toEqual({
			type: "variable",
			name: "color--primary",
			value: toOklch("#007bff"),
		});

		expect(colorSecondary).toEqual({
			type: "variable",
			name: "color--secondary",
			value: toOklch("#6c757d"),
		});

		expect(colorTertiary).toEqual({
			type: "variable",
			name: "color--tertiary",
			value: toOklch("#28a745"),
		});
	});

	it("should add variables to root", () => {
		const s = styleframe();
		useColor(s, {
			primary: "#007bff",
			secondary: "#6c757d",
		});

		expect(s.root.variables).toHaveLength(2);
		expect(s.root.variables[0]?.name).toBe("color--primary");
		expect(s.root.variables[1]?.name).toBe("color--secondary");
	});

	it("should handle kebab-case color names", () => {
		const s = styleframe();
		const { colorPrimaryDark } = useColor(s, {
			"primary-dark": "#0056b3",
		});

		expect(colorPrimaryDark).toEqual({
			type: "variable",
			name: "color--primary-dark",
			value: toOklch("#0056b3"),
		});
	});

	it("should handle snake_case color names", () => {
		const s = styleframe();
		const { colorPrimaryLight } = useColor(s, {
			primary_light: "#80bdff",
		});

		expect(colorPrimaryLight).toEqual({
			type: "variable",
			name: "color--primary_light",
			value: toOklch("#80bdff"),
		});
	});

	it("should handle numeric color names", () => {
		const s = styleframe();
		const { color500 } = useColor(s, {
			"500": "#007bff",
		});

		expect(color500).toEqual({
			type: "variable",
			name: "color--500",
			value: toOklch("#007bff"),
		});
	});

	it("should handle rgb color values", () => {
		const s = styleframe();
		const { colorPrimary } = useColor(s, {
			primary: "rgb(0, 123, 255)",
		});

		expect(colorPrimary).toEqual({
			type: "variable",
			name: "color--primary",
			value: toOklch("rgb(0, 123, 255)"),
		});
	});

	it("should handle rgba color values", () => {
		const s = styleframe();
		const { colorPrimary } = useColor(s, {
			primary: "rgba(0, 123, 255, 0.5)",
		});

		expect(colorPrimary).toEqual({
			type: "variable",
			name: "color--primary",
			value: toOklch("rgba(0, 123, 255, 0.5)"),
		});
	});

	it("should handle hsl color values", () => {
		const s = styleframe();
		const { colorPrimary } = useColor(s, {
			primary: "hsl(211, 100%, 50%)",
		});

		expect(colorPrimary).toEqual({
			type: "variable",
			name: "color--primary",
			value: toOklch("hsl(211, 100%, 50%)"),
		});
	});

	it("should handle empty color object", () => {
		const s = styleframe();
		const result = useColor(s, {});

		expect(result).toEqual({});
		expect(s.root.variables).toHaveLength(0);
	});

	it("should handle color references", () => {
		const s = styleframe();
		const baseColor = s.variable("base-color", "#007bff");
		const { colorPrimary } = useColor(s, {
			primary: s.ref(baseColor),
		});

		expect(colorPrimary.value).toEqual({
			type: "reference",
			name: "base-color",
			fallback: undefined,
		});
	});

	it("should compile to correct CSS output using consumeCSS", () => {
		const s = styleframe();
		useColor(s, {
			primary: "#007bff",
			secondary: "#6c757d",
			tertiary: "#28a745",
		});

		const css = consumeCSS(s.root, s.options);

		expect(css).toBe(`:root {
	--color--primary: ${toOklch("#007bff")};
	--color--secondary: ${toOklch("#6c757d")};
	--color--tertiary: ${toOklch("#28a745")};
}`);
	});

	describe("type safety", () => {
		it("should preserve exact color names in return type", () => {
			const s = styleframe();
			const colors = useColor(s, {
				primary: "#007bff",
				secondary: "#6c757d",
			});

			// Type assertions to verify the generic types are preserved
			const primary: Variable<"color--primary"> = colors.colorPrimary;
			const secondary: Variable<"color--secondary"> = colors.colorSecondary;

			expect(primary.name).toBe("color--primary");
			expect(secondary.name).toBe("color--secondary");
		});

		it("should maintain type information for kebab-case names", () => {
			const s = styleframe();
			const { colorPrimaryDark } = useColor(s, {
				"primary-dark": "#0056b3",
			});

			const typed: Variable<"color--primary-dark"> = colorPrimaryDark;
			expect(typed.name).toBe("color--primary-dark");
		});

		it("should work with const assertion", () => {
			const s = styleframe();
			const colorConfig = {
				primary: "#007bff",
				secondary: "#6c757d",
			} as const;

			const colors = useColor(s, colorConfig);

			expect(colors.colorPrimary.name).toBe("color--primary");
			expect(colors.colorSecondary.name).toBe("color--secondary");
		});
	});
});

describe("integration", () => {
	it("should work together to create a complete color system", () => {
		const s = styleframe();

		// Create base colors
		const { colorPrimary, colorSecondary } = useColor(s, {
			primary: "#007bff",
			secondary: "#6c757d",
		});

		// Create lightness levels for primary
		const primaryLevels = useColorLightness(s, colorPrimary, {
			100: 10,
			500: 50,
			900: 90,
		} as const);

		// Create shade levels for secondary
		const secondaryShades = useColorShade(s, colorSecondary, {
			50: 5,
			100: 10,
		} as const);

		// Create tint levels for secondary
		const secondaryTints = useColorTint(s, colorSecondary, {
			50: 5,
			100: 10,
		} as const);

		// Verify all variables are created
		expect(colorPrimary.name).toBe("color--primary");
		expect(colorSecondary.name).toBe("color--secondary");
		expect(primaryLevels.colorPrimary100.name).toBe("color--primary-100");
		expect(primaryLevels.colorPrimary500.name).toBe("color--primary-500");
		expect(primaryLevels.colorPrimary900.name).toBe("color--primary-900");
		expect(secondaryShades.colorSecondaryShade50.name).toBe(
			"color--secondary-shade-50",
		);
		expect(secondaryShades.colorSecondaryShade100.name).toBe(
			"color--secondary-shade-100",
		);
		expect(secondaryTints.colorSecondaryTint50.name).toBe(
			"color--secondary-tint-50",
		);
		expect(secondaryTints.colorSecondaryTint100.name).toBe(
			"color--secondary-tint-100",
		);

		// All variables should be in root
		expect(s.root.variables.length).toBe(9);
	});

	it("should handle complex naming scenarios", () => {
		const s = styleframe();

		const { colorBrandPrimary } = useColor(s, {
			"brand-primary": "#007bff",
		});

		const levels = useColorLightness(s, colorBrandPrimary, {
			400: 40,
		} as const);

		const shades = useColorShade(s, colorBrandPrimary, {
			50: 5,
		} as const);

		const tints = useColorTint(s, colorBrandPrimary, {
			50: 5,
		} as const);

		expect(colorBrandPrimary).toEqual({
			type: "variable",
			name: "color--brand-primary",
			value: toOklch("#007bff"),
		});
		expect(levels.colorBrandPrimary400).toEqual({
			type: "variable",
			name: "color--brand-primary-400",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(shades.colorBrandPrimaryShade50).toEqual({
			type: "variable",
			name: "color--brand-primary-shade-50",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(tints.colorBrandPrimaryTint50).toEqual({
			type: "variable",
			name: "color--brand-primary-tint-50",
			value: expect.objectContaining({ type: "css" }),
		});
	});

	it("should compile complete color system to correct CSS output using consumeCSS", () => {
		const s = styleframe();

		const { colorPrimary } = useColor(s, {
			primary: "#007bff",
		});

		const levels = useColorLightness(s, colorPrimary, {
			100: 10,
			200: 20,
		});

		const shades = useColorShade(s, colorPrimary, {
			50: 5,
		});

		const tints = useColorTint(s, colorPrimary, {
			50: 5,
		});

		const css = consumeCSS(s.root, s.options);

		expect(css).toBe(`:root {
	--color--primary: ${toOklch("#007bff")};
	--color--primary-100: oklch(from var(--color--primary) 0.1 c h / a);
	--color--primary-200: oklch(from var(--color--primary) 0.2 c h / a);
	--color--primary-shade-50: oklch(from var(--color--primary) calc(l - 0.05) c h / a);
	--color--primary-tint-50: oklch(from var(--color--primary) calc(l + 0.05) c h / a);
}`);

		// Verify all variables are present
		expect(levels.colorPrimary100).toBeDefined();
		expect(shades.colorPrimaryShade50).toBeDefined();
		expect(tints.colorPrimaryTint50).toBeDefined();
	});
});
