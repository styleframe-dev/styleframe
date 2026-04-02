import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Card from "../../src/components/components/card/Card.vue";
import CardHeader from "../../src/components/components/card/CardHeader.vue";
import CardBody from "../../src/components/components/card/CardBody.vue";
import CardFooter from "../../src/components/components/card/CardFooter.vue";
import CardTitle from "../../src/components/components/card/CardTitle.vue";
import CardDescription from "../../src/components/components/card/CardDescription.vue";
import CardGrid from "../../src/components/components/card/preview/CardGrid.vue";
import CardSizeGrid from "../../src/components/components/card/preview/CardSizeGrid.vue";

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
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
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
				<CardHeader>
					<CardTitle>Card Title</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a card description with some content.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
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
				<CardHeader>
					<CardTitle>Neutral Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a neutral card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		color: "neutral",
	},
};

export const Light: Story = {
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
				<CardHeader>
					<CardTitle>Light Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a light card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		color: "light",
	},
};

export const Dark: Story = {
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
				<CardHeader>
					<CardTitle>Dark Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a dark card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		color: "dark",
	},
};

// Variant stories
export const Solid: Story = {
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
				<CardHeader>
					<CardTitle>Solid Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a solid card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		variant: "solid",
	},
};

export const Outline: Story = {
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
				<CardHeader>
					<CardTitle>Outline Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is an outline card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		variant: "outline",
	},
};

export const Soft: Story = {
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
				<CardHeader>
					<CardTitle>Soft Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a soft card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		variant: "soft",
	},
};

export const Subtle: Story = {
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
				<CardHeader>
					<CardTitle>Subtle Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a subtle card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		variant: "subtle",
	},
};

// Size stories
export const Small: Story = {
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
				<CardHeader size="sm">
					<CardTitle>Small Card</CardTitle>
				</CardHeader>
				<CardBody size="sm">
					<CardDescription>This is a small card.</CardDescription>
				</CardBody>
				<CardFooter size="sm">
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		size: "sm",
	},
};

export const Medium: Story = {
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
				<CardHeader>
					<CardTitle>Medium Card</CardTitle>
				</CardHeader>
				<CardBody>
					<CardDescription>This is a medium card.</CardDescription>
				</CardBody>
				<CardFooter>
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		size: "md",
	},
};

export const Large: Story = {
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
				<CardHeader size="lg">
					<CardTitle>Large Card</CardTitle>
				</CardHeader>
				<CardBody size="lg">
					<CardDescription>This is a large card.</CardDescription>
				</CardBody>
				<CardFooter size="lg">
					Footer content
				</CardFooter>
			</Card>
		`,
	}),
	args: {
		size: "lg",
	},
};
