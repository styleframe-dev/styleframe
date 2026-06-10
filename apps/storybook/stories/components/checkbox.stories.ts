import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Checkbox from "@/components/components/checkbox/Checkbox.vue";
import CheckboxGrid from "@/components/components/checkbox/preview/CheckboxGrid.vue";
import CheckboxSizeGrid from "@/components/components/checkbox/preview/CheckboxSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color of the checkbox surface",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the checkbox",
		},
		checked: {
			control: "boolean",
			description: "Whether the checkbox is checked",
		},
		indeterminate: {
			control: "boolean",
			description: "Whether the checkbox is in an indeterminate state",
		},
		disabled: {
			control: "boolean",
			description: "Whether the checkbox is disabled",
		},
		label: {
			control: "text",
			description: "The checkbox label",
		},
	},
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		size: "md",
		checked: true,
		label: "Accept terms and conditions",
	},
};

export const AllStates: StoryObj = {
	render: () => ({
		components: { CheckboxGrid },
		template: "<CheckboxGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { CheckboxSizeGrid },
		template: "<CheckboxSizeGrid />",
	}),
};

// Colors
export const Neutral: Story = {
	args: { color: "neutral", label: "Neutral" },
};

export const Light: Story = {
	args: { color: "light", label: "Light" },
};

export const Dark: Story = {
	args: { color: "dark", label: "Dark" },
};

// States
export const Unchecked: Story = {
	args: { checked: false, label: "Unchecked" },
};

export const Checked: Story = {
	args: { checked: true, label: "Checked" },
};

export const Indeterminate: Story = {
	args: { indeterminate: true, label: "Indeterminate" },
};

export const Disabled: Story = {
	args: { disabled: true, label: "Disabled" },
};

export const DisabledChecked: Story = {
	args: { disabled: true, checked: true, label: "Disabled checked" },
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
