import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { expect, test } from "@playwright/test";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const RESULTS = join(ROOT, "results");

/**
 * Visual parity verification — currently a smoke test that each rendered page
 * loads without console errors. Full pixel-diff parity (≤2%) against the
 * Tailwind baseline is planned but requires precise design-token alignment
 * in `src/tailwind/theme-mapper.ts` and exact class equivalents per slot.
 */

async function checkRender(
	page: import("@playwright/test").Page,
	relPath: string,
): Promise<void> {
	const errors: string[] = [];
	page.on("console", (msg) => {
		if (msg.type() === "error") errors.push(msg.text());
	});
	page.on("pageerror", (err) => errors.push(err.message));

	await page.goto(`file://${join(RESULTS, relPath)}`);
	await page.waitForLoadState("networkidle");
	const bodyText = await page.locator("body").innerText();
	expect(bodyText.length).toBeGreaterThan(0);
	expect(errors).toEqual([]);
}

test("tailwind renders", async ({ page }) => {
	await checkRender(page, "tailwind/index.html");
});

test("styleframe renders", async ({ page }) => {
	await checkRender(page, "styleframe/index.html");
});

test("styleframe-minified renders", async ({ page }) => {
	await checkRender(page, "styleframe-minified/index.html");
});
