import { styleframe } from "virtual:styleframe";
import { useSwatchColors } from "../../theme/useSwatch";

const s = styleframe();
const { ref, selector, variable } = s;

const { swatchColorPrimary } = useSwatchColors(s);

const barWidth = variable("bar-chart.bar.width", "12px", { default: true });
const barGap = variable("bar-chart.gap", "4px", { default: true });
const chartHeight = variable("bar-chart.height", "40px", { default: true });
const barBorderRadius = variable("bar-chart.bar.border-radius", "2px", {
	default: true,
});

selector(".bar-chart", {
	display: "flex",
	alignItems: "flex-end",
	gap: ref(barGap),
	height: ref(chartHeight),
	marginLeft: "auto",
});

selector(".bar-chart__bar", {
	width: ref(barWidth),
	borderRadius: ref(barBorderRadius),
	background: ref(swatchColorPrimary),
});

export default s;
