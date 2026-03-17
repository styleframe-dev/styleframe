import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Mark",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `<p>You can use the <mark>mark element</mark> to highlight text.</p>`,
	}),
};

export const InSearch: Story = {
	render: () => ({
		template: `<p>Search results for "design": A <mark>design</mark> system provides consistent <mark>design</mark> patterns.</p>`,
	}),
};
