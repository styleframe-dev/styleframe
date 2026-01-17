import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useScale.styleframe?css";
import { scalePreview } from "./useScale.styleframe?recipe";

const scaleValues: Record<string, number> = {
	"minor-second": 1.067,
	"major-second": 1.125,
	"minor-third": 1.2,
	"major-third": 1.25,
	"perfect-fourth": 1.333,
	"augmented-fourth": 1.414,
	"perfect-fifth": 1.5,
	golden: 1.618,
};

const ScaleSwatch = defineComponent({
	name: "ScaleSwatch",
	props: {
		scale: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		const ratio = scaleValues[props.scale] || 1;
		const baseHeight = 10;

		return () =>
			h(
				"div",
				{
					class: `scale-swatch ${scalePreview({ scale: props.scale })}`,
				},
				[
					h("div", { class: "scale-name" }, props.scale),
					h("div", { class: "scale-value" }, ratio.toFixed(3)),
					h(
						"div",
						{ class: "scale-bars" },
						[0, 1, 2, 3, 4].map((power) =>
							h("div", {
								class: "scale-bar",
								style: { height: `${baseHeight * Math.pow(ratio, power)}px` },
							}),
						),
					),
				],
			);
	},
});

const ScaleGrid = defineComponent({
	name: "ScaleGrid",
	setup() {
		const scales = [
			"minor-second",
			"major-second",
			"minor-third",
			"major-third",
			"perfect-fourth",
			"augmented-fourth",
			"perfect-fifth",
			"golden",
		];

		return () =>
			h(
				"div",
				{
					class: "scale-grid",
				},
				scales.map((scale) => h(ScaleSwatch, { scale })),
			);
	},
});

const meta = {
	title: "Theme/Scales/useScale",
	component: ScaleSwatch,
	tags: ["autodocs"],
	argTypes: {
		scale: {
			control: "select",
			options: [
				"minor-second",
				"major-second",
				"minor-third",
				"major-third",
				"perfect-fourth",
				"augmented-fourth",
				"perfect-fifth",
				"golden",
			],
		},
	},
} satisfies Meta<typeof ScaleSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllScales: StoryObj = {
	render: () => ({
		components: { ScaleGrid },
		template: "<ScaleGrid />",
	}),
};

export const MinorSecond: Story = {
	args: {
		scale: "minor-second",
	},
};

export const MajorSecond: Story = {
	args: {
		scale: "major-second",
	},
};

export const MinorThird: Story = {
	args: {
		scale: "minor-third",
	},
};

export const MajorThird: Story = {
	args: {
		scale: "major-third",
	},
};

export const PerfectFourth: Story = {
	args: {
		scale: "perfect-fourth",
	},
};

export const AugmentedFourth: Story = {
	args: {
		scale: "augmented-fourth",
	},
};

export const PerfectFifth: Story = {
	args: {
		scale: "perfect-fifth",
	},
};

export const Golden: Story = {
	args: {
		scale: "golden",
	},
};
