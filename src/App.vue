<template>
    <router-view />
</template>

<script setup lang="ts">
    import { useHead } from '@vueuse/head';

    useHead({
        title: 'Vite example',
    });
</script>
