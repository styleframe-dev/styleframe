<script setup lang="ts">
import Sidebar from "../Sidebar.vue";
import SidebarHeader from "../SidebarHeader.vue";
import SidebarContent from "../SidebarContent.vue";
import SidebarMenu from "../SidebarMenu.vue";
import SidebarMenuItem from "../SidebarMenuItem.vue";
import SidebarMenuButton from "../SidebarMenuButton.vue";

const sizes = ["sm", "md", "lg"] as const;

const items = [
	{ icon: "🏠", label: "Home", active: true },
	{ icon: "📊", label: "Analytics", active: false },
	{ icon: "⚙️", label: "Settings", active: false },
] as const;
</script>

<template>
	<div class="sidebar-section">
		<div v-for="size in sizes" :key="size">
			<div class="sidebar-label">{{ size }}</div>
			<div class="sidebar-row">
				<Sidebar :size="size">
					<SidebarHeader :size="size">
						<SidebarMenuButton :size="size" icon="◆" label="Acme Inc" />
					</SidebarHeader>
					<SidebarContent :size="size">
						<SidebarMenu :size="size">
							<SidebarMenuItem v-for="item in items" :key="item.label">
								<SidebarMenuButton
									:size="size"
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
