/**
 * Tests comparing generated color scales against hand-tuned Radix colors.
 * This file measures the perceptual difference (ΔE) between generated and Radix colors.
 */

import { describe, it, expect } from "vitest";
import {
	generateColorScale,
	getColorProperties,
	colorScaleSteps,
	type ColorScaleStep,
} from "./useGeneratedColorScalePreset";

// =============================================================================
// Radix Reference Colors
// =============================================================================

const radixLightColors: Record<string, Record<ColorScaleStep, string>> = {
	blue: {
		1: "#fbfdff",
		2: "#f4faff",
		3: "#e6f4fe",
		4: "#d5efff",
		5: "#c2e5ff",
		6: "#acd8fc",
		7: "#8ec8f6",
		8: "#5eb1ef",
		9: "#0090ff",
		10: "#0588f0",
		11: "#0d74ce",
		12: "#113264",
	},
	red: {
		1: "#fffcfc",
		2: "#fff7f7",
		3: "#feebec",
		4: "#ffdbdc",
		5: "#ffcdce",
		6: "#fdbdbe",
		7: "#f4a9aa",
		8: "#eb8e90",
		9: "#e5484d",
		10: "#dc3e42",
		11: "#ce2c31",
		12: "#641723",
	},
	green: {
		1: "#fbfefc",
		2: "#f4fbf6",
		3: "#e6f6eb",
		4: "#d6f1df",
		5: "#c4e8d1",
		6: "#adddc0",
		7: "#8eceaa",
		8: "#5bb98b",
		9: "#30a46c",
		10: "#2b9a66",
		11: "#218358",
		12: "#193b2d",
	},
	orange: {
		1: "#fefcfb",
		2: "#fff7ed",
		3: "#ffefd6",
		4: "#ffdfb5",
		5: "#ffd19a",
		6: "#ffc182",
		7: "#f5ae73",
		8: "#ec9455",
		9: "#f76b15",
		10: "#ef5f00",
		11: "#cc4e00",
		12: "#582d1d",
	},
	purple: {
		1: "#fefcfe",
		2: "#fbf7fe",
		3: "#f7edfe",
		4: "#f2e2fc",
		5: "#ead5f9",
		6: "#e0c4f4",
		7: "#d1afec",
		8: "#be93e4",
		9: "#8e4ec6",
		10: "#8347b9",
		11: "#8145b5",
		12: "#402060",
	},
	gray: {
		1: "#fcfcfc",
		2: "#f9f9f9",
		3: "#f0f0f0",
		4: "#e8e8e8",
		5: "#e0e0e0",
		6: "#d9d9d9",
		7: "#cecece",
		8: "#bbbbbb",
		9: "#8d8d8d",
		10: "#838383",
		11: "#646464",
		12: "#202020",
	},
};

const radixDarkColors: Record<string, Record<ColorScaleStep, string>> = {
	blue: {
		1: "#0d1520",
		2: "#111927",
		3: "#0d2847",
		4: "#003362",
		5: "#004074",
		6: "#104d87",
		7: "#205d9e",
		8: "#2870bd",
		9: "#0090ff",
		10: "#3b9eff",
		11: "#70b8ff",
		12: "#c2e6ff",
	},
	red: {
		1: "#191111",
		2: "#201314",
		3: "#3b1219",
		4: "#500f1c",
		5: "#611623",
		6: "#72232d",
		7: "#8c333a",
		8: "#b54548",
		9: "#e5484d",
		10: "#ec5d5e",
		11: "#ff9592",
		12: "#ffd1d9",
	},
	green: {
		1: "#0e1512",
		2: "#121b17",
		3: "#132d21",
		4: "#113b29",
		5: "#174933",
		6: "#20573e",
		7: "#28684a",
		8: "#2f7c57",
		9: "#30a46c",
		10: "#33b074",
		11: "#3dd68c",
		12: "#b1f1cb",
	},
	orange: {
		1: "#17120e",
		2: "#1e160f",
		3: "#331e0b",
		4: "#462100",
		5: "#562800",
		6: "#66350c",
		7: "#7e451d",
		8: "#a35829",
		9: "#f76b15",
		10: "#ff801f",
		11: "#ffa057",
		12: "#ffe0c2",
	},
	purple: {
		1: "#18111b",
		2: "#1e1523",
		3: "#301c3b",
		4: "#3d224e",
		5: "#48295c",
		6: "#54346b",
		7: "#664282",
		8: "#8457aa",
		9: "#8e4ec6",
		10: "#9a5cd0",
		11: "#d19dff",
		12: "#ecd9fa",
	},
	gray: {
		1: "#111111",
		2: "#191919",
		3: "#222222",
		4: "#2a2a2a",
		5: "#313131",
		6: "#3a3a3a",
		7: "#484848",
		8: "#606060",
		9: "#6e6e6e",
		10: "#7b7b7b",
		11: "#b4b4b4",
		12: "#eeeeee",
	},
};

