<template>
    <div
        class="relative form-input rounded flex"
        :class="{'border-blue-500': props.contact}"
    >
        <template
            v-if="props.contact"
        >
            <div
                class="flex-grow"
                @click="emit('select')"
            >
                <p class="flex self-center items-center text-md font-medium">
                    <mdi:card-account-details class="h-5 w-5 text-blue-500 inline mr-2"/>
                    {{ props.contact.firstName }} {{ props.contact.lastName }}
                </p>
                <p class="text-sm">
                    {{ props.contact.email }}
                </p>
            </div>
            <div
                v-if="controls"
                class="flex border-l border-blue-500 pl-2"
                @click="emit('delete')"
            >
                <mdi:trash-can-outline class="w-6 h-6 self-center"/>
            </div>
        </template>
        <p
            v-else
            class="flex self-center items-center text-gray-400"
        >
            <mdi:card-account-details class="h-6 w-6 inline mr-2"/>
            {{ t('contactSelect.empty') }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { iContact } from '~/types';

    const props = defineProps<{
        contact?: iContact,
        controls?: boolean
    }>();

    const emit = defineEmits<{
        (e: 'select'): void
        (e: 'delete'): void
    }>();

    const { t } = useI18n();
</script>
