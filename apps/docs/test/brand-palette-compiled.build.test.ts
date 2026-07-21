import { existsSync, readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Compiled-output regression guard for the single-Tailwind-pass invariant on the
 * `@uxfront/layer-docs` re-point (PR #327).
 *
 * The companion source guard (`brand-palette-css.test.ts`) only asserts that
 * `main.css` is a Tailwind entry — it cannot see the failure mode this file
 * exists for. When the consumer opens a SECOND Tailwind pass (a bare
 * `@import "tailwindcss"`) or the layer's standalone CSS registration is not
 * stripped in `nuxt.config.ts`, every base utility is emitted twice into the
 * final stylesheet. The second copy lands after the first pass's responsive
 * rules at equal specificity and wins by source order, silently killing every
 * `sm:`/`lg:` variant: the homepage `h1` renders 48px instead of 72px and
 * multi-column layouts collapse. Only the compiled CSS shows this, so this guard
 * inspects the real build output.
 *
 * Reference measurement (viewport-independent): on the broken build the docs
 * `entry.css` carried ~150 duplicated top-level utility selectors and each base
 * utility below appeared twice; the single-pass build emits each exactly once.
 *
 * Requires a prior `nuxt build`. It is intentionally NOT part of the default
 * `pnpm test` run (that job does not build the docs app); it runs via
 * `pnpm --filter @styleframe/docs test:build` in the docs build job.
 */
const nuxtDir = fileURLToPath(
	new URL("../.output/public/_nuxt", import.meta.url),
);

function readEntryCss(): string {
	if (!existsSync(nuxtDir)) {
		throw new Error(
			`Compiled output not found at ${nuxtDir}. Build the docs app first ` +
				`(nuxt build) before running the compiled-output guard.`,
		);
	}
	const entry = readdirSync(nuxtDir)
		.filter((f) => /^entry\..*\.css$/.test(f))
		.sort();
	if (entry.length === 0) {
		throw new Error(
			`No entry.*.css found in ${nuxtDir}. Build the docs app first (nuxt build).`,
		);
	}
	// Strip comments so counts reflect emitted rules only.
	return readFileSync(`${nuxtDir}/${entry.at(-1)}`, "utf8").replace(
		/\/\*[\s\S]*?\*\//g,
		"",
	);
}

/** Count how many times a base utility is emitted as its own class selector. */
function countBaseUtility(css: string, utility: string): number {
	const escaped = utility.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	// A leading `.` immediately followed by the class name, not part of a longer
	// variant selector such as `.sm\:text-5xl` (there the class is preceded by a
	// escaped colon, so `.text-5xl` never appears).
	const re = new RegExp(`(?<![\\w\\\\:-])${escaped}(?![\\w-])`, "g");
	return (css.match(re) ?? []).length;
}

// Ubiquitous base utilities the layer and Nuxt UI always emit. Each must appear
// exactly once in a single-pass build; the double-emit regression makes them 2.
const BASE_UTILITIES = [".relative", ".flex", ".grid", ".hidden", ".block"];

describe("docs compiled CSS: single Tailwind pass", () => {
	const css = readEntryCss();

	it("emits the hero heading utility .text-5xl exactly once", () => {
		expect(countBaseUtility(css, ".text-5xl")).toBe(1);
	});

	it("does not double-emit base utilities (no second Tailwind pass)", () => {
		const duplicated = BASE_UTILITIES.filter(
			(u) => countBaseUtility(css, u) > 1,
		);
		expect(duplicated).toEqual([]);
	});
});
