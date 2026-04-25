import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Dropdown from "@/components/components/dropdown/Dropdown.vue";
import DropdownArrow from "@/components/components/dropdown/DropdownArrow.vue";
import DropdownItem from "@/components/components/dropdown/DropdownItem.vue";
import DropdownLabel from "@/components/components/dropdown/DropdownLabel.vue";
import DropdownSeparator from "@/components/components/dropdown/DropdownSeparator.vue";
import DropdownGrid from "@/components/components/dropdown/preview/DropdownGrid.vue";
import DropdownSizeGrid from "@/components/components/dropdown/preview/DropdownSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Dropdown",
	component: Dropdown,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the dropdown",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the dropdown",
		},
	},
	render: (args) => ({
		components: {
			Dropdown,
			DropdownArrow,
			DropdownItem,
			DropdownLabel,
			DropdownSeparator,
		},
		setup() {
			return { args };
		},
		template: `
			<div class="dropdown-wrapper">
				<Dropdown v-bind="args">
					<DropdownLabel :color="args.color" :size="args.size">Account</DropdownLabel>
					<DropdownItem v-bind="args">Profile</DropdownItem>
					<DropdownItem v-bind="args">Settings</DropdownItem>
					<DropdownSeparator :color="args.color" />
					<DropdownItem v-bind="args">Sign out</DropdownItem>
				</Dropdown>
				<DropdownArrow :color="args.color" :variant="args.variant" class="dropdown-arrow-position" />
			</div>
		`,
	}),
} satisfies Meta<typeof Dropdown>;

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
		components: { DropdownGrid },
		template: "<DropdownGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { DropdownSizeGrid },
		template: "<DropdownSizeGrid />",
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
