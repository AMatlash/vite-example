<template>
    <input
        class="form-input rounded h-14 w-full"
        v-bind="$attrs"
        :value="modelValue"
        @input="handleInput"
    >
</template>

<script setup lang="ts">
    defineProps<{
        modelValue: string
    }>();
    const emit = defineEmits<{
        (e: 'update:modelValue', val: string): void
    }>();

    const handleInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        emit('update:modelValue', target.value);
    };
</script>
