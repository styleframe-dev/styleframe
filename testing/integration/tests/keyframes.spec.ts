import { test, expect } from "@playwright/test";

test.describe("Keyframes and Animations", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/#/keyframes");
	});

	test("animation properties are applied via selector", async ({ page }) => {
		const element = page.locator("#test-animation");

		const styles = await element.evaluate((el) => {
			const computed = window.getComputedStyle(el);
			return {
				animationName: computed.animationName,
				animationDuration: computed.animationDuration,
				animationFillMode: computed.animationFillMode,
			};
		});

		expect(styles.animationName).toBe("fade-in");
		expect(styles.animationDuration).toBe("0.3s");
		expect(styles.animationFillMode).toBe("forwards");
	});

	test("@keyframes rule exists in stylesheets", async ({ page }) => {
		const hasKeyframes = await page.evaluate(() => {
			for (const sheet of document.styleSheets) {
				try {
					for (const rule of sheet.cssRules) {
						if (rule instanceof CSSKeyframesRule && rule.name === "fade-in") {
							return true;
						}
					}
				} catch {
					// Cross-origin stylesheets may throw
				}
			}
			return false;
		});

		expect(hasKeyframes).toBe(true);
	});
});
