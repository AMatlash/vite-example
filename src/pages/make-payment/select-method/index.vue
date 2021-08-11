<template>
    <NavHeader
        :title="Titles.selectMethod"
        :back-path="Routes.makePayment"
        :add-path="Routes.newMethod"
    />
    [SELECT METHOD]
</template>

<script setup lang="ts">
    import { Titles } from '~/components/NavHeader.vue';
    import { Routes } from '~/router/types';
</script>
