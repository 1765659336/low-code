<template>
	<el-input v-bind="props.bind" />
</template>

<script setup lang="ts">
import { I_Low_Code_Block_Element_Input } from '@/global';

defineOptions({
	name: 'CInput',
});

const props = withDefaults(
	defineProps<{
		bind: I_Low_Code_Block_Element_Input['bind'];
	}>(),
	{}
);
</script>

<style scoped lang="scss"></style>
