<template>
	<transition :name="String($route.meta.transition ?? '')">
		<router-view v-slot="{ Component }">
			<keep-alive :include="keepAliveRoutes">
				<component :is="Component" />
			</keep-alive>
		</router-view>
	</transition>
</template>

<script setup lang="ts">
import { keepAliveRoutes } from '@/router';
</script>

<style lang="scss">
@import '@/assets/styles/scroll.scss';
.slide-right-enter-active {
	transition: all 0.9s ease-out;
}

.slide-right-leave-active {
	transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-right-enter-from,
.slide-right-leave-to {
	transform: translateX(60px);
	opacity: 0;
}
</style>
