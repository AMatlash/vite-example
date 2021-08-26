<template>
    <NavHeader
        :title="Titles.newContact"
        :back-path="Routes.selectContact"
    />
    <main class="px-8 py-10">
        <form>
            <p class="mb-1 pl-1">{{ t('newContact.firstName') }}</p>
            <BaseInput v-model="firstName"/>
            <p class="mb-1 mt-4 pl-1">{{ t('newContact.lastName') }}</p>
            <BaseInput v-model="lastName"/>
            <p class="mb-1 mt-4 pl-1">{{ t('newContact.email') }}</p>
            <BaseInput
                v-model="email"
                type="email"
                @keydown="handleEnter"
            />
        </form>
    </main>
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="!filled"
            @click="handleSaveContact"
        >
            {{ t('newContact.save') }}
        </BaseButton>
    </footer>
</template>

<script setup lang="ts">
    import { computed, inject, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { Titles } from '~/components/NavHeader.vue';
    import { addContactKey } from '~/pages/make-payment.vue';
    import router from '~/router';
    import { Routes } from '~/router/types';
    import { v4 as uuid } from 'uuid';

    const { t } = useI18n();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');

    const addContact = inject(addContactKey);
    if (!addContact) {
        throw new Error('Could not resolve "addContact"');
    }

    const handleEnter = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveContact();
        }
    };

    const filled = computed(() => !!firstName.value && !!lastName.value && !!email.value);
    const handleSaveContact = () => {
        if (filled.value) {
            addContact({
                id: uuid(),
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value
            });
            router.push(Routes.selectContact);
        }
    };
</script>
