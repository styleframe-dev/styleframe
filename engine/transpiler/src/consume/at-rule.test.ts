import type { Root, StyleframeOptions } from "@styleframe/core";
import {
	createAtRuleFunction,
	createRefFunction,
	createRoot,
} from "@styleframe/core";
import { createAtRuleConsumer } from "./at-rule";
import { consume } from "./consume";

describe("createAtRuleConsumer", () => {
	let root: Root;
	let atRule: ReturnType<typeof createAtRuleFunction>;
	let ref: ReturnType<typeof createRefFunction>;

	const consumeAtRule = createAtRuleConsumer(consume);
	const options: StyleframeOptions = {};

	beforeEach(() => {
		root = createRoot();
		atRule = createAtRuleFunction(root, root);
		ref = createRefFunction(root, root);
	});

	it("should create a simple at-rule with no body", () => {
		const importRule = atRule("import", '"./styles.css"');

		const result = consumeAtRule(importRule, options);

		expect(result).toBe('@import "./styles.css";');
	});

	it("should create a media query with declarations", () => {
		const mediaRule = atRule("media", "(min-width: 768px)", {
			padding: "2rem",
			fontSize: "18px",
		});

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe(`@media (min-width: 768px) {
	padding: 2rem;
	fontSize: 18px;
}`);
	});

	it("should create an at-rule with variables", () => {
		const mediaRule = atRule("media", "(min-width: 768px)", ({ variable }) => {
			variable("breakpoint-padding", "2rem");

			return {
				padding: ref("breakpoint-padding"),
			};
		});

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe(`@media (min-width: 768px) {
	--breakpoint-padding: 2rem;

	padding: var(--breakpoint-padding);
}`);
	});

	it("should create an at-rule with nested selectors", () => {
		const mediaRule = atRule("media", "(min-width: 768px)", ({ selector }) => {
			selector(".card", {
				width: "50%",
				margin: "0 auto",
			});

			selector(".button", {
				padding: "1rem 2rem",
			});
		});

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe(`@media (min-width: 768px) {
	.card {
		width: 50%;
		margin: 0 auto;
	}

	.button {
		padding: 1rem 2rem;
	}
}`);
	});

	it("should create an at-rule with variables, declarations, and children", () => {
		const mediaRule = atRule(
			"media",
			"(min-width: 1024px)",
			({ variable, selector }) => {
				const spacingVar = variable("large-spacing", "3rem");

				selector(".container", {
					maxWidth: "1200px",
					padding: ref(spacingVar),
				});

				return {
					fontSize: "20px",
				};
			},
		);

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe(`@media (min-width: 1024px) {
	--large-spacing: 3rem;

	fontSize: 20px;

	.container {
		maxWidth: 1200px;
		padding: var(--large-spacing);
	}
}`);
	});

	it("should handle keyframes at-rule", () => {
		const keyframesRule = atRule("keyframes", "fadeIn", ({ selector }) => {
			selector("0%", {
				opacity: "0",
				transform: "translateY(20px)",
			});

			selector("100%", {
				opacity: "1",
				transform: "translateY(0)",
			});
		});

		const result = consumeAtRule(keyframesRule, options);

		expect(result).toBe(`@keyframes fadeIn {
	0% {
		opacity: 0;
		transform: translateY(20px);
	}

	100% {
		opacity: 1;
		transform: translateY(0);
	}
}`);
	});

	it("should handle supports at-rule", () => {
		const supportsRule = atRule(
			"supports",
			"(display: grid)",
			({ selector }) => {
				selector(".layout", {
					display: "grid",
					gridTemplateColumns: "repeat(3, 1fr)",
					gap: "1rem",
				});
			},
		);

		const result = consumeAtRule(supportsRule, options);

		expect(result).toBe(`@supports (display: grid) {
	.layout {
		display: grid;
		gridTemplateColumns: repeat(3, 1fr);
		gap: 1rem;
	}
}`);
	});

	it("should handle container queries", () => {
		const containerRule = atRule(
			"container",
			"(min-width: 400px)",
			({ selector }) => {
				selector(".card-content", {
					fontSize: "1.2rem",
					padding: "1.5rem",
				});
			},
		);

		const result = consumeAtRule(containerRule, options);

		expect(result).toBe(`@container (min-width: 400px) {
	.card-content {
		fontSize: 1.2rem;
		padding: 1.5rem;
	}
}`);
	});

	it("should handle nested at-rules", () => {
		const mediaRule = atRule("media", "(min-width: 768px)", ({ atRule }) => {
			atRule("supports", "(display: flex)", ({ selector }) => {
				selector(".flex-container", {
					display: "flex",
					alignItems: "center",
				});
			});
		});

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe(`@media (min-width: 768px) {
	@supports (display: flex) {
		.flex-container {
			display: flex;
			alignItems: center;
		}
	}
}`);
	});

	it("should handle empty at-rules with only the rule part", () => {
		const mediaRule = atRule("media", "(min-width: 768px)", {});

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe("@media (min-width: 768px) {}");
	});

	it("should handle at-rules with complex rule strings", () => {
		const mediaRule = atRule(
			"media",
			"screen and (min-width: 768px) and (max-width: 1024px)",
			{
				fontSize: "16px",
			},
		);

		const result = consumeAtRule(mediaRule, options);

		expect(result).toBe(
			`@media screen and (min-width: 768px) and (max-width: 1024px) {
	fontSize: 16px;
}`,
		);
	});

	it("should respect variable prefix in options", () => {
		const prefixOptions: StyleframeOptions = {
			variables: {
				name: ({ name }) => `--sf-${name}`,
			},
		};

		const mediaRule = atRule("media", "(min-width: 768px)", ({ variable }) => {
			variable("responsive-padding", "2rem");

			return {
				padding: ref("responsive-padding"),
			};
		});

		const result = consumeAtRule(mediaRule, prefixOptions);

		expect(result).toBe(`@media (min-width: 768px) {
	--sf-responsive-padding: 2rem;

	padding: var(--sf-responsive-padding);
}`);
	});

	it("should handle at-rules with custom indentation", () => {
		const customOptions: StyleframeOptions = {
			indent: "    ", // 4 spaces instead of default 2
		};

		const mediaRule = atRule("media", "(min-width: 768px)", {
			padding: "2rem",
			fontSize: "18px",
		});

		const result = consumeAtRule(mediaRule, customOptions);

		expect(result).toBe(`@media (min-width: 768px) {
    padding: 2rem;
    fontSize: 18px;
}`);
	});

	it("should handle page at-rules", () => {
		const pageRule = atRule("page", ":first", {
			marginTop: "50mm",
		});

		const result = consumeAtRule(pageRule, options);

		expect(result).toBe(`@page :first {
	marginTop: 50mm;
}`);
	});

	it("should handle font-face at-rules", () => {
		const fontFaceRule = atRule("font-face", "", {
			fontFamily: '"MyFont"',
			src: 'url("myfont.woff2") format("woff2")',
			fontWeight: "normal",
			fontStyle: "normal",
		});

		const result = consumeAtRule(fontFaceRule, options);

		expect(result).toBe(`@font-face  {
	fontFamily: "MyFont";
	src: url("myfont.woff2") format("woff2");
	fontWeight: normal;
	fontStyle: normal;
}`);
	});

	it("should handle layer at-rules", () => {
		const layerRule = atRule("layer", "utilities", ({ selector }) => {
			selector(".text-center", {
				textAlign: "center",
			});

			selector(".hidden", {
				display: "none",
			});
		});

		const result = consumeAtRule(layerRule, options);

		expect(result).toBe(`@layer utilities {
	.text-center {
		textAlign: center;
	}

	.hidden {
		display: none;
	}
}`);
	});
});
