import { useLocalStorage } from "@vueuse/core";

export type Framework = "vue" | "react" | "other";

export interface FrameworkOption {
	value: Framework;
	label: string;
	icon: string;
}

export const FRAMEWORKS: readonly FrameworkOption[] = [
	{ value: "react", label: "React", icon: "i-mdi-react" },
	{
		value: "other",
		label: "Vanilla",
		icon: "i-mdi-language-typescript",
	},
	{ value: "vue", label: "Vue", icon: "i-mdi-vuejs" },
] as const;

const STORAGE_KEY = "styleframe-docs:framework";

export const useFramework = () => {
	const framework = useLocalStorage<Framework>(STORAGE_KEY, "react", {
		initOnMounted: true,
	});

	return {
		framework,
		frameworks: FRAMEWORKS,
	};
};
