import type { Utility } from "@styleframe/core";
import { isUtility, styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	useBackgroundImageUtility,
	useGradientFromUtility,
	useGradientViaUtility,
	useGradientToUtility,
} from "./useBackgroundImageUtility";

describe("useBackgroundImageUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackgroundImageUtility(s, {
			none: "none",
			"gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
		});

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "background-image",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackgroundImageUtility(s, { none: "none" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({ backgroundImage: "none" });
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackgroundImageUtility(s, {
			"gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
		});

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._background-image\\:gradient-to-r {");
		expect(css).toContain(
			"background-image: linear-gradient(to right, var(--tw-gradient-stops));",
		);
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackgroundImageUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useGradientFromUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useGradientFromUtility(s, { red: "red", blue: "blue" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "gradient-from",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useGradientFromUtility(s, { red: "red" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-gradient-from": "red var(--tw-gradient-from-position)",
			"--tw-gradient-to": "transparent var(--tw-gradient-to-position)",
			"--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useGradientFromUtility(s, { blue: "blue" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._gradient-from\\:blue {");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useGradientFromUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useGradientViaUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useGradientViaUtility(s, { red: "red", blue: "blue" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "gradient-via",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useGradientViaUtility(s, { green: "green" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-gradient-to": "transparent var(--tw-gradient-to-position)",
			"--tw-gradient-stops":
				"var(--tw-gradient-from), green var(--tw-gradient-via-position), var(--tw-gradient-to)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useGradientViaUtility(s, { yellow: "yellow" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._gradient-via\\:yellow {");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useGradientViaUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useGradientToUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useGradientToUtility(s, { red: "red", blue: "blue" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "gradient-to",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useGradientToUtility(s, { purple: "purple" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-gradient-to": "purple var(--tw-gradient-to-position)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useGradientToUtility(s, { orange: "orange" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._gradient-to\\:orange {");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useGradientToUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});
