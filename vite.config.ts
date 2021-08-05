import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';
import ViteComponents from 'vite-plugin-components';
import Pages from 'vite-plugin-pages';
import Layouts from 'vite-plugin-vue-layouts';


const resolvePath = (filePath: string) => path.resolve(__dirname, filePath);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        ViteComponents({
            extensions: ['vue'],
            globalComponentsDeclaration: true
        }),
        Pages(),
        Layouts(),
        VueI18n({
            include: [resolvePath('src/locales/**')],
        })
    ],
    resolve: {
        alias: {
            '~/': `${resolvePath('src')}/`,
        }
    },
    server: {
        host: true
    }
})
