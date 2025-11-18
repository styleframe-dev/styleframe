import { isInstanceLicenseRequired } from "@styleframe/license";
import { markInstanceLicenseRequired } from "@styleframe/license";
import { styleframe } from "styleframe";

const s = styleframe();

const colorPrimary = s.variable("color--primary", "blue");
const colorSecondary = s.variable("color--secondary", "pink");

s.selector(".h1", {
	color: s.ref(colorPrimary),
	background: s.ref(colorSecondary),
});

markInstanceLicenseRequired(s);

export default s;
