import { isRangeInput, normalizeRange } from "./normalizeRange";

describe("normalizeRange", () => {
	it("normalizes tuple to tuple", () => {
		expect(normalizeRange([1, 2])).toEqual([1, 2]);
	});

	it("normalizes object to tuple", () => {
		expect(normalizeRange({ min: 1, max: 2 })).toEqual([1, 2]);
	});
});

describe("isRangeInput", () => {
	it("returns true for length-2 tuples", () => {
		expect(isRangeInput([1, 2])).toBe(true);
		expect(isRangeInput(["a", "b"])).toBe(true);
	});

	it("returns false for arrays of length other than 2", () => {
		expect(isRangeInput([1])).toBe(false);
		expect(isRangeInput([1, 2, 3])).toBe(false);
		expect(isRangeInput([])).toBe(false);
	});

	it("returns true for { min, max } objects", () => {
		expect(isRangeInput({ min: 1, max: 2 })).toBe(true);
	});

	it("returns false for objects missing min or max", () => {
		expect(isRangeInput({ min: 1 })).toBe(false);
		expect(isRangeInput({ max: 1 })).toBe(false);
		expect(isRangeInput({})).toBe(false);
	});

	it("returns false for objects with extra keys", () => {
		expect(isRangeInput({ min: 1, max: 2, mid: 1.5 })).toBe(false);
	});

	it("returns false for primitive values", () => {
		expect(isRangeInput("string")).toBe(false);
		expect(isRangeInput(42)).toBe(false);
		expect(isRangeInput(null)).toBe(false);
		expect(isRangeInput(undefined)).toBe(false);
		expect(isRangeInput(true)).toBe(false);
	});

	it("returns false for @-prefixed reference strings", () => {
		expect(isRangeInput("@font-size.md")).toBe(false);
	});

	it("returns false for Variable-shaped objects", () => {
		const variable = {
			type: "variable",
			id: "x",
			parentId: "y",
			name: "font-size",
			value: "1rem",
		};
		expect(isRangeInput(variable)).toBe(false);
	});

	it("returns false for Reference-shaped objects", () => {
		const reference = { type: "reference", name: "font-size.md" };
		expect(isRangeInput(reference)).toBe(false);
	});

	it("returns false for CSS-token-shaped objects", () => {
		const cssToken = { type: "css", value: ["calc(", "1rem", ")"] };
		expect(isRangeInput(cssToken)).toBe(false);
	});
});
