<template>
    <router-view v-slot="{ Component }">
        <transition name="slide-left">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script lang="ts">
    import { iContact, iMethod } from '~/types';
    import { computed, InjectionKey, provide, reactive, readonly, ref, watch } from 'vue';
    import {saveDraft, getDraft, clearDraft} from '~/resources/drafts';

    /* contacts */
    export const contactsKey: InjectionKey<readonly iContact[]> = Symbol();
    export const currentContactKey: InjectionKey<Readonly<typeof currentContact>> = Symbol();
    export const setCurrentContactKey: InjectionKey<typeof setCurrentContact> = Symbol();
    export const addContactKey: InjectionKey<typeof addContact> = Symbol();
    export const deleteContactKey: InjectionKey<typeof deleteContact> = Symbol();

    const contacts: iContact[] = reactive([]);
    const currentContactID = ref<string>();
    const currentContact = computed(() => contacts.find(({ id }) => id === currentContactID.value));

    const setCurrentContact = (id: string) => currentContactID.value = id;
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
    
    /* payment methods */
    export const methodsKey: InjectionKey<readonly iMethod[]> = Symbol();
    export const currentMethodKey: InjectionKey<typeof currentMethod> = Symbol();
    export const setCurrentMethodKey: InjectionKey<typeof setCurrentMethod> = Symbol();
    export const addMethodKey: InjectionKey<typeof addMethod> = Symbol();
    export const deleteMethodKey: InjectionKey<typeof deleteMethod> = Symbol();

    const methods: iMethod[] = reactive([]);
    const currentMethodID = ref<string>();
    const currentMethod = computed(() => methods.find(({ id }) => id === currentMethodID.value));

    const setCurrentMethod = (id: string) => { currentMethodID.value = id; };
    const addMethod = async (method: iMethod) => {
        methods.push(method);
        fetch(
            '/api/methods/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json;charset=utf-8' },
                body: JSON.stringify(method)
            }
        );
    };
    const deleteMethod = async (id: string) => {
        fetch(`/api/methods/${id}`, {
            method: 'DELETE'
        });

        const method = methods.find(method => method.id === id);
        if (method) {
            const index = methods.indexOf(method);
            if (index !== -1) {
                methods.splice(index, 1);
            }
        }
    };

    /* Other form  */
    export const amountKey: InjectionKey<typeof amount> = Symbol();
    export const acceptPaymentKey: InjectionKey<typeof acceptPayment> = Symbol();
    export const clearMakePaymentFormKey: InjectionKey<typeof clearMakePaymentForm> = Symbol();
    const amount = ref('');
    const acceptPayment = async () => { /* Collect & send data */ };
    const clearMakePaymentForm = () => {
        amount.value = '';
        currentContactID.value = '';
        currentMethodID.value = '';
        clearDraft('makePayment');
    };

    /* fetches */
    getDraft('makePayment')
        .then((response: any)=> {
            amount.value = response.amount || '';
            setCurrentContact(response.currentContactID || '');
            setCurrentMethod(response.currentMethodID || '');
        });

    fetch('/api/contacts')
        .then(res => res.json()
            .then(json => {
                contacts.push(...json.contacts);
            })
        );

    fetch('/api/methods')
        .then(res => res.json()
            .then(json => {
                methods.push(...json.methods);
            })
        );


</script>

<script setup lang="ts">
    provide(contactsKey, readonly(contacts));
    provide(currentContactKey, readonly(currentContact));
    provide(setCurrentContactKey, setCurrentContact);
    provide(addContactKey, addContact);
    provide(deleteContactKey, deleteContact);

    provide(methodsKey, readonly(methods));
    provide(currentMethodKey, currentMethod);
    provide(setCurrentMethodKey, setCurrentMethod);
    provide(addMethodKey, addMethod);
    provide(deleteMethodKey, deleteMethod);

    provide(amountKey, amount);
    provide(clearMakePaymentFormKey, clearMakePaymentForm);
    provide(acceptPaymentKey, acceptPayment);
    
    watch(
        [amount, currentContactID, currentMethodID],
        () => saveDraft('makePayment', {
            amount: amount.value,
            currentContactID: currentContactID.value,
            currentMethodID: currentMethodID.value
        })
    );
</script>
