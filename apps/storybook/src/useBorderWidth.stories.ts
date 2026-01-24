import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useBorderWidth.styleframe?css";
import { borderWidthPreview } from "./useBorderWidth.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const borderWidths = ["none", "thin", "medium", "thick"];

const BorderWidthSwatch = createSwatchComponent(
	"BorderWidthSwatch",
	"borderWidth",
	(borderWidth) => borderWidthPreview({ borderWidth }),
	{ layout: "box" },
);

const BorderWidthGrid = createGridComponent(
	"BorderWidthGrid",
	borderWidths,
	BorderWidthSwatch,
	"borderWidth",
	"grid",
);

const meta = {
	title: "Theme/Borders/useBorderWidth",
	component: BorderWidthSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderWidth: {
			control: "select",
			options: borderWidths,
		},
	},
} satisfies Meta<typeof BorderWidthSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderWidths: StoryObj = {
	render: () => ({
		components: { BorderWidthGrid },
		template: "<BorderWidthGrid />",
	}),
};

export const None: Story = {
	args: {
		borderWidth: "none",
	},
};

export const Thin: Story = {
	args: {
		borderWidth: "thin",
	},
};

export const Medium: Story = {
	args: {
		borderWidth: "medium",
	},
};

export const Thick: Story = {
	args: {
		borderWidth: "thick",
	},
};
