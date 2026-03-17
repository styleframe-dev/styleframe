import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Dl",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<dl>
				<dt>HTML</dt>
				<dd>HyperText Markup Language, the standard language for creating web pages.</dd>
				<dt>CSS</dt>
				<dd>Cascading Style Sheets, used for describing the presentation of a document.</dd>
				<dt>JavaScript</dt>
				<dd>A programming language that enables interactive web pages.</dd>
			</dl>
		`,
	}),
};

export const MultipleDescriptions: Story = {
	render: () => ({
		template: `
			<dl>
				<dt>Firefox</dt>
				<dd>A free, open source, cross-platform web browser.</dd>
				<dd>Developed by the Mozilla Foundation.</dd>
				<dt>Chrome</dt>
				<dd>A web browser developed by Google.</dd>
			</dl>
		`,
	}),
};
