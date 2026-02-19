import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import { badge } from "virtual:styleframe";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"danger",
] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

type Color = (typeof colors)[number];
type Variant = (typeof variants)[number];
type Size = (typeof sizes)[number];

const Badge = defineComponent({
	name: "Badge",
	props: {
		color: {
			type: String as () => Color,
			default: "primary",
		},
		variant: {
			type: String as () => Variant,
			default: "solid",
		},
		size: {
			type: String as () => Size,
			default: "sm",
		},
		label: {
			type: String,
			default: "Badge",
		},
	},
	setup(props) {
		return () =>
			h(
				"span",
				{
					class: badge({
						color: props.color,
						variant: props.variant,
						size: props.size,
					}),
				},
				props.label,
			);
	},
});

const BadgeGrid = defineComponent({
	name: "BadgeGrid",
	setup() {
		return () =>
			h(
				"div",
				{ class: "badge-section" },
				variants.map((variant) =>
					h("div", { key: variant }, [
						h("div", { class: "badge-label" }, variant),
						h(
							"div",
							{ class: "badge-row" },
							colors.map((color) =>
								h(Badge, {
									key: `${variant}-${color}`,
									color,
									variant,
									label: color,
								}),
							),
						),
					]),
				),
			);
	},
});

const SizeGrid = defineComponent({
	name: "SizeGrid",
	setup() {
		return () =>
			h(
				"div",
				{ class: "badge-section" },
				sizes.map((size) =>
					h("div", { key: size }, [
						h("div", { class: "badge-label" }, size),
						h(
							"div",
							{ class: "badge-row" },
							colors.map((color) =>
								h(Badge, {
									key: `${size}-${color}`,
									color,
									size,
									label: color,
								}),
							),
						),
					]),
				),
			);
	},
});

const meta = {
	title: "Theme/Recipes/useBadgeRecipe",
	component: Badge,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the badge",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the badge",
		},
		label: {
			control: "text",
			description: "The text content of the badge",
		},
	},
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "primary",
		variant: "solid",
		size: "sm",
		label: "Badge",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { BadgeGrid },
		template: "<BadgeGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { SizeGrid },
		template: "<SizeGrid />",
	}),
};

// Individual color stories
export const Primary: Story = {
	args: {
		color: "primary",
		label: "Primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
		label: "Secondary",
	},
};

export const Success: Story = {
	args: {
		color: "success",
		label: "Success",
	},
};

export const Info: Story = {
	args: {
		color: "info",
		label: "Info",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
		label: "Warning",
	},
};

export const Danger: Story = {
	args: {
		color: "danger",
		label: "Danger",
	},
};

// Variant stories
export const Solid: Story = {
	args: {
		variant: "solid",
		label: "Solid",
	},
};

export const Outline: Story = {
	args: {
		variant: "outline",
		label: "Outline",
	},
};

export const Soft: Story = {
	args: {
		variant: "soft",
		label: "Soft",
	},
};

export const Subtle: Story = {
	args: {
		variant: "subtle",
		label: "Subtle",
	},
};

// Size stories
export const ExtraSmall: Story = {
	args: {
		size: "xs",
		label: "Extra Small",
	},
};

export const Small: Story = {
	args: {
		size: "sm",
		label: "Small",
	},
};

export const Medium: Story = {
	args: {
		size: "md",
		label: "Medium",
	},
};

export const Large: Story = {
	args: {
		size: "lg",
		label: "Large",
	},
};

export const ExtraLarge: Story = {
	args: {
		size: "xl",
		label: "Extra Large",
	},
};
