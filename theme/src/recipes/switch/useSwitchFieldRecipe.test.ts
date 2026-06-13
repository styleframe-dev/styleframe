import { describe, expect, it } from "vitest";
import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useCheckedModifier,
	useDisabledModifier,
} from "../../modifiers/useFormStateModifiers";
import { useFocusVisibleModifier } from "../../modifiers/usePseudoStateModifiers";
import { useDesignTokensPreset } from "../../presets/useDesignTokensPreset";
import { useUtilitiesPreset } from "../../presets/useUtilitiesPreset";
import { useModifiersPreset } from "../../presets/useModifiersPreset";
import { useSwitchFieldRecipe } from "./useSwitchFieldRecipe";

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
	useDisabledModifier(s);
	useFocusVisibleModifier(s);
	return s;
}

describe("useSwitchFieldRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useSwitchFieldRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("switch-field");
	});

	it("should build against the design-tokens, utilities, and modifiers presets", () => {
		const s = styleframe();
		useDesignTokensPreset(s);
		useUtilitiesPreset(s);
		useModifiersPreset(s);

		// Reproduces the real init environment: every declared property must
		// resolve to a registered utility (e.g. -webkit-appearance).
		expect(() => useSwitchFieldRecipe(s)).not.toThrow();
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useSwitchFieldRecipe(s);

		expect(recipe.base).toMatchObject({
			appearance: "none",
			boxSizing: "border-box",
			display: "inline-block",
			cursor: "pointer",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderRadius: "@border-radius.full",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "2px center",
			transitionProperty: "background-color, background-position, border-color",
		});
	});

	it("should paint a white knob as an SVG background image", () => {
		const s = createInstance();
		const recipe = useSwitchFieldRecipe(s);

		const image = recipe.base?.backgroundImage as string;
		expect(image).toContain("data:image/svg+xml");
		expect(image).toContain("circle");
	});

	it("should fill the track with primary and slide the knob right when checked", () => {
		const s = createInstance();
		const recipe = useSwitchFieldRecipe(s);

		expect(recipe.base?.["&:checked"]).toEqual({
			backgroundColor: "@color.primary",
			borderColor: "@color.primary",
			backgroundPosition: "calc(100% - 2px) center",
		});
	});

	it("should style focus-visible and disabled states", () => {
		const s = createInstance();
		const recipe = useSwitchFieldRecipe(s);

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
			const recipe = useSwitchFieldRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
			expect(recipe.variants!.size.md).toEqual({
				width: "36px",
				height: "20px",
				backgroundSize: "16px 16px",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useSwitchFieldRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should set the neutral unchecked track and re-assert the checked fill in dark mode", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral",
			);
			expect(cv?.css).toEqual({
				backgroundColor: "@color.gray-300",
				borderColor: "@color.gray-300",
				"&:dark": {
					backgroundColor: "@color.gray-700",
					borderColor: "@color.gray-700",
				},
				"&:dark:checked": {
					backgroundColor: "@color.primary",
					borderColor: "@color.primary",
				},
			});
		});

		it("should keep fixed light/dark tracks free of dark overrides", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s);

			const light = recipe.compoundVariants!.find(
				(v) => v.match.color === "light",
			);
			expect(light?.css).toEqual({
				backgroundColor: "@color.gray-300",
				borderColor: "@color.gray-300",
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s, {
				base: { display: "block" },
			});

			expect(recipe.base?.display).toBe("block");
		});
	});

	describe("filter", () => {
		it("should filter color variants and prune compound variants", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
			expect(recipe.compoundVariants).toHaveLength(1);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useSwitchFieldRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
