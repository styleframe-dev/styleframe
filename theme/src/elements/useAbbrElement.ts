import type { Styleframe, TokenValue, Variable } from "@styleframe/core";

export const defaultAbbrValues = {
	cursor: "help",
	textDecoration: "underline dotted",
} as const;

export interface AbbrElementConfig {
	cursor?: TokenValue;
	textDecoration?: TokenValue;
}

export interface AbbrElementResult {
	abbrCursor: Variable<"abbr.cursor">;
	abbrTextDecoration: Variable<"abbr.text-decoration">;
}

export function useAbbrElement(
	s: Styleframe,
	config: AbbrElementConfig = {},
): AbbrElementResult {
	const cursor = config.cursor ?? defaultAbbrValues.cursor;
	const textDecoration =
		config.textDecoration ?? defaultAbbrValues.textDecoration;

	const abbrCursor = s.variable("abbr.cursor", cursor);
	const abbrTextDecoration = s.variable("abbr.text-decoration", textDecoration);

	s.selector("abbr[title]", {
		cursor: s.ref(abbrCursor),
		textDecorationSkipInk: "none",
		textDecoration: s.ref(abbrTextDecoration),
	});

	return { abbrCursor, abbrTextDecoration };
}
