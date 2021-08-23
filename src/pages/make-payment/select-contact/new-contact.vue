<template>
    <NavHeader
        :title="Titles.newContact"
        :back-path="Routes.selectContact"
    />
    <main class="px-8 py-10">
        <p class="mb-1 pl-1">{{ t('newContact.firstName') }}</p>
        <input
            class="form-input rounded h-14 w-full"
            type="text"
            v-model="firstName"
        >
        <p class="mb-1 mt-4 pl-1">{{ t('newContact.lastName') }}</p>
        <input
            class="form-input rounded h-14 w-full"
            type="text"
            v-model="lastName"
        >
        <p class="mb-1 mt-4 pl-1">{{ t('newContact.email') }}</p>
        <input
            class="form-input rounded h-14 w-full"
            type="text"
            v-model="email"
        >
    </main>
    <footer class="mt-auto px-8 py-16 bg-white ">
        <BaseButton
            :disabled="filled"
            @click="handleSaveContact"
        >
            {{ t('newContact.save') }}
        </BaseButton>
    </footer>
</template>

<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useI18n } from 'vue-i18n';
    import { Titles } from '~/components/NavHeader.vue';
    import router from '~/router';
    import { Routes } from '~/router/types';
    import { iContact } from '~/types';
    const { t } = useI18n();
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');

    const filled = computed(() => !firstName.value || !lastName.value || !email.value);
    const handleSaveContact = () => {
        if (!filled.value) {
            /* const contact: iContact = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value
            }; */
            router.push(Routes.selectContact);
        }
    };
</script>
