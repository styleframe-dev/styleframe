import { styleframe } from "@styleframe/core";
import { consume } from "@styleframe/transpiler";
import { useScale } from "./src/variables/useScale.js";
import { useScalePowers } from "./src/variables/useScalePowers.js";
import { defaultScalePowerValues } from "./src/constants/scale.js";

const s = styleframe();
const { scaleGolden } = useScale(s);
const powers = useScalePowers(s, scaleGolden, [1, 2]);

console.log("Power 1:", powers[1]);
console.log("Power 2:", powers[2]);
console.log("Power 1 value:", powers[1].value);
console.log("Power 2 value:", powers[2].value);

const baseSize = s.variable("base", "1rem");
s.selector(".test", ({ variable }) => {
	variable("font-size", s.css`calc(${s.ref(baseSize)} * ${powers[1]})`);
});

console.log("\nCSS:");
console.log(consume(s.root, s.options));
