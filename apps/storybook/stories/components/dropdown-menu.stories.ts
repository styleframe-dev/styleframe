import type { Meta, StoryObj } from "@storybook/vue3-vite";

import DropdownMenu from "@/components/components/dropdown-menu/DropdownMenu.vue";
import DropdownItem from "@/components/components/dropdown-menu/DropdownItem.vue";
import DropdownDivider from "@/components/components/dropdown-menu/DropdownDivider.vue";
import DropdownMenuGrid from "@/components/components/dropdown-menu/preview/DropdownMenuGrid.vue";
import DropdownMenuSizeGrid from "@/components/components/dropdown-menu/preview/DropdownMenuSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/DropdownMenu",
	component: DropdownMenu,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the dropdown menu",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the dropdown menu",
		},
	},
	render: (args) => ({
		components: {
			DropdownMenu,
			DropdownItem,
			DropdownDivider,
		},
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args" style="min-width: 200px">
				<DropdownItem v-bind="args" label="Action" />
				<DropdownItem v-bind="args" label="Another action" />
				<DropdownItem v-bind="args" label="Something else" />
				<DropdownDivider v-bind="args" />
				<DropdownItem v-bind="args" label="Separated action" />
			</DropdownMenu>
		`,
	}),
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		variant: "solid",
		size: "md",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { DropdownMenuGrid },
		template: "<DropdownMenuGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { DropdownMenuSizeGrid },
		template: "<DropdownMenuSizeGrid />",
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
export const Solid: Story = {
	args: {
		variant: "solid",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
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

// Feature stories
export const ActiveItem: StoryObj = {
	render: (args) => ({
		components: { DropdownMenu, DropdownItem, DropdownDivider },
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args" style="min-width: 200px">
				<DropdownItem v-bind="args" label="Action" />
				<DropdownItem v-bind="args" label="Active action" :active="true" />
				<DropdownItem v-bind="args" label="Another action" />
			</DropdownMenu>
		`,
	}),
};

export const DisabledItem: StoryObj = {
	render: (args) => ({
		components: { DropdownMenu, DropdownItem, DropdownDivider },
		setup() {
			return { args };
		},
		template: `
			<DropdownMenu v-bind="args" style="min-width: 200px">
				<DropdownItem v-bind="args" label="Action" />
				<DropdownItem v-bind="args" label="Disabled action" :disabled="true" />
				<DropdownItem v-bind="args" label="Another action" />
			</DropdownMenu>
		`,
	}),
};
