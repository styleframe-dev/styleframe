import { beforeAll, describe, expect, it, vi } from "vitest";
import { initRealEsbuild } from "./helpers/esbuild";

vi.mock("@/pipeline/esbuild", () => ({
	getEsbuild: () => initRealEsbuild(),
}));

describe("compileVueSfc", () => {
	beforeAll(async () => {
		await initRealEsbuild();
	});

	it("compiles a template-only SFC with an inline render function", async () => {
		const { compileVueSfc } = await import("@/pipeline/compileVueSfc");
		const { code } = await compileVueSfc(
			"<template><div>hello</div></template>",
			"Hello.vue",
		);

		expect(code).toContain("const __sfc__ = {}");
		expect(code).toContain("__sfc__.render = _sfc_render;");
		expect(code).toContain('__sfc__.__file = "Hello.vue"');
		expect(code.trimEnd().endsWith("export default __sfc__;")).toBe(true);
	});

	it("compiles a <script setup> block via rewriteDefault", async () => {
		const source = [
			"<script setup>",
			"const value = 42;",
			"</script>",
			"<template><p>{{ value }}</p></template>",
		].join("\n");

		const { compileVueSfc } = await import("@/pipeline/compileVueSfc");
		const { code } = await compileVueSfc(source, "Setup.vue");

		expect(code).toContain("__sfc__");
		expect(code).not.toMatch(/export default \{/);
		expect(code).toContain("__sfc__.render = _sfc_render;");
	});

	it("produces a stable scope id for the same filename", async () => {
		const source =
			"<template><div /></template>\n<style scoped>div { color: red; }</style>";

		const { compileVueSfc } = await import("@/pipeline/compileVueSfc");
		const first = await compileVueSfc(source, "Scoped.vue");
		const second = await compileVueSfc(source, "Scoped.vue");

		expect(first.code).toBe(second.code);
	});

	it("throws when the SFC fails to parse", async () => {
		const { compileVueSfc } = await import("@/pipeline/compileVueSfc");
		await expect(
			compileVueSfc("<template><div></template>", "Broken.vue"),
		).rejects.toThrow();
	});

	it("throws when the template compiler reports errors", async () => {
		const { compileVueSfc } = await import("@/pipeline/compileVueSfc");
		await expect(
			compileVueSfc("<template><div>{{ foo. }}</div></template>", "Expr.vue"),
		).rejects.toThrow();
	});
});
