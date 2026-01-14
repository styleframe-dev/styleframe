import { isInstanceLicenseRequired } from "@styleframe/license";
import { markInstanceLicenseRequired } from "@styleframe/license";
import { styleframe } from "styleframe";
import { useTokens } from "./theme/useTokens";

const s = styleframe();

const { colorPrimary, colorSecondary } = useTokens(s);

s.utility("fontSize", ({ value }) => ({ fontSize: value }));
s.utility("fontWeight", ({ value }) => ({ fontWeight: value }));

s.selector(".h1", {
	color: s.ref(colorPrimary),
	background: s.ref(colorSecondary),
});

s.recipe({
	name: "h1",
	base: {
		fontSize: "32px",
		fontWeight: "bold",
	},
});

// markInstanceLicenseRequired(s);

export default s;
