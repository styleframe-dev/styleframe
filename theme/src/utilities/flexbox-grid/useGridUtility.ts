import { createUseUtility } from "../../utils";

/**
 * Create grid-template-columns utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useGridTemplateColumnsUtility(s, {
 *     '1': 'repeat(1, minmax(0, 1fr))',
 *     '2': 'repeat(2, minmax(0, 1fr))',
 *     '3': 'repeat(3, minmax(0, 1fr))',
 *     none: 'none',
 *     subgrid: 'subgrid',
 * });
 * ```
 */
export const useGridTemplateColumnsUtility = createUseUtility(
	"grid-cols",
	({ value }) => ({
		gridTemplateColumns: value,
	}),
);

/**
 * Create grid-column utility classes (span).
 */
export const useGridColumnUtility = createUseUtility("col", ({ value }) => ({
	gridColumn: value,
}));

/**
 * Create grid-column-start utility classes.
 */
export const useGridColumnStartUtility = createUseUtility(
	"col-start",
	({ value }) => ({
		gridColumnStart: value,
	}),
);

/**
 * Create grid-column-end utility classes.
 */
export const useGridColumnEndUtility = createUseUtility(
	"col-end",
	({ value }) => ({
		gridColumnEnd: value,
	}),
);

/**
 * Create grid-template-rows utility classes.
 */
export const useGridTemplateRowsUtility = createUseUtility(
	"grid-rows",
	({ value }) => ({
		gridTemplateRows: value,
	}),
);

/**
 * Create grid-row utility classes.
 */
export const useGridRowUtility = createUseUtility("row", ({ value }) => ({
	gridRow: value,
}));

/**
 * Create grid-row-start utility classes.
 */
export const useGridRowStartUtility = createUseUtility(
	"row-start",
	({ value }) => ({
		gridRowStart: value,
	}),
);

/**
 * Create grid-row-end utility classes.
 */
export const useGridRowEndUtility = createUseUtility(
	"row-end",
	({ value }) => ({
		gridRowEnd: value,
	}),
);

/**
 * Default grid-auto-flow utility values matching Tailwind CSS.
 */
export const defaultGridAutoFlowValues = {
	row: "row",
	col: "column",
	dense: "dense",
	"row-dense": "row dense",
	"col-dense": "column dense",
};

/**
 * Create grid-auto-flow utility classes.
 */
export const useGridAutoFlowUtility = createUseUtility(
	"grid-flow",
	({ value }) => ({
		gridAutoFlow: value,
	}),
	{ defaults: defaultGridAutoFlowValues },
);

/**
 * Create grid-auto-columns utility classes.
 */
export const useGridAutoColumnsUtility = createUseUtility(
	"auto-cols",
	({ value }) => ({
		gridAutoColumns: value,
	}),
);

/**
 * Create grid-auto-rows utility classes.
 */
export const useGridAutoRowsUtility = createUseUtility(
	"auto-rows",
	({ value }) => ({
		gridAutoRows: value,
	}),
);
