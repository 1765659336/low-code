import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';

import { afterNav, beforeNav } from './navigate';

export const routes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: '/editor',
	},
	{
		path: '/editor',
		component: () => import('@/views/editor/index.vue'),
		name: 'Editor',
		meta: {
			keepAlive: false,
			title: 'Low',
			transition: 'slide-right',
		},
	},
];

export const getKeepAliveRoutes = (routes: RouteRecordRaw[]) => {
	let keepAliveRoutes: string[] = [];

	for (const route of routes) {
		if (route.meta && route.meta.keepAlive && route.name) {
			keepAliveRoutes.push(String(route.name));
		}

		if (route.children) {
			const childRoutes = getKeepAliveRoutes(route.children);
			keepAliveRoutes = keepAliveRoutes.concat(childRoutes);
		}
	}

	return keepAliveRoutes;
};

export const keepAliveRoutes = getKeepAliveRoutes(routes);

export const router = createRouter({
	history: createWebHashHistory('/'),
	routes,
});

router.beforeEach(beforeNav);
router.afterEach(afterNav);

export default router;
