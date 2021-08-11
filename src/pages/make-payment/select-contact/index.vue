<template>
    <NavHeader
        :title="Titles.selectContact"
        :back-path="Routes.makePayment"
        :add-path="Routes.newContact"
    />
    [SELECT CONTACT]
</template>

<script setup lang="ts">
    import { Titles } from '~/components/NavHeader.vue';
    import { Routes } from '~/router/types';
</script>
