import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ButtonGroup from "../../src/components/components/button-group/ButtonGroup.vue";
import Button from "../../src/components/components/button/Button.vue";
import ButtonGroupGrid from "../../src/components/components/button-group/preview/ButtonGroupGrid.vue";
import ButtonGroupVariantGrid from "../../src/components/components/button-group/preview/ButtonGroupVariantGrid.vue";
import ButtonGroupSizeGrid from "../../src/components/components/button-group/preview/ButtonGroupSizeGrid.vue";

const orientations = ["horizontal", "vertical"] as const;

const meta = {
	title: "Theme/Recipes/Button Group",
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

export const AllVariants: StoryObj = {
	render: () => ({
		components: { ButtonGroupVariantGrid },
		template: "<ButtonGroupVariantGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { ButtonGroupSizeGrid },
		template: "<ButtonGroupSizeGrid />",
	}),
};

// Orientation stories

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

export const BlockVertical: Story = {
	args: {
		orientation: "vertical",
		block: true,
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

// Color stories

export const Primary: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button color="primary" label="Left" />
				<Button color="primary" label="Center" />
				<Button color="primary" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Secondary: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button color="secondary" label="Left" />
				<Button color="secondary" label="Center" />
				<Button color="secondary" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Success: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button color="success" label="Left" />
				<Button color="success" label="Center" />
				<Button color="success" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Info: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button color="info" label="Left" />
				<Button color="info" label="Center" />
				<Button color="info" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Warning: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button color="warning" label="Left" />
				<Button color="warning" label="Center" />
				<Button color="warning" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Danger: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button color="danger" label="Left" />
				<Button color="danger" label="Center" />
				<Button color="danger" label="Right" />
			</ButtonGroup>
		`,
	}),
};

// Variant stories

export const Solid: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button variant="solid" label="Left" />
				<Button variant="solid" label="Center" />
				<Button variant="solid" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Outline: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button variant="outline" label="Left" />
				<Button variant="outline" label="Center" />
				<Button variant="outline" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Soft: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button variant="soft" label="Left" />
				<Button variant="soft" label="Center" />
				<Button variant="soft" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Subtle: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button variant="subtle" label="Left" />
				<Button variant="subtle" label="Center" />
				<Button variant="subtle" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Ghost: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button variant="ghost" label="Left" />
				<Button variant="ghost" label="Center" />
				<Button variant="ghost" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Link: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button variant="link" label="Left" />
				<Button variant="link" label="Center" />
				<Button variant="link" label="Right" />
			</ButtonGroup>
		`,
	}),
};

// Size stories

export const ExtraSmall: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button size="xs" label="Left" />
				<Button size="xs" label="Center" />
				<Button size="xs" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Small: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button size="sm" label="Left" />
				<Button size="sm" label="Center" />
				<Button size="sm" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Medium: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button size="md" label="Left" />
				<Button size="md" label="Center" />
				<Button size="md" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const Large: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button size="lg" label="Left" />
				<Button size="lg" label="Center" />
				<Button size="lg" label="Right" />
			</ButtonGroup>
		`,
	}),
};

export const ExtraLarge: Story = {
	render: () => ({
		components: { ButtonGroup, Button },
		template: `
			<ButtonGroup>
				<Button size="xl" label="Left" />
				<Button size="xl" label="Center" />
				<Button size="xl" label="Right" />
			</ButtonGroup>
		`,
	}),
};
