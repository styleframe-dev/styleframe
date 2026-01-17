import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import "./components/swatch.styleframe?css";
import "./useScale.styleframe?css";
import { scalePreview } from "./useScale.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

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

const scaleValues: Record<string, string> = {
	"minor-second": "1.067",
	"major-second": "1.125",
	"minor-third": "1.200",
	"major-third": "1.250",
	"perfect-fourth": "1.333",
	"augmented-fourth": "1.414",
	"perfect-fifth": "1.500",
	golden: "1.618",
};

const scaleRatios: Record<string, number> = {
	"minor-second": 1.067,
	"major-second": 1.125,
	"minor-third": 1.2,
	"major-third": 1.25,
	"perfect-fourth": 1.333,
	"augmented-fourth": 1.414,
	"perfect-fifth": 1.5,
	golden: 1.618,
};

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
	title: "Theme/Scales/useScale",
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
