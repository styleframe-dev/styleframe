import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../modifiers/useMediaPreferenceModifiers";
import {
	useCardRecipe,
	useCardHeaderRecipe,
	useCardBodyRecipe,
	useCardFooterRecipe,
} from "./useCardRecipe";

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

describe("useCardRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCardRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("card");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCardRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			flexDirection: "column",
			flexBasis: "100%",
			borderWidth: "@border-width.thin",
			borderStyle: "@border-style.solid",
			borderColor: "transparent",
			borderRadius: "@border-radius.md",
			overflow: "hidden",
			lineHeight: "@line-height.normal",
			boxShadow: "@box-shadow.sm",
		});
	});

	describe("variants", () => {
		it("should have all color variants", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(Object.keys(recipe.variants!.color)).toEqual([
				"light",
				"dark",
				"neutral",
			]);
		});

		it("should have all style variants", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(Object.keys(recipe.variants!.variant)).toEqual([
				"solid",
				"outline",
				"soft",
				"subtle",
			]);
		});

		it("should have size variants with correct styles", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			expect(recipe.variants!.size).toEqual({
				sm: {
					borderRadius: "@border-radius.sm",
				},
				md: {
					borderRadius: "@border-radius.md",
				},
				lg: {
					borderRadius: "@border-radius.lg",
				},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCardRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});

	describe("compound variants", () => {
		it("should have 12 compound variants total", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			// 3 colors × 4 variants = 12
			expect(recipe.compoundVariants).toHaveLength(12);
		});

		it("should have correct light solid compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const lightSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "solid",
			);

			expect(lightSolid).toEqual({
				match: { color: "light", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.white",
						color: "@color.text-inverted",
						borderColor: "@color.gray-200",
					},
				},
			});
		});

		it("should have correct light outline compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const lightOutline = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "light" && cv.match.variant === "outline",
			);

			expect(lightOutline).toEqual({
				match: { color: "light", variant: "outline" },
				css: {
					color: "@color.text-inverted",
					borderColor: "@color.gray-300",
					"&:dark": {
						color: "@color.text",
						borderColor: "@color.gray-300",
					},
				},
			});
		});

		it("should have correct dark solid compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const darkSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "dark" && cv.match.variant === "solid",
			);

			expect(darkSolid).toEqual({
				match: { color: "dark", variant: "solid" },
				css: {
					background: "@color.gray-900",
					color: "@color.white",
					borderColor: "@color.gray-800",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral solid compound variant with adaptive dark mode", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const neutralSolid = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "solid",
			);

			expect(neutralSolid).toEqual({
				match: { color: "neutral", variant: "solid" },
				css: {
					background: "@color.white",
					color: "@color.text",
					borderColor: "@color.gray-200",
					"&:dark": {
						background: "@color.gray-900",
						color: "@color.white",
						borderColor: "@color.gray-800",
					},
				},
			});
		});

		it("should have correct neutral subtle compound variant", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s);

			const neutralSubtle = recipe.compoundVariants!.find(
				(cv) => cv.match.color === "neutral" && cv.match.variant === "subtle",
			);

			expect(neutralSubtle).toEqual({
				match: { color: "neutral", variant: "subtle" },
				css: {
					background: "@color.gray-100",
					color: "@color.gray-700",
					borderColor: "@color.gray-300",
					"&:dark": {
						background: "@color.gray-800",
						color: "@color.gray-300",
						borderColor: "@color.gray-600",
					},
				},
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				base: { display: "inline-flex" },
			});

			expect(recipe.base!.display).toBe("inline-flex");
			expect(recipe.base!.flexDirection).toBe("column");
		});
	});

	describe("filter", () => {
		it("should filter color variants", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(Object.keys(recipe.variants!.color)).toEqual(["neutral"]);
		});

		it("should prune compound variants when filtering colors", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
				filter: { color: ["neutral"] },
			});

			expect(
				recipe.compoundVariants!.every((cv) => cv.match.color === "neutral"),
			).toBe(true);
			expect(recipe.compoundVariants).toHaveLength(4);
		});

		it("should filter variant axis", () => {
			const s = createInstance();
			const recipe = useCardRecipe(s, {
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
			const recipe = useCardRecipe(s, {
				filter: { color: ["light"] },
			});

			expect(recipe.defaultVariants?.color).toBeUndefined();
			expect(recipe.defaultVariants?.variant).toBe("solid");
			expect(recipe.defaultVariants?.size).toBe("md");
		});
	});
});

describe("useCardHeaderRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCardHeaderRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("card-header");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCardHeaderRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			gap: "@0.75",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			borderBottomWidth: "@border-width.thin",
			borderBottomStyle: "@border-style.solid",
			borderBottomColor: "transparent",
		});
	});

	it("should have correct size variants", () => {
		const s = createInstance();
		const recipe = useCardHeaderRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCardHeaderRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});
});

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
});

describe("useCardFooterRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useCardFooterRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("card-footer");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useCardFooterRecipe(s);

		expect(recipe.base).toEqual({
			display: "flex",
			alignItems: "center",
			gap: "@0.75",
			paddingTop: "@0.75",
			paddingBottom: "@0.75",
			paddingLeft: "@1",
			paddingRight: "@1",
			borderTopWidth: "@border-width.thin",
			borderTopStyle: "@border-style.solid",
			borderTopColor: "transparent",
		});
	});

	it("should have correct size variants", () => {
		const s = createInstance();
		const recipe = useCardFooterRecipe(s);

		expect(recipe.variants!.size).toEqual({
			sm: {
				paddingTop: "@0.5",
				paddingBottom: "@0.5",
				paddingLeft: "@0.75",
				paddingRight: "@0.75",
				gap: "@0.5",
			},
			md: {
				paddingTop: "@0.75",
				paddingBottom: "@0.75",
				paddingLeft: "@1",
				paddingRight: "@1",
				gap: "@0.75",
			},
			lg: {
				paddingTop: "@1",
				paddingBottom: "@1",
				paddingLeft: "@1.25",
				paddingRight: "@1.25",
				gap: "@1",
			},
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useCardFooterRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "solid",
			size: "md",
		});
	});
});
