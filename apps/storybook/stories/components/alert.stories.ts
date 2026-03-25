import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Alert from "../../src/components/components/alert/Alert.vue";
import AlertGrid from "../../src/components/components/alert/AlertGrid.vue";
import AlertSizeGrid from "../../src/components/components/alert/AlertSizeGrid.vue";
import AlertOrientationGrid from "../../src/components/components/alert/AlertOrientationGrid.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
	"light",
	"dark",
	"neutral",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;
const orientations = ["horizontal", "vertical"] as const;

const meta = {
	title: "Theme/Recipes/Alert",
	component: Alert,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the alert",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the alert",
		},
		orientation: {
			control: "select",
			options: orientations,
			description: "The layout direction of the alert",
		},
		title: {
			control: "text",
			description: "The title text of the alert",
		},
		description: {
			control: "text",
			description: "The description text of the alert",
		},
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "info",
		variant: "soft",
		size: "md",
		orientation: "horizontal",
		title: "Alert",
		description: "This is an alert description.",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { AlertGrid },
		template: "<AlertGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { AlertSizeGrid },
		template: "<AlertSizeGrid />",
	}),
};

export const AllOrientations: StoryObj = {
	render: () => ({
		components: { AlertOrientationGrid },
		template: "<AlertOrientationGrid />",
	}),
};

// Individual color stories
export const Primary: Story = {
	args: {
		color: "primary",
		title: "Primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
		title: "Secondary",
	},
};

export const Success: Story = {
	args: {
		color: "success",
		title: "Success",
	},
};

export const Info: Story = {
	args: {
		color: "info",
		title: "Info",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
		title: "Warning",
	},
};

export const Danger: Story = {
	args: {
		color: "danger",
		title: "Danger",
	},
};

export const Light: Story = {
	args: {
		color: "light",
		title: "Light",
	},
};

export const Dark: Story = {
	args: {
		color: "dark",
		title: "Dark",
	},
};

export const Neutral: Story = {
	args: {
		color: "neutral",
		title: "Neutral",
	},
};

// Variant stories
export const Solid: Story = {
	args: {
		variant: "solid",
		title: "Solid",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		title: "Outline",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		title: "Soft",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
		title: "Subtle",
	},
};

// Size stories
export const Small: Story = {
	args: {
		size: "sm",
		title: "Small",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		title: "Medium",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		title: "Large",
	},
};

// Orientation stories
export const Horizontal: Story = {
	args: {
		orientation: "horizontal",
		title: "Horizontal",
	},
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
		title: "Vertical",
	},
};
