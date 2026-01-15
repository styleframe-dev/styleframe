import { createUseUtility } from "../../utils";

/**
 * Default scroll-snap-align utility values matching Tailwind CSS.
 */
export const defaultScrollSnapAlignValues = {
	start: "start",
	end: "end",
	center: "center",
	"align-none": "none",
};

/**
 * Create scroll-snap-align utility classes.
 */
export const useScrollSnapAlignUtility = createUseUtility(
	"scroll-snap-align",
	({ value }) => ({
		scrollSnapAlign: value,
	}),
	{ defaults: defaultScrollSnapAlignValues },
);

/**
 * Default scroll-snap-stop utility values matching Tailwind CSS.
 */
export const defaultScrollSnapStopValues = {
	normal: "normal",
	always: "always",
};

/**
 * Create scroll-snap-stop utility classes.
 */
export const useScrollSnapStopUtility = createUseUtility(
	"scroll-snap-stop",
	({ value }) => ({
		scrollSnapStop: value,
	}),
	{ defaults: defaultScrollSnapStopValues },
);

/**
 * Default scroll-snap-type utility values matching Tailwind CSS.
 */
export const defaultScrollSnapTypeValues = {
	none: "none",
	x: "x var(--tw-scroll-snap-strictness)",
	y: "y var(--tw-scroll-snap-strictness)",
	both: "both var(--tw-scroll-snap-strictness)",
	mandatory: "mandatory",
	proximity: "proximity",
};

/**
 * Create scroll-snap-type utility classes.
 */
export const useScrollSnapTypeUtility = createUseUtility(
	"scroll-snap-type",
	({ value }) => {
		if (value === "mandatory" || value === "proximity") {
			return {
				"--tw-scroll-snap-strictness": value,
			};
		}
		return {
			scrollSnapType: value,
		};
	},
	{ defaults: defaultScrollSnapTypeValues },
);
