import { useCalendarRecipe, useCalendarDayRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

export const calendar = useCalendarRecipe(s);
export const calendarDay = useCalendarDayRecipe(s);

// Layout selectors for story grid previews.
selector(".calendar-stories-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.xl",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".calendar-stories-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".calendar-stories-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	color: "@color.text-weak",
});

// Legend grid: a labelled row per day-cell state. `justify-items: start` keeps the
// day cells at their natural size instead of stretching to the widest column (which
// would inflate them via aspect-ratio).
selector(".calendar-legend", {
	display: "grid",
	gridTemplateColumns: "max-content max-content",
	gap: "@spacing.sm",
	alignItems: "center",
	justifyItems: "start",
	padding: "@spacing.md",
});

// Contiguous cells so the range start/middle/end read as one band.
selector(".calendar-legend-range", {
	display: "flex",
});

// Price label under the day number (the shadcn custom-cell-size pattern).
// Inherits the cell color so it stays legible on selected/range fills.
selector(".calendar-day-price", {
	fontSize: "@font-size.2xs",
	fontWeight: "@font-weight.normal",
	color: "inherit",
	opacity: "0.7",
});

// Custom cell size demo: override the cascaded variable on the calendar root.
selector(".calendar-cell-size-lg", {
	"--calendar-cell-size": "calc(var(--spacing) * 4)",
});

export default s;
