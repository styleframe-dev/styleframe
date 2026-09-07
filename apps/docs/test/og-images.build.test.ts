import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * OG cards are emitted, and at the ratio crawlers crop to.
 *
 * This failure is silent by construction. `@resvg/resvg-js` rasterises satori's
 * SVG and is a peer of `@uxfront/layer-docs`; when it is absent, prerendering
 * logs `renderer.createImage error` once per card, writes nothing, and still
 * exits 0. The docs then ship with every `og:image` pointing at a 404 and CI
 * stays green — the compiled-CSS guard next door reads the stylesheet, not the
 * cards. `@resvg/resvg-js` is also platform-split into optional native
 * binaries, so a resolution change can drop it back to `optional: true` in the
 * lockfile without touching a single line of application code.
 *
 * The count assertion is deliberately `> 0`, not the current total: cards are
 * one per page, so an exact number would fail on every content change and
 * teach the next person to update it without reading it.
 *
 * Requires a prior `nuxt build`. Excluded from the default `pnpm test` run (see
 * `vitest.config.ts`); runs via `pnpm --filter @styleframe/docs test:build` in
 * the docs build job, against the artifact that job just produced.
 */

const OG_DIR = fileURLToPath(new URL("../.output/public/_og", import.meta.url));

const PNG_SIGNATURE = Buffer.from([
	0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

function findPngs(dir: string): string[] {
	// A rasteriser that wrote nothing leaves no directory at all, so this is the
	// zero case rather than an error — let the count assertion report it.
	if (!existsSync(dir)) {
		return [];
	}

	return readdirSync(dir, { withFileTypes: true, recursive: true })
		.filter((entry) => entry.isFile() && entry.name.endsWith(".png"))
		.map((entry) => join(entry.parentPath, entry.name))
		.sort();
}

/** Read width and height out of a PNG's IHDR chunk, which is always first. */
function readPngSize(file: string): { width: number; height: number } {
	const header = readFileSync(file).subarray(0, 24);

	expect(
		header.subarray(0, 8).equals(PNG_SIGNATURE),
		`${file} is not a PNG — satori emitted something the rasteriser did not finish`,
	).toBe(true);

	return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

describe("OG images", () => {
	it("emits cards during prerendering", () => {
		const cards = findPngs(OG_DIR);

		expect(
			cards.length,
			"no OG cards in .output/public/_og — prerendering ran but the rasteriser " +
				"produced nothing. Check that @resvg/resvg-js resolved (not `optional: true`).",
		).toBeGreaterThan(0);
	});

	it("renders cards at 1200x630", () => {
		const [card] = findPngs(OG_DIR);

		expect(
			card,
			"no card to measure — see the card-count failure above",
		).toBeDefined();
		expect(readPngSize(card)).toEqual({ width: 1200, height: 630 });
	});
});
