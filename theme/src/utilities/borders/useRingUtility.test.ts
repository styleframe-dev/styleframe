import type { Utility } from "@styleframe/core";
import { isUtility, styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	useRingWidthUtility,
	useRingInsetUtility,
	useRingColorUtility,
	useRingOffsetWidthUtility,
	useRingOffsetColorUtility,
} from "./useRingUtility";

describe("useRingWidthUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useRingWidthUtility(s, { "0": "0px", "2": "2px" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "ring",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations including CSS variables", () => {
		const s = styleframe();
		useRingWidthUtility(s, { "2": "2px" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toHaveProperty("--tw-ring-offset-shadow");
		expect(utility.declarations).toHaveProperty("--tw-ring-shadow");
		expect(utility.declarations).toHaveProperty("boxShadow");
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useRingWidthUtility(s, { "4": "4px" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._ring\\:4 {");
		expect(css).toContain("box-shadow:");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useRingWidthUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useRingInsetUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useRingInsetUtility(s, { default: true });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ "--tw-ring-inset": "inset" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useRingInsetUtility(s, { default: true });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._ring-inset {");
	});
});

describe("useRingColorUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useRingColorUtility(s, { blue: "blue" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ "--tw-ring-color": "blue" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useRingColorUtility(s, { red: "#ef4444" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._ring-color\\:red {");
	});
});

describe("useRingOffsetWidthUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useRingOffsetWidthUtility(s, { "2": "2px" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ "--tw-ring-offset-width": "2px" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useRingOffsetWidthUtility(s, { "4": "4px" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._ring-offset\\:4 {");
	});
});

describe("useRingOffsetColorUtility", () => {
	it("should set correct declarations", () => {
		const s = styleframe();
		useRingOffsetColorUtility(s, { white: "white" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ "--tw-ring-offset-color": "white" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useRingOffsetColorUtility(s, { black: "#000" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._ring-offset-color\\:black {");
	});
});
