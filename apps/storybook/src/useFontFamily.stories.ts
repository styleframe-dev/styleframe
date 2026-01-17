import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, defineComponent } from "vue";

import "./useFontFamily.styleframe?css";
import { fontFamilyPreview } from "./useFontFamily.styleframe?recipe";

const sampleText = "The quick brown fox jumps over the lazy dog. 0123456789";

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
			h(
				"div",
				{
					class: "font-family-swatch",
				},
				[
					h("div", { class: "font-family-name" }, props.fontFamily),
					h(
						"div",
						{
							class: fontFamilyPreview({ fontFamily: props.fontFamily }),
						},
						sampleText,
					),
				],
			);
	},
});

const FontFamilyGrid = defineComponent({
	name: "FontFamilyGrid",
	setup() {
		const fontFamilies = ["base", "print", "mono"];

		return () =>
			h(
				"div",
				{
					class: "font-family-grid",
				},
				fontFamilies.map((fontFamily) => h(FontFamilySwatch, { fontFamily })),
			);
	},
});

const meta = {
	title: "Theme/Typography/useFontFamily",
	component: FontFamilySwatch,
	tags: ["autodocs"],
	argTypes: {
		fontFamily: {
			control: "select",
			options: ["base", "print", "mono"],
		},
	},
} satisfies Meta<typeof FontFamilySwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllFontFamilies: StoryObj = {
	render: () => ({
		components: { FontFamilyGrid },
		template: "<FontFamilyGrid />",
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
