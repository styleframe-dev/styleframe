import { describe, it, expect } from "vitest";
import { transformUtilityKey } from "./defaults";
import type { Reference } from "./types";

describe("transformUtilityKey", () => {
	describe("with default replacer", () => {
		it("should transform a string starting with @ into a reference", () => {
			const transform = transformUtilityKey();
			const result = transform("@color");

			expect(result).toEqual({
				color: {
					type: "reference",
					name: "color",
				},
			});
		});

		it("should use the variable name as the key for @ strings", () => {
			const transform = transformUtilityKey();
			const result = transform("@spacing-md");

			expect(result).toEqual({
				"spacing-md": {
					type: "reference",
					name: "spacing-md",
				},
			});
		});

		it("should use the reference name as the key for Reference objects", () => {
			const transform = transformUtilityKey();
			const ref: Reference = { type: "reference", name: "primary" };
			const result = transform(ref);

			expect(result).toEqual({
				primary: ref,
			});
		});

		it("should wrap non-reference values in brackets", () => {
			const transform = transformUtilityKey();
			const result = transform("red");

			expect(result).toEqual({
				"[red]": "red",
			});
		});

		it("should wrap numeric values in brackets", () => {
			const transform = transformUtilityKey();
			const result = transform(42);

			expect(result).toEqual({
				"[42]": 42,
			});
		});

		it("should wrap null values in brackets", () => {
			const transform = transformUtilityKey();
			const result = transform(null);

			expect(result).toEqual({
				"[null]": null,
			});
		});

		it("should wrap boolean values in brackets", () => {
			const transform = transformUtilityKey();
			const result = transform(true);

			expect(result).toEqual({
				"[true]": true,
			});
		});
	});

	describe("with custom replacer", () => {
		it("should apply custom replacer to @ string variable names", () => {
			const transform = transformUtilityKey((key) => `prefix-${key}`);
			const result = transform("@color");

			expect(result).toEqual({
				"prefix-color": {
					type: "reference",
					name: "color",
				},
			});
		});

		it("should apply custom replacer to Reference object names", () => {
			const transform = transformUtilityKey((key) => key.toUpperCase());
			const ref: Reference = { type: "reference", name: "primary" };
			const result = transform(ref);

			expect(result).toEqual({
				PRIMARY: ref,
			});
		});

		it("should not apply replacer to non-reference values", () => {
			const replacer = (key: string) => `modified-${key}`;
			const transform = transformUtilityKey(replacer);
			const result = transform("red");

			expect(result).toEqual({
				"[red]": "red",
			});
		});

		it("should handle complex key transformations", () => {
			const transform = transformUtilityKey((key) =>
				key.replace(/-/g, "_").toLowerCase(),
			);
			const result = transform("@Some-Variable-Name");

			expect(result).toEqual({
				some_variable_name: {
					type: "reference",
					name: "Some-Variable-Name",
				},
			});
		});
	});

	describe("edge cases", () => {
		it("should handle @ string with empty variable name", () => {
			const transform = transformUtilityKey();
			const result = transform("@");

			expect(result).toEqual({
				"": {
					type: "reference",
					name: "",
				},
			});
		});

		it("should handle Reference with fallback", () => {
			const transform = transformUtilityKey();
			const ref: Reference = {
				type: "reference",
				name: "color",
				fallback: "blue",
			};
			const result = transform(ref);

			expect(result).toEqual({
				color: ref,
			});
		});

		it("should preserve the original Reference object", () => {
			const transform = transformUtilityKey();
			const ref: Reference = { type: "reference", name: "test" };
			const result = transform(ref);

			expect(result.test).toBe(ref);
		});

		it("should handle strings that look like @ but are not at the start", () => {
			const transform = transformUtilityKey();
			const result = transform("email@example.com");

			expect(result).toEqual({
				"[email@example.com]": "email@example.com",
			});
		});

		it("should handle empty string", () => {
			const transform = transformUtilityKey();
			const result = transform("");

			expect(result).toEqual({
				"[]": "",
			});
		});
	});
});
