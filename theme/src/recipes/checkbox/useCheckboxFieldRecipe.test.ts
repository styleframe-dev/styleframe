import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useCheckedModifier,
	useDisabledModifier,
	useIndeterminateModifier,
} from "../../modifiers/useFormStateModifiers";
import { useFocusVisibleModifier } from "../../modifiers/usePseudoStateModifiers";
import { useDesignTokensPreset } from "../../presets/useDesignTokensPreset";
import { useUtilitiesPreset } from "../../presets/useUtilitiesPreset";
import { useModifiersPreset } from "../../presets/useModifiersPreset";
import { useCheckboxFieldRecipe } from "./useCheckboxFieldRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"appearance",
		"WebkitAppearance",
		"boxSizing",
		"display",
		"flexShrink",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"backgroundColor",
		"backgroundImage",
		"backgroundRepeat",
		"backgroundPosition",
		"backgroundSize",
		"cursor",
		"transitionProperty",
		"transitionDuration",
		"transitionTimingFunction",
		"width",
		"height",
		"opacity",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useCheckedModifier(s);
	useIndeterminateModifier(s);
	useDisabledModifier(s);
	useFocusVisibleModifier(s);
	return s;
}

describe("useCheckboxFieldRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCheckboxFieldRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("checkbox-field");
	});

	it("should build against the design-tokens, utilities, and modifiers presets", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useUtilitiesPreset(s);
		useModifiersPreset(s);

		// Reproduces the real init environment: every declared property must
		// resolve to a registered utility (e.g. -webkit-appearance).
		expect(() => useCheckboxFieldRecipe(s)).not.toThrow();
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCheckboxFieldRecipe(s);

		expect(recipe.base).toMatchObject({
			appearance: "none",
			boxSizing: "border-box",
			display: "inline-block",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			cursor: "pointer",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "contain",
		});
	});

	it("should fill the box with primary and paint an SVG mark when checked or indeterminate", () => {
		const s = createInstance();
		const recipe = useCheckboxFieldRecipe(s);

		const checked = recipe.base?.["&:checked"] as Record<string, string>;
		expect(checked).toMatchObject({
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
		});
		expect(checked.backgroundImage).toContain("data:image/svg+xml");
		expect(checked.backgroundImage).toContain("M3.5 8.5l3 3 6-6");

		const indeterminate = recipe.base?.["&:indeterminate"] as Record<
			string,
			string
		>;
		expect(indeterminate).toMatchObject({
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
		});
		expect(indeterminate.backgroundImage).toContain("M4 8h8");
	});

	it("should style focus-visible and disabled states", () => {
		const s = createInstance();
		const recipe = useCheckboxFieldRecipe(s);

		expect(recipe.base?.["&:focus-visible"]).toMatchObject({
			outlineColor: "@color.primary",
		});
		expect(recipe.base?.["&:disabled"]).toEqual({
			opacity: "0.5",
			cursor: "not-allowed",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				width: "16px",
				height: "16px",
				borderRadius: "@border-radius.sm",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCheckboxFieldRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should set the neutral unchecked surface and re-assert the checked fill in dark mode", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral",
			);
			expect(cv?.css).toEqual({
				backgroundColor: "@color.white",
				borderColor: "@color.gray-300",
				"&:dark": {
					backgroundColor: "@color.gray-900",
					borderColor: "@color.gray-600",
				},
				"&:dark:checked": {
					backgroundColor: "@color.primary",
					borderColor: "@color.primary",
				},
				"&:dark:indeterminate": {
					backgroundColor: "@color.primary",
					borderColor: "@color.primary",
				},
			});
		});

		it("should keep fixed light/dark surfaces free of dark overrides", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s);

			const light = recipe.compoundVariants!.find(
				(v) => v.match.color === "light",
			);
			expect(light?.css).toEqual({
				backgroundColor: "@color.white",
				borderColor: "@color.gray-300",
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base?.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune compound variants", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useCheckboxFieldRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
