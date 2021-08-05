<template>
    {{ t('hello')}}
    <router-view />
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { useHead } from '@vueuse/head';

    const { t } = useI18n();
    useHead({
        title: 'Vite example',
    });
</script>
