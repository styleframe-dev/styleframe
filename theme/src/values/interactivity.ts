/**
 * Default appearance utility values matching Tailwind CSS.
 */
export const appearanceValues = {
	none: "none",
	auto: "auto",
} as const;

/**
 * Default color-scheme utility values matching Tailwind CSS.
 */
export const colorSchemeValues = {
	normal: "normal",
	light: "light",
	dark: "dark",
	"light-dark": "light dark",
} as const;

/**
 * Default cursor utility values matching Tailwind CSS.
 */
export const cursorValues = {
	auto: "auto",
	default: "default",
	pointer: "pointer",
	wait: "wait",
	text: "text",
	move: "move",
	help: "help",
	"not-allowed": "not-allowed",
	none: "none",
	"context-menu": "context-menu",
	progress: "progress",
	cell: "cell",
	crosshair: "crosshair",
	"vertical-text": "vertical-text",
	alias: "alias",
	copy: "copy",
	"no-drop": "no-drop",
	grab: "grab",
	grabbing: "grabbing",
	"all-scroll": "all-scroll",
	"col-resize": "col-resize",
	"row-resize": "row-resize",
	"n-resize": "n-resize",
	"e-resize": "e-resize",
	"s-resize": "s-resize",
	"w-resize": "w-resize",
	"ne-resize": "ne-resize",
	"nw-resize": "nw-resize",
	"se-resize": "se-resize",
	"sw-resize": "sw-resize",
	"ew-resize": "ew-resize",
	"ns-resize": "ns-resize",
	"nesw-resize": "nesw-resize",
	"nwse-resize": "nwse-resize",
	"zoom-in": "zoom-in",
	"zoom-out": "zoom-out",
} as const;

/**
 * Default pointer-events utility values matching Tailwind CSS.
 */
export const pointerEventsValues = {
	none: "none",
	auto: "auto",
} as const;

/**
 * Default resize utility values matching Tailwind CSS.
 */
export const resizeValues = {
	none: "none",
	y: "vertical",
	x: "horizontal",
	both: "both",
} as const;

/**
 * Default scroll-behavior utility values matching Tailwind CSS.
 */
export const scrollBehaviorValues = {
	auto: "auto",
	smooth: "smooth",
} as const;

/**
 * Default touch-action utility values matching Tailwind CSS.
 */
export const touchActionValues = {
	auto: "auto",
	none: "none",
	"pan-x": "pan-x",
	"pan-left": "pan-left",
	"pan-right": "pan-right",
	"pan-y": "pan-y",
	"pan-up": "pan-up",
	"pan-down": "pan-down",
	"pinch-zoom": "pinch-zoom",
	manipulation: "manipulation",
} as const;

/**
 * Default user-select utility values matching Tailwind CSS.
 */
export const userSelectValues = {
	none: "none",
	text: "text",
	all: "all",
	auto: "auto",
} as const;

/**
 * Default will-change utility values matching Tailwind CSS.
 */
export const willChangeValues = {
	auto: "auto",
	scroll: "scroll-position",
	contents: "contents",
	transform: "transform",
} as const;

/**
 * Default scroll-snap-align utility values matching Tailwind CSS.
 */
export const scrollSnapAlignValues = {
	start: "start",
	end: "end",
	center: "center",
	"align-none": "none",
} as const;

/**
 * Default scroll-snap-stop utility values matching Tailwind CSS.
 */
export const scrollSnapStopValues = {
	normal: "normal",
	always: "always",
} as const;

/**
 * Default scroll-snap-type utility values matching Tailwind CSS.
 */
export const scrollSnapTypeValues = {
	none: "none",
	x: "x var(--tw-scroll-snap-strictness)",
	y: "y var(--tw-scroll-snap-strictness)",
	both: "both var(--tw-scroll-snap-strictness)",
	mandatory: "mandatory",
	proximity: "proximity",
} as const;
