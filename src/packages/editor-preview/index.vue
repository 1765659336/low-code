<template>
	<el-icon class="cursor-pointer" @click="containerConfigDrawer = !containerConfigDrawer"><Tools /></el-icon>
	<el-form v-bind="props.data.container" :label-position="props.data.container.labelPosition">
		<vue-draggable-next class="drag-box" :list="props.data.blocks" group="block" item-key="id" @change="blockPositionChange">
			<div
				v-for="(dom, index) in props.data.blocks"
				:key="dom.id"
				class="p-editor-block cursor-move"
				:style="{ width: Number(dom.col / props.data.container.col) * 100 + '%' }"
			>
				<el-icon class="cursor-pointer" @click="selectCurrentBlock(index)"><Tools /></el-icon>
				<el-form-item v-bind="dom">
					<c-input v-if="dom.element.type === 'input'" :bind="dom.element.bind"></c-input>
					<c-select v-else-if="dom.element.type === 'select'" :bind="dom.element.bind"></c-select>
				</el-form-item>
			</div>
		</vue-draggable-next>
	</el-form>
	<el-drawer v-model="blockConfigDrawer" :with-header="false">
		<el-form v-if="currentBlockComputed.element.type === E_Low_Code_Block_Element_Type.输入框">
			<el-form-item label="占据份额">
				<el-input-number v-model="currentBlockComputed.col" :min="1" :max="props.data.container.col"></el-input-number>
			</el-form-item>
			<el-form-item label="字段提示文本">
				<el-input v-model="currentBlockComputed.label"></el-input>
			</el-form-item>
			<el-form-item label="框内提示文本">
				<el-input v-model="currentBlockComputed.element.bind.placeholder"></el-input>
			</el-form-item>
		</el-form>
		<el-form v-else-if="currentBlockComputed.element.type === E_Low_Code_Block_Element_Type.下拉框">
			<el-form-item label="占据份额">
				<el-input-number v-model="currentBlockComputed.col" :min="1" :max="props.data.container.col"></el-input-number>
			</el-form-item>
			<el-form-item label="字段提示文本">
				<el-input v-model="currentBlockComputed.label"></el-input>
			</el-form-item>
			<el-form-item label="框内提示文本">
				<el-input v-model="currentBlockComputed.element.bind.placeholder"></el-input>
			</el-form-item>
		</el-form>
	</el-drawer>
	<el-drawer v-model="containerConfigDrawer" :with-header="false" direction="ltr">
		<el-form-item label="切分份数">
			<el-input-number v-model="containerConfigComputed.col" :min="1" :max="24"></el-input-number>
		</el-form-item>
		<el-form-item label="字段提示文本位置">
			<el-select v-model="containerConfigComputed.labelPosition">
				<el-option label="上方" value="top"></el-option>
				<el-option label="左侧" value="left"></el-option>
			</el-select>
		</el-form-item>
	</el-drawer>
</template>

<script setup lang="ts">
import { VueDraggableNext } from 'vue-draggable-next';
import CInput from '@/components/input/index.vue';
import CSelect from '@/components/select/index.vue';
import { I_Low_Code, I_Vue_Draggable_Next_Evt, I_Low_Code_Block, E_Low_Code_Block_Element_Type } from '@/global';
import { Tools } from '@element-plus/icons-vue';
import { cloneDeep } from 'lodash-unified';
import { v4 as uuidV4 } from 'uuid';

defineOptions({
	name: 'PEditorPreview',
});

const props = withDefaults(
	defineProps<{
		data: I_Low_Code;
	}>(),
	{}
);

const emits = defineEmits(['update:data']);

const blockConfigDrawer = ref(false);

const containerConfigDrawer = ref(false);

const currentBlockComputed = computed(() => {
	return props.data.blocks[currentBlockIndex.value];
});

const containerConfigComputed = computed(() => {
	return props.data.container;
});

const currentBlockIndex = ref();

const selectCurrentBlock = (index: number) => {
	currentBlockIndex.value = index;
	blockConfigDrawer.value = true;
};

const blockPositionChange = (evt: I_Vue_Draggable_Next_Evt<I_Low_Code_Block>) => {
	if (evt.added) {
		const cloneData = cloneDeep(props.data);
		cloneData.blocks[evt.added.newIndex].id = uuidV4();
		emits('update:data', cloneData);
	}
};
</script>

<style scoped lang="scss">
.drag-box {
	display: flex;
	flex-wrap: wrap;
	min-height: 150px;

	.p-editor-block {
		padding: 0 10px;
	}
}
</style>
