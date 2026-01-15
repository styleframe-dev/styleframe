import { createUseUtility } from "../../utils";

/**
 * Default mix-blend-mode utility values matching Tailwind CSS.
 */
export const defaultMixBlendModeValues = {
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
	"plus-darker": "plus-darker",
	"plus-lighter": "plus-lighter",
};

/**
 * Create mix-blend-mode utility classes.
 */
export const useMixBlendModeUtility = createUseUtility(
	"mix-blend-mode",
	({ value }) => ({
		mixBlendMode: value,
	}),
	{ defaults: defaultMixBlendModeValues },
);
