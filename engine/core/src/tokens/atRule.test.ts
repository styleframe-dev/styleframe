import { beforeEach, describe, expect, it } from "vitest";
import type { AtRule, Root, Selector } from "../types";
import { createAtRuleFunction, createMediaFunction } from "./atRule";
import { createRoot } from "./root";
import { createVariableFunction } from "./variable";

describe("createMediaFunction", () => {
	let root: Root;
	let selector: Selector;
	let media: ReturnType<typeof createMediaFunction>;
	let variable: ReturnType<typeof createVariableFunction>;

	beforeEach(() => {
		root = createRoot();
		selector = {
			type: "selector",
			query: ".test",
			variables: [],
			declarations: {},
			children: [],
		};
		media = createMediaFunction(selector, root);
		variable = createVariableFunction(root, root);
	});

	describe("basic media query creation", () => {
		it("should create a media query with callback only", () => {
			const result = media("(min-width: 768px)", ({ selector }) => {
				selector(".container", {
					width: "750px",
				});
			});

			expect(result).toEqual({
				type: "at-rule",
				identifier: "media",
				rule: "(min-width: 768px)",
				variables: [],
				declarations: {},
				children: [
					{
						type: "selector",
						query: ".container",
						variables: [],
						declarations: {
							width: "750px",
						},
						children: [],
					},
				],
			});
		});

		it("should create a media query with declarations and callback", () => {
			const result = media("(min-width: 768px)", ({ selector }) => {
				selector(".text", {
					lineHeight: "1.4",
				});

				return {
					fontSize: "18px",
				};
			});

			expect(result.type).toBe("at-rule");
			expect(result.identifier).toBe("media");
			expect(result.rule).toBe("(min-width: 768px)");
			expect(result.declarations).toEqual({
				fontSize: "18px",
			});
			expect(result.children).toHaveLength(1);
			expect(result.children[0]).toEqual({
				type: "selector",
				query: ".text",
				variables: [],
				declarations: {
					lineHeight: "1.4",
				},
				children: [],
			});
		});

		it("should create a media query with declarations only", () => {
			const result = media("(max-width: 767px)", {
				fontSize: "14px",
				padding: "0.5rem",
			});

			expect(result).toEqual({
				type: "at-rule",
				identifier: "media",
				rule: "(max-width: 767px)",
				variables: [],
				declarations: {
					fontSize: "14px",
					padding: "0.5rem",
				},
				children: [],
			});
		});

		it("should add media query to context children", () => {
			const initialChildrenLength = selector.children.length;

			media("(min-width: 1024px)", {
				width: "980px",
			});

			expect(selector.children).toHaveLength(initialChildrenLength + 1);

			const lastChild = selector.children[
				selector.children.length - 1
			] as AtRule;
			expect(lastChild.type).toBe("at-rule");
		});
	});

	describe("context parameter handling", () => {
		it("should work with root context", () => {
			const mediaWithRootContext = createMediaFunction(root, root);

			const result = mediaWithRootContext(
				"(min-width: 768px)",
				({ selector }) => {
					selector(".root-selector", {
						margin: "0 auto",
					});
				},
			);

			expect(result.children[0]).toEqual({
				type: "selector",
				query: ".root-selector",
				variables: [],
				declarations: {
					margin: "0 auto",
				},
				children: [],
			});
		});

		it("should work with selector context", () => {
			const mediaWithSelectorContext = createMediaFunction(selector, root);

			const result = mediaWithSelectorContext("(min-width: 768px)", {
				padding: "2rem",
			});

			expect(result.declarations).toEqual({
				padding: "2rem",
			});
		});
	});

	describe("callback context functions", () => {
		it("should provide variable function in context", () => {
			media("(min-width: 768px)", ({ variable }) => {
				const testVar = variable("test-media-var", "2rem");
				expect(testVar.name).toBe("test-media-var");
				expect(testVar.value).toBe("2rem");
			});
		});

		it("should provide selector function in context", () => {
			const result = media("(min-width: 768px)", ({ selector }) => {
				selector(".media-selector", {
					display: "block",
				});
			});

			expect(result.children[0]).toEqual({
				type: "selector",
				query: ".media-selector",
				variables: [],
				declarations: {
					display: "block",
				},
				children: [],
			});
		});

		it("should provide nested media function in context", () => {
			const result = media("(min-width: 768px)", ({ media }) => {
				media("(orientation: landscape)", {
					width: "100vw",
				});
			});

			expect(result.children[0]).toEqual({
				type: "at-rule",
				identifier: "media",
				rule: "(orientation: landscape)",
				variables: [],
				declarations: {
					width: "100vw",
				},
				children: [],
			});
		});

		it("should allow chaining multiple context functions", () => {
			const result = media("(min-width: 768px)", ({ variable, selector }) => {
				const spacing = variable("media-spacing", "2rem");

				selector(".spaced", {
					margin: spacing.value as string,
				});
			});

			expect(result.children).toHaveLength(1); // selector
			expect(result.variables).toHaveLength(1); // variable
		});
	});

	describe("media query strings", () => {
		it("should handle simple min-width queries", () => {
			const result = media("(min-width: 768px)", {});

			expect(result.rule).toBe("(min-width: 768px)");
		});

		it("should handle complex media queries", () => {
			const complexQuery =
				"(min-width: 768px) and (max-width: 1023px) and (orientation: landscape)";
			const result = media(complexQuery, {});

			expect(result.rule).toBe(complexQuery);
		});

		it("should handle feature queries", () => {
			const result = media("(prefers-color-scheme: dark)", {
				backgroundColor: "#1a1a1a",
			});

			expect(result.rule).toBe("(prefers-color-scheme: dark)");
			expect(result.declarations.backgroundColor).toBe("#1a1a1a");
		});

		it("should handle resolution queries", () => {
			const result = media(
				"(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
				{
					backgroundImage: 'url("image@2x.png")',
				},
			);

			expect(result.rule).toBe(
				"(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)",
			);
		});

		it("should handle empty query string", () => {
			const result = media("", {
				display: "none",
			});

			expect(result.rule).toBe("");
		});
	});

	describe("nested media queries", () => {
		it("should support nesting media queries", () => {
			const result = media("(min-width: 768px)", ({ media }) => {
				media("(orientation: portrait)", {
					width: "100%",
				});
			});

			expect(result.children[0]).toEqual({
				type: "at-rule",
				identifier: "media",
				rule: "(orientation: portrait)",
				variables: [],
				declarations: {
					width: "100%",
				},
				children: [],
			});
		});

		it("should support deep nesting", () => {
			const result = media("(min-width: 768px)", ({ media }) => {
				media("(max-width: 1023px)", ({ selector }) => {
					selector(".nested-selector", {
						padding: "1rem",
					});
				});
			});

			const nestedMedia = result.children[0] as AtRule;
			expect(nestedMedia.type).toBe("at-rule");
			expect(nestedMedia.identifier).toBe("media");
			expect(nestedMedia.rule).toBe("(max-width: 1023px)");
			expect(nestedMedia.children[0]).toEqual({
				type: "selector",
				query: ".nested-selector",
				variables: [],
				declarations: {
					padding: "1rem",
				},
				children: [],
			});
		});
	});

	describe("declarations handling", () => {
		it("should handle empty declarations", () => {
			const result = media("(min-width: 768px)", {});

			expect(result.declarations).toEqual({});
		});

		it("should handle single declaration", () => {
			const result = media("(min-width: 768px)", {
				width: "750px",
			});

			expect(result.declarations).toEqual({
				width: "750px",
			});
		});

		it("should handle multiple declarations", () => {
			const result = media("(min-width: 768px)", {
				width: "750px",
				margin: "0 auto",
				padding: "2rem",
			});

			expect(result.declarations).toEqual({
				width: "750px",
				margin: "0 auto",
				padding: "2rem",
			});
		});

		it("should handle CSS custom properties", () => {
			const result = media("(min-width: 768px)", {
				"--primary-color": "#006cff",
				"--spacing": "2rem",
			});

			expect(result.declarations).toEqual({
				"--primary-color": "#006cff",
				"--spacing": "2rem",
			});
		});
	});

	describe("real-world usage patterns", () => {
		it("should support responsive typography", () => {
			const result = media("(min-width: 768px)", ({ selector }) => {
				selector(".responsive-text", {
					fontSize: "18px",
					lineHeight: "1.4",
				});
			});

			expect(result.children[0]).toEqual({
				type: "selector",
				query: ".responsive-text",
				variables: [],
				declarations: {
					fontSize: "18px",
					lineHeight: "1.4",
				},
				children: [],
			});
		});

		it("should support responsive grid layouts", () => {
			const result = media("(min-width: 1024px)", ({ selector }) => {
				selector(".grid", {
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: "2rem",
				});
			});

			expect(result.children[0]).toEqual({
				type: "selector",
				query: ".grid",
				variables: [],
				declarations: {
					gridTemplateColumns: "repeat(4, 1fr)",
					gap: "2rem",
				},
				children: [],
			});
		});

		it("should support breakpoint variables", () => {
			const breakpointMd = variable("breakpoint-md", "768px");

			const result = media(
				`(min-width: ${breakpointMd.value})`,
				({ selector, variable }) => {
					const spacing = variable("tablet-spacing", "1.5rem");
					selector(".responsive-container", {
						padding: spacing.value as string,
					});
				},
			);

			expect(result.children).toHaveLength(1); // selector
			expect(result.variables).toHaveLength(1); // variable
		});

		it("should support dark mode queries", () => {
			const result = media("(prefers-color-scheme: dark)", ({ selector }) => {
				selector(".theme-aware", {
					backgroundColor: "#1a1a1a",
					color: "#ffffff",
				});
			});

			expect(result.rule).toBe("(prefers-color-scheme: dark)");
		});

		it("should support reduced motion queries", () => {
			const result = media(
				"(prefers-reduced-motion: reduce)",
				({ selector }) => {
					selector(".animated", {
						animation: "none",
						transition: "none",
					});
				},
			);

			expect(result.rule).toBe("(prefers-reduced-motion: reduce)");
		});
	});

	describe("function overloading", () => {
		it("should distinguish between callback and declarations as second parameter", () => {
			const callbackResult = media("(min-width: 768px)", ({ selector }) => {
				selector(".callback-test", { width: "100%" });
			});

			const declarationsResult = media("(min-width: 768px)", {
				width: "750px",
			});

			expect(callbackResult.declarations).toEqual({});
			expect(callbackResult.children).toHaveLength(1);

			expect(declarationsResult.declarations).toEqual({ width: "750px" });
			expect(declarationsResult.children).toHaveLength(0);
		});

		it("should handle three-parameter form correctly", () => {
			const result = media("(min-width: 768px)", ({ selector }) => {
				selector(".three-param-test", {
					lineHeight: "1.4",
				});

				return {
					fontSize: "18px",
				};
			});

			expect(result.declarations).toEqual({ fontSize: "18px" });
			expect(result.children).toHaveLength(1);
		});
	});

	describe("edge cases", () => {
		it("should handle multiple media queries with same query string", () => {
			const result1 = media("(min-width: 768px)", { width: "750px" });
			const result2 = media("(min-width: 768px)", { height: "100vh" });

			expect(result1).not.toBe(result2);
			expect(result1.rule).toBe(result2.rule);
			expect(result1.declarations).not.toEqual(result2.declarations);
		});

		it("should maintain proper structure with empty callback", () => {
			const result = media("(min-width: 768px)", () => {
				// Empty callback
			});

			expect(result).toEqual({
				type: "at-rule",
				identifier: "media",
				rule: "(min-width: 768px)",
				variables: [],
				declarations: {},
				children: [],
			});
		});

		it("should handle special characters in media queries", () => {
			const complexQuery =
				"screen and (min-width: 768px) and (max-width: 1023.98px)";
			const result = media(complexQuery, {});

			expect(result.rule).toBe(complexQuery);
		});
	});

	describe("function context independence", () => {
		it("should create independent functions for different contexts", () => {
			const context1 = createRoot();
			const context2: Selector = {
				type: "selector",
				query: ".different",
				variables: [],
				declarations: {},
				children: [],
			};

			const media1 = createMediaFunction(context1, root);
			const media2 = createMediaFunction(context2, root);

			const result1 = media1("(min-width: 768px)", { width: "100%" });
			const result2 = media2("(min-width: 768px)", { width: "750px" });

			expect(media1).not.toBe(media2);
			expect(result1.declarations).not.toEqual(result2.declarations);
		});
	});
});
