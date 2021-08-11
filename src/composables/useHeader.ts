import { useI18n } from 'vue-i18n';
import { computed, ref } from 'vue';
import { useHead } from '@vueuse/head';
import { Routes } from '~/router/types';
import router from '~/router';

export enum Titles {
    default = 'header.default', // t('header.default')
    makePayment = 'header.makePayment', // t('header.makePayment')
    addContact = 'header.addContact' // t('header.addContact')
}

const _title = ref(Titles.default);
const _backPath = ref(Routes.none);
const _addPath = ref(Routes.none);

export function useHeader() {
    const { t } = useI18n();

    const title = computed(() => t(_title.value));
    const setTitle = (newTitle: Titles) => {
        useHead({ title: t(newTitle)});
        _title.value = newTitle;
    };

    const showBackIcon = computed(() => _backPath.value !== Routes.none);
    const setBackPath = (path: Routes) => {
        _backPath.value = path;
    };
    const handleGoBack = () => {
        if (history.state.back === _backPath.value) {
            router.back();
        } else {
            router.replace(_backPath.value);
        }
    };

    const showAddIcon = computed(() => _addPath.value !== Routes.none);
    const setAddPath = (path: Routes) => {
        _addPath.value = path;
    };
    const handleAdd = () => {
        router.push(_addPath.value);
    };

    return {
        title,
        setTitle,
        showBackIcon,
        setBackPath,
        handleGoBack,
        showAddIcon,
        setAddPath,
        handleAdd
    };
}
