import type { Styleframe } from "@styleframe/core";

export function useFontWeight(s: Styleframe, defaultFontWeight = "normal") {
	const fontWeightExtralight = s.variable("font-weight--extralight", 200, {
		default: true,
	});
	const fontWeightLight = s.variable("font-weight--light", 300, {
		default: true,
	});
	const fontWeightNormal = s.variable("font-weight--normal", "normal", {
		default: true,
	});
	const fontWeightMedium = s.variable("font-weight--medium", 500, {
		default: true,
	});
	const fontWeightSemibold = s.variable("font-weight--semibold", 600, {
		default: true,
	});
	const fontWeightBold = s.variable("font-weight--bold", "bold", {
		default: true,
	});
	const fontWeightBlack = s.variable("font-weight--black", 900, {
		default: true,
	});
	const fontWeightLighter = s.variable("font-weight--lighter", "lighter", {
		default: true,
	});
	const fontWeightBolder = s.variable("font-weight--bolder", "bolder", {
		default: true,
	});

	const fontWeight = s.variable(
		"font-weight",
		s.ref(`font-weight--${defaultFontWeight}`),
		{
			default: true,
		},
	);

	return {
		fontWeightExtralight,
		fontWeightLight,
		fontWeightNormal,
		fontWeightMedium,
		fontWeightSemibold,
		fontWeightBold,
		fontWeightBlack,
		fontWeightLighter,
		fontWeightBolder,
		fontWeight,
	};
}
