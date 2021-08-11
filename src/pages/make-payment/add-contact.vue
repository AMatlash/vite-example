<template>
    [ADD CONTACT]
</template>

<script setup lang="ts">
    import { useHeader, Titles } from '~/composables/useHeader';
    import { Routes } from '~/router/types';

    const {
        setTitle,
        setBackPath,
        setAddPath
    } = useHeader();

    setTitle(Titles.addContact); // t('header.addContact')
    setBackPath(Routes.makePayment);
    setAddPath(Routes.none);
</script>
