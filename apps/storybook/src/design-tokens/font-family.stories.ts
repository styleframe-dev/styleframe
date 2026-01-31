import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import TypographySwatch from "../components/TypographySwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./font-family.styleframe?css";
import { fontFamilyPreview } from "./font-family.styleframe?ts";

const fontFamilies = ["base", "print", "mono"];

const FontFamilySwatch = defineComponent({
	name: "FontFamilySwatch",
	props: {
		fontFamily: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(TypographySwatch, {
				name: props.fontFamily,
				previewClass: fontFamilyPreview({ fontFamily: props.fontFamily }),
				sampleText: "The quick brown fox jumps over the lazy dog. 0123456789",
			});
	},
});

const meta = {
	title: "Design Tokens/Typography/Font Family",
	component: FontFamilySwatch,
	tags: ["autodocs"],
	argTypes: {
		fontFamily: {
			control: "select",
			options: fontFamilies,
		},
	},
} satisfies Meta<typeof FontFamilySwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontFamilies: StoryObj = {
	render: () => ({
		components: { FontFamilySwatch, StoryGrid },
		setup() {
			return { fontFamilies };
		},
		template: `
			<StoryGrid :items="fontFamilies" layout="list" v-slot="{ item }">
				<FontFamilySwatch :font-family="item" />
			</StoryGrid>
		`,
	}),
};

export const Base: Story = {
	args: {
		fontFamily: "base",
	},
};

export const Print: Story = {
	args: {
		fontFamily: "print",
	},
};

export const Mono: Story = {
	args: {
		fontFamily: "mono",
	},
};
