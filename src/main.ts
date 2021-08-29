import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { i18n } from '~/i18n';
import router from '~/router';
import App from './App.vue';
import '~/styles/index.css';
import Maska from 'maska';
// @ts-ignore
import { makeServer } from './server';

makeServer();

createApp(App)
    .use(i18n)
    .use(router)
    .use(Maska)
    .use(createHead())
    .mount('#app');
