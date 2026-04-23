import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useInputPrefixRecipe } from "./useInputPrefixRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"flexShrink",
		"color",
		"whiteSpace",
		"userSelect",
		"fontSize",
		"paddingRight",
		"gap",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useInputPrefixRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useInputPrefixRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("input-prefix");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useInputPrefixRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			flexShrink: "0",
			color: "@color.text-weak",
			whiteSpace: "nowrap",
			userSelect: "none",
			"&:dark": {
				color: "@color.gray-400",
			},
		});
	});

	describe("variants", () => {
		it("should have size variants", () => {
			const s = createInstance();
			const recipe = useInputPrefixRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md", "lg"]);
		});

		it("should have correct md size styles", () => {
			const s = createInstance();
			const recipe = useInputPrefixRecipe(s);

			expect(recipe.variants!.size.md).toEqual({
				fontSize: "@font-size.sm",
				paddingRight: "@0.5",
				gap: "@0.375",
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useInputPrefixRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			size: "md",
		});
	});
});
