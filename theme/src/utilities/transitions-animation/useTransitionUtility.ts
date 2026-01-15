import { createUseUtility } from "../../utils";

/**
 * Default transition-property utility values matching Tailwind CSS.
 */
export const defaultTransitionPropertyValues = {
	none: "none",
	all: "all",
	default:
		"color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
	colors:
		"color, background-color, border-color, text-decoration-color, fill, stroke",
	opacity: "opacity",
	shadow: "box-shadow",
	transform: "transform",
};

/**
 * Create transition-property utility classes.
 */
export const useTransitionPropertyUtility = createUseUtility(
	"transition",
	({ value }) => ({
		transitionProperty: value,
		transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
		transitionDuration: "150ms",
	}),
	{ defaults: defaultTransitionPropertyValues },
);

/**
 * Default transition-behavior utility values matching Tailwind CSS.
 */
export const defaultTransitionBehaviorValues = {
	normal: "normal",
	"allow-discrete": "allow-discrete",
};

/**
 * Create transition-behavior utility classes.
 */
export const useTransitionBehaviorUtility = createUseUtility(
	"transition-behavior",
	({ value }) => ({
		transitionBehavior: value,
	}),
	{ defaults: defaultTransitionBehaviorValues },
);

/**
 * Create transition-duration utility classes.
 */
export const useTransitionDurationUtility = createUseUtility(
	"duration",
	({ value }) => ({
		transitionDuration: value,
	}),
);

/**
 * Create transition-timing-function utility classes.
 */
export const useTransitionTimingFunctionUtility = createUseUtility(
	"ease",
	({ value }) => ({
		transitionTimingFunction: value,
	}),
);

/**
 * Create transition-delay utility classes.
 */
export const useTransitionDelayUtility = createUseUtility(
	"delay",
	({ value }) => ({
		transitionDelay: value,
	}),
);
