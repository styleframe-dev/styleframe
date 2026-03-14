import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultLinkValues = {
	color: "@color.primary",
	textDecoration: "none",
	hoverColor: "@color.primary-700",
	hoverTextDecoration: "underline",
} as const;

export interface LinkElementConfig {
	color?: TokenValue;
	textDecoration?: TokenValue;
	hoverColor?: TokenValue;
	hoverTextDecoration?: TokenValue;
}

export interface LinkElementResult {
	linkColor: Variable<"link.color">;
	linkTextDecoration: Variable<"link.text-decoration">;
	linkHoverColor: Variable<"link.hover.color">;
	linkHoverTextDecoration: Variable<"link.hover.text-decoration">;
}

export function useLinkElement(
	s: Styleframe,
	config: LinkElementConfig = {},
): LinkElementResult {
	const color = config.color ?? defaultLinkValues.color;
	const textDecoration =
		config.textDecoration ?? defaultLinkValues.textDecoration;
	const hoverColor = config.hoverColor ?? defaultLinkValues.hoverColor;
	const hoverTextDecoration =
		config.hoverTextDecoration ?? defaultLinkValues.hoverTextDecoration;

	const linkColor = s.variable("link.color", color);
	const linkTextDecoration = s.variable("link.text-decoration", textDecoration);
	const linkHoverColor = s.variable("link.hover.color", hoverColor);
	const linkHoverTextDecoration = s.variable(
		"link.hover.text-decoration",
		hoverTextDecoration,
	);

	s.selector("a", {
		color: s.ref(linkColor),
		textDecoration: s.ref(linkTextDecoration),
		"&:hover": {
			color: s.ref(linkHoverColor),
			textDecoration: s.ref(linkHoverTextDecoration),
		},
	});

	return {
		linkColor,
		linkTextDecoration,
		linkHoverColor,
		linkHoverTextDecoration,
	};
}
