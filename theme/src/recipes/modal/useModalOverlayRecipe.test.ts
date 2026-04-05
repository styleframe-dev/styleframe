import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import { useModalOverlayRecipe } from "./index";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"position",
		"top",
		"left",
		"width",
		"height",
		"background",
		"display",
		"alignItems",
		"justifyContent",
		"zIndex",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	useDarkModifier(s);
	return s;
}

describe("useModalOverlayRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useModalOverlayRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("modal-overlay");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useModalOverlayRecipe(s);

		expect(recipe.base).toEqual({
			position: "fixed",
			top: "0",
			left: "0",
			width: "100%",
			height: "100%",
			background: "rgba(0, 0, 0, 0.5)",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			zIndex: "@z-index.modal",
			"&:dark": {
				background: "rgba(0, 0, 0, 0.7)",
			},
		});
	});

	it("should have empty variants", () => {
		const s = createInstance();
		const recipe = useModalOverlayRecipe(s);

		expect(recipe.variants).toEqual({});
	});

	it("should have empty default variants", () => {
		const s = createInstance();
		const recipe = useModalOverlayRecipe(s);

		expect(recipe.defaultVariants).toEqual({});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useModalOverlayRecipe(s, {
				base: { position: "absolute" },
			});

			expect(recipe.base!.position).toBe("absolute");
			expect(recipe.base!.display).toBe("flex");
		});
	});
});
