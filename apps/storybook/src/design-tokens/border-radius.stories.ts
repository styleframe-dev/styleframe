import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BorderRadiusSwatch from "../components/BorderRadiusSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import { h } from "vue";
import { defaultBorderRadiusValues } from "@styleframe/theme";

const meta = {
	title: "Design Tokens/Borders/Border Radius",
	component: BorderRadiusSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderRadius: {
			control: "select",
			options: defaultBorderRadiusValues,
		},
	},
} satisfies Meta<typeof BorderRadiusSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderRadiuses: StoryObj = {
	render: () => ({
		components: { BorderRadiusSwatch, StoryGrid },
		setup(props) {
			return () =>
				h(BorderRadiusSwatch, {
					name: props.borderRadius,
					value: props.borderRadius,
				});
		},
	}),
};

export const None: Story = {
	args: {
		borderRadius: "none",
	},
};

export const Small: Story = {
	args: {
		borderRadius: "sm",
	},
};

export const Medium: Story = {
	args: {
		borderRadius: "md",
	},
};

export const Large: Story = {
	args: {
		borderRadius: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		borderRadius: "xl",
	},
};

export const Full: Story = {
	args: {
		borderRadius: "full",
	},
};
