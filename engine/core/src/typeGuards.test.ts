import { describe, it, expect } from "vitest";
import { isTokenValue } from "./typeGuards";
import type { Reference, CSS } from "./types";

describe("isTokenValue", () => {
	it("should return true for primitive token values", () => {
		expect(isTokenValue("string")).toBe(true);
		expect(isTokenValue(42)).toBe(true);
		expect(isTokenValue(true)).toBe(true);
		expect(isTokenValue(null)).toBe(true);
	});

	it("should return true for Reference objects", () => {
		const ref: Reference = { type: "reference", name: "color" };
		expect(isTokenValue(ref)).toBe(true);
	});

	it("should return true for CSS objects", () => {
		const css: CSS = { type: "css", value: ["color", "red"] };
		expect(isTokenValue(css)).toBe(true);
	});

	it("should return true for arrays of token values", () => {
		const ref: Reference = { type: "reference", name: "size" };
		const css: CSS = { type: "css", value: ["margin", "0"] };
		expect(isTokenValue(["foo", ref, css])).toBe(true);
	});

	it("should return false for invalid values", () => {
		expect(isTokenValue({})).toBe(false);
		expect(isTokenValue(["foo", {}])).toBe(false);
	});
});
