import "virtual:styleframe.css";
import {
	buttonRecipe,
	badgeRecipe,
	alertRecipe,
	avatarRecipe,
	cardSelector,
} from "virtual:styleframe";

// --- Helpers ---

function capitalize(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function setClass(id: string, className: string) {
	const el = document.getElementById(id);
	if (el) el.className = className;
}

// --- Buttons ---

const buttonColors = ["primary", "secondary", "success", "danger"] as const;

function renderButtons() {
	const solidEl = document.getElementById("buttons-solid");
	if (solidEl) {
		solidEl.innerHTML = buttonColors
			.map(
				(color) =>
					`<button class="${buttonRecipe({ color, variant: "solid" })}">${capitalize(color)}</button>`,
			)
			.join("");
	}

	const outlineEl = document.getElementById("buttons-outline");
	if (outlineEl) {
		outlineEl.innerHTML = buttonColors
			.map(
				(color) =>
					`<button class="${buttonRecipe({ color, variant: "outline" })}">${capitalize(color)}</button>`,
			)
			.join("");
	}

	const ghostEl = document.getElementById("buttons-ghost");
	if (ghostEl) {
		ghostEl.innerHTML = buttonColors
			.map(
				(color) =>
					`<button class="${buttonRecipe({ color, variant: "ghost" })}">${capitalize(color)}</button>`,
			)
			.join("");
	}

	const sizesEl = document.getElementById("buttons-sizes");
	if (sizesEl) {
		sizesEl.innerHTML = (["sm", "md", "lg"] as const)
			.map(
				(size) =>
					`<button class="${buttonRecipe({ size })}">Size ${size.toUpperCase()}</button>`,
			)
			.join("");
	}

	const disabledEl = document.getElementById("buttons-disabled");
	if (disabledEl) {
		disabledEl.innerHTML = `
			<button class="${buttonRecipe({ disabled: true })}" disabled>Disabled Solid</button>
			<button class="${buttonRecipe({ variant: "outline", disabled: true })}" disabled>Disabled Outline</button>
			<button class="${buttonRecipe({ variant: "ghost", disabled: true })}" disabled>Disabled Ghost</button>
		`;
	}

	// Card footer buttons
	setClass("btn-card-learn", buttonRecipe({ variant: "ghost" }));
	setClass("btn-card-explore", buttonRecipe({ variant: "ghost" }));
	setClass("btn-card-recipes", buttonRecipe({ variant: "ghost" }));

	// Dark theme buttons
	setClass("btn-dark-primary", buttonRecipe({ color: "primary" }));
	setClass(
		"btn-dark-outline",
		buttonRecipe({ color: "primary", variant: "outline" }),
	);
}

// --- Badges ---

const badgeColors = [
	"primary",
	"secondary",
	"success",
	"warning",
	"danger",
	"info",
] as const;

function renderBadges() {
	const solidEl = document.getElementById("badges-solid");
	if (solidEl) {
		solidEl.innerHTML = badgeColors
			.map(
				(color) =>
					`<span class="${badgeRecipe({ color })}">${capitalize(color)}</span>`,
			)
			.join("");
	}

	const outlineEl = document.getElementById("badges-outline");
	if (outlineEl) {
		outlineEl.innerHTML = badgeColors
			.map(
				(color) =>
					`<span class="${badgeRecipe({ color, variant: "outline" })}">${capitalize(color)}</span>`,
			)
			.join("");
	}

	const sizesEl = document.getElementById("badges-sizes");
	if (sizesEl) {
		sizesEl.innerHTML = (["sm", "md", "lg"] as const)
			.map(
				(size) =>
					`<span class="${badgeRecipe({ size })}">${size.toUpperCase()}</span>`,
			)
			.join("");
	}
}

// --- Alerts ---

const alertColors = ["success", "warning", "danger", "info"] as const;

const alertConfig: Record<
	string,
	{ icon: string; title: string; message: string }
> = {
	success: {
		icon: "\u2713",
		title: "Success",
		message: "Your changes have been saved successfully.",
	},
	warning: {
		icon: "\u26A0",
		title: "Warning",
		message: "Your session will expire in 5 minutes.",
	},
	danger: {
		icon: "\u2715",
		title: "Error",
		message: "There was a problem processing your request.",
	},
	info: {
		icon: "\u2139",
		title: "Information",
		message: "A new version is available. Refresh to update.",
	},
};

function renderAlerts() {
	const alertsEl = document.getElementById("alerts");
	if (alertsEl) {
		alertsEl.innerHTML = alertColors
			.map((color) => {
				const { icon, title, message } = alertConfig[color];
				return `
				<div class="alert ${alertRecipe({ color })}">
					<div class="alert__icon">${icon}</div>
					<div class="alert__content">
						<p class="alert__title">${title}</p>
						<p class="alert__description">${message}</p>
					</div>
					<button class="alert__dismiss" aria-label="Dismiss">\u2715</button>
				</div>
			`;
			})
			.join("");
	}
}

// --- Avatars ---

const initials = ["A", "B", "C", "D", "E"];

function renderAvatars() {
	const sizesEl = document.getElementById("avatars-sizes");
	if (sizesEl) {
		const avatarSizes = ["xs", "sm", "md", "lg", "xl"] as const;
		sizesEl.innerHTML = avatarSizes
			.map(
				(size, i) =>
					`<div class="avatar ${avatarRecipe({ size })}">${initials[i]}</div>`,
			)
			.join("");
	}

	const shapesEl = document.getElementById("avatars-shapes");
	if (shapesEl) {
		const shapes = ["circle", "rounded", "square"] as const;
		shapesEl.innerHTML = shapes
			.map(
				(shape) =>
					`<div class="avatar ${avatarRecipe({ size: "lg", shape })}">${shape[0].toUpperCase()}</div>`,
			)
			.join("");
	}
}

// --- Initialize ---

renderButtons();
renderBadges();
renderAlerts();
renderAvatars();

// Log recipe outputs for debugging
console.log("buttonRecipe():", buttonRecipe());
console.log(
	'buttonRecipe({ color: "danger", variant: "outline" }):',
	buttonRecipe({ color: "danger", variant: "outline" }),
);
console.log("badgeRecipe():", badgeRecipe());
console.log("alertRecipe():", alertRecipe());
console.log("avatarRecipe():", avatarRecipe());
console.log("cardSelector:", cardSelector);
