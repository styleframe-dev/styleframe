import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import type { ParsedUtility, UtilityMatch } from "./types";
import { registerMatchedUtilities } from "./register";

function createParsedUtility(
	overrides: Partial<ParsedUtility> & { name: string; value: string },
): ParsedUtility {
	return {
		raw: `_${overrides.modifiers?.length ? `${overrides.modifiers.join(":")}:` : ""}${overrides.name}:${overrides.value}`,
		modifiers: [],
		isArbitrary: false,
		...overrides,
	};
}

describe("registerMatchedUtilities", () => {
	it("registers non-arbitrary values via autogenerate", () => {
		const s = styleframe();
		const { utility, variable } = s;

		variable("spacing.sm", "0.5rem");
		utility("margin", ({ value }) => ({ margin: value }));

		const factory = s.root.utilities.find((u) => u.name === "margin")!;
		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({ name: "margin", value: "spacing.sm" }),
				factory,
				modifierFactories: [],
				exists: false,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(1);
		expect(factory.values.some((v) => v.key === "spacing.sm")).toBe(true);
	});

	it("registers arbitrary values with literal CSS value", () => {
		const s = styleframe();
		const { utility } = s;

		utility("margin", ({ value }) => ({ margin: value }));

		const factory = s.root.utilities.find((u) => u.name === "margin")!;
		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({
					name: "margin",
					value: "[16px]",
					isArbitrary: true,
					arbitraryValue: "16px",
				}),
				factory,
				modifierFactories: [],
				exists: false,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(1);
		expect(factory.values.some((v) => v.key === "[16px]")).toBe(true);
	});

	it("registers values with modifiers", () => {
		const s = styleframe();
		const { utility, modifier } = s;

		const hover = modifier("hover", ({ declarations }) => ({
			"&:hover": declarations,
		}));
		utility("margin", ({ value }) => ({ margin: value }));

		const factory = s.root.utilities.find((u) => u.name === "margin")!;
		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({
					name: "margin",
					value: "sm",
					modifiers: ["hover"],
					raw: "_hover:margin:sm",
				}),
				factory,
				modifierFactories: [hover],
				exists: false,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(1);
		expect(factory.values.some((v) => v.key === "sm")).toBe(true);
		expect(
			factory.values.some(
				(v) =>
					v.key === "sm" &&
					v.modifiers.length === 1 &&
					v.modifiers[0] === "hover",
			),
		).toBe(true);
	});

	it("skips matches that already exist", () => {
		const s = styleframe();
		const { utility, ref, variable } = s;

		const spacing = variable("spacing.sm", "0.5rem");
		const createMargin = utility("margin", ({ value }) => ({
			margin: value,
		}));
		createMargin({ sm: ref(spacing) });

		const factory = s.root.utilities.find((u) => u.name === "margin")!;
		const valueCountBefore = factory.values.length;

		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({ name: "margin", value: "sm" }),
				factory,
				modifierFactories: [],
				exists: true,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(0);
		expect(factory.values.length).toBe(valueCountBefore);
	});

	it("skips matches with no factory", () => {
		const s = styleframe();

		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({ name: "unknown-utility", value: "sm" }),
				factory: null,
				modifierFactories: [],
				exists: false,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(0);
	});

	it("deduplicates matches with same factory and value", () => {
		const s = styleframe();
		const { utility } = s;

		utility("margin", ({ value }) => ({ margin: value }));

		const factory = s.root.utilities.find((u) => u.name === "margin")!;

		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({ name: "margin", value: "sm" }),
				factory,
				modifierFactories: [],
				exists: false,
			},
			{
				parsed: createParsedUtility({ name: "margin", value: "sm" }),
				factory,
				modifierFactories: [],
				exists: false,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(1);
	});

	it("merges modifiers from multiple matches of same value", () => {
		const s = styleframe();
		const { utility, modifier } = s;

		const hover = modifier("hover", ({ declarations }) => ({
			"&:hover": declarations,
		}));
		const focus = modifier("focus", ({ declarations }) => ({
			"&:focus": declarations,
		}));

		utility("margin", ({ value }) => ({ margin: value }));

		const factory = s.root.utilities.find((u) => u.name === "margin")!;

		const matches: UtilityMatch[] = [
			{
				parsed: createParsedUtility({
					name: "margin",
					value: "sm",
					modifiers: ["hover"],
					raw: "_hover:margin:sm",
				}),
				factory,
				modifierFactories: [hover],
				exists: false,
			},
			{
				parsed: createParsedUtility({
					name: "margin",
					value: "sm",
					modifiers: ["focus"],
					raw: "_focus:margin:sm",
				}),
				factory,
				modifierFactories: [focus],
				exists: false,
			},
		];

		const count = registerMatchedUtilities(s.root, matches);

		expect(count).toBe(1);
		expect(factory.values.some((v) => v.key === "sm")).toBe(true);
		expect(
			factory.values.some(
				(v) => v.key === "sm" && v.modifiers.includes("hover"),
			),
		).toBe(true);
		expect(
			factory.values.some(
				(v) => v.key === "sm" && v.modifiers.includes("focus"),
			),
		).toBe(true);
	});
});
