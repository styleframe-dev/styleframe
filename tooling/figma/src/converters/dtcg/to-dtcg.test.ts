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

	it("should handle multi-mode values with extensions", () => {
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
});
