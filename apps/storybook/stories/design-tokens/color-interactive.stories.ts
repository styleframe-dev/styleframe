import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ColorSwatch from "../../src/components/design-tokens/colors/ColorSwatch.vue";
import StoryGrid from "../../src/components/primitives/StoryGrid.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"warning",
	"danger",
	"info",
	"gray",
];

const meta = {
	title: "Design Tokens/Colors/Colors Interactive",
	component: ColorSwatch,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: "select",
			options: colors.map((color) => `${color}-interactive`),
		},
	},
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: StoryObj = {
	render: () => ({
		components: { ColorSwatch, StoryGrid },
		setup() {
			return { colors };
		},
		template: `
			<StoryGrid :items="colors">
				<template #default="{ item }">
					<ColorSwatch :name="item" :value="\`\${item}-interactive\`" :interactive="true" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const Primary: Story = {
	args: {
		name: "primary",
		value: "primary-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};

export const Secondary: Story = {
	args: {
		name: "secondary",
		value: "secondary-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};

export const Success: Story = {
	args: {
		name: "success",
		value: "success-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};

export const Warning: Story = {
	args: {
		name: "warning",
		value: "warning-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};

export const Danger: Story = {
	args: {
		name: "danger",
		value: "danger-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};

export const Info: Story = {
	args: {
		name: "info",
		value: "info-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};

export const Gray: Story = {
	args: {
		name: "gray",
		value: "gray-interactive",
		label: "Hover, focus, or click",
		interactive: true,
	},
};
