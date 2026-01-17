import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useColorLightness.styleframe?css";
import { colorLightnessPreview } from "./useColorLightness.styleframe?recipe";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const lightnessLevels = [
	"50",
	"100",
	"200",
	"300",
	"400",
	"500",
	"600",
	"700",
	"800",
	"900",
	"950",
];

const ColorLightnessSwatch = createSwatchComponent(
	"ColorLightnessSwatch",
	"lightness",
	(lightness) => colorLightnessPreview({ lightness }),
	{ layout: "color-variant" },
);

const ColorLightnessGrid = createGridComponent(
	"ColorLightnessGrid",
	lightnessLevels,
	ColorLightnessSwatch,
	"lightness",
	"grid",
);

const meta = {
	title: "Theme/Colors/useColorLightness",
	component: ColorLightnessSwatch,
	tags: ["autodocs"],
	argTypes: {
		lightness: {
			control: "select",
			options: lightnessLevels,
		},
	},
} satisfies Meta<typeof ColorLightnessSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLightnessLevels: StoryObj = {
	render: () => ({
		components: { ColorLightnessGrid },
		template: "<ColorLightnessGrid />",
	}),
};

export const Lightness50: Story = {
	args: {
		lightness: "50",
	},
};

export const Lightness100: Story = {
	args: {
		lightness: "100",
	},
};

export const Lightness200: Story = {
	args: {
		lightness: "200",
	},
};

export const Lightness300: Story = {
	args: {
		lightness: "300",
	},
};

export const Lightness400: Story = {
	args: {
		lightness: "400",
	},
};

export const Lightness500: Story = {
	args: {
		lightness: "500",
	},
};

export const Lightness600: Story = {
	args: {
		lightness: "600",
	},
};

export const Lightness700: Story = {
	args: {
		lightness: "700",
	},
};

export const Lightness800: Story = {
	args: {
		lightness: "800",
	},
};

export const Lightness900: Story = {
	args: {
		lightness: "900",
	},
};

export const Lightness950: Story = {
	args: {
		lightness: "950",
	},
};
