import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import {
	defaultColorLightnessLevels,
	defaultColorShadeLevels,
	defaultColorTintLevels,
} from "../constants";
import {
	useColorLightnessLevels,
	useColorShadeLevels,
	useColors,
	useColorTintLevels,
} from "./useColors";

describe("useColors", () => {
	it("should create a single color variable with correct naming", () => {
		const s = styleframe();
		const { colorPrimary } = useColors(s, {
			primary: "#007bff",
		});

		expect(colorPrimary).toEqual({
			type: "variable",
			name: "color--primary",
			value: "#007bff",
		});
	});

	it("should create multiple color variables", () => {
		const s = styleframe();
		const { colorPrimary, colorSecondary, colorTertiary } = useColors(s, {
			primary: "#007bff",
			secondary: "#6c757d",
			tertiary: "#28a745",
		});

		expect(colorPrimary.name).toBe("color--primary");
		expect(colorPrimary.value).toBe("#007bff");

		expect(colorSecondary.name).toBe("color--secondary");
		expect(colorSecondary.value).toBe("#6c757d");

		expect(colorTertiary.name).toBe("color--tertiary");
		expect(colorTertiary.value).toBe("#28a745");
	});

	it("should add variables to root", () => {
		const s = styleframe();
		useColors(s, {
			primary: "#007bff",
			secondary: "#6c757d",
		});

		expect(s.root.variables).toHaveLength(2);
		expect(s.root.variables[0]?.name).toBe("color--primary");
		expect(s.root.variables[1]?.name).toBe("color--secondary");
	});

	it("should handle kebab-case color names", () => {
		const s = styleframe();
		const { colorPrimaryDark } = useColors(s, {
			"primary-dark": "#0056b3",
		});

		expect(colorPrimaryDark.name).toBe("color--primary-dark");
		expect(colorPrimaryDark.value).toBe("#0056b3");
	});

	it("should handle snake_case color names", () => {
		const s = styleframe();
		const { colorPrimaryLight } = useColors(s, {
			primary_light: "#80bdff",
		});

		expect(colorPrimaryLight.name).toBe("color--primary_light");
		expect(colorPrimaryLight.value).toBe("#80bdff");
	});

	it("should handle numeric color names", () => {
		const s = styleframe();
		const { color500 } = useColors(s, {
			"500": "#007bff",
		});

		expect(color500.name).toBe("color--500");
		expect(color500.value).toBe("#007bff");
	});

	it("should handle rgb color values", () => {
		const s = styleframe();
		const { colorPrimary } = useColors(s, {
			primary: "rgb(0, 123, 255)",
		});

		expect(colorPrimary.value).toBe("rgb(0, 123, 255)");
	});

	it("should handle rgba color values", () => {
		const s = styleframe();
		const { colorPrimary } = useColors(s, {
			primary: "rgba(0, 123, 255, 0.5)",
		});

		expect(colorPrimary.value).toBe("rgba(0, 123, 255, 0.5)");
	});

	it("should handle hsl color values", () => {
		const s = styleframe();
		const { colorPrimary } = useColors(s, {
			primary: "hsl(211, 100%, 50%)",
		});

		expect(colorPrimary.value).toBe("hsl(211, 100%, 50%)");
	});

	it("should handle empty color object", () => {
		const s = styleframe();
		const result = useColors(s, {});

		expect(result).toEqual({});
		expect(s.root.variables).toHaveLength(0);
	});

	it("should handle color references", () => {
		const s = styleframe();
		const baseColor = s.variable("base-color", "#007bff");
		const { colorPrimary } = useColors(s, {
			primary: s.ref(baseColor),
		});

		expect(colorPrimary.value).toEqual({
			type: "reference",
			name: "base-color",
			fallback: undefined,
		});
	});

	describe("type safety", () => {
		it("should preserve exact color names in return type", () => {
			const s = styleframe();
			const colors = useColors(s, {
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
			const { colorPrimaryDark } = useColors(s, {
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

			const colors = useColors(s, colorConfig);

			expect(colors.colorPrimary.name).toBe("color--primary");
			expect(colors.colorSecondary.name).toBe("color--secondary");
		});
	});
});

describe("useColorLightnessLevels", () => {
	it("should create lightness levels with default values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const levels = useColorLightnessLevels(
			s,
			colorPrimary,
			defaultColorLightnessLevels,
		);

		// Test some of the default levels (we know they exist from the default parameter)
		expect(levels.colorPrimary50.name).toBe("color--primary-50");
		expect(levels.colorPrimary50.value).toBe(5);

		expect(levels.colorPrimary100.name).toBe("color--primary-100");
		expect(levels.colorPrimary100.value).toBe(10);

		expect(levels.colorPrimary500.name).toBe("color--primary-500");
		expect(levels.colorPrimary500.value).toBe(50);

		expect(levels.colorPrimary950.name).toBe("color--primary-950");
		expect(levels.colorPrimary950.value).toBe(95);
	});

	it("should create lightness levels with custom values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const levels = useColorLightnessLevels(s, colorPrimary, {
			100: 10,
			200: 20,
			300: 30,
		} as const);

		expect(levels.colorPrimary100).toEqual({
			type: "variable",
			name: "color--primary-100",
			value: 10,
		});
		expect(levels.colorPrimary200).toEqual({
			type: "variable",
			name: "color--primary-200",
			value: 20,
		});
		expect(levels.colorPrimary300).toEqual({
			type: "variable",
			name: "color--primary-300",
			value: 30,
		});
	});

	it("should add variables to root", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorLightnessLevels(s, colorPrimary, {
			100: 10,
			200: 20,
		} as const);

		// +1 for the original color variable
		expect(s.root.variables.length).toBeGreaterThanOrEqual(3);
	});

	it("should handle color with kebab-case name", () => {
		const s = styleframe();
		const colorPrimaryDark = s.variable("color--primary-dark", "#0056b3");
		const levels = useColorLightnessLevels(s, colorPrimaryDark, {
			100: 10,
		} as const);

		expect(levels.colorPrimaryDark100.name).toBe("color--primary-dark-100");
	});

	it("should handle empty levels object", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const levels = useColorLightnessLevels(s, colorPrimary, {} as const);

		expect(levels).toEqual({});
	});

	it("should work with different variable name patterns", () => {
		const s = styleframe();
		const customColor = s.variable("custom-color", "#ff0000");
		const levels = useColorLightnessLevels(s, customColor, {
			500: 50,
		} as const);

		expect(levels.customColor500.name).toBe("custom-color-500");
		expect(levels.customColor500.value).toBe(50);
	});

	describe("type safety", () => {
		it("should preserve variable name in return type", () => {
			const s = styleframe();
			const colorPrimary = s.variable("color--primary", "#007bff");
			const levels = useColorLightnessLevels(s, colorPrimary, {
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
			const levels = useColorLightnessLevels(s, colorSecondary, {
				300: 30,
			} as const);

			const typed: Variable<"color--secondary-300"> = levels.colorSecondary300;
			expect(typed.name).toBe("color--secondary-300");
		});
	});
});

