import type { Styleframe } from "@styleframe/core";

export function useBorderWidth(s: Styleframe, defaultBorderWidth = "thin") {
	const borderWidthNone = s.variable("border-width--none", 0, {
		default: true,
	});
	const borderWidthThin = s.variable("border-width--thin", "thin", {
		default: true,
	});
	const borderWidthMedium = s.variable("border-width--medium", "medium", {
		default: true,
	});
	const borderWidthThick = s.variable("border-width--thick", "thick", {
		default: true,
	});
	const borderWidth = s.variable(
		"border-width",
		s.ref(`border-width--${defaultBorderWidth}`),
		{ default: true },
	);

	return {
		borderWidthNone,
		borderWidthThin,
		borderWidthMedium,
		borderWidthThick,
		borderWidth,
	};
}
