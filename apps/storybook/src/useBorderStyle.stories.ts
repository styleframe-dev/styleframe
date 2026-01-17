import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useBorderStyle.styleframe?css";
import { borderStylePreview } from "./useBorderStyle.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const borderStyles = [
	"none",
	"solid",
	"dashed",
	"dotted",
	"double",
	"groove",
	"inset",
	"outset",
];

const BorderStyleSwatch = createSwatchComponent(
	"BorderStyleSwatch",
	"borderStyle",
	(borderStyle) => borderStylePreview({ borderStyle }),
	{ layout: "box" },
);

const BorderStyleGrid = createGridComponent(
	"BorderStyleGrid",
	borderStyles,
	BorderStyleSwatch,
	"borderStyle",
	"grid",
);

const meta = {
	title: "Theme/Borders/useBorderStyle",
	component: BorderStyleSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderStyle: {
			control: "select",
			options: borderStyles,
		},
	},
} satisfies Meta<typeof BorderStyleSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderStyles: StoryObj = {
	render: () => ({
		components: { BorderStyleGrid },
		template: "<BorderStyleGrid />",
	}),
};

export const None: Story = {
	args: {
		borderStyle: "none",
	},
};

export const Solid: Story = {
	args: {
		borderStyle: "solid",
	},
};

export const Dashed: Story = {
	args: {
		borderStyle: "dashed",
	},
};

export const Dotted: Story = {
	args: {
		borderStyle: "dotted",
	},
};

export const Double: Story = {
	args: {
		borderStyle: "double",
	},
};

export const Groove: Story = {
	args: {
		borderStyle: "groove",
	},
};

export const Inset: Story = {
	args: {
		borderStyle: "inset",
	},
};

export const Outset: Story = {
	args: {
		borderStyle: "outset",
	},
};
