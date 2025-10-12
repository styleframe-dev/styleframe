import type { Styleframe } from "@styleframe/core";

export function useBorderStyle(s: Styleframe, defaultBorderStyle = "solid") {
	const borderStyleNone = s.variable("border-style--none", "none", {
		default: true,
	});
	const borderStyleSolid = s.variable("border-style--solid", "solid", {
		default: true,
	});
	const borderStyleDashed = s.variable("border-style--dashed", "dashed", {
		default: true,
	});
	const borderStyleDotted = s.variable("border-style--dotted", "dotted", {
		default: true,
	});
	const borderStyleDouble = s.variable("border-style--double", "double", {
		default: true,
	});
	const borderStyleGroove = s.variable("border-style--groove", "groove", {
		default: true,
	});
	const borderStyleInset = s.variable("border-style--inset", "inset", {
		default: true,
	});
	const borderStyleOutset = s.variable("border-style--outset", "outset", {
		default: true,
	});

	const borderStyle = s.variable(
		"border-style",
		s.ref(`border-style--${defaultBorderStyle}`),
		{ default: true },
	);

	return {
		borderStyleNone,
		borderStyleSolid,
		borderStyleDashed,
		borderStyleDotted,
		borderStyleDouble,
		borderStyleGroove,
		borderStyleInset,
		borderStyleOutset,
		borderStyle,
	};
}
