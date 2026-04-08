import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Tooltip from "@/components/components/tooltip/Tooltip.vue";
import TooltipGrid from "@/components/components/tooltip/preview/TooltipGrid.vue";
import TooltipSizeGrid from "@/components/components/tooltip/preview/TooltipSizeGrid.vue";

const colors = ["light", "dark", "neutral"] as const;
const variants = ["solid", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Tooltip",
	component: Tooltip,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the tooltip",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the tooltip",
		},
		label: {
			control: "text",
			description: "The text content of the tooltip",
		},
	},
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "dark",
		variant: "solid",
		size: "md",
		label: "Tooltip",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { TooltipGrid },
		template: "<TooltipGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { TooltipSizeGrid },
		template: "<TooltipSizeGrid />",
	}),
};

export const Freeform: StoryObj = {
	render: (args) => ({
		components: { Tooltip },
		setup() {
			return { args };
		},
		template: `
			<div class="tooltip-row">
				<Tooltip v-bind="args">
					<div style="max-width: 240px">
						<strong>Freeform Tooltip</strong>
						<p style="margin: 4px 0 0; font-weight: normal;">Tooltips can contain text of virtually any size. This is an example of a freeform tooltip with rich content.</p>
					</div>
				</Tooltip>
				<Tooltip v-bind="args" color="light">
					<div style="max-width: 240px">
						<strong>Light Freeform</strong>
						<p style="margin: 4px 0 0; font-weight: normal;">This is a light freeform tooltip with <u>formatted</u> text and <strong>bold</strong> content.</p>
					</div>
				</Tooltip>
			</div>
		`,
	}),
	args: {
		color: "dark",
		variant: "solid",
		size: "md",
	},
};

// Individual color stories
export const Light: Story = {
	args: {
		color: "light",
		label: "Light Tooltip",
	},
};

export const Dark: Story = {
	args: {
		color: "dark",
		label: "Dark Tooltip",
	},
};

export const Neutral: Story = {
	args: {
		color: "neutral",
		label: "Neutral Tooltip",
	},
};

// Variant stories
export const Solid: Story = {
	args: {
		variant: "solid",
		label: "Solid Tooltip",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		label: "Soft Tooltip",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
		label: "Subtle Tooltip",
	},
};

// Size stories
export const Small: Story = {
	args: {
		size: "sm",
		label: "Small Tooltip",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		label: "Medium Tooltip",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		label: "Large Tooltip",
	},
};
