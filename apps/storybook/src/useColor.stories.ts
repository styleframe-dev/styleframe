import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useColor.styleframe?css";
import { colorPreview } from "./useColor.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const colors = ["primary", "secondary", "info", "success", "warning", "danger"];

const ColorSwatch = createSwatchComponent(
	"ColorSwatch",
	"color",
	(color) => colorPreview({ color }),
	{ layout: "box" },
);

const ColorGrid = createGridComponent(
	"ColorGrid",
	colors,
	ColorSwatch,
	"color",
	"grid",
);

const meta = {
	title: "Theme/Colors/useColor",
	component: ColorSwatch,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
		},
	},
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: StoryObj = {
	render: () => ({
		components: { ColorGrid },
		template: "<ColorGrid />",
	}),
};

export const Primary: Story = {
	args: {
		color: "primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
	},
};

export const Info: Story = {
	args: {
		color: "info",
	},
};

export const Success: Story = {
	args: {
		color: "success",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
	},
};

export const Danger: Story = {
	args: {
		color: "danger",
	},
};
