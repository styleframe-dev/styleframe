import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Toggle from "@/components/components/toggle/Toggle.vue";
import ToggleGrid from "@/components/components/toggle/preview/ToggleGrid.vue";
import ToggleSizeGrid from "@/components/components/toggle/preview/ToggleSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Toggle",
	component: Toggle,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color of the toggle track surface",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the toggle",
		},
		checked: {
			control: "boolean",
			description: "Whether the toggle is on",
		},
		disabled: {
			control: "boolean",
			description: "Whether the toggle is disabled",
		},
		label: {
			control: "text",
			description: "The toggle label",
		},
	},
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		size: "md",
		checked: true,
		label: "Enable notifications",
	},
};

export const AllStates: StoryObj = {
	render: () => ({
		components: { ToggleGrid },
		template: "<ToggleGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ToggleSizeGrid },
		template: "<ToggleSizeGrid />",
	}),
};

// Colors
export const Neutral: Story = {
	args: { color: "neutral", checked: true, label: "Neutral" },
};

export const Light: Story = {
	args: { color: "light", checked: true, label: "Light" },
};

export const Dark: Story = {
	args: { color: "dark", checked: true, label: "Dark" },
};

// States
export const Unchecked: Story = {
	args: { checked: false, label: "Off" },
};

export const Checked: Story = {
	args: { checked: true, label: "On" },
};

export const Disabled: Story = {
	args: { disabled: true, label: "Disabled" },
};

export const DisabledChecked: Story = {
	args: { disabled: true, checked: true, label: "Disabled on" },
};

// Sizes
export const Small: Story = {
	args: { size: "sm", checked: true, label: "Small" },
};

export const Medium: Story = {
	args: { size: "md", checked: true, label: "Medium" },
};

export const Large: Story = {
	args: { size: "lg", checked: true, label: "Large" },
};
