import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useLetterSpacing.styleframe?css";
import {
	letterSpacingPreview,
	letterSpacingValues,
} from "./useLetterSpacing.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const letterSpacings = Object.keys(letterSpacingValues);

const LetterSpacingSwatch = createSwatchComponent(
	"LetterSpacingSwatch",
	"letterSpacing",
	(letterSpacing) => letterSpacingPreview({ letterSpacing }),
	{
		layout: "text",
		values: letterSpacingValues,
		sampleText: "Letter Spacing",
		previewTag: "span",
	},
);

const LetterSpacingGrid = createGridComponent(
	"LetterSpacingGrid",
	letterSpacings,
	LetterSpacingSwatch,
	"letterSpacing",
	"list",
);

const meta = {
	title: "Theme/Typography/useLetterSpacing",
	component: LetterSpacingSwatch,
	tags: ["autodocs"],
	argTypes: {
		letterSpacing: {
			control: "select",
			options: letterSpacings,
		},
	},
} satisfies Meta<typeof LetterSpacingSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLetterSpacings: StoryObj = {
	render: () => ({
		components: { LetterSpacingGrid },
		template: "<LetterSpacingGrid />",
	}),
};

export const Tighter: Story = {
	args: {
		letterSpacing: "tighter",
	},
};

export const Tight: Story = {
	args: {
		letterSpacing: "tight",
	},
};

export const Normal: Story = {
	args: {
		letterSpacing: "normal",
	},
};

export const Wide: Story = {
	args: {
		letterSpacing: "wide",
	},
};

export const Wider: Story = {
	args: {
		letterSpacing: "wider",
	},
};
