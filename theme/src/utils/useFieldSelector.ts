import type { Styleframe } from "@styleframe/core";

/**
 * Registers the shared reset for the transparent native control nested inside a
 * field wrapper (`.input-field`, `.textarea-field`). The control is transparent,
 * borderless, and has no padding of its own &mdash; it inherits typography and
 * color from the wrapper, which owns the visual field.
 *
 * The `query` argument lets each field recipe target its own nested element, so
 * the same reset backs both the input and textarea recipes.
 */
export function useFieldSelector(s: Styleframe, query: string) {
	const { selector } = s;

	selector(query, {
		flexGrow: "1",
		minWidth: "0",
		width: "100%",
		background: "transparent",
		border: "none",
		outline: "none",
		padding: "0",
		color: "inherit",
		fontFamily: "inherit",
		fontSize: "inherit",
		fontWeight: "inherit",
		lineHeight: "inherit",
		"&::placeholder": {
			color: "@color.text-weakest",
		},
	});
}
