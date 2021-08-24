<template>
    <NavHeader
        :title="Titles.makePayment"
    />
    <main class="px-8 py-10">
        <p class="mb-1 pl-1 font-bold">{{ t('makePayment.selectContact') }}</p>
        <ContactSelect
            :contact="currentContact"
            @click="handleSelectContact"
        />
        <p class="mb-1 mt-4 pl-1 font-bold">{{ t('makePayment.selectMethod') }}</p>
        <MethodSelect
            class="form-input rounded"
            @click="handleSelectMethod"
        />
        <p class="mb-1 mt-4 pl-1 font-bold">{{ t('makePayment.enterAmount') }}</p>
        <input
            type="number"
            class="form-input rounded w-full"
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
    import { inject } from 'vue';
    import { currentContactKey } from '~/pages/make-payment.vue';

    const { t } = useI18n();
    const currentContact = inject(currentContactKey);

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