describe("useColorShadeLevels", () => {
	it("should create shade levels with default values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const shades = useColorShadeLevels(
			s,
			colorPrimary,
			defaultColorShadeLevels,
		);

		expect(shades.colorPrimaryShade50.name).toBe("color--primary-shade-50");
		expect(shades.colorPrimaryShade50.value).toBe(5);

		expect(shades.colorPrimaryShade100.name).toBe("color--primary-shade-100");
		expect(shades.colorPrimaryShade100.value).toBe(10);

		expect(shades.colorPrimaryShade150.name).toBe("color--primary-shade-150");
		expect(shades.colorPrimaryShade150.value).toBe(15);
	});

	it("should create shade levels with custom values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const shades = useColorShadeLevels(s, colorPrimary, {
			25: 2.5,
			50: 5,
			75: 7.5,
			100: 10,
		} as const);

		expect(shades.colorPrimaryShade25.value).toBe(2.5);
		expect(shades.colorPrimaryShade50.value).toBe(5);
		expect(shades.colorPrimaryShade75.value).toBe(7.5);
		expect(shades.colorPrimaryShade100.value).toBe(10);
	});

	it("should add variables to root", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorShadeLevels(s, colorPrimary, {
			50: 5,
			100: 10,
		} as const);

		// +1 for the original color variable
		expect(s.root.variables.length).toBeGreaterThanOrEqual(3);
	});

	it("should handle color with kebab-case name", () => {
		const s = styleframe();
		const colorPrimaryDark = s.variable("color--primary-dark", "#0056b3");
		const shades = useColorShadeLevels(s, colorPrimaryDark, {
			50: 5,
		} as const);

		expect(shades.colorPrimaryDarkShade50.name).toBe(
			"color--primary-dark-shade-50",
		);
	});

	it("should handle empty levels object", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const shades = useColorShadeLevels(s, colorPrimary, {} as const);

		expect(shades).toEqual({});
	});

	it("should work with different variable name patterns", () => {
		const s = styleframe();
		const customColor = s.variable("custom-color", "#ff0000");
		const shades = useColorShadeLevels(s, customColor, {
			100: 10,
		} as const);

		expect(shades.customColorShade100.name).toBe("custom-color-shade-100");
		expect(shades.customColorShade100.value).toBe(10);
	});

	describe("type safety", () => {
		it("should preserve variable name in return type", () => {
			const s = styleframe();
			const colorPrimary = s.variable("color--primary", "#007bff");
			const shades = useColorShadeLevels(s, colorPrimary, {
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
			const shades = useColorShadeLevels(s, colorSecondary, {
				75: 7.5,
			} as const);

			const typed: Variable<"color--secondary-shade-75"> =
				shades.colorSecondaryShade75;
			expect(typed.name).toBe("color--secondary-shade-75");
		});
	});
});

