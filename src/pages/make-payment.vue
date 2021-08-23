<template>
    <router-view />
</template>

<script lang="ts">
    import { iContact } from '~/types';
    import { InjectionKey, provide, reactive, readonly, ref } from 'vue';

    export const contactsKey: InjectionKey<readonly iContact[]> = Symbol();
    export const currentContactKey: InjectionKey<Readonly<typeof currentContact>> = Symbol();
    export const setCurrentContactKey: InjectionKey<typeof setCurrentContact> = Symbol();

    let currentContact = ref<iContact>();
    const setCurrentContact = (contact: iContact) => { currentContact.value = contact; };
    const contacts: iContact[] = reactive([]);

    contacts.push(
        { id: '100500', firstName: 'Alex', lastName: 'Testov', email: 'test1@yandex.ru' }
    );
    contacts.push(
        { id: '100501', firstName: 'Bruce', lastName: 'Testson', email: 'test2@gmail.com' }
    );
    contacts.push(
        { id: '100502', firstName: 'Carmen', lastName: 'Testillo', email: 'test3@mail.com' }
    );
    // currentContact.value = contacts[1];
</script>

<script setup lang="ts">
    provide(contactsKey, readonly(contacts));
    provide(currentContactKey, readonly(currentContact));
    provide(setCurrentContactKey, setCurrentContact);
</script>