// Base colors (step 9) for each scale
const baseColors: Record<string, string> = {
	blue: "#0090ff",
	red: "#e5484d",
	green: "#30a46c",
	orange: "#f76b15",
	purple: "#8e4ec6",
	gray: "#8d8d8d",
};

// =============================================================================
// Delta E Calculation (OKLCH-based perceptual difference)
// =============================================================================

function hexToOklab(hex: string): { L: number; a: number; b: number } {
	const props = getColorProperties(hex);
	const hRad = (props.hue * Math.PI) / 180;
	return {
		L: props.lightness,
		a: props.chroma * Math.cos(hRad),
		b: props.chroma * Math.sin(hRad),
	};
}

/**
 * Calculate perceptual color difference using Euclidean distance in OKLab space.
 * Returns a value where:
 * - < 2: Excellent match (barely noticeable)
 * - 2-5: Noticeable difference
 * - > 5: Significant difference
 */
function deltaE(hex1: string, hex2: string): number {
	const lab1 = hexToOklab(hex1);
	const lab2 = hexToOklab(hex2);

	const dL = lab1.L - lab2.L;
	const da = lab1.a - lab2.a;
	const db = lab1.b - lab2.b;

	return Math.sqrt(dL * dL + da * da + db * db) * 100;
}

/**
 * Calculate average delta E for a scale.
 */
function calculateScaleDelta(
	generated: Record<ColorScaleStep, string>,
	reference: Record<ColorScaleStep, string>,
): { average: number; max: number; perStep: Record<ColorScaleStep, number> } {
	const perStep = {} as Record<ColorScaleStep, number>;
	let total = 0;
	let max = 0;

	for (const step of colorScaleSteps) {
		const delta = deltaE(generated[step], reference[step]);
		perStep[step] = delta;
		total += delta;
		max = Math.max(max, delta);
	}

	return {
		average: total / 12,
		max,
		perStep,
	};
}

// =============================================================================
// Tests
// =============================================================================

