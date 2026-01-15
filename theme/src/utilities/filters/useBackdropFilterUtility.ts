import { createUseUtility } from "../../utils";

/**
 * Create backdrop-blur utility classes.
 */
export const useBackdropBlurUtility = createUseUtility(
	"backdrop-blur",
	({ value }) => ({
		"--tw-backdrop-blur": `blur(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-brightness utility classes.
 */
export const useBackdropBrightnessUtility = createUseUtility(
	"backdrop-brightness",
	({ value }) => ({
		"--tw-backdrop-brightness": `brightness(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-contrast utility classes.
 */
export const useBackdropContrastUtility = createUseUtility(
	"backdrop-contrast",
	({ value }) => ({
		"--tw-backdrop-contrast": `contrast(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-grayscale utility classes.
 */
export const useBackdropGrayscaleUtility = createUseUtility(
	"backdrop-grayscale",
	({ value }) => ({
		"--tw-backdrop-grayscale": `grayscale(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-hue-rotate utility classes.
 */
export const useBackdropHueRotateUtility = createUseUtility(
	"backdrop-hue-rotate",
	({ value }) => ({
		"--tw-backdrop-hue-rotate": `hue-rotate(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-invert utility classes.
 */
export const useBackdropInvertUtility = createUseUtility(
	"backdrop-invert",
	({ value }) => ({
		"--tw-backdrop-invert": `invert(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-opacity utility classes.
 */
export const useBackdropOpacityUtility = createUseUtility(
	"backdrop-opacity",
	({ value }) => ({
		"--tw-backdrop-opacity": `opacity(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-saturate utility classes.
 */
export const useBackdropSaturateUtility = createUseUtility(
	"backdrop-saturate",
	({ value }) => ({
		"--tw-backdrop-saturate": `saturate(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);

/**
 * Create backdrop-sepia utility classes.
 */
export const useBackdropSepiaUtility = createUseUtility(
	"backdrop-sepia",
	({ value }) => ({
		"--tw-backdrop-sepia": `sepia(${value})`,
		backdropFilter:
			"var(--tw-backdrop-blur) var(--tw-backdrop-brightness) var(--tw-backdrop-contrast) var(--tw-backdrop-grayscale) var(--tw-backdrop-hue-rotate) var(--tw-backdrop-invert) var(--tw-backdrop-opacity) var(--tw-backdrop-saturate) var(--tw-backdrop-sepia)",
	}),
);
