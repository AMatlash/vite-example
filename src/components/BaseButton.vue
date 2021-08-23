<template>
    <button
        :class="[
            'h-12 w-full bg-gray-400 text-white text-xl font-bold rounded',
            {
                'bg-blue-600': !disabled
            }
        ]"
        :disabled="disabled"
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
