<template>
    <header class="sticky top-0 h-14 py-3 px-10 bg-blue-500 text-white z-10">
        <mdi:arrow-left-bold
            v-if="showBackIcon"
            class="absolute top-3 left-2 w-8 h-8 inline"
            @click="handleGoBack()"
        />
        <div class="h-full w-full flex items-center justify-center">
            <p class="text-xl font-bold uppercase drop-shadow-sm">
                {{ t(title) }}
            </p>
        </div>
        <mdi:plus-circle
            v-if="showAddIcon"
            class="absolute top-3 right-2 w-8 h-8 inline"
            @click="handleAdd()"
        />
    </header>
</template>

<script lang="ts">
    export enum Titles {
        default = 'header.default', // t('header.default')
        makePayment = 'header.makePayment', // t('header.makePayment')
        selectContact = 'header.selectContact', // t('header.selectContact')
        newContact = 'header.newContact', // t('header.newContact')
        selectMethod = 'header.selectMethod', // t('header.selectMethod')
        newPaymentMethod = 'header.newPaymentMethod', // t('header.newPaymentMethod')
    }
</script>

<script setup lang="ts">
    import { useHead } from '@vueuse/head';
    import { computed, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import router from '~/router';
    import { Routes } from '~/router/types';
    const { t } = useI18n();

    interface Props {
        title?: Titles,
        backPath?: Routes,
        addPath?: Routes
    }

    const props = withDefaults(defineProps<Props>(), {
        title: Titles.default,
        backPath: Routes.none,
        addPath: Routes.none
    });

    watch(
        () => props.title,
        newTitle => {
            useHead({ title: t(newTitle)});
        }, {
            immediate: true
        }
    );

    const showBackIcon = computed(() => props.backPath !== Routes.none);
    const showAddIcon = computed(() => props.addPath !== Routes.none);

    const handleGoBack = () => {
        if (history.state.back === props.backPath) {
            router.back();
        } else {
            router.replace(props.backPath);
        }
    };

    const handleAdd = () => {
        router.push(props.addPath);
    };
</script>
