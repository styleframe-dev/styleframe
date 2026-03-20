import { createEventBus } from "./eventBus";

export const themeEventBus = createEventBus<{
	"theme-change": void;
}>();

const observer = new MutationObserver(() => {
	requestAnimationFrame(() => {
		themeEventBus.emit("theme-change");
	});
});

observer.observe(document.body, {
	attributes: true,
	attributeFilter: ["data-theme"],
});
