import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { colorShadeValues } from "@styleframe/theme";
import ColorShadeSwatch from "../components/ColorShadeSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";

const shades = ["base", ...Object.keys(colorShadeValues)];

const shadeLabels: Record<string, string> = {
	base: "Base",
	"50": "Shade 50 (-5%)",
	"100": "Shade 100 (-10%)",
	"150": "Shade 150 (-15%)",
	"200": "Shade 200 (-20%)",
};

const meta = {
	title: "Design Tokens/Colors/Color Shade",
	component: ColorShadeSwatch,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: "select",
			options: shades,
		},
	},
} satisfies Meta<typeof ColorShadeSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllShades: StoryObj = {
	render: () => ({
		components: { ColorShadeSwatch, StoryGrid },
		setup() {
			return { shades, shadeLabels };
		},
		template: `
			<StoryGrid :items="shades">
				<template #default="{ item }">
					<ColorShadeSwatch :name="item" :value="item" :label="shadeLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const Base: Story = {
	args: {
		name: "base",
		value: "base",
		label: "Base",
	},
};

export const Shade50: Story = {
	args: {
		name: "50",
		value: "50",
		label: "Shade 50 (-5%)",
	},
};

export const Shade100: Story = {
	args: {
		name: "100",
		value: "100",
		label: "Shade 100 (-10%)",
	},
};

export const Shade150: Story = {
	args: {
		name: "150",
		value: "150",
		label: "Shade 150 (-15%)",
	},
};

export const Shade200: Story = {
	args: {
		name: "200",
		value: "200",
		label: "Shade 200 (-20%)",
	},
};
