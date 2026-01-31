import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import BreakpointSwatch from "../components/BreakpointSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./breakpoint.styleframe?css";
import { breakpointValues, breakpointWidths } from "./breakpoint.styleframe";

const breakpoints = Object.keys(
	breakpointValues,
) as (keyof typeof breakpointValues)[];

const BreakpointSwatchComponent = defineComponent({
	name: "BreakpointSwatchComponent",
	props: {
		breakpoint: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(BreakpointSwatch, {
				name: props.breakpoint,
				value:
					breakpointValues[props.breakpoint as keyof typeof breakpointValues],
				width:
					breakpointWidths[props.breakpoint as keyof typeof breakpointWidths],
			});
	},
});

const meta = {
	title: "Design Tokens/Layout/Breakpoint",
	component: BreakpointSwatchComponent,
	tags: ["autodocs"],
	argTypes: {
		breakpoint: {
			control: "select",
			options: breakpoints,
		},
	},
} satisfies Meta<typeof BreakpointSwatchComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllBreakpoints: StoryObj = {
	render: () => ({
		components: { BreakpointSwatchComponent, StoryGrid },
		setup() {
			return { breakpoints };
		},
		template: `
			<StoryGrid :items="breakpoints" layout="list" v-slot="{ item }">
				<BreakpointSwatchComponent :breakpoint="item" />
			</StoryGrid>
		`,
	}),
};

export const ExtraSmall: Story = {
	args: {
		breakpoint: "xs",
	},
};

export const Small: Story = {
	args: {
		breakpoint: "sm",
	},
};

export const Medium: Story = {
	args: {
		breakpoint: "md",
	},
};

export const Large: Story = {
	args: {
		breakpoint: "lg",
	},
};

export const ExtraLarge: Story = {
	args: {
		breakpoint: "xl",
	},
};
