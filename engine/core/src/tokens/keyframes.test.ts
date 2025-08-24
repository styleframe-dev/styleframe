import { styleframe } from "../styleframe";

describe("keyframes", () => {
	it("should create keyframes with the correct structure", () => {
		const s = styleframe();
		const { keyframes } = s;

		const fadeInKeyframes = keyframes("fade-in", {
			"0%": {
				opacity: 0,
				transform: "translateY(20px)",
			},
			"100%": {
				opacity: 1,
				transform: "translateY(0)",
			},
		});

		expect(fadeInKeyframes).toEqual({
			type: "keyframes",
			name: "fade-in",
			declarations: {
				"0%": {
					opacity: 0,
					transform: "translateY(20px)",
				},
				"100%": {
					opacity: 1,
					transform: "translateY(0)",
				},
			},
		});

		expect(s.root.children).toContain(fadeInKeyframes);
	});

	it("should support multiple keyframe stops", () => {
		const s = styleframe();
		const { keyframes } = s;

		const bounceKeyframes = keyframes("bounce", {
			"0%": {
				transform: "translateY(0)",
				animationTimingFunction: "ease-out",
			},
			"25%": {
				transform: "translateY(-20px)",
				animationTimingFunction: "ease-in",
			},
			"50%": {
				transform: "translateY(0)",
				animationTimingFunction: "ease-out",
			},
			"75%": {
				transform: "translateY(-10px)",
				animationTimingFunction: "ease-in",
			},
			"100%": {
				transform: "translateY(0)",
				animationTimingFunction: "ease-out",
			},
		});

		expect(Object.keys(bounceKeyframes.declarations)).toHaveLength(5);
		expect(bounceKeyframes.declarations["0%"]).toBeDefined();
		expect(bounceKeyframes.declarations["25%"]).toBeDefined();
		expect(bounceKeyframes.declarations["50%"]).toBeDefined();
		expect(bounceKeyframes.declarations["75%"]).toBeDefined();
		expect(bounceKeyframes.declarations["100%"]).toBeDefined();
	});

	it("should be accessible in the declarations context", () => {
		const s = styleframe();
		const { selector } = s;

		selector(".test", ({ keyframes }) => {
			const fadeIn = keyframes("fade-in", {
				"0%": { opacity: 0 },
				"100%": { opacity: 1 },
			});

			expect(fadeIn.type).toBe("keyframes");
			expect(fadeIn.name).toBe("fade-in");
		});
	});
});
