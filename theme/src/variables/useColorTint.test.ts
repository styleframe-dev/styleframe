import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consume } from "@styleframe/transpiler";
import { defaultColorTintValues } from "../constants";
import { useColorTint } from "./useColorTint";

describe("useColorTint", () => {
	it("should create tint levels with default values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const tints = useColorTint(s, colorPrimary, defaultColorTintValues);

		expect(tints.colorPrimaryTint50).toEqual({
			type: "variable",
			name: "color--primary-tint-50",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(tints.colorPrimaryTint100).toEqual({
			type: "variable",
			name: "color--primary-tint-100",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(tints.colorPrimaryTint150).toEqual({
			type: "variable",
			name: "color--primary-tint-150",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consume(tints.colorPrimaryTint100, s.options);
		expect(css).toBe(
			`--color--primary-tint-100: oklch(from var(--color--primary) calc(l + 0.1) c h / a);`,
		);
	});

	it("should create tint levels with custom values", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const tints = useColorTint(s, colorPrimary, {
			25: 2.5,
			50: 5,
			75: 7.5,
			100: 10,
		} as const);

		expect(tints.colorPrimaryTint25).toEqual({
			type: "variable",
			name: "color--primary-tint-25",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(tints.colorPrimaryTint50).toEqual({
			type: "variable",
			name: "color--primary-tint-50",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(tints.colorPrimaryTint75).toEqual({
			type: "variable",
			name: "color--primary-tint-75",
			value: expect.objectContaining({ type: "css" }),
		});
		expect(tints.colorPrimaryTint100).toEqual({
			type: "variable",
			name: "color--primary-tint-100",
			value: expect.objectContaining({ type: "css" }),
		});
	});

	it("should compile tint levels to correct CSS output using consume", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorTint(s, colorPrimary, {
			50: 5,
			100: 10,
		});

		const css = consume(s.root, s.options);

		expect(css).toBe(`:root {
	--color--primary: #007bff;
	--color--primary-tint-50: oklch(from var(--color--primary) calc(l + 0.05) c h / a);
	--color--primary-tint-100: oklch(from var(--color--primary) calc(l + 0.1) c h / a);
}`);
	});

	it("should add variables to root", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		useColorTint(s, colorPrimary, {
			50: 5,
			100: 10,
		} as const);

		// +1 for the original color variable
		expect(s.root.variables.length).toBeGreaterThanOrEqual(3);
	});

	it("should handle color with kebab-case name", () => {
		const s = styleframe();
		const colorPrimaryLight = s.variable("color--primary-light", "#80bdff");
		const tints = useColorTint(s, colorPrimaryLight, {
			50: 5,
		} as const);

		expect(tints.colorPrimaryLightTint50.name).toBe(
			"color--primary-light-tint-50",
		);
	});

	it("should handle empty levels object", () => {
		const s = styleframe();
		const colorPrimary = s.variable("color--primary", "#007bff");
		const tints = useColorTint(s, colorPrimary, {} as const);

		expect(tints).toEqual({});
	});

	it("should work with different variable name patterns", () => {
		const s = styleframe();
		const customColor = s.variable("custom-color", "#ff0000");
		const tints = useColorTint(s, customColor, {
			100: 10,
		} as const);

		expect(tints.customColorTint100).toEqual({
			type: "variable",
			name: "custom-color-tint-100",
			value: expect.objectContaining({ type: "css" }),
		});

		const css = consume(tints.customColorTint100, s.options);
		expect(css).toBe(
			`--custom-color-tint-100: oklch(from var(--custom-color) calc(l + 0.1) c h / a);`,
		);
	});

	describe("type safety", () => {
		it("should preserve variable name in return type", () => {
			const s = styleframe();
			const colorPrimary = s.variable("color--primary", "#007bff");
			const tints = useColorTint(s, colorPrimary, {
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
			const tints = useColorTint(s, colorSecondary, {
				75: 7.5,
			} as const);

			const typed: Variable<"color--secondary-tint-75"> =
				tints.colorSecondaryTint75;
			expect(typed.name).toBe("color--secondary-tint-75");
		});
	});
});
