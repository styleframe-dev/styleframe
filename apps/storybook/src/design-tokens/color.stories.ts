import type { Meta, StoryObj } from "@storybook/vue3-vite";

import ColorSwatch from "../components/ColorSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import { colors } from "../components/ColorSwatch.styleframe";

const meta = {
	title: "Design Tokens/Colors/Color",
	component: ColorSwatch,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
		},
	},
} satisfies Meta<typeof ColorSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllColors: StoryObj = {
	render: () => ({
		components: { ColorSwatch, StoryGrid },
		setup() {
			return { colors };
		},
		template: `
			<StoryGrid :items="colors" layout="grid" v-slot="{ item }">
				<ColorSwatch :color="item" />
			</StoryGrid>
		`,
	}),
};

export const Primary: Story = {
	args: {
		color: "primary",
	},
};

export const Secondary: Story = {
	args: {
		color: "secondary",
	},
};

export const Info: Story = {
	args: {
		color: "info",
	},
};

export const Success: Story = {
	args: {
		color: "success",
	},
};

export const Warning: Story = {
	args: {
		color: "warning",
	},
};

export const Danger: Story = {
	args: {
		color: "danger",
	},
};
