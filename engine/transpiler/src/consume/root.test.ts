import type { Root, StyleframeOptions } from "@styleframe/core";
import {
	createRefFunction,
	createRoot,
	createSelectorFunction,
	createVariableFunction,
} from "@styleframe/core";
import { consume } from "./consume";
import { createRootConsumer } from "./root";

describe("createRootConsumer", () => {
	let root: Root;
	let variable: ReturnType<typeof createVariableFunction>;
	let ref: ReturnType<typeof createRefFunction>;
	let selector: ReturnType<typeof createSelectorFunction>;

	const consumeRoot = createRootConsumer(consume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		variable = createVariableFunction(root, root);
		ref = createRefFunction(root, root);
		selector = createSelectorFunction(root, root);
	});

	it("should handle empty root", () => {
		const result = consumeRoot(root, options);
		expect(result).toBe(":root {}");
	});

	it("should handle root with only variables", () => {
		variable("primary", "#0066ff");
		variable("secondary", "#ff6b6b");

		const result = consumeRoot(root, options);
		expect(result).toBe(
			":root {\n\t--primary: #0066ff;\n\t--secondary: #ff6b6b;\n}",
		);
	});

	it("should handle root with only declarations", () => {
		root.declarations = {
			fontSize: "16px",
			lineHeight: "1.5",
			fontFamily: "system-ui, sans-serif",
		};

		const result = consumeRoot(root, options);
		expect(result).toBe(
			":root {\n\tfontSize: 16px;\n\tlineHeight: 1.5;\n\tfontFamily: system-ui, sans-serif;\n}",
		);
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
		expect(result).toBe(
			":root {\n\n}\n\n.button {\n\tpadding: 0.5rem 1rem;\n\tborderRadius: 4px;\n}\n\n.card {\n\tboxShadow: 0 2px 4px rgba(0,0,0,0.1);\n}",
		);
	});

	it("should handle root with variables and declarations", () => {
		const colorVar = variable("text-color", "#333333");
		const sizeVar = variable("base-font-size", "16px");
		root.declarations = {
			color: ref(colorVar),
			fontSize: ref(sizeVar),
		};

		const result = consumeRoot(root, options);
		expect(result).toBe(
			":root {\n\t--text-color: #333333;\n\t--base-font-size: 16px;\n\n\tcolor: var(--text-color);\n\tfontSize: var(--base-font-size);\n}",
		);
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
		expect(result).toBe(
			":root {\n\t--primary: #0066ff;\n\t--danger: #ff0000;\n\n\n}\n\n.btn-primary {\n\tbackgroundColor: var(--primary);\n\tcolor: white;\n}\n\n.alert-danger {\n\tborderColor: var(--danger);\n\tcolor: var(--danger);\n}",
		);
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
		expect(result).toBe(
			":root {\n\tboxSizing: border-box;\n\tmargin: 0;\n\tpadding: 0;\n}\n\nbody {\n\tfontFamily: system-ui, -apple-system, sans-serif;\n\tlineHeight: 1.6;\n}\n\nh1, h2, h3 {\n\tmarginTop: 0;\n\tlineHeight: 1.2;\n}",
		);
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

		const expected =
			":root {\n\t--spacing-unit: 8px;\n\t--primary: #0066ff;\n\t--background: #ffffff;\n\n\t--global-padding: var(--spacing-unit);\n\tbackgroundColor: var(--background);\n\tcolor: #333;\n}\n\n.container {\n\tmaxWidth: 1200px;\n\tmargin: 0 auto;\n\tpadding: var(--spacing-unit);\n}\n\n.button {\n\tpadding: calc(var(--spacing-unit) * 2);\n\tbackgroundColor: var(--primary);\n\tborder: none;\n\tborderRadius: 4px;\n}";
		expect(result).toBe(expected);
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
			":root {\n\t--app-theme-color: #663399;\n\n\taccentColor: var(--app-theme-color);\n}",
		);
	});

	it("should handle custom indentation options", () => {
		const customIndentOptions: StyleframeOptions = {
			indent: "    ", // 4 spaces
		};
		const colorVar = variable("text", "#000000");
		root.declarations = {
			color: ref(colorVar),
		};

		const result = consumeRoot(root, customIndentOptions);

		expect(result).toBe(
			":root {\n    --text: #000000;\n\n    color: var(--text);\n}",
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

		const expected =
			':root {\n\t--elevation-1: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n\t--transition-default: all 0.3s cubic-bezier(.25,.8,.25,1);\n\t--font-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;\n}';
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

		const expected =
			":root {\n\n}\n\nnav {\n\tbackgroundColor: #f5f5f5;\n\tpadding: 1rem;\n\n\tul {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\n\t\tli {\n\t\t\tlistStyle: none;\n\t\t\tdisplay: inline-block;\n\t\t}\n\t}\n}";
		expect(result).toBe(expected);
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

		const expected =
			":root {\n\t--mobile-breakpoint: 768px;\n\n\n}\n\n@media (max-width: 768px) {\n\t.container {\n\t\tpadding: 1rem;\n\t\tmaxWidth: 100%;\n\t}\n}";
		expect(result).toBe(expected);
	});

	it("should handle undefined properties gracefully", () => {
		const emptyRoot = createRoot();
		const result = consumeRoot(emptyRoot, options);
		expect(result).toBe(":root {}");
	});

	it("should handle reference values with fallbacks", () => {
		const colorVar = variable("brand-color", "#0066ff");
		root.declarations = {
			color: ref("text-color", "#333"),
			backgroundColor: ref(colorVar),
			borderColor: ref("border-color", "currentColor"),
		};

		const result = consumeRoot(root, options);

		const expected =
			":root {\n\t--brand-color: #0066ff;\n\n\tcolor: var(--text-color, #333);\n\tbackgroundColor: var(--brand-color);\n\tborderColor: var(--border-color, currentColor);\n}";
		expect(result).toBe(expected);
	});

	it("should properly delegate to container consumer", () => {
		// This test verifies that createRootConsumer correctly uses createContainerConsumer
		const colorVar = variable("color", "blue");
		root.declarations = { display: "block" };

		const result = consumeRoot(root, options);

		// Should produce the same output as if we called consumeContainer with ":root"
		expect(result).toBe(":root {\n\t--color: blue;\n\n\tdisplay: block;\n}");
	});
});
