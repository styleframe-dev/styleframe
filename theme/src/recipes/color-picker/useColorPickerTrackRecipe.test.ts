import { styleframe } from "@styleframe/core";
import { useColorPickerTrackRecipe } from "./useColorPickerTrackRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of ["position", "width", "borderRadius", "height"]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useColorPickerTrackRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("color-picker-track");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.base).toEqual({
			position: "relative",
			width: "@0.5",
			borderRadius: "@border-radius.md",
		});
	});

	describe("variants", () => {
		it("should have all size variants", () => {
			const s = createInstance();
			const recipe = useColorPickerTrackRecipe(s);

			expect(Object.keys(recipe.variants!.size)).toEqual([
				"xs",
				"sm",
				"md",
				"lg",
				"xl",
			]);
		});

		it("should scale only the height per size to match the selector", () => {
			const s = createInstance();
			const recipe = useColorPickerTrackRecipe(s);

			expect(recipe.variants!.size).toEqual({
				xs: { height: "@9.5" },
				sm: { height: "@10" },
				md: { height: "@10.5" },
				lg: { height: "@11" },
				xl: { height: "@11.5" },
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.defaultVariants).toEqual({ size: "md" });
	});

	it("should have no compound variants", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s);

		expect(recipe.compoundVariants).toEqual(undefined);
	});

	describe("setup callback", () => {
		it("should paint the hue rainbow on the track", () => {
			const s = createInstance();
			useColorPickerTrackRecipe(s);

			const queries = s.root.children
				.filter((child) => child.type === "selector")
				.map((child) => (child as { query: string }).query);

			expect(queries).toContain(".color-picker-track");
		});
	});

	it("should support config overrides", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s, {
			base: { width: "@0.75" },
		});

		expect(recipe.base!.width).toBe("@0.75");
		expect(recipe.base!.position).toBe("relative");
	});

	it("should support filter for size variants", () => {
		const s = createInstance();
		const recipe = useColorPickerTrackRecipe(s, {
			filter: { size: ["sm", "md"] },
		});

		expect(Object.keys(recipe.variants!.size)).toEqual(["sm", "md"]);
	});
});
