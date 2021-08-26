<template>
    <main class="px-8 py-24">
        <mdi:checkbox-marked-circle class="h-24 w-24 mx-auto text-blue-600"/>
        <h1 class="text-center text-3xl my-3">{{ t('success.title') }}</h1>
    </main>
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="false"
            @click="handleMakeAnother"
        >
            {{ t('success.makeAnother') }}
        </BaseButton>
    </footer>
</template>

<script setup lang="ts">
    import { inject } from 'vue';
    import { useI18n } from 'vue-i18n';
    import router from '~/router';
    import { Routes } from '~/router/types';
    import { clearMakePaymentFormKey } from '../make-payment.vue';

    const { t } = useI18n();

    const clearMakePaymentForm = inject(clearMakePaymentFormKey);
    if (!clearMakePaymentForm) {
        throw new Error('Could not resolve "clearMakePaymentForm"');
    }

    const handleMakeAnother = () => {
        clearMakePaymentForm();
        router.push(Routes.makePayment);
    };
</script>
