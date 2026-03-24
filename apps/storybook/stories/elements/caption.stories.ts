import type { Meta, StoryObj } from "@storybook/vue3-vite";

const meta = {
	title: "Theme/Elements/Caption",
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: () => ({
		template: `
			<table class="_min-width:[320px]" border="1">
				<caption>Monthly savings</caption>
				<thead>
					<tr>
						<th>Month</th>
						<th>Amount</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>January</td>
						<td>$100</td>
					</tr>
					<tr>
						<td>February</td>
						<td>$150</td>
					</tr>
				</tbody>
			</table>
		`,
	}),
};
