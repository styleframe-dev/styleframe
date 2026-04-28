import { beforeEach, describe, expect, it, vi } from "vitest";
import { usePlaygroundSnapshot, usePlaygroundState } from "@/state/playground";

describe("usePlaygroundState", () => {
	beforeEach(() => {
		const state = usePlaygroundState();
		state.activeFile = "config";
		state.activeOutput = "preview";
		state.output.css = "";
		state.output.runtimeTs = "";
		state.output.srcdoc = "";
		state.error = null;
	});

	it("exposes non-empty sample files and sensible defaults", () => {
		const state = usePlaygroundState();

		expect(state.files.config.length).toBeGreaterThan(0);
		expect(state.files.app.length).toBeGreaterThan(0);
		expect(state.files.card.length).toBeGreaterThan(0);
		expect(state.files.button.length).toBeGreaterThan(0);
		expect(state.activeFile).toBe("config");
		expect(state.activeOutput).toBe("preview");
		expect(state.error).toBeNull();
		expect(state.output).toEqual({ css: "", runtimeTs: "", srcdoc: "" });
	});

	it("returns the same reactive instance across calls", () => {
		expect(usePlaygroundState()).toBe(usePlaygroundState());
	});

	it("reflects mutations on subsequent reads", () => {
		const state = usePlaygroundState();
		state.activeFile = "app";
		state.output.css = ".hello{}";
		state.error = "boom";

		const reread = usePlaygroundState();
		expect(reread.activeFile).toBe("app");
		expect(reread.output.css).toBe(".hello{}");
		expect(reread.error).toBe("boom");
	});
});

describe("usePlaygroundSnapshot", () => {
	beforeEach(() => {
		const state = usePlaygroundState();
		state.activeFile = "config";
		state.output.css = "";
	});

	it("reflects mutations made through the mutable handle", () => {
		usePlaygroundState().output.css = ".shared{}";
		expect(usePlaygroundSnapshot().output.css).toBe(".shared{}");
	});

	it("warns when callers try to mutate the snapshot", () => {
		const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
		try {
			const snapshot = usePlaygroundSnapshot();
			// @ts-expect-error — readonly on purpose
			snapshot.activeFile = "app";
			expect(warn).toHaveBeenCalled();
			expect(usePlaygroundState().activeFile).toBe("config");
		} finally {
			warn.mockRestore();
		}
	});
});
