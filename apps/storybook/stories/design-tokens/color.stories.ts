import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { colorValues } from "@styleframe/theme";

const textColorKeys = Object.keys(colorValues).filter((key) =>
	key.startsWith("text"),
);
const baseColorKeys = Object.keys(colorValues).filter(
	(key) => !key.startsWith("text"),
);
import ColorSwatch from "../../src/components/design-tokens/colors/ColorSwatch.vue";
import StoryGrid from "../../src/components/primitives/StoryGrid.vue";

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
			return { items: baseColorKeys };
		},
		template: `
			<StoryGrid :items="items">
				<template #default="{ item }">
					<ColorSwatch :name="item" :value="item" :label="item" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const TextColors: StoryObj = {
	render: () => ({
		components: { ColorSwatch, StoryGrid },
		setup() {
			return { items: textColorKeys };
		},
		template: `
			<StoryGrid :items="items">
				<template #default="{ item }">
					<ColorSwatch :name="item" :value="item" :label="item" />
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

export const White: Story = {
	args: {
		name: "white",
		value: "white",
	},
};

export const Black: Story = {
	args: {
		name: "black",
		value: "black",
	},
};

export const Gray: Story = {
	args: {
		name: "gray",
		value: "gray",
	},
};

export const Background: Story = {
	args: {
		name: "background",
		value: "background",
	},
};

export const Surface: Story = {
	args: {
		name: "surface",
		value: "surface",
	},
};

export const Border: Story = {
	args: {
		name: "border",
		value: "border",
	},
};

export const Text: Story = {
	args: {
		name: "text",
		value: "text",
	},
};

export const TextWeak: Story = {
	args: {
		name: "text-weak",
		value: "text-weak",
	},
};

export const TextWeaker: Story = {
	args: {
		name: "text-weaker",
		value: "text-weaker",
	},
};

export const TextWeakest: Story = {
	args: {
		name: "text-weakest",
		value: "text-weakest",
	},
};
