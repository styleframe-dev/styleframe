import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useFontWeight.styleframe?css";
import { fontWeightPreview } from "./useFontWeight.styleframe?recipe";
import { fontWeightValues } from "./useFontWeight.styleframe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const fontWeights = Object.keys(fontWeightValues);

const FontWeightSwatch = createSwatchComponent(
	"FontWeightSwatch",
	"fontWeight",
	(fontWeight) => fontWeightPreview({ fontWeight }),
	{
		layout: "text",
		values: fontWeightValues,
		sampleText: "The quick brown fox jumps over the lazy dog",
		previewTag: "span",
	},
);

const FontWeightGrid = createGridComponent(
	"FontWeightGrid",
	fontWeights,
	FontWeightSwatch,
	"fontWeight",
	"list",
);

const meta = {
	title: "Theme/Typography/useFontWeight",
	component: FontWeightSwatch,
	tags: ["autodocs"],
	argTypes: {
		fontWeight: {
			control: "select",
			options: fontWeights,
		},
	},
} satisfies Meta<typeof FontWeightSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontWeights: StoryObj = {
	render: () => ({
		components: { FontWeightGrid },
		template: "<FontWeightGrid />",
	}),
};

export const ExtraLight: Story = {
	args: {
		fontWeight: "extralight",
	},
};

export const Light: Story = {
	args: {
		fontWeight: "light",
	},
};

export const Normal: Story = {
	args: {
		fontWeight: "normal",
	},
};

export const Medium: Story = {
	args: {
		fontWeight: "medium",
	},
};

export const Semibold: Story = {
	args: {
		fontWeight: "semibold",
	},
};

export const Bold: Story = {
	args: {
		fontWeight: "bold",
	},
};

export const Black: Story = {
	args: {
		fontWeight: "black",
	},
};
