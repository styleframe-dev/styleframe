import { beforeEach, describe, expect, it } from "vitest";
import type { Root, Selector } from "../types";
import {
	createPropertyValueResolver,
	parseAtReferences,
	validateReference,
} from "./resolve";
import { createRoot } from "./root";

describe("parseAtReferences", () => {
	it("should return a single string when no @ references exist", () => {
		const result = parseAtReferences("1px solid red");

		expect(result).toEqual(["1px solid red"]);
	});

	it("should parse a single @ reference", () => {
		const result = parseAtReferences("@color.primary");

		expect(result).toEqual([
			"",
			{ type: "reference", name: "color.primary", fallback: undefined },
			"",
		]);
	});

	it("should parse an embedded @ reference", () => {
		const result = parseAtReferences("1px solid @color.primary");

		expect(result).toEqual([
			"1px solid ",
			{ type: "reference", name: "color.primary", fallback: undefined },
			"",
		]);
	});

	it("should parse multiple @ references", () => {
		const result = parseAtReferences("@size @color.primary");

		expect(result).toEqual([
			"",
			{ type: "reference", name: "size", fallback: undefined },
			" ",
			{ type: "reference", name: "color.primary", fallback: undefined },
			"",
		]);
	});

	it("should handle dotted variable names", () => {
		const result = parseAtReferences("@spacing.lg");

		expect(result).toEqual([
			"",
			{ type: "reference", name: "spacing.lg", fallback: undefined },
			"",
		]);
	});

	it("should handle hyphenated variable names", () => {
		const result = parseAtReferences("@my-var");

		expect(result).toEqual([
			"",
			{ type: "reference", name: "my-var", fallback: undefined },
			"",
		]);
	});

	it("should return only a trailing string for empty input", () => {
		const result = parseAtReferences("");

		expect(result).toEqual([""]);
	});
});

describe("validateReference", () => {
	let root: Root;

	beforeEach(() => {
		root = createRoot();
	});

	it("should not throw when variable exists", () => {
		root.variables.push({
			type: "variable",
			name: "color.primary",
			value: "#006cff",
		});

		expect(() => validateReference("color.primary", root)).not.toThrow();
	});

	it("should throw when variable does not exist", () => {
		expect(() => validateReference("color.primary", root)).toThrow(
			'[styleframe] Variable "color.primary" is not defined.',
		);
	});

	it("should include the variable name in the error message", () => {
		expect(() => validateReference("my-var", root)).toThrow('"my-var"');
	});

	it("should include the @ reference hint in the error message", () => {
		expect(() => validateReference("spacing.lg", root)).toThrow(
			'"@spacing.lg"',
		);
	});
});

describe("createPropertyValueResolver", () => {
	let root: Root;
	let selector: Selector;
	let resolvePropertyValue: ReturnType<typeof createPropertyValueResolver>;

	beforeEach(() => {
		root = createRoot();
		selector = {
			type: "selector",
			id: "test-id",
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		resolvePropertyValue = createPropertyValueResolver(selector, root);
	});

	describe("non-string values", () => {
		it("should return numbers unchanged", () => {
			expect(resolvePropertyValue(42)).toBe(42);
		});

		it("should return undefined unchanged", () => {
			expect(resolvePropertyValue(undefined as any)).toBe(undefined);
		});
	});

	describe("strings without @ references", () => {
		it("should return plain strings unchanged", () => {
			expect(resolvePropertyValue("1px solid red")).toBe("1px solid red");
		});

		it("should return empty strings unchanged", () => {
			expect(resolvePropertyValue("")).toBe("");
		});
	});

	describe("exact @ reference", () => {
		it("should resolve an exact @variable to a Reference", () => {
			root.variables.push({
				type: "variable",
				name: "color.primary",
				value: "#006cff",
			});

			const result = resolvePropertyValue("@color.primary");

			expect(result).toEqual({
				type: "reference",
				name: "color.primary",
				fallback: undefined,
			});
		});

		it("should throw when the referenced variable does not exist", () => {
			expect(() => resolvePropertyValue("@nonexistent")).toThrow(
				'Variable "nonexistent" is not defined',
			);
		});
	});

	describe("embedded @ references", () => {
		it("should resolve embedded @variable to a CSS object", () => {
			const result = resolvePropertyValue("1px solid @color.primary");

			expect(result).toEqual({
				type: "css",
				value: [
					"1px solid ",
					{
						type: "reference",
						name: "color.primary",
						fallback: undefined,
					},
					"",
				],
			});
		});

		it("should resolve multiple embedded @variables to a CSS object", () => {
			const result = resolvePropertyValue("@border.width solid @color.primary");

			expect(result).toEqual({
				type: "css",
				value: [
					"",
					{
						type: "reference",
						name: "border.width",
						fallback: undefined,
					},
					" solid ",
					{
						type: "reference",
						name: "color.primary",
						fallback: undefined,
					},
					"",
				],
			});
		});
	});
});
