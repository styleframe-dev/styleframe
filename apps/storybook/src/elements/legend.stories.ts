import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Legend",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<fieldset>
				<legend>Personal Information</legend>
				<label>
					Name
					<input type="text" />
				</label>
			</fieldset>
		`,
	}),
};
