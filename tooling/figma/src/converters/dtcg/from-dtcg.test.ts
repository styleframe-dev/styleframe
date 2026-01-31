import { describe, it, expect } from "vitest";
import { fromDTCG } from "./from-dtcg";
import type { DTCGDocument } from "./types";

describe("fromDTCG", () => {
	it("should convert basic color token", () => {
		const input: DTCGDocument = {
			color: {
				primary: {
					$value: "#006cff",
					$type: "color",
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.variables).toHaveLength(1);
		expect(result.variables[0]?.name).toBe("color/primary");
		expect(result.variables[0]?.type).toBe("COLOR");
		expect(result.variables[0]?.styleframeName).toBe("color.primary");
	});

	it("should extract modes from extensions", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "My Tokens",
					modes: ["Light", "Dark"],
				},
			},
			color: {
				background: {
					$value: "#ffffff",
					$type: "color",
					$extensions: {
						"dev.styleframe": {
							modes: { Dark: "#000000" },
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.collection).toBe("My Tokens");
		expect(result.modes).toEqual(["Light", "Dark"]);
		expect(result.variables[0]?.values.Light).toBeDefined();
		expect(result.variables[0]?.values.Dark).toBeDefined();
	});

	it("should handle alias references", () => {
		const input: DTCGDocument = {
			color: {
				primary: {
					$value: "#006cff",
					$type: "color",
				},
				accent: {
					$value: "{color.primary}",
					$type: "color",
				},
			},
		};

		const result = fromDTCG(input);

		const accentVar = result.variables.find((v) => v.name === "color/accent");
		expect(accentVar?.aliasTo).toBe("color.primary");
	});

	it("should inherit type from parent group", () => {
		const input: DTCGDocument = {
			color: {
				$type: "color",
				primary: {
					$value: "#006cff",
				},
				secondary: {
					$value: "#ff6b6b",
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.variables).toHaveLength(2);
		expect(result.variables.every((v) => v.type === "COLOR")).toBe(true);
	});

	it("should handle dimension tokens", () => {
		const input: DTCGDocument = {
			spacing: {
				$type: "dimension",
				sm: {
					$value: "8px",
				},
				md: {
					$value: "16px",
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.variables).toHaveLength(2);
		const mdVar = result.variables.find((v) => v.name === "spacing/md");
		expect(mdVar?.type).toBe("FLOAT");
		expect(mdVar?.values.Default).toBe(16);
	});

	it("should handle nested groups", () => {
		const input: DTCGDocument = {
			color: {
				brand: {
					$type: "color",
					primary: {
						$value: "#006cff",
					},
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.variables[0]?.name).toBe("color/brand/primary");
		expect(result.variables[0]?.styleframeName).toBe("color.brand.primary");
	});

	it("should preserve description", () => {
		const input: DTCGDocument = {
			color: {
				primary: {
					$value: "#006cff",
					$type: "color",
					$description: "Primary brand color",
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.variables[0]?.description).toBe("Primary brand color");
	});

	it("should use default mode name when not specified", () => {
		const input: DTCGDocument = {
			color: {
				primary: {
					$value: "#006cff",
					$type: "color",
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.modes).toEqual(["Default"]);
		expect(result.variables[0]?.values.Default).toBeDefined();
	});

	it("should allow overriding collection name", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "Original",
				},
			},
			color: {
				primary: {
					$value: "#006cff",
					$type: "color",
				},
			},
		};

		const result = fromDTCG(input, { collectionName: "Override" });

		expect(result.collection).toBe("Override");
	});

	it("should import from $modifiers.theme format", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "Design Tokens",
					modes: ["Light", "Dark"],
				},
			},
			color: {
				background: {
					$value: "#ffffff",
					$type: "color",
				},
			},
			$modifiers: {
				theme: {
					$type: "modifier",
					contexts: {
						Dark: {
							color: {
								background: { $value: "#000000" },
							},
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.modes).toEqual(["Light", "Dark"]);
		const bgVar = result.variables.find((v) => v.name === "color/background");
		expect(bgVar?.values.Light).toBeDefined();
		expect(bgVar?.values.Dark).toBeDefined();
	});

	it("should infer modes from modifier contexts when no extension modes", () => {
		const input: DTCGDocument = {
			color: {
				primary: {
					$value: "#006cff",
					$type: "color",
				},
			},
			$modifiers: {
				theme: {
					$type: "modifier",
					contexts: {
						Dark: {
							color: {
								primary: { $value: "#60a5fa" },
							},
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.modes).toContain("Default");
		expect(result.modes).toContain("Dark");
	});

	it("should prefer modifiers over legacy extension format", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "Design Tokens",
					modes: ["Light", "Dark"],
				},
			},
			color: {
				background: {
					$value: "#ffffff",
					$type: "color",
					// Legacy format (should be ignored when modifiers present)
					$extensions: {
						"dev.styleframe": {
							modes: { Dark: "#111111" },
						},
					},
				},
			},
			$modifiers: {
				theme: {
					$type: "modifier",
					contexts: {
						Dark: {
							color: {
								background: { $value: "#000000" },
							},
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		const bgVar = result.variables.find((v) => v.name === "color/background");
		// Should use modifier value (#000000), not legacy value (#111111)
		expect(bgVar?.values.Dark).toEqual({ r: 0, g: 0, b: 0, a: 1 });
	});

	it("should handle nested paths in modifier contexts", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "Design Tokens",
					modes: ["Light", "Dark"],
				},
			},
			color: {
				brand: {
					primary: {
						$value: "#006cff",
						$type: "color",
					},
				},
			},
			$modifiers: {
				theme: {
					$type: "modifier",
					contexts: {
						Dark: {
							color: {
								brand: {
									primary: { $value: "#60a5fa" },
								},
							},
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		const primaryVar = result.variables.find(
			(v) => v.name === "color/brand/primary",
		);
		expect(primaryVar?.values.Light).toBeDefined();
		expect(primaryVar?.values.Dark).toBeDefined();
	});

	it("should still support legacy $extensions.dev.styleframe.modes format", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "My Tokens",
					modes: ["Light", "Dark"],
				},
			},
			color: {
				background: {
					$value: "#ffffff",
					$type: "color",
					$extensions: {
						"dev.styleframe": {
							modes: { Dark: "#000000" },
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		expect(result.collection).toBe("My Tokens");
		expect(result.modes).toEqual(["Light", "Dark"]);
		const bgVar = result.variables.find((v) => v.name === "color/background");
		expect(bgVar?.values.Light).toBeDefined();
		expect(bgVar?.values.Dark).toBeDefined();
	});

	it("should handle tokens without overrides in modifier format", () => {
		const input: DTCGDocument = {
			$extensions: {
				"dev.styleframe": {
					collection: "Design Tokens",
					modes: ["Light", "Dark"],
				},
			},
			color: {
				background: {
					$value: "#ffffff",
					$type: "color",
				},
				text: {
					$value: "#000000",
					$type: "color",
				},
			},
			spacing: {
				md: {
					$value: "16px",
					$type: "dimension",
				},
			},
			$modifiers: {
				theme: {
					$type: "modifier",
					contexts: {
						Dark: {
							color: {
								background: { $value: "#000000" },
								text: { $value: "#ffffff" },
							},
							// No spacing override - should use base value
						},
					},
				},
			},
		};

		const result = fromDTCG(input);

		// Tokens without modifier overrides only have the default mode value set.
		// Consumers should fall back to the default mode when a specific mode value is undefined.
		const spacingVar = result.variables.find((v) => v.name === "spacing/md");
		expect(spacingVar?.values.Light).toBe(16);
		// Dark mode not set by modifier - value is undefined, consumers must fall back to Light
		expect(spacingVar?.values.Dark).toBeUndefined();
	});
});
