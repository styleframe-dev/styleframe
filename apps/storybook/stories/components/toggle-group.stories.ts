import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ToggleGroup from "@/components/components/toggle/ToggleGroup.vue";
import Toggle from "@/components/components/toggle/Toggle.vue";
import ToggleGroupGrid from "@/components/components/toggle/preview/ToggleGroupGrid.vue";

const orientations = ["vertical", "horizontal"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Toggle Group",
	component: ToggleGroup,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		orientation: {
			control: "select",
			options: orientations,
			description: "The layout direction of the group",
		},
		size: {
			control: "select",
			options: sizes,
			description: "The gap between toggles",
		},
	},
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { ToggleGroup, Toggle },
		setup() {
			return { args };
		},
		template: `
			<ToggleGroup v-bind="args">
				<Toggle checked label="Email" />
				<Toggle label="SMS" />
				<Toggle label="Push notifications" />
			</ToggleGroup>
		`,
	}),
	args: {
		orientation: "vertical",
		size: "md",
	},
};

export const AllOrientations: StoryObj = {
	render: () => ({
		components: { ToggleGroupGrid },
		template: "<ToggleGroupGrid />",
	}),
};

export const Vertical: Story = {
	render: (args) => ({
		components: { ToggleGroup, Toggle },
		setup() {
			return { args };
		},
		template: `
			<ToggleGroup v-bind="args">
				<Toggle checked label="Email" />
				<Toggle label="SMS" />
				<Toggle label="Push notifications" />
			</ToggleGroup>
		`,
	}),
	args: {
		orientation: "vertical",
		size: "md",
	},
};

export const Horizontal: Story = {
	render: (args) => ({
		components: { ToggleGroup, Toggle },
		setup() {
			return { args };
		},
		template: `
			<ToggleGroup v-bind="args">
				<Toggle checked label="Email" />
				<Toggle label="SMS" />
				<Toggle label="Push" />
			</ToggleGroup>
		`,
	}),
	args: {
		orientation: "horizontal",
		size: "md",
	},
};
