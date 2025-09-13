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

	test("should store utility values without creating selectors", () => {
		const createPaddingUtility = utility("padding", (value) => ({
			padding: value,
		}));

		createPaddingUtility({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored on the utility instance
		const utilityInstance = root.utilities.find((u) => u.name === "padding");
		expect(utilityInstance?.values).toEqual({
			sm: { value: "8px", modifiers: [] },
			md: { value: "16px", modifiers: [] },
			lg: { value: "24px", modifiers: [] },
		});
	});

	test("should handle boolean values correctly", () => {
		const createHiddenUtility = utility("hidden", (value) => ({
			display: value === true ? "none" : "block",
		}));

		createHiddenUtility({
			default: true,
		});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored on the utility instance
		const utilityInstance = root.utilities.find((u) => u.name === "hidden");
		expect(utilityInstance?.values).toEqual({
			default: { value: true, modifiers: [] },
		});
	});

	test("should store utility values with modifiers", () => {
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
			[hoverModifier],
		);

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored with modifiers
		const utilityInstance = root.utilities.find((u) => u.name === "color");
		expect(utilityInstance?.values).toEqual({
			primary: { value: "#007bff", modifiers: [hoverModifier] },
			secondary: { value: "#6c757d", modifiers: [hoverModifier] },
		});
	});

	test("should store utility values with multiple modifiers", () => {
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
			[hoverModifier, focusModifier],
		);

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored with all modifiers
		const utilityInstance = root.utilities.find((u) => u.name === "background");
		expect(utilityInstance?.values).toEqual({
			primary: {
				value: "#007bff",
				modifiers: [hoverModifier, focusModifier],
			},
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
			[breakpointModifier],
		);

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored with breakpoint modifier
		const utilityInstance = root.utilities.find((u) => u.name === "text");
		expect(utilityInstance?.values).toEqual({
			base: { value: "14px", modifiers: [breakpointModifier] },
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
			[],
		);

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored with empty modifiers array
		const utilityInstance = root.utilities.find((u) => u.name === "width");
		expect(utilityInstance?.values).toEqual({
			full: { value: "100%", modifiers: [] },
		});
	});

	test("should handle undefined modifiers", () => {
		const createHeightUtility = utility("height", (value) => ({
			height: value,
		}));

		createHeightUtility({
			screen: "100vh",
		});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored with undefined modifiers
		const utilityInstance = root.utilities.find((u) => u.name === "height");
		expect(utilityInstance?.values).toEqual({
			screen: { value: "100vh", modifiers: [] },
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

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Values should be stored on the utility instance
		const utilityInstance = root.utilities.find((u) => u.name === "flex");
		expect(utilityInstance?.values).toEqual({
			row: { value: "row", modifiers: [] },
			col: { value: "col", modifiers: [] },
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

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Utility should have empty values object
		const utilityInstance = root.utilities.find((u) => u.name === "empty");
		expect(utilityInstance?.values).toEqual({});
	});

	test("should store utility values on the instance", () => {
		const createMarginUtility = utility("margin", (value) => ({
			margin: value,
		}));

		createMarginUtility({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});

		const utilityInstance = root.utilities.find((u) => u.name === "margin");

		expect(utilityInstance).toBeDefined();
		expect(utilityInstance?.values).toEqual({
			sm: { value: "8px", modifiers: [] },
			md: { value: "16px", modifiers: [] },
			lg: { value: "24px", modifiers: [] },
		});
	});

	test("should merge values when utility is called multiple times", () => {
		const createSpacingUtility = utility("spacing", (value) => ({
			margin: value,
		}));

		// First call
		createSpacingUtility({
			sm: "8px",
			md: "16px",
		});

		// Second call - should merge with existing values
		createSpacingUtility({
			lg: "24px",
			xl: "32px",
		});

		const utilityInstance = root.utilities.find((u) => u.name === "spacing");

		expect(utilityInstance?.values).toEqual({
			sm: { value: "8px", modifiers: [] },
			md: { value: "16px", modifiers: [] },
			lg: { value: "24px", modifiers: [] },
			xl: { value: "32px", modifiers: [] },
		});

		// Should still only have one utility instance
		expect(root.utilities).toHaveLength(1);
	});

	test("should overwrite existing values with same key", () => {
		const createColorUtility = utility("color", (value) => ({
			color: value,
		}));

		// First call
		createColorUtility({
			primary: "#007bff",
		});

		// Second call with same key - should overwrite
		createColorUtility({
			primary: "#0056b3",
		});

		const utilityInstance = root.utilities.find((u) => u.name === "color");

		expect(utilityInstance?.values).toEqual({
			primary: { value: "#0056b3", modifiers: [] },
		});
	});

	test("should handle different modifiers on subsequent calls", () => {
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

		const createButtonUtility = utility("button", (value) => ({
			backgroundColor: value,
		}));

		// First call with hover modifier
		createButtonUtility(
			{
				primary: "#007bff",
			},
			[hoverModifier],
		);

		// Second call with focus modifier
		createButtonUtility(
			{
				secondary: "#6c757d",
			},
			[focusModifier],
		);

		const utilityInstance = root.utilities.find((u) => u.name === "button");

		expect(utilityInstance?.values).toEqual({
			primary: { value: "#007bff", modifiers: [hoverModifier] },
			secondary: { value: "#6c757d", modifiers: [focusModifier] },
		});
	});
});
