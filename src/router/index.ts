import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { Routes } from '~/router/types';

const indexRoute = generatedRoutes.find(({ name }) => name === 'index');
if (indexRoute) {
    indexRoute.redirect = Routes.makePayment;
}

const routes = setupLayouts(generatedRoutes) as RouteRecordRaw[];
const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 };
    },
});

router.afterEach((to, from) => {
    const toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;

    if (to.name === 'make-payment-success') {
        to.meta.transitionName = 'slide-top';
    } else if (from.name === 'make-payment-success') {
        to.meta.transitionName = 'slide-bottom';
    } else {
        to.meta.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }

});

export default router;
