import path from 'path';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const resolvePath = (filePath: string) => path.resolve(__dirname, filePath);

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue()
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
