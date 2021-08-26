<template>
    <NavHeader
        :title="Titles.selectMethod"
        :back-path="Routes.makePayment"
        :add-path="Routes.newMethod"
    />
    <main  class="px-8 py-10">
        <p class="mb-2 font-bold">{{ t('methodSelect.cards') }}</p>
        <MethodSelect
            v-for="method in cards"
            class="mb-4"
            :key="method.id"
            :method="method"
            controls
            @select="handleSelectMethod(method)"
            @delete="handleDeleteMethod(method)"
        />
        <div v-if="!cards?.length">
            {{ t('methodSelect.notFoundCards') }}
        </div>

        <p class="mt-6 mb-2 font-bold">{{ t('methodSelect.accounts') }}</p>
        <MethodSelect
            v-for="method in accounts"
            class="mb-4"
            :key="method.id"
            :method="method"
            controls
            @select="handleSelectMethod(method)"
            @delete="handleDeleteMethod(method)"
        />
        <div v-if="!accounts?.length">
            {{ t('methodSelect.notFoundAccounts') }}
        </div>
    </main>
</template>

<script setup lang="ts">
    import { computed, inject } from 'vue';
    import { Titles } from '~/components/NavHeader.vue';
    import { deleteMethodKey, methodsKey, setCurrentMethodKey } from '~/pages/make-payment.vue';
    import { Routes } from '~/router/types';
    import MethodSelect from '~/components/forms/MethodSelect.vue';
    import { iMethod } from '~/types';
    import { useI18n } from 'vue-i18n';
    import router from '~/router';

    const { t } = useI18n();
    const methods = inject(methodsKey);
    const cards = computed(() => methods?.filter(({ type }) => type === 'card'));
    const accounts = computed(() => methods?.filter(({ type }) => type === 'account'));
    const setCurrentMethod = inject(setCurrentMethodKey);
    const deleteMethod = inject(deleteMethodKey);

    if (!setCurrentMethod || !deleteMethod) {
        throw new Error('Could not resolve "select-contact" injections.');
    }
    const handleSelectMethod = (method: iMethod) => {
        setCurrentMethod(method.id);
        router.push(Routes.makePayment);
    };
    const handleDeleteMethod = (method: iMethod) => {
        deleteMethod(method.id);
    };
</script>
