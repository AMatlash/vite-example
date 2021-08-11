<template>
    <NavHeader
        :title="Titles.newContact"
        :back-path="Routes.selectContact"
    />
    [NEW CONTACT]
</template>

<script setup lang="ts">
    import { Titles } from '~/components/NavHeader.vue';
    import { Routes } from '~/router/types';
</script>
