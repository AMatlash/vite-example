<template>
    <NavHeader
        :title="Titles.makePayment"
    />
    <main class="px-8 py-10">
        <form @submit.prevent="handleMakePayment">
            <p class="mb-1 pl-1 font-bold">{{ t('makePayment.selectContact') }}</p>
            <ContactSelect
                :contact="currentContact"
                @click="handleSelectContact"
            />
            <p class="mb-1 mt-4 pl-1 font-bold">{{ t('makePayment.selectMethod') }}</p>
            <MethodSelect
                :method="currentMethod"
                @click="handleSelectMethod"
            />
            <p class="mb-1 mt-4 pl-1 font-bold">{{ t('makePayment.enterAmount') }}</p>
            <BaseInput
                inputmode="numeric"
                class="form-input rounded w-full"
                v-maska="[
                    '###',
                    '# ###',
                    '## ###',
                    '### ###',
                    '# ### ###'
                ]"
                v-model="amount"
            />
        </form>
    </main>
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="!filled"
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
    import { computed, inject, ref } from 'vue';
    import { acceptPaymentKey, amountKey, currentContactKey, currentMethodKey } from '~/pages/make-payment.vue';

    const { t } = useI18n();
    const currentContact = inject(currentContactKey);
    const currentMethod = inject(currentMethodKey);
    const amount = inject(amountKey);
    const acceptPayment = inject(acceptPaymentKey);
    if (!amount || !acceptPayment) {
        throw new Error('Could not resolve "amount" or "acceptPayment"');
    }

    const filled = computed(() => !!currentContact?.value && !!currentMethod?.value && !!amount.value);

    const handleMakePayment = () => {
        if (filled.value) {
            router.push(Routes.successPayment);
            acceptPayment();
        }
    };
    const handleSelectContact = () => {
        router.push(Routes.selectContact);
    };
    const handleSelectMethod = () => {
        router.push(Routes.selectMethod);
    };
</script>
