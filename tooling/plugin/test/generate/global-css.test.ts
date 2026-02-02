import { describe, expect, it, vi, beforeEach } from "vitest";
import { generateGlobalCSS } from "../../src/generate/global-css";
import type { PluginGlobalState } from "../../src/state";
import type { Styleframe } from "@styleframe/core";

vi.mock("@styleframe/transpiler", () => ({
	transpile: vi.fn(),
}));

vi.mock("@styleframe/license", () => ({
	getLicenseKeyFromEnv: vi.fn(() => "test-license-key"),
	validateInstanceLicense: vi.fn(() => Promise.resolve()),
}));

vi.mock("consola", () => ({
	consola: {
		success: vi.fn(),
		error: vi.fn(),
		info: vi.fn(),
	},
}));

import { transpile } from "@styleframe/transpiler";
import { consola } from "consola";

describe("generateGlobalCSS", () => {
	const createMockState = (
		globalInstance: Styleframe | null = null,
	): PluginGlobalState => ({
		globalInstance,
		configPath: "/path/to/config.ts",
		styleframeFiles: new Map(),
		aggregatedExports: new Map(),
		loadingFiles: new Set(),
		initialized: false,
	});

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("should return comment when globalInstance is null", async () => {
		const state = createMockState(null);
		const result = await generateGlobalCSS(state, false, {});

		expect(result).toEqual({ code: "/* Styleframe not initialized */" });
		expect(transpile).not.toHaveBeenCalled();
	});

	it("should call transpile with css type when instance exists", async () => {
		const mockInstance = {} as Styleframe;
		const state = createMockState(mockInstance);

		vi.mocked(transpile).mockResolvedValue({
			files: [{ name: "styles.css", content: ".button { color: red; }" }],
		});

		const result = await generateGlobalCSS(state, false, { silent: true });

		expect(transpile).toHaveBeenCalledWith(mockInstance, { type: "css" });
		expect(result).toEqual({ code: ".button { color: red; }" });
	});

	it("should concatenate multiple CSS files", async () => {
		const mockInstance = {} as Styleframe;
		const state = createMockState(mockInstance);

		vi.mocked(transpile).mockResolvedValue({
			files: [
				{ name: "base.css", content: ".base { margin: 0; }" },
				{ name: "components.css", content: ".button { padding: 8px; }" },
			],
		});

		const result = await generateGlobalCSS(state, false, { silent: true });

		expect(result.code).toBe(".base { margin: 0; }\n.button { padding: 8px; }");
	});

	it("should log success message when not silent", async () => {
		const mockInstance = {} as Styleframe;
		const state = createMockState(mockInstance);

		vi.mocked(transpile).mockResolvedValue({
			files: [{ name: "styles.css", content: ".test {}" }],
		});

		await generateGlobalCSS(state, false, { silent: false });

		expect(consola.success).toHaveBeenCalledWith(
			"[styleframe] Built global CSS successfully.",
		);
	});

	it("should not log success message when silent", async () => {
		const mockInstance = {} as Styleframe;
		const state = createMockState(mockInstance);

		vi.mocked(transpile).mockResolvedValue({
			files: [{ name: "styles.css", content: ".test {}" }],
		});

		await generateGlobalCSS(state, false, { silent: true });

		expect(consola.success).not.toHaveBeenCalled();
	});

	it("should return empty code when transpile returns no files", async () => {
		const mockInstance = {} as Styleframe;
		const state = createMockState(mockInstance);

		vi.mocked(transpile).mockResolvedValue({
			files: [],
		});

		const result = await generateGlobalCSS(state, false, { silent: true });

		expect(result).toEqual({ code: "" });
	});
});
