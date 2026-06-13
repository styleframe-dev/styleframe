import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Otp from "@/components/components/otp/Otp.vue";
import OtpGrid from "@/components/components/otp/preview/OtpGrid.vue";
import OtpSizeGrid from "@/components/components/otp/preview/OtpSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["default", "soft", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Otp",
	component: Otp,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color of the cell surface",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style of the cells",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the cells",
		},
		invalid: {
			control: "boolean",
			description: "Whether the input is in an invalid state",
		},
		disabled: {
			control: "boolean",
			description: "Whether the input is disabled",
		},
		length: {
			control: "number",
			description: "The number of cells",
		},
		value: {
			control: "text",
			description: "The current value (one character per cell)",
		},
	},
} satisfies Meta<typeof Otp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		variant: "default",
		size: "md",
		length: 6,
		value: "",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { OtpGrid },
		template: "<OtpGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { OtpSizeGrid },
		template: "<OtpSizeGrid />",
	}),
};

// Colors
export const Neutral: Story = {
	args: { color: "neutral", length: 4, value: "12" },
};

export const Light: Story = {
	args: { color: "light", length: 4, value: "12" },
};

export const Dark: Story = {
	args: { color: "dark", length: 4, value: "12" },
};

// Variants
export const Soft: Story = {
	args: { variant: "soft", length: 4, value: "12" },
};

export const Ghost: Story = {
	args: { variant: "ghost", length: 4, value: "12" },
};

// States
export const Filled: Story = {
	args: { length: 6, value: "123456" },
};

export const Invalid: Story = {
	args: { invalid: true, length: 4, value: "12" },
};

export const Disabled: Story = {
	args: { disabled: true, length: 4, value: "12" },
};

// Sizes
export const Small: Story = {
	args: { size: "sm", length: 4, value: "12" },
};

export const Medium: Story = {
	args: { size: "md", length: 4, value: "12" },
};

export const Large: Story = {
	args: { size: "lg", length: 4, value: "12" },
};
