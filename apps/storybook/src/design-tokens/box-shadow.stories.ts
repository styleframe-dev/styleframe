import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import BoxShadowSwatch from "../components/BoxShadowSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./box-shadow.styleframe?css";
import { boxShadowPreview } from "./box-shadow.styleframe?ts";

const boxShadows = [
	"none",
	"xs",
	"sm",
	"md",
	"lg",
	"xl",
	"2xl",
	"inner",
	"ring",
];

const BoxShadowSwatchComponent = defineComponent({
	name: "BoxShadowSwatchComponent",
	props: {
		boxShadow: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(BoxShadowSwatch, {
				name: props.boxShadow,
				previewClass: boxShadowPreview({ boxShadow: props.boxShadow }),
			});
	},
});

const meta = {
	title: "Design Tokens/Shadows/Box Shadow",
	component: BoxShadowSwatchComponent,
	tags: ["autodocs"],
	argTypes: {
		boxShadow: {
			control: "select",
			options: boxShadows,
		},
	},
} satisfies Meta<typeof BoxShadowSwatchComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBoxShadows: StoryObj = {
	render: () => ({
		components: { BoxShadowSwatchComponent, StoryGrid },
		setup() {
			return { boxShadows };
		},
		template: `
			<StoryGrid :items="boxShadows" layout="grid" v-slot="{ item }">
				<BoxShadowSwatchComponent :box-shadow="item" />
			</StoryGrid>
		`,
	}),
};

export const None: Story = {
	args: {
		boxShadow: "none",
	},
};

export const ExtraSmall: Story = {
	args: {
		boxShadow: "xs",
	},
};

export const Small: Story = {
	args: {
		boxShadow: "sm",
	},
};

export const Medium: Story = {
	args: {
		boxShadow: "md",
	},
};

export const Large: Story = {
	args: {
		boxShadow: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		boxShadow: "xl",
	},
};

export const DoubleExtraLarge: Story = {
	args: {
		boxShadow: "2xl",
	},
};

export const Inner: Story = {
	args: {
		boxShadow: "inner",
	},
};

export const Ring: Story = {
	args: {
		boxShadow: "ring",
	},
};
