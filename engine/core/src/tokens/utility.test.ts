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
		const createMarginUtility = utility("margin", ({ value }) => ({
			margin: value,
		}));

		expect(createMarginUtility).toBeTypeOf("function");
		expect(root.utilities).toHaveLength(0); // No utilities until we call the creator
	});

	test("should create utility instances without creating selectors", () => {
		const createPaddingUtility = utility("padding", ({ value }) => ({
			padding: value,
		}));

		createPaddingUtility({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// Three utility instances should be created
		expect(root.utilities).toHaveLength(3);

		const smUtility = root.utilities.find(
			(u) => u.name === "padding" && u.value === "sm",
		);
		const mdUtility = root.utilities.find(
			(u) => u.name === "padding" && u.value === "md",
		);
		const lgUtility = root.utilities.find(
			(u) => u.name === "padding" && u.value === "lg",
		);

		expect(smUtility).toEqual({
			type: "utility",
			name: "padding",
			value: "sm",
			declarations: { padding: "8px" },
			variables: [],
			children: [],
			modifiers: [],
		});
		expect(mdUtility).toEqual({
			type: "utility",
			name: "padding",
			value: "md",
			declarations: { padding: "16px" },
			variables: [],
			children: [],
			modifiers: [],
		});
		expect(lgUtility).toEqual({
			type: "utility",
			name: "padding",
			value: "lg",
			declarations: { padding: "24px" },
			variables: [],
			children: [],
			modifiers: [],
		});
	});

	test("should handle boolean values correctly", () => {
		const createHiddenUtility = utility("hidden", ({ value }) => ({
			display: value === true ? "none" : "block",
		}));

		createHiddenUtility({
			default: true,
		});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// One utility instance should be created
		expect(root.utilities).toHaveLength(1);

		const hiddenUtility = root.utilities.find((u) => u.name === "hidden");
		expect(hiddenUtility).toEqual({
			type: "utility",
			name: "hidden",
			value: "default",
			declarations: { display: "none" },
			variables: [],
			children: [],
			modifiers: [],
		});
	});

	test("should store utility instances with modifiers", () => {
		const hoverModifier: Modifier = {
			type: "modifier",
			key: ["hover"],
			transform: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const createColorUtility = utility("color", ({ value }) => ({
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

		// Two utility instances should be created with modifiers
		expect(root.utilities).toHaveLength(2);

		const primaryUtility = root.utilities.find(
			(u) => u.name === "color" && u.value === "primary",
		);
		const secondaryUtility = root.utilities.find(
			(u) => u.name === "color" && u.value === "secondary",
		);

		expect(primaryUtility).toEqual({
			type: "utility",
			name: "color",
			value: "primary",
			declarations: { color: "#007bff" },
			variables: [],
			children: [],
			modifiers: [hoverModifier],
		});
		expect(secondaryUtility).toEqual({
			type: "utility",
			name: "color",
			value: "secondary",
			declarations: { color: "#6c757d" },
			variables: [],
			children: [],
			modifiers: [hoverModifier],
		});
	});

	test("should store utility instances with multiple modifiers", () => {
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

		const createBackgroundUtility = utility("background", ({ value }) => ({
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

		// One utility instance should be created with all modifiers
		expect(root.utilities).toHaveLength(1);

		const backgroundUtility = root.utilities.find(
			(u) => u.name === "background",
		);
		expect(backgroundUtility).toEqual({
			type: "utility",
			name: "background",
			value: "primary",
			declarations: { background: "#007bff" },
			variables: [],
			children: [],
			modifiers: [hoverModifier, focusModifier],
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

		const createTextUtility = utility("text", ({ value }) => ({
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

		// One utility instance should be created with breakpoint modifier
		expect(root.utilities).toHaveLength(1);

		const textUtility = root.utilities.find((u) => u.name === "text");
		expect(textUtility).toEqual({
			type: "utility",
			name: "text",
			value: "base",
			declarations: { fontSize: "14px" },
			variables: [],
			children: [],
			modifiers: [breakpointModifier],
		});
	});

	test("should handle empty modifiers array", () => {
		const createWidthUtility = utility("width", ({ value }) => ({
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

		// One utility instance should be created with empty modifiers array
		expect(root.utilities).toHaveLength(1);

		const widthUtility = root.utilities.find((u) => u.name === "width");
		expect(widthUtility).toEqual({
			type: "utility",
			name: "width",
			value: "full",
			declarations: { width: "100%" },
			variables: [],
			children: [],
			modifiers: [],
		});
	});

	test("should handle undefined modifiers", () => {
		const createHeightUtility = utility("height", ({ value }) => ({
			height: value,
		}));

		createHeightUtility({
			screen: "100vh",
		});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// One utility instance should be created with empty modifiers array (default)
		expect(root.utilities).toHaveLength(1);

		const heightUtility = root.utilities.find((u) => u.name === "height");
		expect(heightUtility).toEqual({
			type: "utility",
			name: "height",
			value: "screen",
			declarations: { height: "100vh" },
			variables: [],
			children: [],
			modifiers: [],
		});
	});

	test("should handle complex declarations", () => {
		const createFlexUtility = utility("flex", ({ value }) => ({
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

		// Two utility instances should be created
		expect(root.utilities).toHaveLength(2);

		const rowUtility = root.utilities.find(
			(u) => u.name === "flex" && u.value === "row",
		);
		const colUtility = root.utilities.find(
			(u) => u.name === "flex" && u.value === "col",
		);

		expect(rowUtility).toEqual({
			type: "utility",
			name: "flex",
			value: "row",
			declarations: {
				display: "flex",
				flexDirection: "row",
				gap: "1rem",
			},
			variables: [],
			children: [],
			modifiers: [],
		});
		expect(colUtility).toEqual({
			type: "utility",
			name: "flex",
			value: "col",
			declarations: {
				display: "flex",
				flexDirection: "column",
				gap: "1rem",
			},
			variables: [],
			children: [],
			modifiers: [],
		});
	});

	test("should preserve utility order in root utilities array", () => {
		const createMarginUtility = utility("margin", ({ value }) => ({
			margin: value,
		}));

		const createPaddingUtility = utility("padding", ({ value }) => ({
			padding: value,
		}));

		// Create some utilities
		createMarginUtility({ sm: "8px" });
		createPaddingUtility({ md: "16px" });

		expect(root.utilities).toHaveLength(2);
		expect(root.utilities[0]?.name).toBe("margin");
		expect(root.utilities[1]?.name).toBe("padding");
	});

	test("should handle empty entries object", () => {
		const createEmptyUtility = utility("empty", ({ value }) => ({
			display: value,
		}));

		createEmptyUtility({});

		// No selectors should be created
		expect(root.children).toHaveLength(0);

		// No utility instances should be created for empty entries
		expect(root.utilities).toHaveLength(0);
	});

	test("should create multiple utility instances when called multiple times", () => {
		const createMarginUtility = utility("margin", ({ value }) => ({
			margin: value,
		}));

		createMarginUtility({
			sm: "8px",
			md: "16px",
		});

		expect(root.utilities).toHaveLength(2);

		const smUtility = root.utilities.find(
			(u) => u.name === "margin" && u.value === "sm",
		);
		const mdUtility = root.utilities.find(
			(u) => u.name === "margin" && u.value === "md",
		);

		expect(smUtility).toEqual({
			type: "utility",
			name: "margin",
			value: "sm",
			declarations: { margin: "8px" },
			variables: [],
			children: [],
			modifiers: [],
		});
		expect(mdUtility).toEqual({
			type: "utility",
			name: "margin",
			value: "md",
			declarations: { margin: "16px" },
			variables: [],
			children: [],
			modifiers: [],
		});
	});

	test("should create additional utilities when utility is called multiple times", () => {
		const createSpacingUtility = utility("spacing", ({ value }) => ({
			margin: value,
		}));

		// First call
		createSpacingUtility({
			sm: "8px",
			md: "16px",
		});

		// Second call - should create additional utilities
		createSpacingUtility({
			lg: "24px",
			xl: "32px",
		});

		expect(root.utilities).toHaveLength(4);

		const smUtility = root.utilities.find(
			(u) => u.name === "spacing" && u.value === "sm",
		);
		const mdUtility = root.utilities.find(
			(u) => u.name === "spacing" && u.value === "md",
		);
		const lgUtility = root.utilities.find(
			(u) => u.name === "spacing" && u.value === "lg",
		);
		const xlUtility = root.utilities.find(
			(u) => u.name === "spacing" && u.value === "xl",
		);

		expect(smUtility).toBeDefined();
		expect(mdUtility).toBeDefined();
		expect(lgUtility).toBeDefined();
		expect(xlUtility).toBeDefined();
	});

	test("should create additional utilities with same key", () => {
		const createColorUtility = utility("color", ({ value }) => ({
			color: value,
		}));

		// First call
		createColorUtility({
			primary: "#007bff",
		});

		// Second call with same key - should create another utility instance
		createColorUtility({
			primary: "#0056b3",
		});

		expect(root.utilities).toHaveLength(2);

		const utilities = root.utilities.filter(
			(u) => u.name === "color" && u.value === "primary",
		);
		expect(utilities).toHaveLength(2);
		expect(utilities[0]?.declarations.color).toBe("#007bff");
		expect(utilities[1]?.declarations.color).toBe("#0056b3");
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

		const createButtonUtility = utility("button", ({ value }) => ({
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

		expect(root.utilities).toHaveLength(2);

		const primaryUtility = root.utilities.find(
			(u) => u.name === "button" && u.value === "primary",
		);
		const secondaryUtility = root.utilities.find(
			(u) => u.name === "button" && u.value === "secondary",
		);

		expect(primaryUtility?.modifiers).toEqual([hoverModifier]);
		expect(secondaryUtility?.modifiers).toEqual([focusModifier]);
	});

	test("should support callback context functions", () => {
		const createAdvancedUtility = utility(
			"advanced",
			({ value, variable, selector }) => {
				const colorVar = variable("color-var", value);
				selector(".nested", { color: colorVar.value });

				return {
					backgroundColor: colorVar.value,
				};
			},
		);

		createAdvancedUtility({
			primary: "#007bff",
		});

		expect(root.utilities).toHaveLength(1);

		const advancedUtility = root.utilities.find((u) => u.name === "advanced");
		expect(advancedUtility?.declarations).toEqual({
			backgroundColor: "#007bff",
		});
		expect(advancedUtility?.variables).toHaveLength(1);
		expect(advancedUtility?.children).toHaveLength(1);
	});
});
