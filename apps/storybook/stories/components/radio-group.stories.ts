import type { Meta, StoryObj } from "@storybook/vue3-vite";

import RadioGroup from "@/components/components/radio/RadioGroup.vue";
import Radio from "@/components/components/radio/Radio.vue";
import RadioGroupGrid from "@/components/components/radio/preview/RadioGroupGrid.vue";

const orientations = ["vertical", "horizontal"] as const;
const sizes = ["sm", "md", "lg"] as const;

const meta = {
	title: "Theme/Recipes/Forms/Radio Group",
	component: RadioGroup,
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
			description: "The gap between radios",
		},
	},
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { RadioGroup, Radio },
		setup() {
			return { args };
		},
		template: `
			<RadioGroup v-bind="args">
				<Radio name="rg-default" checked label="Email" />
				<Radio name="rg-default" label="SMS" />
				<Radio name="rg-default" label="Push notifications" />
			</RadioGroup>
		`,
	}),
	args: {
		orientation: "vertical",
		size: "md",
	},
};

export const AllOrientations: StoryObj = {
	render: () => ({
		components: { RadioGroupGrid },
		template: "<RadioGroupGrid />",
	}),
};

export const Vertical: Story = {
	render: (args) => ({
		components: { RadioGroup, Radio },
		setup() {
			return { args };
		},
		template: `
			<RadioGroup v-bind="args">
				<Radio name="rg-vertical" checked label="Email" />
				<Radio name="rg-vertical" label="SMS" />
				<Radio name="rg-vertical" label="Push notifications" />
			</RadioGroup>
		`,
	}),
	args: {
		orientation: "vertical",
		size: "md",
	},
};

export const Horizontal: Story = {
	render: (args) => ({
		components: { RadioGroup, Radio },
		setup() {
			return { args };
		},
		template: `
			<RadioGroup v-bind="args">
				<Radio name="rg-horizontal" checked label="Email" />
				<Radio name="rg-horizontal" label="SMS" />
				<Radio name="rg-horizontal" label="Push" />
			</RadioGroup>
		`,
	}),
	args: {
		orientation: "horizontal",
		size: "md",
	},
};
