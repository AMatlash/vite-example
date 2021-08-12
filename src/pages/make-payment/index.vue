<template>
    <NavHeader
        :title="Titles.makePayment"
    />
    <main class="px-8 py-10">
        <p class="mb-1 pl-1">{{ t('makePayment.selectContact') }}</p>
        <ContactSelect
            class="form-input rounded h-14"
            @click="handleSelectContact"
        />
        <p class="mb-1 mt-4 pl-1">{{ t('makePayment.selectMethod') }}</p>
        <MethodSelect
            class="form-input rounded h-14"
            @click="handleSelectMethod"
        />
        <p class="mb-1 mt-4 pl-1">{{ t('makePayment.enterAmount') }}</p>
        <input
            type="number"
            class="form-input rounded h-14 w-full"
            v-maska="'#######'"
        >
    </main>
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="false"
            @click="handleMakePayment"
        >
            {{ t('makePayment.pay') }}
        </BaseButton>
    </footer>
</template>

<script setup lang="ts">
    import { useI18n } from 'vue-i18n';
    import { Titles } from '~/components/NavHeader.vue';
    import ContactSelect from '~/components/forms/ContactSelect.vue';
    import MethodSelect from '~/components/forms/MethodSelect.vue';
    import router from '~/router';
    import { Routes } from '~/router/types';

    const { t } = useI18n();

    const handleMakePayment = () => {
        router.push(Routes.successPayment);
    };
    const handleSelectContact = () => {
        router.push(Routes.selectContact);
    };
    const handleSelectMethod = () => {
        router.push(Routes.selectMethod);
    };
</script>
