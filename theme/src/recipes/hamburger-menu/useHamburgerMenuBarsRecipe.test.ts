import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useBeforeModifier,
	useAfterModifier,
} from "../../modifiers/usePseudoElementModifiers";
import { useHamburgerMenuBarsRecipe } from "./useHamburgerMenuBarsRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"position",
		"background",
		"borderRadius",
		"transitionProperty",
		"transitionDuration",
		"transitionTimingFunction",
		"width",
		"height",
		"opacity",
		"transform",
		"transformOrigin",
		"top",
		"bottom",
		"left",
		"content",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useBeforeModifier(s);
	useAfterModifier(s);
	return s;
}

describe("useHamburgerMenuBarsRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useHamburgerMenuBarsRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("hamburger-menu-bars");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useHamburgerMenuBarsRecipe(s);

		expect(recipe.base).toEqual({
			display: "block",
			position: "relative",
			background: "currentColor",
			borderRadius: "1px",
			transitionProperty: "transform, opacity",
			transitionDuration: "300ms",
			transitionTimingFunction: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
		});
	});

	describe("variants", () => {
		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have correct size variant styles", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: { width: "16px", height: "2px" },
				md: { width: "20px", height: "2px" },
				lg: { width: "24px", height: "2px" },
			});
		});

		it("should have all animation variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

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
			const recipe = useHamburgerMenuBarsRecipe(s);

			expect(Object.keys(recipe.variants!.active)).toEqual(["true", "false"]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useHamburgerMenuBarsRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
			animation: "close",
			active: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 10 compound variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(10);
		});

		it("should have correct sm size spacing compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.size === "sm" && !v.match.animation,
			);
			expect(cv?.css).toEqual({
				"&:before": { top: "-5px" },
				"&:after": { bottom: "-5px" },
			});
		});

		it("should have correct md size spacing compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.size === "md" && !v.match.animation,
			);
			expect(cv?.css).toEqual({
				"&:before": { top: "-6px" },
				"&:after": { bottom: "-6px" },
			});
		});

		it("should have correct lg size spacing compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.size === "lg" && !v.match.animation,
			);
			expect(cv?.css).toEqual({
				"&:before": { top: "-8px" },
				"&:after": { bottom: "-8px" },
			});
		});

		it("should have correct close animation compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.animation === "close" && v.match.active === "true",
			);
			expect(cv?.css).toEqual({
				opacity: "0",
				transform: "rotate(180deg)",
				"&:before": {
					top: "0",
					transform: "rotate(45deg)",
				},
				"&:after": {
					bottom: "0",
					transform: "rotate(-45deg)",
				},
			});
		});

		it("should have correct arrow-left animation compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.animation === "arrow-left" && v.match.active === "true",
			);
			expect(cv?.css).toEqual({
				"&:before": {
					top: "0",
					width: "50%",
					transform: "translateX(-1px) rotate(-45deg)",
					transformOrigin: "left center",
				},
				"&:after": {
					bottom: "0",
					width: "50%",
					transform: "translateX(-1px) rotate(45deg)",
					transformOrigin: "left center",
				},
			});
		});

		it("should have correct arrow-right animation compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.animation === "arrow-right" && v.match.active === "true",
			);
			expect(cv?.css).toEqual({
				"&:before": {
					top: "0",
					width: "50%",
					transform: "translateX(calc(100% + 1px)) rotate(45deg)",
					transformOrigin: "right center",
				},
				"&:after": {
					bottom: "0",
					width: "50%",
					transform: "translateX(calc(100% + 1px)) rotate(-45deg)",
					transformOrigin: "right center",
				},
			});
		});

		it("should have correct plus animation compound variant", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s);

			const cv = recipe.compoundVariants!.find(
				(v) => v.match.animation === "plus" && v.match.active === "true",
			);
			expect(cv?.css).toEqual({
				"&:before": {
					top: "0",
					transform: "rotate(90deg)",
				},
				"&:after": {
					bottom: "0",
					transform: "rotate(0deg)",
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s, {
				base: { display: "inline-block" },
			});

			expect(recipe.base?.display).toBe("inline-block");
		});
	});

	describe("filter", () => {
		it("should filter size variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s, {
				filter: { size: ["md"] },
			});

			expect(Object.keys(recipe.variants!.size)).toEqual(["md"]);
		});

		it("should filter animation variants", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s, {
				filter: { animation: ["close", "plus"] },
			});

			expect(Object.keys(recipe.variants!.animation)).toEqual([
				"close",
				"plus",
			]);
		});

		it("should prune compound variants when filtering", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s, {
				filter: { size: ["md"], animation: ["close"] },
			});

			expect(recipe.compoundVariants!.length).toBeLessThan(10);
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useHamburgerMenuBarsRecipe(s, {
				filter: { size: ["lg"] },
			});

			expect(recipe.defaultVariants?.size).toBeUndefined();
		});
	});
});
