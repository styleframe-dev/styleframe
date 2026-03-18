import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Paragraph",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `<p>This is a paragraph with default styling. It has no top margin and consistent bottom margin for vertical rhythm.</p>`,
	}),
};

export const Multiple: Story = {
	render: () => ({
		template: `
			<div>
				<p>First paragraph showing the bottom margin spacing between consecutive paragraphs.</p>
				<p>Second paragraph following the first, demonstrating consistent vertical rhythm.</p>
				<p>Third paragraph to further illustrate the spacing pattern.</p>
			</div>
		`,
	}),
};
