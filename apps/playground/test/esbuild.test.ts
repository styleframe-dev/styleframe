import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const initialize = vi.fn(async () => undefined);

vi.mock("esbuild-wasm/esm/browser", () => ({
	initialize,
	transform: vi.fn(),
}));

vi.mock("esbuild-wasm/esbuild.wasm?url", () => ({
	default: "/fake-esbuild.wasm",
}));

describe("getEsbuild", () => {
	beforeEach(() => {
		vi.resetModules();
		initialize.mockClear();
	});

	afterEach(() => {
		vi.resetModules();
	});

	it("returns the same promise across repeated calls", async () => {
		const { getEsbuild } = await import("@/pipeline/esbuild");
		const a = getEsbuild();
		const b = getEsbuild();
		expect(a).toBe(b);
		await a;
	});

	it("calls esbuild.initialize exactly once even with concurrent callers", async () => {
		const { getEsbuild } = await import("@/pipeline/esbuild");
		await Promise.all([getEsbuild(), getEsbuild(), getEsbuild()]);
		expect(initialize).toHaveBeenCalledTimes(1);
		expect(initialize).toHaveBeenCalledWith({
			wasmURL: "/fake-esbuild.wasm",
			worker: true,
		});
	});
});
