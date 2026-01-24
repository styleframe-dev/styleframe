import { createUseUtility } from "../../utils";

/**
 * Default text-decoration-line utility values matching Tailwind CSS.
 */
export const defaultTextDecorationLineValues = {
	underline: "underline",
	overline: "overline",
	"line-through": "line-through",
	"no-underline": "none",
};

/**
 * Create text-decoration-line utility classes.
 */
export const useTextDecorationLineUtility = createUseUtility(
	"text-decoration-line",
	({ value }) => ({
		textDecorationLine: value,
	}),
	{ defaults: defaultTextDecorationLineValues },
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
 * Default text-decoration-style utility values matching Tailwind CSS.
 */
export const defaultTextDecorationStyleValues = {
	solid: "solid",
	double: "double",
	dotted: "dotted",
	dashed: "dashed",
	wavy: "wavy",
};

/**
 * Create text-decoration-style utility classes.
 */
export const useTextDecorationStyleUtility = createUseUtility(
	"text-decoration-style",
	({ value }) => ({
		textDecorationStyle: value,
	}),
	{ defaults: defaultTextDecorationStyleValues },
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
