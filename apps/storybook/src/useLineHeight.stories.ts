import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useLineHeight.styleframe?css";
import { lineHeightPreview } from "./useLineHeight.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const lineHeights = ["tight", "snug", "normal", "relaxed", "loose"];

const lineHeightValues: Record<string, string> = {
	tight: "1.2",
	snug: "1.35",
	normal: "1.5",
	relaxed: "1.65",
	loose: "1.9",
};

const sampleText =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.";

const LineHeightSwatch = createSwatchComponent(
	"LineHeightSwatch",
	"lineHeight",
	(lineHeight) => lineHeightPreview({ lineHeight }),
	{
		layout: "text",
		values: lineHeightValues,
		sampleText,
		previewTag: "p",
	},
);

const LineHeightGrid = createGridComponent(
	"LineHeightGrid",
	lineHeights,
	LineHeightSwatch,
	"lineHeight",
	"list",
);

const meta = {
	title: "Theme/Typography/useLineHeight",
	component: LineHeightSwatch,
	tags: ["autodocs"],
	argTypes: {
		lineHeight: {
			control: "select",
			options: lineHeights,
		},
	},
} satisfies Meta<typeof LineHeightSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLineHeights: StoryObj = {
	render: () => ({
		components: { LineHeightGrid },
		template: "<LineHeightGrid />",
	}),
};

export const Tight: Story = {
	args: {
		lineHeight: "tight",
	},
};

export const Snug: Story = {
	args: {
		lineHeight: "snug",
	},
};

export const Normal: Story = {
	args: {
		lineHeight: "normal",
	},
};

export const Relaxed: Story = {
	args: {
		lineHeight: "relaxed",
	},
};

export const Loose: Story = {
	args: {
		lineHeight: "loose",
	},
};
