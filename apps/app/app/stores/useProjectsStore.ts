import { defineStore } from "pinia";
import type { Project } from "~/types";

export const useProjectsStore = defineStore("projects", () => {
	const projects = ref<Map<string, Project>>(
		new Map([
			[
				"brand-system",
				{
					id: "brand-system",
					name: "Brand System",
					description: "Core brand design tokens and components",
					createdAt: "2025-12-01T00:00:00Z",
					updatedAt: "2026-01-15T00:00:00Z",
				},
			],
			[
				"marketing-site",
				{
					id: "marketing-site",
					name: "Marketing Site",
					description: "Marketing website design system",
					createdAt: "2026-01-10T00:00:00Z",
					updatedAt: "2026-02-01T00:00:00Z",
				},
			],
			[
				"mobile-app",
				{
					id: "mobile-app",
					name: "Mobile App",
					description: "Mobile application token set and components",
					createdAt: "2026-02-01T00:00:00Z",
					updatedAt: "2026-02-08T00:00:00Z",
				},
			],
		]),
	);

	const allProjects = computed(() => Array.from(projects.value.values()));

	function getProjectById(id: string) {
		return projects.value.get(id);
	}

	function addProject(project: Project) {
		projects.value.set(project.id, project);
	}

	function removeProject(id: string) {
		projects.value.delete(id);
	}

	return {
		projects,
		allProjects,
		getProjectById,
		addProject,
		removeProject,
	};
});
