import type { Variable } from "@styleframe/core";
import { styleframe } from "@styleframe/core";
import { consume } from "@styleframe/transpiler";
import {
	defaultLetterSpacingValues,
	useLetterSpacing,
} from "./useLetterSpacing";

describe("useLetterSpacing", () => {
	it("should create all letter spacing variables with correct names and values", () => {
		const s = styleframe();
		const {
			letterSpacingTighter,
			letterSpacingTight,
			letterSpacingNormal,
			letterSpacingWide,
			letterSpacingWider,
			letterSpacing,
		} = useLetterSpacing(s);

		expect(letterSpacingTighter).toEqual({
			type: "variable",
			name: "letter-spacing--tighter",
			value: "-0.05em",
		});

		expect(letterSpacingTight).toEqual({
			type: "variable",
			name: "letter-spacing--tight",
			value: "-0.025em",
		});

		expect(letterSpacingNormal).toEqual({
			type: "variable",
			name: "letter-spacing--normal",
			value: "normal",
		});

		expect(letterSpacingWide).toEqual({
			type: "variable",
			name: "letter-spacing--wide",
			value: "0.05em",
		});

		expect(letterSpacingWider).toEqual({
			type: "variable",
			name: "letter-spacing--wider",
			value: "0.1em",
		});

		expect(letterSpacing).toEqual({
			type: "variable",
			name: "letter-spacing",
			value: {
				type: "reference",
				name: "letter-spacing--normal",
				fallback: undefined,
			},
		});
	});

	it("should add all letter spacing variables to root", () => {
		const s = styleframe();
		useLetterSpacing(s);

		expect(s.root.variables).toHaveLength(6);
		expect(s.root.variables[0]?.name).toBe("letter-spacing--tighter");
		expect(s.root.variables[1]?.name).toBe("letter-spacing--tight");
		expect(s.root.variables[2]?.name).toBe("letter-spacing--normal");
		expect(s.root.variables[3]?.name).toBe("letter-spacing--wide");
		expect(s.root.variables[4]?.name).toBe("letter-spacing--wider");
		expect(s.root.variables[5]?.name).toBe("letter-spacing");
	});

	it("should return all letter spacing variables in an object", () => {
		const s = styleframe();
		const letterSpacings = useLetterSpacing(s);

		expect(Object.keys(letterSpacings)).toEqual([
			"letterSpacingTighter",
			"letterSpacingTight",
			"letterSpacingNormal",
			"letterSpacingWide",
			"letterSpacingWider",
			"letterSpacing",
		]);
	});

	it("should compile to correct CSS output using consume", () => {
		const s = styleframe();
		useLetterSpacing(s);

		const css = consume(s.root, s.options);

		expect(css).toBe(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
}`);
	});

	it("should compile individual letter spacing variable to correct CSS", () => {
		const s = styleframe();
		const { letterSpacingWide } = useLetterSpacing(s);

		const css = consume(letterSpacingWide, s.options);

		expect(css).toBe("--letter-spacing--wide: 0.05em;");
	});

	it("should not create duplicate variables when called multiple times", () => {
		const s = styleframe();
		const letterSpacings1 = useLetterSpacing(s);
		const letterSpacings2 = useLetterSpacing(s);

		// Should return the same variables (default: true behavior)
		expect(letterSpacings1.letterSpacingTighter).toBe(
			letterSpacings2.letterSpacingTighter,
		);
		expect(letterSpacings1.letterSpacing).toBe(letterSpacings2.letterSpacing);
		expect(s.root.variables).toHaveLength(6);
	});

	it("should allow letter spacing variables to be used as references", () => {
		const s = styleframe();
		const { letterSpacingWider } = useLetterSpacing(s);

		const customLetterSpacing = s.variable(
			"custom-letter-spacing",
			s.ref(letterSpacingWider),
		);

		expect(customLetterSpacing.value).toEqual({
			type: "reference",
			name: "letter-spacing--wider",
			fallback: undefined,
		});

		const css = consume(s.root, s.options);
		expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
	--custom-letter-spacing: var(--letter-spacing--wider);
}`);
	});

	it("should work with selector overrides", () => {
		const s = styleframe();
		const { letterSpacingNormal } = useLetterSpacing(s);

		s.selector(".custom-letter-spacing", ({ variable }) => {
			variable(letterSpacingNormal, "0.01em");
		});

		const css = consume(s.root, s.options);

		expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
}

.custom-letter-spacing {
	--letter-spacing--normal: 0.01em;
}`);
	});

	describe("type safety", () => {
		it("should preserve exact letter spacing variable names in return type", () => {
			const s = styleframe();
			const letterSpacings = useLetterSpacing(s);

			// Type assertions to verify the generic types are preserved
			const tighter: Variable<"letter-spacing--tighter"> =
				letterSpacings.letterSpacingTighter;
			const tight: Variable<"letter-spacing--tight"> =
				letterSpacings.letterSpacingTight;
			const normal: Variable<"letter-spacing--normal"> =
				letterSpacings.letterSpacingNormal;
			const wide: Variable<"letter-spacing--wide"> =
				letterSpacings.letterSpacingWide;
			const wider: Variable<"letter-spacing--wider"> =
				letterSpacings.letterSpacingWider;
			const letterSpacing: Variable<"letter-spacing"> =
				letterSpacings.letterSpacing;

			expect(tighter.name).toBe("letter-spacing--tighter");
			expect(tight.name).toBe("letter-spacing--tight");
			expect(normal.name).toBe("letter-spacing--normal");
			expect(wide.name).toBe("letter-spacing--wide");
			expect(wider.name).toBe("letter-spacing--wider");
			expect(letterSpacing.name).toBe("letter-spacing");
		});

		it("should have correct string value types", () => {
			const s = styleframe();
			const letterSpacings = useLetterSpacing(s);

			expect(typeof letterSpacings.letterSpacingTighter.value).toBe("string");
			expect(typeof letterSpacings.letterSpacingTight.value).toBe("string");
			expect(typeof letterSpacings.letterSpacingNormal.value).toBe("string");
			expect(typeof letterSpacings.letterSpacingWide.value).toBe("string");
			expect(typeof letterSpacings.letterSpacingWider.value).toBe("string");
			expect(typeof letterSpacings.letterSpacing.value).toBe("object");
		});
	});

	describe("default letter spacing", () => {
		it("should create a default letter spacing variable referencing normal by default", () => {
			const s = styleframe();
			const { letterSpacing } = useLetterSpacing(s);

			expect(letterSpacing).toEqual({
				type: "variable",
				name: "letter-spacing",
				value: {
					type: "reference",
					name: "letter-spacing--normal",
					fallback: undefined,
				},
			});
		});

		it("should allow customizing the default letter spacing", () => {
			const s = styleframe();
			const { letterSpacing } = useLetterSpacing(s, {
				...defaultLetterSpacingValues,
				default: "@wide",
			});

			expect(letterSpacing.value).toEqual({
				type: "reference",
				name: "letter-spacing--wide",
				fallback: undefined,
			});
		});

		it("should compile default letter spacing to CSS correctly", () => {
			const s = styleframe();
			useLetterSpacing(s, {
				...defaultLetterSpacingValues,
				default: "@wider",
			});

			const css = consume(s.root, s.options);

			expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--wider);
}`);
		});

		it("should work with different default letter spacings", () => {
			const letterSpacings = ["tighter", "tight", "normal", "wide", "wider"];

			for (const letterSpacingName of letterSpacings) {
				const s = styleframe();
				const { letterSpacing } = useLetterSpacing(s, {
					...defaultLetterSpacingValues,
					default: `@${letterSpacingName}`,
				});

				expect(letterSpacing.value).toEqual({
					type: "reference",
					name: `letter-spacing--${letterSpacingName}`,
					fallback: undefined,
				});
			}
		});
	});

	describe("letter spacing value relationships", () => {
		it("should have negative values for tighter and tight", () => {
			const s = styleframe();
			const { letterSpacingTighter, letterSpacingTight } = useLetterSpacing(s);

			expect(letterSpacingTighter.value).toBe("-0.05em");
			expect(letterSpacingTight.value).toBe("-0.025em");
		});

		it("should have positive values for wide and wider", () => {
			const s = styleframe();
			const { letterSpacingWide, letterSpacingWider } = useLetterSpacing(s);

			expect(letterSpacingWide.value).toBe("0.05em");
			expect(letterSpacingWider.value).toBe("0.1em");
		});

		it("should have normal as the neutral value", () => {
			const s = styleframe();
			const { letterSpacingNormal } = useLetterSpacing(s);

			expect(letterSpacingNormal.value).toBe("normal");
		});

		it("should have wider as the largest letter spacing", () => {
			const s = styleframe();
			const letterSpacings = useLetterSpacing(s);

			expect(letterSpacings.letterSpacingWider.value).toBe("0.1em");
		});

		it("should have tighter as the smallest letter spacing", () => {
			const s = styleframe();
			const letterSpacings = useLetterSpacing(s);

			expect(letterSpacings.letterSpacingTighter.value).toBe("-0.05em");
		});
	});

	describe("practical usage", () => {
		it("should work for creating typography with different letter spacings", () => {
			const s = styleframe();
			const { letterSpacingTight, letterSpacingWide } = useLetterSpacing(s);

			s.selector("h1, h2, h3", ({ variable }) => {
				variable("letter-spacing", s.ref(letterSpacingTight));
			});

			s.selector("p, li", ({ variable }) => {
				variable("letter-spacing", s.ref(letterSpacingWide));
			});

			const css = consume(s.root, s.options);
			expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
}

h1, h2, h3 {
	--letter-spacing: var(--letter-spacing--tight);
}

p, li {
	--letter-spacing: var(--letter-spacing--wide);
}`);
		});

		it("should work for responsive letter spacing adjustments", () => {
			const s = styleframe();
			const { letterSpacingNormal, letterSpacingWide } = useLetterSpacing(s);

			const bodyLetterSpacing = s.variable(
				"body-letter-spacing",
				s.ref(letterSpacingNormal),
			);

			s.selector("@media (min-width: 768px)", ({ variable }) => {
				variable(bodyLetterSpacing, s.ref(letterSpacingWide));
			});

			const css = consume(s.root, s.options);
			expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
	--body-letter-spacing: var(--letter-spacing--normal);
}

@media (min-width: 768px) {
	--body-letter-spacing: var(--letter-spacing--wide);
}`);
		});

		it("should work for theme-specific letter spacing overrides", () => {
			const s = styleframe();
			const { letterSpacingNormal, letterSpacingWider } = useLetterSpacing(s);

			s.selector(".theme-spacious", ({ variable }) => {
				variable(letterSpacingNormal, s.ref(letterSpacingWider));
			});

			const css = consume(s.root, s.options);
			expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
}

.theme-spacious {
	--letter-spacing--normal: var(--letter-spacing--wider);
}`);
		});

		it("should work for uppercase text with wider spacing", () => {
			const s = styleframe();
			const { letterSpacingWider } = useLetterSpacing(s);

			s.selector(".uppercase", ({ variable }) => {
				variable("letter-spacing", s.ref(letterSpacingWider));
			});

			const css = consume(s.root, s.options);
			expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
}

.uppercase {
	--letter-spacing: var(--letter-spacing--wider);
}`);
		});

		it("should work for compact headings with tighter spacing", () => {
			const s = styleframe();
			const { letterSpacingTighter } = useLetterSpacing(s);

			s.selector(".display-heading", ({ variable }) => {
				variable("letter-spacing", s.ref(letterSpacingTighter));
			});

			const css = consume(s.root, s.options);
			expect(css).toEqual(`:root {
	--letter-spacing--tighter: -0.05em;
	--letter-spacing--tight: -0.025em;
	--letter-spacing--normal: normal;
	--letter-spacing--wide: 0.05em;
	--letter-spacing--wider: 0.1em;
	--letter-spacing: var(--letter-spacing--normal);
}

.display-heading {
	--letter-spacing: var(--letter-spacing--tighter);
}`);
		});
	});
});
