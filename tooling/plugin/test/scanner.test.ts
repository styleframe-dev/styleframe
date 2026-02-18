import { describe, expect, it, vi, beforeEach } from "vitest";
import { styleframe } from "@styleframe/core";
import type { PluginGlobalState } from "../src/plugin/state";
import {
	registerMatchedUtilities,
	createPluginScanner,
	isContentFile,
	scanAndRegister,
	scanFileAndRegister,
	type PluginScannerState,
} from "../src/plugin/scanner";
import type {
	UtilityMatch,
	ParsedUtility,
	Scanner,
	ScanResult,
	FileScanResult,
} from "@styleframe/scanner";

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

	describe("scanAndRegister", () => {
		function createMockScanner(overrides?: Partial<Scanner>): Scanner {
			return {
				scan: vi.fn().mockResolvedValue({
					files: new Map(),
					allClasses: new Set(),
					allParsed: [],
				} satisfies ScanResult),
				scanFile: vi.fn().mockResolvedValue({
					path: "",
					classes: new Set(),
					parsed: [],
					lastScanned: 0,
				} satisfies FileScanResult),
				scanContent: vi.fn().mockReturnValue([]),
				match: vi.fn().mockReturnValue([]),
				watch: vi.fn().mockReturnValue(() => {}),
				invalidate: vi.fn(),
				...overrides,
			};
		}

		function createMockScannerState(scanner?: Scanner): PluginScannerState {
			return {
				scanner: scanner ?? createMockScanner(),
				scannedFiles: new Set(),
			};
		}

		it("should return 0 when globalInstance is null", async () => {
			const state = createMockState();
			const scannerState = createMockScannerState();

			const count = await scanAndRegister(state, scannerState);

			expect(count).toBe(0);
			expect(scannerState.scanner.scan).not.toHaveBeenCalled();
		});

		it("should scan files and update scannedFiles set", async () => {
			const s = styleframe();
			const state = createMockState(s);

			const scanResult: ScanResult = {
				files: new Map([
					[
						"/src/app.tsx",
						{
							path: "/src/app.tsx",
							classes: new Set(),
							parsed: [],
							lastScanned: Date.now(),
						},
					],
					[
						"/src/page.tsx",
						{
							path: "/src/page.tsx",
							classes: new Set(),
							parsed: [],
							lastScanned: Date.now(),
						},
					],
				]),
				allClasses: new Set(),
				allParsed: [],
			};

			const scanner = createMockScanner({
				scan: vi.fn().mockResolvedValue(scanResult),
				match: vi.fn().mockReturnValue([]),
			});
			const scannerState = createMockScannerState(scanner);

			await scanAndRegister(state, scannerState);

			expect(scannerState.scannedFiles.has("/src/app.tsx")).toBe(true);
			expect(scannerState.scannedFiles.has("/src/page.tsx")).toBe(true);
			expect(scannerState.scannedFiles.size).toBe(2);
		});

		it("should clear previous scannedFiles on each scan", async () => {
			const s = styleframe();
			const state = createMockState(s);

			const scanner = createMockScanner({
				scan: vi.fn().mockResolvedValue({
					files: new Map([
						[
							"/src/new.tsx",
							{
								path: "/src/new.tsx",
								classes: new Set(),
								parsed: [],
								lastScanned: Date.now(),
							},
						],
					]),
					allClasses: new Set(),
					allParsed: [],
				} satisfies ScanResult),
				match: vi.fn().mockReturnValue([]),
			});
			const scannerState = createMockScannerState(scanner);
			scannerState.scannedFiles.add("/src/old.tsx");

			await scanAndRegister(state, scannerState);

			expect(scannerState.scannedFiles.has("/src/old.tsx")).toBe(false);
			expect(scannerState.scannedFiles.has("/src/new.tsx")).toBe(true);
		});

		it("should match parsed utilities against root and register them", async () => {
			const s = styleframe();
			const { utility } = s;

			utility("padding", ({ value }) => ({ padding: value }));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "padding")!;

			const parsed: ParsedUtility[] = [
				createParsedUtility({ name: "padding", value: "sm" }),
			];

			const matches: UtilityMatch[] = [
				{
					parsed: parsed[0],
					factory,
					modifierFactories: [],
					exists: false,
				},
			];

			const scanner = createMockScanner({
				scan: vi.fn().mockResolvedValue({
					files: new Map(),
					allClasses: new Set(),
					allParsed: parsed,
				} satisfies ScanResult),
				match: vi.fn().mockReturnValue(matches),
			});
			const scannerState = createMockScannerState(scanner);

			const count = await scanAndRegister(state, scannerState);

			expect(count).toBe(1);
			expect(scanner.match).toHaveBeenCalledWith(parsed, s.root);
		});

		it("should suppress logging when silent option is true", async () => {
			const s = styleframe();
			const { utility } = s;

			utility("padding", ({ value }) => ({ padding: value }));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "padding")!;

			const parsed: ParsedUtility[] = [
				createParsedUtility({ name: "padding", value: "sm" }),
			];

			const unmatchedParsed = createParsedUtility({
				name: "unknown",
				value: "lg",
			});

			const matches: UtilityMatch[] = [
				{
					parsed: parsed[0],
					factory,
					modifierFactories: [],
					exists: false,
				},
				{
					parsed: unmatchedParsed,
					factory: null,
					modifierFactories: [],
					exists: false,
				},
			];

			const scanner = createMockScanner({
				scan: vi.fn().mockResolvedValue({
					files: new Map(),
					allClasses: new Set(),
					allParsed: parsed,
				} satisfies ScanResult),
				match: vi.fn().mockReturnValue(matches),
			});
			const scannerState = createMockScannerState(scanner);

			const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

			// Should not throw or error when silent
			const count = await scanAndRegister(state, scannerState, {
				silent: true,
			});

			expect(count).toBe(1);
			warnSpy.mockRestore();
		});

		it("should return 0 when there are no matches to register", async () => {
			const s = styleframe();
			const state = createMockState(s);

			const scanner = createMockScanner({
				scan: vi.fn().mockResolvedValue({
					files: new Map(),
					allClasses: new Set(),
					allParsed: [],
				} satisfies ScanResult),
				match: vi.fn().mockReturnValue([]),
			});
			const scannerState = createMockScannerState(scanner);

			const count = await scanAndRegister(state, scannerState);

			expect(count).toBe(0);
		});
	});

	describe("scanFileAndRegister", () => {
		function createMockScanner(overrides?: Partial<Scanner>): Scanner {
			return {
				scan: vi.fn().mockResolvedValue({
					files: new Map(),
					allClasses: new Set(),
					allParsed: [],
				}),
				scanFile: vi.fn().mockResolvedValue({
					path: "",
					classes: new Set(),
					parsed: [],
					lastScanned: 0,
				} satisfies FileScanResult),
				scanContent: vi.fn().mockReturnValue([]),
				match: vi.fn().mockReturnValue([]),
				watch: vi.fn().mockReturnValue(() => {}),
				invalidate: vi.fn(),
				...overrides,
			};
		}

		function createMockScannerState(scanner?: Scanner): PluginScannerState {
			return {
				scanner: scanner ?? createMockScanner(),
				scannedFiles: new Set(),
			};
		}

		it("should return false when globalInstance is null", async () => {
			const state = createMockState();
			const scannerState = createMockScannerState();

			const result = await scanFileAndRegister(
				state,
				scannerState,
				"/src/app.tsx",
			);

			expect(result).toBe(false);
			expect(scannerState.scanner.invalidate).not.toHaveBeenCalled();
		});

		it("should invalidate cache and scan the file", async () => {
			const s = styleframe();
			const state = createMockState(s);

			const filePath = "/src/app.tsx";
			const fileResult: FileScanResult = {
				path: filePath,
				classes: new Set(),
				parsed: [],
				lastScanned: Date.now(),
			};

			const scanner = createMockScanner({
				scanFile: vi.fn().mockResolvedValue(fileResult),
				match: vi.fn().mockReturnValue([]),
			});
			const scannerState = createMockScannerState(scanner);

			await scanFileAndRegister(state, scannerState, filePath);

			expect(scanner.invalidate).toHaveBeenCalledWith(filePath);
			expect(scanner.scanFile).toHaveBeenCalledWith(filePath);
		});

		it("should return true when new utilities are registered", async () => {
			const s = styleframe();
			const { utility } = s;

			utility("margin", ({ value }) => ({ margin: value }));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;

			const filePath = "/src/app.tsx";
			const parsed: ParsedUtility[] = [
				createParsedUtility({ name: "margin", value: "lg" }),
			];

			const fileResult: FileScanResult = {
				path: filePath,
				classes: new Set(["_margin:lg"]),
				parsed,
				lastScanned: Date.now(),
			};

			const matches: UtilityMatch[] = [
				{
					parsed: parsed[0],
					factory,
					modifierFactories: [],
					exists: false,
				},
			];

			const scanner = createMockScanner({
				scanFile: vi.fn().mockResolvedValue(fileResult),
				match: vi.fn().mockReturnValue(matches),
			});
			const scannerState = createMockScannerState(scanner);

			const result = await scanFileAndRegister(state, scannerState, filePath);

			expect(result).toBe(true);
			expect(scanner.match).toHaveBeenCalledWith(parsed, s.root);
		});

		it("should return false when no new utilities are registered", async () => {
			const s = styleframe();
			const { utility } = s;

			utility("margin", ({ value }) => ({ margin: value }));

			const state = createMockState(s);
			const factory = s.root.utilities.find((u) => u.name === "margin")!;

			const filePath = "/src/app.tsx";
			const parsed: ParsedUtility[] = [
				createParsedUtility({ name: "margin", value: "sm" }),
			];

			const fileResult: FileScanResult = {
				path: filePath,
				classes: new Set(["_margin:sm"]),
				parsed,
				lastScanned: Date.now(),
			};

			// Match exists already
			const matches: UtilityMatch[] = [
				{
					parsed: parsed[0],
					factory,
					modifierFactories: [],
					exists: true,
				},
			];

			const scanner = createMockScanner({
				scanFile: vi.fn().mockResolvedValue(fileResult),
				match: vi.fn().mockReturnValue(matches),
			});
			const scannerState = createMockScannerState(scanner);

			const result = await scanFileAndRegister(state, scannerState, filePath);

			expect(result).toBe(false);
		});

		it("should return false when file has no utility classes", async () => {
			const s = styleframe();
			const state = createMockState(s);

			const filePath = "/src/plain.tsx";
			const fileResult: FileScanResult = {
				path: filePath,
				classes: new Set(),
				parsed: [],
				lastScanned: Date.now(),
			};

			const scanner = createMockScanner({
				scanFile: vi.fn().mockResolvedValue(fileResult),
				match: vi.fn().mockReturnValue([]),
			});
			const scannerState = createMockScannerState(scanner);

			const result = await scanFileAndRegister(state, scannerState, filePath);

			expect(result).toBe(false);
		});
	});
});
