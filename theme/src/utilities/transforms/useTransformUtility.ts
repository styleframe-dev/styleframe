import { createUseUtility } from "../../utils";

/**
 * Default backface-visibility utility values matching Tailwind CSS.
 */
export const defaultBackfaceVisibilityValues = {
	visible: "visible",
	hidden: "hidden",
};

/**
 * Create backface-visibility utility classes.
 */
export const useBackfaceVisibilityUtility = createUseUtility(
	"backface",
	({ value }) => ({
		backfaceVisibility: value,
	}),
	{ defaults: defaultBackfaceVisibilityValues },
);

/**
 * Create perspective utility classes.
 */
export const usePerspectiveUtility = createUseUtility(
	"perspective",
	({ value }) => ({
		perspective: value,
	}),
);

/**
 * Default perspective-origin utility values matching Tailwind CSS.
 */
export const defaultPerspectiveOriginValues = {
	center: "center",
	top: "top",
	"top-right": "top right",
	right: "right",
	"bottom-right": "bottom right",
	bottom: "bottom",
	"bottom-left": "bottom left",
	left: "left",
	"top-left": "top left",
};

/**
 * Create perspective-origin utility classes.
 */
export const usePerspectiveOriginUtility = createUseUtility(
	"perspective-origin",
	({ value }) => ({
		perspectiveOrigin: value,
	}),
	{ defaults: defaultPerspectiveOriginValues },
);

/**
 * Create rotate utility classes.
 */
export const useRotateUtility = createUseUtility("rotate", ({ value }) => ({
	"--tw-rotate": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create rotate-x utility classes.
 */
export const useRotateXUtility = createUseUtility("rotate-x", ({ value }) => ({
	"--tw-rotate-x": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create rotate-y utility classes.
 */
export const useRotateYUtility = createUseUtility("rotate-y", ({ value }) => ({
	"--tw-rotate-y": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) rotateX(var(--tw-rotate-x)) rotateY(var(--tw-rotate-y)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create scale utility classes.
 */
export const useScaleUtility = createUseUtility("scale", ({ value }) => ({
	"--tw-scale-x": value,
	"--tw-scale-y": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create scale-x utility classes.
 */
export const useScaleXUtility = createUseUtility("scale-x", ({ value }) => ({
	"--tw-scale-x": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create scale-y utility classes.
 */
export const useScaleYUtility = createUseUtility("scale-y", ({ value }) => ({
	"--tw-scale-y": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create skew-x utility classes.
 */
export const useSkewXUtility = createUseUtility("skew-x", ({ value }) => ({
	"--tw-skew-x": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Create skew-y utility classes.
 */
export const useSkewYUtility = createUseUtility("skew-y", ({ value }) => ({
	"--tw-skew-y": value,
	transform:
		"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
}));

/**
 * Default transform-origin utility values matching Tailwind CSS.
 */
export const defaultTransformOriginValues = {
	center: "center",
	top: "top",
	"top-right": "top right",
	right: "right",
	"bottom-right": "bottom right",
	bottom: "bottom",
	"bottom-left": "bottom left",
	left: "left",
	"top-left": "top left",
};

/**
 * Create transform-origin utility classes.
 */
export const useTransformOriginUtility = createUseUtility(
	"origin",
	({ value }) => ({
		transformOrigin: value,
	}),
	{ defaults: defaultTransformOriginValues },
);

/**
 * Default transform-style utility values matching Tailwind CSS.
 */
export const defaultTransformStyleValues = {
	flat: "flat",
	"3d": "preserve-3d",
};

/**
 * Create transform-style utility classes.
 */
export const useTransformStyleUtility = createUseUtility(
	"transform-style",
	({ value }) => ({
		transformStyle: value,
	}),
	{ defaults: defaultTransformStyleValues },
);

/**
 * Create translate utility classes (both x and y).
 */
export const useTranslateUtility = createUseUtility(
	"translate",
	({ value }) => ({
		"--tw-translate-x": value,
		"--tw-translate-y": value,
		transform:
			"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
	}),
);

/**
 * Create translate-x utility classes.
 */
export const useTranslateXUtility = createUseUtility(
	"translate-x",
	({ value }) => ({
		"--tw-translate-x": value,
		transform:
			"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
	}),
);

/**
 * Create translate-y utility classes.
 */
export const useTranslateYUtility = createUseUtility(
	"translate-y",
	({ value }) => ({
		"--tw-translate-y": value,
		transform:
			"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
	}),
);

/**
 * Create translate-z utility classes.
 */
export const useTranslateZUtility = createUseUtility(
	"translate-z",
	({ value }) => ({
		"--tw-translate-z": value,
		transform:
			"translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
	}),
);
