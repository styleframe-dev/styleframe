import type { Root, StyleframeOptions } from "@styleframe/core";
import {
	createRefFunction,
	createRoot,
	createSelectorFunction,
	createVariableFunction,
} from "@styleframe/core";
import { consumeCSS } from "./consume";
import { createRootConsumer } from "./root";

describe("createRootConsumer", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;
	let selector: ReturnType<typeof createSelectorFunction>;

	const consumeRoot = createRootConsumer(consumeCSS);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
		selector = createSelectorFunction(root, root);
	});

	it("should handle empty root", () => {
		const result = consumeRoot(root, options);
		expect(result).toBe("");
	});

	it("should handle root with only variables", () => {
		variable("primary", "#0066ff");
		variable("secondary", "#ff6b6b");

		const result = consumeRoot(root, options);
		expect(result).toBe(`:root {
\t--primary: #0066ff;
\t--secondary: #ff6b6b;
}`);
	});

	it("should handle root with only declarations", () => {
		root.declarations = {
			fontSize: "16px",
			lineHeight: "1.5",
			fontFamily: "system-ui, sans-serif",
		};

		const result = consumeRoot(root, options);
		expect(result).toBe(`:root {
\tfont-size: 16px;
\tline-height: 1.5;
\tfont-family: system-ui, sans-serif;
}`);
	});

	it("should handle root with only children", () => {
		selector(".button", {
			padding: "0.5rem 1rem",
			borderRadius: "4px",
		});
		selector(".card", {
			boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
		});

		const result = consumeRoot(root, options);
		expect(result).toBe(`.button {
\tpadding: 0.5rem 1rem;
\tborder-radius: 4px;
}

.card {
\tbox-shadow: 0 2px 4px rgba(0,0,0,0.1);
}`);
	});

	it("should handle root with variables and declarations", () => {
		const colorVar = variable("text-color", "#333333");
		const sizeVar = variable("base-font-size", "16px");
		root.declarations = {
			color: ref(colorVar),
			fontSize: ref(sizeVar),
		};

		const result = consumeRoot(root, options);
		expect(result).toBe(`:root {
\t--text-color: #333333;
\t--base-font-size: 16px;
\t
\tcolor: var(--text-color);
\tfont-size: var(--base-font-size);
}`);
	});

	it("should handle root with variables and children", () => {
		const primaryVar = variable("primary", "#0066ff");
		const dangerVar = variable("danger", "#ff0000");
		selector(".btn-primary", {
			backgroundColor: ref(primaryVar),
			color: "white",
		});
		selector(".alert-danger", {
			borderColor: ref(dangerVar),
			color: ref(dangerVar),
		});

		const result = consumeRoot(root, options);
		expect(result).toBe(`:root {
\t--primary: #0066ff;
\t--danger: #ff0000;
}

.btn-primary {
\tbackground-color: var(--primary);
\tcolor: white;
}

.alert-danger {
\tborder-color: var(--danger);
\tcolor: var(--danger);
}`);
	});

	it("should handle root with declarations and children", () => {
		root.declarations = {
			boxSizing: "border-box",
			margin: "0",
			padding: "0",
		};
		selector("body", {
			fontFamily: "system-ui, -apple-system, sans-serif",
			lineHeight: "1.6",
		});
		selector("h1, h2, h3", {
			marginTop: "0",
			lineHeight: "1.2",
		});

		const result = consumeRoot(root, options);
		expect(result).toBe(`:root {
\tbox-sizing: border-box;
\tmargin: 0;
\tpadding: 0;
}

body {
\tfont-family: system-ui, -apple-system, sans-serif;
\tline-height: 1.6;
}

h1, h2, h3 {
\tmargin-top: 0;
\tline-height: 1.2;
}`);
	});

	it("should handle root with variables, declarations, and children", () => {
		const spacingVar = variable("spacing-unit", "8px");
		const primaryVar = variable("primary", "#0066ff");
		const bgVar = variable("background", "#ffffff");

		root.declarations = {
			"--global-padding": ref(spacingVar),
			backgroundColor: ref(bgVar),
			color: "#333",
		};

		selector(".container", {
			maxWidth: "1200px",
			margin: "0 auto",
			padding: ref(spacingVar),
		});

		selector(".button", {
			padding: "calc(var(--spacing-unit) * 2)",
			backgroundColor: ref(primaryVar),
			border: "none",
			borderRadius: "4px",
		});

		const result = consumeRoot(root, options);

		expect(result).toBe(`:root {
\t--spacing-unit: 8px;
\t--primary: #0066ff;
\t--background: #ffffff;
\t
\t--global-padding: var(--spacing-unit);
\tbackground-color: var(--background);
\tcolor: #333;
}

.container {
\tmax-width: 1200px;
\tmargin: 0 auto;
\tpadding: var(--spacing-unit);
}

.button {
\tpadding: calc(var(--spacing-unit) * 2);
\tbackground-color: var(--primary);
\tborder: none;
\tborder-radius: 4px;
}`);
	});

	it("should handle custom options with variable prefix", () => {
		const customOptions: StyleframeOptions = {
			variables: {
				name: ({ name }) => `--app-${name}`,
			},
		};
		const themeVar = variable("theme-color", "#663399");
		root.declarations = {
			accentColor: ref(themeVar),
		};

		const result = consumeRoot(root, customOptions);

		expect(result).toBe(
			`:root {
\t--app-theme-color: #663399;
\t
\taccent-color: var(--app-theme-color);
}`,
		);
	});

	it("should handle complex variable values", () => {
		variable(
			"elevation-1",
			"0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
		);
		variable("transition-default", "all 0.3s cubic-bezier(.25,.8,.25,1)");
		variable(
			"font-stack",
			'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
		);

		const result = consumeRoot(root, options);

		const expected = `:root {
\t--elevation-1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
\t--transition-default: all 0.3s cubic-bezier(.25,.8,.25,1);
\t--font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}`;
		expect(result).toBe(expected);
	});

	it("should handle nested selectors in children", () => {
		selector("nav", ({ selector }) => {
			selector("ul", ({ selector }) => {
				selector("li", {
					listStyle: "none",
					display: "inline-block",
				});

				return {
					margin: "0",
					padding: "0",
				};
			});

			return {
				backgroundColor: "#f5f5f5",
				padding: "1rem",
			};
		});

		const result = consumeRoot(root, options);

		expect(result).toBe(`nav {
\tbackground-color: #f5f5f5;
\tpadding: 1rem;
\t
\tul {
\t\tmargin: 0;
\t\tpadding: 0;
\t\t
\t\tli {
\t\t\tlist-style: none;
\t\t\tdisplay: inline-block;
\t\t}
\t}
}`);
	});

	it("should handle media queries as children", () => {
		variable("mobile-breakpoint", "768px");
		selector("@media (max-width: 768px)", ({ selector }) => {
			selector(".container", {
				padding: "1rem",
				maxWidth: "100%",
			});

			return {};
		});

		const result = consumeRoot(root, options);

		expect(result).toBe(`:root {
\t--mobile-breakpoint: 768px;
}

@media (max-width: 768px) {
\t.container {
\t\tpadding: 1rem;
\t\tmax-width: 100%;
\t}
}`);
	});

	it("should handle undefined properties gracefully", () => {
		const emptyRoot = createRoot();
		const result = consumeRoot(emptyRoot, options);
		expect(result).toBe("");
	});

	it("should handle reference values with fallbacks", () => {
		const colorVar = variable("brand-color", "#0066ff");
		root.declarations = {
			color: ref("text-color", "#333"),
			backgroundColor: ref(colorVar),
			borderColor: ref("border-color", "currentColor"),
		};

		const result = consumeRoot(root, options);

		expect(result).toBe(`:root {
\t--brand-color: #0066ff;
\t
\tcolor: var(--text-color, #333);
\tbackground-color: var(--brand-color);
\tborder-color: var(--border-color, currentColor);
}`);
	});

	it("should properly delegate to container consumer", () => {
		// This test verifies that createRootConsumer correctly uses createContainerConsumer
		const colorVar = variable("color", "blue");
		root.declarations = { display: "block" };

		const result = consumeRoot(root, options);

		// Should produce the same output as if we called consumeContainer with ":root"
		expect(result).toBe(`:root {
\t--color: blue;
\t
\tdisplay: block;
}`);
	});
});
