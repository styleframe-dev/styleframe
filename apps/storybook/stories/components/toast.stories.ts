import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Toast from "../../src/components/components/toast/Toast.vue";
import ToastGrid from "../../src/components/components/toast/preview/ToastGrid.vue";
import ToastSizeGrid from "../../src/components/components/toast/preview/ToastSizeGrid.vue";

const colors = [
	"neutral",
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"light",
	"dark",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Toast",
	component: Toast,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the toast",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the toast",
		},
		title: {
			control: "text",
			description: "The title text of the toast",
		},
		description: {
			control: "text",
			description: "The description text of the toast",
		},
		icon: {
			control: "text",
			description: "The icon to display (optional)",
		},
		action: {
			control: "text",
			description: "The action button label (optional)",
		},
		dismissible: {
			control: "boolean",
			description: "Whether the toast can be dismissed",
		},
	},
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		variant: "solid",
		size: "md",
		title: "Toast",
		description: "This is a toast notification.",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { ToastGrid },
		template: "<ToastGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ToastSizeGrid },
		template: "<ToastSizeGrid />",
	}),
};

// Individual color stories
export const Neutral: Story = {
	args: {
		color: "neutral",
		title: "Neutral Toast",
		description: "This is a neutral toast.",
	},
};

export const Primary: Story = {
	args: {
		color: "primary",
		title: "Primary Toast",
		description: "This is a primary toast.",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
		title: "Secondary Toast",
		description: "This is a secondary toast.",
	},
};

export const Success: Story = {
	args: {
		color: "success",
		title: "Success Toast",
		description: "This is a success toast.",
	},
};

export const Info: Story = {
	args: {
		color: "info",
		title: "Info Toast",
		description: "This is an info toast.",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
		title: "Warning Toast",
		description: "This is a warning toast.",
	},
};

export const Error: Story = {
	args: {
		color: "error",
		title: "Error Toast",
		description: "This is an error toast.",
	},
};

export const Light: Story = {
	args: {
		color: "light",
		title: "Light Toast",
		description: "This is a light toast.",
	},
};

export const Dark: Story = {
	args: {
		color: "dark",
		title: "Dark Toast",
		description: "This is a dark toast.",
	},
};

// Variant stories
export const Solid: Story = {
	args: {
		variant: "solid",
		title: "Solid Toast",
		description: "This is a solid toast.",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		title: "Outline Toast",
		description: "This is an outline toast.",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		title: "Soft Toast",
		description: "This is a soft toast.",
	},
};

export const Subtle: Story = {
	args: {
		variant: "solid",
		title: "Subtle Toast",
		description: "This is a subtle toast.",
	},
};

// Size stories
export const Small: Story = {
	args: {
		size: "sm",
		title: "Small Toast",
		description: "This is a small toast.",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		title: "Medium Toast",
		description: "This is a medium toast.",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		title: "Large Toast",
		description: "This is a large toast.",
	},
};

// Feature stories
export const WithIcon: Story = {
	args: {
		color: "info",
		variant: "solid",
		icon: "\u2139\uFE0F",
		title: "Info",
		description: "This toast has a leading icon.",
	},
};

export const WithAction: Story = {
	args: {
		color: "success",
		variant: "solid",
		title: "File uploaded",
		description: "Your file has been uploaded successfully.",
		action: "View",
	},
};

export const WithIconAndAction: Story = {
	args: {
		color: "warning",
		variant: "solid",
		icon: "\u26A0\uFE0F",
		title: "Unsaved changes",
		description: "You have unsaved changes that will be lost.",
		action: "Save now",
	},
};

export const Dismissible: Story = {
	args: {
		color: "error",
		variant: "solid",
		title: "Error",
		description: "Something went wrong. Please try again.",
		dismissible: true,
	},
};

export const WithIconActionAndDismiss: Story = {
	args: {
		color: "success",
		variant: "soft",
		icon: "\u2705",
		title: "Item deleted",
		description: "The item has been moved to trash.",
		action: "Undo",
		dismissible: true,
	},
};
