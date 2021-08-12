<template>
    <NavHeader
        :title="title"
        :back-path="Routes.selectMethod"
    />
    <main class="px-8 py-10 pt-4">
        <BaseTabs
            :tabs="tabs"
        >
            <template #card>
                <p class="mb-1 mt-4 pl-1">{{ t('newMethod.card.name') }}</p>
                <input
                    v-maska="'A* A*'"
                    class="form-input rounded h-14 w-full"
                >
                <p class="mb-1 mt-4 pl-1">{{ t('newMethod.card.number') }}</p>
                <input
                    v-maska="'#### #### #### ####'"
                    class="form-input rounded h-14 w-full"
                >
                <p class="mb-1 mt-4 pl-1">{{ t('newMethod.card.expiryDate') }}</p>
                <input v-maska="'##/##'" class="form-input rounded h-14 w-full">
            </template>

            <template #account>
                <p class="mb-1 mt-4 pl-1">{{ t('newMethod.account.name') }}</p>
                <input type="text" class="form-input rounded h-14 w-full">
                <p class="mb-1 mt-4 pl-1">{{ t('newMethod.account.number') }}</p>
                <input
                    class="form-input rounded h-14 w-full"
                    v-maska="'##########'"
                >
                <p class="mb-1 mt-4 pl-1">{{ t('newMethod.account.bsb') }}</p>
                <input
                    class="form-input rounded h-14 w-full"
                    v-maska="'###-###'"
                >
            </template>
        </BaseTabs>
    </main>
    
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="false"
            @click="handleSaveMethod"
        >
            {{ t('newMethod.save') }}
        </BaseButton>
    </footer>
</template>

<script setup lang="ts">
    import { Titles } from '~/components/NavHeader.vue';
    import { Routes } from '~/router/types';
    import router from '~/router';
    import { useI18n } from 'vue-i18n';
    import { computed } from 'vue';
    const { t } = useI18n();

    const tabs = [
        { name: computed(() => t('new.method.card')), value: 'card' },
        { name: computed(() => t('new.method.account')), value: 'account' }
    ];

    const handleSaveMethod = () => {
        router.push(Routes.selectMethod);
    };

    const title = Titles.newCard;
</script>
