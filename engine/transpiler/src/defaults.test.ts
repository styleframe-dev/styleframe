import { describe, expect, test } from "vitest";
import {
	defaultThemeSelectorFn,
	defaultUtilitySelectorFn,
	defaultVariableNameFn,
} from "./defaults";

describe("defaultThemeSelectorFn", () => {
	test("should return a data-theme attribute selector", () => {
		const result = defaultThemeSelectorFn({ name: "light" });
		expect(result).toBe('[data-theme="light"]');
	});

	test("should handle different theme names", () => {
		expect(defaultThemeSelectorFn({ name: "dark" })).toBe(
			'[data-theme="dark"]',
		);
		expect(defaultThemeSelectorFn({ name: "custom-theme" })).toBe(
			'[data-theme="custom-theme"]',
		);
	});

	test("should handle empty theme name", () => {
		const result = defaultThemeSelectorFn({ name: "" });
		expect(result).toBe('[data-theme=""]');
	});
});

describe("defaultUtilitySelectorFn", () => {
	test("should return a utility selector with name and value", () => {
		const result = defaultUtilitySelectorFn({
			name: "text",
			value: "lg",
			modifiers: [],
		});
		expect(result).toBe("._text\\:lg");
	});

	test("should handle default value by excluding it from selector", () => {
		const result = defaultUtilitySelectorFn({
			name: "hidden",
			value: "default",
			modifiers: [],
		});
		expect(result).toBe("._hidden");
	});

	test("should include modifiers in selector", () => {
		const result = defaultUtilitySelectorFn({
			name: "text",
			value: "lg",
			modifiers: ["hover"],
		});
		expect(result).toBe("._hover\\:text\\:lg");
	});

	test("should handle multiple modifiers", () => {
		const result = defaultUtilitySelectorFn({
			name: "bg",
			value: "primary",
			modifiers: ["hover", "focus"],
		});
		expect(result).toBe("._hover\\:focus\\:bg\\:primary");
	});

	test("should handle modifiers with default value", () => {
		const result = defaultUtilitySelectorFn({
			name: "visible",
			value: "default",
			modifiers: ["hover"],
		});
		expect(result).toBe("._hover\\:visible");
	});

	test("should handle empty modifiers array", () => {
		const result = defaultUtilitySelectorFn({
			name: "flex",
			value: "row",
			modifiers: [],
		});
		expect(result).toBe("._flex\\:row");
	});

	test("should handle empty value", () => {
		const result = defaultUtilitySelectorFn({
			name: "block",
			value: "",
			modifiers: [],
		});
		expect(result).toBe("._block");
	});

	test("should handle complex modifier names", () => {
		const result = defaultUtilitySelectorFn({
			name: "text",
			value: "sm",
			modifiers: ["sm", "md", "lg"],
		});
		expect(result).toBe("._sm\\:md\\:lg\\:text\\:sm");
	});

	test("should not filter out string '0'", () => {
		const result = defaultUtilitySelectorFn({
			name: "margin",
			value: "0",
			modifiers: [],
		});
		expect(result).toBe("._margin\\:0");
	});
});

describe("defaultVariableNameFn", () => {
	test("should return the variable name as-is when no dots present", () => {
		const result = defaultVariableNameFn({ name: "color-primary" });
		expect(result).toBe("color-primary");
	});

	test("should replace dots with double dashes", () => {
		expect(defaultVariableNameFn({ name: "color.primary" })).toBe(
			"color--primary",
		);
		expect(defaultVariableNameFn({ name: "spacing.sm" })).toBe("spacing--sm");
	});

	test("should handle multiple dots", () => {
		expect(defaultVariableNameFn({ name: "color.primary.500" })).toBe(
			"color--primary--500",
		);
		expect(defaultVariableNameFn({ name: "font.size.lg" })).toBe(
			"font--size--lg",
		);
	});

	test("should handle different variable names without dots", () => {
		expect(defaultVariableNameFn({ name: "spacing-sm" })).toBe("spacing-sm");
		expect(defaultVariableNameFn({ name: "font-size-lg" })).toBe(
			"font-size-lg",
		);
	});

	test("should handle empty name", () => {
		const result = defaultVariableNameFn({ name: "" });
		expect(result).toBe("");
	});

	test("should handle names with special characters", () => {
		expect(defaultVariableNameFn({ name: "color--primary" })).toBe(
			"color--primary",
		);
		expect(defaultVariableNameFn({ name: "theme_dark" })).toBe("theme_dark");
	});

	test("should handle mixed dots and dashes", () => {
		expect(defaultVariableNameFn({ name: "color.primary-500" })).toBe(
			"color--primary-500",
		);
		expect(defaultVariableNameFn({ name: "font-size.lg" })).toBe(
			"font-size--lg",
		);
	});

	test("should collapse consecutive dots into a single separator", () => {
		expect(defaultVariableNameFn({ name: "color..primary" })).toBe(
			"color--primary",
		);
		expect(defaultVariableNameFn({ name: "color...primary" })).toBe(
			"color--primary",
		);
	});

	test("should remove leading dots", () => {
		expect(defaultVariableNameFn({ name: ".color" })).toBe("color");
		expect(defaultVariableNameFn({ name: "..color" })).toBe("color");
		expect(defaultVariableNameFn({ name: ".color.primary" })).toBe(
			"color--primary",
		);
	});

	test("should remove trailing dots", () => {
		expect(defaultVariableNameFn({ name: "color." })).toBe("color");
		expect(defaultVariableNameFn({ name: "color.." })).toBe("color");
		expect(defaultVariableNameFn({ name: "color.primary." })).toBe(
			"color--primary",
		);
	});

	test("should handle leading and trailing dots combined", () => {
		expect(defaultVariableNameFn({ name: ".color." })).toBe("color");
		expect(defaultVariableNameFn({ name: "..color.." })).toBe("color");
		expect(defaultVariableNameFn({ name: ".color.primary." })).toBe(
			"color--primary",
		);
	});
});
