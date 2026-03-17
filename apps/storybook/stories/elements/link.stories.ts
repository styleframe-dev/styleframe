import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Link",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `<a href="#">This is a link</a>`,
	}),
};

export const InParagraph: Story = {
	render: () => ({
		template: `<p>Visit the <a href="#">documentation</a> for more details.</p>`,
	}),
};

export const Multiple: Story = {
	render: () => ({
		template: `
			<p>
				Check out <a href="#">link one</a>, <a href="#">link two</a>, and <a href="#">link three</a>.
			</p>
		`,
	}),
};
