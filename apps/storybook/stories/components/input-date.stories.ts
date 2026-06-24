import type { Meta, StoryObj } from "@storybook/vue3-vite";

import InputDate from "@/components/components/input-date/InputDate.vue";
import InputDateGrid from "@/components/components/input-date/preview/InputDateGrid.vue";
import InputDateSizeGrid from "@/components/components/input-date/preview/InputDateSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["default", "soft", "ghost"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/InputDate",
	component: InputDate,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the date input",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the date input",
		},
		invalid: {
			control: "boolean",
			description: "Whether the date input is in an invalid state",
		},
		disabled: {
			control: "boolean",
			description: "Whether the date input is disabled",
		},
		readonly: {
			control: "boolean",
			description: "Whether the date input is read-only",
		},
		value: {
			control: "text",
			description: "The date value rendered across the segments",
		},
	},
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		variant: "default",
		size: "md",
		invalid: false,
		value: "12/31/2026",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { InputDateGrid },
		template: "<InputDateGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { InputDateSizeGrid },
		template: "<InputDateSizeGrid />",
	}),
};

// Individual color stories
export const Neutral: Story = {
	args: {
		color: "neutral",
	},
};

export const Light: Story = {
	args: {
		color: "light",
	},
};

export const Dark: Story = {
	args: {
		color: "dark",
	},
};

// Variant stories
export const DefaultVariant: Story = {
	args: {
		variant: "default",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
	},
};

export const Ghost: Story = {
	args: {
		variant: "ghost",
	},
};

// Size stories
export const Small: Story = {
	args: {
		size: "sm",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
	},
};

// State stories
export const Invalid: Story = {
	args: {
		invalid: true,
	},
};

export const Disabled: Story = {
	args: {
		disabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		readonly: true,
	},
};
