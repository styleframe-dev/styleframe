import { styleframe } from "styleframe";
import { useSwatchColors } from "./tokens.styleframe";

const s = styleframe();

const { swatchColorPrimary } = useSwatchColors(s);

const barWidth = s.variable("bar-chart.bar.width", "12px", { default: true });
const barGap = s.variable("bar-chart.gap", "4px", { default: true });
const chartHeight = s.variable("bar-chart.height", "40px", { default: true });
const barBorderRadius = s.variable("bar-chart.bar.border-radius", "2px", {
	default: true,
});

s.selector(".bar-chart", {
	display: "flex",
	alignItems: "flex-end",
	gap: s.ref(barGap),
	height: s.ref(chartHeight),
	marginLeft: "auto",
});

s.selector(".bar-chart__bar", {
	width: s.ref(barWidth),
	borderRadius: s.ref(barBorderRadius),
	background: s.ref(swatchColorPrimary),
});

export default s;
