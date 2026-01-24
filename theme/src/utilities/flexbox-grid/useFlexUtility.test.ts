import type { Utility } from "@styleframe/core";
import { isUtility, styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	useFlexUtility,
	useFlexGrowUtility,
	useFlexShrinkUtility,
	useFlexBasisUtility,
} from "./useFlexUtility";

describe("useFlexUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useFlexUtility(s, { "1": "1 1 0%", auto: "1 1 auto" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "flex",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useFlexUtility(s, { "1": "1 1 0%" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ flex: "1 1 0%" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useFlexUtility(s, { none: "none" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._flex\\:none {");
		expect(css).toContain("flex: none;");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useFlexUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useFlexGrowUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useFlexGrowUtility(s, { "1": "1" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ flexGrow: "1" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useFlexGrowUtility(s, { "0": "0" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._flex-grow\\:0 {");
		expect(css).toContain("flex-grow: 0;");
	});
});

describe("useFlexShrinkUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useFlexShrinkUtility(s, { "1": "1" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ flexShrink: "1" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useFlexShrinkUtility(s, { "0": "0" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._flex-shrink\\:0 {");
		expect(css).toContain("flex-shrink: 0;");
	});
});

describe("useFlexBasisUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useFlexBasisUtility(s, { auto: "auto" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ flexBasis: "auto" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useFlexBasisUtility(s, { "1/2": "50%" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._flex-basis\\:1/2 {");
		expect(css).toContain("flex-basis: 50%;");
	});

	it("should handle pixel values", () => {
		const s = styleframe();
		useFlexBasisUtility(s, { "64": "16rem" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ flexBasis: "16rem" });
	});
});
