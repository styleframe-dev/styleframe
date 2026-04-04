import { styleframe } from "@styleframe/core";
import { useButtonGroupRecipe } from "./useButtonGroupRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"verticalAlign",
		"position",
		"flexDirection",
		"width",
		"flexBasis",
		"flexGrow",
		"borderTopRightRadius",
		"borderBottomRightRadius",
		"borderRightWidth",
		"borderTopLeftRadius",
		"borderBottomLeftRadius",
		"borderBottomRightRadius",
		"borderBottomWidth",
		"borderTopRightRadius",
		"borderTopLeftRadius",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	return s;
}

describe("useButtonGroupRecipe", () => {
	it("should create a recipe with correct metadata", () => {
		const s = createInstance();
		const recipe = useButtonGroupRecipe(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("button-group");
	});

	it("should have correct base styles", () => {
		const s = createInstance();
		const recipe = useButtonGroupRecipe(s);

		expect(recipe.base).toEqual({
			display: "inline-flex",
			verticalAlign: "middle",
			position: "relative",
		});
	});

	describe("variants", () => {
		it("should have orientation variants", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s);

			expect(recipe.variants!.orientation).toEqual({
				horizontal: { flexDirection: "row" },
				vertical: { flexDirection: "column" },
			});
		});

		it("should have block variants", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s);

			expect(recipe.variants!.block).toEqual({
				true: { display: "flex", width: "100%" },
				false: {},
			});
		});
	});

	it("should have correct default variants", () => {
		const s = createInstance();
		const recipe = useButtonGroupRecipe(s);

		expect(recipe.defaultVariants).toEqual({
			orientation: "horizontal",
			block: "false",
		});
	});

	describe("compound variants", () => {
		it("should have 3 compound variants total", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s);

			expect(recipe.compoundVariants).toHaveLength(3);
		});

		it("should have horizontal className compound variant", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s);

			const horizontal = recipe.compoundVariants!.find(
				(cv) => cv.match.orientation === "horizontal",
			);

			expect(horizontal).toEqual({
				match: { orientation: "horizontal" },
				className: "-horizontal",
			});
		});

		it("should have vertical className compound variant", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s);

			const vertical = recipe.compoundVariants!.find(
				(cv) => cv.match.orientation === "vertical",
			);

			expect(vertical).toEqual({
				match: { orientation: "vertical" },
				className: "-vertical",
			});
		});

		it("should have block className compound variant", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s);

			const block = recipe.compoundVariants!.find(
				(cv) => cv.match.block === "true",
			);

			expect(block).toEqual({
				match: { block: "true" },
				className: "-block",
			});
		});
	});

	describe("config overrides", () => {
		it("should allow overriding base styles", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s, {
				base: { display: "flex" },
			});

			expect(recipe.base!.display).toBe("flex");
			expect(recipe.base!.verticalAlign).toBe("middle");
			expect(recipe.base!.position).toBe("relative");
		});
	});

	describe("filter", () => {
		it("should filter orientation variants", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s, {
				filter: { orientation: ["horizontal"] },
			});

			expect(Object.keys(recipe.variants!.orientation)).toEqual(["horizontal"]);
		});

		it("should prune compound variants when filtering orientation", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s, {
				filter: { orientation: ["horizontal"] },
			});

			const orientationCompounds = recipe.compoundVariants!.filter(
				(cv) => cv.match.orientation !== undefined,
			);
			expect(orientationCompounds).toHaveLength(1);
			expect(orientationCompounds[0]!.match.orientation).toBe("horizontal");
		});

		it("should adjust default variants when filtered out", () => {
			const s = createInstance();
			const recipe = useButtonGroupRecipe(s, {
				filter: { orientation: ["vertical"] },
			});

			expect(recipe.defaultVariants?.orientation).toBeUndefined();
			expect(recipe.defaultVariants?.block).toBe("false");
		});
	});
});
