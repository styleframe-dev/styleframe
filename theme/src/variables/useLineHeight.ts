import type { Styleframe } from "@styleframe/core";

export function useLineHeight(s: Styleframe, defaultLineHeight = "normal") {
	const lineHeightTight = s.variable("line-height--tight", 1.2, {
		default: true,
	});
	const lineHeightSnug = s.variable("line-height--snug", 1.35, {
		default: true,
	});
	const lineHeightNormal = s.variable("line-height--normal", 1.5, {
		default: true,
	});
	const lineHeightRelaxed = s.variable("line-height--relaxed", 1.65, {
		default: true,
	});
	const lineHeightLoose = s.variable("line-height--loose", 1.9, {
		default: true,
	});

	const lineHeight = s.variable(
		"line-height",
		s.ref(`line-height--${defaultLineHeight}`),
		{
			default: true,
		},
	);

	return {
		lineHeightTight,
		lineHeightSnug,
		lineHeightNormal,
		lineHeightRelaxed,
		lineHeightLoose,
		lineHeight,
	};
}
