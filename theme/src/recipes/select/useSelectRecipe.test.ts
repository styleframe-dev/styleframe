import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useFocusWithinModifier,
	useHoverModifier,
} from "../../modifiers/usePseudoStateModifiers";
import { useSelectRecipe } from "./useSelectRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"flexWrap",
		"gap",
		"fontFamily",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"background",
		"color",
		"cursor",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	s.variable("color.text-weakest", "#64748B", { default: true });
	s.variable("color.primary", "#006cff", { default: true });
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusWithinModifier(s);
	return s;
}

describe("useSelectRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSelectRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("select");
	});

	it("should have wrapping, clickable base styles with a focus-within ring", () => {
		const s = createInstance();
		const recipe = useSelectRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			flexWrap: "wrap",
			gap: "@0.375",
			cursor: "pointer",
			"&:focus-within": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "2px",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have the input-style variant axis (solid, soft, ghost)", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"ghost",
			]);
		});

		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have invalid, disabled, and readonly boolean variants", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			expect(recipe.variants!.invalid).toEqual({ true: {}, false: {} });
			expect(recipe.variants!.disabled).toEqual({ true: {}, false: {} });
			expect(recipe.variants!.readonly).toEqual({ true: {}, false: {} });
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSelectRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			invalid: "false",
			disabled: "false",
			readonly: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 12 compound variants total", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			// 3 colors × 3 variants = 9, plus 3 standalone (invalid, readonly, disabled)
			expect(recipe.compoundVariants).toHaveLength(12);
		});

		it("should have a neutral solid compound with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral" && v.match.variant === "solid",
			);

			expect(cv).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-200",
					color: "@color.text",
					"&:hover": { borderColor: "@color.gray-300" },
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-700",
						color: "@color.white",
					},
					"&:dark:hover": { borderColor: "@color.gray-600" },
				},
			});
		});

		it("should have an invalid compound overriding the focus ring color", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.invalid === "true",
			);

			expect(cv?.css).toMatchObject({
				borderColor: "@color.error",
				"&:focus-within": { outlineColor: "@color.error" },
			});
		});

		it("should have a disabled compound that blocks interaction", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.disabled === "true",
			);

			expect(cv).toEqual({
				match: { disabled: "true" },
				css: {
					opacity: "0.5",
					cursor: "not-allowed",
					pointerEvents: "none",
				},
			});
		});
	});

	describe("setup callback", () => {
		it("should register .select-value, .select-icon, and .select.-open selectors", () => {
			const s = createInstance();
			useSelectRecipe(s);

			const queries = s.root.children
				.filter((child) => child.type === "selector")
				.map((child) => (child as { query: string }).query);

			expect(queries).toContain(".select-value");
			expect(queries).toContain(".select-icon");
			expect(queries).toContain(".select.-open");
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s, { base: { display: "flex" } });

			expect(recipe.base!.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune color-scoped compounds", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s, { filter: { color: ["neutral"] } });

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(
				recipe.compoundVariants!.every(
					(cv) => cv.match.color === undefined || cv.match.color === "neutral",
				),
			).toBe(true);
			expect(recipe.compoundVariants!.length).toBeLessThan(12);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSelectRecipe(s, { filter: { color: ["light"] } });

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
		});
	});
});
