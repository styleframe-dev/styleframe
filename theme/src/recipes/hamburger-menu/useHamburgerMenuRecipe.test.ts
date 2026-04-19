import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useHoverModifier,
	useFocusModifier,
	useFocusVisibleModifier,
} from "../../modifiers/usePseudoStateModifiers";
import { useHamburgerMenuRecipe } from "./useHamburgerMenuRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"justifyContent",
		"cursor",
		"userSelect",
		"background",
		"borderWidth",
		"padding",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"opacity",
		"width",
		"height",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusModifier(s);
	useFocusVisibleModifier(s);
	return s;
}

describe("useHamburgerMenuRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useHamburgerMenuRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("hamburger-menu");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useHamburgerMenuRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			cursor: "pointer",
			userSelect: "none",
			background: "transparent",
			borderWidth: "0",
			padding: "@0.25",
			outline: "none",
			transitionProperty: "opacity",
			transitionTimingFunction: "@easing.ease-in-out",
			transitionDuration: "150ms",
			"&:hover": {
				opacity: "0.8",
			},
			"&:focus": {
				opacity: "0.8",
			},
			"&:focus-visible": {
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
			const recipe = useHamburgerMenuRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have all animation variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			expect(Object.keys(recipe.variants!.animation)).toEqual([
				"close",
				"arrow-left",
				"arrow-right",
				"arrow-up",
				"arrow-down",
				"plus",
				"minus",
			]);
		});

		it("should have active variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			expect(Object.keys(recipe.variants!.active)).toEqual(["true", "false"]);
		});

		it("should have correct size variant styles", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { width: "@2", height: "@2" },
				md: { width: "@2.5", height: "@2.5" },
				lg: { width: "@3", height: "@3" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useHamburgerMenuRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			size: "md",
			animation: "close",
			active: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have correct light compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "light",
			);
			expect(cv?.css).toEqual({
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.gray-700",
				},
			});
		});

		it("should have correct dark compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			const cv = recipe.compoundVariants!.find((v) => v.match.color === "dark");
			expect(cv?.css).toEqual({
				color: "@color.white",
				"&:dark": {
					color: "@color.white",
				},
			});
		});

		it("should have correct neutral compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.color === "neutral",
			);
			expect(cv?.css).toEqual({
				color: "@color.gray-700",
				"&:dark": {
					color: "@color.white",
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base?.display).toBe("flex");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["light"]);
		});

		it("should prune compound variants when filtering", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s, {
				filter: { color: ["light", "dark"] },
			});

			expect(recipe.compoundVariants!.length).toBe(2);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
		});
	});
});
