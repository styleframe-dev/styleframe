import { styleframe } from "../styleframe";
import { isMedia, isSelector } from "../typeGuards";
import type { Root, Selector } from "../types";
import { createRoot } from "./root";
import { createSelectorFunction } from "./selector";

describe("createSelectorFunction", () => {
	let root: Root;
	let selector: ReturnType<typeof createSelectorFunction>;

	beforeEach(() => {
		root = createRoot();
		selector = createSelectorFunction(root, root);
	});

	describe("basic selector creation", () => {
		it("should create a selector with correct properties", () => {
			const result = selector(".button", {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
				color: "white",
			});

			expect(result).toEqual({
				type: "selector",
				query: ".button",
				declarations: {
					padding: "0.5rem 1rem",
					backgroundColor: "#006cff",
					color: "white",
				},
				children: [],
			});
		});

		it("should add selector to root children", () => {
			const result = selector(".card", {
				padding: "1rem",
				borderRadius: "8px",
			});

			expect(root.children).toHaveLength(1);
			expect(root.children[0]).toBe(result);
		});

		it("should handle different selector types", () => {
			// Class selector
			const classSelector = selector(".button", { color: "blue" });
			// ID selector
			const idSelector = selector("#header", { fontSize: "2rem" });
			// Element selector
			const elementSelector = selector("p", { lineHeight: "1.5" });
			// Attribute selector
			const attributeSelector = selector('[data-theme="dark"]', {
				background: "black",
			});

			expect(classSelector.query).toBe(".button");
			expect(idSelector.query).toBe("#header");
			expect(elementSelector.query).toBe("p");
			expect(attributeSelector.query).toBe('[data-theme="dark"]');
			expect(root.children).toHaveLength(4);
		});
	});

	describe("inline nesting", () => {
		it("should handle pseudo-class nesting with &", () => {
			const result = selector(".button", {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
				"&:hover": {
					backgroundColor: "#0056cc",
				},
				"&:active": {
					backgroundColor: "#004099",
				},
			});

			// The nested selectors should be removed from main declarations
			expect(result.declarations).not.toHaveProperty("&:hover");
			expect(result.declarations).not.toHaveProperty("&:active");
			expect(result.declarations).toEqual({
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
			});

			// Should have nested selectors in the selector's children
			expect(result.children).toHaveLength(2); // 2 nested selectors

			// Check that nested selectors were created
			const hoverSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === "&:hover");
			const activeSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === "&:active");

			expect(hoverSelector).toBeDefined();
			expect(activeSelector).toBeDefined();
			expect(hoverSelector?.declarations).toEqual({
				backgroundColor: "#0056cc",
			});
			expect(activeSelector?.declarations).toEqual({
				backgroundColor: "#004099",
			});
		});

		it("should handle pseudo-element nesting", () => {
			const result = selector(".button", {
				position: "relative",
				"&::before": {
					content: '""',
					display: "inline-block",
					marginRight: "0.5rem",
				},
			});

			expect(result.declarations).not.toHaveProperty("&::before");
			expect(result.declarations).toEqual({ position: "relative" });
			expect(result.children).toHaveLength(1); // 1 nested selector

			const beforeSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === "&::before");
			expect(beforeSelector?.declarations).toEqual({
				content: '""',
				display: "inline-block",
				marginRight: "0.5rem",
			});
		});

		it("should handle child selector nesting", () => {
			const result = selector(".card", {
				padding: "1rem",
				borderRadius: "8px",
				".card-title": {
					fontSize: "1.5rem",
					fontWeight: "bold",
				},
				".card-content": {
					marginTop: "0.5rem",
				},
			});

			expect(result.declarations).not.toHaveProperty(".card-title");
			expect(result.declarations).not.toHaveProperty(".card-content");
			expect(result.declarations).toEqual({
				padding: "1rem",
				borderRadius: "8px",
			});
			expect(result.children).toHaveLength(2); // 2 nested selectors

			const titleSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === ".card-title");
			const contentSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === ".card-content");

			expect(titleSelector?.declarations).toEqual({
				fontSize: "1.5rem",
				fontWeight: "bold",
			});
			expect(contentSelector?.declarations).toEqual({
				marginTop: "0.5rem",
			});
		});

		it("should handle complex nested selectors", () => {
			const result = selector(".navigation", {
				display: "flex",
				"& > li": {
					listStyle: "none",
				},
				"& a:not(.active)": {
					color: "gray",
				},
				'&[aria-expanded="true"]': {
					backgroundColor: "lightblue",
				},
			});

			expect(result.children).toHaveLength(3); // 3 nested selectors
			expect(result.declarations).toEqual({ display: "flex" });
		});
	});

	describe("callback nesting", () => {
		it("should execute callback with proper context", () => {
			const callback = vi.fn();

			selector(
				".card",
				{
					padding: "1rem",
				},
				callback,
			);

			expect(callback).toHaveBeenCalledTimes(1);
			expect(callback).toHaveBeenCalledWith({
				variable: expect.any(Function),
				selector: expect.any(Function),
				keyframes: expect.any(Function),
				media: expect.any(Function),
			});
		});

		it("should create nested selectors via callback", () => {
			const result = selector(
				".card",
				{
					padding: "1rem",
					borderRadius: "8px",
				},
				({ selector: nestedSelector }) => {
					nestedSelector(".card-title", {
						fontSize: "1.5rem",
						fontWeight: "bold",
					});

					nestedSelector(".card-content", {
						marginTop: "0.5rem",
					});
				},
			);

			// Should have nested selectors
			expect(result.children).toHaveLength(2); // 2 nested selectors created via callback

			const titleSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === ".card-title");
			const contentSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === ".card-content");

			expect(titleSelector?.declarations).toEqual({
				fontSize: "1.5rem",
				fontWeight: "bold",
			});
			expect(contentSelector?.declarations).toEqual({
				marginTop: "0.5rem",
			});
		});

		it("should allow creating variables in callback", () => {
			const callback = vi.fn(({ variable }) => {
				const color = variable("card-color", "#ffffff");
				expect(color.name).toBe("card-color");
			});

			selector(".card", { padding: "1rem" }, callback);

			expect(callback).toHaveBeenCalled();
		});

		it("should handle deeply nested selectors", () => {
			const result = selector(
				".menu",
				{
					display: "block",
				},
				({ selector: nestedSelector }) => {
					nestedSelector(
						".menu-item",
						{
							padding: "0.5rem",
						},
						({ selector: deepNested }) => {
							deepNested(".menu-link", {
								textDecoration: "none",
							});
						},
					);
				},
			);

			// Check that deep nesting is properly handled
			expect(result.children).toHaveLength(1);

			const menuItem = result.children[0] as Selector;
			expect(menuItem.query).toBe(".menu-item");
			expect(menuItem.children).toHaveLength(1);

			const menuLink = menuItem.children[0] as Selector;
			expect(menuLink.query).toBe(".menu-link");
			expect(menuLink.declarations).toEqual({
				textDecoration: "none",
			});
		});
	});

	describe("mixed nesting approaches", () => {
		it("should handle both inline and callback nesting together", () => {
			const result = selector(
				".component",
				{
					display: "flex",
					"&:hover": {
						opacity: 0.8,
					},
				},
				({ selector: nestedSelector }) => {
					nestedSelector(".component-header", {
						fontWeight: "bold",
					});
				},
			);

			expect(result.children).toHaveLength(2); // inline nested + callback nested
			expect(result.declarations).toEqual({ display: "flex" });

			const hoverSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === "&:hover");
			const headerSelector = result.children
				.filter(isSelector)
				.find((child) => child.query === ".component-header");

			expect(hoverSelector?.declarations).toEqual({ opacity: 0.8 });
			expect(headerSelector?.declarations).toEqual({ fontWeight: "bold" });
		});
	});

	describe("media queries", () => {
		it("should handle media query parsing", () => {
			// This test is for future implementation
			const result = selector(".responsive", {
				width: "100%",
				"@media (min-width: 768px)": {
					width: "50%",
				},
			});

			expect(result.declarations).not.toHaveProperty(
				"@media (min-width: 768px)",
			);
			expect(result.declarations).toEqual({
				width: "100%",
			});
			expect(result.children).toHaveLength(1); // 1 media query selector

			const mediaQuerySelector = result.children
				.filter(isMedia)
				.find((child) => child.query === "(min-width: 768px)");
			expect(mediaQuerySelector?.declarations).toEqual({
				width: "50%",
			});
		});
	});

	describe("working with nested selectors as root", () => {
		it("should work when root is a selector", () => {
			const parentSelectorInstance: Selector = {
				type: "selector",
				query: ".parent",
				declarations: {},
				children: [],
			};

			const nestedSelectorFn = createSelectorFunction(
				parentSelectorInstance,
				root,
			);
			const result = nestedSelectorFn(".child", {
				color: "blue",
			});

			expect(result.query).toBe(".child");
			expect(parentSelectorInstance.children).toHaveLength(1);
			expect(parentSelectorInstance.children[0]).toBe(result);
		});
	});

	describe("integration with styleframe", () => {
		it("should work with styleframe instance", () => {
			const s = styleframe();

			const button = s.selector(".button", {
				padding: "0.5rem 1rem",
				backgroundColor: "#006cff",
			});

			const card = s.selector(".card", {
				borderRadius: "8px",
			});

			expect(button.query).toBe(".button");
			expect(card.query).toBe(".card");
		});

		it("should work with variables from styleframe", () => {
			const s = styleframe();

			// This would need the ref function to be implemented
			// const primaryColor = s.variable('primary', '#006cff');
			// const button = s.selector('.button', {
			//     backgroundColor: s.ref(primaryColor)
			// });
		});
	});

	describe("edge cases", () => {
		it("should handle empty declarations", () => {
			const result = selector(".empty", {});

			expect(result.declarations).toEqual({});
			expect(result.children).toHaveLength(0);
		});

		it("should handle complex selector strings", () => {
			const complexSelector =
				"div.container > .item:nth-child(2n+1):not(.disabled)";
			const result = selector(complexSelector, {
				display: "block",
			});

			expect(result.query).toBe(complexSelector);
		});

		it("should preserve declaration order", () => {
			const result = selector(".ordered", {
				a: "1",
				b: "2",
				c: "3",
				d: "4",
			});

			const keys = Object.keys(result.declarations);
			expect(keys).toEqual(["a", "b", "c", "d"]);
		});
	});
});
