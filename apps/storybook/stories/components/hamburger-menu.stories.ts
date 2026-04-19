import type { Meta, StoryObj } from "@storybook/vue3-vite";

import HamburgerMenu from "../../src/components/components/hamburger-menu/HamburgerMenu.vue";
import HamburgerMenuGrid from "../../src/components/components/hamburger-menu/preview/HamburgerMenuGrid.vue";
import HamburgerMenuSizeGrid from "../../src/components/components/hamburger-menu/preview/HamburgerMenuSizeGrid.vue";
import HamburgerMenuAnimationGrid from "../../src/components/components/hamburger-menu/preview/HamburgerMenuAnimationGrid.vue";

const colors = ["light", "dark", "neutral"] as const;
const sizes = ["sm", "md", "lg"] as const;
const animations = [
	"close",
	"arrow-left",
	"arrow-right",
	"arrow-up",
	"arrow-down",
	"plus",
	"minus",
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
			description: "The animation type when toggled",
		},
		modelValue: {
			control: "boolean",
			description: "Whether the menu is active/open",
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
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { HamburgerMenuGrid },
		template: "<HamburgerMenuGrid />",
	}),
};

export const AllAnimations: StoryObj = {
	render: () => ({
		components: { HamburgerMenuAnimationGrid },
		template: "<HamburgerMenuAnimationGrid />",
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

// Per-animation stories
export const Close: Story = {
	args: { animation: "close" },
};

export const ArrowLeft: Story = {
	args: { animation: "arrow-left" },
};

export const ArrowRight: Story = {
	args: { animation: "arrow-right" },
};

export const ArrowUp: Story = {
	args: { animation: "arrow-up" },
};

export const ArrowDown: Story = {
	args: { animation: "arrow-down" },
};

export const Plus: Story = {
	args: { animation: "plus" },
};

export const Minus: Story = {
	args: { animation: "minus" },
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
