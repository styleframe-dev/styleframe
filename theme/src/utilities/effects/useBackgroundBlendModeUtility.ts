import { createUseUtility } from "../../utils";

/**
 * Default background-blend-mode utility values matching Tailwind CSS.
 */
export const defaultBackgroundBlendModeValues = {
	normal: "normal",
	multiply: "multiply",
	screen: "screen",
	overlay: "overlay",
	darken: "darken",
	lighten: "lighten",
	"color-dodge": "color-dodge",
	"color-burn": "color-burn",
	"hard-light": "hard-light",
	"soft-light": "soft-light",
	difference: "difference",
	exclusion: "exclusion",
	hue: "hue",
	saturation: "saturation",
	color: "color",
	luminosity: "luminosity",
};

/**
 * Create background-blend-mode utility classes.
 */
export const useBackgroundBlendModeUtility = createUseUtility(
	"background-blend-mode",
	({ value }) => ({
		backgroundBlendMode: value,
	}),
	{ defaults: defaultBackgroundBlendModeValues },
);
