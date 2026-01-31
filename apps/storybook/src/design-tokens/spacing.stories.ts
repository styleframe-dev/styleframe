import type { Meta, StoryObj } from "@storybook/vue3-vite";

import SpacingSwatch from "../components/SpacingSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import { spacings } from "../components/SpacingSwatch.styleframe";

const meta = {
	title: "Design Tokens/Spacing/Spacing",
	component: SpacingSwatch,
	tags: ["autodocs"],
	argTypes: {
		spacing: {
			control: "select",
			options: spacings,
		},
	},
} satisfies Meta<typeof SpacingSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllSpacings: StoryObj = {
	render: () => ({
		components: { SpacingSwatch, StoryGrid },
		setup() {
			return { spacings };
		},
		template: `
			<StoryGrid :items="spacings" layout="list" v-slot="{ item }">
				<SpacingSwatch :spacing="item" />
			</StoryGrid>
		`,
	}),
};

export const ExtraSmall: Story = {
	args: {
		spacing: "xs",
	},
};

export const Small: Story = {
	args: {
		spacing: "sm",
	},
};

export const Medium: Story = {
	args: {
		spacing: "md",
	},
};

export const Large: Story = {
	args: {
		spacing: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		spacing: "xl",
	},
};

export const DoubleExtraLarge: Story = {
	args: {
		spacing: "2xl",
	},
};
