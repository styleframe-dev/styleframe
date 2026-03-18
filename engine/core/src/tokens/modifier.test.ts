import { beforeEach, describe, expect, it } from "vitest";
import type { ModifierFactory, Root } from "../types";
import {
	applyModifiers,
	combineKeys,
	createModifierFunction,
} from "./modifier";
import { createRoot } from "./root";

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

describe("applyModifiers", () => {
	let root: Root;

	beforeEach(() => {
		root = createRoot();
		root.id = "base-id";
		root.declarations = { color: "red" };
	});

	it("should return instance with empty modifiers when no modifiers provided", () => {
		const modifiers = new Map<string, ModifierFactory>();

		const result = applyModifiers(root, root, modifiers);

		expect(result.modifiers).toEqual([]);
		expect(result.declarations).toEqual({ color: "red" });
	});

	it("should generate a new id for the instance", () => {
		const modifiers = new Map<string, ModifierFactory>();

		const result = applyModifiers(root, root, modifiers);

		expect(result.id).not.toBe("base-id");
		expect(result.id).toEqual(expect.any(String));
	});

	it("should list modifier keys on the result", () => {
		const modifiers = new Map<string, ModifierFactory>([
			["hover", { type: "modifier", key: ["hover"], factory: () => ({}) }],
			["focus", { type: "modifier", key: ["focus"], factory: () => ({}) }],
		]);

		const result = applyModifiers(root, root, modifiers);

		expect(result.modifiers).toEqual(["hover", "focus"]);
	});

	it("should clear base declarations and use modifier result when factory returns", () => {
		const modifiers = new Map<string, ModifierFactory>([
			[
				"hover",
				{
					type: "modifier",
					key: ["hover"],
					factory: () => ({ backgroundColor: "blue" }),
				},
			],
		]);

		const result = applyModifiers(root, root, modifiers);

		expect(result.declarations).toEqual({ backgroundColor: "blue" });
	});

	it("should merge results from multiple modifiers", () => {
		const modifiers = new Map<string, ModifierFactory>([
			[
				"hover",
				{
					type: "modifier",
					key: ["hover"],
					factory: () => ({ backgroundColor: "blue" }),
				},
			],
			[
				"focus",
				{
					type: "modifier",
					key: ["focus"],
					factory: () => ({ outline: "2px solid" }),
				},
			],
		]);

		const result = applyModifiers(root, root, modifiers);

		expect(result.declarations).toEqual({
			backgroundColor: "blue",
			outline: "2px solid",
		});
	});

	it("should preserve base declarations when modifier factory returns undefined", () => {
		const modifiers = new Map<string, ModifierFactory>([
			[
				"hover",
				{
					type: "modifier",
					key: ["hover"],
					factory: () => undefined,
				},
			],
		]);

		const result = applyModifiers(root, root, modifiers);

		expect(result.declarations).toEqual({ color: "red" });
	});

	it("should pass original declarations (not accumulated) to each modifier factory", () => {
		const receivedDeclarations: any[] = [];

		const modifiers = new Map<string, ModifierFactory>([
			[
				"first",
				{
					type: "modifier",
					key: ["first"],
					factory: (ctx) => {
						receivedDeclarations.push({ ...ctx.declarations });
						return { added: "first" };
					},
				},
			],
			[
				"second",
				{
					type: "modifier",
					key: ["second"],
					factory: (ctx) => {
						receivedDeclarations.push({ ...ctx.declarations });
						return { added: "second" };
					},
				},
			],
		]);

		applyModifiers(root, root, modifiers);

		// Both modifiers should receive the original base declarations
		expect(receivedDeclarations[0]).toEqual({ color: "red" });
		expect(receivedDeclarations[1]).toEqual({ color: "red" });
	});

	it("should not mutate the base instance", () => {
		const baseRoot = createRoot();
		baseRoot.id = "base-id";
		baseRoot.declarations = { color: "red" };

		const modifiers = new Map<string, ModifierFactory>([
			[
				"hover",
				{
					type: "modifier",
					key: ["hover"],
					factory: () => ({ backgroundColor: "blue" }),
				},
			],
		]);

		applyModifiers(baseRoot, baseRoot, modifiers);

		expect(baseRoot.declarations).toEqual({ color: "red" });
		expect(baseRoot.id).toBe("base-id");
	});
});

describe("createModifierFunction", () => {
	let root: Root;

	beforeEach(() => {
		root = createRoot();
	});

	it("should create a modifier and add it to root.modifiers", () => {
		const modifier = createModifierFunction(root, root);
		const factory = () => ({});

		modifier("hover", factory);

		expect(root.modifiers).toHaveLength(1);
		expect(root.modifiers[0]).toEqual({
			type: "modifier",
			key: ["hover"],
			factory,
		});
	});

	it("should accept an array of keys", () => {
		const modifier = createModifierFunction(root, root);
		const factory = () => ({});

		modifier(["hover", "focus"], factory);

		expect(root.modifiers[0]?.key).toEqual(["hover", "focus"]);
	});

	it("should wrap a single string key in an array", () => {
		const modifier = createModifierFunction(root, root);

		modifier("active", () => ({}));

		expect(root.modifiers[0]?.key).toEqual(["active"]);
	});
});
