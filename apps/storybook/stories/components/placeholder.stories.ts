import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Placeholder from "../../src/components/components/placeholder/Placeholder.vue";
import PlaceholderSizeGrid from "../../src/components/components/placeholder/preview/PlaceholderSizeGrid.vue";

const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Placeholder",
	component: Placeholder,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		size: {
			control: "select",
			options: sizes,
			description: "The size of the placeholder",
		},
	},
} satisfies Meta<typeof Placeholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		size: "md",
	},
	render: (args) => ({
		components: { Placeholder },
		setup() {
			return { args };
		},
		template: '<Placeholder v-bind="args">Placeholder content</Placeholder>',
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { PlaceholderSizeGrid },
		template: "<PlaceholderSizeGrid />",
	}),
};

export const Small: Story = {
	args: {
		size: "sm",
	},
	render: (args) => ({
		components: { Placeholder },
		setup() {
			return { args };
		},
		template: '<Placeholder v-bind="args">Small placeholder</Placeholder>',
	}),
};

export const Medium: Story = {
	args: {
		size: "md",
	},
	render: (args) => ({
		components: { Placeholder },
		setup() {
			return { args };
		},
		template: '<Placeholder v-bind="args">Medium placeholder</Placeholder>',
	}),
};

export const Large: Story = {
	args: {
		size: "lg",
	},
	render: (args) => ({
		components: { Placeholder },
		setup() {
			return { args };
		},
		template: '<Placeholder v-bind="args">Large placeholder</Placeholder>',
	}),
};
