import { test, expect } from "@playwright/test";

test("h1 element has correct class and styles", async ({ page }) => {
	await page.goto("/#/selectors");

	const h1Element = page.locator("h1");

	// Check if h1 has the class 'h1'
	await expect(h1Element).toHaveClass("h1");

	const color = await h1Element.evaluate((el) => {
		const computedStyle = window.getComputedStyle(el);

		return computedStyle.color;
	});

	const background = await h1Element.evaluate((el) => {
		const computedStyle = window.getComputedStyle(el);

		return computedStyle.backgroundColor;
	});

	expect(color).toContain("oklch(0.623083");
	expect(background).toContain("oklch(0.551019");
});
