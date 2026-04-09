import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useAfterModifier } from "../../modifiers/usePseudoElementModifiers";
import { usePopoverArrowRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"width",
		"height",
		"borderLeftWidth",
		"borderLeftStyle",
		"borderLeftColor",
		"borderRightWidth",
		"borderRightStyle",
		"borderRightColor",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
		"zIndex",
		"left",
		"top",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	useAfterModifier(s);
	return s;
}

describe("usePopoverArrowRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = usePopoverArrowRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("popover-arrow");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = usePopoverArrowRecipe(s);

		expect(recipe.base).toEqual({
			width: "0",
			height: "0",
			borderLeftWidth: "calc(@popover.arrow.size + 1px)",
			borderLeftStyle: "@border-style.solid",
			borderLeftColor: "transparent",
			borderRightWidth: "calc(@popover.arrow.size + 1px)",
			borderRightStyle: "@border-style.solid",
			borderRightColor: "transparent",
			borderTopWidth: "calc(@popover.arrow.size + 1px)",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			position: "absolute",
			zIndex: "@z-index.popover",
			"&:after": {
				borderLeftWidth: "@popover.arrow.size",
				borderLeftStyle: "@border-style.solid",
				borderLeftColor: "transparent",
				borderRightWidth: "@popover.arrow.size",
				borderRightStyle: "@border-style.solid",
				borderRightColor: "transparent",
				borderTopWidth: "@popover.arrow.size",
				borderTopStyle: "@border-style.solid",
				borderTopColor: "transparent",
				position: "absolute",
				left: "calc(@popover.arrow.size * -1)",
				top: "calc(@popover.arrow.size * -1 - 1px)",
				zIndex: "0",
			},
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"soft",
				"subtle",
			]);
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePopoverArrowRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral solid compound variant", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-200",
					"&:after": {
						borderTopColor: "@color.white",
					},
					"&:dark": {
						borderTopColor: "@color.gray-700",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-900",
					},
				},
			});
		});

		it("should have correct light soft compound variant", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			const lightSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "soft",
			);

			expect(lightSoft).toEqual({
				match: { color: "light", variant: "soft" },
				css: {
					borderTopColor: "@color.gray-100",
					"&:after": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark": {
						borderTopColor: "@color.gray-100",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-100",
					},
				},
			});
		});

		it("should have correct dark subtle compound variant", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			const darkSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "subtle",
			);

			expect(darkSubtle).toEqual({
				match: { color: "dark", variant: "subtle" },
				css: {
					borderTopColor: "@color.gray-700",
					"&:after": {
						borderTopColor: "@color.gray-800",
					},
					"&:dark": {
						borderTopColor: "@color.gray-700",
					},
					"&:dark:after": {
						borderTopColor: "@color.gray-800",
					},
				},
			});
		});
	});
});
