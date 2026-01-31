import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import BorderSwatch from "../components/BorderSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./border-width.styleframe?css";
import { borderWidthPreview } from "./border-width.styleframe?ts";

const borderWidths = ["none", "thin", "medium", "thick"];

const BorderWidthSwatch = defineComponent({
	name: "BorderWidthSwatch",
	props: {
		borderWidth: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(BorderSwatch, {
				name: props.borderWidth,
				previewClass: borderWidthPreview({ borderWidth: props.borderWidth }),
			});
	},
});

const meta = {
	title: "Design Tokens/Borders/Border Width",
	component: BorderWidthSwatch,
	tags: ["autodocs"],
	argTypes: {
		borderWidth: {
			control: "select",
			options: borderWidths,
		},
	},
} satisfies Meta<typeof BorderWidthSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBorderWidths: StoryObj = {
	render: () => ({
		components: { BorderWidthSwatch, StoryGrid },
		setup() {
			return { borderWidths };
		},
		template: `
			<StoryGrid :items="borderWidths" layout="grid" v-slot="{ item }">
				<BorderWidthSwatch :border-width="item" />
			</StoryGrid>
		`,
	}),
};

export const None: Story = {
	args: {
		borderWidth: "none",
	},
};

export const Thin: Story = {
	args: {
		borderWidth: "thin",
	},
};

export const Medium: Story = {
	args: {
		borderWidth: "medium",
	},
};

export const Thick: Story = {
	args: {
		borderWidth: "thick",
	},
};
