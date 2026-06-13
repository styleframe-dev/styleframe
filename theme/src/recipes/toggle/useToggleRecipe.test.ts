import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useDisabledModifier } from "../../modifiers/useFormStateModifiers";
import { useAriaPressedModifier } from "../../modifiers/useAriaStateModifiers";
import {
	useActiveModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useHoverModifier,
} from "../../modifiers/usePseudoStateModifiers";
import { useDesignTokensPreset } from "../../presets/useDesignTokensPreset";
import { useUtilitiesPreset } from "../../presets/useUtilitiesPreset";
import { useModifiersPreset } from "../../presets/useModifiersPreset";
import { useToggleRecipe } from "./useToggleRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"fontWeight",
		"fontSize",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"lineHeight",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"cursor",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"textDecoration",
		"whiteSpace",
		"userSelect",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"gap",
		"color",
		"background",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusModifier(s);
	useActiveModifier(s);
	useFocusVisibleModifier(s);
	useDisabledModifier(s);
	useAriaPressedModifier(s);
	return s;
}

describe("useToggleRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("toggle");
	});

	it("should build against the design-tokens, utilities, and modifiers presets", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useUtilitiesPreset(s);
		useModifiersPreset(s);

		// Reproduces the real init environment: every declared property must
		// resolve to a registered utility and every `&:` key to a modifier
		// (including `&:aria-pressed`).
		expect(() => useToggleRecipe(s)).not.toThrow();
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.base).toMatchObject({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			cursor: "pointer",
			userSelect: "none",
			outline: "none",
		});
	});

	it("should style focus-visible and disabled states", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.base?.["&:focus-visible"]).toMatchObject({
			outlineColor: "@color.primary",
		});
		expect(recipe.base?.["&:disabled"]).toEqual({
			cursor: "not-allowed",
			opacity: "0.75",
			pointerEvents: "none",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"ghost",
				"outline",
			]);
			expect(recipe.variants!.variant.ghost).toEqual({
				background: "transparent",
			});
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				fontSize: "@font-size.sm",
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
				borderRadius: "@border-radius.md",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useToggleRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "ghost",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 6 compound variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(6);
		});

		it("should reuse the :active fill on :aria-pressed for every compound variant", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			for (const cv of recipe.compoundVariants!) {
				const css = cv.css as Record<string, Record<string, string>>;
				expect(css["&:aria-pressed"]).toEqual(css["&:active"]);
			}
		});

		it("should adapt the neutral/ghost variant in dark mode and re-assert the pressed fill", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral" && v.match.variant === "ghost",
			);
			expect(cv?.css).toEqual({
				color: "@color.text",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-200" },
				"&:dark": { color: "@color.gray-200" },
				"&:dark:hover": { background: "@color.gray-800" },
				"&:dark:focus": { background: "@color.gray-800" },
				"&:dark:active": { background: "@color.gray-750" },
				"&:dark:aria-pressed": { background: "@color.gray-750" },
			});
		});

		it("should keep fixed light/dark surfaces free of dark overrides", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s);

			const light = recipe.compoundVariants!.find(
				(v) => v.match.color === "light" && v.match.variant === "outline",
			);
			expect(light?.css).toEqual({
				color: "@color.gray-700",
				borderColor: "@color.gray-300",
				"&:hover": { background: "@color.gray-100" },
				"&:focus": { background: "@color.gray-100" },
				"&:active": { background: "@color.gray-200" },
				"&:aria-pressed": { background: "@color.gray-200" },
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base?.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune compound variants", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants).toHaveLength(2);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useToggleRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
