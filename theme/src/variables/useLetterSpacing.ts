import type { Styleframe } from "@styleframe/core";

export function useLetterSpacing(
	s: Styleframe,
	defaultLetterSpacing = "normal",
) {
	const letterSpacingTighter = s.variable(
		"letter-spacing--tighter",
		"-0.05em",
		{
			default: true,
		},
	);
	const letterSpacingTight = s.variable("letter-spacing--tight", "-0.025em", {
		default: true,
	});
	const letterSpacingNormal = s.variable("letter-spacing--normal", "normal", {
		default: true,
	});
	const letterSpacingWide = s.variable("letter-spacing--wide", "0.05em", {
		default: true,
	});
	const letterSpacingWider = s.variable("letter-spacing--wider", "0.1em", {
		default: true,
	});

	const letterSpacing = s.variable(
		"letter-spacing",
		s.ref(`letter-spacing--${defaultLetterSpacing}`),
		{
			default: true,
		},
	);

	return {
		letterSpacingTighter,
		letterSpacingTight,
		letterSpacingNormal,
		letterSpacingWide,
		letterSpacingWider,
		letterSpacing,
	};
}
