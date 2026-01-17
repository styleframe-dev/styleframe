import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useFontSize.styleframe?css";
import {
	fontSizePreview,
	fontSizeValues,
} from "./useFontSize.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const fontSizes = Object.keys(fontSizeValues);

const FontSizeSwatch = createSwatchComponent(
	"FontSizeSwatch",
	"fontSize",
	(fontSize) => fontSizePreview({ fontSize }),
	{
		layout: "text",
		values: fontSizeValues,
		sampleText: "The quick brown fox",
		previewTag: "span",
	},
);

const FontSizeGrid = createGridComponent(
	"FontSizeGrid",
	fontSizes,
	FontSizeSwatch,
	"fontSize",
	"list",
);

const meta = {
	title: "Theme/Typography/useFontSize",
	component: FontSizeSwatch,
	tags: ["autodocs"],
	argTypes: {
		fontSize: {
			control: "select",
			options: fontSizes,
		},
	},
} satisfies Meta<typeof FontSizeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontSizes: StoryObj = {
	render: () => ({
		components: { FontSizeGrid },
		template: "<FontSizeGrid />",
	}),
};

export const ExtraSmall: Story = {
	args: {
		fontSize: "xs",
	},
};

export const Small: Story = {
	args: {
		fontSize: "sm",
	},
};

export const Medium: Story = {
	args: {
		fontSize: "md",
	},
};

export const Large: Story = {
	args: {
		fontSize: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		fontSize: "xl",
	},
};

export const DoubleExtraLarge: Story = {
	args: {
		fontSize: "2xl",
	},
};

export const TripleExtraLarge: Story = {
	args: {
		fontSize: "3xl",
	},
};

export const QuadrupleExtraLarge: Story = {
	args: {
		fontSize: "4xl",
	},
};
