import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h } from "vue";

import ButtonGroup from "../../src/components/components/button-group/ButtonGroup.vue";
import Button from "../../src/components/components/button/Button.vue";
import ButtonGroupGrid from "../../src/components/components/button-group/preview/ButtonGroupGrid.vue";

const orientations = ["horizontal", "vertical"] as const;

const meta = {
	title: "Theme/Recipes/ButtonGroup",
	component: ButtonGroup,
	tags: ["autodocs"],
	parameters: {
		layout: "padded",
	},
	argTypes: {
		orientation: {
			control: "select",
			options: orientations,
			description: "The orientation of the button group",
		},
		block: {
			control: "boolean",
			description: "Whether the group takes full width",
		},
	},
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		orientation: "horizontal",
	},
	render: (args) => ({
		components: { ButtonGroup, Button },
		setup() {
			return { args };
		},
		template: `
			<ButtonGroup v-bind="args">
				<Button label="Left" />
				<Button label="Center" />
				<Button label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const AllOrientations: StoryObj = {
	render: () => ({
		components: { ButtonGroupGrid },
		template: "<ButtonGroupGrid />",
	}),
};

export const Horizontal: Story = {
	args: {
		orientation: "horizontal",
	},
	render: (args) => ({
		components: { ButtonGroup, Button },
		setup() {
			return { args };
		},
		template: `
			<ButtonGroup v-bind="args">
				<Button label="Left" />
				<Button label="Center" />
				<Button label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Vertical: Story = {
	args: {
		orientation: "vertical",
	},
	render: (args) => ({
		components: { ButtonGroup, Button },
		setup() {
			return { args };
		},
		template: `
			<ButtonGroup v-bind="args">
				<Button label="Top" />
				<Button label="Middle" />
				<Button label="Bottom" />
			</ButtonGroup>
		`,
	}),
};

export const Block: Story = {
	args: {
		orientation: "horizontal",
		block: true,
	},
	render: (args) => ({
		components: { ButtonGroup, Button },
		setup() {
			return { args };
		},
		template: `
			<ButtonGroup v-bind="args">
				<Button label="Left" />
				<Button label="Center" />
				<Button label="Right" />
			</ButtonGroup>
		`,
	}),
};
