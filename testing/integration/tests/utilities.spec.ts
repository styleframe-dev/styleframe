import { test, expect } from "@playwright/test";

test.describe("Utility Classes", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/#/utilities");
	});

	test("margin utility applies correct spacing", async ({ page }) => {
		const element = page.locator("#test-margin");
		const margin = await element.evaluate(
			(el) => window.getComputedStyle(el).margin,
		);
		expect(margin).toBe("8px");
	});

	test("padding utility applies correct spacing", async ({ page }) => {
		const element = page.locator("#test-padding");
		const padding = await element.evaluate(
			(el) => window.getComputedStyle(el).padding,
		);
		expect(padding).toBe("16px");
	});

	test("background utility applies correct color", async ({ page }) => {
		const element = page.locator("#test-bg");
		const bg = await element.evaluate(
			(el) => window.getComputedStyle(el).backgroundColor,
		);
		expect(bg).toBe("rgb(0, 102, 255)");
	});

	test("text utility applies correct color", async ({ page }) => {
		const element = page.locator("#test-text");
		const color = await element.evaluate(
			(el) => window.getComputedStyle(el).color,
		);
		expect(color).toBe("rgb(255, 100, 100)");
	});

	test("combined utilities all apply correctly", async ({ page }) => {
		const element = page.locator("#test-combined");

		const styles = await element.evaluate((el) => {
			const computed = window.getComputedStyle(el);
			return {
				margin: computed.margin,
				padding: computed.padding,
				backgroundColor: computed.backgroundColor,
				color: computed.color,
			};
		});

		expect(styles.margin).toBe("16px");
		expect(styles.padding).toBe("8px");
		expect(styles.backgroundColor).toBe("rgb(255, 100, 100)");
		expect(styles.color).toBe("rgb(0, 102, 255)");
	});
});
