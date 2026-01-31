import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import "../components/swatch.styleframe?css";
import "./scale.styleframe?css";
import { scalePreview } from "./scale.styleframe?ts";
import { scaleValues, scaleRatios } from "./scale.styleframe";
import {
	createSwatchComponent,
	createGridComponent,
} from "../components/TokenSwatch";

const scales = Object.keys(scaleValues);

const ScaleSwatch = createSwatchComponent(
	"ScaleSwatch",
	"scale",
	(scale) => scalePreview({ scale }),
	{
		values: scaleValues,
		renderPreview: (scale) => {
			const ratio = scaleRatios[scale] || 1;
			const baseHeight = 10;

			return h(
				"div",
				{ class: "scale-bars" },
				[0, 1, 2, 3, 4].map((power) =>
					h("div", {
						class: "scale-bar",
						style: { height: `${baseHeight * Math.pow(ratio, power)}px` },
					}),
				),
			);
		},
	},
);

const ScaleGrid = createGridComponent(
	"ScaleGrid",
	scales,
	ScaleSwatch,
	"scale",
	"list",
);

const meta = {
	title: "Design Tokens/Scales/Scale",
	component: ScaleSwatch,
	tags: ["autodocs"],
	argTypes: {
		scale: {
			control: "select",
			options: scales,
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
