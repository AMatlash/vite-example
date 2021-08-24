<template>
    <router-view />
</template>

<script lang="ts">
    import { iContact } from '~/types';
    import { computed, InjectionKey, provide, reactive, readonly, ref } from 'vue';

    export const contactsKey: InjectionKey<readonly iContact[]> = Symbol();
    export const currentContactKey: InjectionKey<Readonly<typeof currentContact>> = Symbol();
    export const setCurrentContactKey: InjectionKey<typeof setCurrentContact> = Symbol();
    export const addContactKey: InjectionKey<typeof addContact> = Symbol();
    export const deleteContactKey: InjectionKey<typeof deleteContact> = Symbol();

    const contacts: iContact[] = reactive([]);
    const setCurrentContact = (id: string) => { currentContactID.value = id; };
    const addContact = async (contact: iContact) => {
        contacts.push(contact);
        fetch(
            '/api/contacts/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(contact)
            }
        );
    };
    const deleteContact = async (id: string) => {
        fetch(`/api/contacts/${id}`, {
            method: 'DELETE'
        });

        const contact = contacts.find(contact => contact.id === id);
        if (contact) {
            const index = contacts.indexOf(contact);
            if (index !== -1) {
                contacts.splice(index, 1);
            }
        }
    };
    const currentContactID = ref<string>();
    const currentContact = computed(() => contacts.find(({ id }) => id === currentContactID.value));

    fetch('/api/contacts')
        .then(res => res.json()
            .then(json => {
                contacts.push(...json.contacts);
            })
        );
</script>

<script setup lang="ts">
    provide(contactsKey, readonly(contacts));
    provide(currentContactKey, readonly(currentContact));
    provide(setCurrentContactKey, setCurrentContact);
    provide(addContactKey, addContact);
    provide(deleteContactKey, deleteContact);
</script>
