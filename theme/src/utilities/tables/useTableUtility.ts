import { createUseUtility } from "../../utils";

/**
 * Default border-collapse utility values matching Tailwind CSS.
 */
export const defaultBorderCollapseValues = {
	collapse: "collapse",
	separate: "separate",
};

/**
 * Create border-collapse utility classes.
 */
export const useBorderCollapseUtility = createUseUtility(
	"border-collapse",
	({ value }) => ({
		borderCollapse: value,
	}),
	{ defaults: defaultBorderCollapseValues },
);

/**
 * Create border-spacing utility classes.
 */
export const useBorderSpacingUtility = createUseUtility(
	"border-spacing",
	({ value }) => ({
		borderSpacing: value,
	}),
);

/**
 * Create border-spacing-x utility classes.
 */
export const useBorderSpacingXUtility = createUseUtility(
	"border-spacing-x",
	({ value }) => ({
		borderSpacing: `${value} var(--tw-border-spacing-y, 0)`,
	}),
);

/**
 * Create border-spacing-y utility classes.
 */
export const useBorderSpacingYUtility = createUseUtility(
	"border-spacing-y",
	({ value }) => ({
		borderSpacing: `var(--tw-border-spacing-x, 0) ${value}`,
	}),
);

/**
 * Default table-layout utility values matching Tailwind CSS.
 */
export const defaultTableLayoutValues = {
	auto: "auto",
	fixed: "fixed",
};

/**
 * Create table-layout utility classes.
 */
export const useTableLayoutUtility = createUseUtility(
	"table-layout",
	({ value }) => ({
		tableLayout: value,
	}),
	{ defaults: defaultTableLayoutValues },
);

/**
 * Default caption-side utility values matching Tailwind CSS.
 */
export const defaultCaptionSideValues = {
	top: "top",
	bottom: "bottom",
};

/**
 * Create caption-side utility classes.
 */
export const useCaptionSideUtility = createUseUtility(
	"caption-side",
	({ value }) => ({
		captionSide: value,
	}),
	{ defaults: defaultCaptionSideValues },
);
