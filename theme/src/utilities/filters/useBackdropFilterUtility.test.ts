import type { Utility } from "@styleframe/core";
import { isUtility, styleframe } from "@styleframe/core";
import { consumeCSS } from "@styleframe/transpiler";
import {
	useBackdropBlurUtility,
	useBackdropBrightnessUtility,
	useBackdropContrastUtility,
	useBackdropGrayscaleUtility,
	useBackdropHueRotateUtility,
	useBackdropInvertUtility,
	useBackdropOpacityUtility,
	useBackdropSaturateUtility,
	useBackdropSepiaUtility,
} from "./useBackdropFilterUtility";

describe("useBackdropBlurUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropBlurUtility(s, { sm: "4px", md: "8px" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-blur",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropBlurUtility(s, { sm: "4px" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-blur": "blur(4px)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropBlurUtility(s, { sm: "4px" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-blur\\:sm {");
		expect(css).toContain("--tw-backdrop-blur: blur(4px);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropBlurUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropBrightnessUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropBrightnessUtility(s, { "50": "0.5", "100": "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-brightness",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropBrightnessUtility(s, { "50": "0.5" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-brightness": "brightness(0.5)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropBrightnessUtility(s, { "50": "0.5" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-brightness\\:50 {");
		expect(css).toContain("--tw-backdrop-brightness: brightness(0.5);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropBrightnessUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropContrastUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropContrastUtility(s, { "50": "0.5", "100": "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-contrast",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropContrastUtility(s, { "100": "1" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-contrast": "contrast(1)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropContrastUtility(s, { "100": "1" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-contrast\\:100 {");
		expect(css).toContain("--tw-backdrop-contrast: contrast(1);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropContrastUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropGrayscaleUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropGrayscaleUtility(s, { "0": "0", "100": "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-grayscale",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropGrayscaleUtility(s, { default: "1" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-grayscale": "grayscale(1)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropGrayscaleUtility(s, { full: "1" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-grayscale\\:full {");
		expect(css).toContain("--tw-backdrop-grayscale: grayscale(1);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropGrayscaleUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropHueRotateUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropHueRotateUtility(s, { "15": "15deg", "30": "30deg" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-hue-rotate",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropHueRotateUtility(s, { "90": "90deg" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-hue-rotate": "hue-rotate(90deg)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropHueRotateUtility(s, { "90": "90deg" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-hue-rotate\\:90 {");
		expect(css).toContain("--tw-backdrop-hue-rotate: hue-rotate(90deg);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropHueRotateUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropInvertUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropInvertUtility(s, { "0": "0", default: "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-invert",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropInvertUtility(s, { full: "1" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-invert": "invert(1)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropInvertUtility(s, { full: "1" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-invert\\:full {");
		expect(css).toContain("--tw-backdrop-invert: invert(1);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropInvertUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropOpacityUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropOpacityUtility(s, { "50": "0.5", "100": "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-opacity",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropOpacityUtility(s, { "75": "0.75" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-opacity": "opacity(0.75)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropOpacityUtility(s, { "75": "0.75" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-opacity\\:75 {");
		expect(css).toContain("--tw-backdrop-opacity: opacity(0.75);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropOpacityUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropSaturateUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropSaturateUtility(s, { "50": "0.5", "100": "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-saturate",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropSaturateUtility(s, { "150": "1.5" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-saturate": "saturate(1.5)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropSaturateUtility(s, { "150": "1.5" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-saturate\\:150 {");
		expect(css).toContain("--tw-backdrop-saturate: saturate(1.5);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropSaturateUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});

describe("useBackdropSepiaUtility", () => {
	it("should create utility instances with provided values", () => {
		const s = styleframe();
		useBackdropSepiaUtility(s, { "0": "0", default: "1" });

		const utilities = s.root.children.filter(
			(u): u is Utility => isUtility(u) && u.name === "backdrop-sepia",
		);
		expect(utilities).toHaveLength(2);
	});

	it("should set correct declarations", () => {
		const s = styleframe();
		useBackdropSepiaUtility(s, { full: "1" });

		const utility = s.root.children[0] as Utility;
		expect(utility.declarations).toEqual({
			"--tw-backdrop-sepia": "sepia(1)",
			backdropFilter:
				"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
		});
	});

	it("should compile to correct CSS output", () => {
		const s = styleframe();
		useBackdropSepiaUtility(s, { full: "1" });

		const css = consumeCSS(s.root, s.options);
		expect(css).toContain("._backdrop-sepia\\:full {");
		expect(css).toContain("--tw-backdrop-sepia: sepia(1);");
	});

	it("should handle empty values object", () => {
		const s = styleframe();
		useBackdropSepiaUtility(s, {});

		expect(s.root.children).toHaveLength(0);
	});
});
