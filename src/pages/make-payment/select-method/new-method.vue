<template>
    [NEW METHOD]<br>
    [CARD | BANK ACCOUNT]
</template>

<script setup lang="ts">
    import { useHeader, Titles } from '~/composables/useHeader';
    import { Routes } from '~/router/types';

    const {
        setTitle,
        setBackPath,
        setAddPath
    } = useHeader();

    setTitle(Titles.newCard); // t('header.newCard')
    setBackPath(Routes.selectMethod);
    setAddPath(Routes.none);
</script>
