import { styleframe } from "@styleframe/core";
import { useDarkModifier } from "../../modifiers/useMediaPreferenceModifiers";
import {
	useFocusWithinModifier,
	useHoverModifier,
} from "../../modifiers/usePseudoStateModifiers";
import {
	createFieldAddonRecipe,
	createFieldGroupRecipe,
	createFieldRecipe,
	createFieldSlotRecipe,
} from "./createFieldRecipe";

function createInstance() {
	const s = styleframe();
	for (const name of [
		"display",
		"alignItems",
		"flexGrow",
		"flexShrink",
		"minWidth",
		"width",
		"fontFamily",
		"fontSize",
		"fontWeight",
		"lineHeight",
		"border",
		"borderWidth",
		"borderStyle",
		"borderColor",
		"borderRadius",
		"padding",
		"paddingTop",
		"paddingBottom",
		"paddingLeft",
		"paddingRight",
		"background",
		"color",
		"outline",
		"outlineWidth",
		"outlineStyle",
		"outlineColor",
		"outlineOffset",
		"cursor",
		"opacity",
		"pointerEvents",
		"transitionProperty",
		"transitionTimingFunction",
		"transitionDuration",
		"whiteSpace",
		"userSelect",
		"gap",
		"position",
		"borderTopLeftRadius",
		"borderBottomLeftRadius",
		"borderTopRightRadius",
		"borderBottomRightRadius",
		"borderLeftWidth",
		"borderRightWidth",
	]) {
		s.utility(name, ({ value }) => ({ [name]: value }));
	}
	s.variable("color.text-weakest", "#64748B", { default: true });
	useDarkModifier(s);
	useHoverModifier(s);
	useFocusWithinModifier(s);
	return s;
}

function findSelector(s: ReturnType<typeof styleframe>, query: string) {
	return s.root.children.find(
		(child) =>
			child.type === "selector" && (child as { query: string }).query === query,
	);
}

describe("createFieldRecipe", () => {
	it("builds a wrapper recipe with the shared field surface", () => {
		const s = createInstance();
		const recipe = createFieldRecipe("demo", {
			base: { display: "flex", alignItems: "flex-start" },
		})(s);

		expect(recipe.type).toBe("recipe");
		expect(recipe.name).toBe("demo");

		// caller base deltas + shared base
		expect(recipe.base).toMatchObject({
			display: "flex",
			alignItems: "flex-start",
			borderRadius: "@border-radius.md",
			color: "@color.text",
			"&:focus-within": {
				outlineColor: "@color.primary",
			},
		});

		// shared variant axes + 12 shared compounds + 6 shared defaults
		expect(Object.keys(recipe.variants!)).toEqual([
			"color",
			"variant",
			"size",
			"invalid",
			"disabled",
			"readonly",
		]);
		expect(recipe.compoundVariants).toHaveLength(12);
		expect(recipe.defaultVariants).toEqual({
			color: "neutral",
			variant: "default",
			size: "md",
			invalid: "false",
			disabled: "false",
			readonly: "false",
		});
	});

	it("registers the transparent nested field reset for the given name", () => {
		const s = createInstance();
		createFieldRecipe("demo", {
			base: { display: "flex", alignItems: "flex-start" },
		})(s);

		expect(findSelector(s, ".demo-field")).toBeDefined();
	});

	it("merges per-field extras and runs the extra setup", () => {
		const s = createInstance();
		const recipe = createFieldRecipe(
			"demo",
			{
				base: { display: "flex", alignItems: "flex-start" },
				variants: { tone: { a: {}, b: {} } },
				compoundVariants: [{ match: { tone: "a" }, className: "-tone-a" }],
				defaultVariants: { tone: "a" },
			},
			(s2) => {
				s2.selector(".demo-extra", { color: "red" });
			},
		)(s);

		// extra axis is added alongside the shared ones
		expect(Object.keys(recipe.variants!)).toContain("tone");
		expect(recipe.compoundVariants).toHaveLength(13); // 12 shared + 1 extra
		expect(recipe.defaultVariants).toMatchObject({
			color: "neutral",
			tone: "a",
		});
		expect(findSelector(s, ".demo-extra")).toBeDefined();
	});
});

describe("createFieldAddonRecipe", () => {
	it("uses the trailing padding edge for a prefix", () => {
		const s = createInstance();
		const recipe = createFieldAddonRecipe("demo-prefix", "paddingRight")(s);

		expect(recipe.name).toBe("demo-prefix");
		expect(recipe.variants!.size.md).toEqual({
			fontSize: "@font-size.sm",
			paddingRight: "@0.5",
			gap: "@0.375",
		});
	});

	it("uses the leading padding edge for a suffix", () => {
		const s = createInstance();
		const recipe = createFieldAddonRecipe("demo-suffix", "paddingLeft")(s);

		expect(recipe.variants!.size.md).toEqual({
			fontSize: "@font-size.sm",
			paddingLeft: "@0.5",
			gap: "@0.375",
		});
	});
});

describe("createFieldSlotRecipe", () => {
	it("builds a transparent slot with no variants", () => {
		const s = createInstance();
		const recipe = createFieldSlotRecipe("demo-prepend")(s);

		expect(recipe.name).toBe("demo-prepend");
		expect(recipe.base).toEqual({
			display: "inline-flex",
			alignItems: "center",
			flexShrink: "0",
		});
		expect(recipe.variants).toBeUndefined();
	});
});

describe("createFieldGroupRecipe", () => {
	it("builds a group and registers seam selectors named for the field", () => {
		const s = createInstance();
		const recipe = createFieldGroupRecipe("demo")(s);

		expect(recipe.name).toBe("demo-group");

		const groupSelector = findSelector(s, ".demo-group") as
			| { children: Array<{ type: string; query?: string }> }
			| undefined;
		expect(groupSelector).toBeDefined();

		for (const query of [
			".demo-prepend + .demo",
			".demo-prepend > *:first-child",
			".demo:has(+ .demo-append)",
			".demo-append > *:last-child",
		]) {
			const rule = groupSelector?.children.find(
				(child) => child.type === "selector" && child.query === query,
			);
			expect(rule, `missing seam rule: ${query}`).toBeDefined();
		}
	});
});
