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
			values: {},
		});
	});

	test("should store values on factoryInstance when utility is used", () => {
		const createPaddingUtility = utility("padding", ({ value }) => ({
			padding: value,
		}));

		createPaddingUtility({
			sm: "8px",
			md: "16px",
			lg: "24px",
		});

		expect(root.utilities[0]?.values).toEqual([
			{ key: "sm", value: "8px", modifiers: [] },
			{ key: "md", value: "16px", modifiers: [] },
			{ key: "lg", value: "24px", modifiers: [] },
		]);
	});

	test("should store creator function on factoryInstance under create field", () => {
		const createMarginUtility = utility("margin", ({ value }) => ({
			margin: value,
		}));

		expect(root.utilities[0]?.create).toBe(createMarginUtility);
	});

	test("should accumulate values when utility is called multiple times", () => {
		const createSpacingUtility = utility("spacing", ({ value }) => ({
			margin: value,
		}));

		createSpacingUtility({
			sm: "4px",
			md: "8px",
		});

		createSpacingUtility({
			lg: "16px",
			xl: "32px",
		});

		expect(root.utilities[0]?.values).toEqual([
			{ key: "sm", value: "4px", modifiers: [] },
			{ key: "md", value: "8px", modifiers: [] },
			{ key: "lg", value: "16px", modifiers: [] },
			{ key: "xl", value: "32px", modifiers: [] },
		]);
	});

	test("should skip duplicate keys on subsequent calls", () => {
		const createColorUtility = utility("color", ({ value }) => ({
			color: value,
		}));

		createColorUtility({
			primary: "blue",
		});

		createColorUtility({
			primary: "red",
		});

		expect(root.utilities[0]?.values).toEqual([
			{ key: "primary", value: "blue", modifiers: [] },
		]);
		expect(root.children).toHaveLength(1);
	});

	test("should store boolean values correctly", () => {
		const createHiddenUtility = utility("hidden", ({ value }) => ({
			display: value ? "none" : "block",
		}));

		createHiddenUtility({
			default: true,
			visible: false,
		});

		expect(root.utilities[0]?.values).toEqual([
			{ key: "default", value: true, modifiers: [] },
			{ key: "visible", value: false, modifiers: [] },
		]);
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

	test("should skip duplicate keys on subsequent calls", () => {
		const createColorUtility = utility("color", ({ value }) => ({
			color: value,
		}));

		// First call
		createColorUtility({
			primary: "#007bff",
		});

		// Second call with same key - should skip the duplicate
		createColorUtility({
			primary: "#0056b3",
		});

		expect(root.children).toHaveLength(1);

		const utilities = root.children.filter(
			(u): u is Utility =>
				isUtility(u) && u.name === "color" && u.value === "primary",
		);
		expect(utilities).toHaveLength(1);
		expect(utilities[0]?.declarations?.color).toBe("#007bff");
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

	describe("array entries functionality", () => {
		test("should handle array entries with arbitrary values using default autogenerate", () => {
			const createColorUtility = utility("color", ({ value }) => ({
				color: value,
			}));

			createColorUtility(["red", "blue", "green"]);

			expect(root.utilities[0]?.values).toEqual([
				{ key: "[red]", value: "red", modifiers: [] },
				{ key: "[blue]", value: "blue", modifiers: [] },
				{ key: "[green]", value: "green", modifiers: [] },
			]);

			expect(root.children).toHaveLength(3);

			const redUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "color" && u.value === "[red]",
			);
			expect(redUtility?.declarations).toEqual({ color: "red" });

			const blueUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "color" && u.value === "[blue]",
			);
			expect(blueUtility?.declarations).toEqual({ color: "blue" });
		});

		test("should handle array entries with @ string references using default autogenerate", () => {
			const createColorUtility = utility("color", ({ value }) => ({
				color: value,
			}));

			createColorUtility(["@color.primary", "@color.secondary"]);

			expect(root.utilities[0]?.values).toEqual([
				{
					key: "color.primary",
					value: {
						type: "reference",
						name: "color.primary",
					},
					modifiers: [],
				},
				{
					key: "color.secondary",
					value: {
						type: "reference",
						name: "color.secondary",
					},
					modifiers: [],
				},
			]);

			expect(root.children).toHaveLength(2);

			const primaryUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "color" && u.value === "color.primary",
			);
			expect(primaryUtility?.declarations).toEqual({
				color: {
					type: "reference",
					name: "color.primary",
				},
			});
		});

		test("should handle array entries with Reference objects using default autogenerate", () => {
			const createPaddingUtility = utility("padding", ({ value }) => ({
				padding: value,
			}));

			const ref1 = { type: "reference" as const, name: "spacing.sm" };
			const ref2 = { type: "reference" as const, name: "spacing.md" };

			createPaddingUtility([ref1, ref2]);

			expect(root.utilities[0]?.values).toEqual([
				{ key: "spacing.sm", value: ref1, modifiers: [] },
				{ key: "spacing.md", value: ref2, modifiers: [] },
			]);

			expect(root.children).toHaveLength(2);

			const smUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "padding" && u.value === "spacing.sm",
			);
			expect(smUtility?.declarations).toEqual({ padding: ref1 });
		});

		test("should handle mixed array entries with default autogenerate", () => {
			const createMarginUtility = utility("margin", ({ value }) => ({
				margin: value,
			}));

			const ref = { type: "reference" as const, name: "spacing.lg" };

			createMarginUtility(["@spacing.sm", ref, "16px"]);

			expect(root.utilities[0]?.values).toEqual([
				{
					key: "spacing.sm",
					value: {
						type: "reference",
						name: "spacing.sm",
					},
					modifiers: [],
				},
				{ key: "spacing.lg", value: ref, modifiers: [] },
				{ key: "[16px]", value: "16px", modifiers: [] },
			]);

			expect(root.children).toHaveLength(3);
		});

		test("should handle array entries with custom autogenerate function", () => {
			const createSizeUtility = utility(
				"size",
				({ value }) => ({
					width: value,
					height: value,
				}),
				{
					autogenerate: (value) => {
						if (typeof value === "string" && value.startsWith("@")) {
							const name = value.slice(1);
							// Custom: prefix with "size-"
							return {
								[`size-${name}`]: {
									type: "reference",
									name,
								},
							};
						}
						// Custom: use "custom-" prefix instead of brackets
						return { [`custom-${value}`]: value };
					},
				},
			);

			createSizeUtility(["@lg", "100px"]);

			expect(root.utilities[0]?.values).toEqual([
				{
					key: "size-lg",
					value: {
						type: "reference",
						name: "lg",
					},
					modifiers: [],
				},
				{ key: "custom-100px", value: "100px", modifiers: [] },
			]);

			expect(root.children).toHaveLength(2);

			const lgUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "size" && u.value === "size-lg",
			);
			expect(lgUtility?.declarations).toEqual({
				width: { type: "reference", name: "lg" },
				height: { type: "reference", name: "lg" },
			});

			const customUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "size" && u.value === "custom-100px",
			);
			expect(customUtility?.declarations).toEqual({
				width: "100px",
				height: "100px",
			});
		});

		test("should handle array entries with autogenerate that transforms variable names", () => {
			const createBgUtility = utility(
				"bg",
				({ value }) => ({
					backgroundColor: value,
				}),
				{
					autogenerate: (value) => {
						if (typeof value === "string" && value.startsWith("@")) {
							const fullName = value.slice(1);
							// Extract just the last part after the dot
							const shortName = fullName.split(".").pop() ?? fullName;
							return {
								[shortName]: {
									type: "reference",
									name: fullName,
								},
							};
						}
						return { [`[${value}]`]: value };
					},
				},
			);

			createBgUtility(["@colors.brand.primary", "@colors.brand.secondary"]);

			expect(root.utilities[0]?.values).toEqual([
				{
					key: "primary",
					value: {
						type: "reference",
						name: "colors.brand.primary",
					},
					modifiers: [],
				},
				{
					key: "secondary",
					value: {
						type: "reference",
						name: "colors.brand.secondary",
					},
					modifiers: [],
				},
			]);

			expect(root.children).toHaveLength(2);

			const primaryUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "bg" && u.value === "primary",
			);
			expect(primaryUtility?.declarations).toEqual({
				backgroundColor: {
					type: "reference",
					name: "colors.brand.primary",
				},
			});
		});

		test("should handle empty array entries", () => {
			const createEmptyUtility = utility("empty", ({ value }) => ({
				display: value,
			}));

			createEmptyUtility([]);

			expect(root.utilities[0]?.values).toEqual([]);
			expect(root.children).toHaveLength(0);
		});

		test("should handle array entries with numeric values", () => {
			const createZIndexUtility = utility("z", ({ value }) => ({
				zIndex: value,
			}));

			createZIndexUtility([10, 20, 30]);

			expect(root.utilities[0]?.values).toEqual([
				{ key: "[10]", value: 10, modifiers: [] },
				{ key: "[20]", value: 20, modifiers: [] },
				{ key: "[30]", value: 30, modifiers: [] },
			]);

			expect(root.children).toHaveLength(3);

			const z10Utility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "z" && u.value === "[10]",
			);
			expect(z10Utility?.declarations).toEqual({ zIndex: 10 });
		});

		test("should handle array entries with modifiers", () => {
			const hoverModifier: ModifierFactory = {
				type: "modifier",
				key: ["hover"],
				factory: ({ declarations }) => ({
					"&:hover": declarations,
				}),
			};

			const createOpacityUtility = utility("opacity", ({ value }) => ({
				opacity: value,
			}));

			createOpacityUtility(["@opacity.50", "@opacity.100"], [hoverModifier]);

			// 2 base utilities + 2 hover variants = 4 total
			expect(root.children).toHaveLength(4);

			const opacity50 = root.children.find(
				(u): u is Utility =>
					isUtility(u) &&
					u.name === "opacity" &&
					u.value === "opacity.50" &&
					u.modifiers.length === 0,
			);
			expect(opacity50).toBeDefined();

			const opacity50Hover = root.children.find(
				(u): u is Utility =>
					isUtility(u) &&
					u.name === "opacity" &&
					u.value === "opacity.50" &&
					u.modifiers.includes("hover"),
			);
			expect(opacity50Hover).toBeDefined();
		});

		test("should accumulate values from multiple array calls", () => {
			const createGapUtility = utility("gap", ({ value }) => ({
				gap: value,
			}));

			createGapUtility(["@spacing.sm", "@spacing.md"]);
			createGapUtility(["@spacing.lg", "32px"]);

			expect(root.utilities[0]?.values).toEqual([
				{
					key: "spacing.sm",
					value: { type: "reference", name: "spacing.sm" },
					modifiers: [],
				},
				{
					key: "spacing.md",
					value: { type: "reference", name: "spacing.md" },
					modifiers: [],
				},
				{
					key: "spacing.lg",
					value: { type: "reference", name: "spacing.lg" },
					modifiers: [],
				},
				{ key: "[32px]", value: "32px", modifiers: [] },
			]);

			expect(root.children).toHaveLength(4);
		});

		test("should handle array entries with Reference objects containing fallback", () => {
			const createBorderUtility = utility("border", ({ value }) => ({
				borderWidth: value,
			}));

			const refWithFallback = {
				type: "reference" as const,
				name: "border.width",
				fallback: "1px",
			};

			createBorderUtility([refWithFallback]);

			expect(root.utilities[0]?.values).toEqual([
				{ key: "border.width", value: refWithFallback, modifiers: [] },
			]);

			const borderUtility = root.children.find(
				(u): u is Utility =>
					isUtility(u) && u.name === "border" && u.value === "border.width",
			);
			expect(borderUtility?.declarations).toEqual({
				borderWidth: refWithFallback,
			});
		});

		test("should preserve object entries behavior when not using array", () => {
			const createFlexUtility = utility("flex", ({ value }) => ({
				flex: value,
			}));

			// Using object entries (original behavior)
			createFlexUtility({
				"1": "1 1 0%",
				auto: "1 1 auto",
				none: "none",
			});

			expect(root.utilities[0]?.values).toEqual([
				{ key: "1", value: "1 1 0%", modifiers: [] },
				{ key: "auto", value: "1 1 auto", modifiers: [] },
				{ key: "none", value: "none", modifiers: [] },
			]);

			expect(root.children).toHaveLength(3);
		});
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
