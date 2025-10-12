/** biome-ignore-all lint/suspicious/noApproximativeNumericConstant: Scale ratios are magic numbers */
import type { Styleframe } from "@styleframe/core";

export function useScale(s: Styleframe, defaultScale = "minor-third") {
	const scaleMinorSecond = s.variable("scale--minor-second", 1.067, {
		default: true,
	});
	const scaleMajorSecond = s.variable("scale--major-second", 1.125, {
		default: true,
	});
	const scaleMinorThird = s.variable("scale--minor-third", 1.2, {
		default: true,
	});
	const scaleMajorThird = s.variable("scale--major-third", 1.25, {
		default: true,
	});
	const scalePerfectFourth = s.variable("scale--perfect-fourth", 1.333, {
		default: true,
	});
	const scaleAugmentedFourth = s.variable("scale--augmented-fourth", 1.414, {
		default: true,
	});
	const scalePerfectFifth = s.variable("scale--perfect-fifth", 1.5, {
		default: true,
	});
	const scaleGolden = s.variable("scale--golden", 1.618, { default: true });

	const scale = s.variable("scale", s.ref(`scale--${defaultScale}`), {
		default: true,
	});

	return {
		scaleMinorSecond,
		scaleMajorSecond,
		scaleMinorThird,
		scaleMajorThird,
		scalePerfectFourth,
		scaleAugmentedFourth,
		scalePerfectFifth,
		scaleGolden,
		scale,
	};
}
