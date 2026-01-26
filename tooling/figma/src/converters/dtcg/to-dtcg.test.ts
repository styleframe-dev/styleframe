import { describe, it, expect } from "vitest";
import { toDTCG } from "./to-dtcg";
import type { FigmaExportFormat } from "../../types";

describe("toDTCG", () => {
	it("should convert basic color variable", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [
				{
					name: "color/primary",
					type: "COLOR",
					values: { Default: { r: 0, g: 0.424, b: 1, a: 1 } },
				},
			],
		};

		const result = toDTCG(input);

		expect(result.$extensions?.["dev.styleframe"]?.collection).toBe("Test");
		expect(result.$extensions?.["dev.styleframe"]?.modes).toEqual(["Default"]);
		expect(result.color).toBeDefined();
		const colorGroup = result.color as Record<string, unknown>;
		const primary = colorGroup.primary as { $value: string; $type: string };
		expect(primary.$value).toBe("#006cff");
		expect(primary.$type).toBe("color");
	});

	it("should generate $modifiers.theme for multi-mode collections by default", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Light", "Dark"],
			variables: [
				{
					name: "color/background",
					type: "COLOR",
					values: {
						Light: { r: 1, g: 1, b: 1, a: 1 },
						Dark: { r: 0, g: 0, b: 0, a: 1 },
					},
				},
			],
		};

		const result = toDTCG(input);

		// Base token has Light (default) value
		const colorGroup = result.color as Record<string, unknown>;
		const background = colorGroup.background as {
			$value: string;
			$type: string;
			$extensions?: { "dev.styleframe"?: { modes?: Record<string, string> } };
		};
		expect(background.$value).toBe("#ffffff");
		// No legacy extension on token
		expect(background.$extensions).toBeUndefined();
		// Modifier contains Dark override
		expect(result.$modifiers?.theme?.contexts?.Dark).toBeDefined();
		const darkContext = result.$modifiers?.theme?.contexts?.Dark as Record<
			string,
			unknown
		>;
		const darkColor = darkContext.color as Record<string, unknown>;
		const darkBackground = darkColor.background as { $value: string };
		expect(darkBackground.$value).toBe("#000000");
	});

	it("should use legacy extension format when useModifiers is false", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Light", "Dark"],
			variables: [
				{
					name: "color/background",
					type: "COLOR",
					values: {
						Light: { r: 1, g: 1, b: 1, a: 1 },
						Dark: { r: 0, g: 0, b: 0, a: 1 },
					},
				},
			],
		};

		const result = toDTCG(input, { useModifiers: false });

		const colorGroup = result.color as Record<string, unknown>;
		const background = colorGroup.background as {
			$value: string;
			$type: string;
			$extensions?: { "dev.styleframe"?: { modes?: Record<string, string> } };
		};
		expect(background.$value).toBe("#ffffff");
		expect(background.$extensions?.["dev.styleframe"]?.modes?.Dark).toBe(
			"#000000",
		);
		// No $modifiers section
		expect(result.$modifiers).toBeUndefined();
	});

	it("should convert aliases to DTCG reference syntax", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [
				{
					name: "color/accent",
					type: "COLOR",
					values: { Default: { r: 0, g: 0.424, b: 1, a: 1 } },
					aliasTo: "color.primary",
				},
			],
		};

		const result = toDTCG(input);

		const colorGroup = result.color as Record<string, unknown>;
		const accent = colorGroup.accent as { $value: string };
		expect(accent.$value).toBe("{color.primary}");
	});

	it("should handle dimension values (FLOAT)", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [
				{
					name: "spacing/md",
					type: "FLOAT",
					values: { Default: 16 },
				},
			],
		};

		const result = toDTCG(input);

		const spacingGroup = result.spacing as Record<string, unknown>;
		const md = spacingGroup.md as { $value: string; $type: string };
		expect(md.$value).toBe("16px");
		expect(md.$type).toBe("dimension");
	});

	it("should include schema by default", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [],
		};

		const result = toDTCG(input);

		expect(result.$schema).toBeDefined();
	});

	it("should omit schema when includeSchema is false", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [],
		};

		const result = toDTCG(input, { includeSchema: false });

		expect(result.$schema).toBeUndefined();
	});

	it("should handle nested paths", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [
				{
					name: "color/brand/primary",
					type: "COLOR",
					values: { Default: { r: 0, g: 0.424, b: 1, a: 1 } },
				},
			],
		};

		const result = toDTCG(input);

		const colorGroup = result.color as Record<string, unknown>;
		const brandGroup = colorGroup.brand as Record<string, unknown>;
		const primary = brandGroup.primary as { $value: string };
		expect(primary.$value).toBe("#006cff");
	});

	it("should include description when provided", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [
				{
					name: "color/primary",
					type: "COLOR",
					values: { Default: { r: 0, g: 0.424, b: 1, a: 1 } },
					description: "Primary brand color",
				},
			],
		};

		const result = toDTCG(input);

		const colorGroup = result.color as Record<string, unknown>;
		const primary = colorGroup.primary as { $description: string };
		expect(primary.$description).toBe("Primary brand color");
	});

	it("should not generate $modifiers for single-mode collections", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default"],
			variables: [
				{
					name: "color/primary",
					type: "COLOR",
					values: { Default: { r: 0, g: 0.424, b: 1, a: 1 } },
				},
			],
		};

		const result = toDTCG(input);

		expect(result.$modifiers).toBeUndefined();
	});

	it("should skip tokens with same value across modes in modifiers", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Light", "Dark"],
			variables: [
				{
					name: "spacing/md",
					type: "FLOAT",
					values: { Light: 16, Dark: 16 },
				},
			],
		};

		const result = toDTCG(input);

		// No modifier context needed since values are identical
		expect(result.$modifiers).toBeUndefined();
	});

	it("should handle nested paths in modifiers", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Light", "Dark"],
			variables: [
				{
					name: "color/brand/primary",
					type: "COLOR",
					values: {
						Light: { r: 0, g: 0.424, b: 1, a: 1 },
						Dark: { r: 0.376, g: 0.647, b: 0.98, a: 1 },
					},
				},
			],
		};

		const result = toDTCG(input);

		// Modifier should have nested structure
		const darkContext = result.$modifiers?.theme?.contexts?.Dark as Record<
			string,
			unknown
		>;
		expect(darkContext).toBeDefined();
		const colorGroup = darkContext.color as Record<string, unknown>;
		const brandGroup = colorGroup.brand as Record<string, unknown>;
		const primary = brandGroup.primary as { $value: string };
		expect(primary.$value).toBe("#60a5fa");
	});

	it("should handle multiple tokens with different override patterns", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Light", "Dark"],
			variables: [
				{
					name: "color/background",
					type: "COLOR",
					values: {
						Light: { r: 1, g: 1, b: 1, a: 1 },
						Dark: { r: 0, g: 0, b: 0, a: 1 },
					},
				},
				{
					name: "color/text",
					type: "COLOR",
					values: {
						Light: { r: 0, g: 0, b: 0, a: 1 },
						Dark: { r: 1, g: 1, b: 1, a: 1 },
					},
				},
				{
					name: "spacing/md",
					type: "FLOAT",
					values: { Light: 16, Dark: 16 }, // Same across modes
				},
			],
		};

		const result = toDTCG(input);

		const darkContext = result.$modifiers?.theme?.contexts?.Dark as Record<
			string,
			unknown
		>;
		expect(darkContext).toBeDefined();

		// Both colors should be in the modifier
		const colorGroup = darkContext.color as Record<string, unknown>;
		expect((colorGroup.background as { $value: string }).$value).toBe(
			"#000000",
		);
		expect((colorGroup.text as { $value: string }).$value).toBe("#ffffff");

		// Spacing should NOT be in the modifier (same value)
		expect(darkContext.spacing).toBeUndefined();
	});

	it("should only include specified theme modes in modifiers when themeNames is provided", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default", "Dark", "HighContrast"],
			variables: [
				{
					name: "color/background",
					type: "COLOR",
					values: {
						Default: { r: 1, g: 1, b: 1, a: 1 },
						Dark: { r: 0, g: 0, b: 0, a: 1 },
						HighContrast: { r: 1, g: 1, b: 0, a: 1 },
					},
				},
			],
		};

		// Only Dark is a theme, HighContrast is not
		const result = toDTCG(input, { themeNames: ["Dark"] });

		// Dark should be in modifiers
		expect(result.$modifiers?.theme?.contexts?.Dark).toBeDefined();
		// HighContrast should NOT be in modifiers (it's not in themeNames)
		expect(result.$modifiers?.theme?.contexts?.HighContrast).toBeUndefined();

		// HighContrast should be in token extensions instead
		const colorGroup = result.color as Record<string, unknown>;
		const background = colorGroup.background as {
			$extensions?: { "dev.styleframe"?: { modes?: Record<string, string> } };
		};
		expect(
			background.$extensions?.["dev.styleframe"]?.modes?.HighContrast,
		).toBe("#ffff00");
	});

	it("should not generate modifiers when themeNames is empty array", () => {
		const input: FigmaExportFormat = {
			collection: "Test",
			modes: ["Default", "Dark"],
			variables: [
				{
					name: "color/background",
					type: "COLOR",
					values: {
						Default: { r: 1, g: 1, b: 1, a: 1 },
						Dark: { r: 0, g: 0, b: 0, a: 1 },
					},
				},
			],
		};

		// No themes specified
		const result = toDTCG(input, { themeNames: [] });

		// No modifiers should be generated
		expect(result.$modifiers).toBeUndefined();

		// Dark should be in token extensions
		const colorGroup = result.color as Record<string, unknown>;
		const background = colorGroup.background as {
			$extensions?: { "dev.styleframe"?: { modes?: Record<string, string> } };
		};
		expect(background.$extensions?.["dev.styleframe"]?.modes?.Dark).toBe(
			"#000000",
		);
	});
});
