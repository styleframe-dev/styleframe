import type {
	DeclarationsCallbackContext,
	Styleframe,
	TokenValue,
	Variable,
} from "@styleframe/core";

export const defaultLinkConfig = {
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

export function useLinkDesignTokens(
	ctx: DeclarationsCallbackContext,
	config: LinkElementConfig = {},
): Partial<LinkElementResult> {
	const result: Partial<LinkElementResult> = {};

	if (config.color !== undefined)
		result.linkColor = ctx.variable("link.color", config.color);
	if (config.textDecoration !== undefined)
		result.linkTextDecoration = ctx.variable(
			"link.text-decoration",
			config.textDecoration,
		);
	if (config.hoverColor !== undefined)
		result.linkHoverColor = ctx.variable("link.hover.color", config.hoverColor);
	if (config.hoverTextDecoration !== undefined)
		result.linkHoverTextDecoration = ctx.variable(
			"link.hover.text-decoration",
			config.hoverTextDecoration,
		);

	return result;
}

export function useLinkSelectors(
	ctx: DeclarationsCallbackContext,
	config: Required<LinkElementConfig>,
): LinkElementResult {
	const result = useLinkDesignTokens(ctx, config) as LinkElementResult;

	ctx.selector("a", {
		color: ctx.ref(result.linkColor),
		textDecoration: ctx.ref(result.linkTextDecoration),
		"&:hover": {
			color: ctx.ref(result.linkHoverColor),
			textDecoration: ctx.ref(result.linkHoverTextDecoration),
		},
	});

	return result;
}

export function useLinkElement(
	s: Styleframe,
	config: LinkElementConfig = {},
): LinkElementResult {
	return useLinkSelectors(s, {
		color: config.color ?? defaultLinkConfig.color,
		textDecoration: config.textDecoration ?? defaultLinkConfig.textDecoration,
		hoverColor: config.hoverColor ?? defaultLinkConfig.hoverColor,
		hoverTextDecoration:
			config.hoverTextDecoration ?? defaultLinkConfig.hoverTextDecoration,
	});
}
