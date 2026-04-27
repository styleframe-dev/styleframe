import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/pipeline/transformTs", () => ({
	transformTs: vi.fn(),
}));
vi.mock("@/pipeline/evalUserConfig", () => ({
	evalUserConfig: vi.fn(),
}));
vi.mock("@/pipeline/transpileStyleframe", () => ({
	transpileStyleframe: vi.fn(),
}));
vi.mock("@/pipeline/compileVueSfc", () => ({
	compileVueSfc: vi.fn(),
}));
vi.mock("@/pipeline/buildSrcdoc", () => ({
	buildSrcdoc: vi.fn(),
}));

const input = {
	config: "user-config-source",
	app: "<template/>",
	card: "<template/>",
	button: "<template/>",
	vueUrl: "/vue",
	runtimeUrl: "/runtime",
};

async function loadMocks() {
	const { transformTs } = await import("@/pipeline/transformTs");
	const { evalUserConfig } = await import("@/pipeline/evalUserConfig");
	const { transpileStyleframe } = await import(
		"@/pipeline/transpileStyleframe"
	);
	const { compileVueSfc } = await import("@/pipeline/compileVueSfc");
	const { buildSrcdoc } = await import("@/pipeline/buildSrcdoc");
	return {
		transformTs: vi.mocked(transformTs),
		evalUserConfig: vi.mocked(evalUserConfig),
		transpileStyleframe: vi.mocked(transpileStyleframe),
		compileVueSfc: vi.mocked(compileVueSfc),
		buildSrcdoc: vi.mocked(buildSrcdoc),
	};
}

function wireHappyPath(mocks: Awaited<ReturnType<typeof loadMocks>>) {
	mocks.transformTs.mockImplementation(async (source) => `js:${source}`);
	mocks.evalUserConfig.mockResolvedValue({} as never);
	mocks.transpileStyleframe.mockResolvedValue({
		css: ".cls{color:red}",
		ts: "export const cls = () => 'cls';",
	});
	mocks.compileVueSfc.mockImplementation(async (_source, filename) => ({
		code: `// ${filename}`,
	}));
	const revoke = vi.fn();
	mocks.buildSrcdoc.mockReturnValue({ srcdoc: "<html></html>", revoke });
	return { revoke };
}

describe("runPipeline", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("resolves with assembled output on the happy path", async () => {
		const mocks = await loadMocks();
		const { revoke } = wireHappyPath(mocks);
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(true);
		if (!result.ok) return;
		expect(result.css).toBe(".cls{color:red}");
		expect(result.runtimeTs).toBe("export const cls = () => 'cls';");
		expect(result.configCode).toBe("js:export const cls = () => 'cls';");
		expect(result.appCode).toBe("// App.vue");
		expect(result.cardCode).toBe("// Card.vue");
		expect(result.buttonCode).toBe("// Button.vue");
		expect(result.srcdoc).toBe("<html></html>");
		expect(result.scan).toEqual({ count: 0, registered: [], diagnostics: [] });
		expect(result.revoke).toBe(revoke);
	});

	it("returns stage 'config-transform' when the first TS transform rejects", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.transformTs.mockRejectedValueOnce(new Error("bad config"));
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result).toMatchObject({
			ok: false,
			stage: "config-transform",
		});
		if (result.ok) return;
		expect(result.error.message).toBe("bad config");
	});

	it("returns stage 'config-eval' when evalUserConfig rejects", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.evalUserConfig.mockRejectedValueOnce(new Error("no default export"));
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.stage).toBe("config-eval");
		expect(result.error.message).toBe("no default export");
	});

	it("returns stage 'transpile' when transpileStyleframe rejects", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.transpileStyleframe.mockRejectedValueOnce(new Error("transpile"));
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.stage).toBe("transpile");
	});

	it("returns stage 'config-compile' when the second transformTs call rejects", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.transformTs
			.mockResolvedValueOnce("first-call-ok")
			.mockRejectedValueOnce(new Error("second-call-bad"));
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.stage).toBe("config-compile");
		expect(result.error.message).toBe("second-call-bad");
	});

	it("returns stage 'vue' when compileVueSfc rejects", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.compileVueSfc.mockRejectedValueOnce(new Error("sfc"));
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.stage).toBe("vue");
	});

	it("returns stage 'assemble' when buildSrcdoc throws", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.buildSrcdoc.mockImplementationOnce(() => {
			throw new Error("assemble");
		});
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.stage).toBe("assemble");
	});

	it("wraps non-Error throws into Error instances", async () => {
		const mocks = await loadMocks();
		wireHappyPath(mocks);
		mocks.transformTs.mockRejectedValueOnce("boom");
		const { runPipeline } = await import("@/pipeline/pipeline");

		const result = await runPipeline(input);

		expect(result.ok).toBe(false);
		if (result.ok) return;
		expect(result.error).toBeInstanceOf(Error);
		expect(result.error.message).toBe("boom");
	});
});

describe("debounce", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it("invokes the target after the wait elapses", async () => {
		const { debounce } = await import("@/pipeline/pipeline");
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced("a");
		expect(fn).not.toHaveBeenCalled();
		vi.advanceTimersByTime(100);
		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith("a");
	});

	it("collapses rapid calls into a single invocation with the last args", async () => {
		const { debounce } = await import("@/pipeline/pipeline");
		const fn = vi.fn();
		const debounced = debounce(fn, 50);

		debounced(1);
		debounced(2);
		debounced(3);

		vi.advanceTimersByTime(50);
		expect(fn).toHaveBeenCalledTimes(1);
		expect(fn).toHaveBeenCalledWith(3);
	});

	it("resets the timer when called again before the wait elapses", async () => {
		const { debounce } = await import("@/pipeline/pipeline");
		const fn = vi.fn();
		const debounced = debounce(fn, 100);

		debounced("first");
		vi.advanceTimersByTime(50);
		debounced("second");
		vi.advanceTimersByTime(50);
		expect(fn).not.toHaveBeenCalled();
		vi.advanceTimersByTime(50);
		expect(fn).toHaveBeenCalledWith("second");
	});
});
