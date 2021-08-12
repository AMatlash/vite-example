<template>
    <NavHeader
        :title="Titles.newContact"
        :back-path="Routes.selectContact"
    />
    <main class="px-8 py-10">
        <p class="mb-1 pl-1">{{ t('newContact.firstName') }}</p>
        <input type="text" class="form-input rounded h-14 w-full">
        <p class="mb-1 mt-4 pl-1">{{ t('newContact.lastName') }}</p>
        <input type="text" class="form-input rounded h-14 w-full">
        <p class="mb-1 mt-4 pl-1">{{ t('newContact.email') }}</p>
        <input type="text" class="form-input rounded h-14 w-full">
    </main>
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="false"
            @click="handleSaveContact"
        >
            {{ t('newContact.save') }}
        </BaseButton>
    </footer>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { Titles } from '~/components/NavHeader.vue';
    import router from '~/router';
    import { Routes } from '~/router/types';
    const { t } = useI18n();

    const handleSaveContact = () => {
        router.push(Routes.selectContact);
    };
</script>
