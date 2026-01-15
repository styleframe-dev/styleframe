import { createUseUtility } from "../../utils";

/**
 * Create blur utility classes.
 *
 * @example
 * ```typescript
 * const s = styleframe();
 * useBlurUtility(s, {
 *     none: '0',
 *     sm: '4px',
 *     default: '8px',
 *     md: '12px',
 *     lg: '16px',
 *     xl: '24px',
 *     '2xl': '40px',
 *     '3xl': '64px',
 * });
 * ```
 */
export const useBlurUtility = createUseUtility("blur", ({ value }) => ({
	"--tw-blur": `blur(${value})`,
	filter:
		"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
}));

/**
 * Create brightness utility classes.
 */
export const useBrightnessUtility = createUseUtility(
	"brightness",
	({ value }) => ({
		"--tw-brightness": `brightness(${value})`,
		filter:
			"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
	}),
);

/**
 * Create contrast utility classes.
 */
export const useContrastUtility = createUseUtility("contrast", ({ value }) => ({
	"--tw-contrast": `contrast(${value})`,
	filter:
		"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
}));

/**
 * Create drop-shadow utility classes.
 */
export const useDropShadowUtility = createUseUtility(
	"drop-shadow",
	({ value }) => ({
		"--tw-drop-shadow": `drop-shadow(${value})`,
		filter:
			"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
	}),
);

/**
 * Create grayscale utility classes.
 */
export const useGrayscaleUtility = createUseUtility(
	"grayscale",
	({ value }) => ({
		"--tw-grayscale": `grayscale(${value})`,
		filter:
			"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
	}),
);

/**
 * Create hue-rotate utility classes.
 */
export const useHueRotateUtility = createUseUtility(
	"hue-rotate",
	({ value }) => ({
		"--tw-hue-rotate": `hue-rotate(${value})`,
		filter:
			"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
	}),
);

/**
 * Create invert utility classes.
 */
export const useInvertUtility = createUseUtility("invert", ({ value }) => ({
	"--tw-invert": `invert(${value})`,
	filter:
		"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
}));

/**
 * Create saturate utility classes.
 */
export const useSaturateUtility = createUseUtility("saturate", ({ value }) => ({
	"--tw-saturate": `saturate(${value})`,
	filter:
		"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
}));

/**
 * Create sepia utility classes.
 */
export const useSepiaUtility = createUseUtility("sepia", ({ value }) => ({
	"--tw-sepia": `sepia(${value})`,
	filter:
		"var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)",
}));
