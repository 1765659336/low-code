<template>
	<el-form label-position="top">
		<vue-draggable-next
			class="drag-box"
			:list="blocks"
			:group="{ name: 'block', pull: 'clone', put: true }"
			item-key="id"
			@change="blockPositionChange"
		>
			<el-form-item v-for="dom in blocks" :key="dom.id" class="p-editor-block cursor-move" v-bind="dom" style="width: 100%">
				<c-input v-if="dom.element.type === 'input'" :bind="dom.element.bind"></c-input>
				<c-select v-else-if="dom.element.type === 'select'" :bind="dom.element.bind"></c-select>
			</el-form-item>
		</vue-draggable-next>
	</el-form>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
import CInput from '@/components/input/index.vue';
import CSelect from '@/components/select/index.vue';
import { I_Vue_Draggable_Next_Evt, I_Low_Code_Block, E_Low_Code_Block_Element_Type } from '@/global';
import { cloneDeep } from 'lodash-unified';

defineOptions({
	name: 'PEditorBlocks',
});

const pureBlocks: I_Low_Code_Block[] = [
	{
		id: '1',
		col: 1,
		label: '输入框',
		element: {
			type: E_Low_Code_Block_Element_Type.输入框,
			bind: {
				type: 'text',
				placeholder: '请输入内容',
			},
		},
	},
	{
		id: '2',
		col: 1,
		label: '下拉选择框',
		element: {
			type: E_Low_Code_Block_Element_Type.下拉框,
			bind: {
				placeholder: '请下拉选择内容',
				options: [
					{
						value: '1',
						label: '测试数据test1',
					},
					{
						value: '2',
						label: '测试数据test2',
					},
					{
						value: '3',
						label: '测试数据test3',
					},
				],
			},
		},
	},
];

const blocks = ref<I_Low_Code_Block[]>(cloneDeep(pureBlocks));

const blockPositionChange = (evt: I_Vue_Draggable_Next_Evt<I_Low_Code_Block>) => {
	if (evt.moved) {
		const tempNew = cloneDeep(blocks.value[evt.moved.newIndex]);
		const tempOld = cloneDeep(blocks.value[evt.moved.oldIndex]);
		blocks.value[evt.moved.newIndex] = tempNew;
		blocks.value[evt.moved.oldIndex] = tempOld;
	} else if (evt.added) {
		blocks.value = cloneDeep(pureBlocks);
	}
};
</script>

<style scoped lang="scss">
.drag-box {
	display: flex;
	flex-wrap: wrap;
	.p-editor-block {
		padding: 0 10px;
	}
}
</style>
