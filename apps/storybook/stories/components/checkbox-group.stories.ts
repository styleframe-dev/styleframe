import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CheckboxGroup from "@/components/components/checkbox/CheckboxGroup.vue";
import Checkbox from "@/components/components/checkbox/Checkbox.vue";
import CheckboxGroupGrid from "@/components/components/checkbox/preview/CheckboxGroupGrid.vue";

const orientations = ["vertical", "horizontal"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Checkbox Group",
	component: CheckboxGroup,
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
			description: "The gap between checkboxes",
		},
	},
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { CheckboxGroup, Checkbox },
		setup() {
			return { args };
		},
		template: `
			<CheckboxGroup v-bind="args">
				<Checkbox checked label="Email" />
				<Checkbox label="SMS" />
				<Checkbox label="Push notifications" />
			</CheckboxGroup>
		`,
	}),
	args: {
		orientation: "vertical",
		size: "md",
	},
};

export const AllOrientations: StoryObj = {
	render: () => ({
		components: { CheckboxGroupGrid },
		template: "<CheckboxGroupGrid />",
	}),
};

export const Vertical: Story = {
	render: (args) => ({
		components: { CheckboxGroup, Checkbox },
		setup() {
			return { args };
		},
		template: `
			<CheckboxGroup v-bind="args">
				<Checkbox checked label="Email" />
				<Checkbox label="SMS" />
				<Checkbox label="Push notifications" />
			</CheckboxGroup>
		`,
	}),
	args: {
		orientation: "vertical",
		size: "md",
	},
};

export const Horizontal: Story = {
	render: (args) => ({
		components: { CheckboxGroup, Checkbox },
		setup() {
			return { args };
		},
		template: `
			<CheckboxGroup v-bind="args">
				<Checkbox checked label="Email" />
				<Checkbox label="SMS" />
				<Checkbox label="Push" />
			</CheckboxGroup>
		`,
	}),
	args: {
		orientation: "horizontal",
		size: "md",
	},
};
