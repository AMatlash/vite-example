<template>
    [SELECT METHOD]
</template>

<script setup lang="ts">
    import { useHeader, Titles } from '~/composables/useHeader';
    import { Routes } from '~/router/types';

    const {
        setTitle,
        setBackPath,
        setAddPath
    } = useHeader();

    setTitle(Titles.selectMethod); // t('header.selectMethod')
    setBackPath(Routes.makePayment);
    setAddPath(Routes.newMethod);
</script>
