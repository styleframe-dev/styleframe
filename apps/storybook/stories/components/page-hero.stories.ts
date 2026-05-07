import type { Meta, StoryObj } from "@storybook/vue3-vite";

import PageHero from "@/components/components/page-hero/PageHero.vue";
import PageHeroActions from "@/components/components/page-hero/PageHeroActions.vue";
import PageHeroBody from "@/components/components/page-hero/PageHeroBody.vue";
import PageHeroDescription from "@/components/components/page-hero/PageHeroDescription.vue";
import PageHeroHeadline from "@/components/components/page-hero/PageHeroHeadline.vue";
import PageHeroImage from "@/components/components/page-hero/PageHeroImage.vue";
import PageHeroLinks from "@/components/components/page-hero/PageHeroLinks.vue";
import PageHeroTitle from "@/components/components/page-hero/PageHeroTitle.vue";
import PageHeroGrid from "@/components/components/page-hero/preview/PageHeroGrid.vue";
import PageHeroSizeGrid from "@/components/components/page-hero/preview/PageHeroSizeGrid.vue";

const colors = ["neutral", "light", "dark"] as const;
const sizes = ["sm", "md", "lg"] as const;
const orientations = ["vertical", "horizontal"] as const;
const alignments = ["start", "center", "end"] as const;

const meta = {
	title: "Theme/Recipes/PageHero",
	component: PageHero,
	tags: ["autodocs"],
	parameters: {
		layout: "fullscreen",
	},
	argTypes: {
		color: {
			control: "select",
			options: colors,
			description: "The color theme of the hero section",
		},
		size: {
			control: "select",
			options: sizes,
			description: "Padding and gap scale",
		},
		orientation: {
			control: "select",
			options: orientations,
			description: "Stacked vertical or split horizontal layout",
		},
		alignment: {
			control: "select",
			options: alignments,
			description: "Text alignment within the hero",
		},
		reverse: {
			control: "boolean",
			description: "Reverse the layout direction (top↔bottom or left↔right)",
		},
	},
	render: (args) => ({
		components: {
			PageHero,
			PageHeroBody,
			PageHeroHeadline,
			PageHeroTitle,
			PageHeroDescription,
			PageHeroActions,
			PageHeroLinks,
			PageHeroImage,
		},
		setup() {
			return { args };
		},
		template: `
			<PageHero v-bind="args">
				<PageHeroBody :size="args.size" :alignment="args.alignment" :orientation="args.orientation">
					<PageHeroHeadline :size="args.size" :alignment="args.alignment" :orientation="args.orientation">
						<PageHeroTitle :size="args.size">Build websites faster</PageHeroTitle>
						<PageHeroDescription :size="args.size">
							A type-safe, composable CSS-in-TypeScript framework for building design systems.
						</PageHeroDescription>
					</PageHeroHeadline>
					<PageHeroActions :size="args.size" :alignment="args.alignment" :orientation="args.orientation">
						<a class="page-hero-demo-cta">Get started</a>
						<a class="page-hero-demo-cta page-hero-demo-cta-secondary">Learn more</a>
					</PageHeroActions>
					<PageHeroLinks :size="args.size" :alignment="args.alignment" :orientation="args.orientation">
						<a class="page-hero-demo-link">Read the docs →</a>
						<a class="page-hero-demo-link">View on GitHub →</a>
					</PageHeroLinks>
				</PageHeroBody>
				<PageHeroImage v-if="args.orientation === 'horizontal' || (args.orientation === 'vertical' && args.reverse)" :size="args.size">
					<div class="page-hero-demo-media">Media slot</div>
				</PageHeroImage>
			</PageHero>
		`,
	}),
} satisfies Meta<typeof PageHero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		color: "neutral",
		size: "md",
		orientation: "vertical",
		alignment: "center",
	},
};

export const AllVariants: StoryObj = {
	render: () => ({
		components: { PageHeroGrid },
		template: "<PageHeroGrid />",
	}),
};

export const AllSizes: StoryObj = {
	render: () => ({
		components: { PageHeroSizeGrid },
		template: "<PageHeroSizeGrid />",
	}),
};

// Color stories
export const Neutral: Story = { args: { color: "neutral" } };
export const Light: Story = { args: { color: "light" } };
export const Dark: Story = { args: { color: "dark" } };

// Orientation stories
export const Vertical: Story = { args: { orientation: "vertical" } };
export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const VerticalReversed: Story = {
	args: { orientation: "vertical", reverse: true },
};
export const HorizontalReversed: Story = {
	args: { orientation: "horizontal", reverse: true },
};

// Alignment stories
export const AlignStart: Story = { args: { alignment: "start" } };
export const AlignCenter: Story = { args: { alignment: "center" } };
export const AlignEnd: Story = { args: { alignment: "end" } };

// Size stories
export const Small: Story = { args: { size: "sm" } };
export const Medium: Story = { args: { size: "md" } };
export const Large: Story = { args: { size: "lg" } };
