import type { Meta, StoryObj } from "@storybook/vue3-vite";

import HamburgerMenu from "../../src/components/components/hamburger-menu/HamburgerMenu.vue";
import HamburgerMenuGrid from "../../src/components/components/hamburger-menu/preview/HamburgerMenuGrid.vue";
import HamburgerMenuSizeGrid from "../../src/components/components/hamburger-menu/preview/HamburgerMenuSizeGrid.vue";

const colors = ["light", "dark", "neutral"] as const;
const sizes = ["sm", "md", "lg"] as const;
const animations = [
	"close",
	"arrow-up",
	"arrow-down",
	"arrow-left",
	"arrow-right",
	"minus",
	"plus",
] as const;

const meta = {
	title: "Theme/Recipes/HamburgerMenu",
	component: HamburgerMenu,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size",
		},
		animation: {
			control: "select",
			options: animations,
			description: "The open-state animation",
		},
		active: {
			control: "boolean",
			description: "Whether the menu is open",
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled",
		},
		label: {
			control: "text",
			description: "aria-label for the button",
		},
	},
} satisfies Meta<typeof HamburgerMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		size: "md",
		animation: "close",
		active: false,
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { HamburgerMenuGrid },
		template: "<HamburgerMenuGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { HamburgerMenuSizeGrid },
		template: "<HamburgerMenuSizeGrid />",
	}),
};

// Per-color stories
export const Light: Story = {
	args: { color: "light" },
};

export const Dark: Story = {
	args: { color: "dark" },
	parameters: {
		backgrounds: { default: "dark" },
	},
};

export const Neutral: Story = {
	args: { color: "neutral" },
};

// Per-size stories
export const Small: Story = {
	args: { size: "sm" },
};

export const Medium: Story = {
	args: { size: "md" },
};

export const Large: Story = {
	args: { size: "lg" },
};

// Per-animation stories (all in active=true so the transform is visible)
export const Close: Story = {
	args: { animation: "close", active: true },
};

export const ArrowUp: Story = {
	args: { animation: "arrow-up", active: true },
};

export const ArrowDown: Story = {
	args: { animation: "arrow-down", active: true },
};

export const ArrowLeft: Story = {
	args: { animation: "arrow-left", active: true },
};

export const ArrowRight: Story = {
	args: { animation: "arrow-right", active: true },
};

export const Minus: Story = {
	args: { animation: "minus", active: true },
};

export const Plus: Story = {
	args: { animation: "plus", active: true },
};

// State stories
export const Disabled: Story = {
	args: { disabled: true },
};

export const Active: Story = {
	args: { active: true },
};
