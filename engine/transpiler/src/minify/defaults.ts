export const defaultPropertyShortNames: Record<string, string> = {
	// Layout
	display: "d",
	position: "pos",
	overflow: "ov",
	"overflow-x": "ovx",
	"overflow-y": "ovy",
	visibility: "vis",
	"z-index": "z",
	float: "fl",
	clear: "cl",

	// Spacing
	margin: "m",
	"margin-top": "mt",
	"margin-right": "mr",
	"margin-bottom": "mb",
	"margin-left": "ml",
	"margin-inline": "mx",
	"margin-block": "my",
	padding: "p",
	"padding-top": "pt",
	"padding-right": "pr",
	"padding-bottom": "pb",
	"padding-left": "pl",
	"padding-inline": "px",
	"padding-block": "py",
	gap: "g",

	// Sizing
	width: "w",
	"min-width": "miw",
	"max-width": "maw",
	height: "h",
	"min-height": "mih",
	"max-height": "mah",

	// Typography
	color: "c",
	"font-size": "fs",
	"font-weight": "fw",
	"font-family": "ff",
	"font-style": "fst",
	"line-height": "lh",
	"letter-spacing": "ls",
	"text-align": "ta",
	"text-transform": "tt",
	"text-decoration": "td",
	"white-space": "ws",

	// Background
	background: "bg",
	"background-color": "bgc",

	// Borders
	"border-color": "bc",
	"border-width": "bw",
	"border-style": "bs",
	"border-radius": "br",

	// Flexbox & Grid
	"flex-direction": "fd",
	"flex-wrap": "fwr",
	"align-items": "ai",
	"align-content": "ac",
	"align-self": "as",
	"justify-content": "jc",
	"justify-items": "ji",
	"justify-self": "js",

	// Effects
	opacity: "op",
	"box-shadow": "bsh",
	cursor: "cur",
	"pointer-events": "pe",
	transition: "tr",
	transform: "tf",
	animation: "an",
};

export const defaultModifierShortNames: Record<string, string> = {
	hover: "h",
	focus: "f",
	active: "a",
	disabled: "dis",
	"focus-within": "fw",
	"focus-visible": "fv",
	first: "fi",
	last: "la",
	dark: "dk",
};
