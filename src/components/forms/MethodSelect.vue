<template>
    <div
        class="relative form-input rounded flex"
        :class="{'border-blue-500': props.method}"
    >
        <template
            v-if="props.method"
        >
            <div
                class="relative flex-grow"
                @click="emit('select')"
            >
                <template v-if="props.method.type === 'card'">
                    <p class="flex self-center text-md font-medium">
                        <mdi:credit-card class="h-6 w-6 text-blue-500 inline mr-2"/>
                        {{ props.method.name }}
                    </p>
                    <p>**** {{ props.method.number.split('-')[3] }}</p>
                    <p class="absolute bottom-0 right-0">{{ props.method.expiryDate }}</p>
                </template>
                <template v-if="props.method.type === 'account'">
                    <p class="flex self-center text-md font-medium">
                        <mdi:receipt class="h-6 w-6 text-blue-500 inline mr-2"/>
                        {{ props.method.name }}
                    </p>
                    <p>{{ props.method.number }}</p>
                    <p class="text-right">{{ props.method.bsb }}</p>
                </template>
            </div>
            <div
                v-if="controls"
                class="flex ml-3 border-l border-blue-500 pl-2"
                @click="emit('delete')"
            >
                <mdi:trash-can-outline class="w-6 h-6 self-center"/>
            </div>
        </template>
        <p
            v-else
            class="flex self-center items-center text-gray-400"
        >
            <mdi:credit-card class="h-6 w-6 inline mr-2"/>
            {{ t('methodSelect.empty') }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { iMethod } from '~/types';

    const props = defineProps<{
        method?: iMethod,
        controls?: boolean
    }>();

    const emit = defineEmits<{
        (e: 'select'): void
        (e: 'delete'): void
    }>();

    const { t } = useI18n();
</script>
