import { beforeEach, describe, expect, it } from "vitest";
import type { Root, Selector } from "../types";
import {
	createPropertyValueResolver,
	findVariableInScope,
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
			{ type: "reference", name: "color.primary", fallback: undefined },
		]);
	});

	it("should parse an embedded @ reference", () => {
		const result = parseAtReferences("1px solid @color.primary");

		expect(result).toEqual([
			"1px solid ",
			{ type: "reference", name: "color.primary", fallback: undefined },
		]);
	});

	it("should parse multiple @ references", () => {
		const result = parseAtReferences("@size @color.primary");

		expect(result).toEqual([
			{ type: "reference", name: "size", fallback: undefined },
			" ",
			{ type: "reference", name: "color.primary", fallback: undefined },
		]);
	});

	it("should handle dotted variable names", () => {
		const result = parseAtReferences("@spacing.lg");

		expect(result).toEqual([
			{ type: "reference", name: "spacing.lg", fallback: undefined },
		]);
	});

	it("should handle hyphenated variable names", () => {
		const result = parseAtReferences("@my-var");

		expect(result).toEqual([
			{ type: "reference", name: "my-var", fallback: undefined },
		]);
	});

	it("should return an empty array for empty input", () => {
		const result = parseAtReferences("");

		expect(result).toEqual([]);
	});
});

describe("findVariableInScope", () => {
	let root: Root;

	beforeEach(() => {
		root = createRoot();
	});

	it("should find a variable in the current scope", () => {
		const selector: Selector = {
			type: "selector",
			id: "sel-1",
			parentId: root.id,
			query: ".test",
			variables: [
				{
					type: "variable",
					id: "test-id",
					name: "color.primary",
					value: "#006cff",
				},
			],
			declarations: {},
			children: [],
		};
		root._registry.set(selector.id, selector);

		expect(findVariableInScope("color.primary", selector, root)).toBe(true);
	});

	it("should find a variable in a parent scope", () => {
		root.variables.push({
			type: "variable",
			id: "test-id",
			name: "color.primary",
			value: "#006cff",
		});

		const selector: Selector = {
			type: "selector",
			id: "sel-1",
			parentId: root.id,
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		root._registry.set(selector.id, selector);

		expect(findVariableInScope("color.primary", selector, root)).toBe(true);
	});

	it("should find a variable in a grandparent scope", () => {
		root.variables.push({
			type: "variable",
			id: "test-id",
			name: "spacing.md",
			value: "1rem",
		});

		const parent: Selector = {
			type: "selector",
			id: "sel-1",
			parentId: root.id,
			query: ".parent",
			variables: [],
			declarations: {},
			children: [],
		};
		root._registry.set(parent.id, parent);

		const child: Selector = {
			type: "selector",
			id: "sel-2",
			parentId: parent.id,
			query: "&:hover",
			variables: [],
			declarations: {},
			children: [],
		};
		root._registry.set(child.id, child);

		expect(findVariableInScope("spacing.md", child, root)).toBe(true);
	});

	it("should not find a variable defined in a sibling scope", () => {
		const sibling: Selector = {
			type: "selector",
			id: "sel-1",
			parentId: root.id,
			query: ".sibling",
			variables: [
				{
					type: "variable",
					id: "test-id",
					name: "color.primary",
					value: "#006cff",
				},
			],
			declarations: {},
			children: [],
		};
		root._registry.set(sibling.id, sibling);

		const selector: Selector = {
			type: "selector",
			id: "sel-2",
			parentId: root.id,
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		root._registry.set(selector.id, selector);

		expect(findVariableInScope("color.primary", selector, root)).toBe(false);
	});

	it("should return false when variable is not defined anywhere", () => {
		expect(findVariableInScope("nonexistent", root, root)).toBe(false);
	});
});

describe("validateReference", () => {
	let root: Root;

	beforeEach(() => {
		root = createRoot();
	});

	it("should not throw when variable exists in scope", () => {
		root.variables.push({
			type: "variable",
			id: "test-id",
			name: "color.primary",
			value: "#006cff",
		});

		expect(() => validateReference("color.primary", root, root)).not.toThrow();
	});

	it("should throw when variable does not exist", () => {
		expect(() => validateReference("color.primary", root, root)).toThrow(
			'[styleframe] Variable "color.primary" is not defined.',
		);
	});

	it("should include the variable name in the error message", () => {
		expect(() => validateReference("my-var", root, root)).toThrow('"my-var"');
	});

	it("should include the @ reference hint in the error message", () => {
		expect(() => validateReference("spacing.lg", root, root)).toThrow(
			'"@spacing.lg"',
		);
	});

	it("should not throw when variable exists in a parent scope", () => {
		root.variables.push({
			type: "variable",
			id: "test-id",
			name: "color.primary",
			value: "#006cff",
		});

		const selector: Selector = {
			type: "selector",
			id: "sel-1",
			parentId: root.id,
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		root._registry.set(selector.id, selector);

		expect(() =>
			validateReference("color.primary", selector, root),
		).not.toThrow();
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
			parentId: root.id,
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		root._registry.set(selector.id, selector);
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
				id: "test-id",
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
				],
			});
		});

		it("should resolve multiple embedded @variables to a CSS object", () => {
			const result = resolvePropertyValue("@border.width solid @color.primary");

			expect(result).toEqual({
				type: "css",
				value: [
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
				],
			});
		});
	});
});
