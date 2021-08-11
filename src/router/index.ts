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
    routes
});

export default router;
