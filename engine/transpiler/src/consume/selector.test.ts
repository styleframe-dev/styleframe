import type { Root, StyleframeOptions } from "@styleframe/core";
import {
	createCssFunction,
	createRefFunction,
	createRoot,
	createSelectorFunction,
	createVariableFunction,
	isSelector,
} from "@styleframe/core";
import { createSelectorConsumer } from "./selector";
import { consume } from "./consume";

describe("createSelectorConsumer", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;
	let selector: ReturnType<typeof createSelectorFunction>;
	let css: ReturnType<typeof createCssFunction>;

	const consumeSelector = createSelectorConsumer(consume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
		selector = createSelectorFunction(root, root);
		css = createCssFunction(root, root);
	});

	it("should create a basic selector with declarations", () => {
		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
			backgroundColor: "#006cff",
			color: "white",
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;
	color: white;
}`);
	});

	it("should create a selector with variables", () => {
		const buttonSelector = selector(".button", ({ variable }) => {
			variable("button-color", "#006cff");

			return {
				padding: "0.5rem 1rem",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;

	padding: 0.5rem 1rem;
}`);
	});

	it("should create a selector with child selectors", () => {
		const buttonSelector = selector(".button", ({ selector }) => {
			selector("&:hover", {
				backgroundColor: "#0056cc",
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;

	&:hover {
		backgroundColor: #0056cc;
	}
}`);
	});

	it("should create a selector with variables, declarations and children", () => {
		const buttonSelector = selector(".button", ({ variable, selector }) => {
			const colorVar = variable("button-color", "#006cff");
			const hoverVar = variable("button-hover-color", "#0056cc");

			selector("&:hover", {
				backgroundColor: ref(hoverVar),
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: ref(colorVar),
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;
	--button-hover-color: #0056cc;

	padding: 0.5rem 1rem;
	backgroundColor: var(--button-color);

	&:hover {
		backgroundColor: var(--button-hover-color);
	}
}`);
	});

	it("should handle empty declarations", () => {
		const buttonSelector = selector(".button", ({ selector }) => {
			selector("&:hover", {
				backgroundColor: "#0056cc",
			});
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	&:hover {
		backgroundColor: #0056cc;
	}
}`);
	});

	it("should handle empty variables", () => {
		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
}`);
	});

	it("should handle empty children", () => {
		const buttonSelector = selector(".button", ({ variable }) => {
			variable("button-color", "#006cff");

			return {
				padding: "0.5rem 1rem",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;

	padding: 0.5rem 1rem;
}`);
	});

	it("should handle completely empty selector", () => {
		const emptySelector = selector(".empty", {});

		const result = consumeSelector(emptySelector, options);

		expect(result).toBe(`.empty {}`);
	});

	it("should respect custom indentation in options", () => {
		const customOptions: StyleframeOptions = {
			indent: "    ", // 4 spaces instead of default 2
		};

		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
			backgroundColor: "#006cff",
		});

		const result = consumeSelector(buttonSelector, customOptions);

		expect(result).toBe(`.button {
    padding: 0.5rem 1rem;
    backgroundColor: #006cff;
}`);
	});

	it("should handle nested children multiple levels deep", () => {
		const buttonSelector = selector(".button", ({ selector }) => {
			selector("&:hover", ({ selector }) => {
				selector("&:active", {
					transform: "scale(0.98)",
				});

				return {
					backgroundColor: "#0056cc",
				};
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;

	&:hover {
		backgroundColor: #0056cc;

		&:active {
			transform: scale(0.98);
		}
	}
}`);
	});

	it("should handle complex nested selector structures", () => {
		const buttonSelector = selector(".button", ({ selector, variable }) => {
			const colorVar = variable("button-color", "#006cff");

			selector("&:hover", ({ selector }) => {
				selector("&:active", {
					transform: "scale(0.98)",
				});

				return {
					backgroundColor: "#0056cc",
				};
			});

			selector("& > .icon", {
				marginRight: "0.5rem",
			});

			return {
				padding: "0.5rem 1rem",
				backgroundColor: ref(colorVar),
				display: "flex",
				alignItems: "center",
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--button-color: #006cff;

	padding: 0.5rem 1rem;
	backgroundColor: var(--button-color);
	display: flex;
	alignItems: center;

	&:hover {
		backgroundColor: #0056cc;

		&:active {
			transform: scale(0.98);
		}
	}

	& > .icon {
		marginRight: 0.5rem;
	}
}`);
	});

	it("should handle selectors with inline nesting syntax", () => {
		const cardSelector = selector(".card", {
			padding: "1rem",
			borderRadius: "8px",

			// Inline nested selectors
			".card-title": {
				fontSize: "1.5rem",
				fontWeight: "bold",
			},

			".card-content": {
				marginTop: "0.5rem",
			},
		});

		// Extract the created nested selectors
		const nestedSelectors = cardSelector.children.filter((child) =>
			isSelector(child),
		);

		// Confirm we have the expected nested selectors
		expect(nestedSelectors.length).toBe(2);

		const result = consumeSelector(cardSelector, options);

		expect(result).toBe(`.card {
	padding: 1rem;
	borderRadius: 8px;

	.card-title {
		fontSize: 1.5rem;
		fontWeight: bold;
	}

	.card-content {
		marginTop: 0.5rem;
	}
}`);
	});

	it("should handle selectors with pseudo-classes", () => {
		const buttonSelector = selector(".button", {
			padding: "0.5rem 1rem",
			backgroundColor: "#006cff",
			color: "white",
			transition: "background-color 0.2s",

			"&:hover": {
				backgroundColor: "#0056cc",
			},

			"&:active": {
				backgroundColor: "#004099",
			},

			"&::before": {
				content: '""',
				display: "inline-block",
				marginRight: "0.5rem",
			},
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	padding: 0.5rem 1rem;
	backgroundColor: #006cff;
	color: white;
	transition: background-color 0.2s;

	&:hover {
		backgroundColor: #0056cc;
	}

	&:active {
		backgroundColor: #004099;
	}

	&::before {
		content: "";
		display: inline-block;
		marginRight: 0.5rem;
	}
}`);
	});

	it("should handle selectors with variable references for consistent theming", () => {
		const buttonSelector = selector(".button", ({ variable }) => {
			const borderRadiusSm = variable("border-radius-sm", "4px");
			const colorPrimary = variable("color-primary", "#006cff");
			const colorPrimaryDark = variable("color-primary-dark", "#0056cc");
			const spacingMd = variable("spacing-md", "1rem");

			return {
				backgroundColor: ref(colorPrimary),
				borderRadius: ref(borderRadiusSm),
				color: "white",
				padding: ref(spacingMd),

				"&:hover": {
					backgroundColor: ref(colorPrimaryDark),
				},
			};
		});

		const result = consumeSelector(buttonSelector, options);

		expect(result).toBe(`.button {
	--border-radius-sm: 4px;
	--color-primary: #006cff;
	--color-primary-dark: #0056cc;
	--spacing-md: 1rem;

	backgroundColor: var(--color-primary);
	borderRadius: var(--border-radius-sm);
	color: white;
	padding: var(--spacing-md);

	&:hover {
		backgroundColor: var(--color-primary-dark);
	}
}`);
	});

	it("should handle selectors with media query nesting", () => {
		const cardSelector = selector(".card", {
			width: "100%",
			padding: "1rem",

			"@media (min-width: 768px)": {
				width: "50%",
				padding: "2rem",
			},
		});

		const result = consumeSelector(cardSelector, options);

		expect(result).toBe(`.card {
	width: 100%;
	padding: 1rem;

	@media (min-width: 768px) {
		width: 50%;
		padding: 2rem;
	}
}`);
	});

	it("should handle selectors with calc() expressions", () => {
		const spacingBase = variable("spacing-base", "8px");

		const containerSelector = selector(".container", {
			padding: "calc(2 * 1rem)",
			margin: css`calc(${ref(spacingBase)} * 2)`,
			width: "calc(100% - 2rem)",
		});

		const result = consumeSelector(containerSelector, options);

		expect(result).toBe(`.container {
	padding: calc(2 * 1rem);
	margin: calc(var(--spacing-base) * 2);
	width: calc(100% - 2rem);
}`);
	});
});
