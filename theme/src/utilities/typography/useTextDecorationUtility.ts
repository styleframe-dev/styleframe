import { createUseUtility } from "../../utils";
import {
	textDecorationLineValues,
	textDecorationStyleValues,
} from "../../values";

/**
 * Create text-decoration-line utility classes.
 */
export const useTextDecorationLineUtility = createUseUtility(
	"text-decoration-line",
	({ value }) => ({
		textDecorationLine: value,
	}),
	{ defaults: textDecorationLineValues },
);

/**
 * Create text-decoration-color utility classes.
 */
export const useTextDecorationColorUtility = createUseUtility(
	"text-decoration-color",
	({ value }) => ({
		textDecorationColor: value,
	}),
);

/**
 * Create text-decoration-style utility classes.
 */
export const useTextDecorationStyleUtility = createUseUtility(
	"text-decoration-style",
	({ value }) => ({
		textDecorationStyle: value,
	}),
	{ defaults: textDecorationStyleValues },
);

/**
 * Create text-decoration-thickness utility classes.
 */
export const useTextDecorationThicknessUtility = createUseUtility(
	"text-decoration-thickness",
	({ value }) => ({
		textDecorationThickness: value,
	}),
);