describe("useColorTintLevels", () => {
	it("should create tint levels with default values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const tints = useColorTintLevels(s, colorPrimary, defaultColorTintLevels);

		expect(tints.colorPrimaryTint50.name).toBe("color--primary-tint-50");
		expect(tints.colorPrimaryTint50.value).toBe(5);

		expect(tints.colorPrimaryTint100.name).toBe("color--primary-tint-100");
		expect(tints.colorPrimaryTint100.value).toBe(10);

		expect(tints.colorPrimaryTint150.name).toBe("color--primary-tint-150");
		expect(tints.colorPrimaryTint150.value).toBe(15);
	});

	it("should create tint levels with custom values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const tints = useColorTintLevels(s, colorPrimary, {
			25: 2.5,
			50: 5,
			75: 7.5,
			100: 10,
		} as const);

		expect(tints.colorPrimaryTint25.value).toBe(2.5);
		expect(tints.colorPrimaryTint50.value).toBe(5);
		expect(tints.colorPrimaryTint75.value).toBe(7.5);
		expect(tints.colorPrimaryTint100.value).toBe(10);
	});

	it("should add variables to root", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorTintLevels(s, colorPrimary, {
			50: 5,
			100: 10,
		} as const);

		// +1 for the original color variable
		expect(s.root.variables.length).toBeGreaterThanOrEqual(3);
	});

	it("should handle color with kebab-case name", () => {
		const s = styleframe();
		const colorPrimaryLight = s.variable("color--primary-light", "#80bdff");
		const tints = useColorTintLevels(s, colorPrimaryLight, {
			50: 5,
		} as const);

		expect(tints.colorPrimaryLightTint50.name).toBe(
			"color--primary-light-tint-50",
		);
	});

	it("should handle empty levels object", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const tints = useColorTintLevels(s, colorPrimary, {} as const);

		expect(tints).toEqual({});
	});

	it("should work with different variable name patterns", () => {
		const s = styleframe();
		const customColor = s.variable("custom-color", "#ff0000");
		const tints = useColorTintLevels(s, customColor, {
			100: 10,
		} as const);

		expect(tints.customColorTint100.name).toBe("custom-color-tint-100");
		expect(tints.customColorTint100.value).toBe(10);
	});

	describe("type safety", () => {
		it("should preserve variable name in return type", () => {
			const s = styleframe();
			const colorPrimary = s.variable("color--primary", "#007bff");
			const tints = useColorTintLevels(s, colorPrimary, {
				50: 5,
				100: 10,
			} as const);

			const tint50: Variable<"color--primary-tint-50"> =
				tints.colorPrimaryTint50;
			const tint100: Variable<"color--primary-tint-100"> =
				tints.colorPrimaryTint100;

			expect(tint50.name).toBe("color--primary-tint-50");
			expect(tint100.name).toBe("color--primary-tint-100");
		});

		it("should work with generic variable names", () => {
			const s = styleframe();
			const colorSecondary = s.variable("color--secondary", "#6c757d");
			const tints = useColorTintLevels(s, colorSecondary, {
				75: 7.5,
			} as const);

			const typed: Variable<"color--secondary-tint-75"> =
				tints.colorSecondaryTint75;
			expect(typed.name).toBe("color--secondary-tint-75");
		});
	});
});

describe("integration", () => {
	it("should work together to create a complete color system", () => {
		const s = styleframe();

		// Create base colors
		const { colorPrimary, colorSecondary } = useColors(s, {
			primary: "#007bff",
			secondary: "#6c757d",
		});

		// Create lightness levels for primary
		const primaryLevels = useColorLightnessLevels(s, colorPrimary, {
			100: 10,
			500: 50,
			900: 90,
		} as const);

		// Create shade levels for secondary
		const secondaryShades = useColorShadeLevels(s, colorSecondary, {
			50: 5,
			100: 10,
		} as const);

		// Create tint levels for secondary
		const secondaryTints = useColorTintLevels(s, colorSecondary, {
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

		const { colorBrandPrimary } = useColors(s, {
			"brand-primary": "#007bff",
		});

		const levels = useColorLightnessLevels(s, colorBrandPrimary, {
			400: 40,
		} as const);

		const shades = useColorShadeLevels(s, colorBrandPrimary, {
			50: 5,
		} as const);

		const tints = useColorTintLevels(s, colorBrandPrimary, {
			50: 5,
		} as const);

		expect(colorBrandPrimary.name).toBe("color--brand-primary");
		expect(levels.colorBrandPrimary400.name).toBe("color--brand-primary-400");
		expect(shades.colorBrandPrimaryShade50.name).toBe(
			"color--brand-primary-shade-50",
		);
		expect(tints.colorBrandPrimaryTint50.name).toBe(
			"color--brand-primary-tint-50",
		);
	});
});
