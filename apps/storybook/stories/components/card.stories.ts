import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Card from "@/components/components/card/Card.vue";
import CardHeader from "@/components/components/card/CardHeader.vue";
import CardBody from "@/components/components/card/CardBody.vue";
import CardFooter from "@/components/components/card/CardFooter.vue";
import CardTitle from "@/components/components/card/CardTitle.vue";
import CardDescription from "@/components/components/card/CardDescription.vue";
import CardGrid from "@/components/components/card/preview/CardGrid.vue";
import CardSizeGrid from "@/components/components/card/preview/CardSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "outline", "soft", "subtle"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Card",
	component: Card,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color variant of the card",
		},
		variant: {
			control: "select",
			options: variants,
			description: "The visual style variant",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the card",
		},
	},
	render: (args) => ({
		components: {
			Card,
			CardHeader,
			CardBody,
			CardFooter,
			CardTitle,
			CardDescription,
		},
		setup() {
			return { args };
		},
		template: `
			<Card v-bind="args" style="max-width: 400px">
				<CardHeader v-bind="args">
					<CardTitle>Card Title</CardTitle>
				</CardHeader>
				<CardBody v-bind="args">
					<CardDescription>This is a card description with some content.</CardDescription>
				</CardBody>
				<CardFooter v-bind="args">
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
} satisfies Meta<typeof Card>;

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
		components: { CardGrid },
		template: "<CardGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { CardSizeGrid },
		template: "<CardSizeGrid />",
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

export const Outline: Story = {
	args: {
		variant: "outline",
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
