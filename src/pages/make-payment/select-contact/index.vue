<template>
    [SELECT CONTACT]
</template>

<script setup lang="ts">
    import { useHeader, Titles } from '~/composables/useHeader';
    import { Routes } from '~/router/types';

    const {
        setTitle,
        setBackPath,
        setAddPath
    } = useHeader();

    setTitle(Titles.selectContact); // t('header.selectContact')
    setBackPath(Routes.makePayment);
    setAddPath(Routes.newContact);
</script>
