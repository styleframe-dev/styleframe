import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ColorPicker from "@/components/components/color-picker/ColorPicker.vue";
import ColorPickerGrid from "@/components/components/color-picker/preview/ColorPickerGrid.vue";
import ColorPickerSizeGrid from "@/components/components/color-picker/preview/ColorPickerSizeGrid.vue";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Color Picker",
	component: ColorPicker,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		size: {
			control: "select",
			options: sizes,
			description: "The size of the color picker",
		},
		disabled: {
			control: "boolean",
			description: "Whether the color picker is disabled",
		},
	},
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: "md",
		disabled: false,
	},
};

export const States: StoryObj = {
	render: () => ({
		components: { ColorPickerGrid },
		template: "<ColorPickerGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ColorPickerSizeGrid },
		template: "<ColorPickerSizeGrid />",
	}),
};

// Sizes
export const ExtraSmall: Story = {
	args: { size: "xs" },
};

export const Small: Story = {
	args: { size: "sm" },
};

export const Medium: Story = {
	args: { size: "md" },
};

export const Large: Story = {
	args: { size: "lg" },
};

export const ExtraLarge: Story = {
	args: { size: "xl" },
};

// States
export const Disabled: Story = {
	args: { disabled: true },
};
