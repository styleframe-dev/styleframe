import { createUseUtility } from "../../utils";

/**
 * Default flex utility values matching Tailwind CSS.
 */
export const defaultFlexValues = {
	"1": "1 1 0%",
	auto: "1 1 auto",
	initial: "0 1 auto",
	none: "none",
};

/**
 * Create flex utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useFlexUtility(s);
 * // Uses defaults: ._flex:1, ._flex:auto, ._flex:initial, ._flex:none
 * ```
 */
export const useFlexUtility = createUseUtility(
	"flex",
	({ value }) => ({
		flex: value,
	}),
	{ defaults: defaultFlexValues },
);

/**
 * Create flex-grow utility classes.
 */
export const useFlexGrowUtility = createUseUtility(
	"flex-grow",
	({ value }) => ({
		flexGrow: value,
	}),
);

/**
 * Create flex-shrink utility classes.
 */
export const useFlexShrinkUtility = createUseUtility(
	"flex-shrink",
	({ value }) => ({
		flexShrink: value,
	}),
);

/**
 * Create flex-basis utility classes.
 */
export const useFlexBasisUtility = createUseUtility(
	"flex-basis",
	({ value }) => ({
		flexBasis: value,
	}),
);
