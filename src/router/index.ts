import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const indexRoute = generatedRoutes.find(({ name }) => name === 'index');
if (indexRoute) {
    indexRoute.redirect = '/make-payment';
}

export enum ROUTER_PATHS {
    null = '',
    makePayment = '/make-payment',
}

const routes = setupLayouts(generatedRoutes) as RouteRecordRaw[];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
