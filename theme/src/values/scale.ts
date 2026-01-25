/** biome-ignore-all lint/suspicious/noApproximativeNumericConstant: Scale ratios are magic numbers */
export const scaleValues = {
	default: "@minor-third",
	"minor-second": 1.067,
	"major-second": 1.125,
	"minor-third": 1.2,
	"major-third": 1.25,
	"perfect-fourth": 1.333,
	"augmented-fourth": 1.414,
	"perfect-fifth": 1.5,
	golden: 1.618,
} as const;
