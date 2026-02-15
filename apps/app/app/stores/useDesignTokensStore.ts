import { defineStore } from "pinia";
import type { DesignSystem, DesignToken, TokenNamespace } from "~/types";
import type { Node, Edge } from "@vue-flow/core";

const defaultNamespaces: Record<TokenNamespace, DesignToken[]> = {
	color: [
		{ id: "color-1", name: "primary", value: "#006cff", type: "color" },
		{ id: "color-2", name: "secondary", value: "#6c757d", type: "color" },
		{ id: "color-3", name: "background", value: "#ffffff", type: "color" },
		{ id: "color-4", name: "text", value: "#1a1a1a", type: "color" },
	],
	spacing: [
		{ id: "spacing-1", name: "sm", value: "0.5rem", type: "dimension" },
		{ id: "spacing-2", name: "md", value: "1rem", type: "dimension" },
		{ id: "spacing-3", name: "lg", value: "2rem", type: "dimension" },
		{ id: "spacing-4", name: "xl", value: "@spacing.lg", type: "reference" },
	],
	typography: [
		{
			id: "typo-1",
			name: "font-family",
			value: "Inter, sans-serif",
			type: "string",
		},
		{ id: "typo-2", name: "font-size-base", value: "1rem", type: "dimension" },
		{ id: "typo-3", name: "font-weight-bold", value: "700", type: "number" },
		{ id: "typo-4", name: "line-height", value: "1.5", type: "number" },
	],
	border: [
		{ id: "border-1", name: "radius-sm", value: "0.25rem", type: "dimension" },
		{ id: "border-2", name: "radius-md", value: "0.5rem", type: "dimension" },
		{ id: "border-3", name: "width-thin", value: "1px", type: "dimension" },
	],
	shadow: [
		{
			id: "shadow-1",
			name: "sm",
			value: "0 1px 2px rgba(0,0,0,0.05)",
			type: "string",
		},
		{
			id: "shadow-2",
			name: "md",
			value: "0 4px 6px rgba(0,0,0,0.1)",
			type: "string",
		},
	],
	easing: [
		{ id: "easing-1", name: "default", value: "ease-in-out", type: "string" },
		{ id: "easing-2", name: "duration-fast", value: "150ms", type: "duration" },
		{
			id: "easing-3",
			name: "duration-normal",
			value: "300ms",
			type: "duration",
		},
	],
};

function createDummyDesignSystem(projectId: string): DesignSystem {
	return {
		id: "default",
		projectId,
		name: "Default",
		description: "Default design system",
		namespaces: structuredClone(defaultNamespaces),
		createdAt: "2026-01-01T00:00:00Z",
		updatedAt: "2026-02-01T00:00:00Z",
	};
}

export const useDesignTokensStore = defineStore("designTokens", () => {
	// State: projectId -> designSystemId -> DesignSystem
	const designSystems = ref<Map<string, Map<string, DesignSystem>>>(new Map());

	// Seed dummy data
	for (const projectId of ["brand-system", "marketing-site", "mobile-app"]) {
		const systemMap = new Map<string, DesignSystem>();
		systemMap.set("default", createDummyDesignSystem(projectId));
		designSystems.value.set(projectId, systemMap);
	}

	// Getters
	function getDesignSystemsForProject(projectId: string): DesignSystem[] {
		const systems = designSystems.value.get(projectId);
		return systems ? Array.from(systems.values()) : [];
	}

	function getDesignSystem(
		projectId: string,
		designSystemId: string = "default",
	): DesignSystem | undefined {
		return designSystems.value.get(projectId)?.get(designSystemId);
	}

	function getNamespaces(
		projectId: string,
		designSystemId: string = "default",
	): TokenNamespace[] {
		const system = getDesignSystem(projectId, designSystemId);
		return system ? (Object.keys(system.namespaces) as TokenNamespace[]) : [];
	}

	function getTokensByNamespace(
		projectId: string,
		namespace: TokenNamespace,
		designSystemId: string = "default",
	): DesignToken[] {
		const system = getDesignSystem(projectId, designSystemId);
		return system?.namespaces[namespace] ?? [];
	}

	// Actions
	function updateToken(
		projectId: string,
		namespace: TokenNamespace,
		tokenId: string,
		updates: Partial<DesignToken>,
		designSystemId: string = "default",
	) {
		const system = getDesignSystem(projectId, designSystemId);
		if (!system) return;

		const tokens = system.namespaces[namespace];
		const index = tokens.findIndex((t) => t.id === tokenId);
		if (index !== -1) {
			tokens[index] = { ...tokens[index], ...updates };
		}
	}

	function addToken(
		projectId: string,
		namespace: TokenNamespace,
		token: DesignToken,
		designSystemId: string = "default",
	) {
		const system = getDesignSystem(projectId, designSystemId);
		if (!system) return;

		system.namespaces[namespace].push(token);
	}

	function removeToken(
		projectId: string,
		namespace: TokenNamespace,
		tokenId: string,
		designSystemId: string = "default",
	) {
		const system = getDesignSystem(projectId, designSystemId);
		if (!system) return;

		system.namespaces[namespace] = system.namespaces[namespace].filter(
			(t) => t.id !== tokenId,
		);
	}

	// VueFlow helpers
	function getFlowNodes(
		projectId: string,
		designSystemId: string = "default",
	): Node[] {
		const namespaces = getNamespaces(projectId, designSystemId);
		const columns = 3;
		const nodeWidth = 280;
		const nodeGap = 40;

		return namespaces.map((ns, index) => {
			const col = index % columns;
			const row = Math.floor(index / columns);
			return {
				id: ns,
				type: "tokenNamespace",
				position: {
					x: col * (nodeWidth + nodeGap),
					y: row * (nodeWidth + nodeGap),
				},
				data: {
					namespace: ns,
					tokens: getTokensByNamespace(projectId, ns, designSystemId),
				},
			};
		});
	}

	function getFlowEdges(
		projectId: string,
		designSystemId: string = "default",
	): Edge[] {
		const edges: Edge[] = [];
		const namespaces = getNamespaces(projectId, designSystemId);

		for (const ns of namespaces) {
			const tokens = getTokensByNamespace(projectId, ns, designSystemId);
			for (const token of tokens) {
				if (token.type === "reference" && token.value.startsWith("@")) {
					const refParts = token.value.slice(1).split(".");
					const targetNamespace = refParts[0];
					if (namespaces.includes(targetNamespace as TokenNamespace)) {
						edges.push({
							id: `${ns}-${token.id}-${targetNamespace}`,
							source: ns,
							target: targetNamespace,
							animated: true,
							label: `${token.name} → ${refParts.join(".")}`,
						});
					}
				}
			}
		}

		return edges;
	}

	return {
		designSystems,
		getDesignSystemsForProject,
		getDesignSystem,
		getNamespaces,
		getTokensByNamespace,
		updateToken,
		addToken,
		removeToken,
		getFlowNodes,
		getFlowEdges,
	};
});