describe("Radix Color Comparison", () => {
	describe("Light Mode", () => {
		it.each(Object.keys(baseColors))(
			"should match %s scale within tolerance",
			(scaleName) => {
				const generated = generateColorScale(baseColors[scaleName]!, "light");
				const reference = radixLightColors[scaleName]!;
				const delta = calculateScaleDelta(generated, reference);

				// Log detailed results for debugging
				console.log(
					`\n${scaleName.toUpperCase()} (light): avg ΔE = ${delta.average.toFixed(2)}, max = ${delta.max.toFixed(2)}`,
				);
				for (const step of colorScaleSteps) {
					const gen = generated[step];
					const ref = reference[step];
					const d = delta.perStep[step];
					const indicator = d < 2 ? "✓" : d < 5 ? "~" : "✗";
					console.log(
						`  Step ${step.toString().padStart(2)}: ${gen} vs ${ref} | ΔE = ${d.toFixed(2)} ${indicator}`,
					);
				}

				// Assert reasonable overall match
				// These thresholds can be tightened as the algorithm improves
				expect(delta.average).toBeLessThan(10); // Current baseline
			},
		);

		it("should have blue as the closest match", () => {
			const blueDelta = calculateScaleDelta(
				generateColorScale(baseColors.blue!, "light"),
				radixLightColors.blue!,
			);
			expect(blueDelta.average).toBeLessThan(2);
		});

		it("should have green as a close match", () => {
			const greenDelta = calculateScaleDelta(
				generateColorScale(baseColors.green!, "light"),
				radixLightColors.green!,
			);
			expect(greenDelta.average).toBeLessThan(2);
		});
	});

	describe("Dark Mode", () => {
		it.each(Object.keys(baseColors))(
			"should match %s scale within tolerance",
			(scaleName) => {
				const generated = generateColorScale(baseColors[scaleName]!, "dark");
				const reference = radixDarkColors[scaleName]!;
				const delta = calculateScaleDelta(generated, reference);

				console.log(
					`\n${scaleName.toUpperCase()} (dark): avg ΔE = ${delta.average.toFixed(2)}, max = ${delta.max.toFixed(2)}`,
				);
				for (const step of colorScaleSteps) {
					const gen = generated[step];
					const ref = reference[step];
					const d = delta.perStep[step];
					const indicator = d < 2 ? "✓" : d < 5 ? "~" : "✗";
					console.log(
						`  Step ${step.toString().padStart(2)}: ${gen} vs ${ref} | ΔE = ${d.toFixed(2)} ${indicator}`,
					);
				}

				expect(delta.average).toBeLessThan(10);
			},
		);
	});

	describe("Overall Quality Metrics", () => {
		it("should report overall average delta", () => {
			let totalLight = 0;
			let totalDark = 0;
			const scaleNames = Object.keys(baseColors);

			for (const scaleName of scaleNames) {
				const lightDelta = calculateScaleDelta(
					generateColorScale(baseColors[scaleName]!, "light"),
					radixLightColors[scaleName]!,
				);
				const darkDelta = calculateScaleDelta(
					generateColorScale(baseColors[scaleName]!, "dark"),
					radixDarkColors[scaleName]!,
				);
				totalLight += lightDelta.average;
				totalDark += darkDelta.average;
			}

			const avgLight = totalLight / scaleNames.length;
			const avgDark = totalDark / scaleNames.length;
			const overall = (avgLight + avgDark) / 2;

			console.log("\n========================================");
			console.log("OVERALL QUALITY METRICS");
			console.log("========================================");
			console.log(`Light mode average ΔE: ${avgLight.toFixed(2)}`);
			console.log(`Dark mode average ΔE: ${avgDark.toFixed(2)}`);
			console.log(`Overall average ΔE: ${overall.toFixed(2)}`);
			console.log("========================================\n");

			// Quality thresholds (tightened based on algorithm improvements)
			expect(avgLight).toBeLessThan(2.5);
			expect(avgDark).toBeLessThan(3.5);
			expect(overall).toBeLessThan(3);
		});

		it("should achieve excellent match for blue scale", () => {
			const lightDelta = calculateScaleDelta(
				generateColorScale(baseColors.blue!, "light"),
				radixLightColors.blue!,
			);
			const darkDelta = calculateScaleDelta(
				generateColorScale(baseColors.blue!, "dark"),
				radixDarkColors.blue!,
			);

			// Blue should be excellent (ΔE < 2) since the algorithm was tuned for it
			expect(lightDelta.average).toBeLessThan(1);
			expect(darkDelta.average).toBeLessThan(2);
		});

		it("should achieve good match for green scale", () => {
			const lightDelta = calculateScaleDelta(
				generateColorScale(baseColors.green!, "light"),
				radixLightColors.green!,
			);
			const darkDelta = calculateScaleDelta(
				generateColorScale(baseColors.green!, "dark"),
				radixDarkColors.green!,
			);

			// Green should be good (ΔE < 2.5)
			expect(lightDelta.average).toBeLessThan(1.5);
			expect(darkDelta.average).toBeLessThan(2.5);
		});

		it("should achieve acceptable match for red scale", () => {
			const lightDelta = calculateScaleDelta(
				generateColorScale(baseColors.red!, "light"),
				radixLightColors.red!,
			);
			const darkDelta = calculateScaleDelta(
				generateColorScale(baseColors.red!, "dark"),
				radixDarkColors.red!,
			);

			// Red should be acceptable (ΔE < 2.5)
			expect(lightDelta.average).toBeLessThan(2);
			expect(darkDelta.average).toBeLessThan(2);
		});
	});
});

