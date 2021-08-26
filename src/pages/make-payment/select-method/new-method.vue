<template>
    <NavHeader
        :title="title"
        :back-path="Routes.selectMethod"
    />
    <main class="px-8 py-10 pt-4">
        <BaseTabs
            v-model:currentTab="currentTabName"
            :tabs="tabs"
        >
            <template #card>
                <form>
                    <p class="mb-1 mt-4 pl-1">{{ t('newMethod.card.number') }}</p>
                    <BaseInput
                        v-model="cardNumber"
                        v-maska="'#### #### #### ####'"
                        inputmode="numeric"
                    />
                    <p class="mb-1 mt-4 pl-1">{{ t('newMethod.card.expiryDate') }}</p>
                    <BaseInput
                        v-model="cardDate"
                        v-maska="'##/##'"
                        inputmode="numeric"
                    />
                    <p class="mb-1 mt-4 pl-1">{{ t('newMethod.card.name') }}</p>
                    <BaseInput
                        v-model="cardName"
                        v-maska="'A* A*'"
                        @keydown="handleEnter"
                    />
                </form>
            </template>

            <template #account>
                <form>
                    <p class="mb-1 mt-4 pl-1">{{ t('newMethod.account.name') }}</p>
                    <input
                        class="form-input rounded h-14 w-full"
                        type="text"
                        v-model="bankName"
                    >
                    <p class="mb-1 mt-4 pl-1">{{ t('newMethod.account.number') }}</p>
                    <input
                        class="form-input rounded h-14 w-full"
                        inputmode="numeric"
                        v-model="bankNumber"
                        v-maska="'##########'"
                    >
                    <p class="mb-1 mt-4 pl-1">{{ t('newMethod.account.bsb') }}</p>
                    <input
                        class="form-input rounded h-14 w-full"
                        v-model="bankBSB"
                        v-maska="'###-###'"
                        @keydown="handleEnter"
                    >
                </form>
            </template>
        </BaseTabs>
    </main>
    
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="!filled"
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
    import { computed, inject, ref } from 'vue';
    import { iTab } from '~/components/BaseTabs.vue';
    import { addMethodKey } from '~/pages/make-payment.vue';
    import { v4 as uuid } from 'uuid';
    
    const { t } = useI18n();
    const title = Titles.newPaymentMethod;
    const tabs: iTab[] = [
        { title: computed(() => t('new.method.card')), name: 'card' },
        { title: computed(() => t('new.method.account')), name: 'account' }
    ];

    const currentTabName = ref(tabs[0].name);

    const cardName = ref('');
    const cardNumber = ref('');
    const cardDate = ref('');

    const bankName = ref('');
    const bankNumber = ref('');
    const bankBSB = ref('');

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveMethod();
        }
    };

    const addMethod = inject(addMethodKey);
    if (!addMethod) {
        throw new Error('Could not resolve "addContact"');
    }

    const filled = computed(() => {
        if (currentTabName.value === 'card') {
            return !!cardName.value && !!cardNumber.value && !!cardDate.value;
        }
        if (currentTabName.value === 'account') {
            return !!bankName.value && !!bankNumber.value && !!bankBSB.value;
        }
        return false;
    });

    const handleSaveMethod = () => {
        if (filled.value) {
            if (currentTabName.value === 'card') {
                addMethod({
                    id: uuid(),
                    type: 'card',
                    name: cardName.value,
                    number: cardNumber.value.split(' ').join('-'),
                    expiryDate: cardDate.value
                });
            }
            if (currentTabName.value === 'account') {
                addMethod({
                    id: uuid(),
                    type: 'account',
                    name: bankName.value,
                    number: bankNumber.value,
                    bsb: bankBSB.value
                });
            }
            router.push(Routes.selectMethod);
        } 
    };
</script>
