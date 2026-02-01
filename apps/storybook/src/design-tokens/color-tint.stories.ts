import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { colorTintValues } from "@styleframe/theme";
import ColorTintSwatch from "../components/ColorTintSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";

const tints = ["base", ...Object.keys(colorTintValues)];

const tintLabels: Record<string, string> = {
	base: "Base",
	"50": "Tint 50 (+5%)",
	"100": "Tint 100 (+10%)",
	"150": "Tint 150 (+15%)",
	"200": "Tint 200 (+20%)",
};

const meta = {
	title: "Design Tokens/Colors/Color Tint",
	component: ColorTintSwatch,
	tags: ["autodocs"],
	argTypes: {
		value: {
			control: "select",
			options: tints,
		},
	},
} satisfies Meta<typeof ColorTintSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" :value="item" :label="tintLabels[item]" />
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

export const Tint50: Story = {
	args: {
		name: "50",
		value: "50",
		label: "Tint 50 (+5%)",
	},
};

export const Tint100: Story = {
	args: {
		name: "100",
		value: "100",
		label: "Tint 100 (+10%)",
	},
};

export const Tint150: Story = {
	args: {
		name: "150",
		value: "150",
		label: "Tint 150 (+15%)",
	},
};

export const Tint200: Story = {
	args: {
		name: "200",
		value: "200",
		label: "Tint 200 (+20%)",
	},
};
