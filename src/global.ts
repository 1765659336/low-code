import { InputTypeHTMLAttribute } from 'vue';

export declare interface I_Vue_Draggable_Next_Evt<Element> {
	moved: {
		element: Element;
		newIndex: number;
		oldIndex: number;
	};
	added: { element: Element; newIndex: number };
}

export declare type T_Low_Code_Container_LabelPosition = 'left' | 'right' | 'top';

export declare interface I_Low_Code {
	container: {
		col: number;
		labelPosition: T_Low_Code_Container_LabelPosition;
	};
	blocks: I_Low_Code_Block[];
}

export enum E_Low_Code_Block_Element_Type {
	输入框 = 'input',
	下拉框 = 'select',
}

export declare interface I_Low_Code_Block_Element_Input {
	type: E_Low_Code_Block_Element_Type.输入框;
	bind: {
		type: InputTypeHTMLAttribute;
		placeholder: string;
	};
}

export declare interface I_Low_Code_Block_Element_Select {
	type: E_Low_Code_Block_Element_Type.下拉框;
	bind: {
		placeholder: string;
		options: { label: string; value: string }[];
	};
}

export declare interface I_Low_Code_Block {
	id: string;
	col: number;
	label: string;
	element: I_Low_Code_Block_Element_Input | I_Low_Code_Block_Element_Select;
}
