import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useColorShade.styleframe?css";
import { colorShadePreview } from "./useColorShade.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const shades = ["base", "50", "100", "150", "200"];

const shadeLabels: Record<string, string> = {
	base: "Base",
	"50": "Shade 50 (-5%)",
	"100": "Shade 100 (-10%)",
	"150": "Shade 150 (-15%)",
	"200": "Shade 200 (-20%)",
};

const ColorShadeSwatch = createSwatchComponent(
	"ColorShadeSwatch",
	"shade",
	(shade) => colorShadePreview({ shade }),
	{
		layout: "color-variant",
		getLabel: (shade) => shadeLabels[shade],
	},
);

const ColorShadeGrid = createGridComponent(
	"ColorShadeGrid",
	shades,
	ColorShadeSwatch,
	"shade",
	"grid",
);

const meta = {
	title: "Theme/Colors/useColorShade",
	component: ColorShadeSwatch,
	tags: ["autodocs"],
	argTypes: {
		shade: {
			control: "select",
			options: shades,
		},
	},
} satisfies Meta<typeof ColorShadeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllShades: StoryObj = {
	render: () => ({
		components: { ColorShadeGrid },
		template: "<ColorShadeGrid />",
	}),
};

export const Base: Story = {
	args: {
		shade: "base",
	},
};

export const Shade50: Story = {
	args: {
		shade: "50",
	},
};

export const Shade100: Story = {
	args: {
		shade: "100",
	},
};

export const Shade150: Story = {
	args: {
		shade: "150",
	},
};

export const Shade200: Story = {
	args: {
		shade: "200",
	},
};
