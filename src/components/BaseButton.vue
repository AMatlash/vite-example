<template>
    <button
        class="h-12 w-full bg-blue-600 text-white text-xl font-bold rounded"
        @click="!disabled && emit('click')"
    >
        <slot/>
    </button>
</template>

<script setup lang="ts">
    const props = defineProps<{
        disabled: boolean
    }>();
    const emit = defineEmits<{
        (e: 'click'): void
    }>();
</script>
