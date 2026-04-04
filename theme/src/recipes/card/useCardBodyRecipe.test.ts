import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useCardBodyRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"flexDirection",
		"flexBasis",
		"alignItems",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"overflow",
		"fontSize",
		"lineHeight",
		"boxShadow",
		"background",
		"color",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"gap",
		"borderBottomWidth",
		"borderBottomStyle",
		"borderBottomColor",
		"borderTopWidth",
		"borderTopStyle",
		"borderTopColor",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useCardBodyRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCardBodyRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("card-body");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCardBodyRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			gap: "@0.5",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			borderTopWidth: "@border-width.thin",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
		});
	});

	it("should have correct size variants", () => {
		const s = createInstance();
		const recipe = useCardBodyRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.375",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.5",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@0.75",
			},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCardBodyRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 12 compound variants total", () => {
			const s = createInstance();
			const recipe = useCardBodyRecipe(s);

			// 3 colors × 4 variants = 12
			expect(recipe.compoundVariants).toHaveLength(12);
		});

		it("should have correct neutral solid compound variant", () => {
			const s = createInstance();
			const recipe = useCardBodyRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					borderTopColor: "@color.gray-200",
					borderBottomColor: "@color.gray-200",
					"&:dark": {
						borderTopColor: "@color.gray-800",
						borderBottomColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have transparent borders for soft variants", () => {
			const s = createInstance();
			const recipe = useCardBodyRecipe(s);

			const neutralSoft = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "soft",
			);

			expect(neutralSoft).toEqual({
				match: { color: "neutral", variant: "soft" },
				css: {
					borderTopColor: "transparent",
					borderBottomColor: "transparent",
					"&:dark": {
						borderTopColor: "transparent",
						borderBottomColor: "transparent",
					},
				},
			});
		});
	});
});
