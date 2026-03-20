import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Abbr",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<p>
				<abbr title="HyperText Markup Language">HTML</abbr>,
				<abbr title="Cascading Style Sheets">CSS</abbr> and
				<abbr title="JavaScript">JS</abbr> are the foundation of the web.
			</p>
		`,
	}),
};
