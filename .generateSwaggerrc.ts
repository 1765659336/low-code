export default {
	// 远程swagger.json文件URL
	swaggerUrl: 'http://218.77.107.37:49014/swagger/v1/swagger.json',
	// 生成的swagger.json文件路径，默认src/apiType/swagger.json
	swaggerFileName: 'src/apiType/production/swagger.json',
	// 生成的接口文件路径，默认src/apiType/api.ts
	resultFileName: 'src/apiType/production/result.ts',
	// 生成文件中的Typescript类型命名前缀，默认AT_
	interfaceNamePrepend: 'AT_',
	// 封装的axios实例引入路径，默认import axios from '@/request/index'
	axiosUrl: "import axios from '@/request/index';",
	isNeedResponse: false,
	// 可选，在生成的函数中自定义一段逻辑
	axiosFuncContent(_parameterStr: string, handleAxiosUrl: string) {
		if (handleAxiosUrl === '/${sysCodeURL}/${firmCodeURL}/${popupKeyURL}/${flowIdURL}') {
			return `const sysCodeURL = sysCode;const firmCodeURL = firmCode;const popupKeyURL = popupKey;const flowIdURL = flowId;`;
		} else if (handleAxiosUrl === '/FlowCategory/${flowCategoryIdURL}/${versionURL}') {
			return `const flowCategoryIdURL = flowCategoryId;const versionURL = version;`;
		} else {
			return '';
		}
	},
};
