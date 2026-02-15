import { createUseUtility } from "../../utils";
import {
	appearanceValues,
	colorSchemeValues,
	cursorValues,
	pointerEventsValues,
	resizeValues,
	scrollBehaviorValues,
	touchActionValues,
	userSelectValues,
	willChangeValues,
} from "../../values";

/**
 * Create accent-color utility classes.
 */
export const useAccentColorUtility = createUseUtility(
	"accent-color",
	({ value }) => ({
		accentColor: value,
	}),
	{ namespace: ["accent-color", "color"] },
);

/**
 * Create appearance utility classes.
 */
export const useAppearanceUtility = createUseUtility(
	"appearance",
	({ value }) => ({
		appearance: value,
	}),
	{ defaults: appearanceValues },
);

/**
 * Create caret-color utility classes.
 */
export const useCaretColorUtility = createUseUtility(
	"caret-color",
	({ value }) => ({
		caretColor: value,
	}),
	{ namespace: ["caret-color", "color"] },
);

/**
 * Create color-scheme utility classes.
 */
export const useColorSchemeUtility = createUseUtility(
	"color-scheme",
	({ value }) => ({
		colorScheme: value,
	}),
	{ defaults: colorSchemeValues },
);

/**
 * Create cursor utility classes.
 */
export const useCursorUtility = createUseUtility(
	"cursor",
	({ value }) => ({
		cursor: value,
	}),
	{ defaults: cursorValues },
);

/**
 * Create pointer-events utility classes.
 */
export const usePointerEventsUtility = createUseUtility(
	"pointer-events",
	({ value }) => ({
		pointerEvents: value,
	}),
	{ defaults: pointerEventsValues },
);

/**
 * Create resize utility classes.
 */
export const useResizeUtility = createUseUtility(
	"resize",
	({ value }) => ({
		resize: value,
	}),
	{ defaults: resizeValues },
);

/**
 * Create scroll-behavior utility classes.
 */
export const useScrollBehaviorUtility = createUseUtility(
	"scroll-behavior",
	({ value }) => ({
		scrollBehavior: value,
	}),
	{ defaults: scrollBehaviorValues },
);

/**
 * Create touch-action utility classes.
 */
export const useTouchActionUtility = createUseUtility(
	"touch-action",
	({ value }) => ({
		touchAction: value,
	}),
	{ defaults: touchActionValues },
);

/**
 * Create user-select utility classes.
 */
export const useUserSelectUtility = createUseUtility(
	"user-select",
	({ value }) => ({
		userSelect: value,
	}),
	{ defaults: userSelectValues },
);

/**
 * Create will-change utility classes.
 */
export const useWillChangeUtility = createUseUtility(
	"will-change",
	({ value }) => ({
		willChange: value,
	}),
	{ defaults: willChangeValues },
);