describe("Lightness and Chroma Analysis", () => {
	it("should analyze Radix lightness curves", () => {
		console.log("\n========================================");
		console.log("RADIX LIGHTNESS ANALYSIS (Light Mode)");
		console.log("========================================");

		for (const scaleName of Object.keys(baseColors)) {
			const reference = radixLightColors[scaleName]!;
			const baseProps = getColorProperties(reference[9]);

			console.log(
				`\n${scaleName.toUpperCase()} (base L=${baseProps.lightness.toFixed(3)}):`,
			);
			for (const step of colorScaleSteps) {
				const props = getColorProperties(reference[step]);
				const lightEdge = 0.995;
				const range = baseProps.lightness - lightEdge;
				const coefficient = (props.lightness - lightEdge) / range;
				console.log(
					`  Step ${step.toString().padStart(2)}: L=${props.lightness.toFixed(3)} ` +
						`C=${props.chroma.toFixed(3)} H=${props.hue.toFixed(0).padStart(3)} | coeff=${coefficient.toFixed(3)}`,
				);
			}
		}
	});

	it("should analyze Radix chroma curves", () => {
		console.log("\n========================================");
		console.log("RADIX CHROMA ANALYSIS (Light Mode)");
		console.log("========================================");

		for (const scaleName of Object.keys(baseColors)) {
			const reference = radixLightColors[scaleName]!;
			const baseProps = getColorProperties(reference[9]);

			console.log(
				`\n${scaleName.toUpperCase()} (base C=${baseProps.chroma.toFixed(3)}):`,
			);
			for (const step of colorScaleSteps) {
				const props = getColorProperties(reference[step]);
				const chromaRatio = props.chroma / baseProps.chroma;
				console.log(
					`  Step ${step.toString().padStart(2)}: C=${props.chroma.toFixed(3)} | ratio=${chromaRatio.toFixed(3)}`,
				);
			}
		}
	});

	it("should analyze Radix hue shifts", () => {
		console.log("\n========================================");
		console.log("RADIX HUE SHIFT ANALYSIS (Light Mode)");
		console.log("========================================");

		for (const scaleName of Object.keys(baseColors)) {
			const reference = radixLightColors[scaleName]!;
			const baseProps = getColorProperties(reference[9]);

			console.log(
				`\n${scaleName.toUpperCase()} (base H=${baseProps.hue.toFixed(0)}):`,
			);
			for (const step of colorScaleSteps) {
				const props = getColorProperties(reference[step]);
				let hueDiff = props.hue - baseProps.hue;
				if (hueDiff > 180) hueDiff -= 360;
				if (hueDiff < -180) hueDiff += 360;
				console.log(
					`  Step ${step.toString().padStart(2)}: H=${props.hue.toFixed(0).padStart(3)} | diff=${hueDiff.toFixed(0).padStart(4)}`,
				);
			}
		}
	});
});

// =============================================================================
// Different Base Colors Investigation
// =============================================================================

