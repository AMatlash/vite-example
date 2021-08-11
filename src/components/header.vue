<template>
    <header class="relative h-14 py-3 px-10 bg-blue-500 text-white">
        <mdi:arrow-left-bold
            v-if="showBackIcon"
            class="absolute top-3 left-2 w-8 h-8 inline"
            @click="handleGoBack()"
        />
        <div class="h-full w-full flex items-center justify-center">
            <p class="text-xl font-bold uppercase drop-shadow-sm">
                {{ title }}
            </p>
        </div>
        <mdi:plus-circle
            v-if="showAddIcon"
            class="absolute top-3 right-2 w-8 h-8 inline"
            @click="handleAdd()"
        />
    </header>
</template>

<script setup lang="ts">
    import { useHeader } from '~/composables/useHeader';

    const {
        title,
        showBackIcon,
        handleGoBack,
        showAddIcon,
        handleAdd,
    } = useHeader();
</script>
