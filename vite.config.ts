import path from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueI18n from '@intlify/vite-plugin-vue-i18n';


const resolvePath = (filePath: string) => path.resolve(__dirname, filePath);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
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
