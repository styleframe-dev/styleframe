import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { colorLightnessValues } from "@styleframe/theme";
import ColorLightnessSwatch from "../components/ColorLightnessSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";

const meta = {
	title: "Design Tokens/Colors/Color Lightness",
	component: ColorLightnessSwatch,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: "select",
			options: Object.keys(colorLightnessValues),
		},
	},
} satisfies Meta<typeof ColorLightnessSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllLightnessLevels: StoryObj = {
	render: () => ({
		components: { ColorLightnessSwatch, StoryGrid },
		setup() {
			return { items: Object.keys(colorLightnessValues) };
		},
		template: `
			<StoryGrid :items="items">
				<template #default="{ item }">
					<ColorLightnessSwatch :name="item" :value="item" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const Lightness50: Story = {
	args: {
		name: "50",
		value: "50",
	},
};

export const Lightness100: Story = {
	args: {
		name: "100",
		value: "100",
	},
};

export const Lightness200: Story = {
	args: {
		name: "200",
		value: "200",
	},
};

export const Lightness300: Story = {
	args: {
		name: "300",
		value: "300",
	},
};

export const Lightness400: Story = {
	args: {
		name: "400",
		value: "400",
	},
};

export const Lightness500: Story = {
	args: {
		name: "500",
		value: "500",
	},
};

export const Lightness600: Story = {
	args: {
		name: "600",
		value: "600",
	},
};

export const Lightness700: Story = {
	args: {
		name: "700",
		value: "700",
	},
};

export const Lightness800: Story = {
	args: {
		name: "800",
		value: "800",
	},
};

export const Lightness900: Story = {
	args: {
		name: "900",
		value: "900",
	},
};

export const Lightness950: Story = {
	args: {
		name: "950",
		value: "950",
	},
};
