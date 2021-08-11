<template>
    <NavHeader
        :title="title"
        :back-path="Routes.selectMethod"
    />
    [NEW METHOD]<br>
    [CARD | BANK ACCOUNT]
</template>

<script setup lang="ts">
    import { Titles } from '~/components/NavHeader.vue';
    import { Routes } from '~/router/types';

    const title = Titles.newCard;
</script>
