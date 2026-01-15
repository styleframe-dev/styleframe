import { createUseUtility } from "../../utils";

/**
 * Default background-image utility values matching Tailwind CSS.
 */
export const defaultBackgroundImageValues = {
	none: "none",
	"gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))",
	"gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))",
	"gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))",
	"gradient-to-br":
		"linear-gradient(to bottom right, var(--tw-gradient-stops))",
	"gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))",
	"gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))",
	"gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))",
	"gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))",
};

/**
 * Create background-image utility classes.
 */
export const useBackgroundImageUtility = createUseUtility(
	"background-image",
	({ value }) => ({
		backgroundImage: value,
	}),
	{ defaults: defaultBackgroundImageValues },
);

/**
 * Create gradient from-color utility classes.
 */
export const useGradientFromUtility = createUseUtility(
	"gradient-from",
	({ value }) => ({
		"--tw-gradient-from": `${value} var(--tw-gradient-from-position)`,
		"--tw-gradient-to": `transparent var(--tw-gradient-to-position)`,
		"--tw-gradient-stops": "var(--tw-gradient-from), var(--tw-gradient-to)",
	}),
);

/**
 * Create gradient via-color utility classes.
 */
export const useGradientViaUtility = createUseUtility(
	"gradient-via",
	({ value }) => ({
		"--tw-gradient-to": "transparent var(--tw-gradient-to-position)",
		"--tw-gradient-stops": `var(--tw-gradient-from), ${value} var(--tw-gradient-via-position), var(--tw-gradient-to)`,
	}),
);

/**
 * Create gradient to-color utility classes.
 */
export const useGradientToUtility = createUseUtility(
	"gradient-to",
	({ value }) => ({
		"--tw-gradient-to": `${value} var(--tw-gradient-to-position)`,
	}),
);
