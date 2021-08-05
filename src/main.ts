import { createApp } from 'vue';
import { createHead } from '@vueuse/head';
import { i18n } from '~/i18n';
import router from '~/router';
import App from './App.vue';
import { store, key } from '~/store';
import '~/styles/index.css';

createApp(App)
    .use(i18n)
    .use(store, key)
    .use(router)
    .use(createHead())
    .mount('#app');
