<script setup lang="ts">
import Sidebar from "../Sidebar.vue";
import SidebarContent from "../SidebarContent.vue";
import SidebarMenu from "../SidebarMenu.vue";
import SidebarMenuItem from "../SidebarMenuItem.vue";
import SidebarMenuButton from "../SidebarMenuButton.vue";

const colors = ["neutral", "light", "dark"] as const;
const variants = ["solid", "soft", "subtle"] as const;

const items = [
	{ icon: "🏠", label: "Home", active: true },
	{ icon: "📊", label: "Analytics", active: false },
	{ icon: "⚙️", label: "Settings", active: false },
] as const;
</script>

<template>
	<div class="sidebar-section">
		<div v-for="variant in variants" :key="variant">
			<div class="sidebar-label">{{ variant }}</div>
			<div class="sidebar-row">
				<Sidebar
					v-for="color in colors"
					:key="`${variant}-${color}`"
					:color="color"
					:variant="variant"
				>
					<SidebarContent>
						<SidebarMenu>
							<SidebarMenuItem v-for="item in items" :key="item.label">
								<SidebarMenuButton
									:color="color"
									:icon="item.icon"
									:label="item.label"
									:active="item.active"
								/>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarContent>
				</Sidebar>
			</div>
		</div>
	</div>
</template>
