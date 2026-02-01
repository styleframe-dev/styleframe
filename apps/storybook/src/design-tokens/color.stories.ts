import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { colorValues } from "@styleframe/theme";
import ColorSwatch from "../components/ColorSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";

const meta = {
	title: "Design Tokens/Colors/Color",
	component: ColorSwatch,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: "select",
			options: Object.keys(colorValues),
		},
	},
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: StoryObj = {
	render: () => ({
		components: { ColorSwatch, StoryGrid },
		setup() {
			return { items: Object.keys(colorValues) };
		},
		template: `
			<StoryGrid :items="items">
				<template #default="{ item }">
					<ColorSwatch :name="item" :value="item" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const Primary: Story = {
	args: {
		name: "primary",
		value: "primary",
	},
};

export const Secondary: Story = {
	args: {
		name: "secondary",
		value: "secondary",
	},
};

export const Info: Story = {
	args: {
		name: "info",
		value: "info",
	},
};

export const Success: Story = {
	args: {
		name: "success",
		value: "success",
	},
};

export const Warning: Story = {
	args: {
		name: "warning",
		value: "warning",
	},
};

export const Danger: Story = {
	args: {
		name: "danger",
		value: "danger",
	},
};

export const Light: Story = {
	args: {
		name: "light",
		value: "light",
	},
};

export const Dark: Story = {
	args: {
		name: "dark",
		value: "dark",
	},
};
