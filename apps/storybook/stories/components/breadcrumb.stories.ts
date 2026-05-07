import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Breadcrumb from "../../src/components/components/breadcrumb/Breadcrumb.vue";
import BreadcrumbItem from "../../src/components/components/breadcrumb/BreadcrumbItem.vue";
import BreadcrumbGrid from "../../src/components/components/breadcrumb/preview/BreadcrumbGrid.vue";
import BreadcrumbSizeGrid from "../../src/components/components/breadcrumb/preview/BreadcrumbSizeGrid.vue";

const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Breadcrumb",
	component: Breadcrumb,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		size: {
			control: "select",
			options: sizes,
			description: "The size of the breadcrumb",
		},
	},
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { Breadcrumb, BreadcrumbItem },
		setup() {
			return { args };
		},
		template: `
			<Breadcrumb v-bind="args">
				<BreadcrumbItem href="#">Home</BreadcrumbItem>
				<BreadcrumbItem href="#">Library</BreadcrumbItem>
				<BreadcrumbItem active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { BreadcrumbGrid },
		template: "<BreadcrumbGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { BreadcrumbSizeGrid },
		template: "<BreadcrumbSizeGrid />",
	}),
};

// Color stories

export const Light: Story = {
	render: () => ({
		components: { Breadcrumb, BreadcrumbItem },
		template: `
			<Breadcrumb>
				<BreadcrumbItem color="light" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem color="light" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem color="light" active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const Dark: Story = {
	render: () => ({
		components: { Breadcrumb, BreadcrumbItem },
		template: `
			<Breadcrumb>
				<BreadcrumbItem color="dark" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem color="dark" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem color="dark" active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const Neutral: Story = {
	render: () => ({
		components: { Breadcrumb, BreadcrumbItem },
		template: `
			<Breadcrumb>
				<BreadcrumbItem color="neutral" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem color="neutral" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem color="neutral" active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

// Size stories

export const Small: Story = {
	args: { size: "sm" },
	render: (args) => ({
		components: { Breadcrumb, BreadcrumbItem },
		setup() {
			return { args };
		},
		template: `
			<Breadcrumb v-bind="args">
				<BreadcrumbItem size="sm" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem size="sm" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem size="sm" active>Current</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const Medium: Story = {
	args: { size: "md" },
	render: (args) => ({
		components: { Breadcrumb, BreadcrumbItem },
		setup() {
			return { args };
		},
		template: `
			<Breadcrumb v-bind="args">
				<BreadcrumbItem size="md" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem size="md" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem size="md" active>Current</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const Large: Story = {
	args: { size: "lg" },
	render: (args) => ({
		components: { Breadcrumb, BreadcrumbItem },
		setup() {
			return { args };
		},
		template: `
			<Breadcrumb v-bind="args">
				<BreadcrumbItem size="lg" href="#">Home</BreadcrumbItem>
				<BreadcrumbItem size="lg" href="#">Library</BreadcrumbItem>
				<BreadcrumbItem size="lg" active>Current</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

// Feature stories

export const Active: Story = {
	render: () => ({
		components: { Breadcrumb, BreadcrumbItem },
		template: `
			<Breadcrumb>
				<BreadcrumbItem href="#">Home</BreadcrumbItem>
				<BreadcrumbItem href="#">Library</BreadcrumbItem>
				<BreadcrumbItem active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const Disabled: Story = {
	render: () => ({
		components: { Breadcrumb, BreadcrumbItem },
		template: `
			<Breadcrumb>
				<BreadcrumbItem href="#">Home</BreadcrumbItem>
				<BreadcrumbItem href="#" disabled>Disabled</BreadcrumbItem>
				<BreadcrumbItem active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};

export const CustomSeparator: StoryObj = {
	render: () => ({
		components: { Breadcrumb, BreadcrumbItem },
		template: `
			<Breadcrumb separator="›">
				<BreadcrumbItem href="#">Home</BreadcrumbItem>
				<BreadcrumbItem href="#">Library</BreadcrumbItem>
				<BreadcrumbItem active>Current Page</BreadcrumbItem>
			</Breadcrumb>
		`,
	}),
};
