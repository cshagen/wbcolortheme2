<template>
	<WBWidgetFlex :variable-width="true">
		<template #title>
			<span class="fas fa-bolt me-2" style="color: var(--color-evu)"
				>&nbsp;</span
			>
			<span>Zähler</span>
		</template>
		<p
			v-for="(counter, index) in counters"
			:key="index"
			class="row m-1 mt-0 p-0"
		>
			<ClCounter :counter="counter" />
		</p>
	</WBWidgetFlex>
</template>

<script setup lang="ts">
//import { computed } from 'vue'
import WBWidgetFlex from '../shared/WbWidgetFlex.vue'
import ClCounter from './ClCounter.vue'
import { counters } from './model'
</script>

<style scoped>
.statusbutton {
	font-size: var(--font-large);
}

.modebutton {
	background-color: var(--color-menu);
	font-size: var(--font-verysmall);
	font-weight: normal;
}

.tempbadge {
	background-color: var(--color-battery);
	color: var(--color-bg);
	font-size: var(--font-verysmall);
	font-weight: normal;
}
</style>
