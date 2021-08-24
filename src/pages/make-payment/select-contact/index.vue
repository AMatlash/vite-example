<template>
    <NavHeader
        :title="Titles.selectContact"
        :back-path="Routes.makePayment"
        :add-path="Routes.newContact"
    />
    <main  class="px-8 py-10">
        <ContactSelect
            v-for="contact in contacts"
            class="mb-4"
            :key="contact.id"
            :contact="contact"
            controls
            @select="handleSelectContact(contact)"
            @delete="handleDeleteContact(contact)"
        />
    </main>
</template>

<script setup lang="ts">
    import { Titles } from '~/components/NavHeader.vue';
    import { Routes } from '~/router/types';
    import ContactSelect from '~/components/forms/ContactSelect.vue';
    import { inject } from 'vue';
    import { contactsKey, setCurrentContactKey, deleteContactKey } from '~/pages/make-payment.vue';
    import { iContact } from '~/types';
    import router from '~/router';

    const contacts = inject(contactsKey);
    const setCurrentContact = inject(setCurrentContactKey);
    const deleteContact = inject(deleteContactKey);

    if (!setCurrentContact || !deleteContact) {
        throw new Error('Could not resolve "select-contact" injections.');
    }
    const handleSelectContact = (contact: iContact) => {
        setCurrentContact(contact.id);
        router.push(Routes.makePayment);
    };
    const handleDeleteContact = (contact: iContact) => {
        deleteContact(contact.id);
    };
</script>
