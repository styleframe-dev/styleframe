import type { Utility } from "@styleframe/core";
import { isUtility, styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useAnimationUtility } from "./useAnimationUtility";

describe("useAnimationUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useAnimationUtility(s, { spin: "spin 1s linear infinite" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "animation",
		);
		expect(utilities).toHaveLength(1);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useAnimationUtility(s, { spin: "spin 1s linear infinite" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			animation: "spin 1s linear infinite",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useAnimationUtility(s, { spin: "spin 1s linear infinite" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._animation\\:spin {");
		expect(css).toContain("animation: spin 1s linear infinite;");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useAnimationUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});
