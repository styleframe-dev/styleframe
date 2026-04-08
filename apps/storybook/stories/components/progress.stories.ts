import type { Meta, StoryObj } from "@storybook/vue3-vite";

import Progress from "../../src/components/components/progress/Progress.vue";
import ProgressBar from "../../src/components/components/progress/ProgressBar.vue";
import ProgressGrid from "../../src/components/components/progress/preview/ProgressGrid.vue";
import ProgressSizeGrid from "../../src/components/components/progress/preview/ProgressSizeGrid.vue";

const colors = [
	"primary",
	"secondary",
	"success",
	"info",
	"warning",
	"error",
	"light",
	"dark",
	"neutral",
] as const;
const sizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta = {
	title: "Theme/Recipes/Progress",
	component: Progress,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color of the progress bar fill",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size (height) of the progress bar",
		},
		value: {
			control: { type: "range", min: 0, max: 100, step: 1 },
			description: "The progress value (0-100)",
		},
	},
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 65,
	},
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :size="args.size" :value="args.value">
				<ProgressBar :color="args.color" :size="args.size" :value="args.value" />
			</Progress>
		`,
	}),
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { ProgressGrid },
		template: "<ProgressGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ProgressSizeGrid },
		template: "<ProgressSizeGrid />",
	}),
};

// Individual color stories
export const Primary: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :value="args.value">
				<ProgressBar color="primary" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Secondary: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :value="args.value">
				<ProgressBar color="secondary" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Success: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :value="args.value">
				<ProgressBar color="success" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Info: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :value="args.value">
				<ProgressBar color="info" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Warning: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :value="args.value">
				<ProgressBar color="warning" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Error: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress :value="args.value">
				<ProgressBar color="error" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Light: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress color="light" :value="args.value">
				<ProgressBar color="light" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Dark: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress color="dark" :value="args.value">
				<ProgressBar color="dark" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Neutral: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress color="neutral" :value="args.value">
				<ProgressBar color="neutral" :value="args.value" />
			</Progress>
		`,
	}),
};

// Size stories
export const ExtraSmall: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress size="xs" :value="args.value">
				<ProgressBar size="xs" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Small: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress size="sm" :value="args.value">
				<ProgressBar size="sm" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Medium: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress size="md" :value="args.value">
				<ProgressBar size="md" :value="args.value" />
			</Progress>
		`,
	}),
};

export const Large: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress size="lg" :value="args.value">
				<ProgressBar size="lg" :value="args.value" />
			</Progress>
		`,
	}),
};

export const ExtraLarge: Story = {
	args: { value: 65 },
	render: (args) => ({
		components: { Progress, ProgressBar },
		setup() {
			return { args };
		},
		template: `
			<Progress size="xl" :value="args.value">
				<ProgressBar size="xl" :value="args.value" />
			</Progress>
		`,
	}),
};
