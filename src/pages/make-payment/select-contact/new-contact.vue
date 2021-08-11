<template>
    [NEW CONTACT]
</template>

<script setup lang="ts">
    import { useHeader, Titles } from '~/composables/useHeader';
    import { Routes } from '~/router/types';

    const {
        setTitle,
        setBackPath,
        setAddPath
    } = useHeader();

    setTitle(Titles.newContact); // t('header.newContact')
    setBackPath(Routes.selectContact);
    setAddPath(Routes.none);
</script>
