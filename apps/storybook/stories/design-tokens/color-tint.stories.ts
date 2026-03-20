import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ColorTintSwatch from "../../src/components/design-tokens/colors/ColorTintSwatch.vue";
import StoryGrid from "../../src/components/primitives/StoryGrid.vue";

const tints = ["base", "50", "100", "150", "200"];
const colors = [
	"primary",
	"secondary",
	"success",
	"warning",
	"danger",
	"info",
	"gray",
];

const tintLabels: Record<string, string> = {
	base: "Base",
	"50": "Tint 50 (+5%)",
	"100": "Tint 100 (+10%)",
	"150": "Tint 150 (+15%)",
	"200": "Tint 200 (+20%)",
};

const meta = {
	title: "Design Tokens/Colors/Color Tint",
	component: ColorTintSwatch,
	tags: ["autodocs"],
	argTypes: {
		color: {
			control: "select",
			options: colors,
		},
		value: {
			control: "select",
			options: tints,
		},
	},
} satisfies Meta<typeof ColorTintSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { colors, tints, tintLabels };
		},
		template: `
			<div v-for="color in colors" :key="color" style="margin-bottom: 32px;">
				<h3 style="margin-bottom: 12px; text-transform: capitalize;">{{ color }}</h3>
				<StoryGrid :items="tints">
					<template #default="{ item }">
						<ColorTintSwatch :name="item" :color="color" :value="item" :label="tintLabels[item]" />
					</template>
				</StoryGrid>
			</div>
		`,
	}),
};

export const PrimaryTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="primary" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const SecondaryTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="secondary" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const SuccessTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="success" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const WarningTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="warning" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const DangerTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="danger" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const InfoTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="info" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const GrayTints: StoryObj = {
	render: () => ({
		components: { ColorTintSwatch, StoryGrid },
		setup() {
			return { tints, tintLabels };
		},
		template: `
			<StoryGrid :items="tints">
				<template #default="{ item }">
					<ColorTintSwatch :name="item" color="gray" :value="item" :label="tintLabels[item]" />
				</template>
			</StoryGrid>
		`,
	}),
};

export const Base: Story = {
	args: {
		name: "base",
		color: "primary",
		value: "base",
		label: "Base",
	},
};

export const Tint50: Story = {
	args: {
		name: "50",
		color: "primary",
		value: "50",
		label: "Tint 50 (+5%)",
	},
};

export const Tint100: Story = {
	args: {
		name: "100",
		color: "primary",
		value: "100",
		label: "Tint 100 (+10%)",
	},
};

export const Tint150: Story = {
	args: {
		name: "150",
		color: "primary",
		value: "150",
		label: "Tint 150 (+15%)",
	},
};

export const Tint200: Story = {
	args: {
		name: "200",
		color: "primary",
		value: "200",
		label: "Tint 200 (+20%)",
	},
};
