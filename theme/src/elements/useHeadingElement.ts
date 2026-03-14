import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultHeadingValues = {
	fontFamily: "inherit",
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
	headingFontFamily: Variable<"heading.font-family">;
	headingFontWeight: Variable<"heading.font-weight">;
	headingLineHeight: Variable<"heading.line-height">;
	headingH1FontSize: Variable<"heading.h1.font-size">;
	headingH2FontSize: Variable<"heading.h2.font-size">;
	headingH3FontSize: Variable<"heading.h3.font-size">;
	headingH4FontSize: Variable<"heading.h4.font-size">;
	headingH5FontSize: Variable<"heading.h5.font-size">;
	headingH6FontSize: Variable<"heading.h6.font-size">;
}

export function useHeadingElement(
	s: Styleframe,
	config: HeadingElementConfig = {},
): HeadingElementResult {
	const color = config.color ?? defaultHeadingValues.color;
	const fontFamily = config.fontFamily ?? defaultHeadingValues.fontFamily;
	const fontWeight = config.fontWeight ?? defaultHeadingValues.fontWeight;
	const lineHeight = config.lineHeight ?? defaultHeadingValues.lineHeight;

	const headingColor = s.variable("heading.color", color);
	const headingFontFamily = s.variable("heading.font-family", fontFamily);
	const headingFontWeight = s.variable("heading.font-weight", fontWeight);
	const headingLineHeight = s.variable("heading.line-height", lineHeight);

	s.selector("h1, h2, h3, h4, h5, h6", {
		fontFamily: s.ref(headingFontFamily),
		fontWeight: s.ref(headingFontWeight),
		lineHeight: s.ref(headingLineHeight),
		color: s.ref(headingColor),
	});

	const customSizes = config.sizes ?? {};
	const sizeVariables = {} as Record<string, Variable<string>>;
	for (const tag of ["h1", "h2", "h3", "h4", "h5", "h6"] as const) {
		const fontSize: TokenValue =
			customSizes[tag] ?? defaultHeadingSizeRefs[tag];
		const sizeVar = s.variable(`heading.${tag}.font-size`, fontSize);
		sizeVariables[tag] = sizeVar;
		s.selector(tag, { fontSize: s.ref(sizeVar) });
	}

	return {
		headingColor,
		headingFontFamily,
		headingFontWeight,
		headingLineHeight,
		headingH1FontSize: sizeVariables.h1 as Variable<"heading.h1.font-size">,
		headingH2FontSize: sizeVariables.h2 as Variable<"heading.h2.font-size">,
		headingH3FontSize: sizeVariables.h3 as Variable<"heading.h3.font-size">,
		headingH4FontSize: sizeVariables.h4 as Variable<"heading.h4.font-size">,
		headingH5FontSize: sizeVariables.h5 as Variable<"heading.h5.font-size">,
		headingH6FontSize: sizeVariables.h6 as Variable<"heading.h6.font-size">,
	};
}
