import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Regression guard for the brand-palette compile precondition on the
 * `@uxfront/layer-docs` re-point (PR #327).
 *
 * Root cause it guards: a Tailwind `@theme` block only compiles into real
 * `:root` custom properties when it lives in a file that is part of a Tailwind
 * pass. If this file stops being a Tailwind entry the `@theme static
 * { --color-teal … }` block ships to the browser verbatim; browsers discard the
 * unknown at-rule, leaving `--color-teal` / `--ui-primary` undefined and every
 * `*-primary` utility falling back to black/transparent site-wide.
 *
 * The entry is established by importing a Tailwind pass BEFORE the `@theme`
 * block. The direct `@import "tailwindcss"` the first teal fix used opened a
 * SECOND Tailwind pass (the layer already owns one), which re-emitted every
 * base utility after the layer's responsive rules and clobbered every
 * `sm:`/`lg:` variant by source order. The fix folds this file into the layer's
 * single pass by importing the layer's base CSS instead — still a valid entry,
 * one emission (see `app/assets/css/main.css`). This guard therefore accepts
 * either a direct `tailwindcss` import or the layer base import as the entry.
 *
 * Source-level invariant guard: it asserts the precondition that makes the
 * brand palette compile, so the regression cannot silently return without a
 * full build. It intentionally does not re-run the Nuxt build; the
 * compiled-output check lives in the docs build job in CI.
 */
const mainCss = readFileSync(
	fileURLToPath(new URL("../app/assets/css/main.css", import.meta.url)),
	"utf8",
);

// A Tailwind pass reached either directly or via the layer's base CSS (which
// owns the single `@import "tailwindcss"`). Either makes this file an entry.
const TAILWIND_ENTRY_IMPORT =
	/@import\s+["'](?:tailwindcss|@uxfront\/layer-docs\/[^"']*main\.css)["']/;

describe("docs brand palette CSS entrypoint", () => {
	it("imports a Tailwind pass so it is a Tailwind entry", () => {
		expect(mainCss).toMatch(TAILWIND_ENTRY_IMPORT);
	});

	it("imports the Tailwind pass before the first @theme block", () => {
		const importIndex = mainCss.search(TAILWIND_ENTRY_IMPORT);
		// Match the block opener specifically, not the `@theme` word in the
		// leading docblock comment.
		const themeIndex = mainCss.search(/@theme\s+static\s*\{/);
		expect(importIndex).toBeGreaterThanOrEqual(0);
		expect(themeIndex).toBeGreaterThanOrEqual(0);
		expect(importIndex).toBeLessThan(themeIndex);
	});

	it("defines the teal scale and maps it onto --ui-primary", () => {
		expect(mainCss).toMatch(/@theme\s+static\s*\{[\s\S]*--color-teal\s*:/);
		expect(mainCss).toMatch(/--ui-primary\s*:\s*var\(\s*--color-teal\s*\)/);
	});
});
