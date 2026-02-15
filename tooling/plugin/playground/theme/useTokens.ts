import type { Styleframe } from "@styleframe/core";
import { useDesignTokensPreset } from "@styleframe/theme";

export function useTokens(s: Styleframe) {
	const { variable, theme, keyframes } = s;

	const tokens = useDesignTokensPreset(s);

	// Custom semantic tokens
	const colorWhite = variable("color.white", "#ffffff", { default: true });
	const colorBackground = variable("color.background", "#ffffff", {
		default: true,
	});
	const colorSurface = variable("color.surface", "#f8fafc", {
		default: true,
	});
	const colorText = variable("color.text", "#0f172a", { default: true });
	const colorTextMuted = variable("color.text-muted", "#64748b", {
		default: true,
	});
	const colorBorder = variable("color.border", "#e2e8f0", {
		default: true,
	});

	// Keyframes
	const fadeIn = keyframes("fade-in", {
		"0%": { opacity: "0", transform: "translateY(-4px)" },
		"100%": { opacity: "1", transform: "translateY(0)" },
	});

	const spin = keyframes("spin", {
		"0%": { transform: "rotate(0deg)" },
		"100%": { transform: "rotate(360deg)" },
	});

	// Dark theme
	theme("dark", (ctx) => {
		ctx.variable(colorBackground, "#0f172a");
		ctx.variable(colorSurface, "#1e293b");
		ctx.variable(colorText, "#f1f5f9");
		ctx.variable(colorTextMuted, "#94a3b8");
		ctx.variable(colorBorder, "#334155");
	});

	return {
		tokens,
		colorWhite,
		colorBackground,
		colorSurface,
		colorText,
		colorTextMuted,
		colorBorder,
		fadeIn,
		spin,
	};
}
