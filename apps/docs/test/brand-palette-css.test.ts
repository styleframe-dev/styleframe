import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Regression guard for the P1 introduced by the `@uxfront/layer-docs` re-point
 * (PR #327) and fixed in 56b8d7d.
 *
 * Root cause: a Tailwind `@theme` block is only compiled into real `:root`
 * custom properties when it lives in a file that is itself a Tailwind entry
 * (i.e. imports `tailwindcss`). The re-point dropped the `@import` that made
 * this file an entry, so the `@theme static { --color-teal … }` block shipped
 * to the browser verbatim; browsers discard the unknown at-rule, leaving
 * `--color-teal` / `--ui-primary` undefined and every `*-primary` utility
 * falling back to black/transparent site-wide.
 *
 * This is a source-level invariant guard: it asserts the precondition that
 * makes the brand palette compile, so the regression cannot silently return
 * without a full build. It intentionally does not re-run the Nuxt build; the
 * compiled-output check lives in the docs build job in CI.
 */
const mainCss = readFileSync(
	fileURLToPath(new URL("../app/assets/css/main.css", import.meta.url)),
	"utf8",
);

describe("docs brand palette CSS entrypoint", () => {
	it("imports tailwindcss so it is a Tailwind entry", () => {
		expect(mainCss).toMatch(/@import\s+["']tailwindcss["']/);
	});

	it("imports tailwindcss before the first @theme block", () => {
		const importIndex = mainCss.search(/@import\s+["']tailwindcss["']/);
		const themeIndex = mainCss.search(/@theme\b/);
		expect(importIndex).toBeGreaterThanOrEqual(0);
		expect(themeIndex).toBeGreaterThanOrEqual(0);
		expect(importIndex).toBeLessThan(themeIndex);
	});

	it("defines the teal scale and maps it onto --ui-primary", () => {
		expect(mainCss).toMatch(/@theme\s+static\s*\{[\s\S]*--color-teal\s*:/);
		expect(mainCss).toMatch(/--ui-primary\s*:\s*var\(\s*--color-teal\s*\)/);
	});
});