describe("Different Base Colors for Light/Dark Mode", () => {
	// Radix uses different step 9 colors for gray in light vs dark mode
	const lightBases: Record<string, string> = {
		blue: "#0090ff",
		red: "#e5484d",
		green: "#30a46c",
		orange: "#f76b15",
		purple: "#8e4ec6",
		gray: "#8d8d8d", // Light mode gray base
	};

	const darkBases: Record<string, string> = {
		blue: "#0090ff", // Same as light
		red: "#e5484d", // Same as light
		green: "#30a46c", // Same as light
		orange: "#f76b15", // Same as light
		purple: "#8e4ec6", // Same as light
		gray: "#6e6e6e", // DIFFERENT - Radix dark mode gray step 9
	};

	it("should compare same-base vs different-base accuracy", () => {
		console.log("\n========================================");
		console.log("SAME BASE vs DIFFERENT BASE COMPARISON");
		console.log("========================================");

		const results: Array<{
			color: string;
			sameBaseDark: number;
			diffBaseDark: number;
			improvement: number;
		}> = [];

		for (const scaleName of Object.keys(lightBases)) {
			const lightBase = lightBases[scaleName]!;
			const darkBase = darkBases[scaleName]!;
			const darkReference = radixDarkColors[scaleName]!;

			// Generate dark scale using same base as light (current approach)
			const sameBaseScale = generateColorScale(lightBase, "dark");
			const sameBaseDelta = calculateScaleDelta(sameBaseScale, darkReference);

			// Generate dark scale using the actual Radix dark base
			const diffBaseScale = generateColorScale(darkBase, "dark");
			const diffBaseDelta = calculateScaleDelta(diffBaseScale, darkReference);

			const improvement =
				((sameBaseDelta.average - diffBaseDelta.average) /
					sameBaseDelta.average) *
				100;

			results.push({
				color: scaleName,
				sameBaseDark: sameBaseDelta.average,
				diffBaseDark: diffBaseDelta.average,
				improvement,
			});

			console.log(`\n${scaleName.toUpperCase()}:`);
			console.log(`  Light base: ${lightBase}`);
			console.log(`  Dark base:  ${darkBase}`);
			console.log(
				`  Same base ΔE:  ${sameBaseDelta.average.toFixed(2)} (using light base for dark)`,
			);
			console.log(
				`  Diff base ΔE:  ${diffBaseDelta.average.toFixed(2)} (using actual dark base)`,
			);
			console.log(
				`  Improvement:   ${improvement > 0 ? "+" : ""}${improvement.toFixed(1)}%`,
			);

			if (lightBase !== darkBase) {
				console.log("\n  Per-step comparison (different base):");
				for (const step of colorScaleSteps) {
					const sameGen = sameBaseScale[step];
					const diffGen = diffBaseScale[step];
					const ref = darkReference[step];
					const sameDelta = deltaE(sameGen, ref);
					const diffDelta = deltaE(diffGen, ref);
					const stepImprovement = sameDelta - diffDelta;
					console.log(
						`    Step ${step.toString().padStart(2)}: ` +
							`same=${sameDelta.toFixed(2).padStart(5)} ` +
							`diff=${diffDelta.toFixed(2).padStart(5)} ` +
							`(${stepImprovement > 0 ? "+" : ""}${stepImprovement.toFixed(2)})`,
					);
				}
			}
		}

		console.log("\n========================================");
		console.log("SUMMARY");
		console.log("========================================");
		let totalSame = 0;
		let totalDiff = 0;
		for (const r of results) {
			totalSame += r.sameBaseDark;
			totalDiff += r.diffBaseDark;
		}
		const avgSame = totalSame / results.length;
		const avgDiff = totalDiff / results.length;
		const totalImprovement = ((avgSame - avgDiff) / avgSame) * 100;
		console.log(`Average with same base:      ${avgSame.toFixed(2)}`);
		console.log(`Average with different base: ${avgDiff.toFixed(2)}`);
		console.log(
			`Overall improvement:         ${totalImprovement > 0 ? "+" : ""}${totalImprovement.toFixed(1)}%`,
		);
	});

	it("should show gray dark mode improvement with correct base", () => {
		const lightBase = "#8d8d8d";
		const darkBase = "#6e6e6e";
		const darkReference = radixDarkColors.gray!;

		// Using same base (current approach)
		const sameBaseScale = generateColorScale(lightBase, "dark");
		const sameBaseDelta = calculateScaleDelta(sameBaseScale, darkReference);

		// Using correct dark base
		const diffBaseScale = generateColorScale(darkBase, "dark");
		const diffBaseDelta = calculateScaleDelta(diffBaseScale, darkReference);

		console.log("\n========================================");
		console.log("GRAY DARK MODE - DETAILED COMPARISON");
		console.log("========================================");
		console.log(
			`Using light base (${lightBase}): ΔE = ${sameBaseDelta.average.toFixed(2)}`,
		);
		console.log(
			`Using dark base (${darkBase}):  ΔE = ${diffBaseDelta.average.toFixed(2)}`,
		);

		// The different base should significantly improve gray dark mode
		expect(diffBaseDelta.average).toBeLessThan(sameBaseDelta.average);
	});

	it("should analyze Radix step 9 differences between modes", () => {
		console.log("\n========================================");
		console.log("RADIX STEP 9 LIGHT vs DARK COMPARISON");
		console.log("========================================");

		for (const scaleName of Object.keys(radixLightColors)) {
			const lightStep9 = radixLightColors[scaleName]![9];
			const darkStep9 = radixDarkColors[scaleName]![9];
			const areSame = lightStep9.toLowerCase() === darkStep9.toLowerCase();

			const lightProps = getColorProperties(lightStep9);
			const darkProps = getColorProperties(darkStep9);

			console.log(`\n${scaleName.toUpperCase()}:`);
			console.log(
				`  Light step 9: ${lightStep9} (L=${lightProps.lightness.toFixed(3)}, C=${lightProps.chroma.toFixed(3)})`,
			);
			console.log(
				`  Dark step 9:  ${darkStep9} (L=${darkProps.lightness.toFixed(3)}, C=${darkProps.chroma.toFixed(3)})`,
			);
			console.log(`  Same: ${areSame ? "YES" : "NO - DIFFERENT BASE!"}`);

			if (!areSame) {
				const de = deltaE(lightStep9, darkStep9);
				console.log(`  ΔE between bases: ${de.toFixed(2)}`);
			}
		}
	});
});
