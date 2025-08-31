import { beforeEach, describe, expect, test } from "vitest";
import type { Container, Modifier, Root, TokenValue } from "../types";
import { createRoot } from "./root";
import { createUtilityFunction } from "./utility";

describe("createUtilityFunction", () => {
	let root: Root;
	let parent: Container;
	let utility: ReturnType<typeof createUtilityFunction>;

	beforeEach(() => {
		root = createRoot();
		parent = root;
		utility = createUtilityFunction(parent, root);
	});

	test("should create a utility function", () => {
		expect(utility).toBeTypeOf("function");
	});

	test("should create utility with proper structure", () => {
		const declarationsFn = (value: TokenValue) => ({ margin: value });
		const createMarginUtility = utility("margin", declarationsFn);

		expect(createMarginUtility).toBeTypeOf("function");
		expect(root.utilities).toHaveLength(1);
		expect(root.utilities[0]).toEqual({
			type: "utility",
			name: "margin",
			declarations: declarationsFn,
			values: {},
		});
	});

	test("should generate base utility selectors without modifiers", () => {
		const createPaddingUtility = utility("padding", (value) => ({
			padding: value,
		}));

		createPaddingUtility({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});

		expect(root.children).toHaveLength(3);
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._padding:sm",
			declarations: { padding: "8px" },
			variables: [],
			children: [],
		});
		expect(root.children[1]).toEqual({
			type: "selector",
			query: "._padding:md",
			declarations: { padding: "16px" },
			variables: [],
			children: [],
		});
		expect(root.children[2]).toEqual({
			type: "selector",
			query: "._padding:lg",
			declarations: { padding: "24px" },
			variables: [],
			children: [],
		});
	});

	test("should handle boolean values correctly", () => {
		const createHiddenUtility = utility("hidden", (value) => ({
			display: value === true ? "none" : "block",
		}));

		createHiddenUtility({
			default: true,
		});

		expect(root.children).toHaveLength(1);
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._hidden",
			declarations: { display: "none" },
			variables: [],
			children: [],
		});
	});

	test("should generate utility selectors with single modifier", () => {
		const hoverModifier: Modifier = {
			type: "modifier",
			key: ["hover"],
			transform: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const createColorUtility = utility("color", (value) => ({
			color: value,
		}));

		createColorUtility(
			{
				primary: "#007bff",
				secondary: "#6c757d",
			},
			{
				modifiers: [hoverModifier],
			},
		);

		// Should have base utilities + hover variants
		expect(root.children).toHaveLength(4);

		// Base utilities
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._color:primary",
			declarations: { color: "#007bff" },
			variables: [],
			children: [],
		});

		expect(root.children[1]).toEqual({
			type: "selector",
			query: "._hover:color:primary",
			declarations: {},
			variables: [],
			children: [
				{
					type: "selector",
					query: "&:hover",
					declarations: { color: "#007bff" },
					variables: [],
					children: [],
				},
			],
		});

		expect(root.children[2]).toEqual({
			type: "selector",
			query: "._color:secondary",
			declarations: { color: "#6c757d" },
			variables: [],
			children: [],
		});

		expect(root.children[3]).toEqual({
			type: "selector",
			query: "._hover:color:secondary",
			declarations: {},
			variables: [],
			children: [
				{
					type: "selector",
					query: "&:hover",
					declarations: { color: "#6c757d" },
					variables: [],
					children: [],
				},
			],
		});
	});

	test("should generate utility selectors with multiple modifiers", () => {
		const hoverModifier: Modifier = {
			type: "modifier",
			key: ["hover"],
			transform: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const focusModifier: Modifier = {
			type: "modifier",
			key: ["focus"],
			transform: ({ declarations }) => ({
				"&:focus": declarations,
			}),
		};

		const createBackgroundUtility = utility("background", (value) => ({
			background: value,
		}));

		createBackgroundUtility(
			{
				primary: "#007bff",
			},
			{
				modifiers: [hoverModifier, focusModifier],
			},
		);

		// Should have base utility + hover + focus + hover:focus variants
		expect(root.children).toHaveLength(4);

		// Base utility
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._background:primary",
			declarations: { background: "#007bff" },
			variables: [],
			children: [],
		});

		// Single modifier variants
		expect(root.children[1]).toEqual({
			type: "selector",
			query: "._focus:background:primary",
			declarations: {},
			variables: [],
			children: [
				{
					type: "selector",
					query: "&:focus",
					declarations: { background: "#007bff" },
					variables: [],
					children: [],
				},
			],
		});

		expect(root.children[2]).toEqual({
			type: "selector",
			query: "._hover:background:primary",
			declarations: {},
			variables: [],
			children: [
				{
					type: "selector",
					query: "&:hover",
					declarations: { background: "#007bff" },
					variables: [],
					children: [],
				},
			],
		});

		// Combined modifier variant
		expect(root.children[3]).toEqual({
			type: "selector",
			query: "._focus:hover:background:primary",
			declarations: {},
			variables: [],
			children: [
				{
					type: "selector",
					query: "&:hover",
					declarations: {},
					variables: [],
					children: [
						{
							type: "selector",
							query: "&:focus",
							declarations: { background: "#007bff" },
							variables: [],
							children: [],
						},
					],
				},
			],
		});
	});

	test("should handle multi-key modifiers correctly", () => {
		const breakpointModifier: Modifier = {
			type: "modifier",
			key: ["sm", "md", "lg"],
			transform: ({ key, declarations }) => ({
				[`@media screen and (min-width: ${key === "sm" ? "640px" : key === "md" ? "768px" : "1024px"})`]:
					declarations,
			}),
		};

		const createTextUtility = utility("text", (value) => ({
			fontSize: value,
		}));

		createTextUtility(
			{
				base: "14px",
			},
			{
				modifiers: [breakpointModifier],
			},
		);

		// Should have base utility + 3 breakpoint variants
		expect(root.children).toHaveLength(4);

		// Base utility
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._text:base",
			declarations: { fontSize: "14px" },
			variables: [],
			children: [],
		});

		// Breakpoint variants
		expect(root.children[1]).toEqual({
			type: "selector",
			query: "._lg:text:base",
			declarations: {},
			variables: [],
			children: [
				{
					type: "at-rule",
					identifier: "media",
					rule: "screen and (min-width: 1024px)",
					declarations: { fontSize: "14px" },
					variables: [],
					children: [],
				},
			],
		});

		expect(root.children[2]).toEqual({
			type: "selector",
			query: "._md:text:base",
			declarations: {},
			variables: [],
			children: [
				{
					type: "at-rule",
					identifier: "media",
					rule: "screen and (min-width: 768px)",
					declarations: { fontSize: "14px" },
					variables: [],
					children: [],
				},
			],
		});

		expect(root.children[3]).toEqual({
			type: "selector",
			query: "._sm:text:base",
			declarations: {},
			variables: [],
			children: [
				{
					type: "at-rule",
					identifier: "media",
					rule: "screen and (min-width: 640px)",
					declarations: { fontSize: "14px" },
					variables: [],
					children: [],
				},
			],
		});
	});

	test("should handle empty modifiers array", () => {
		const createWidthUtility = utility("width", (value) => ({
			width: value,
		}));

		createWidthUtility(
			{
				full: "100%",
			},
			{
				modifiers: [],
			},
		);

		// Should only have base utility
		expect(root.children).toHaveLength(1);
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._width:full",
			declarations: { width: "100%" },
			variables: [],
			children: [],
		});
	});

	test("should handle undefined modifiers option", () => {
		const createHeightUtility = utility("height", (value) => ({
			height: value,
		}));

		createHeightUtility({
			screen: "100vh",
		});

		// Should only have base utility
		expect(root.children).toHaveLength(1);
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._height:screen",
			declarations: { height: "100vh" },
			variables: [],
			children: [],
		});
	});

	test("should handle complex declarations", () => {
		const createFlexUtility = utility("flex", (value) => ({
			display: "flex",
			flexDirection: value === "col" ? "column" : "row",
			gap: "1rem",
		}));

		createFlexUtility({
			row: "row",
			col: "col",
		});

		expect(root.children).toHaveLength(2);
		expect(root.children[0]).toEqual({
			type: "selector",
			query: "._flex:row",
			declarations: {
				display: "flex",
				flexDirection: "row",
				gap: "1rem",
			},
			variables: [],
			children: [],
		});
		expect(root.children[1]).toEqual({
			type: "selector",
			query: "._flex:col",
			declarations: {
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			},
			variables: [],
			children: [],
		});
	});

	test("should handle modifier transformation with key parameter", () => {
		const responsiveModifier: Modifier = {
			type: "modifier",
			key: ["xs", "sm", "md"],
			transform: ({ key, declarations }) => {
				const breakpoints = { xs: "320px", sm: "640px", md: "768px" };
				return {
					[`@media (min-width: ${breakpoints[key as keyof typeof breakpoints]})`]:
						declarations,
				};
			},
		};

		const createSpacingUtility = utility("m", (value) => ({
			margin: value,
		}));

		createSpacingUtility(
			{
				"4": "1rem",
			},
			{
				modifiers: [responsiveModifier],
			},
		);

		// Should have base utility + 3 responsive variants
		expect(root.children).toHaveLength(4);

		expect(root.children[1]).toEqual({
			type: "selector",
			query: "._md:m:4",
			declarations: {},
			variables: [],
			children: [
				{
					type: "at-rule",
					identifier: "media",
					rule: "(min-width: 768px)",
					declarations: { margin: "1rem" },
					variables: [],
					children: [],
				},
			],
		});
	});

	test("should preserve utility order in root utilities array", () => {
		utility("margin", (value) => ({
			margin: value,
		}));

		utility("padding", (value) => ({
			padding: value,
		}));

		expect(root.utilities).toHaveLength(2);
		expect(root.utilities[0]?.name).toBe("margin");
		expect(root.utilities[1]?.name).toBe("padding");
	});

	test("should handle empty entries object", () => {
		const createEmptyUtility = utility("empty", (value) => ({
			display: value,
		}));

		createEmptyUtility({});

		expect(root.children).toHaveLength(0);
	});

	test("should handle modifier with no matching key", () => {
		const nonMatchingModifier: Modifier = {
			type: "modifier",
			key: ["nonexistent"],
			transform: ({ declarations }) => declarations,
		};

		const createTestUtility = utility("test", (value) => ({
			content: value,
		}));

		// This should not crash and should work normally
		createTestUtility(
			{
				value: "test",
			},
			{
				modifiers: [nonMatchingModifier],
			},
		);

		// Should have base utility + modifier variant
		expect(root.children).toHaveLength(2);
	});

	test("should store registered utility values on the instance", () => {
		const createMarginUtility = utility("margin", (value) => ({
			margin: value,
		}));

		// Call the utility creator with some values
		createMarginUtility({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});

		// Get the utility instance from the root
		const utilityInstance = root.utilities.find((u) => u.name === "margin");

		expect(utilityInstance).toBeDefined();
		expect(utilityInstance?.values).toEqual({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});
	});
});
