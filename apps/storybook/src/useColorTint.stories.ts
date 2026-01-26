import type { Meta, StoryObj } from "@storybook/vue3-vite";

import "./components/swatch.styleframe?css";
import "./useColorTint.styleframe?css";
import { colorTintPreview } from "./useColorTint.styleframe?ts";
import {
	createSwatchComponent,
	createGridComponent,
} from "./components/TokenSwatch";

const tints = ["base", "50", "100", "150", "200"];

const tintLabels: Record<string, string> = {
	base: "Base",
	"50": "Tint 50 (+5%)",
	"100": "Tint 100 (+10%)",
	"150": "Tint 150 (+15%)",
	"200": "Tint 200 (+20%)",
};

const ColorTintSwatch = createSwatchComponent(
	"ColorTintSwatch",
	"tint",
	(tint) => colorTintPreview({ tint }),
	{
		layout: "color-variant",
		getLabel: (tint) => tintLabels[tint],
	},
);

const ColorTintGrid = createGridComponent(
	"ColorTintGrid",
	tints,
	ColorTintSwatch,
	"tint",
	"grid",
);

const meta = {
	title: "Theme/Colors/useColorTint",
	component: ColorTintSwatch,
	tags: ["autodocs"],
	argTypes: {
		tint: {
			control: "select",
			options: tints,
		},
	},
} satisfies Meta<typeof ColorTintSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTints: StoryObj = {
	render: () => ({
		components: { ColorTintGrid },
		template: "<ColorTintGrid />",
	}),
};

export const Base: Story = {
	args: {
		tint: "base",
	},
};

export const Tint50: Story = {
	args: {
		tint: "50",
	},
};

export const Tint100: Story = {
	args: {
		tint: "100",
	},
};

export const Tint150: Story = {
	args: {
		tint: "150",
	},
};

export const Tint200: Story = {
	args: {
		tint: "200",
	},
};
