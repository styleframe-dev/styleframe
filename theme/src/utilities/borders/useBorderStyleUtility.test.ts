import type { Utility } from "@styleframe/core";
import { isUtility, styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import { useBorderStyleUtility } from "./useBorderStyleUtility";

describe("useBorderStyleUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBorderStyleUtility(s, { solid: "solid", dashed: "dashed" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "border-style",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBorderStyleUtility(s, { solid: "solid" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ borderStyle: "solid" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBorderStyleUtility(s, { dotted: "dotted" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._border-style\\:dotted {");
		expect(css).toContain("border-style: dotted;");
	});

	it("should handle all style values", () => {
		const s = styleframe();
		useBorderStyleUtility(s, {
			solid: "solid",
			dashed: "dashed",
			dotted: "dotted",
			double: "double",
			hidden: "hidden",
			none: "none",
		});

		expect(s.root.children).toHaveLength(6);
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBorderStyleUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});
