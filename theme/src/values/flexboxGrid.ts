/**
 * Default flex utility values matching Tailwind CSS.
 */
export const flexValues = {
	"1": "1 1 0%",
	auto: "1 1 auto",
	initial: "0 1 auto",
	none: "none",
} as const;

/**
 * Default flex-direction utility values matching Tailwind CSS.
 */
export const flexDirectionValues = {
	row: "row",
	"row-reverse": "row-reverse",
	col: "column",
	"col-reverse": "column-reverse",
} as const;

/**
 * Default flex-wrap utility values matching Tailwind CSS.
 */
export const flexWrapValues = {
	wrap: "wrap",
	"wrap-reverse": "wrap-reverse",
	nowrap: "nowrap",
} as const;

/**
 * Default justify-content utility values matching Tailwind CSS.
 */
export const justifyContentValues = {
	normal: "normal",
	start: "flex-start",
	end: "flex-end",
	center: "center",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	stretch: "stretch",
} as const;

/**
 * Default justify-items utility values matching Tailwind CSS.
 */
export const justifyItemsValues = {
	start: "start",
	end: "end",
	center: "center",
	stretch: "stretch",
} as const;

/**
 * Default justify-self utility values matching Tailwind CSS.
 */
export const justifySelfValues = {
	auto: "auto",
	start: "start",
	end: "end",
	center: "center",
	stretch: "stretch",
} as const;

/**
 * Default align-content utility values matching Tailwind CSS.
 */
export const alignContentValues = {
	normal: "normal",
	center: "center",
	start: "flex-start",
	end: "flex-end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	baseline: "baseline",
	stretch: "stretch",
} as const;

/**
 * Default align-items utility values matching Tailwind CSS.
 */
export const alignItemsValues = {
	start: "flex-start",
	end: "flex-end",
	center: "center",
	baseline: "baseline",
	stretch: "stretch",
} as const;

/**
 * Default align-self utility values matching Tailwind CSS.
 */
export const alignSelfValues = {
	auto: "auto",
	start: "flex-start",
	end: "flex-end",
	center: "center",
	stretch: "stretch",
	baseline: "baseline",
} as const;

/**
 * Default place-content utility values matching Tailwind CSS.
 */
export const placeContentValues = {
	center: "center",
	start: "start",
	end: "end",
	between: "space-between",
	around: "space-around",
	evenly: "space-evenly",
	baseline: "baseline",
	stretch: "stretch",
} as const;

/**
 * Default place-items utility values matching Tailwind CSS.
 */
export const placeItemsValues = {
	start: "start",
	end: "end",
	center: "center",
	baseline: "baseline",
	stretch: "stretch",
} as const;

/**
 * Default place-self utility values matching Tailwind CSS.
 */
export const placeSelfValues = {
	auto: "auto",
	start: "start",
	end: "end",
	center: "center",
	stretch: "stretch",
} as const;

/**
 * Default grid-auto-flow utility values matching Tailwind CSS.
 */
export const gridAutoFlowValues = {
	row: "row",
	col: "column",
	dense: "dense",
	"row-dense": "row dense",
	"col-dense": "column dense",
} as const;
