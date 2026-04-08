import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { usePopoverArrowRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"width",
		"height",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"transform",
		"background",
		"color",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
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
			position: "absolute",
			width: "@0.5",
			height: "@0.5",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			transform: "rotate(45deg)",
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

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					width: "@0.375",
					height: "@0.375",
				},
				md: {
					width: "@0.5",
					height: "@0.5",
				},
				lg: {
					width: "@0.625",
					height: "@0.625",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = usePopoverArrowRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 9 compound variants total", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			// 3 colors × 3 variants = 9
			expect(recipe.compoundVariants).toHaveLength(9);
		});

		it("should have correct neutral solid compound variant matching popover background", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-900",
						borderColor: "@color.gray-700",
					},
				},
			});
		});

		it("should have correct light soft compound variant without border", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			const lightSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "soft",
			);

			expect(lightSoft).toEqual({
				match: { color: "light", variant: "soft" },
				css: {
					background: "@color.gray-100",
					"&:dark": {
						background: "@color.gray-100",
					},
				},
			});
		});

		it("should have correct dark subtle compound variant with border", () => {
			const s = createInstance();
			const recipe = usePopoverArrowRecipe(s);

			const darkSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "subtle",
			);

			expect(darkSubtle).toEqual({
				match: { color: "dark", variant: "subtle" },
				css: {
					background: "@color.gray-800",
					borderColor: "@color.gray-700",
					"&:dark": {
						background: "@color.gray-800",
						borderColor: "@color.gray-700",
					},
				},
			});
		});
	});
});
