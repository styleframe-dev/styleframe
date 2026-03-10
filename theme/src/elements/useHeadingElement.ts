import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultHeadingValues = {
	fontWeight: "@font-weight.bold",
	lineHeight: "@line-height.tight",
	color: "inherit",
} as const;

export const defaultHeadingSizeRefs = {
	h1: "@font-size.4xl",
	h2: "@font-size.3xl",
	h3: "@font-size.2xl",
	h4: "@font-size.xl",
	h5: "@font-size.lg",
	h6: "@font-size.md",
} as const;

export interface HeadingElementConfig {
	fontFamily?: TokenValue;
	fontWeight?: TokenValue;
	lineHeight?: TokenValue;
	color?: string;
	sizes?: Partial<Record<"h1" | "h2" | "h3" | "h4" | "h5" | "h6", TokenValue>>;
}

export interface HeadingElementResult {
	headingColor: Variable<"heading.color">;
}

export function useHeadingElement(
	s: Styleframe,
	config: HeadingElementConfig = {},
): HeadingElementResult {
	const color = config.color ?? defaultHeadingValues.color;
	const headingColor = s.variable("heading.color", color);

	const sharedDeclarations: Record<string, TokenValue> = {
		fontWeight: config.fontWeight ?? defaultHeadingValues.fontWeight,
		lineHeight: config.lineHeight ?? defaultHeadingValues.lineHeight,
		color: s.ref(headingColor),
	};

	if (config.fontFamily) {
		sharedDeclarations.fontFamily = config.fontFamily;
	}

	s.selector("h1, h2, h3, h4, h5, h6", sharedDeclarations);

	const customSizes = config.sizes ?? {};
	for (const tag of ["h1", "h2", "h3", "h4", "h5", "h6"] as const) {
		const fontSize: TokenValue =
			customSizes[tag] ?? defaultHeadingSizeRefs[tag];
		s.selector(tag, { fontSize });
	}

	return { headingColor };
}
