<template>
	<div class="v-editor">
		<p-editor-blocks class="v-editor-left"> </p-editor-blocks>
		<div class="v-editor-center">
			<p-editor-preview v-model:data="data"> </p-editor-preview>
		</div>
	</div>
</template>

<script setup lang="ts">
import PEditorBlocks from '@/packages/editor-blocks/index.vue';
import PEditorPreview from '@/packages/editor-preview/index.vue';
import { I_Low_Code } from '@/global';

defineOptions({
	name: 'VEditor',
});

const data = ref<I_Low_Code>({
	container: {
		col: 1,
		labelPosition: 'top',
	},
	blocks: [],
});
</script>

<style scoped lang="scss">
.v-editor {
	display: flex;
	height: 100vh;

	.v-editor-left {
		width: 200px;
		overflow-y: auto;
		border-right: 1px solid #ccc;
	}
	.v-editor-center {
		flex: 1;
		overflow-y: auto;
	}
}
</style>
