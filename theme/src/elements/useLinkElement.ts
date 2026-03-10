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
	linkHoverColor: Variable<"link.hover-color">;
}

export function useLinkElement(
	s: Styleframe,
	config: LinkElementConfig = {},
): LinkElementResult {
	const color = config.color ?? defaultLinkValues.color;
	const hoverColor = config.hoverColor ?? defaultLinkValues.hoverColor;

	const linkColor = s.variable("link.color", color);
	const linkHoverColor = s.variable("link.hover-color", hoverColor);

	s.selector("a", {
		color: s.ref(linkColor),
		textDecoration: config.textDecoration ?? defaultLinkValues.textDecoration,
		"&:hover": {
			color: s.ref(linkHoverColor),
			textDecoration:
				config.hoverTextDecoration ?? defaultLinkValues.hoverTextDecoration,
		},
	});

	return { linkColor, linkHoverColor };
}
