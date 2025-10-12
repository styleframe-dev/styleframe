/** biome-ignore-all lint/suspicious/noApproximativeNumericConstant: Scale ratios are magic numbers */
import { createUseVariable } from "../utils";

export const defaultScaleValues = {
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

/**
 * Create a set of scale variables for use in a Styleframe instance.
 *
 * @usage
 * ```typescript
 * import { styleframe } from "styleframe";
 * import { useScale } from "styleframe/theme";
 *
 * const s = styleframe();
 *
 * const {
 *   scaleMinorSecond,
 *   scaleMajorSecond,
 *   scaleMinorThird,
 *   scaleMajorThird,
 *   scalePerfectFourth,
 *   scaleAugmentedFourth,
 *   scalePerfectFifth,
 *   scaleGolden,
 *   scale,
 * } = useScale(s, {
 *   default: 1.2,
 *   minorSecond: 1.067,
 *   majorSecond: 1.125,
 *   minorThird: 1.2,
 *   majorThird: 1.25,
 *   perfectFourth: 1.333,
 *   augmentedFourth: 1.414,
 *   perfectFifth: 1.5,
 *   golden: 1.618,
 * });
 * ```
 */

export const useScale = createUseVariable("scale", {
	defaults: defaultScaleValues,
});
