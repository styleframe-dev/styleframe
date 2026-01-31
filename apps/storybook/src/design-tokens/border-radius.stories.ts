import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import BorderSwatch from "../components/BorderSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./border-radius.styleframe?css";
import { borderRadiusPreview } from "./border-radius.styleframe?ts";

const borderRadiuses = ["none", "sm", "md", "lg", "xl", "full"];

const BorderRadiusSwatch = defineComponent({
	name: "BorderRadiusSwatch",
	props: {
		borderRadius: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(BorderSwatch, {
				name: props.borderRadius,
				previewClass: borderRadiusPreview({ borderRadius: props.borderRadius }),
			});
	},
});

const meta = {
	title: "Design Tokens/Borders/Border Radius",
	component: BorderRadiusSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderRadius: {
			control: "select",
			options: borderRadiuses,
		},
	},
} satisfies Meta<typeof BorderRadiusSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderRadiuses: StoryObj = {
	render: () => ({
		components: { BorderRadiusSwatch, StoryGrid },
		setup() {
			return { borderRadiuses };
		},
		template: `
			<StoryGrid :items="borderRadiuses" layout="grid" v-slot="{ item }">
				<BorderRadiusSwatch :border-radius="item" />
			</StoryGrid>
		`,
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
