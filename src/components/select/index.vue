<template>
	<el-select v-bind="props.bind">
		<el-option v-for="item in props.bind.options" :key="item.value" :label="item.label" :value="item.value" />
	</el-select>
</template>

<script setup lang="ts">
defineOptions({
	name: 'CSelect',
});

const props = withDefaults(
	defineProps<{
		bind: {
			options: { label: string; value: string }[];
			placeholder?: string;
		};
	}>(),
	{}
);
</script>

<style scoped lang="scss"></style>
