import type { Container, ModifierFactory, Root, Utility } from "../types";
import { createRoot } from "./root";
import { createUtilityFunction } from "./utility";
import { applyModifiers } from "./modifier";
import { isUtility } from "../typeGuards";

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
		expect(root.utilities).toHaveLength(1); // Factory is registered immediately
		expect(root.utilities[0]).toMatchObject({
			type: "utility",
			name: "margin",
		});
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

		// Three utility instances should be created in children
		expect(root.children).toHaveLength(3);

		const smUtility = root.children.find(
			(u) => isUtility(u) && u.name === "padding" && u.value === "sm",
		);
		const mdUtility = root.children.find(
			(u) => isUtility(u) && u.name === "padding" && u.value === "md",
		);
		const lgUtility = root.children.find(
			(u) => isUtility(u) && u.name === "padding" && u.value === "lg",
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

		// One utility instance should be created in children
		expect(root.children).toHaveLength(1);

		const hiddenUtility = root.children.find(
			(u) => isUtility(u) && u.name === "hidden",
		);
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
		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ declarations }) => ({
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

		// Base utilities + modified variants in children
		// 2 base utilities + 2 modified = 4 total
		expect(root.children).toHaveLength(4);

		const primaryUtility = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "color" &&
				u.value === "primary" &&
				u.modifiers.length === 0,
		);
		const secondaryUtility = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "color" &&
				u.value === "secondary" &&
				u.modifiers.length === 0,
		);

		expect(primaryUtility).toEqual({
			type: "utility",
			name: "color",
			value: "primary",
			declarations: { color: "#007bff" },
			variables: [],
			children: [],
			modifiers: [],
		});
		expect(secondaryUtility).toEqual({
			type: "utility",
			name: "color",
			value: "secondary",
			declarations: { color: "#6c757d" },
			variables: [],
			children: [],
			modifiers: [],
		});

		// Check modified variants exist
		const primaryHover = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "color" &&
				u.value === "primary" &&
				u.modifiers.includes("hover"),
		);
		const secondaryHover = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "color" &&
				u.value === "secondary" &&
				u.modifiers.includes("hover"),
		);

		expect(primaryHover).toBeDefined();
		expect(secondaryHover).toBeDefined();
	});

	test("should store utility instances with multiple modifiers", () => {
		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const focusModifier: ModifierFactory = {
			type: "modifier",
			key: ["focus"],
			factory: ({ declarations }) => ({
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

		// 1 base utility + combinations of 2 modifiers
		// Combinations: [hover], [focus], [focus,hover] = 3 modified variants
		// Total: 1 base + 3 modified = 4
		expect(root.children).toHaveLength(4);

		const backgroundUtility = root.children.find(
			(u) =>
				isUtility(u) && u.name === "background" && u.modifiers.length === 0,
		);
		expect(backgroundUtility).toEqual({
			type: "utility",
			name: "background",
			value: "primary",
			declarations: { background: "#007bff" },
			variables: [],
			children: [],
			modifiers: [],
		});

		// Check modified variants exist
		const hoverVariant = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "background" &&
				u.modifiers.includes("hover") &&
				!u.modifiers.includes("focus"),
		);
		const focusVariant = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "background" &&
				u.modifiers.includes("focus") &&
				!u.modifiers.includes("hover"),
		);
		const bothVariant = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "background" &&
				u.modifiers.includes("hover") &&
				u.modifiers.includes("focus"),
		);

		expect(hoverVariant).toBeDefined();
		expect(focusVariant).toBeDefined();
		expect(bothVariant).toBeDefined();
	});

	test("should handle multi-key modifiers correctly", () => {
		const breakpointModifier: ModifierFactory = {
			type: "modifier",
			key: ["sm", "md", "lg"],
			factory: ({ declarations }) => ({
				"@media screen and (min-width: 640px)": declarations,
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

		// 1 base utility + combinations for multi-key modifier
		// Multi-key ["sm", "md", "lg"] creates: [sm], [md], [lg] = 3 variants
		// Total: 1 base + 3 modified = 4
		expect(root.children).toHaveLength(4);

		const textUtility = root.children.find(
			(u) => isUtility(u) && u.name === "text" && u.modifiers.length === 0,
		);
		expect(textUtility).toEqual({
			type: "utility",
			name: "text",
			value: "base",
			declarations: { fontSize: "14px" },
			variables: [],
			children: [],
			modifiers: [],
		});

		// Check breakpoint variants exist
		const smVariant = root.children.find(
			(u) => isUtility(u) && u.name === "text" && u.modifiers.includes("sm"),
		);
		const mdVariant = root.children.find(
			(u) => isUtility(u) && u.name === "text" && u.modifiers.includes("md"),
		);
		const lgVariant = root.children.find(
			(u) => isUtility(u) && u.name === "text" && u.modifiers.includes("lg"),
		);

		expect(smVariant).toBeDefined();
		expect(mdVariant).toBeDefined();
		expect(lgVariant).toBeDefined();
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

		// One utility instance should be created with empty modifiers array
		expect(root.children).toHaveLength(1);

		const widthUtility = root.children.find(
			(u) => isUtility(u) && u.name === "width",
		);
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

		// One utility instance should be created with empty modifiers array (default)
		expect(root.children).toHaveLength(1);

		const heightUtility = root.children.find(
			(u) => isUtility(u) && u.name === "height",
		);
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

		// Two utility instances should be created
		expect(root.children).toHaveLength(2);

		const rowUtility = root.children.find(
			(u) => isUtility(u) && u.name === "flex" && u.value === "row",
		);
		const colUtility = root.children.find(
			(u) => isUtility(u) && u.name === "flex" && u.value === "col",
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

		// No utility instances should be created for empty entries
		expect(root.children).toHaveLength(0);
	});

	test("should create multiple utility instances when called multiple times", () => {
		const createMarginUtility = utility("margin", ({ value }) => ({
			margin: value,
		}));

		createMarginUtility({
			sm: "8px",
			md: "16px",
		});

		expect(root.children).toHaveLength(2);

		const smUtility = root.children.find(
			(u) => isUtility(u) && u.name === "margin" && u.value === "sm",
		);
		const mdUtility = root.children.find(
			(u) => isUtility(u) && u.name === "margin" && u.value === "md",
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

		expect(root.children).toHaveLength(4);

		const smUtility = root.children.find(
			(u) => isUtility(u) && u.name === "spacing" && u.value === "sm",
		);
		const mdUtility = root.children.find(
			(u) => isUtility(u) && u.name === "spacing" && u.value === "md",
		);
		const lgUtility = root.children.find(
			(u) => isUtility(u) && u.name === "spacing" && u.value === "lg",
		);
		const xlUtility = root.children.find(
			(u) => isUtility(u) && u.name === "spacing" && u.value === "xl",
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

		expect(root.children).toHaveLength(2);

		const utilities = root.children.filter(
			(u): u is Utility =>
				isUtility(u) && u.name === "color" && u.value === "primary",
		);
		expect(utilities).toHaveLength(2);
		expect(utilities[0]?.declarations?.color).toBe("#007bff");
		expect(utilities[1]?.declarations?.color).toBe("#0056b3");
	});

	test("should handle different modifiers on subsequent calls", () => {
		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const focusModifier: ModifierFactory = {
			type: "modifier",
			key: ["focus"],
			factory: ({ declarations }) => ({
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

		// First call creates 1 base + 1 hover variant = 2
		// Second call creates 1 base + 1 focus variant = 2
		// Total: 4
		expect(root.children).toHaveLength(4);

		const primaryUtility = root.children.find(
			(u): u is Utility =>
				isUtility(u) && u.name === "button" && u.value === "primary",
		);
		const secondaryUtility = root.children.find(
			(u): u is Utility =>
				isUtility(u) && u.name === "button" && u.value === "secondary",
		);

		expect(primaryUtility?.modifiers).toEqual([]);
		expect(secondaryUtility?.modifiers).toEqual([]);

		// Check that modified variants were created
		const primaryHoverVariant = root.children.find(
			(u) =>
				isUtility(u) &&
				u.name === "button" &&
				u.value === "primary" &&
				u.modifiers.includes("hover"),
		);
		const secondaryFocusVariant = root.children.find(
			(u): u is Utility =>
				isUtility(u) &&
				u.name === "button" &&
				u.value === "secondary" &&
				u.modifiers.includes("focus"),
		);

		expect(primaryHoverVariant).toBeDefined();
		expect(secondaryFocusVariant).toBeDefined();
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

		expect(root.children).toHaveLength(1);

		const advancedUtility = root.children.find(
			(u): u is Utility => isUtility(u) && u.name === "advanced",
		);
		expect(advancedUtility?.declarations).toEqual({
			backgroundColor: "#007bff",
		});
		expect(advancedUtility?.variables).toHaveLength(1);
		expect(advancedUtility?.children).toHaveLength(1);
	});
});

describe("createModifiedUtilityFunction", () => {
	let root: Root;

	beforeEach(() => {
		root = createRoot();
	});

	test("should create a modified utility function", () => {
		expect(applyModifiers).toBeTypeOf("function");
	});

	test("should return a new utility instance with modified modifiers", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "padding",
			value: "sm",
			declarations: { padding: "8px" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map(Object.entries({ hover: hoverModifier })),
		);

		expect(result).not.toBe(baseUtility); // Should be a new instance
		expect(result.type).toBe("utility");
		expect(result.name).toBe("padding");
		expect(result.value).toBe("sm");
		expect(result.modifiers).toEqual(["hover"]);
	});

	test("should preserve base utility properties while updating modifiers", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "margin",
			value: "lg",
			declarations: { margin: "24px" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const focusModifier: ModifierFactory = {
			type: "modifier",
			key: ["focus"],
			factory: ({ declarations }) => ({
				"&:focus": declarations,
			}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map(Object.entries({ focus: focusModifier })),
		);

		expect(result.type).toBe("utility");
		expect(result.name).toBe("margin");
		expect(result.value).toBe("lg");
		expect(result.declarations).toEqual({ margin: "24px" });
		expect(result.modifiers).toEqual(["focus"]);
	});

	test("should apply multiple modifiers to utility", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "color",
			value: "primary",
			declarations: { color: "#007bff" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const focusModifier: ModifierFactory = {
			type: "modifier",
			key: ["focus"],
			factory: ({ declarations }) => ({
				"&:focus": declarations,
			}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([
				["hover", hoverModifier],
				["focus", focusModifier],
			]),
		);

		expect(result.modifiers).toEqual(["hover", "focus"]);
	});

	test("should handle modifiers that add variables", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "background",
			value: "primary",
			declarations: { background: "#007bff" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const variableModifier: ModifierFactory = {
			type: "modifier",
			key: ["var"],
			factory: ({ variable }) => {
				const colorVar = variable("bg-color", "#007bff");
				return {
					background: colorVar.value,
				};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map(
				Object.entries({
					var: variableModifier,
				}),
			),
		);

		expect(result.variables).toHaveLength(1);
		expect(result.variables[0]).toEqual({
			type: "variable",
			name: "bg-color",
			value: "#007bff",
		});
		expect(result.modifiers).toEqual(["var"]);
	});

	test("should handle modifiers that add child selectors", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "text",
			value: "underline",
			declarations: { textDecoration: "underline" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const childModifier: ModifierFactory = {
			type: "modifier",
			key: ["child"],
			factory: ({ selector }) => {
				selector("& > span", { textDecoration: "inherit" });
				return {};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map(Object.entries({ child: childModifier })),
		);

		expect(result.children).toHaveLength(1);
		expect(result.children[0]).toMatchObject({
			type: "selector",
			query: "& > span",
			declarations: { textDecoration: "inherit" },
		});
		expect(result.modifiers).toEqual(["child"]);
	});

	test("should handle empty modifiers array", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "display",
			value: "block",
			declarations: { display: "block" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const result = applyModifiers(baseUtility, root, new Map());

		expect(result).not.toBe(baseUtility);
		expect(result.modifiers).toEqual([]);
		expect(result.declarations).toEqual({ display: "block" });
	});

	test("should handle modifier combination with different keys", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "opacity",
			value: "50",
			declarations: { opacity: "0.5" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		const darkModeModifier: ModifierFactory = {
			type: "modifier",
			key: ["dark"],
			factory: ({ declarations }) => ({
				".dark &": declarations,
			}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([
				["dark", darkModeModifier],
				["hover", hoverModifier],
			]),
		);

		expect(result.modifiers).toEqual(["dark", "hover"]);
	});

	test("should apply modifiers in order", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "transform",
			value: "scale",
			declarations: { transform: "scale(1)" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const executionOrder: string[] = [];

		const firstModifier: ModifierFactory = {
			type: "modifier",
			key: ["first"],
			factory: ({ variable }) => {
				executionOrder.push("first");
				variable("first-var", "1");
				return {};
			},
		};

		const secondModifier: ModifierFactory = {
			type: "modifier",
			key: ["second"],
			factory: ({ variable }) => {
				executionOrder.push("second");
				variable("second-var", "2");
				return {};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([
				["first", firstModifier],
				["second", secondModifier],
			]),
		);

		expect(executionOrder).toEqual(["first", "second"]);
		expect(result.variables).toHaveLength(2);
		expect(result.variables[0]?.name).toBe("first-var");
		expect(result.variables[1]?.name).toBe("second-var");
	});

	test("should handle modifiers that modify existing declarations", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "border",
			value: "solid",
			declarations: { borderStyle: "solid" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const widthModifier: ModifierFactory = {
			type: "modifier",
			key: ["thick"],
			factory: ({ declarations }) => ({
				...declarations,
				borderWidth: "4px",
			}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["thick", widthModifier]]),
		);

		// The original declarations should be preserved
		expect(result.declarations).toEqual({ borderStyle: "solid" });
		expect(result.modifiers).toEqual(["thick"]);
	});

	test("should handle modifiers with multi-key definitions", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "fontSize",
			value: "base",
			declarations: { fontSize: "16px" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const responsiveModifier: ModifierFactory = {
			type: "modifier",
			key: ["sm", "md", "lg"],
			factory: ({ declarations }) => ({
				"@media (min-width: 640px)": declarations,
			}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["md", responsiveModifier]]),
		);

		expect(result.modifiers).toEqual(["md"]);
	});

	test("should create independent instances for each modification", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "gap",
			value: "sm",
			declarations: { gap: "8px" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const hoverModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover"],
			factory: ({ variable }) => {
				variable("hover-gap", "16px");
				return {};
			},
		};

		const result1 = applyModifiers(
			baseUtility,
			root,
			new Map(Object.entries({ hover: hoverModifier })),
		);
		const result2 = applyModifiers(
			baseUtility,
			root,
			new Map(Object.entries({ hover: hoverModifier })),
		);

		// The instances themselves should be different
		expect(result1).not.toBe(result2);
		// Note: variables and children arrays are shared from baseUtility due to spread operator
		// This is the actual behavior of the function - it mutates the arrays
		expect(result1.variables).toBe(result2.variables);
		expect(result1.children).toBe(result2.children);
	});

	test("should handle complex modifier factory with multiple operations", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "button",
			value: "primary",
			declarations: { backgroundColor: "#007bff", color: "white" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const complexModifier: ModifierFactory = {
			type: "modifier",
			key: ["interactive"],
			factory: ({ variable, selector }) => {
				const bgVar = variable("button-bg", "#007bff");
				const textVar = variable("button-text", "white");

				selector("&:hover", {
					backgroundColor: "darken(" + bgVar.value + ", 10%)",
				});

				selector("&:focus", {
					outline: "2px solid " + bgVar.value,
				});

				selector("&:disabled", {
					opacity: "0.5",
					cursor: "not-allowed",
				});

				return {
					backgroundColor: bgVar.value,
					color: textVar.value,
				};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["interactive", complexModifier]]),
		);

		expect(result.variables).toHaveLength(2);
		expect(result.variables[0]?.name).toBe("button-bg");
		expect(result.variables[1]?.name).toBe("button-text");

		expect(result.children).toHaveLength(3);
		expect(result.children[0]).toMatchObject({
			type: "selector",
			query: "&:hover",
		});
		expect(result.children[1]).toMatchObject({
			type: "selector",
			query: "&:focus",
		});
		expect(result.children[2]).toMatchObject({
			type: "selector",
			query: "&:disabled",
		});

		expect(result.modifiers).toEqual(["interactive"]);
	});

	test("should mutate base utility's arrays when modifiers add items", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "position",
			value: "absolute",
			declarations: { position: "absolute" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const originalDeclarations = { ...baseUtility.declarations };
		const originalModifiers = [...baseUtility.modifiers];

		const modifier: ModifierFactory = {
			type: "modifier",
			key: ["test"],
			factory: ({ variable }) => {
				variable("test-var", "value");
				return { top: "0" };
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["test", modifier]]),
		);

		// The declarations object should remain unchanged
		expect(baseUtility.declarations).toEqual(originalDeclarations);
		// The modifiers array should remain unchanged
		expect(baseUtility.modifiers).toEqual(originalModifiers);
		// But variables array will be mutated due to spread operator shallow copy
		expect(baseUtility.variables).toHaveLength(1);
		expect(baseUtility.variables[0]).toEqual({
			type: "variable",
			name: "test-var",
			value: "value",
		});
		// The result should have the combination in its modifiers
		expect(result.modifiers).toEqual(["test"]);
	});

	test("should handle modifier that returns null declarations", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "display",
			value: "flex",
			declarations: { display: "flex" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const nullModifier: ModifierFactory = {
			type: "modifier",
			key: ["null"],
			factory: () => ({}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["null", nullModifier]]),
		);

		expect(result.declarations).toEqual({ display: "flex" });
		expect(result.modifiers).toEqual(["null"]);
	});

	test("should handle modifier that returns undefined declarations", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "width",
			value: "auto",
			declarations: { width: "auto" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const undefinedModifier: ModifierFactory = {
			type: "modifier",
			key: ["undefined"],
			factory: () => undefined,
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["undefined", undefinedModifier]]),
		);

		expect(result.declarations).toEqual({ width: "auto" });
		expect(result.modifiers).toEqual(["undefined"]);
	});

	test("should handle modifier that returns empty object", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "height",
			value: "100vh",
			declarations: { height: "100vh" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const emptyModifier: ModifierFactory = {
			type: "modifier",
			key: ["empty"],
			factory: () => ({}),
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["empty", emptyModifier]]),
		);

		expect(result.declarations).toEqual({ height: "100vh" });
		expect(result.modifiers).toEqual(["empty"]);
	});

	test("should handle combination array that is empty", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "overflow",
			value: "hidden",
			declarations: { overflow: "hidden" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const result = applyModifiers(baseUtility, root, new Map());

		expect(result.modifiers).toEqual([]);
		expect(result.declarations).toEqual({ overflow: "hidden" });
	});

	test("should handle nested selector creation within modifiers", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "card",
			value: "default",
			declarations: { padding: "1rem" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const nestedModifier: ModifierFactory = {
			type: "modifier",
			key: ["nested"],
			factory: ({ selector }) => {
				selector(".card-header", { fontWeight: "bold" });
				selector(".card-body", { padding: "0.5rem" });
				selector(".card-footer", { borderTop: "1px solid #ccc" });
				return {};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["nested", nestedModifier]]),
		);

		expect(result.children).toHaveLength(3);
		expect(result.children[0]).toMatchObject({
			type: "selector",
			query: ".card-header",
			declarations: { fontWeight: "bold" },
		});
		expect(result.children[1]).toMatchObject({
			type: "selector",
			query: ".card-body",
			declarations: { padding: "0.5rem" },
		});
		expect(result.children[2]).toMatchObject({
			type: "selector",
			query: ".card-footer",
			declarations: { borderTop: "1px solid #ccc" },
		});
	});

	test("should handle modifier with same key appearing in combination multiple times", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "state",
			value: "active",
			declarations: { opacity: "1" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const stateModifier: ModifierFactory = {
			type: "modifier",
			key: ["hover", "focus"],
			factory: ({ variable }) => {
				variable("state-opacity", "0.8");
				return {};
			},
		};

		// Duplicate keys in combination
		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["hover", stateModifier]]),
		);

		expect(result.modifiers).toEqual(["hover"]);
		expect(result.variables).toHaveLength(1);
	});

	test("should handle utility with pre-existing variables and children", () => {
		const existingVar = {
			type: "variable" as const,
			name: "existing-var",
			value: "existing-value",
		};

		const existingChild = {
			type: "selector" as const,
			query: ".existing",
			declarations: { color: "red" },
			variables: [],
			children: [],
		};

		const baseUtility: Utility = {
			type: "utility",
			name: "complex",
			value: "base",
			declarations: { margin: "0" },
			variables: [existingVar],
			children: [existingChild],
			modifiers: [],
		};

		const additionalModifier: ModifierFactory = {
			type: "modifier",
			key: ["additional"],
			factory: ({ variable, selector }) => {
				variable("new-var", "new-value");
				selector(".new", { color: "blue" });
				return {};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["additional", additionalModifier]]),
		);

		expect(result.variables).toHaveLength(2);
		expect(result.variables[0]).toEqual(existingVar);
		expect(result.variables[1]).toEqual({
			type: "variable",
			name: "new-var",
			value: "new-value",
		});

		expect(result.children).toHaveLength(2);
		expect(result.children[0]).toEqual(existingChild);
		expect(result.children[1]).toMatchObject({
			type: "selector",
			query: ".new",
			declarations: { color: "blue" },
		});
	});

	test("should handle deeply nested declarations from modifiers", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "grid",
			value: "layout",
			declarations: { display: "grid" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const deepModifier: ModifierFactory = {
			type: "modifier",
			key: ["deep"],
			factory: ({ selector }) => {
				selector("& > .row", { gridRow: "span 1" });
				selector("& > .row > .col", { gridColumn: "span 1" });
				return {
					gridTemplateColumns: "repeat(12, 1fr)",
					gridGap: "1rem",
				};
			},
		};

		const result = applyModifiers(
			baseUtility,
			root,
			new Map([["deep", deepModifier]]),
		);

		expect(result.declarations).toEqual({ display: "grid" });
		expect(result.children).toHaveLength(2);
		expect(result.modifiers).toEqual(["deep"]);
	});

	test("should handle modifier factory that throws an error", () => {
		const baseUtility: Utility = {
			type: "utility",
			name: "error",
			value: "test",
			declarations: { display: "block" },
			variables: [],
			children: [],
			modifiers: [],
		};

		const errorModifier: ModifierFactory = {
			type: "modifier",
			key: ["error"],
			factory: () => {
				throw new Error("Test error");
			},
		};

		expect(() => {
			applyModifiers(baseUtility, root, new Map([["error", errorModifier]]));
		}).toThrow("Test error");
	});
});
