import { combineKeys } from "./modifier";

describe("combineKeys", () => {
	it("returns empty array for empty input", () => {
		expect(combineKeys([])).toEqual([]);
	});

	it("handles a single string", () => {
		expect(combineKeys([["hover"]])).toEqual([["hover"]]);
	});

	it("combines two strings and sorts combinations by length then alphabetically", () => {
		const result = combineKeys([["hover"], ["focus"]]);
		expect(result).toEqual([["focus"], ["hover"], ["focus", "hover"]]);
	});

	it("combines a string with an array, without combining elements within the array", () => {
		const result = combineKeys([["hover"], ["sm", "md"]]);
		expect(result).toEqual([
			// singles (alphabetical)
			["hover"],
			["md"],
			["sm"],
			// pairs (alphabetical within and across combinations)
			["hover", "md"],
			["hover", "sm"],
		]);
	});

	it("combines two arrays, choosing at most one element from each", () => {
		const result = combineKeys([
			["sm", "md"],
			["active", "hover"],
		]);
		expect(result).toEqual([
			// singles (alphabetical)
			["active"],
			["hover"],
			["md"],
			["sm"],
			// pairs (cross-product, alphabetical within and across)
			["active", "md"],
			["active", "sm"],
			["hover", "md"],
			["hover", "sm"],
		]);
	});

	it("does not combine elements within the same array when only one array is provided", () => {
		const result = combineKeys([["a", "b", "c"]]);
		expect(result).toEqual([["a"], ["b"], ["c"]]);
	});

	it("generates combinations across three groups and maintains order and uniqueness", () => {
		const result = combineKeys([["focus"], ["sm", "md"], ["hover", "active"]]);

		// Expect exact ordering: first by length, then alphabetical within each length
		expect(result).toEqual([
			// singles
			["active"],
			["focus"],
			["hover"],
			["md"],
			["sm"],
			// pairs
			["active", "focus"],
			["active", "md"],
			["active", "sm"],
			["focus", "hover"],
			["focus", "md"],
			["focus", "sm"],
			["hover", "md"],
			["hover", "sm"],
			// triples
			["active", "focus", "md"],
			["active", "focus", "sm"],
			["focus", "hover", "md"],
			["focus", "hover", "sm"],
		]);

		// Assert no duplicates present (defensive check)
		const unique = new Set(result.map((r) => r.join(",")));
		expect(unique.size).toBe(result.length);
	});

	it("sorts elements within each combination alphabetically", () => {
		const result = combineKeys([["b"], ["a"]]);
		expect(result).toEqual([["a"], ["b"], ["a", "b"]]);
	});
});
