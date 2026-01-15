import { createUseUtility } from "../../utils";

/**
 * Default display utility values matching Tailwind CSS.
 */
export const defaultDisplayValues = {
	block: "block",
	"inline-block": "inline-block",
	inline: "inline",
	flex: "flex",
	"inline-flex": "inline-flex",
	table: "table",
	"inline-table": "inline-table",
	"table-caption": "table-caption",
	"table-cell": "table-cell",
	"table-column": "table-column",
	"table-column-group": "table-column-group",
	"table-footer-group": "table-footer-group",
	"table-header-group": "table-header-group",
	"table-row-group": "table-row-group",
	"table-row": "table-row",
	"flow-root": "flow-root",
	grid: "grid",
	"inline-grid": "inline-grid",
	contents: "contents",
	"list-item": "list-item",
	hidden: "none",
};

/**
 * Create display utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useDisplayUtility(s, { flex: 'flex', block: 'block', hidden: 'none' });
 * // Generates: ._display:flex, ._display:block, ._display:hidden
 * ```
 */
export const useDisplayUtility = createUseUtility(
	"display",
	({ value }) => ({
		display: value,
	}),
	{ defaults: defaultDisplayValues },
);
