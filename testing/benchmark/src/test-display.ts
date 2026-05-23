import { styleframe } from "styleframe";
import { transpile } from "styleframe/transpiler";

// Test 1: Manual registration (our approach)
const s1 = styleframe();
s1.utility("display", ({ value }) => ({ display: value }))({
	flex: "flex",
	block: "block",
});

const out1 = await transpile(s1, { type: "css" });
const css1 = out1.files[0]?.content ?? "";
console.log("=== Manual registration ===");
console.log(css1);

// Test 2: Using theme utility
import { useDisplayUtility } from "@styleframe/theme";
const s2 = styleframe();
useDisplayUtility(s2, { flex: "flex", block: "block" });

const out2 = await transpile(s2, { type: "css" });
const css2 = out2.files[0]?.content ?? "";
console.log("=== Theme useDisplayUtility ===");
console.log(css2);
