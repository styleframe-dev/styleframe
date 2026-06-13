<script setup lang="ts">
import CalendarDay from "../CalendarDay.vue";
</script>

<template>
	<div class="calendar-legend">
		<span class="calendar-stories-label">Default</span>
		<CalendarDay>15</CalendarDay>

		<span class="calendar-stories-label">Today</span>
		<CalendarDay today>11</CalendarDay>

		<span class="calendar-stories-label">Selected</span>
		<CalendarDay selected>18</CalendarDay>

		<span class="calendar-stories-label">Range</span>
		<div class="calendar-legend-range">
			<CalendarDay range="start">12</CalendarDay>
			<CalendarDay range="middle">13</CalendarDay>
			<CalendarDay range="middle">14</CalendarDay>
			<CalendarDay range="end">15</CalendarDay>
		</div>

		<span class="calendar-stories-label">Booked</span>
		<CalendarDay booked>22</CalendarDay>

		<span class="calendar-stories-label">Disabled</span>
		<CalendarDay disabled>25</CalendarDay>

		<span class="calendar-stories-label">Outside month</span>
		<CalendarDay outside>30</CalendarDay>
	</div>
</template>
