<template>
    <div class="form-input rounded flex">
        <div
            v-if="props.contact"
            class="w-full"
        >
            <p class="text-md">
                {{ props.contact.firstName }}
                {{ props.contact.lastName }}
            </p>
            <p class="text-xs text-right">
                {{ props.contact.email }}
            </p>
        </div>
        <p
            v-else
            class="self-center text-gray-400"
        >
            {{ t('contactSelect.empty') }}
        </p>
    </div>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { iContact } from '~/types';

    const props = defineProps<{
        contact?: iContact
    }>();

    const { t } = useI18n();
</script>
