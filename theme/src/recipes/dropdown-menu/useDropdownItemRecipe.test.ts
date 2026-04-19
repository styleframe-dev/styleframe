import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useHoverModifier,
	useFocusModifier,
	useFocusVisibleModifier,
	useActiveModifier,
} from "../../modifiers/usePseudoStateModifiers";
import { useDisabledModifier } from "../../modifiers/useFormStateModifiers";
import { useDropdownItemRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"gap",
		"cursor",
		"background",
		"color",
		"fontWeight",
		"fontSize",
		"lineHeight",
		"textDecoration",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"opacity",
		"pointerEvents",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"textUnderlineOffset",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusModifier(s);
	useFocusVisibleModifier(s);
	useActiveModifier(s);
	useDisabledModifier(s);
	return s;
}

describe("useDropdownItemRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useDropdownItemRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("dropdown-item");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useDropdownItemRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			gap: "@0.5",
			cursor: "pointer",
			background: "transparent",
			fontWeight: "@font-weight.normal",
			lineHeight: "@line-height.normal",
			textDecoration: "none",
			transitionProperty: "color, background-color",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			outline: "none",
			"&:hover": {
				textDecoration: "none",
			},
			"&:focus": {
				textDecoration: "none",
			},
			"&:focus-visible": {
				outlineWidth: "2px",
				outlineStyle: "solid",
				outlineColor: "@color.primary",
				outlineOffset: "-2px",
			},
			"&:disabled": {
				cursor: "not-allowed",
				opacity: "0.5",
				pointerEvents: "none",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					fontSize: "@font-size.xs",
					paddingTop: "@0.25",
					paddingBottom: "@0.25",
					paddingLeft: "@0.5",
					paddingRight: "@0.5",
					gap: "@0.375",
				},
				md: {
					fontSize: "@font-size.sm",
					paddingTop: "@0.375",
					paddingBottom: "@0.375",
					paddingLeft: "@0.75",
					paddingRight: "@0.75",
					gap: "@0.5",
				},
				lg: {
					fontSize: "@font-size.md",
					paddingTop: "@0.5",
					paddingBottom: "@0.5",
					paddingLeft: "@1",
					paddingRight: "@1",
					gap: "@0.75",
				},
			});
		});

		it("should have active variant axis", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(recipe.variants!.active).toEqual({
				true: { fontWeight: "@font-weight.semibold" },
				false: {},
			});
		});

		it("should have disabled variant axis", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			expect(recipe.variants!.disabled).toEqual({
				true: {
					cursor: "not-allowed",
					opacity: "0.5",
					pointerEvents: "none",
				},
				false: {},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useDropdownItemRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
			active: "false",
			disabled: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral solid compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					color: "@color.text",
					"&:hover": {
						color: "@color.text",
						background: "@color.gray-100",
					},
					"&:focus": {
						color: "@color.text",
						background: "@color.gray-100",
					},
					"&:active": {
						background: "@color.gray-200",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:hover": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:focus": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:active": {
						background: "@color.gray-750",
					},
				},
			});
		});

		it("should have correct light solid compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					color: "@color.text",
					"&:hover": {
						color: "@color.text",
						background: "@color.gray-100",
					},
					"&:focus": {
						color: "@color.text",
						background: "@color.gray-100",
					},
					"&:active": {
						background: "@color.gray-200",
					},
					"&:dark": {
						color: "@color.text-inverted",
					},
					"&:dark:hover": {
						color: "@color.text-inverted",
						background: "@color.gray-100",
					},
					"&:dark:focus": {
						color: "@color.text-inverted",
						background: "@color.gray-100",
					},
					"&:dark:active": {
						background: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct dark solid compound variant", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					color: "@color.gray-200",
					"&:hover": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:focus": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:active": {
						background: "@color.gray-750",
					},
					"&:dark": {
						color: "@color.gray-200",
					},
					"&:dark:hover": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:focus": {
						color: "@color.gray-200",
						background: "@color.gray-800",
					},
					"&:dark:active": {
						background: "@color.gray-750",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.alignItems).toBe("center");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "neutral"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { variant: ["solid", "soft"] },
			});

			expect(Object.keys(recipe.variants!.variant)).toEqual(["solid", "soft"]);
			expect(
				recipe.compoundVariants!.every(
					(cv) => cv.match.variant === "solid" || cv.match.variant === "soft",
				),
			).toBe(true);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useDropdownItemRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});
