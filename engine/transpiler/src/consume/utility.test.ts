import type {
	Container,
	Modifier,
	Root,
	StyleframeOptions,
	Utility,
} from "@styleframe/core";
import { createRoot, createUtilityFunction } from "@styleframe/core";
import { createUtilityConsumer } from "./utility";
import { consume } from "./consume";

describe("createUtilityConsumer", () => {
	let root: Root;
	let parent: Container;
	let utility: ReturnType<typeof createUtilityFunction>;
	let marginUtility: Utility;
	let hoverModifier: Modifier;
	let focusModifier: Modifier;

	const consumeUtility = createUtilityConsumer(consume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		parent = root;
		utility = createUtilityFunction(parent, root);

		// Create a basic utility for testing
		const createMarginUtility = utility("margin", (value) => ({
			margin: value,
		}));

		createMarginUtility({
			sm: "8px",
			md: "16px",
		});

		const foundMarginUtility = root.utilities.find((u) => u.name === "margin");
		if (!foundMarginUtility) {
			throw new Error("Margin utility not found");
		}
		marginUtility = foundMarginUtility;

		// Create modifiers for testing
		hoverModifier = {
			type: "modifier",
			key: ["hover"],
			transform: ({ declarations }) => ({
				"&:hover": declarations,
			}),
		};

		focusModifier = {
			type: "modifier",
			key: ["focus"],
			transform: ({ declarations }) => ({
				"&:focus": declarations,
			}),
		};
	});

	it("should generate base utility selectors for each value", () => {
		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should handle boolean values correctly", () => {
		// Create a utility with boolean value
		const createDisplayUtility = utility("hidden", (value) => ({
			display: value === true ? "none" : "block",
		}));

		createDisplayUtility({
			default: true,
		});

		const displayUtility = root.utilities.find((u) => u.name === "hidden");
		if (!displayUtility) {
			throw new Error("Hidden utility not found");
		}
		const result = consumeUtility(displayUtility, options);

		const expected = `._hidden {
	display: none;
}`;

		expect(result).toBe(expected);
	});

	it("should handle undefined values correctly", () => {
		// Create a utility with undefined value
		const createVisibilityUtility = utility("visible", (value) => ({
			visibility: value || "visible",
		}));

		createVisibilityUtility({
			default: undefined,
		});

		const visibilityUtility = root.utilities.find((u) => u.name === "visible");
		if (!visibilityUtility) {
			throw new Error("Visible utility not found");
		}
		const result = consumeUtility(visibilityUtility, options);

		const expected = `._visible {
	visibility: visible;
}`;

		expect(result).toBe(expected);
	});

	it("should generate modified utility selectors with a single modifier", () => {
		// Add modifiers to the margin utility
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [hoverModifier];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._hover\\:margin\\:sm {
	&:hover {
		margin: 8px;
	}
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should generate modified utility selectors with multiple modifiers", () => {
		// Add multiple modifiers to the margin utility
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [hoverModifier, focusModifier];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._hover\\:margin\\:sm {
	&:hover {
		margin: 8px;
	}
}

._focus\\:margin\\:sm {
	&:focus {
		margin: 8px;
	}
}

._hover\\:focus\\:margin\\:sm {
	&:hover {
		&:focus {
			margin: 8px;
		}
	}
}

._focus\\:hover\\:margin\\:sm {
	&:focus {
		&:hover {
			margin: 8px;
		}
	}
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should handle utility with empty values object", () => {
		// Create a utility with no values
		const createEmptyUtility = utility("empty", (value) => ({
			display: value || "block",
		}));

		createEmptyUtility({});

		const emptyUtility = root.utilities.find((u) => u.name === "empty");
		if (!emptyUtility) {
			throw new Error("Empty utility not found");
		}
		const result = consumeUtility(emptyUtility, options);

		// Should return empty string as there are no values
		expect(result).toBe("");
	});

	it("should generate proper CSS output for complex declarations", () => {
		// Create a utility with complex declarations
		const createFlexUtility = utility("flex", (value) => ({
			display: "flex",
			flexDirection: value === "col" ? "column" : "row",
			gap: "1rem",
		}));

		createFlexUtility({
			row: "row",
			col: "col",
		});

		const flexUtility = root.utilities.find((u) => u.name === "flex");
		if (!flexUtility) {
			throw new Error("Flex utility not found");
		}
		const result = consumeUtility(flexUtility, options);

		const expected = `._flex\\:row {
	display: flex;
	flexDirection: row;
	gap: 1rem;
}

._flex\\:col {
	display: flex;
	flexDirection: column;
	gap: 1rem;
}`;

		expect(result).toBe(expected);
	});

	it("should handle utility without modifiers array defined", () => {
		// Clear the modifiers array to test undefined case
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should handle utility with empty modifiers array", () => {
		// Set empty modifiers array
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should handle true/false values with proper selector names", () => {
		// Create a utility where true values don't get a key suffix
		const createHiddenUtility = utility("hidden", (value) => ({
			display: value ? "none" : "block",
		}));

		createHiddenUtility({
			"": true, // This should create just ._hidden
			show: false,
		});

		const hiddenUtility = root.utilities.find((u) => u.name === "hidden");
		if (!hiddenUtility) {
			throw new Error("Hidden utility not found");
		}
		const result = consumeUtility(hiddenUtility, options);

		const expected = `._hidden {
	display: none;
}

._hidden\\:show {
	display: block;
}`;

		expect(result).toBe(expected);
	});

	it("should create utility selectors with proper escaping", () => {
		// Create a utility with special characters that need escaping
		const createSpacingUtility = utility("p", (value) => ({
			padding: value,
		}));

		createSpacingUtility({
			"1/2": "0.125rem",
			"2.5": "0.625rem",
		});

		const spacingUtility = root.utilities.find((u) => u.name === "p");
		if (!spacingUtility) {
			throw new Error("P utility not found");
		}
		const result = consumeUtility(spacingUtility, options);

		const expected = `._p\\:1\\/2 {
	padding: 0.125rem;
}

._p\\:2\\.5 {
	padding: 0.625rem;
}`;

		expect(result).toBe(expected);
	});

	it("should handle modifiers with complex transformations", () => {
		// Create a complex modifier
		const groupHoverModifier: Modifier = {
			type: "modifier",
			key: ["group-hover"],
			transform: ({ declarations }) => ({
				".group:hover &": declarations,
			}),
		};

		// Add the complex modifier to the margin utility
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [groupHoverModifier];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._group-hover\\:margin\\:sm {
	.group:hover & {
		margin: 8px;
	}
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should handle multi-key modifiers correctly", () => {
		// Create a modifier with multiple keys
		const breakpointModifier: Modifier = {
			type: "modifier",
			key: ["sm", "md", "lg"],
			transform: ({ key, declarations }) => ({
				[`@media (min-width: ${key === "sm" ? "640px" : key === "md" ? "768px" : "1024px"})`]:
					declarations,
			}),
		};

		// Add the multi-key modifier to the margin utility
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [breakpointModifier];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._sm\\:margin\\:sm {
	@media (min-width: 640px) {
		margin: 8px;
	}
}

._md\\:margin\\:sm {
	@media (min-width: 768px) {
		margin: 8px;
	}
}

._lg\\:margin\\:sm {
	@media (min-width: 1024px) {
		margin: 8px;
	}
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should combine multiple different modifiers correctly", () => {
		// Create a responsive modifier
		const responsiveModifier: Modifier = {
			type: "modifier",
			key: ["responsive"],
			transform: ({ declarations }) => ({
				"@media (min-width: 768px)": declarations,
			}),
		};

		// Add multiple modifiers to the margin utility
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [hoverModifier, responsiveModifier];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._hover\\:margin\\:sm {
	&:hover {
		margin: 8px;
	}
}

._responsive\\:margin\\:sm {
	@media (min-width: 768px) {
		margin: 8px;
	}
}

._hover\\:responsive\\:margin\\:sm {
	&:hover {
		@media (min-width: 768px) {
			margin: 8px;
		}
	}
}

._responsive\\:hover\\:margin\\:sm {
	@media (min-width: 768px) {
		&:hover {
			margin: 8px;
		}
	}
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});

	it("should handle modifiers that transform multiple properties", () => {
		// Create a complex modifier that transforms multiple properties
		const groupHoverModifier: Modifier = {
			type: "modifier",
			key: ["group-hover"],
			transform: ({ declarations }) => ({
				".group:hover &": declarations,
				"&:focus-within": {
					outline: "2px solid blue",
					...declarations,
				},
			}),
		};

		// Add the complex modifier to the margin utility
		const smValue = marginUtility.values.sm;
		if (!smValue) {
			throw new Error("sm value not found");
		}
		smValue.modifiers = [groupHoverModifier];

		const result = consumeUtility(marginUtility, options);

		const expected = `._margin\\:sm {
	margin: 8px;
}

._group-hover\\:margin\\:sm {
	.group:hover & {
		margin: 8px;
	}

	&:focus-within {
		outline: 2px solid blue;
		margin: 8px;
	}
}

._margin\\:md {
	margin: 16px;
}`;

		expect(result).toBe(expected);
	});
});
