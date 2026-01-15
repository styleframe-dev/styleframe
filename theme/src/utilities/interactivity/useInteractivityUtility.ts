import { createUseUtility } from "../../utils";

/**
 * Create accent-color utility classes.
 */
export const useAccentColorUtility = createUseUtility(
	"accent-color",
	({ value }) => ({
		accentColor: value,
	}),
);

/**
 * Default appearance utility values matching Tailwind CSS.
 */
export const defaultAppearanceValues = {
	none: "none",
	auto: "auto",
};

/**
 * Create appearance utility classes.
 */
export const useAppearanceUtility = createUseUtility(
	"appearance",
	({ value }) => ({
		appearance: value,
	}),
	{ defaults: defaultAppearanceValues },
);

/**
 * Create caret-color utility classes.
 */
export const useCaretColorUtility = createUseUtility(
	"caret-color",
	({ value }) => ({
		caretColor: value,
	}),
);

/**
 * Default color-scheme utility values matching Tailwind CSS.
 */
export const defaultColorSchemeValues = {
	normal: "normal",
	light: "light",
	dark: "dark",
	"light-dark": "light dark",
};

/**
 * Create color-scheme utility classes.
 */
export const useColorSchemeUtility = createUseUtility(
	"color-scheme",
	({ value }) => ({
		colorScheme: value,
	}),
	{ defaults: defaultColorSchemeValues },
);

/**
 * Default cursor utility values matching Tailwind CSS.
 */
export const defaultCursorValues = {
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
};

/**
 * Create cursor utility classes.
 */
export const useCursorUtility = createUseUtility(
	"cursor",
	({ value }) => ({
		cursor: value,
	}),
	{ defaults: defaultCursorValues },
);

/**
 * Default pointer-events utility values matching Tailwind CSS.
 */
export const defaultPointerEventsValues = {
	none: "none",
	auto: "auto",
};

/**
 * Create pointer-events utility classes.
 */
export const usePointerEventsUtility = createUseUtility(
	"pointer-events",
	({ value }) => ({
		pointerEvents: value,
	}),
	{ defaults: defaultPointerEventsValues },
);

/**
 * Default resize utility values matching Tailwind CSS.
 */
export const defaultResizeValues = {
	none: "none",
	y: "vertical",
	x: "horizontal",
	both: "both",
};

/**
 * Create resize utility classes.
 */
export const useResizeUtility = createUseUtility(
	"resize",
	({ value }) => ({
		resize: value,
	}),
	{ defaults: defaultResizeValues },
);

/**
 * Default scroll-behavior utility values matching Tailwind CSS.
 */
export const defaultScrollBehaviorValues = {
	auto: "auto",
	smooth: "smooth",
};

/**
 * Create scroll-behavior utility classes.
 */
export const useScrollBehaviorUtility = createUseUtility(
	"scroll-behavior",
	({ value }) => ({
		scrollBehavior: value,
	}),
	{ defaults: defaultScrollBehaviorValues },
);

/**
 * Default touch-action utility values matching Tailwind CSS.
 */
export const defaultTouchActionValues = {
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
};

/**
 * Create touch-action utility classes.
 */
export const useTouchActionUtility = createUseUtility(
	"touch-action",
	({ value }) => ({
		touchAction: value,
	}),
	{ defaults: defaultTouchActionValues },
);

/**
 * Default user-select utility values matching Tailwind CSS.
 */
export const defaultUserSelectValues = {
	none: "none",
	text: "text",
	all: "all",
	auto: "auto",
};

/**
 * Create user-select utility classes.
 */
export const useUserSelectUtility = createUseUtility(
	"user-select",
	({ value }) => ({
		userSelect: value,
	}),
	{ defaults: defaultUserSelectValues },
);

/**
 * Default will-change utility values matching Tailwind CSS.
 */
export const defaultWillChangeValues = {
	auto: "auto",
	scroll: "scroll-position",
	contents: "contents",
	transform: "transform",
};

/**
 * Create will-change utility classes.
 */
export const useWillChangeUtility = createUseUtility(
	"will-change",
	({ value }) => ({
		willChange: value,
	}),
	{ defaults: defaultWillChangeValues },
);
