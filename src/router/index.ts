import generatedRoutes from 'virtual:generated-pages';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes = setupLayouts(generatedRoutes) as RouteRecordRaw[];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
