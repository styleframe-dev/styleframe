import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { defineComponent, h } from "vue";

import ScaleSwatch from "../components/ScaleSwatch.vue";
import StoryGrid from "../components/StoryGrid.vue";
import "./scale.styleframe?css";
import { scaleValues, scaleRatios } from "./scale.styleframe";

const scales = Object.keys(scaleValues) as (keyof typeof scaleValues)[];

const ScaleSwatchComponent = defineComponent({
	name: "ScaleSwatchComponent",
	props: {
		scale: {
			type: String,
			required: true,
		},
	},
	setup(props) {
		return () =>
			h(ScaleSwatch, {
				name: props.scale,
				value: scaleValues[props.scale as keyof typeof scaleValues],
				ratio: scaleRatios[props.scale as keyof typeof scaleRatios],
			});
	},
});

const meta = {
	title: "Design Tokens/Scales/Scale",
	component: ScaleSwatchComponent,
	tags: ["autodocs"],
	argTypes: {
		scale: {
			control: "select",
			options: scales,
		},
	},
} satisfies Meta<typeof ScaleSwatchComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllScales: StoryObj = {
	render: () => ({
		components: { ScaleSwatchComponent, StoryGrid },
		setup() {
			return { scales };
		},
		template: `
			<StoryGrid :items="scales" layout="list" v-slot="{ item }">
				<ScaleSwatchComponent :scale="item" />
			</StoryGrid>
		`,
	}),
};

export const MinorSecond: Story = {
	args: {
		scale: "minor-second",
	},
};

export const MajorSecond: Story = {
	args: {
		scale: "major-second",
	},
};

export const MinorThird: Story = {
	args: {
		scale: "minor-third",
	},
};

export const MajorThird: Story = {
	args: {
		scale: "major-third",
	},
};

export const PerfectFourth: Story = {
	args: {
		scale: "perfect-fourth",
	},
};

export const AugmentedFourth: Story = {
	args: {
		scale: "augmented-fourth",
	},
};

export const PerfectFifth: Story = {
	args: {
		scale: "perfect-fifth",
	},
};

export const Golden: Story = {
	args: {
		scale: "golden",
	},
};
