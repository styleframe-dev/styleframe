import { useOtpRecipe, useOtpCellRecipe } from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize otp recipes
export const otp = useOtpRecipe(s);
export const otpCell = useOtpCellRecipe(s);

// Container styles for story layout
selector(".otp-grid", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.md",
	padding: "@spacing.md",
	alignItems: "flex-start",
});

selector(".otp-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".otp-row", {
	display: "flex",
	flexWrap: "wrap",
	gap: "@spacing.lg",
	alignItems: "flex-start",
});

selector(".otp-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	marginBottom: "@spacing.sm",
});

selector(".otp-caption", {
	fontSize: "@font-size.xs",
	fontWeight: "@font-weight.normal",
	color: "@color.text-weak",
	marginBottom: "@spacing.sm",
});

export default s;
