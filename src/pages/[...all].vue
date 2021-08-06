<template>
    <div class="flex flex-col items-center pt-32">
        <h1 class="text-7xl">404</h1>
        <h3>Page not found</h3>
    </div>
</template>

<script setup lang="ts">
    import { useHead } from '@vueuse/head';

    useHead({
        title: '404 – Page not found',
    });
</script>


<route lang="yaml">
    meta:
        layout: 404
</route>
