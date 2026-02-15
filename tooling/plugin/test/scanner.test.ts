import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import type { PluginGlobalState } from "../src/plugin/state";
import {
	registerMatchedUtilities,
	createPluginScanner,
	isContentFile,
} from "../src/plugin/scanner";
import type { UtilityMatch, ParsedUtility } from "@styleframe/scanner";

function createMockState(
	instance?: ReturnType<typeof styleframe>,
): PluginGlobalState {
	return {
		globalInstance: instance ?? null,
		configFile: {
			path: "/path/to/config.ts",
			loadOrder: -1,
			exports: new Map(),
			lastModified: 0,
		},
		files: new Map(),
		loadingFiles: new Set(),
		initialized: false,
	};
}

function createParsedUtility(
	overrides: Partial<ParsedUtility> & { name: string; value: string },
): ParsedUtility {
	return {
		raw: `_${overrides.modifiers?.length ? overrides.modifiers.join(":") + ":" : ""}${overrides.name}:${overrides.value}`,
		modifiers: [],
		isArbitrary: false,
		...overrides,
	};
}

describe("scanner integration", () => {
	describe("registerMatchedUtilities", () => {
		it("should register non-arbitrary values via autogenerate", () => {
			const s = styleframe();
			const { utility, variable } = s;

			// Define a variable and a utility factory
			const spacing = variable("spacing.sm", "0.5rem");
			const createMargin = utility("margin", ({ value }) => ({
				margin: value,
			}));

			const state = createMockState(s);

			// Create a match for _margin:spacing.sm that doesn't exist yet
			const factory = s.root.utilities.find((u) => u.name === "margin")!;
			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "spacing.sm",
					}),
					factory,
					modifierFactories: [],
					exists: false,
				},
			];

			const count = registerMatchedUtilities(state, matches);

			expect(count).toBe(1);
			// The factory should now have the value registered
			expect(factory.values.some((v) => v.key === "spacing.sm")).toBe(true);
		});

		it("should register arbitrary values with literal CSS value", () => {
			const s = styleframe();
			const { utility } = s;

			utility("margin", ({ value }) => ({
				margin: value,
			}));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;

			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "[16px]",
						isArbitrary: true,
						arbitraryValue: "16px",
					}),
					factory,
					modifierFactories: [],
					exists: false,
				},
			];

			const count = registerMatchedUtilities(state, matches);

			expect(count).toBe(1);
			expect(factory.values.some((v) => v.key === "[16px]")).toBe(true);
		});

		it("should register values with modifiers", () => {
			const s = styleframe();
			const { utility, modifier } = s;

			const hover = modifier("hover", ({ declarations }) => ({
				"&:hover": declarations,
			}));

			utility("margin", ({ value }) => ({
				margin: value,
			}));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;

			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "sm",
						modifiers: ["hover"],
						raw: "_hover:margin:sm",
					}),
					factory,
					modifierFactories: [hover],
					exists: false,
				},
			];

			const count = registerMatchedUtilities(state, matches);

			expect(count).toBe(1);
			// Should have both base and hover variant
			expect(factory.values.some((v) => v.key === "sm")).toBe(true);
			expect(
				factory.values.some(
					(v) =>
						v.key === "sm" &&
						v.modifiers.length === 1 &&
						v.modifiers[0] === "hover",
				),
			).toBe(true);
		});

		it("should skip matches that already exist", () => {
			const s = styleframe();
			const { utility, ref, variable } = s;

			const spacing = variable("spacing.sm", "0.5rem");
			const createMargin = utility("margin", ({ value }) => ({
				margin: value,
			}));
			createMargin({ sm: ref(spacing) });

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;
			const valueCountBefore = factory.values.length;

			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "sm",
					}),
					factory,
					modifierFactories: [],
					exists: true, // already exists
				},
			];

			const count = registerMatchedUtilities(state, matches);

			expect(count).toBe(0);
			expect(factory.values.length).toBe(valueCountBefore);
		});

		it("should skip matches with no factory", () => {
			const s = styleframe();
			const state = createMockState(s);

			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "unknown-utility",
						value: "sm",
					}),
					factory: null,
					modifierFactories: [],
					exists: false,
				},
			];

			const count = registerMatchedUtilities(state, matches);

			expect(count).toBe(0);
		});

		it("should deduplicate matches with same factory and value", () => {
			const s = styleframe();
			const { utility } = s;

			utility("margin", ({ value }) => ({
				margin: value,
			}));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;

			// Two matches for the same utility:value from different files
			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "sm",
					}),
					factory,
					modifierFactories: [],
					exists: false,
				},
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "sm",
					}),
					factory,
					modifierFactories: [],
					exists: false,
				},
			];

			const count = registerMatchedUtilities(state, matches);

			// Should only register once
			expect(count).toBe(1);
		});

		it("should merge modifiers from multiple matches of same value", () => {
			const s = styleframe();
			const { utility, modifier } = s;

			const hover = modifier("hover", ({ declarations }) => ({
				"&:hover": declarations,
			}));
			const focus = modifier("focus", ({ declarations }) => ({
				"&:focus": declarations,
			}));

			utility("margin", ({ value }) => ({
				margin: value,
			}));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;

			const matches: UtilityMatch[] = [
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "sm",
						modifiers: ["hover"],
						raw: "_hover:margin:sm",
					}),
					factory,
					modifierFactories: [hover],
					exists: false,
				},
				{
					parsed: createParsedUtility({
						name: "margin",
						value: "sm",
						modifiers: ["focus"],
						raw: "_focus:margin:sm",
					}),
					factory,
					modifierFactories: [focus],
					exists: false,
				},
			];

			const count = registerMatchedUtilities(state, matches);

			expect(count).toBe(1); // Grouped into one registration
			// Should have base + hover + focus + hover:focus combinations
			expect(factory.values.some((v) => v.key === "sm")).toBe(true);
			expect(
				factory.values.some(
					(v) => v.key === "sm" && v.modifiers.includes("hover"),
				),
			).toBe(true);
			expect(
				factory.values.some(
					(v) => v.key === "sm" && v.modifiers.includes("focus"),
				),
			).toBe(true);
		});
	});

	describe("isContentFile", () => {
		it("should return false when scannerState is null", () => {
			expect(isContentFile(null, "/some/file.tsx")).toBe(false);
		});

		it("should return true for tracked files", () => {
			const scannerState = createPluginScanner(["./src/**/*.tsx"], "/");
			scannerState.scannedFiles.add("/some/file.tsx");

			expect(isContentFile(scannerState, "/some/file.tsx")).toBe(true);
		});

		it("should return false for untracked files", () => {
			const scannerState = createPluginScanner(["./src/**/*.tsx"], "/");

			expect(isContentFile(scannerState, "/some/file.tsx")).toBe(false);
		});
	});
});
