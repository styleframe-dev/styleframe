import { describeSingleTailwindPass } from "@uxfront/layer-docs/test";

/**
 * Compiled-output half of the brand-palette guard: exactly one Tailwind pass in
 * the shipped stylesheet, and the teal palette present in it.
 *
 * **What this guards is payload, not layout.** An earlier version of this
 * docblock claimed the second pass "silently kills every `sm:`/`lg:` variant —
 * the homepage `h1` renders 48px instead of 72px and multi-column layouts
 * collapse". That was wrong, and it is corrected here (UXF-121). On the
 * evidence gathered in UXF-118 the second pass costs +212 KB raw / +26.7 KB
 * gzip on a render-blocking `entry.css`, on every page for every visitor — but
 * it does not break the cascade: the duplicate pass was a complete superset of
 * the first and emitted wholly after it, so the last `sm:`/`lg:` variant still
 * landed after the last conflicting base and won by source order. A
 * computed-style A/B across 4 pages x 4 viewports found zero rendering
 * difference. That rescue is incidental, not designed — a non-superset second
 * pass and the cascade does break — but the guard should describe what it
 * actually measures.
 *
 * The assertion set (both unwrapped and `@media`-wrapped utilities, and
 * `=== 1` rather than `<= 1`) lives in the layer preset; see its docblock for
 * why each choice is load-bearing.
 *
 * Requires a prior `nuxt build`. Excluded from the default `pnpm test` run (see
 * `vitest.config.ts`); runs via `pnpm --filter @styleframe/docs test:build` in
 * the docs build job, against the artifact that job just produced.
 */
describeSingleTailwindPass({
	output: new URL("../.output/public/_nuxt", import.meta.url),
	scale: "teal",
	utilities: [".text-5xl"],
});
