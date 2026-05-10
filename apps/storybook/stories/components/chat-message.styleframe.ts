import {
	useChatMessageRecipe,
	useChatMessageAvatarRecipe,
	useChatMessageContentRecipe,
	useChatMessageActionsRecipe,
} from "@styleframe/theme";
import { styleframe } from "virtual:styleframe";

const s = styleframe();
const { selector } = s;

// Initialize chat-message recipes
export const chatMessage = useChatMessageRecipe(s);
export const chatMessageAvatar = useChatMessageAvatarRecipe(s);
export const chatMessageContent = useChatMessageContentRecipe(s);
export const chatMessageActions = useChatMessageActionsRecipe(s);

// Container styles for story layout
selector(".chat-message-grid", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.md",
	padding: "@spacing.md",
});

selector(".chat-message-section", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.lg",
	padding: "@spacing.md",
});

selector(".chat-message-row", {
	display: "flex",
	flexDirection: "column",
	gap: "@spacing.sm",
});

selector(".chat-message-label", {
	fontSize: "@font-size.sm",
	fontWeight: "@font-weight.semibold",
	color: "@color.text-weak",
});

// Vertical stack for content + actions inside a ChatMessage
selector(".chat-message-stack", {
	display: "flex",
	flexDirection: "column",
	minWidth: "0",
});

// Minimal pill styling for action buttons in stories
selector(".chat-message-action-button", {
	display: "inline-flex",
	alignItems: "center",
	gap: "@spacing.xs",
	padding: "@0.25 @0.5",
	fontSize: "@font-size.xs",
	color: "@color.text-weak",
	background: "transparent",
	border: "none",
	borderRadius: "@border-radius.sm",
	cursor: "pointer",
	"&:hover": {
		background: "@color.gray-100",
		color: "@color.text",
	},
	"&:dark:hover": {
		background: "@color.gray-800",
		color: "@color.white",
	},
});

export default s;
