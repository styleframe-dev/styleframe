import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Badge from "./components/Badge.vue";
import BadgeGrid from "./components/BadgeGrid.vue";
import BadgeSizeGrid from "./components/BadgeSizeGrid.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta = {
	title: "Theme/Recipes/Badge",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the badge",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the badge",
		},
		label: {
			control: "text",
			description: "The text content of the badge",
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "primary",
		variant: "solid",
		size: "sm",
		label: "Badge",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { BadgeGrid },
		template: "<BadgeGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { BadgeSizeGrid },
		template: "<BadgeSizeGrid />",
	}),
};

// Individual color stories
export const Primary: Story = {
	args: {
		color: "primary",
		label: "Primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
		label: "Secondary",
	},
};

export const Success: Story = {
	args: {
		color: "success",
		label: "Success",
	},
};

export const Info: Story = {
	args: {
		color: "info",
		label: "Info",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
		label: "Warning",
	},
};

export const Danger: Story = {
	args: {
		color: "danger",
		label: "Danger",
	},
};

// Variant stories
export const Solid: Story = {
	args: {
		variant: "solid",
		label: "Solid",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		label: "Outline",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		label: "Soft",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
		label: "Subtle",
	},
};

// Size stories
export const ExtraSmall: Story = {
	args: {
		size: "xs",
		label: "Extra Small",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		label: "Small",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		label: "Medium",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		label: "Large",
	},
};

export const ExtraLarge: Story = {
	args: {
		size: "xl",
		label: "Extra Large",
	},
};
